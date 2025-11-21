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
    <div className="dashBoardMain position-relative">
      <div className="login-card mx-auto">
        <h3 className="mt-3 text-center">Sign Up</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form className="form" onSubmit={handleSubmit}>
          
          <div className="logInInputBox mb-2">
            <input
              type="email"
              className="form-control bg-transparent text-white"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bi bi-envelope-at-fill"></i>
          </div>

          <div className="logInInputBox mb-2">
            <input
              type={showPasswordType}
              className="form-control bg-transparent text-white"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={showPasswordType === "password" ? "bi bi-lock-fill" : "bi bi-unlock-fill"}
              onClick={handleShowTogglePasswordType}
            ></i>
          </div>

         <div className="logInInputBox mb-4">
            <input
              type={showPasswordType}
              className="form-control bg-transparent text-white"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <i
              className={showPasswordType === "password" ? "bi bi-lock-fill" : "bi bi-unlock-fill"}
              onClick={handleShowTogglePasswordType}
            ></i>
          </div>

          <div className="mt-4 d-flex btn-group-mobile justify-content-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 rounded border-0 bg-primary text-white"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <Link
              to="/login"
              className="px-4 py-2 rounded border-0 bg-primary text-white text-decoration-none"
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;