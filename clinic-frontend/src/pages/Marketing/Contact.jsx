import "./Contact.css";
import {
  MdSupportAgent,
  MdTrendingUp,
  MdPlayCircleFilled,
  MdLocationPin,
} from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <>
      {success && (
        <div className="toast-success">
          <FiCheckCircle /> Message sent successfully!
        </div>
      )}

      <div className="contact-page">
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>
            We’re here to help you with product questions, support, or demo
            requests.
          </p>
        </div>

        <div className="contact-grid">
          {/* Support Card */}
          <div className="contact-card">
            <h2>
              {" "}
              <MdSupportAgent size={25} color="#6ab9ff" /> Customer Support
            </h2>
            <p>Facing issues with your clinic dashboard or staff accounts?</p>
            <p className="contact-email">support@myclinic.com</p>
          </div>

          {/* Sales Card */}
          <div className="contact-card">
            <h2>
              <MdTrendingUp size={25} color="#6ab9ff" /> Sales & Plans
            </h2>
            <p>Want to upgrade your subscription or need a custom plan?</p>
            <p className="contact-email">sales@myclinic.com</p>
          </div>

          {/* Demo Card */}
          <div className="contact-card">
            <h2>
              <MdPlayCircleFilled size={25} color="#6ab9ff" /> Request a Demo
            </h2>
            <p>
              Let our team walk you through the platform in a 15-min session.
            </p>
            <p className="contact-email">demo@myclinic.com</p>
          </div>
        </div>

        {/* Address Card */}
        <div className="contact-address">
          <h3>
            <MdLocationPin size={25} color="#6ab9ff" /> Office Location
          </h3>
          <p>MyClinic SaaS Pvt. Ltd.</p>
          <p>123 Healthcare Tower</p>
          <p>Innovation City, Remote</p>
        </div>

        {/* Contact Form */}
        <div className="contact-form-container">
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();

              // Show success message
              setSuccess(true);

              // Clear input fields
              setName("");
              setEmail("");
              setMessage("");

              // Hide success after 3 seconds
              setTimeout(() => setSuccess(false), 3000);
            }}
          >
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Your Message</label>
              <textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="contact-submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
