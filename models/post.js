import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  season: {
    type: Number,
  },
  episode: {
    type: Number,
  },
  status: {
    type: String,
    required: [true, "Status is required"],
  },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
