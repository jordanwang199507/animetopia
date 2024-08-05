import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const PATCH = async (request, { params }) => {
  const { status } = await request.json();

  try {
    await connectToDB();
    const exisitingPost = await Post.findById(params.id);
    if (!exisitingPost) return Response("Post not found", { status: 404 });

    exisitingPost.status = status;
    await exisitingPost.save();
    return new Response(JSON.stringify(exisitingPost), { status: 200 });
  } catch (error) {
    return new Response("Failed to update post", { status: 500 });
  }
};
