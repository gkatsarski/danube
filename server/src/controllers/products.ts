import Product from "../models/Product";
import { Request, Response } from "express";

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err: any) {
    res.status(500).send(`Could not get products: ${err}`);
    console.error(err);
  }
}

export async function postProduct(req: Request, res: Response) {
  try {
    const product = await Product.create(req.body);

    res.status(201).location(`/api/products/${product._id}`).send("Created");
  } catch (err: any) {
    console.error(err);
    res.status(500).send(`Could not create product: ${err}`);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) throw new Error("Product with this ID does not exist");
    res.status(200).json(product);
  } catch (err: any) {
    console.log(err);
    res.status(500).send(`Could not find product: ${err}`);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    console.log(req.body);
    const product = await Product.findOneAndUpdate(
      { _id: req.params.productId },
      req.body,
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );
    console.log(product);
    res.status(200).send("Product updated");
  } catch (err: any) {
    console.log(err);
    res.status(500).send(`Could not update product: ${err}`);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  console.log(req.params.productId);
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.productId,
    });
    if (!product) throw new Error("Product with this ID does not exist");
    res.status(200).send("Product deleted");
  } catch (err: any) {
    console.log(err);
    res.status(500).send(`Could not delete product: ${err}`);
  }
}
