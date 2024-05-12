import express from "express";

const router = express.Router();

import { getAll, read } from "../controllers/notification.controller";

import auth from "../middleware/auth";

router.get("/all", auth, getAll);
router.patch("/read", auth, read);

export default router;
