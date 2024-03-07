import express from "express";

const router = express.Router();

import { getAll, read } from "../controllers/notification.controller";

router.get("/all", getAll);
router.patch("/read", read);

export default router;
