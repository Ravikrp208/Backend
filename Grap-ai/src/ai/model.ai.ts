import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import config from "../config/config.js";



export const geminiModel = new ChatGoogle({
    model: "gemini-flash-latest",
    apiKey: config.GOOGLE_API_KEY,
  
}); 

export const mistralAIModel = new ChatMistralAI({
apiKey: config.MistralAI_API_KEY,
    model: "mistralai/medium-latest",
});

export const cohereModel = new ChatCohere({
    apiKey: config.CHERE_API_KEY,
    model: "command-command-a-03-2025",
});