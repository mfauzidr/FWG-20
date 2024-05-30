import multer, { Field, Options, diskStorage } from "multer";
import path from "path";
import { AppParams } from "../models/params";
import { NextFunction } from "express-serve-static-core";
import { Request, Response } from "express"

const multerDisk = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/imgs");
  },
  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname);
    const newFileName = `image-${Date.now()}${extName}`;
    cb(null, newFileName);
  },
});

const multerOptions: Options = {
  storage: multerDisk,
  limits: {
    fileSize: 1e6
  },
  fileFilter: (req, file, cb) => {
    const allowedExtRe = /jpg|png|jpeg/gi;
    const extName = path.extname(file.originalname);
    if (!allowedExtRe.test(extName)) return cb(new Error("Incorrect File"));
    cb(null, true);
  },
};

const uploader = multer(multerOptions);

export const singleUploader = (fieldName: string) => (req: Request, res: Response, next: NextFunction) => {
  const upload = uploader.single(fieldName)
  upload(req, res, function (err) {
    if (err instanceof Error) {
      return res.status(404).json({
        message: "Invalid",
        err: err.message
      })
    }
    next()
  })
};

export const multiUploader = (fieldName: string, maxCount: number) => uploader.array(fieldName, maxCount);
export const multiFieldUploader = (fieldConfig: Field[]) => uploader.fields(fieldConfig);