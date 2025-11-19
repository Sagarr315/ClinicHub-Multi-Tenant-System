import "./ClinicLanding.css";
import { useOutletContext } from "react-router-dom";

export default function ClinicLanding() {
  const { clinic } = useOutletContext();

  return (
    <div className="clinic-landing-container">
      <h1>Welcome to {clinic.name}</h1>
      <p className="tagline">
        {clinic.subscriptionPlan || "Your Health. Our Priority."}
      </p>

      <div className="clinic-info">
        <p><strong>Address:</strong> {clinic.address}</p>
        <p><strong>Email:</strong> {clinic.email}</p>
      </div>

      <a href={`/c/${clinic.subdomain}/book`} className="book-now-btn">
        Book Appointment
      </a>
    </div>
  );
}
