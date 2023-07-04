import User from "../models/User";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).send(`Could not get users: ${err}`);
    console.error(err);
  }
}

export async function postUser(req: Request, res: Response) {
  try {
    const user = await User.create(req.body);

    res.status(201).location(`/api/users/${user._id}`).send("Created");
  } catch (err: any) {
    console.error(err);
    res.status(500).send(`Could not create user: ${err}`);
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) throw new Error("User with this ID does not exist");
    res.status(200).json(user);
  } catch (err: any) {
    console.log(err);
    res.status(500).send(`Could not find user: ${err}`);
  }
}

export async function updateUser(req: Request, res: Response) {
  console.log(req.params.userId);
  try {
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
  } catch (error: any) {
    console.log(error);
    res.status(500).send(`Could not update user: ${error}`);
  }
}

export async function deleteUser(req: Request, res: Response) {
  console.log(req.params.userId);
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });
    if (!user) throw new Error("User with this ID does not exist");
    res.status(200).send("User deleted");
  } catch (err: any) {
    console.log(err);
    res.status(500).send(`Could not delete user: ${err}`);
  }
}

export async function logIn(req: Request, res: Response) {
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

    const token: string = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.SECRET_KEY!,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).send(`Login successful ${token}`);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Could not log in: ${err}`);
  }
}
