import express from "express";
import {
  aiChat
} from "../controllers/aiChatCntrl.js";
const router = express.Router();

router.post("/", aiChat);

export { router as aiChatRoute }
