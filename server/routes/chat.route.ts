import express from "express";

const router = express.Router();

import { me, search } from "../controllers/user.controller";

router.get("/me", me);
router.get("/search", search);

export default router;
