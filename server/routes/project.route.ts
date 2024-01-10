import express from "express";

const router = express.Router();

import { getAll, create, edit } from "../controllers/project.controller";

import auth from "../middleware/auth";

router.get("/all", auth, getAll);
router.post("/create", auth, create);
router.patch("/edit", auth, edit);

export default router;
