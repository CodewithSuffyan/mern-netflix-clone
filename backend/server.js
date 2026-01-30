import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();
const __dirname = path.resolve();

// CORS ko simple rakhen Vercel ke liye
app.use(cors({ 
    origin: true, 
    credentials: true 
})); 

app.use(express.json()); 
app.use(cookieParser());

// Database connection ko route se pehle call karein (Serverless behavior)
connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

// Vercel deployment ke liye static files handling
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Vercel ke liye app ko export karna zaruri hai
export default app;

// Local testing ke liye listen rehne dein
if (process.env.NODE_ENV !== "production") {
    const PORT = ENV_VARS.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
}