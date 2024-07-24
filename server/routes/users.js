import express from "express";
const router = express.Router();

import { createUser, getUser } from "../controllers/users.js";
import auth from "../middlewares/auth.js";

router.post("/", createUser);

// Route to get current user's details
router.get("/me", auth, getUser);

export default router;
