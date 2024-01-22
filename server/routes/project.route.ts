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

export const itemValidation = [];

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    checkFileType(file, cb);
  },
});

router.get("/one", getOne);
router.get("/all", getAll);
router.post("/create", create);
router.patch("/edit", edit);
router.patch("/complete", complete);

router.post("/task-add", addTask);
router.patch("/task-modify", modifyTask);

router.post("/file-add", upload.any(), addFiles);

router.patch("/kick", kickMember);

export default router;
