import React, { useState } from "react";
import "./CreatePost.css";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [petBio, setPetBio] = useState("");
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(""); // temporary username field

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("pet_bio", petBio);
    formData.append("user", username);
    formData.append("file", image);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.message === "Post uploaded successfully") {
        alert("Post uploaded!");
        setCaption("");
        setPetBio("");
        setImage(null);
        setUsername("");
      } else {
        alert("Failed to upload post.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="create-post-container">
      <h2>Upload Your Pet's Post 🐾</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <textarea
          placeholder="Pet Bio"
          value={petBio}
          onChange={(e) => setPetBio(e.target.value)}
          rows="3"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Upload Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
