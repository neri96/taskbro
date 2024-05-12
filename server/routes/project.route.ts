import express from "express";
import multer from "multer";

const router = express.Router();

import {
  getOne,
  getAll,
  create,
  edit,
  complete,
  addTask,
  modifyTask,
  addFiles,
  kickMember,
} from "../controllers/project.controller";

import { storage, checkFileType } from "../middleware/multer";
import auth from "../middleware/auth";

export const itemValidation = [];

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    checkFileType(file, cb);
  },
});

router.get("/one", auth, getOne);
router.get("/all", auth, getAll);
router.post("/create", auth, create);
router.patch("/edit", auth, edit);
router.patch("/complete", auth, complete);

router.post("/task-add", auth, addTask);
router.patch("/task-modify", auth, modifyTask);

router.post("/file-add", auth, upload.any(), addFiles);

router.patch("/kick", auth, kickMember);

export default router;
