import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
const PORT = 5000;

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).send("hello wordd!");
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("hw!");
});

mongoose.connect("mongodb://127.0.0.1:27017/cooking").then(() => {
  console.log("Successfully connected to the DB");
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
