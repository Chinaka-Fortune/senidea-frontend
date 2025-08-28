import React, { useState, useEffect } from "react";
import { createImpactPost, getImpactPosts } from "../../utils/api";
import "../DashBoard.css";
import '../../index.css';

const DashBoardOurImpact = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getImpactPosts();
      setPosts(response || []);
    } catch (err) {
      setError("Failed to fetch impact posts: " + err.message);
    }
  };

  const validateForm = () => {
    if (!title.trim() || title.length > 100) return "Title is required and must be 100 characters or less";
    if (!content.trim() || content.length > 2000) return "Content is required and must be 2000 characters or less";
    if (file && !["image/jpeg", "image/png"].includes(file.type)) return "Image must be JPEG or PNG";
    return null;
  };

  const handleOurImpactSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) formData.append("image", file);

      await createImpactPost(formData);
      setSuccess("Impact post created successfully!");
      setTitle("");
      setFile(null);
      setContent("");
      fetchPosts();
    } catch (err) {
      setError(err.message || "Failed to create impact post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h3 className="text-center mb-4">Manage Our Impact</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleOurImpactSubmit} className="card shadow-sm p-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (max 100 characters)"
              className="form-control mb-3"
              maxLength={100}
              required
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="form-control mb-3"
              accept="image/jpeg,image/png"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-control mb-3"
              placeholder="Content (max 2000 characters)"
              rows={6}
              maxLength={2000}
              required
            />
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
          <h3 className="mt-5 mb-3">Existing Impact Posts</h3>
          {posts.length > 0 ? (
            <ul className="list-group">
              {posts.map((post) => (
                <li key={post.id} className="list-group-item">
                  {post.title} - {new Date(post.created_at).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No impact posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoardOurImpact;