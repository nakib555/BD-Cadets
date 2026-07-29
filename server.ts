import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GenAI safely
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API initialized successfully.");
  } catch (err) {
    console.error("Error initializing Gemini API:", err);
  }
} else {
  console.warn("GEMINI_API_KEY environment variable is not defined.");
}

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", apiInitialized: !!ai });
});

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format. Must be an array." });
  }

  if (!ai) {
    return res.json({
      role: "assistant",
      content: "Hello! I am operating in offline study mode because the `GEMINI_API_KEY` is not yet configured in **Settings > Secrets**. \n\nNo worries, Cadet! I can still answer basic questions offline. Please feel free to ask, or test yourself using our Mock Test section!"
    });
  }

  try {
    const systemInstruction = 
      "You are an expert Cadet College Admission Tutor and Instructor for BD Cadets, an educational platform in Bangladesh. " +
      "Your goal is to prepare class 6 students for the highly competitive Cadet College Admission Exam (written, viva, and physical). " +
      "The exam subjects are: Mathematics (100 marks), English (100 marks), Bangla (60 marks), and General Knowledge (40 marks). " +
      "Provide extremely helpful, encouraging, and accurate study notes, explain key concepts simply in Bengali and English, and give practice questions when asked. " +
      "Be professional, clear, and disciplined, addressing the user as 'Cadet'. Use clear markdown and lists.";

    // Take last 10 messages for safety and context length
    const recentMessages = messages.slice(-10);
    const contents = recentMessages.map((msg: any) => {
      return {
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({
      role: "assistant",
      content: response.text || "I apologize, I could not process that request."
    });
  } catch (error: any) {
    console.error("Error generating content from Gemini:", error);
    res.status(500).json({ error: "Failed to communicate with AI model. Please try again later." });
  }
});

// Vite middleware for development or serving build for production
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Error setting up Vite middleware:", err);
});
