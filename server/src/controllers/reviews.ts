import Review from "../models/Review";
import { Request, Response } from "express";

export async function getReviews(req: Request, res: Response) {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).json(reviews);
  } catch (err: any) {
    res.status(500).send(`Could not get reviews: ${err}`);
    console.error(err);
  }
}

export async function postReview(req: Request, res: Response) {
  try {
    const review = await Review.create(req.body);

    res
      .status(201)
      .location(`/api/products/${review.productId}/reviews`)
      .json(review);
  } catch (err: any) {
    console.error(err);
    res.status(500).send(`Could not create review: ${err}`);
  }
}
