"use client";

import { useEffect, useState } from "react";
import { useEffect, useState, Suspense } from "react";

import Form from "@components/Form";

const EditPost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    author: "",
    genre: "",
    image: "",
    description: "",
    season: "",
    episode: "",
    status: "",
  });

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();
      setPost({
        title: data.title,
        author: data.author,
        genre: data.genre,
        image: data.image,
        description: data.description,
        season: data.season,
        episode: data.episode,
        status: data.status,
      });
      console.log(data);
    };
    if (postId) getPostDetails();
  }, [postId]);

  const updatePost = async (e, updateImage) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) return alert("Post ID not found");

    try {
      const updateData = {
        title: post.title,
        author: post.author,
        genre: post.genre,
        description: post.description,
        season: post.season,
        episode: post.episode,
        status: post.status,
      };

      // Only include image if it has been updated
      if (updateImage && post.image) {
        updateData.image = post.image;
      }

      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify(updateData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  );
};
export default EditPost;
