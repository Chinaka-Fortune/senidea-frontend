import React, { useState, useEffect } from "react";
import { getDonations, deleteDonation } from "../../utils/api";
import "../DashBoard.css";

const DashBoardDonation = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cachedDonations = localStorage.getItem('donations');
    const accessToken = localStorage.getItem('access_token');

    if (cachedDonations && accessToken) {
      console.log("Using cached donations");
      setDonations(JSON.parse(cachedDonations));
    } else {
      fetchDonations();
    }
  }, []);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await getDonations();
      console.log("Donations fetched:", response);
      setDonations(response || []);
      localStorage.setItem('donations', JSON.stringify(response));
    } catch (err) {
      console.error("Fetch donations error:", err);
      setError("Failed to fetch donations: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donation?")) return;
    setLoading(true);
    try {
      await deleteDonation(id);
      localStorage.removeItem('donations');
      fetchDonations();
    } catch (err) {
      console.error("Delete donation error:", err);
      setError("Failed to delete donation: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h3 className="text-center mb-4 text-white" style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
            Manage Donations
          </h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="alert alert-info">Loading...</div>}
          {!loading && donations.length === 0 && !error && (
            <div className="alert alert-info">No donations found.</div>
          )}
          <div className="table-responsive d-none d-sm-block">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col" className="bg-primary">#</th>
                  <th scope="col" className="bg-primary">Email</th>
                  <th scope="col" className="text-center bg-primary">Amount (₦)</th>
                  <th scope="col" className="text-center bg-primary">Recognition</th>
                  <th scope="col" className="text-center bg-primary">Frequency</th>
                  <th scope="col" className="text-center bg-primary">Details</th>
                  <th scope="col" className="text-center bg-danger">Delete</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation, index) => (
                  <tr key={donation.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{donation.user_email || donation.email}</td>
                    <td className="text-center">{donation.amount.toLocaleString("en-NG", { style: "currency", currency: "NGN" })}</td>
                    <td className="text-center">{donation.recognition}</td>
                    <td className="text-center">{donation.frequency}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-link text-white text-decoration-none px-2"
                        data-bs-toggle="modal"
                        data-bs-target={`#donationModal${donation.id}`}
                      >
                        View Details
                      </button>
                      <div
                        className="modal fade"
                        id={`donationModal${donation.id}`}
                        tabIndex="-1"
                        aria-labelledby={`donationModalLabel${donation.id}`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content bg-dark text-white">
                            <div className="modal-header">
                              <h5 className="modal-title" id={`donationModalLabel${donation.id}`}>
                                Donation #{index + 1} Details
                              </h5>
                              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <p><strong>Email:</strong> {donation.user_email || donation.email}</p>
                              <p><strong>Amount:</strong> {donation.amount.toLocaleString("en-NG", { style: "currency", currency: "NGN" })}</p>
                              <p><strong>Recognition:</strong> {donation.recognition}</p>
                              <p><strong>Frequency:</strong> {donation.frequency}</p>
                              <p><strong>Transaction Ref:</strong> {donation.paystack_transaction_ref}</p>
                              <p><strong>Created At:</strong> {new Date(donation.created_at).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(donation.id)}
                        title="Delete Donation"
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
            {donations.map((donation, index) => (
              <div key={donation.id} className="card shadow-sm mb-3 bg-dark text-white border-0">
                <div className="card-body">
                  <h5 className="card-title">Donation #{index + 1}</h5>
                  <p className="card-text"><strong>Email:</strong> {donation.user_email || donation.email}</p>
                  <p className="card-text"><strong>Amount:</strong> {donation.amount.toLocaleString("en-NG", { style: "currency", currency: "NGN" })}</p>
                  <p className="card-text"><strong>Recognition:</strong> {donation.recognition}</p>
                  <p className="card-text"><strong>Frequency:</strong> {donation.frequency}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target={`#donationModal${donation.id}`}
                    >
                      View Details
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(donation.id)}
                      title="Delete Donation"
                    >
                      <i className="bi bi-trash-fill"></i> Delete
                    </button>
                  </div>
                  <div
                    className="modal fade"
                    id={`donationModal${donation.id}`}
                    tabIndex="-1"
                    aria-labelledby={`donationModalLabel${donation.id}`}
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                          <h5 className="modal-title" id={`donationModalLabel${donation.id}`}>
                            Donation #{index + 1} Details
                          </h5>
                          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <p><strong>Email:</strong> {donation.user_email || donation.email}</p>
                          <p><strong>Amount:</strong> {donation.amount.toLocaleString("en-NG", { style: "currency", currency: "NGN" })}</p>
                          <p><strong>Recognition:</strong> {donation.recognition}</p>
                          <p><strong>Frequency:</strong> {donation.frequency}</p>
                          <p><strong>Transaction Ref:</strong> {donation.paystack_transaction_ref}</p>
                          <p><strong>Created At:</strong> {new Date(donation.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
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

export default DashBoardDonation;