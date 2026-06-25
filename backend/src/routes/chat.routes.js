import express from "express";
import { getMessages } from "../controllers/chat.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:projectId", protect, getMessages);

export default router;