import React, { useState } from "react";
import { postRequest } from "../../utils/api";
import "../Home.css";

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await postRequest("volunteer", formData, false);
      console.log("Volunteer submission response:", response);
      setSuccess("Volunteer application submitted successfully!");
      setFormData({ name: "", email: "", skills: "" });
    } catch (err) {
      console.error("Volunteer submission error:", {
        message: err.message,
        stack: err.stack,
        name: err.name,
        status: err.status || "N/A",
      });
      setError(`Failed to submit volunteer application: ${err.message}${err.status ? ` (Status: ${err.status})` : ""}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "800px", padding: "20px" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <h3 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#ffffff", textAlign: "center", marginBottom: "20px" }}>
            Volunteer with Us
          </h3>
          <p style={{ color: "#ffffff", textAlign: "center", marginBottom: "30px" }}>
            Join our team of volunteers to make a difference in the community. Fill out the form below to apply.
          </p>
          {error && (
            <div
              className="alert alert-danger"
              style={{ backgroundColor: "#f8d7da", color: "#721c24", borderColor: "#f5c6cb", padding: "15px", marginBottom: "20px" }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              className="alert alert-success"
              style={{ backgroundColor: "#d4edda", color: "#155724", borderColor: "#c3e6cb", padding: "15px", marginBottom: "20px" }}
            >
              {success}
            </div>
          )}
          <div className="card bg-dark text-white border-0 shadow-sm">
            <div className="card-body" style={{ padding: "30px" }}>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label" style={{ color: "#ffffff" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "#495057", color: "#ffffff", borderColor: "#6c757d" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={{ color: "#ffffff" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "#495057", color: "#ffffff", borderColor: "#6c757d" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="skills" className="form-label" style={{ color: "#ffffff" }}>
                    Skills or Interests
                  </label>
                  <textarea
                    className="form-control"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    rows="5"
                    placeholder="e.g., Teaching, Event Planning, Fundraising"
                    style={{ backgroundColor: "#495057", color: "#ffffff", borderColor: "#6c757d" }}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#007bff", borderColor: "#007bff", color: "#ffffff", padding: "8px 16px" }}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
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

export default VolunteerForm;