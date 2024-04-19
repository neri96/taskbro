import express from "express";

const router = express.Router();

import {
  getMessages,
  getNewPrivateMessages,
  getPrivateMessages,
  readPrivateMsgs,
  createMessage,
} from "../controllers/chat.controller";

router.get("/messages", getMessages);
router.get("/new-private-messages", getNewPrivateMessages);
router.get("/private-messages", getPrivateMessages);
router.post("/read-private-messages", readPrivateMsgs);
router.post("/create", createMessage);

export default router;
