import React, { useState, useEffect } from "react";
import { getVolunteers, deleteVolunteer } from "../../utils/api";
import "../DashBoard.css";

const DashBoardVolunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    setLoading(true);
    try {
      const response = await getVolunteers();
      setVolunteers(response || []);
    } catch (err) {
      setError("Failed to fetch volunteers: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this volunteer?")) return;
    setLoading(true);
    try {
      await deleteVolunteer(id);
      fetchVolunteers();
    } catch (err) {
      setError("Failed to delete volunteer: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h3 className="text-center mb-4">Manage Volunteer Submissions</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="alert alert-info">Loading...</div>}
          <div className="table-responsive">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col" className="bg-primary">#</th>
                  <th scope="col" className="bg-primary">Name/Organization</th>
                  <th scope="col" className="text-center bg-primary">Message</th>
                  <th scope="col" className="text-center bg-primary">Email</th>
                  <th scope="col" className="text-center bg-danger border border-danger">Delete</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((volunteer, index) => (
                  <tr key={volunteer.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{volunteer.name}</td>
                    <td className="text-truncate d-flex align-items-center">
                      <span className="d-inline-block text-truncate" style={{ maxWidth: "300px" }}>
                        {volunteer.message}
                      </span>
                      <button
                        className="btn btn-link text-white text-decoration-none px-2"
                        data-bs-toggle="modal"
                        data-bs-target={`#volunteerModal${volunteer.id}`}
                      >
                        Read more
                      </button>
                      <div
                        className="modal fade"
                        id={`volunteerModal${volunteer.id}`}
                        tabIndex="-1"
                        aria-labelledby={`volunteerModalLabel${volunteer.id}`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id={`volunteerModalLabel${volunteer.id}`}>{volunteer.name}'s Message</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">{volunteer.message}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center text-truncate" style={{ maxWidth: "150px" }}>{volunteer.email}</td>
                    <td className="text-center border border-danger">
                      <i
                        className="bi bi-trash-fill fw-bolder"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(volunteer.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardVolunteer;