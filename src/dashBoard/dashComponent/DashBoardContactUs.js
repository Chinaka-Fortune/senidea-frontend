import React, { useState, useEffect, useRef } from "react";
import { getContactMessages, deleteContactMessage } from "../../utils/api";
import "../DashBoard.css";

const formatDate = (dateString) => {
  return new Date(dateString).toISOString().split("T")[0];
};

const DashBoardContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);

  const fetchContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getContactMessages();
      console.log("Raw response from getContactMessages:", response);
      const contactsArray = response.contacts || [];
      console.log("Extracted contacts array:", contactsArray);
      if (!Array.isArray(contactsArray)) {
        console.warn("Contacts is not an array:", contactsArray);
        setError(`Invalid response format from server: ${JSON.stringify(contactsArray)}`);
        setContacts([]);
      } else {
        console.log("Setting contacts:", contactsArray);
        setContacts([...contactsArray]);
        localStorage.setItem('contactMessages', JSON.stringify(contactsArray));
        localStorage.setItem('contactMessagesTimestamp', Date.now().toString());
      }
    } catch (err) {
      console.error("Fetch contact messages error:", {
        message: err.message,
        stack: err.stack,
        name: err.name,
        status: err.status || "N/A",
      });
      setError(`Failed to fetch contact messages: ${err.message}${err.status ? ` (Status: ${err.status})` : ""}`);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      console.log("Fetching contacts on mount");
      isMounted.current = true;
      const cachedContacts = localStorage.getItem('contactMessages');
      const cachedTimestamp = localStorage.getItem('contactMessagesTimestamp');
      const accessToken = localStorage.getItem('access_token');
      const cacheDuration = 5 * 60 * 1000; // 5 minutes

      if (cachedContacts && cachedTimestamp && accessToken && Date.now() - parseInt(cachedTimestamp) < cacheDuration) {
        try {
          const parsedContacts = JSON.parse(cachedContacts);
          if (Array.isArray(parsedContacts)) {
            console.log("Using cached contact messages:", parsedContacts);
            setContacts([...parsedContacts]);
          } else {
            console.warn("Invalid cached contacts format:", parsedContacts);
            localStorage.removeItem('contactMessages');
            localStorage.removeItem('contactMessagesTimestamp');
            fetchContacts();
          }
        } catch (e) {
          console.error("Error parsing cached contacts:", e);
          localStorage.removeItem('contactMessages');
          localStorage.removeItem('contactMessagesTimestamp');
          fetchContacts();
        }
      } else {
        console.log("Fetching fresh contact messages");
        fetchContacts();
      }
    }
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact message?")) return;
    setLoading(true);
    setError("");
    try {
      const response = await deleteContactMessage(id);
      console.log(`Contact message ${id} deleted successfully:`, response);
      await fetchContacts();
    } catch (err) {
      console.error("Delete contact message error:", {
        message: err.message,
        stack: err.stack,
        name: err.name,
        status: err.status || "N/A",
      });
      setError(`Failed to delete contact message: ${err.message}${err.status ? ` (Status: ${err.status})` : ""}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    console.log("Manually refreshing contacts");
    localStorage.removeItem('contactMessages');
    localStorage.removeItem('contactMessagesTimestamp');
    fetchContacts();
  };

  return (
    <div className="container my-5" style={{ maxWidth: "1200px", padding: "20px" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#ffffff" }}>
              Manage Contact Messages
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
          {contacts.length === 0 && !loading && !error && (
            <div
              className="alert alert-info"
              style={{ backgroundColor: "#d1ecf1", color: "#0c5460", borderColor: "#bee5eb", padding: "15px", marginBottom: "20px" }}
            >
              No contact messages found.
            </div>
          )}
          {contacts.length > 0 && (
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
                      Name
                    </th>
                    <th scope="col" className="bg-primary" style={{ backgroundColor: "#007bff", color: "#ffffff", padding: "12px" }}>
                      Email
                    </th>
                    <th scope="col" className="bg-primary" style={{ backgroundColor: "#007bff", color: "#ffffff", padding: "12px" }}>
                      Message
                    </th>
                    <th
                      scope="col"
                      className="text-center bg-primary"
                      style={{ backgroundColor: "#007bff", color: "#ffffff", padding: "12px" }}
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="text-center bg-primary"
                      style={{ backgroundColor: "#007bff", color: "#ffffff", padding: "12px" }}
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="text-center bg-primary"
                      style={{ backgroundColor: "#007bff", color: "#ffffff", padding: "12px" }}
                    >
                      Created At
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
                  {contacts.map((contact, index) => (
                    <tr key={contact.id} style={{ backgroundColor: "#343a40", color: "#ffffff" }}>
                      <th scope="row" style={{ padding: "12px" }}>{index + 1}</th>
                      <td style={{ padding: "12px" }}>{contact.name}</td>
                      <td style={{ padding: "12px" }}>{contact.email}</td>
                      <td style={{ padding: "12px", maxWidth: "300px" }}>
                        <span className="d-inline-block text-truncate" style={{ maxWidth: "250px" }}>
                          {contact.message.length > 50 ? `${contact.message.substring(0, 50)}...` : contact.message}
                        </span>
                        {contact.message.length > 50 && (
                          <button
                            className="btn btn-link text-white text-decoration-none px-2"
                            data-bs-toggle="modal"
                            data-bs-target={`#contactModal${contact.id}`}
                          >
                            Read more
                          </button>
                        )}
                        {contact.message.length > 50 && (
                          <div
                            className="modal fade"
                            id={`contactModal${contact.id}`}
                            tabIndex="-1"
                            aria-labelledby={`contactModalLabel${contact.id}`}
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content bg-dark text-white">
                                <div className="modal-header">
                                  <h5 className="modal-title" id={`contactModalLabel${contact.id}`}>
                                    {contact.name}'s Message
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">{contact.message}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="text-center" style={{ padding: "12px" }}>{contact.phone_number || "N/A"}</td>
                      <td className="text-center" style={{ padding: "12px" }}>{contact.address || "N/A"}</td>
                      <td className="text-center" style={{ padding: "12px" }}>{formatDate(contact.created_at)}</td>
                      <td className="text-center" style={{ padding: "12px" }}>
                        <button
                          className="btn btn-danger btn-sm"
                          style={{ backgroundColor: "#dc3545", borderColor: "#dc3545", color: "#ffffff", padding: "6px 12px" }}
                          onClick={() => handleDelete(contact.id)}
                          title="Delete Contact Message"
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
          {contacts.length > 0 && (
            <div className="d-block d-sm-none">
              {contacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className="card shadow-sm mb-3 bg-dark text-white border-0"
                  style={{ backgroundColor: "#343a40", color: "#ffffff", marginBottom: "15px" }}
                >
                  <div className="card-body" style={{ padding: "15px" }}>
                    <h5 className="card-title" style={{ fontSize: "1.25rem", marginBottom: "10px" }}>
                      Message #{index + 1}
                    </h5>
                    <p className="card-text" style={{ marginBottom: "10px" }}>
                      <strong>Name:</strong> {contact.name}
                    </p>
                    <p className="card-text" style={{ marginBottom: "10px" }}>
                      <strong>Email:</strong> {contact.email}
                    </p>
                    <p className="card-text" style={{ marginBottom: "10px" }}>
                      <strong>Message:</strong> {contact.message.length > 50 ? `${contact.message.substring(0, 50)}...` : contact.message}
                    </p>
                    <p className="card-text" style={{ marginBottom: "10px" }}>
                      <strong>Phone:</strong> {contact.phone_number || "N/A"}
                    </p>
                    <p className="card-text" style={{ marginBottom: "10px" }}>
                      <strong>Address:</strong> {contact.address || "N/A"}
                    </p>
                    <p className="card-text" style={{ marginBottom: "10px" }}>
                      <strong>Created At:</strong> {formatDate(contact.created_at)}
                    </p>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-danger btn-sm"
                        style={{ backgroundColor: "#dc3545", borderColor: "#dc3545", color: "#ffffff", padding: "6px 12px" }}
                        onClick={() => handleDelete(contact.id)}
                        title="Delete Contact Message"
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

export default DashBoardContactUs;