import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
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

  const { subject, difficulty, limit, ignoreIds } = req.query;
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

  if (ignoreIds && typeof ignoreIds === 'string' && ignoreIds.trim() !== '') {
    const idsToIgnore = ignoreIds.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id));
    if (idsToIgnore.length > 0) {
      filtered = filtered.filter(q => !idsToIgnore.includes(q.id));
    }
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

// Progress and Saved Questions data paths
const USER_DATA_FILE = path.join(process.cwd(), "backend", "user_data.json");

function loadUserData() {
  try {
    if (fs.existsSync(USER_DATA_FILE)) {
      return JSON.parse(fs.readFileSync(USER_DATA_FILE, "utf-8"));
    }
  } catch (error) {
    console.error("[API Server] Failed to read user_data.json:", error);
  }
  return { userData: null, savedQuestions: null };
}

function saveUserData(data: any) {
  try {
    fs.writeFileSync(USER_DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("[API Server] Failed to write user_data.json:", error);
    return false;
  }
}

app.get("/api/user-data", (req, res) => {
  const data = loadUserData();
  res.json(data);
});

app.post("/api/user-data", (req, res) => {
  const success = saveUserData(req.body);
  if (success) {
    res.json({ status: "ok" });
  } else {
    res.status(500).json({ status: "error", message: "Failed to save user data" });
  }
});

export default app;
