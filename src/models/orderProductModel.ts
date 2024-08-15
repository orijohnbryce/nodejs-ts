import Joi from 'joi';
import OrderModel from './orderModel';
import { ValidationError } from './exceptions';

export class OrderProductModel {
    productId: number;
    quantity: number;
    order?: OrderModel;

    constructor(op: Partial<OrderProductModel>) {
        this.order = op.order;
        this.productId = op.productId;
        this.quantity = op.quantity;
    }

    static schema = Joi.object({
        productId: Joi.number().positive().required(),
        quantity: Joi.number().min(1).required(),
        order: Joi.object().instance(OrderModel).optional(),
    });

    validate() {
        const res = OrderProductModel.schema.validate(this);
        if (res.error){                                                
            throw new ValidationError(res.error.details[0].message)            
        }
    }
}
