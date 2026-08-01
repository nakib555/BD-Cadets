import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import app from "./backend/server";

const PORT = 3000;

// Self-ping to prevent Render free tier backend from sleeping
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes
setInterval(() => {
  const url = process.env.RENDER_EXTERNAL_URL 
    ? `${process.env.RENDER_EXTERNAL_URL}/api/health`
    : `http://localhost:${PORT}/api/health`;
    
  fetch(url)
    .then(res => {
      console.log(`[Keep-Alive] Pinged ${url} - Status: ${res.status}`);
    })
    .catch(err => {
      console.error(`[Keep-Alive] Failed to ping ${url}:`, err.message);
    });
}, PING_INTERVAL);

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
