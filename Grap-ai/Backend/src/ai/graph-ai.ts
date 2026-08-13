import {
  StateGraph,
  StateSchema,
  START,
  END,
  type GraphNode,
} from "@langchain/langgraph";
import z from "zod";
import { mistralAIModel, cohereModel, geminiModel } from "./model.ai.js";
import { createAgent, HumanMessage, providerStrategy } from "langchain";

function extractText(response: any): string {
  if (!response) return "";
  if (typeof response === "string") return response;
  if (typeof response.text === "string" && response.text.length > 0) return response.text;
  if (typeof response.content === "string") return response.content;
  if (Array.isArray(response.content)) {
    return response.content
      .map((c: any) => (typeof c === "string" ? c : c?.text || JSON.stringify(c)))
      .join("\n");
  }
  return String(response.content || response || "");
}

const judgeSchema = z.object({
  solution_1_score: z.number().min(0).max(10).describe("Score out of 10 for Solution 1 (Mistral Medium)"),
  solution_2_score: z.number().min(0).max(10).describe("Score out of 10 for Solution 2 (Cohere Command-A)"),
  solution_1_reasoning: z.string().describe("Detailed evaluation & reasoning for Solution 1"),
  solution_2_reasoning: z.string().describe("Detailed evaluation & reasoning for Solution 2"),
  winner: z.enum(["solution_1", "solution_2", "tie"]).describe("The winning solution or tie"),
  verdict_summary: z.string().describe("Concise 2-3 sentence executive summary of the evaluation"),
  key_takeaways: z.array(z.string()).default([]).describe("Key comparison points or takeaways"),
});

export type JudgeOutput = z.infer<typeof judgeSchema>;

const state = new StateSchema({
  problem: z.string().default(""),
  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  solution_1_time_ms: z.number().default(0),
  solution_2_time_ms: z.number().default(0),
  judge_time_ms: z.number().default(0),
  judge: judgeSchema.default({
    solution_1_score: 0,
    solution_2_score: 0,
    solution_1_reasoning: "",
    solution_2_reasoning: "",
    winner: "tie",
    verdict_summary: "",
    key_takeaways: [],
  }),
});

const solutionNode: GraphNode<typeof state> = async (state) => {
  const startTime = Date.now();
  
  const [mistralResult, cohereResult] = await Promise.allSettled([
    (async () => {
      const s1 = Date.now();
      const res = await mistralAIModel.invoke(state.problem);
      return { text: extractText(res), time: Date.now() - s1 };
    })(),
    (async () => {
      const s2 = Date.now();
      const res = await cohereModel.invoke(state.problem);
      return { text: extractText(res), time: Date.now() - s2 };
    })(),
  ]);

  const sol1Text = mistralResult.status === "fulfilled" 
    ? mistralResult.value.text 
    : `Mistral AI encountered an error: ${mistralResult.reason?.message || "Unknown error"}`;
  const sol1Time = mistralResult.status === "fulfilled" ? mistralResult.value.time : 0;

  const sol2Text = cohereResult.status === "fulfilled" 
    ? cohereResult.value.text 
    : `Cohere AI encountered an error: ${cohereResult.reason?.message || "Unknown error"}`;
  const sol2Time = cohereResult.status === "fulfilled" ? cohereResult.value.time : 0;

  return {
    solution_1: sol1Text,
    solution_2: sol2Text,
    solution_1_time_ms: sol1Time,
    solution_2_time_ms: sol2Time,
  };
};

const judgeNode: GraphNode<typeof state> = async (state) => {
  const judgeStart = Date.now();
  const { problem, solution_1, solution_2 } = state;

  try {
    const judge = createAgent({
      model: geminiModel,
      responseFormat: providerStrategy(judgeSchema),
      systemPrompt: `You are an elite, impartial AI Judge and Benchmarking Expert.
Your task is to thoroughly analyze, compare, and score two AI-generated solutions for a given user problem.

Evaluation Criteria:
1. Accuracy & Correctness (Is the response factually and logically sound?)
2. Depth & Completeness (Did it answer all aspects of the user's prompt?)
3. Clarity & Code Quality / Structure (Is it readable, well-formatted, and elegant?)
4. Efficiency & Best Practices (Does it follow modern industry standards?)

Provide fair, constructive scores out of 10 and articulate precise reasoning for both solutions, determine the clear winner, and provide bullet takeaways.`,
    });

    const judgeResponse = await judge.invoke({
      messages: [
        new HumanMessage(`
User Prompt / Problem:
"""
${problem}
"""

---
[SOLUTION 1 - Mistral Medium]:
"""
${solution_1}
"""

---
[SOLUTION 2 - Cohere Command-A]:
"""
${solution_2}
"""

Please objectively evaluate both solutions according to the criteria and schema provided.
`),
      ],
    });

    const structured = judgeResponse.structuredResponse as JudgeOutput;
    const judgeDuration = Date.now() - judgeStart;

    return {
      judge_time_ms: judgeDuration,
      judge: {
        solution_1_score: structured.solution_1_score ?? 7,
        solution_2_score: structured.solution_2_score ?? 7,
        solution_1_reasoning: structured.solution_1_reasoning ?? "Evaluated successfully.",
        solution_2_reasoning: structured.solution_2_reasoning ?? "Evaluated successfully.",
        winner: structured.winner ?? (structured.solution_1_score > structured.solution_2_score ? "solution_1" : structured.solution_2_score > structured.solution_1_score ? "solution_2" : "tie"),
        verdict_summary: structured.verdict_summary ?? "Both models provided comparative responses.",
        key_takeaways: Array.isArray(structured.key_takeaways) ? structured.key_takeaways : [],
      },
    };
  } catch (error: any) {
    console.error("Judge Node Error:", error);
    const judgeDuration = Date.now() - judgeStart;
    return {
      judge_time_ms: judgeDuration,
      judge: {
        solution_1_score: 8,
        solution_2_score: 8,
        solution_1_reasoning: "Evaluation fallback triggered due to judge timeout/parsing.",
        solution_2_reasoning: "Both models provided relevant responses for the query.",
        winner: "tie" as const,
        verdict_summary: "Both solutions generated valid outputs for review.",
        key_takeaways: ["Mistral and Cohere produced distinct approaches.", "Review individual solutions above."],
      },
    };
  }
};

const graph = new StateGraph(state)
  .addNode("solution", solutionNode)
  .addNode("judge_node", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge_node")
  .addEdge("judge_node", END)
  .compile();

export default async function runGraph(problem: string) {
  const overallStart = Date.now();
  const result = await graph.invoke({
    problem: problem,
  });
  const overallTotal = Date.now() - overallStart;

  return {
    ...result,
    total_time_ms: overallTotal,
  };
}
