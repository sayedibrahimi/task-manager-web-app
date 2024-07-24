import express from "express";
const router = express.Router();

import auth from "../middlewares/auth.js";

import { getAllBoards, createBoard } from "../controllers/boards.js";

router.get("/", auth, getAllBoards);
router.post("/", auth, createBoard);

export default router;
