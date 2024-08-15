import Joi from "joi";
import ProductModel from "./productModel";
import { ValidationError } from "./exceptions";
import { OrderProductModel } from "./orderProductModel";

class OrderModel {
  id?: number;
  userId: number;
  date: Date;
  comments?: string;
  products: OrderProductModel[];

  constructor(
    userId: number,
    date: Date = new Date(),
    comments: string = "",
    id?: number,
    products: OrderProductModel[] = []
  ) {
    this.id = id;
    this.userId = userId;
    this.date = date;
    this.comments = comments;
    this.products = products;
  }

  static schema = Joi.object({
    id: Joi.number().optional(),
    userId: Joi.number().required(),
    products: Joi.array().items(Joi.object()).optional(),
    date: Joi.date().required(),
    comments: Joi.string().optional().allow(""),
  });

  validate() {
    let res = OrderModel.schema.validate(this);
    if (res.error) {
      throw new ValidationError(res.error.details[0].message);
    }
  }
}

export default OrderModel;
