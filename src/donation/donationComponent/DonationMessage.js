import React, { useState, useEffect, useContext } from "react";
import { postRequest, getUserProfile } from "../../utils/api";
import { AuthContext } from "../../App";
import "../Donation.css";
import "../../index.css";
import paymentCards from "../donationImage/paymentCards.png";
import gofundmeLogo from "../donationImage/gofundme-logo.png";

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
        const token = localStorage.getItem("access_token");
        if (!token) return;
        try {
          const user = await getUserProfile();
          setFormData((prev) => ({ ...prev, email: user.email || "" }));
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
        }
      };
      fetchUserProfile();
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
      const response = await postRequest("donation", dataToSend, false);
      setSuccess("Donation initialized! Redirecting to payment...");
      setTimeout(() => {
        window.location.href = response.authorization_url;
      }, 1000);
    } catch (err) {
      setError(`Failed to initialize donation: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "900px", padding: "0 20px" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">

          <div className="text-center mb-5 mt-4">
            <h3 className="text-white fw-bold mb-4" style={{ fontSize: "2.1rem" }}>
              Choose How You’d Like to Support Us
            </h3>
            <p className="text-primary-50 mb-5 lead">
              Every donation counts — thank you for making a difference! ❤️
            </p>

            <div className="row g-4 justify-content-center">

              <div className="col-12 col-md-6">
                <div className="card h-100 bg-primary text-white border-0 shadow-lg hover-lift">
                  <div className="card-body text-center p-4">
                    <img src={paymentCards} alt="Payment cards" height="50" className="mb-3" />
                    <h5 className="fw-bold">Donate with Card / Bank</h5>
                    <p className="small opacity-90">
                      Best for Nigeria & Africa<br />Instant • Secure • NGN
                    </p>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="btn btn-light btn-lg w-100 mt-3 fw-bold"
                    >
                      {loading ? "Processing..." : "Donate via Paystack"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <a
                  href="https://gofund.me/f1fd3837e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <div className="card h-100 bg-success text-white border-0 shadow-lg hover-lift">
                    <div className="card-body text-center p-4">
                      <img
                        src={gofundmeLogo}
                        alt="GoFundMe"
                        height="70"
                        className="mb-3"
                        style={{
                          // filter: "brightness(0) invert(1)",
                          objectFit: "contain"
                        }}
                      />
                      <h5 className="fw-bold">Donate via GoFundMe</h5>
                      <p className="small opacity-90">
                        Best for International donors<br />USD • Trusted worldwide
                      </p>
                      <div className="btn btn-light btn-lg w-100 mt-3 fw-bold">
                        Donate on GoFundMe →
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="card bg-dark text-white border-0 shadow-sm mt-5">
            <div className="card-body" style={{ padding: "35px" }}>
              <h5 className="text-center text-white-50 mb-4">
                Prefer the full form? Complete your donation below
              </h5>

              {error && <div className="alert alert-danger mb-4">{error}</div>}
              {success && <div className="alert alert-success mb-4">{success}</div>}

              <form onSubmit={handleSubmit}>
               
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" style={{ backgroundColor: "#495057", color: "#fff" }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address <span className="text-danger">*</span></label>
                  <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" style={{ backgroundColor: "#495057", color: "#fff" }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your phone number" style={{ backgroundColor: "#495057", color: "#fff" }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount (NGN) <span className="text-danger">*</span></label>
                  <input type="number" className="form-control" id="amount" name="amount" value={formData.amount} onChange={handleChange} required min="1" placeholder="e.g. 5000" style={{ backgroundColor: "#495057", color: "#fff" }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="frequency" className="form-label">Donation Frequency</label>
                  <select className="form-select" id="frequency" name="frequency" value={formData.frequency} onChange={handleChange} style={{ backgroundColor: "#495057", color: "#fff" }}>
                    <option value="One-time">One-time</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="recognition" className="form-label">Recognition</label>
                  <select className="form-select" id="recognition" name="recognition" value={formData.recognition} onChange={handleChange} style={{ backgroundColor: "#495057", color: "#fff" }}>
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                    <option value="Anonymous">Anonymous</option>
                  </select>
                </div>

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-primary btn-lg px-5 me-3" disabled={loading}>
                    {loading ? "Processing..." : "Continue to Paystack →"}
                  </button>
                  <button type="button" className="btn btn-outline-light btn-lg" onClick={handleReset} disabled={loading}>
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          <p className="text-center text-white-50 mt-4 small">
            <span className="text-danger">*</span> Required fields • All donations are secure and appreciated
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationMessage;