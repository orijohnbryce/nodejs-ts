import runQuery from "../db/dal";
import { NotFoundError } from "../models/exceptions";
import OrderModel from "../models/orderModel";
import { OrderProductModel } from "../models/orderProductModel";
import { ResultSetHeader } from "mysql2";

export async function getOrder(id: number) {
  const orderRes: OrderModel[] = await runQuery(
    `select * from orders where id=${id};`
    //  todo: where email=locals.user.email ..
  );

  if (orderRes.length !== 1) {
    throw new NotFoundError("order not found!");
  }
  const order = orderRes[0];

  const products = await runQuery(
    `select product_id, quantity from orderItem where order_id=${id};`
  );
  const productObjects = products.map((p) => {
    return new OrderProductModel({
      productId: p.product_id,
      // order: order,  // no need! the response already has the order-info
      quantity: p.quantity,
    });
  });

  const orderObj = new OrderModel(
    order.userId,
    order.date,
    order.comments,
    order.id,
    productObjects
  );
  return orderObj;
}

export async function createOrder(order: OrderModel) {
  order.validate();
  for (const oi of order.products) {
    oi.validate();
  }
  let q = `INSERT INTO orders (user_id, created, comments) 
                  VALUES (${order.userId}, 
                          ${order.date.toLocaleDateString("en-GB")}, 
                         '${order.comments}')`;

  const res = (await runQuery(q)) as ResultSetHeader | any;

  const order_id = res.insertId;

  // create order_product records
  for (const p of order.products) {
    try {
      await runQuery(`INSERT INTO orderItem (order_id, product_id, quantity)
                      VALUES (${order_id}, ${p.productId}, ${p.quantity})`);
    } catch (error) {
      // todo: remove order?
      // maybe wrap all in single transaction
      // or check product-id exist at validate stage.
      if (error.message.includes("foreign key constraint")) {
        throw new NotFoundError("product id not found!");
      }
      throw error;
    }
  }
  return order_id;
}

export async function deleteOrder(id: number) {
  // order.validate();
  // make sure order is registered on the same auth-user, or its only for admin?

  // delete all order_products records
  const query = `delete from orderItem where order_id=${id}`;
  await runQuery(query);

  // delete order record
  await runQuery(`DELETE FROM orders WHERE id=${id}`);
  // should we check if order exists?
  
}
