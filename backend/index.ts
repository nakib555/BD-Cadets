import app from "./server.js";
import cors from "cors";

// Enable CORS for all origins (or specify Cloudflare Pages URL)
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
