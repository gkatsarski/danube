import express, { Request, Response, response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import User from "./models/User";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).send(`Could not get users: ${err}`);
    console.error(err);
  }
});

app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);

    res.status(201).location(`/api/users/${user._id}`).send("Created");
  } catch (err: any) {
    console.error(err);
    res.status(500).send(`Could not create user: ${err}`);
  }
});

app.get("/api/users/:userId/", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) throw new Error("User with this ID does not exist");
    res.status(200).json(user);
  } catch (err: any) {
    console.log(err);
    res.status(500).send(`Could not find user: ${err}`);
  }
});

app.put("/api/users/:userId/", async (req: Request, res: Response) => {
  console.log(req.params.userId);
  try {
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );
    console.log(user);
    res.status(200).send("User updated");
  } catch (err: any) {
    console.log(err);
    res.status(500).send(`Could not update user: ${err}`);
  }
});

app.delete("/api/users/:userId/", async (req: Request, res: Response) => {
  console.log(req.params.userId);
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });
    if (!user) throw new Error("User with this ID does not exist");
    res.send("User deleted");
  } catch (err: any) {
    console.log(err);
    res.status(500).send(`Could not delete user: ${err}`);
  }
});

app.post("/api/login", async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } =
    req.body;

  if (!username || !password) {
    return res.status(400).send("Error: username and password are required");
  }
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).send("Error: Invalid username or password");
    }

    res.status(200).send("Login successful");
  } catch (err) {
    console.error(err);
    res.status(500).send(`Could not log in: ${err}`);
  }
});

mongoose.connect("mongodb://127.0.0.1:27017/danube").then(() => {
  console.log("Successfully connected to the DB");
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
