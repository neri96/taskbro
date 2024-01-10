import express from "express";

const router = express.Router();

import {
  login,
  logout,
  refresh,
  register,
} from "../controllers/auth.controller";
import auth from "../middleware/auth";

export const itemValidation = [];

router.post("/register", itemValidation, register);
router.post("/login", itemValidation, login);
router.post("/logout", auth, logout);
router.post("/refresh", itemValidation, refresh);

export default router;
