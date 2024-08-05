"use client";
import Link from "next/link";
import localFont from "next/font/local";
import { useState } from "react";

const electro = localFont({
  src: "../public/assets/fonts/Electroharmonix.otf",
});
const zou002 = localFont({
  src: "../public/assets/fonts/002zouver.2-Regular.ttf",
});

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [updateImage, setUpdateImage] = useState(false);

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className={`${zou002.className} head_text text-left form_text`}>
        {type} Post
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share dope animes with other weebs, and store your favourite
        animes in your personal profile.
      </p>
      <form
        onSubmit={(e) => handleSubmit(e, updateImage)}
        className="mt-2 mb-10 w-full max-w-2xl flex flex-col gap-7 createPost_form"
      >
        <div className="flex flex-row form_row">
          <label className="w-1/2 mr-2 form_row-container">
            <span className={`${zou002.className} form_label`}>
              Anime Title
            </span>
            <input
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              placeholder="e.g One Piece"
              required
              className="form_input"
            />
          </label>
          <label className="w-1/2 ml-2 form_row-container">
            <span className={`${zou002.className} form_label`}>Author</span>
            <input
              value={post.author}
              onChange={(e) => setPost({ ...post, author: e.target.value })}
              placeholder="e.g Eiichiro Oda"
              required
              className="form_input"
            />
          </label>
        </div>

        <label>
          <span className={`${zou002.className} form_label`}>
            Genre {``}
            <span className="font-outfit">(#action, #shōnen, #shojo)</span>
          </span>
          <input
            value={post.genre}
            onChange={(e) => setPost({ ...post, genre: e.target.value })}
            placeholder="tag"
            className="form_input"
            required
          />
        </label>

        <label>
          <span className={`${zou002.className} form_label`}>Image</span>
          {post.image && !updateImage ? (
            <div className="flex items-center">
              <span className="font-outfit ml-3">Has Image</span>
              <button
                type="button"
                className="font-outfit ml-3 mt-1 px-5 py-1.5 bg-primary-orange rounded-full text-white"
                onClick={() => setUpdateImage(true)}
              >
                Update Image
              </button>
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPost({ ...post, image: reader.result });
                  setUpdateImage(true);
                };
                if (file) {
                  reader.readAsDataURL(file);
                }
              }}
              className="form_input"
            />
          )}
        </label>

        <label>
          <span className={`${zou002.className} form_label`}>Description</span>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder="Write the anime description here..."
            required
            className="form_textarea"
          ></textarea>
        </label>

        <div className="flex flex-row form_row">
          <label className="w-1/2 mr-2 form_row-container">
            <span className={`${zou002.className} form_label`}>
              Current Season
            </span>
            <input
              value={post.season}
              onChange={(e) => setPost({ ...post, season: e.target.value })}
              placeholder="e.g 3"
              className="form_input"
            />
          </label>
          <label className="w-1/2 ml-2 form_row-container">
            <span className={`${zou002.className} form_label`}>
              Current Episode
            </span>
            <input
              value={post.episode}
              onChange={(e) => setPost({ ...post, episode: e.target.value })}
              placeholder="e.g 24"
              className="form_input"
            />
          </label>
        </div>

        <div className="flex flex-row justify-between form_row">
          <label className="w-1/2 mr-2 form_row-container">
            <span className={`${zou002.className} form_label`}>
              Watch Status
            </span>
            <select
              value={post.status}
              onChange={(e) => setPost({ ...post, status: e.target.value })}
              className="form_input"
              required
            >
              <option value="Future">Future</option>
              <option value="In Progress">In Progress</option>
              <option value="Finished">Finished</option>
            </select>
          </label>
          <div className={`${electro.className} flex-end gap-4`}>
            <Link href="/" className="text-gray-500 text-sm">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-1.5 bg-primary-orange rounded-full text-white"
            >
              {submitting ? `${type}...` : type}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Form;
