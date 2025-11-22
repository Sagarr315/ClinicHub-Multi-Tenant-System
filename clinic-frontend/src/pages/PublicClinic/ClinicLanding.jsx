import "./ClinicLanding.css";
import { useOutletContext } from "react-router-dom";
import { FaClinicMedical, FaCheck, FaSignInAlt } from "react-icons/fa";

export default function ClinicLanding() {
  const { clinic } = useOutletContext();

  return (
    <div className="clinic-landing">
      {/* Header Branding */}
      <header className="landing-header">
        <h1 className="landing-title">
          <FaClinicMedical className="title-icon" />
          ClinicHub
        </h1>
        <p className="landing-subtitle">Multi-Tenant Clinic Management System</p>
      </header>

      {/* Features */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <ul className="features-list">
          <li className="feature-item">
            <FaCheck /> Multi-Tenant Architecture
          </li>
          <li className="feature-item">
            <FaCheck /> Patient & Appointment Management
          </li>
          <li className="feature-item">
            <FaCheck /> Digital Prescriptions & Billing
          </li>
          <li className="feature-item">
            <FaCheck /> Analytics & Reporting
          </li>
          <li className="feature-item">
            <FaCheck /> Secure & Cloud Ready
          </li>
        </ul>
      </section>

      {/* Quote */}
      <section className="quote-section">
        <blockquote>“Streamlining healthcare operations.”</blockquote>
      </section>

      {/* Clinic Info */}
      <section className="clinic-info">
        <h2 className="section-title">Clinic Information</h2>
        <p><strong>Address:</strong> {clinic.address}</p>
        <p><strong>Email:</strong> {clinic.email}</p>
      </section>
    </div>
  );
}
