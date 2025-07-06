import React, { useState, useEffect, useRef } from "react";
import { getPartners, deletePartner } from "../../utils/api";
import "../DashBoard.css";

const formatDate = (dateString) => {
  return new Date(dateString).toISOString().split("T")[0]; // Returns YYYY-MM-DD
};

const DashBoardPartner = () => {
  const [partners, setPartners] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);

  const fetchPartners = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getPartners();
      console.log("Raw response from getPartners:", response);
      const partnersArray = response.partnerships || [];
      console.log("Extracted partners array:", partnersArray);
      if (!Array.isArray(partnersArray)) {
        console.warn("Partners is not an array:", partnersArray);
        setError(`Invalid response format from server: ${JSON.stringify(partnersArray)}`);
        setPartners([]);
      } else {
        console.log("Setting partners:", partnersArray);
        setPartners([...partnersArray]);
      }
    } catch (err) {
      console.error("Fetch partners error:", {
        message: err.message,
        stack: err.stack,
        name: err.name,
        status: err.status || "N/A",
      });
      setError(`Failed to fetch partners: ${err.message}${err.status ? ` (Status: ${err.status})` : ""}`);
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      console.log("Fetching partners on mount");
      isMounted.current = true;
      if (process.env.NODE_ENV === "development") {
        setTimeout(() => fetchPartners(), 100);
      } else {
        fetchPartners();
      }
    }
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this partner submission?")) return;
    setLoading(true);
    setError("");
    try {
      const response = await deletePartner(id);
      console.log(`Partner ${id} deleted successfully:`, response);
      await fetchPartners();
    } catch (err) {
      console.error("Delete partner error:", {
        message: err.message,
        stack: err.stack,
        name: err.name,
        status: err.status || "N/A",
      });
      setError(`Failed to delete partner: ${err.message}${err.status ? ` (Status: ${err.status})` : ""}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    console.log("Manually refreshing partners");
    fetchPartners();
  };

  return (
    <div className="container my-5" style={{ maxWidth: "1200px", padding: "20px" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#ffffff" }}>
              Manage Partner Submissions
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
          {partners.length === 0 && !loading && !error && (
            <div
              className="alert alert-info"
              style={{ backgroundColor: "#d1ecf1", color: "#0c5460", borderColor: "#bee5eb", padding: "15px", marginBottom: "20px" }}
            >
              No partner submissions found.
            </div>
          )}
          {partners.length > 0 && (
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
                      Organization
                    </th>
                    <th
                      scope="col"
                      className="text-center bg-primary"
                      style={{ backgroundColor: "#007bff", color: "#ffffff", padding: "12px" }}
                    >
                      Message
                    </th>
                    <th
                      scope="col"
                      className="text-center bg-primary"
                      style={{ backgroundColor: "#007bff", color: "#ffffff", padding: "12px" }}
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-center bg-primary"
                      style={{ backgroundColor: "#007bff", color: "#ffffff", padding: "12px" }}
                    >
                      Submitted At
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
                  {partners.map((partner, index) => (
                    <tr key={partner.id} style={{ backgroundColor: "#343a40", color: "#ffffff" }}>
                      <th scope="row" style={{ padding: "12px" }}>{index + 1}</th>
                      <td style={{ padding: "12px" }}>{partner.organization}</td>
                      <td className="text-center text-truncate" style={{ padding: "12px", maxWidth: "300px" }}>
                        <span className="d-inline-block text-truncate" style={{ maxWidth: "250px" }}>
                          {partner.message || "No message provided"}
                        </span>
                        {partner.message && (
                          <button
                            className="btn btn-link text-white text-decoration-none px-2"
                            data-bs-toggle="modal"
                            data-bs-target={`#partnerModal${partner.id}`}
                          >
                            Read more
                          </button>
                        )}
                        {partner.message && (
                          <div
                            className="modal fade"
                            id={`partnerModal${partner.id}`}
                            tabIndex="-1"
                            aria-labelledby={`partnerModalLabel${partner.id}`}
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content bg-dark text-white">
                                <div className="modal-header">
                                  <h5 className="modal-title" id={`partnerModalLabel${partner.id}`}>
                                    {partner.organization}'s Message
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">{partner.message}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="text-center text-truncate" style={{ padding: "12px", maxWidth: "150px" }}>
                        {partner.email}
                      </td>
                      <td className="text-center" style={{ padding: "12px" }}>
                        {formatDate(partner.created_at)}
                      </td>
                      <td className="text-center" style={{ padding: "12px" }}>
                        <button
                          className="btn btn-danger btn-sm"
                          style={{ backgroundColor: "#dc3545", borderColor: "#dc3545", color: "#ffffff", padding: "6px 12px" }}
                          onClick={() => handleDelete(partner.id)}
                          title="Delete Partner Submission"
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
          {partners.length > 0 && (
            <div className="d-block d-sm-none">
              {partners.map((partner, index) => (
                <div
                  key={partner.id}
                  className="card shadow-sm mb-3 bg-dark text-white border-0"
                  style={{ backgroundColor: "#343a40", color: "#ffffff", marginBottom: "15px" }}
                >
                  <div className="card-body" style={{ padding: "15px" }}>
                    <h5 className="card-title" style={{ fontSize: "1.25rem", marginBottom: "10px" }}>
                      Partner #{index + 1}
                    </h5>
                    <p className="card-text" style={{ marginBottom: "10px" }}>
                      <strong>Organization:</strong> {partner.organization}
                    </p>
                    <p className="card-text" style={{ marginBottom: "10px" }}>
                      <strong>Message:</strong> {partner.message || "No message provided"}
                    </p>
                    <p className="card-text" style={{ marginBottom: "10px" }}>
                      <strong>Email:</strong> {partner.email}
                    </p>
                    <p className="card-text" style={{ marginBottom: "10px" }}>
                      <strong>Submitted At:</strong> {formatDate(partner.created_at)}
                    </p>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-danger btn-sm"
                        style={{ backgroundColor: "#dc3545", borderColor: "#dc3545", color: "#ffffff", padding: "6px 12px" }}
                        onClick={() => handleDelete(partner.id)}
                        title="Delete Partner Submission"
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

export default DashBoardPartner;