import React, { useState } from "react";
import { postRequest } from "../../utils/api";
import neighbourhood from "../homeImages/neighbourhood.jpg";

const MessageSection = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [textArea, setTextArea] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleUserNameChange = (e) => setUserName(e.target.value);
  const HandleEmailChange = (e) => setEmail(e.target.value);
  const HandlePhoneChange = (e) => setPhone(e.target.value);
  const HandleAddressChange = (e) => setAddress(e.target.value);
  const HandleTextAreaChange = (e) => setTextArea(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await postRequest('contact', {
        name: userName,
        email,
        phone_number: phone,
        address,
        message: textArea,
      }, false);
      setSuccess("Message sent successfully!");
      setUserName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setTextArea("");
    } catch (err) {
      console.error("Send message error:", err);
      setError("Failed to send message: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg container-fluid py-5"
      style={{
        backgroundImage: `url(${neighbourhood})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "auto",
        backgroundColor: "#2A2E94",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="row ourCoreValueAnimate">
        <div className="col-lg-8 col-xl-6 col-md-10 mx-md-auto me-xl-0">
          <form className="messageForm mx-md-auto mx-xl-0" onSubmit={handleSubmit}>
            <h6 className="text-white fw-bolder">CONTACT US</h6>
            <h3 className="text-white fw-bolder mb-5">Send Us a Message</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            {loading && <div className="alert alert-info">Sending...</div>}

            <div className="row">
              <div className="messageInputDiv">
                <input
                  type="text"
                  value={userName}
                  onChange={HandleUserNameChange}
                  placeholder="Full Name"
                  className="ps-3 border-white border-2 bg-transparent fw-bold text-white HomeMessageInput rounded py-md-2 mb-md-3"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={HandleEmailChange}
                  placeholder="Email"
                  className="ps-3 border-white border-2 bg-transparent fw-bold text-white HomeMessageInput rounded py-md-2 mb-md-3"
                  required
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={HandlePhoneChange}
                  placeholder="Phone Number"
                  className="ps-3 border-white border-2 bg-transparent fw-bold text-white HomeMessageInput rounded py-md-2"
                />
                <input
                  type="text"
                  value={address}
                  onChange={HandleAddressChange}
                  placeholder="Address"
                  className="ps-3 border-white border-2 bg-transparent fw-bold text-white HomeMessageInput rounded py-md-2"
                />
              </div>
              <div className="messageTestArea">
                <textarea
                  rows={5}
                  placeholder="Send a message..."
                  className="bg-transparent fw-bolder text-white border-2 border-white HomeMessageInput w-100 rounded ps-3"
                  value={textArea}
                  onChange={HandleTextAreaChange}
                  required
                />
              </div>
            </div>
            <input
              type="submit"
              value="Submit"
              className="px-5 py-1 rounded border-0 mt-3 fw-bold HomeMessageSubmitBtn"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageSection;