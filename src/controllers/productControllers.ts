import express, { Request, Response, NextFunction } from "express";
import { addProduct, getProducts, getProductsPaginated, updateProduct } from "../services/productService";
import ProductModel from "../models/productModel";
import { appConfig } from "../utils/appConfig";
import { StatusCode } from "../models/statusEnum";
import { verifyToeknAdminMW, verifyToeknMW } from "../middlewares/authMiddlewares";

export const productRouter = express.Router();

productRouter.get(appConfig.routePrefix + "/products-pg", 
    async (req: Request, res: Response, next: NextFunction)=>{
        try {
            const {page=0, limit=10} =  req.query;
            const products = await getProductsPaginated(page as number, limit as number);
            res.status(StatusCode.Ok).json(products);
        } catch (error) {
            next(error)
        }
    })

productRouter.get(appConfig.routePrefix + "/products", verifyToeknMW ,async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getProducts();
        res.status(StatusCode.Ok).json(products);
    } catch (error) {
        console.log(error);
        res.status(StatusCode.ServerError).send("Error. please try again later")
    }
})

productRouter.get(appConfig.routePrefix + "/products/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await getProducts(+req.params.id);
        res.status(StatusCode.Ok).json(product[0]);
    } catch (error) {

        if (error.message.includes("product id not found")) {
            next(new Error("ID not found"));
            return;
        }

        console.log(error);
        res.status(StatusCode.ServerError).send("Error. please try again later")
    }
})

productRouter.post(appConfig.routePrefix + "/products", verifyToeknAdminMW, async (req: Request, res: Response, next: NextFunction) => {

    try {
        const newProduct = new ProductModel(req.body);
        await addProduct(newProduct);
        res.status(201).send("ok");
    } catch (error) {
        next(error)
    }
})

productRouter.put(appConfig.routePrefix + "/products/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateProduct(req.body, +req.params.id);
        res.status(StatusCode.Ok).send("ok");
    } catch (error) {
        next(error)
    }
})


