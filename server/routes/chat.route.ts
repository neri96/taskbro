import express from "express";

const router = express.Router();

import {
  getMessages,
  getNewPrivateMessages,
  getPrivateMessages,
  readPrivateMsgs,
  createMessage,
} from "../controllers/chat.controller";
import auth from "../middleware/auth";

router.get("/messages", auth, getMessages);
router.get("/new-private-messages", getNewPrivateMessages);
router.get("/private-messages", auth, getPrivateMessages);
router.post("/read-private-messages", auth, readPrivateMsgs);
router.post("/create", auth, createMessage);

export default router;
