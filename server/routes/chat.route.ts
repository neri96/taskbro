import express from "express";

const router = express.Router();

import {
  getMessages,
  getPrivateMessages,
  createMessage,
} from "../controllers/chat.controller";

router.get("/messages", getMessages);
router.get("/private-messages", getPrivateMessages);
router.post("/create", createMessage);

export default router;
