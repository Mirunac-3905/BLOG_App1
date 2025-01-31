

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import "../CSS/MyBlogPage.css";

export default function MyBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [updatedBlog, setUpdatedBlog] = useState({ blogName: "", theme: "", information: "", url: "" });
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (userInfo && userInfo.username) {
      fetchBlogs(userInfo.username);
    }
  }, [userInfo]);

  async function fetchBlogs(username) {
    try {
      const response = await fetch(`http://localhost:4000/my-blogs?username=${username}`);
      if (response.ok) {
        const userBlogs = await response.json();
        setBlogs(userBlogs);
      } else {
        console.error("Failed to fetch blogs");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:4000/delete-blog/${id}`, { method: "DELETE" });
      if (response.ok) {
        setBlogs(blogs.filter(blog => blog._id !== id));
      } else {
        console.error("Failed to delete blog");
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  }

  function handleEditClick(blog) {
    setEditingBlog(blog._id);
    setUpdatedBlog({ blogName: blog.blogName, theme: blog.theme, information: blog.information, url: blog.url });
  }

  async function handleUpdate() {
    try {
      const response = await fetch(`http://localhost:4000/update-blog/${editingBlog}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
      });
      if (response.ok) {
        setEditingBlog(null);
        fetchBlogs(userInfo.username);
      } else {
        console.error("Failed to update blog");
      }
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  }

  return (
    <div className="my-blog-container">
      <h1 className="my-blog-heading">My Blogs</h1>
      {blogs.length > 0 ? (
        <ul className="my-blog-list">
          {blogs.map(blog => (
            <li key={blog._id} className="my-blog-item">
              {editingBlog === blog._id ? (
                <div className="my-blog-edit-form">
                  <input
                    type="text"
                    className="my-blog-input"
                    value={updatedBlog.blogName}
                    onChange={(e) => setUpdatedBlog({ ...updatedBlog, blogName: e.target.value })}
                  />
                  <input
                    type="text"
                    className="my-blog-input"
                    value={updatedBlog.theme}
                    onChange={(e) => setUpdatedBlog({ ...updatedBlog, theme: e.target.value })}
                  />
                  <textarea
                    className="my-blog-textarea"
                    value={updatedBlog.information}
                    onChange={(e) => setUpdatedBlog({ ...updatedBlog, information: e.target.value })}
                  />
                  <input
                    type="text"
                    className="my-blog-input"
                    value={updatedBlog.url}
                    onChange={(e) => setUpdatedBlog({ ...updatedBlog, url: e.target.value })}
                  />
                  <button className="my-blog-button save" onClick={handleUpdate}>Save</button>
                  <button className="my-blog-button cancel" onClick={() => setEditingBlog(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <h2 className="my-blog-title">{blog.blogName}</h2>
                  <p className="my-blog-info">{blog.information}</p>
                  <p className="my-blog-theme"><strong>Theme:</strong> {blog.theme}</p>
                  {blog.url && (
                    <p>
                      <strong>URL:</strong> <a href={blog.url} className="my-blog-url" target="_blank" rel="noopener noreferrer">{blog.url}</a>
                    </p>
                  )}
                  <button className="my-blog-button" onClick={() => handleEditClick(blog)}>Edit</button>
                  <button className="my-blog-button delete" onClick={() => handleDelete(blog._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-blogs-message">You haven't created any blogs yet.</p>
      )}
    </div>
  );
}
