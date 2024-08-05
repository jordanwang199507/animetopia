import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const POST = async (req) => {
  const {
    userId,
    title,
    author,
    genre,
    image,
    description,
    season,
    episode,
    status,
  } = await req.json();
  try {
    await connectToDB();
    const newPost = new Post({
      creator: userId,
      title,
      author,
      genre,
      image: {
        data: Buffer.from(image.split(",")[1], "base64"), // Fix here
        contentType: "image/jpeg",
      },
      description,
      season,
      episode,
      status,
    });
    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new post", { status: 500 });
  }
};
