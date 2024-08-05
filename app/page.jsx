"use client";
import { useSession } from "next-auth/react";
import localFont from "next/font/local";
import { useState, useEffect } from "react";

import PostCard from "@components/PostCard";

const electro = localFont({
  src: "../public/assets/fonts/Electroharmonix.otf",
});
const zou002 = localFont({
  src: "../public/assets/fonts/002zouver.2-Regular.ttf",
});

const PostCardList = ({ data, handleTagClick, refreshPosts }) => {
  return (
    <div className="mt-10 mb-10 post_layout">
      {data.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
          refreshPosts={refreshPosts}
        />
      ))}
    </div>
  );
};

const Home = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setFilteredPosts(
      posts.filter(
        (post) =>
          post.title.toLowerCase().includes(value.toLowerCase()) ||
          post.author.toLowerCase().includes(value.toLowerCase()) ||
          post.genre.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleTagClick = (genre) => {
    setSearchText(genre);

    const filtered = posts.filter((post) =>
      post.genre.toLowerCase().includes(genre.toLowerCase())
    );

    setFilteredPosts(filtered);
  };

  const fetchPosts = async () => {
    if (status === "authenticated" && session) {
      // Ensure session is authenticated
      const response = await fetch(`/api/post?userId=${session.user.id}`);

      if (!response.ok) {
        console.error("Failed to fetch posts:", response.status);
        return;
      }

      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [status, session]); // Add status and session as dependencies

  const futurePosts = filteredPosts.filter((post) => post.status === "Future");
  const inProgressPosts = filteredPosts.filter(
    (post) => post.status === "In Progress"
  );
  const finishedPosts = filteredPosts.filter(
    (post) => post.status === "Finished"
  );

  return (
    <section className="w-full">
      <div className="flex flex-col w-full items-start hero_header">
        <h1 className={`${electro.className} head_text`}>
          Track & Store <span className={`${zou002.className}`}> Animes</span>
        </h1>
        <p className="desc text-left font-outfit">
          At Animetopia, you can create detailed records of your favorite anime
          and keep track of your current seasons and episodes. Easily organize
          your anime collection by watch status into lists such as In Progress,
          Future Watch, and Finished.
        </p>

        <form className="relative w-72 search_bar">
          <input
            type="text"
            placeholder="Search for title, author or genre"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>
      </div>

      <div>
        <h2 className={`${zou002.className} head_subtitle text-left mt-10`}>
          In Progress
        </h2>
        <PostCardList
          data={inProgressPosts}
          handleTagClick={handleTagClick}
          refreshPosts={fetchPosts}
        />
        <h2 className={`${zou002.className} head_subtitle text-left mt-10`}>
          Future
        </h2>
        <PostCardList
          data={futurePosts}
          handleTagClick={handleTagClick}
          refreshPosts={fetchPosts}
        />
        <h2 className={`${zou002.className} head_subtitle text-left mt-10`}>
          Finished
        </h2>
        <PostCardList
          data={finishedPosts}
          handleTagClick={handleTagClick}
          refreshPosts={fetchPosts}
        />
      </div>
    </section>
  );
};

export default Home;
