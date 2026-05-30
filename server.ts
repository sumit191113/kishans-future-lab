import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // Initialize Gemini Client safely on the server side
  let ai: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is required to prompt Future Nexus AI.");
      }
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return ai;
  }

  // API Endpoint for User Queries (Future Nexus AI)
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, chatHistory } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message must be a non-empty string" });
      }

      const client = getGeminiClient();

      // Format current conversation history or system context
      // Help Kishan Maurya with learning developer habits, business thinking, English vocabulary, and typing velocity.
      const systemInstruction = 
        "You are 'Future Nexus AI', a premium, highly inspiring, intelligent, and motivating AI Companion for Kishan's Future Lab. " +
        "You help Kishan Maurya (and other users) with their daily growth plan: English vocabulary, software engineering, " +
        "AI prompting skills, typing precision, and micro-startup brainstorming. " +
        "CRITICAL REQUIREMENT: Keep your responses extremely short, sharp, and concise (under 2 to 3 sentences or quick bullet points). " +
        "Do NOT write long paragraphs. Be brief, direct, elegant, and exciting.";

      // Build standard chat parameter
      const contents = [];
      
      // Inject previous chat history if provided
      if (Array.isArray(chatHistory)) {
        for (const turn of chatHistory) {
          contents.push({
            role: turn.role === "user" ? "user" : "model",
            parts: [{ text: turn.text || "" }]
          });
        }
      }
      
      // Append the latest user query
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I was unable to synthesize a response at this time.";
      return res.json({ reply: replyText });

    } catch (error: any) {
      console.error("Future Nexus AI Error:", error);
      return res.status(500).json({ 
        error: error.message || "An unexpected error occurred inside Future Nexus AI core model handler."
      });
    }
  });

  // Vite development middleware or static production serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server (Future Nexus core) running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical server bootstrap failure:", err);
  process.exit(1);
});
