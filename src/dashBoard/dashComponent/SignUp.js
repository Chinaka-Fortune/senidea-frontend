import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/api";
import { AuthContext } from "../../App";
import "../DashBoard.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordType, setShowPasswordType] = useState("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleShowTogglePasswordType = () => {
    setShowPasswordType(showPasswordType === "password" ? "text" : "password");
  };

  const validateForm = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return "Invalid email format";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const data = {
        email,
        password,
        role: process.env.REACT_APP_ADMIN_ROLE || "Admin",
        admin_secret: process.env.REACT_APP_ADMIN_SECRET,
      };
      const response = await registerUser(data);
      localStorage.setItem("access_token", response.access_token);
      setIsLoggedIn(true);
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Check email or admin secret.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm p-4">
            <h3 className="text-center mb-4">Sign Up</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3 position-relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className="bi bi-envelope-at-fill position-absolute end-0 top-50 translate-middle-y pe-3"></i>
              </div>
              <div className="mb-3 position-relative">
                <input
                  type={showPasswordType}
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i
                  className={`position-absolute end-0 top-50 translate-middle-y pe-3 ${
                    showPasswordType === "password" ? "bi bi-lock-fill" : "bi bi-unlock-fill"
                  }`}
                  onClick={handleShowTogglePasswordType}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
              <div className="mb-3 position-relative">
                <input
                  type={showPasswordType}
                  placeholder="Confirm Password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
                <Link to="/login" className="btn btn-outline-primary">
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;