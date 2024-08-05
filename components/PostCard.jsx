"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import localFont from "next/font/local";

const electro = localFont({
  src: "../public/assets/fonts/Electroharmonix.otf",
});
const zou002 = localFont({
  src: "../public/assets/fonts/002zouver.2-Regular.ttf",
});

const PostCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
  refreshPosts,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [status, setStatus] = useState(post.status);
  const [season, setSeason] = useState(post.season);
  const [episode, setEpisode] = useState(post.episode);
  const [copied, setCopied] = useState("");
  const [isContentVisible, setContentVisible] = useState(false);

  const handleCopy = () => {
    setCopied(post.title);
    navigator.clipboard.writeText(post.title);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      const response = await fetch(`/api/post/${post._id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedPost = await response.json();
      setStatus(updatedPost.status);
      refreshPosts();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const handleSeasonChange = async (e) => {
    const newSeason = e.target.value;
    setSeason(newSeason);

    try {
      const response = await fetch(`/api/post/${post._id}/season`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ season: newSeason }),
      });

      if (!response.ok) {
        throw new Error("Failed to update season");
      }

      const updatedPost = await response.json();
      setSeason(updatedPost.season);
      refreshPosts();
    } catch (error) {
      console.error("Error updating season:", error);
    }
  };

  const handleEpisodeChange = async (e) => {
    const newEpisode = e.target.value;
    setEpisode(newEpisode);

    try {
      const response = await fetch(`/api/post/${post._id}/episode`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ episode: newEpisode }),
      });

      if (!response.ok) {
        throw new Error("Failed to update episode");
      }

      const updatedPost = await response.json();
      setEpisode(updatedPost.episode);
      refreshPosts();
    } catch (error) {
      console.error("Error updating episode:", error);
    }
  };
  // Create the image URL
  let imageUrl = "";
  try {
    imageUrl = `data:${post.image.contentType};base64,${Buffer.from(
      post.image.data
    ).toString("base64")}`;
  } catch (error) {
    console.error("Error creating image URL:", error);
  }
  useEffect(() => {
    if (pathName === "/profile") {
      setContentVisible(true);
    }
  }, [pathName]);

  const postViewTitle = () => {
    switch (status) {
      case "In Progress":
      case "Future":
        return "On";
      case "Finished":
        return "Last Viewed";
      default:
        return "";
    }
  };
  return (
    <div className="post_card">
      <div className="flex flex-row justify-between items-center mb-2">
        <div className="post_creator w-1/2 flex flex-row justify-between items-center">
          <div className="w-1/3">
            <Image
              src={post.creator.image}
              alt="user_image"
              width={25}
              height={25}
              className="rounded-full object-contain"
            />
          </div>
          <div className="flex flex-col w-3/4">
            <h3
              className={`post_creator-name font-semibold text-black ${zou002.className}`}
            >
              {post.creator.username}
            </h3>
            <p className="font-outfit post_creator-email text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="post_actions">
          {session?.user.id === post.creator._id && pathName === "/profile" ? (
            <div className="mt-t flex-center gap-4">
              <div className="tooltip-container">
                <div className="edit_btn" onClick={handleEdit}>
                  <Image
                    src={"assets/icons/edit.svg"}
                    width={12}
                    height={12}
                    alt="edit button"
                  />
                </div>
                <span className="tooltip-text">Edit Content</span>
              </div>
              <div className="tooltip-container">
                <div className="delete_btn" onClick={handleDelete}>
                  <Image
                    src={"assets/icons/delete.svg"}
                    width={12}
                    height={12}
                    alt="delete button"
                  />
                </div>
                <span className="tooltip-text">Delete</span>
              </div>
            </div>
          ) : (
            <div className="mt-t flex-center gap-4">
              <div className="tooltip-container">
                <div
                  className={`${
                    copied === post.title ? "copy_btn-active" : "copy_btn"
                  }`}
                  onClick={handleCopy}
                >
                  <Image
                    src={
                      copied === post.title
                        ? "/assets/icons/tick.svg"
                        : "assets/icons/copy.svg"
                    }
                    width={12}
                    height={12}
                    alt="copy button"
                  />
                </div>
                <span className="tooltip-text">Copy</span>
              </div>
              <div className="tooltip-container">
                <div
                  className={`${!isContentVisible ? "show_btn" : "hide_btn"}`}
                  onClick={() => setContentVisible(!isContentVisible)}
                >
                  <Image
                    src={
                      !isContentVisible
                        ? "/assets/icons/down.svg"
                        : "assets/icons/up.svg"
                    }
                    width={12}
                    height={12}
                  />
                </div>
                <span className="tooltip-text">
                  {isContentVisible ? "Hide Details" : "Show Description"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="post_anime-title pl-2 pr-2">
        <p className={`${zou002.className} text-sm text-black pt-3 pb-3`}>
          {post.title}
        </p>
      </div>
      <div className="post_anime-content">
        <span className="post_author">
          <p className={`${electro.className} text-black`}>{post.author}</p>
        </span>
        <div className="flex justify-between">
          <Image src={imageUrl} width={120} height={50} alt="thumbnail" />
          <div className="flex flex-col w-32 ">
            <h3 className={`${zou002.className} post_viewTitle`}>
              {postViewTitle()}
            </h3>
            <div className="flex justify-between post_view">
              <div className="font-outfit w-1/2">
                <p className="post_view-subheading">Season</p>{" "}
                <input
                  type="number"
                  value={season}
                  onChange={handleSeasonChange}
                  className={`post_viewInput cursor-pointer ${zou002.className}`}
                />
              </div>
              <div className="font-outfit w-1/2">
                <p className="post_view-subheading">Eps.</p>
                <input
                  type="number"
                  value={episode}
                  onChange={handleEpisodeChange}
                  className={`post_viewInput cursor-pointer ${zou002.className}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* <button
          onClick={() => setContentVisible(!isContentVisible)}
          className="font-outfit text-sm text-blue-500"
        >
          {isContentVisible ? "Hide Details" : "Show Details"}
        </button> */}

        {isContentVisible && (
          <>
            <p className="mt-3 font-outfit text-sm text-black post_description">
              {post.description}
            </p>
            {/* <img src={imageUrl} alt="post image" className="object-contain" /> */}
          </>
        )}
      </div>
      <div className="flex flex-row items-center mt-2">
        {" "}
        <p
          className={`${electro.className} blue_gradient cursor-pointer post_genre`}
          onClick={() => handleTagClick && handleTagClick(post.genre)}
        >
          #{post.genre}
        </p>
        <div className="post_status ml-auto">
          <select
            value={status}
            onChange={handleStatusChange}
            className={`post_status-input cursor-pointer ${zou002.className}`}
          >
            <option value="Future">Future</option>
            <option value="In Progress">In Progress</option>
            <option value="Finished">Finished</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
