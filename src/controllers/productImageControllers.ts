import express, { NextFunction, Request, Response } from "express";
import {
  getProductImages,
  saveProductImage,
} from "../services/productImageService";
import { UploadedFile } from "express-fileupload";
import { StatusCode } from "../models/statusEnum";
import { appConfig } from "../utils/appConfig";
import path from "path";

export const productImageRouter = express.Router();

productImageRouter.get(
  appConfig.routePrefix + "/images/:pid",
  async (req: Request, res: Response, next: NextFunction) => {
    const pid = +req.params.pid;
    const images = await getProductImages(pid);
    res.json(images);
  }
);

productImageRouter.get(
  appConfig.routePrefix + "/image/:imageId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imageFullPath = path.resolve(appConfig.productsImagesPrefix, req.params.imageId);        
          res.sendFile(imageFullPath);
    } catch (error) {
        console.log(error);
        
      next(error);
    }
  }
);

productImageRouter.post(
  appConfig.routePrefix + "/image/:productId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const image = req.files?.image as UploadedFile;
      if (!image) {
        return res.status(StatusCode.BadRequest).send("Image file is required");
      }
      const imagePath = await saveProductImage(Number(productId), image);      

      res
        .status(StatusCode.Created)
        .json({ message: "Image added", imagePath });
    } catch (error) {
      next(error);
    }
  }
);
