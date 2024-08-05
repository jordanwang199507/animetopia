import PostCard from "./PostCard";
import localFont from "next/font/local";

const zou002 = localFont({
  src: "../public/assets/fonts/002zouver.2-Regular.ttf",
});

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className={`${zou002.className} head_text text-left profile_text`}>
        <span className="blue_gradient">Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 mb-10 post_layout">
        {data.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
