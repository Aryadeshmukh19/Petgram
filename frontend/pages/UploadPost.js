import React, { useState } from 'react';
import axios from 'axios';
import './UploadPost.css'; // Optional: Add styling

const UploadPost = () => {
  const [username, setUsername] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!username || !caption || !image) {
      setMessage("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/upload-image?username=${username}&caption=${caption}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage("Post uploaded successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Error uploading post.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload a Pet Post 🐾</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br/>
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        /><br/>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        /><br/>
        <button type="submit">Upload Post</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadPost;
