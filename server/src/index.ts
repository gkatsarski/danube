import express, { Request, Response, response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import User from "./models/User";
import Product from "./models/Product";
import Order from "./models/Order";
import Review from "./models/Review";
import {
  deleteUser,
  getUserById,
  getUsers,
  logIn,
  postUser,
  updateUser,
} from "./controllers/users";
import {
  getProducts,
  postProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./controllers/products";
import {
  deleteOrder,
  getOrderById,
  getOrders,
  postOrder,
  updateOrder,
} from "./controllers/orders";
import { getReviews, postReview } from "./controllers/reviews";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

app.get("/api/users", getUsers);

app.post("/api/users", postUser);

app.get("/api/users/:userId/", getUserById);

app.put("/api/users/:userId/", updateUser);

app.delete("/api/users/:userId/", deleteUser);

app.post("/api/login", logIn);

app.get("/api/products", getProducts);

app.post("/api/products", postProduct);

app.get("/api/products/:productId/", getProductById);

app.put("/api/products/:productId/", updateProduct);

app.delete("/api/products/:productId/", deleteProduct);

app.get("/api/orders", getOrders);

app.post("/api/orders", postOrder);

app.get("/api/orders/:orderId/", getOrderById);

app.put("/api/orders/:orderId/", updateOrder);

app.delete("/api/orders/:orderId/", deleteOrder);

app.get("/api/products/:productId/reviews", getReviews);

app.post("/api/products/:productId/reviews", postReview);

mongoose.connect("mongodb://127.0.0.1:27017/danube").then(() => {
  console.log("Successfully connected to the DB");
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
