import React, { useState, useEffect, useContext } from "react";
import { postRequest, getUserProfile } from "../../utils/api";
import { AuthContext } from "../../App";
import "../Donation.css";
import '../../index.css';
import paymentCards from "../donationImage/paymentCards.png";

const DonationMessage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    amount: "",
    frequency: "One-time",
    recognition: "Private",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserProfile = async () => {
        const token = localStorage.getItem('access_token');
        console.debug("Checking login state:", { isLoggedIn, token: token ? token.substring(0, 10) + '...' : 'No token' });
        if (!token) {
          console.debug("No token found, skipping profile fetch");
          return;
        }
        try {
          console.debug("Fetching user profile with token:", token.substring(0, 10) + '...');
          const user = await getUserProfile();
          console.log("User profile:", user);
          setFormData((prev) => ({ ...prev, email: user.email || "" }));
        } catch (err) {
          console.error("Failed to fetch user profile:", {
            message: err.message,
            stack: err.stack,
            name: err.name,
            status: err.status || "N/A",
            token: token ? token.substring(0, 10) + '...' : 'No token',
          });
          
        }
      };
      fetchUserProfile();
    } else {
      console.debug("Not logged in, skipping profile fetch");
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: isLoggedIn ? formData.email : "",
      phoneNumber: "",
      amount: "",
      frequency: "One-time",
      recognition: "Private",
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.amount) {
      setError("Email and Amount are required.");
      return;
    }
    if (formData.amount <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const dataToSend = {
        email: formData.email,
        amount: parseFloat(formData.amount),
        frequency: formData.frequency,
        recognition: formData.recognition,
      };
      console.log("Submitting donation:", dataToSend);
      const response = await postRequest("donation", dataToSend, false);
      console.log("Donation response:", response);
      setSuccess("Donation initialized! Redirecting to payment...");
      setTimeout(() => {
        window.location.href = response.authorization_url;
      }, 1000);
    } catch (err) {
      console.error("Donation submission error:", {
        message: err.message,
        stack: err.stack,
        name: err.name,
        status: err.status || "N/A",
      });
      setError(`Failed to initialize donation: ${err.message}${err.status ? ` (Status: ${err.status})` : ""}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "800px", padding: "20px" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <h3 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#ffffff", textAlign: "center", marginBottom: "20px" }}>
            Make a Donation
          </h3>
          <p style={{ color: "#ffffff", textAlign: "center", marginBottom: "30px" }}>
            Your support helps us bring hope to those in need. Fill out the form below to contribute.
            {isLoggedIn ? " Your email is pre-filled but can be edited." : " Please enter your details."}
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
                  <label htmlFor="fullName" className="form-label" style={{ color: "#ffffff" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    style={{ backgroundColor: "#495057", color: "#ffffff", borderColor: "#6c757d" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={{ color: "#ffffff" }}>
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    style={{ backgroundColor: "#495057", color: "#ffffff", borderColor: "#6c757d" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label" style={{ color: "#ffffff" }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    style={{ backgroundColor: "#495057", color: "#ffffff", borderColor: "#6c757d" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label" style={{ color: "#ffffff" }}>
                    Amount (NGN) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter amount in NGN"
                    min="1"
                    required
                    style={{ backgroundColor: "#495057", color: "#ffffff", borderColor: "#6c757d" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="frequency" className="form-label" style={{ color: "#ffffff" }}>
                    Donation Frequency
                  </label>
                  <select
                    className="form-select"
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    style={{ backgroundColor: "#495057", color: "#ffffff", borderColor: "#6c757d" }}
                  >
                    <option value="One-time">One-time</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="recognition" className="form-label" style={{ color: "#ffffff" }}>
                    Recognition
                  </label>
                  <select
                    className="form-select"
                    id="recognition"
                    name="recognition"
                    value={formData.recognition}
                    onChange={handleChange}
                    style={{ backgroundColor: "#495057", color: "#ffffff", borderColor: "#6c757d" }}
                  >
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                    <option value="Anonymous">Anonymous</option>
                  </select>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4">
                  <img src={paymentCards} alt="Payment methods" className="img-fluid mb-3 mb-sm-0" style={{ maxWidth: "200px" }} />
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary me-2"
                      style={{ backgroundColor: "#007bff", borderColor: "#007bff", color: "#ffffff", padding: "8px 16px" }}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Pay"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ backgroundColor: "#6c757d", borderColor: "#6c757d", color: "#ffffff", padding: "8px 16px" }}
                      onClick={handleReset}
                      disabled={loading}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <p className="mt-3 text-center" style={{ color: "#ffffff" }}>
            <span className="text-danger">*</span> indicates required fields
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationMessage;