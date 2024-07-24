import express from "express";
const router = express.Router();
import {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  dashboardStatistics,
} from "../controllers/tasks.js";
import auth from "../middlewares/auth.js";

router.get("/", auth, getAllTasks);

router.post("/", auth, createTask);

router.get("/:id", auth, getTask);

router.patch("/:id", auth, updateTask);

router.delete("/:id", auth, deleteTask);

router.get("/dashboard", auth, dashboardStatistics);

export default router;
