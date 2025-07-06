import React, { useState } from 'react';
import { postRequest } from '../../utils/api';

const ContactMessage = () => {
  const [contactUserName, setContactUserName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [contactTextArea, setContactTextArea] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const HandleContactUserNameChange = (e) => setContactUserName(e.target.value);
  const HandleContactEmailChange = (e) => setContactEmail(e.target.value);
  const HandleContactPhoneChange = (e) => setContactPhone(e.target.value);
  const HandleContactAddressChange = (e) => setContactAddress(e.target.value);
  const HandleContactTextAreaChange = (e) => setContactTextArea(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await postRequest('contact', {
        name: contactUserName,
        email: contactEmail,
        phone_number: contactPhone,
        address: contactAddress,
        message: contactTextArea,
      }, false);
      setSuccess('Message sent successfully!');
      setContactUserName('');
      setContactEmail('');
      setContactPhone('');
      setContactAddress('');
      setContactTextArea('');
    } catch (err) {
      console.error('Send message error:', err);
      setError('Failed to send message: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg container-fluid py-5 px-md-3 ourLandingAnimate">
      <div className="row">
        <div className="d-md-flex justify-content-around">
          <div className="col-md-5">
            <h6 className="fw-bolder generalTextColor">CONTACT US</h6>
            <h3 className="h3 fw-bolder mb-5">We Would Love to Hear from You</h3>
            <p className="fs-5">
              Whether it’s a quick question, feedback, or suggestion, we would love to hear from you.
            </p>
          </div>

          <div className="col-md-5">
            <form className="Homeform" onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              {loading && <div className="alert alert-info">Sending...</div>}
              
                  
                  <div className="d-lg-flex column-gap-lg-3">
                    <input
                      type="text"
                      value={contactUserName}
                      onChange={HandleContactUserNameChange}
                      placeholder="Full Name"
                      className="form-control ps-3 border-info border-2 fw-bold contacthead"
                      required
                    />

                     <input
                      type="email"
                      value={contactEmail}
                      onChange={HandleContactEmailChange}
                      placeholder="Email"
                      className="form-control ps-3 border-info border-2 fw-bold contacthead"
                      required
                    />
                  </div>
                  
                  <div className="d-lg-flex column-gap-lg-3 mt-3">
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={HandleContactPhoneChange}
                      placeholder="Phone Number"
                      className="form-control ps-3 border-info border-2 fw-bold contacthead"
                    />

                    <input
                      type="text"
                      value={contactAddress}
                      onChange={HandleContactAddressChange}
                      placeholder="Address"
                      className="form-control ps-3 border-info border-2 fw-bold contacthead"
                    />
                  </div>
                  
                
                <div className="messageTextArea mx-md-auto mt-3">
                  <textarea
                    rows={5}
                    cols={5}
                    placeholder="Enter message"
                    className="form-control fw-bolder border-2 border-info contacthead"
                    value={contactTextArea}
                    onChange={HandleContactTextAreaChange}
                    required
                  />
                </div>
              
              <input
                type="submit"
                value="Submit"
                className="px-5 ms-5 py-1 rounded border-0 mt-3 fw-bold generalBtn text-white d-md-none d-lg-block"
                disabled={loading}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMessage;