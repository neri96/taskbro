import multer from "multer";

export const storage = multer.memoryStorage();

export const checkFileType = (file: any, cb: any) => {
  const fileTypes = /jpeg|txt|text|pdf|jpg|webp|png|gif|svg/;

  // const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  return cb(null, true);
};
