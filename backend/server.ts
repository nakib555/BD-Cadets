import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Cache of questions for high performance scaleability (10k+ to 50k+ questions)
let cachedQuestions: any[] = [];

function loadQuestions() {
  try {
    const filePath = path.join(process.cwd(), "backend", "questions.json");
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(data);
      cachedQuestions = parsed.questions || [];
      console.log(`[API Server] Loaded ${cachedQuestions.length} MCQs successfully from ${filePath}.`);
    } else {
      // Fallback to src/data/questions.json if backend folder isn't copied in some environment builds
      const fallbackPath = path.join(process.cwd(), "src", "data", "questions.json");
      if (fs.existsSync(fallbackPath)) {
        const data = fs.readFileSync(fallbackPath, "utf-8");
        const parsed = JSON.parse(data);
        cachedQuestions = parsed.questions || [];
        console.log(`[API Server] Loaded ${cachedQuestions.length} MCQs from fallback ${fallbackPath}.`);
      } else {
        console.warn(`[API Server] questions.json not found anywhere. Empty list loaded.`);
        cachedQuestions = [];
      }
    }
  } catch (error) {
    console.error("[API Server] Failed to read questions.json:", error);
    cachedQuestions = [];
  }
}

// Perform initial load
loadQuestions();

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Vercel serverless function is fully operational!" });
});

app.get("/api/questions", (req, res) => {
  // Hot-reload in development mode so user changes to questions.json are instantly reflected
  if (process.env.NODE_ENV !== "production") {
    loadQuestions();
  }

  const { subject, difficulty, limit } = req.query;
  let filtered = [...cachedQuestions];

  if (subject && subject !== "All" && subject !== "") {
    filtered = filtered.filter(
      q => q.subject && q.subject.toLowerCase() === (subject as string).toLowerCase()
    );
  }

  if (difficulty && difficulty !== "All" && difficulty !== "") {
    filtered = filtered.filter(
      q => q.difficulty && q.difficulty.toLowerCase() === (difficulty as string).toLowerCase()
    );
  }

  // Shuffle the filtered subset to ensure randomness in tests
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }

  const requestedLimit = parseInt(limit as string, 10) || 10;
  const result = filtered.slice(0, requestedLimit);

  res.json({
    questions: result,
    totalAvailable: filtered.length
  });
});

export default app;
