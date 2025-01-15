import express from "express";
const router = express.Router();

import { getTeamMembers } from "../controllers/team.js";
import auth from "../middlewares/auth.js";

router.get("/get-team-members", auth, getTeamMembers);

export default router;
