import express from "express";
import cors from "cors";
import runGraph from "./src/ai/graph-ai.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));

// In-memory history for recent battles
interface BattleRecord {
  id: string;
  problem: string;
  timestamp: string;
  solution_1: string;
  solution_2: string;
  solution_1_time_ms: number;
  solution_2_time_ms: number;
  judge_time_ms: number;
  total_time_ms: number;
  judge: {
    solution_1_score: number;
    solution_2_score: number;
    solution_1_reasoning: string;
    solution_2_reasoning: string;
    winner: "solution_1" | "solution_2" | "tie";
    verdict_summary: string;
    key_takeaways: string[];
  };
}

const battleHistory: BattleRecord[] = [];

// Available models metadata
const MODELS_INFO = {
  model_1: {
    id: "mistral-medium-latest",
    name: "Mistral Medium",
    provider: "Mistral AI",
    tagline: "European Open-Weight Champion & Logical Precision",
    avatar: "🌪️",
    accentColor: "#ff7000",
    gradient: "from-orange-500/20 to-amber-500/10",
    borderColor: "border-orange-500/30",
  },
  model_2: {
    id: "command-a-03-2025",
    name: "Cohere Command-A",
    provider: "Cohere",
    tagline: "Enterprise Reasoning & High-Context Generation",
    avatar: "⚡",
    accentColor: "#39d353",
    gradient: "from-emerald-500/20 to-teal-500/10",
    borderColor: "border-emerald-500/30",
  },
  judge: {
    id: "gemini-flash-latest",
    name: "Gemini Flash (Judge)",
    provider: "Google DeepMind",
    tagline: "Multi-Modal Impartial Evaluator & Benchmark Judge",
    avatar: "⚖️",
    accentColor: "#7bd0ff",
    gradient: "from-sky-500/20 to-indigo-500/10",
    borderColor: "border-sky-500/30",
  },
};

// Health and Info
app.get("/", (req, res) => {
  res.json({
    name: "LangGraph Battle AI Arena API",
    status: "online",
    version: "2.0.0",
    models: MODELS_INFO,
    endpoints: {
      battle: "POST /api/arena/battle",
      models: "GET /api/arena/models",
      history: "GET /api/arena/history",
    },
  });
});

app.get("/api/arena/models", (req, res) => {
  res.json({
    success: true,
    models: MODELS_INFO,
  });
});

app.get("/api/arena/history", (req, res) => {
  res.json({
    success: true,
    history: battleHistory.slice(-20).reverse(),
  });
});

app.post("/api/arena/battle", async (req, res) => {
  try {
    const { problem } = req.body;

    if (!problem || typeof problem !== "string" || problem.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Problem statement is required and cannot be empty.",
      });
    }

    console.log(`[ARENA] Starting battle for prompt: "${problem.slice(0, 60)}..."`);
    const graphResult = await runGraph(problem.trim());

    const battleRecord: BattleRecord = {
      id: `battle_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      problem: graphResult.problem || problem,
      timestamp: new Date().toISOString(),
      solution_1: graphResult.solution_1 || "",
      solution_2: graphResult.solution_2 || "",
      solution_1_time_ms: graphResult.solution_1_time_ms || 0,
      solution_2_time_ms: graphResult.solution_2_time_ms || 0,
      judge_time_ms: graphResult.judge_time_ms || 0,
      total_time_ms: graphResult.total_time_ms || 0,
      judge: graphResult.judge,
    };

    battleHistory.push(battleRecord);
    if (battleHistory.length > 50) battleHistory.shift();

    return res.json({
      success: true,
      battle: battleRecord,
      models: MODELS_INFO,
    });
  } catch (error: any) {
    console.error("[ARENA ERROR]", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to execute battle in LangGraph arena.",
    });
  }
});

export default app;
