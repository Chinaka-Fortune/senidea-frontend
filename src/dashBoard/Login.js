import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";
import { AuthContext } from "../App";
import "./DashBoard.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logInType, setLogInType] = useState("password");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const credentials = { email, password };
      const response = await loginUser(credentials);
      localStorage.setItem("access_token", response.access_token);
      setIsLoggedIn(true);
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    }
  };

  const handleLoginPasswordToggle = () => {
    setLogInType(logInType === "password" ? "text" : "password");
  };

  return (
    <div className="dashBoardMain position-relative">
      <div className="login-card mx-auto"> 
        <h3 className="mt-3 text-center">Log In</h3>
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
          <div className="logInInputBox">
            <input
              type={logInType}
              className="form-control bg-transparent text-white"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={logInType === "password" ? "bi bi-lock-fill" : "bi bi-unlock-fill"}
              onClick={handleLoginPasswordToggle}
            ></i>
          </div>
          <div className="forgetpassword mt-2">
            <button
              type="button"
              className="text-decoration-none btn btn-link text-white"
              onClick={() => alert("Password reset not implemented yet")}
            >
              Forgot password?
            </button>
          </div>
          <div className="mt-4 d-flex btn-group-mobile justify-content-center">
            <button
              type="submit"
              className="px-3 py-2 rounded border-0 bg-primary text-white"
            >
              Log In
            </button>
            <Link
              to="/signup"
              className="px-4 py-2 rounded border-0 bg-primary text-white text-decoration-none"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;