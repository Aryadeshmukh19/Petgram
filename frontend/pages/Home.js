import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/posts")
      .then(response => {
        setPosts(response.data);
        const initialLikes = {};
        const initialComments = {};
        response.data.forEach(post => {
          initialLikes[post.id] = 0;
          initialComments[post.id] = [];
        });
        setLikes(initialLikes);
        setComments(initialComments);
      })
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("light-mode", !darkMode);
  };

  const handleLike = (id) => {
    setLikes({ ...likes, [id]: likes[id] + 1 });
  };

  const handleComment = (id, comment) => {
    if (comment.trim() !== "") {
      setComments({
        ...comments,
        [id]: [...comments[id], comment]
      });
    }
  };

  return (
    <div className={darkMode ? "home dark" : "home"}>
      <nav className="navbar">
        
        <h1 className="logo">🐾 PetGram</h1>
        <button onClick={toggleDarkMode} className="toggle-btn">
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </nav>

      <center><h2 className="welcome">Where every pet is a celebrity 🐶✨</h2></center>

      {/* Side Paw Decorations */}
      <div className="sidebar-left">
        <div className="paw">🐶</div>
        <div className="paw">🐾</div>
      </div>

      <div className="sidebar-right">
        <div className="paw">🐱</div>
        <div className="paw">🐾</div>
      </div>

      {posts.length === 0 ? (
        <p className="no-posts">No posts found. Start sharing your pet’s cutest moments!</p>
      ) : (
        <div className="post-list">
          {posts.map(post => (
            <div className="post-card" key={post.id}>
              <img src={post.image} alt="Pet" className="post-img" />
              <div className="post-content">
                <h3>@{post.username}</h3>
                <p>{post.caption}</p>
                <button className="like-btn" onClick={() => handleLike(post.id)}>❤️ {likes[post.id]}</button>
                <div className="comment-box">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleComment(post.id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                  <div className="comments">
                    {comments[post.id]?.map((c, index) => (
                      <p key={index} className="comment">💬 {c}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
