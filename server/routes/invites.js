// routes/invite.js
import express from "express";
import auth from "../middlewares/auth.js";
import {
  getAllInvites,
  invite,
  respondToInvite,
} from "../controllers/invites.js";

const router = express.Router();

router.post("/send-invite", auth, invite);

router.post("/respond-invite", auth, respondToInvite);

router.get("/get-all-invites", auth, getAllInvites);

export default router;
