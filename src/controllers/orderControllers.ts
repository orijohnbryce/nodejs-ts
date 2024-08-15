import express, { NextFunction, Request, Response } from "express";
import { appConfig } from "../utils/appConfig";
import { createOrder, deleteOrder, getOrder } from "../services/orderService";
import OrderModel from "../models/orderModel";
import { StatusCode } from "../models/statusEnum";
import {
  verifyToeknAdminMW,
  verifyToeknMW,
} from "../middlewares/authMiddlewares";
import { OrderProductModel } from "../models/orderProductModel";

export const orderRouter = express.Router();

// get order (by id)
orderRouter.get(
  appConfig.routePrefix + "/order/:id",
  verifyToeknMW,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const order: OrderModel = await getOrder(+request.params.id);

      // todo: make sure the authed user is the user inside the order

      response.json(order);
    } catch (error) {
      next(error);
    }
  }
);

// create order
orderRouter.post(
  appConfig.routePrefix + "/order",
  verifyToeknMW,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      //   const curDate: string = String(new Date().toLocaleDateString("en-GB"));

      // create orderModel
      const order = new OrderModel(
        response.locals.user.id,
        // productList,
        new Date(),
        request.body.comments || ""
      );

      // create orderProductModel[]
      let orderItems: OrderProductModel[] = [];
      for (const p of request.body.productList) {
        orderItems.push(new OrderProductModel(p));
      }
      order.products = orderItems;

      const createdId = await createOrder(order);
      response.status(StatusCode.Created).json({ createdId: createdId });
    } catch (error) {
      next(error);
    }
  }
);

orderRouter.delete(
  appConfig.routePrefix + "/order/:id",
  // verifyToeknAdminMW,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await deleteOrder(+request.params.id);
      response.status(StatusCode.Ok).send("deleted");
    } catch (error) {
      next(error);
    }
  }
);
