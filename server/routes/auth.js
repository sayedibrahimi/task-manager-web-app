import express from "express";
const router = express.Router();

import authUser from "../controllers/auth.js";
import resetPassword from "../controllers/resetPassword.js";
import auth from "../middlewares/auth.js";

router.post("/", authUser);

router.post("/reset-password", auth, resetPassword);

export default router;
