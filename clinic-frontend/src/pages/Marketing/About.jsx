import "./About.css";
import {
  FaClinicMedical,
  FaUsers,
  FaShieldAlt,
  FaCogs,
  FaHeartbeat,
} from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import { HiOfficeBuilding } from "react-icons/hi";

function About() {
  return (
    <>
      {/* Banner */}
      <section className="about-banner d-flex flex-column justify-content-center text-center">
        <div className="container">
          <h1 className="fw-bold" style={{ color: "#4a9eff" }}>
            About Our Platform
          </h1>
          <p className="lead mt-3" style={{ color: "#c6ced8" }}>
            Reinventing Clinic Management for the Modern Healthcare Era
          </p>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="about-section py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-4" style={{ color: "#8fc6ff" }}>
            Our Vision & Mission
          </h2>

          <div className="row g-4 justify-content-center">
            <div className="col-md-6">
              <div className="about-card p-4 rounded-3">
                <h4 style={{ color: "#8fc6ff" }}>Our Vision</h4>
                <p style={{ color: "#c6ced8" }}>
                  To create a fully automated, intelligent healthcare operating
                  system that reduces admin burden and empowers clinics to
                  deliver world-class care.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="about-card p-4 rounded-3">
                <h4 style={{ color: "#8fc6ff" }}>Our Mission</h4>
                <p style={{ color: "#c6ced8" }}>
                  We simplify clinic workflows with smart automation, advanced
                  analytics, digital records, and secure communication — all
                  under one unified platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="about-section py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-4" style={{ color: "#4a9eff" }}>
            What We Offer
          </h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="about-card p-4 rounded-3">
                <FaClinicMedical size={32} color="#6ab9ff" />
                <h5 className="mt-3 fw-bold" style={{ color: "#8fc6ff" }}>
                  Multi-Tenant Architecture
                </h5>
                <p style={{ color: "#c6ced8" }}>
                  Every clinic gets a secure, isolated environment with its own
                  branding and preferences.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="about-card p-4 rounded-3">
                <HiOfficeBuilding size={32} color="#6ab9ff" />
                <h5 className="mt-3 fw-bold" style={{ color: "#8fc6ff" }}>
                  Role-Based Access
                </h5>
                <p style={{ color: "#c6ced8" }}>
                  Super Admin, Admin Doctors, Doctors, Receptionists & Patients
                  — each with tailored permissions.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="about-card p-4 rounded-3">
                <FiTrendingUp size={32} color="#6ab9ff" />
                <h5 className="mt-3 fw-bold" style={{ color: "#8fc6ff" }}>
                  Real-Time Analytics
                </h5>
                <p style={{ color: "#c6ced8" }}>
                  Insightful dashboards tracking revenue, appointments,
                  capacity, and doctor performance.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="about-card p-4 rounded-3">
                <FaCogs size={32} color="#6ab9ff" />
                <h5 className="mt-3 fw-bold" style={{ color: "#8fc6ff" }}>
                  Smart Scheduling
                </h5>
                <p style={{ color: "#c6ced8" }}>
                  Automatically generated slots, conflict prevention & workflow
                  optimization.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="about-card p-4 rounded-3">
                <FaShieldAlt size={32} color="#6ab9ff" />
                <h5 className="mt-3 fw-bold" style={{ color: "#8fc6ff" }}>
                  Advanced Security
                </h5>
                <p style={{ color: "#c6ced8" }}>
                  JWT authentication, encrypted data, clinic-level isolation &
                  strict role permissions.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="about-card p-4 rounded-3">
                <FaHeartbeat size={32} color="#6ab9ff" />
                <h5 className="mt-3 fw-bold" style={{ color: "#8fc6ff" }}>
                  Digital Prescriptions
                </h5>
                <p style={{ color: "#c6ced8" }}>
                  Clinic-branded PDF prescriptions with QR verification and
                  digital signatures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="about-section py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-4" style={{ color: "#4a9eff" }}>
            Who We Serve
          </h2>

          <div className="row g-4 justify-content-center">
            <div className="col-md-3">
              <div className="persona-card p-4 rounded-3 text-center">
                <h5 className="fw-bold" style={{ color: "#8fc6ff" }}>
                  Clinics
                </h5>
                <p style={{ color: "#c6ced8" }}>
                  End-to-end digital operations.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="persona-card p-4 rounded-3 text-center">
                <h5 className="fw-bold" style={{ color: "#8fc6ff" }}>
                  Doctors
                </h5>
                <p style={{ color: "#c6ced8" }}>
                  Smart scheduling & digital patient care.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="persona-card p-4 rounded-3 text-center">
                <h5 className="fw-bold" style={{ color: "#8fc6ff" }}>
                  Receptionists
                </h5>
                <p style={{ color: "#c6ced8" }}>
                  Smooth appointment management.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="persona-card p-4 rounded-3 text-center">
                <h5 className="fw-bold" style={{ color: "#8fc6ff" }}>
                  Patients
                </h5>
                <p style={{ color: "#c6ced8" }}>
                  Convenient digital records & care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
