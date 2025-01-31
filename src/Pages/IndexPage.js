

import React, { useEffect, useState, useContext } from "react";
import Header from "./Header.js";
import { UserContext } from "../UserContext.js";
import '../CSS/IndexPage.css'
//import '../CSS/Header.css'

const IndexPage = () => {
  const [blogs, setBlogs] = useState([]);
  const { userInfo } = useContext(UserContext);  // Getting userInfo from context
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    fetch("http://localhost:4000/all-blogs")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const toggleSubscribe = async (author) => {
    try {
      const response = await fetch("http://localhost:4000/toggle-subscribe", {
        method: "POST",
        body: JSON.stringify({ author, username: userInfo?.username }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const updatedData = await response.json();
        setBlogs(blogs.map(blog =>
          blog.author === author ? { ...blog, subscribers: updatedData.subscribers } : blog
        ));
      } else {
        alert("Failed to update subscription");
      }
    } catch (err) {
      console.error("Error toggling subscription:", err);
    }
  };

  const addComment = async (blogId) => {
    if (!commentInputs[blogId]?.trim()) return;

    try {
      const response = await fetch("http://localhost:4000/add-comment", {
        method: "POST",
        body: JSON.stringify({
          blogId,
          username: userInfo?.username,
          text: commentInputs[blogId],
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const updatedData = await response.json();
        setBlogs(blogs.map(blog =>
          blog._id === blogId ? { ...blog, comments: updatedData.comments } : blog
        ));
        setCommentInputs({ ...commentInputs, [blogId]: "" });
      }
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div>
    <div className="div">
      <Header /></div>
      <div className="indexPage">

  <div class="quote-section">
    <blockquote class="inspiring-quote">
      "Your voice matters. Share your story, inspire others, and change the world one post at a time."
    </blockquote>
    
  </div>
   
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            <h2>{blog.blogName}</h2>
            <p><strong>Author:</strong> {blog.author}</p>
            <p><strong>Theme:</strong> {blog.theme}</p>
            <p>{blog.information}</p>

            {/* Show Subscribe button only if logged-in user is NOT the author */}
            {userInfo?.username !== blog.author && (
              <button
                onClick={() => toggleSubscribe(blog.author)}
                className={blog.subscribers.includes(userInfo?.username) ? "unsubscribe" : "subscribe"}
              >
                {blog.subscribers.includes(userInfo?.username) ? "Unsubscribe" : "Subscribe"}
              </button>
            )}

            {/* Add Comment Section (Only if user is not the author) */}
            {userInfo?.username !== blog.author && (
              <div className="comment-section">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInputs[blog._id] || ""}
                  onChange={(e) => setCommentInputs({ ...commentInputs, [blog._id]: e.target.value })}
                />
                <button onClick={() => addComment(blog._id)}>Post</button>
              </div>
            )}

            <div className="comments-list">
              View comments 
              {blog.comments.map((comment, index) => (
                <p key={index}>
                  <strong>{comment.username}</strong> {comment.text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default IndexPage;
