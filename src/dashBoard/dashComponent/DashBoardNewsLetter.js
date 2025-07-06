import React, { useState, useEffect, useRef } from "react";
import { getNewsletterSubscriptions, deleteNewsletterSubscription } from "../../utils/api";
import "../DashBoard.css";

const formatDate = (dateString) => {
  return new Date(dateString).toISOString().split("T")[0]; // Returns YYYY-MM-DD
};

const DashBoardNewsLetter = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);

  const fetchSubscriptions = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getNewsletterSubscriptions();
      console.log("Raw response from getNewsletterSubscriptions:", response);
      const subscriptionsArray = Array.isArray(response) ? response : response.subscriptions || [];
      console.log("Extracted subscriptions array:", subscriptionsArray);
      if (!Array.isArray(subscriptionsArray)) {
        console.warn("Subscriptions is not an array:", subscriptionsArray);
        setError(`Invalid response format from server: ${JSON.stringify(subscriptionsArray)}`);
        setSubscriptions([]);
      } else {
        console.log("Setting subscriptions:", subscriptionsArray);
        setSubscriptions([...subscriptionsArray]);
      }
    } catch (err) {
      console.error("Fetch subscriptions error:", {
        message: err.message,
        stack: err.stack,
        name: err.name,
        status: err.status || "N/A",
      });
      setError(`Failed to fetch newsletter subscriptions: ${err.message}${err.status ? ` (Status: ${err.status})` : ""}`);
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      console.log("Fetching newsletter subscriptions on mount");
      isMounted.current = true;
      // Only use delay in development mode
      if (process.env.NODE_ENV === "development") {
        setTimeout(() => fetchSubscriptions(), 100);
      } else {
        fetchSubscriptions();
      }
    }
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this newsletter subscription?")) return;
    setLoading(true);
    setError("");
    try {
      const response = await deleteNewsletterSubscription(id);
      console.log(`Subscription ${id} deleted successfully:`, response);
      await fetchSubscriptions();
    } catch (err) {
      console.error("Delete subscription error:", {
        message: err.message,
        stack: err.stack,
        name: err.name,
        status: err.status || "N/A",
      });
      setError(`Failed to delete newsletter subscription: ${err.message}${err.status ? ` (Status: ${err.status})` : ""}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    console.log("Manually refreshing subscriptions");
    fetchSubscriptions();
  };

  return (
    <div className="container my-5" style={{ maxWidth: "1200px", padding: "20px" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#ffffff" }}>
              Manage Newsletter Subscriptions
            </h3>
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#007bff", borderColor: "#007bff", color: "#ffffff", padding: "8px 16px" }}
              onClick={handleRefresh}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          {error && (
            <div
              className="alert alert-danger"
              style={{ backgroundColor: "#f8d7da", color: "#721c24", borderColor: "#f5c6cb", padding: "15px", marginBottom: "20px" }}
            >
              {error}
            </div>
          )}
          {loading && (
            <div
              className="alert alert-info"
              style={{ backgroundColor: "#d1ecf1", color: "#0c5460", borderColor: "#bee5eb", padding: "15px", marginBottom: "20px" }}
            >
              Loading...
            </div>
          )}
          {subscriptions.length === 0 && !loading && !error && (
            <div
              className="alert alert-info"
              style={{ backgroundColor: "#d1ecf1", color: "#0c5460", borderColor: "#bee5eb", padding: "15px", marginBottom: "20px" }}
            >
              No newsletter subscriptions found.
            </div>
          )}
          {subscriptions.length > 0 && (
            <div className="table-responsive d-none d-sm-block">
              <table
                className="table table-striped table-dark"
                style={{ backgroundColor: "#343a40", color: "#ffffff", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th scope="col" className="bg-primary" style={{ backgroundColor: "#007bff", color: "#ffffff", padding: "12px" }}>
                      #
                    </th>
                    <th scope="col" className="bg-primary" style={{ backgroundColor: "#007bff", color: "#ffffff", padding: "12px" }}>
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-center bg-primary"
                      style={{ backgroundColor: "#007bff", color: "#ffffff", padding: "12px" }}
                    >
                      Subscribed At
                    </th>
                    <th
                      scope="col"
                      className="text-center bg-danger"
                      style={{ backgroundColor: "#dc3545", color: "#ffffff", padding: "12px" }}
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((subscription, index) => (
                    <tr key={subscription.id} style={{ backgroundColor: "#343a40", color: "#ffffff" }}>
                      <th scope="row" style={{ padding: "12px" }}>{index + 1}</th>
                      <td style={{ padding: "12px" }}>{subscription.email}</td>
                      <td className="text-center" style={{ padding: "12px" }}>
                        {formatDate(subscription.subscribed_at)}
                      </td>
                      <td className="text-center" style={{ padding: "12px" }}>
                        <button
                          className="btn btn-danger btn-sm"
                          style={{ backgroundColor: "#dc3545", borderColor: "#dc3545", color: "#ffffff", padding: "6px 12px" }}
                          onClick={() => handleDelete(subscription.id)}
                          title="Delete Subscription"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {subscriptions.length > 0 && (
            <div className="d-block d-sm-none">
              {subscriptions.map((subscription, index) => (
                <div
                  key={subscription.id}
                  className="card shadow-sm mb-3 bg-dark text-white border-0"
                  style={{ backgroundColor: "#343a40", color: "#ffffff", marginBottom: "15px" }}
                >
                  <div className="card-body" style={{ padding: "15px" }}>
                    <h5 className="card-title" style={{ fontSize: "1.25rem", marginBottom: "10px" }}>
                      Subscription #{index + 1}
                    </h5>
                    <p className="card-text" style={{ marginBottom: "10px" }}>
                      <strong>Email:</strong> {subscription.email}
                    </p>
                    <p className="card-text" style={{ marginBottom: "10px" }}>
                      <strong>Subscribed At:</strong> {formatDate(subscription.subscribed_at)}
                    </p>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-danger btn-sm"
                        style={{ backgroundColor: "#dc3545", borderColor: "#dc3545", color: "#ffffff", padding: "6px 12px" }}
                        onClick={() => handleDelete(subscription.id)}
                        title="Delete Subscription"
                      >
                        <i className="bi bi-trash-fill"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoardNewsLetter;