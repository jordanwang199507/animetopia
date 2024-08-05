import { connectToDB } from "@utils/database";
import Post from "@models/post";

// GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const post = await Post.findById(params.id).populate("creator");
    if (!post) return new Response("Post not found", { status: 404 });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch post", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { title, author, genre, image, description, season, episode, status } =
    await request.json();

  try {
    await connectToDB();
    const exisitingPost = await Post.findById(params.id);
    if (!exisitingPost) return Response("Post not found", { status: 404 });

    exisitingPost.title = title;
    exisitingPost.author = author;
    exisitingPost.genre = genre;
    if (image) {
      exisitingPost.image = {
        data: Buffer.from(image.split(",")[1], "base64"),
        contentType: "image/jpeg",
      };
    }
    exisitingPost.description = description;
    exisitingPost.season = season;
    exisitingPost.episode = episode;
    exisitingPost.status = status;
    await exisitingPost.save();
    return new Response(JSON.stringify(exisitingPost), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update post", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Post.findByIdAndDelete(params.id);
    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleteing post", { status: 500 });
  }
};
