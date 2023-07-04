import Order from "../models/Order";
import { Request, Response } from "express";

export async function getOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (err: any) {
    res.status(500).send(`Could not get orders: ${err}`);
    console.error(err);
  }
}

export async function postOrder(req: Request, res: Response) {
  try {
    const order = await Order.create(req.body);
    // handle invalid product and user IDs
    res.status(201).location(`/api/products/${order._id}`).send("Created");
  } catch (err: any) {
    console.error(err);
    res.status(500).send(`Could not create order: ${err}`);
  }
}

export async function getOrderById(req: Request, res: Response) {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) throw new Error("Order with this ID does not exist");
    res.status(200).json(order);
  } catch (err: any) {
    console.log(err);
    res.status(500).send(`Could not find order: ${err}`);
  }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    console.log(req.body);
    const order = await Order.findOneAndUpdate(
      { _id: req.params.orderId },
      req.body,
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );
    console.log(order);
    res.status(200).send("Order updated");
  } catch (err: any) {
    console.log(err);
    res.status(500).send(`Could not update order: ${err}`);
  }
}
export async function getOrdersByUserId(req: Request, res: Response) {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).send(`Could not get orders: ${error}`);
  }
}

export async function deleteOrder(req: Request, res: Response) {
  console.log(req.params.orderId);
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.orderId,
    });
    if (!order) throw new Error("Order with this ID does not exist");
    res.status(200).send("Order deleted");
  } catch (err: any) {
    console.log(err);
    res.status(500).send(`Could not delete order: ${err}`);
  }
}
