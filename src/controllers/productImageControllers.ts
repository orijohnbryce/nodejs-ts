import express, { NextFunction, Request, Response } from "express"
import { appConfig } from "../utils/appConfig";
import { UploadedFile } from "express-fileupload";
import { StatusCode } from "../models/statusEnum";
import { getProductImages, saveProductImage } from "../services/productImageService";
import path from "path";

export const productImageRouter = express.Router();


productImageRouter.get(appConfig.routePrefix + "/images/:pid",
    async (req: Request, res: Response, next: NextFunction) => {
        const pid = +req.params.pid;
        const images = await getProductImages(pid);
        res.status(StatusCode.Ok).json(images);
    })


productImageRouter.get(appConfig.routePrefix + "/image/:imageId",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fullpath = path.join(appConfig.prodcutsImagesPrefix, req.params.imageId);
            res.sendFile(fullpath);
        } catch (error) {
            next(error);
        }
    })

productImageRouter.post(appConfig.routePrefix + "/image/:product_id",
    async (req: Request, res: Response, next: NextFunction) => {

        try {
            const pid = +req.params.product_id;
            const image = req.files?.image as UploadedFile;

            if (!image) {
                res.status(StatusCode.BadRequest).send("image missing");
                return;
            }
            const imageName = await saveProductImage(pid, image)
            res.status(StatusCode.Created).send(imageName);
        } catch (error) {
            next(error)
        }
    })