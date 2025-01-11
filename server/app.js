import path from "path";
import express from "express";
import cors from "cors";
import notFound from "./middlewares/notFound.js";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";

import auth from "./routes/auth.js";
import users from "./routes/users.js";
import tasks from "./routes/tasks.js";
import invites from "./routes/invites.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// middleware
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || "*", // Set a specific origin or allow all
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/tasks", tasks);
app.use("/api/v1/invites", invites);

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Serve Vite-built frontend files from the 'dist' directory
const distPath = path.join(__dirname, "../client/dist");
app.use(express.static(distPath));

// Handle requests to index.html so that client-side routing works
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Handle not found routes
app.use(notFound);

const PORT = process.env.PORT || 3000;

// Start the server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB(process.env.MONGO_URI);

    // Start listening on the specified port
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit the process with failure status
  }
};

startServer();
