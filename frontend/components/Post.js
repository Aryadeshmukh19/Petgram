import React from "react";
import "../styles/Post.css";

const Post = ({ post }) => {
  return (
    <div className="post-card">
      <img src={post.image} alt="Pet" className="post-image" />
      <div className="post-content">
        <h3 className="post-owner">@{post.owner}</h3>
        <p className="post-caption">{post.caption}</p>
        <div className="post-actions">
          <button className="like-btn">❤️ {post.likes}</button>
          <button className="comment-btn">💬 Comment</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
