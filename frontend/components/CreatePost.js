import React, { useState } from "react";
import axios from "axios";
import "../styles/CreatePost.css";

const CreatePost = ({ onPostCreated }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [owner, setOwner] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !caption || !owner) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    formData.append("owner", owner);

    try {
      await axios.post("http://127.0.0.1:8000/create_post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Post created successfully!");
      onPostCreated(); // Refresh posts
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="create-post-container">
      <h2>Upload Your Pet's Post 🐶📸</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <input
          type="text"
          placeholder="Owner Username"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        <button type="submit">Upload Post 🚀</button>
      </form>
    </div>
  );
};

export default CreatePost;
