const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: 50,
    },
    post: {
      type: String,
      max: 1000,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    like: {
      type: Number,
      default: 0,
    },
    comment: [],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
