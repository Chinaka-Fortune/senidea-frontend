import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBlogPosts, deleteBlogPost, createBlogPost } from "../../utils/api";
import "../DashBoard.css";

const DashBoardBlog = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    const cachedPosts = localStorage.getItem('blogPosts');
    const accessToken = localStorage.getItem('access_token');

    if (cachedPosts && accessToken) {
      console.log("Using cached blog posts");
      setPosts(JSON.parse(cachedPosts));
    } else {
      fetchPosts();
    }
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getBlogPosts("blog?limit=10");
      console.log("Blog posts fetched:", response);
      setPosts(response.posts || []);
      localStorage.setItem('blogPosts', JSON.stringify(response.posts));
    } catch (err) {
      console.error("Fetch blog posts error:", err);
      setError("Failed to fetch blog posts: " + err.message);
    } finally {
      setLoading(false);
    }
  };

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
      await createBlogPost(formData);
      setFormData({ title: "", content: "", category: "", image: null });
      document.getElementById("image").value = "";
      localStorage.removeItem('blogPosts');
      fetchPosts();
    } catch (err) {
      console.error("Create blog post error:", err);
      setError("Failed to create blog post: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    setLoading(true);
    try {
      await deleteBlogPost(id);
      localStorage.removeItem('blogPosts');
      fetchPosts();
    } catch (err) {
      console.error("Delete blog post error:", err);
      setError("Failed to delete blog post: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h3 className="text-center mb-4 text-white" style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
            Manage Blog Posts
          </h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="alert alert-info">Loading...</div>}

          <div className="card shadow-sm mb-4 bg-dark text-white border-0">
            <div className="card-body p-4">
              <h5 className="card-title mb-4">Create New Blog Post</h5>
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
                    {loading ? "Creating..." : "Create Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="table-responsive d-none d-sm-block">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col" className="bg-primary">#</th>
                  <th scope="col" className="bg-primary">Title</th>
                  <th scope="col" className="text-center bg-primary">Category</th>
                  <th scope="col" className="text-center bg-primary">Created At</th>
                  <th scope="col" className="text-center bg-primary">Edit</th>
                  <th scope="col" className="text-center bg-danger">Delete</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{post.title}</td>
                    <td className="text-center">{post.category}</td>
                    <td className="text-center">{new Date(post.created_at).toLocaleDateString()}</td>
                    <td className="text-center">
                      <Link to={`/admin/edit-blog/${post.id}`} className="bi bi-pen-fill text-info"></Link>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(post.id)}
                        title="Delete Blog Post"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-block d-sm-none">
            {posts.map((post, index) => (
              <div key={post.id} className="card shadow-sm mb-3 bg-dark text-white border-0">
                <div className="card-body">
                  <h5 className="card-title">Post #{index + 1}</h5>
                  <p className="card-text"><strong>Title:</strong> {post.title}</p>
                  <p className="card-text"><strong>Category:</strong> {post.category}</p>
                  <p className="card-text"><strong>Created At:</strong> {new Date(post.created_at).toLocaleDateString()}</p>
                  <div className="d-flex justify-content-between">
                    <Link to={`/admin/edit-blog/${post.id}`} className="btn btn-primary btn-sm">
                      <i className="bi bi-pen-fill"></i> Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(post.id)}
                      title="Delete Blog Post"
                    >
                      <i className="bi bi-trash-fill"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardBlog;