import express from "express";

const router = express.Router();

import { me, getOne } from "../controllers/user.controller";

router.get("/me", me);
router.get("/one", getOne);

export default router;
