import React, { useState } from "react";
import { postRequest } from "../../utils/api";

const MailingList = () => {
  const [mailList, setMailList] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleMailList = (e) => setMailList(e.target.value);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!mailList) {
      setError("Email is required");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await postRequest("newsletter/subscribe", { email: mailList }, false);
      setSuccess("Subscribed successfully!");
      setMailList("");
    } catch (err) {
      console.error("Subscribe error:", err);
      setError("Failed to subscribe: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-secondary-subtle">
      <div className="row d-md-flex flex-column flex-md-row align-item-center h-100 p-md-5 py-5">
        <div className="col-md-6 py-md-5 ourCoreValueAnimate">
          <h3 className="h3 fw-bolder mb-4">Join Our Mailing List</h3>
          <h5 className="mb-2">
            Get all latest news, exclusive deals and academy updates.
          </h5>
        </div>
        <div className="col-md-6 py-md-5 py-2">
          <div>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            {loading && <div className="alert alert-info">Subscribing...</div>}
            <input
              type="email"
              value={mailList}
              onChange={HandleMailList}
              className="form-control border-2 border-dark mb-2"
              placeholder="Email Address"
              required
            />
            <button
              type="button"
              className="generalBtn rounded px-3 mt-2 py-1 border-0 text-white"
              onClick={handleSubscribe}
              disabled={loading}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailingList;