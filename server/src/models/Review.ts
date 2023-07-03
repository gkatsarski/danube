import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
