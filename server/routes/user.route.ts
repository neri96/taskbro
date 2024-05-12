import express from "express";
import multer from "multer";

const router = express.Router();

import {
  me,
  getOne,
  changeImage,
  search,
  edit,
  modifyFavList,
} from "../controllers/user.controller";

import { storage, checkFileType } from "../middleware/multer";

import auth from "../middleware/auth";

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    checkFileType(file, cb);
  },
});

router.get("/me", me);
router.get("/one", auth, getOne);
router.patch("/edit", auth, edit);
router.post("/image", auth, upload.single("image"), changeImage);
router.get("/search", auth, search);
router.patch("/favmodify", auth, modifyFavList);

export default router;
