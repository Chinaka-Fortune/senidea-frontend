import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogPostById, updateBlogPost } from "../../utils/api";
import "../DashBoard.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const post = await getBlogPostById(id);
        setFormData({
          title: post.title,
          content: post.content,
          category: post.category,
          image: null,
        });
      } catch (err) {
        console.error("Fetch blog post error:", err);
        setError("Failed to fetch blog post: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 1 * 1024 * 1024) {
      setError("Image size exceeds 1MB limit");
      document.getElementById("image").value = "";
      return;
    }
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await updateBlogPost(id, formData);
      console.log("Blog post updated successfully, navigating to /admin-dashboard");
      setFormData({ title: "", content: "", category: "", image: null });
      document.getElementById("image").value = "";
      navigate("/admin-dashboard", { replace: true });
    } catch (err) {
      console.error("Update blog post error:", err);
      setError("Failed to update blog post: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h3 className="text-center mb-4 text-white" style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
            Edit Blog Post
          </h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="alert alert-info">Loading...</div>}

          <div className="card shadow-sm mb-4 bg-dark text-white border-0">
            <div className="card-body p-4">
              <h5 className="card-title mb-4">Update Blog Post</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter post title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content</label>
                  <textarea
                    className="form-control bg-dark text-white border-secondary textAreaResizable"
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    placeholder="Write your post content here"
                    rows="5"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter category (e.g., News, Update)"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image (Optional)</label>
                  <input
                    type="file"
                    className="form-control bg-dark text-white border-secondary"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <small className="form-text text-muted">Max size: 1MB (JPEG, PNG, GIF)</small>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Updating..." : "Update Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;