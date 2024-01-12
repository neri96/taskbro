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

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    checkFileType(file, cb);
  },
});

router.get("/me", me);
router.get("/one", getOne);
router.patch("/edit", edit);
router.post("/image", upload.single("image"), changeImage);
router.get("/search", search);
router.patch("/favmodify", modifyFavList);

export default router;
