import { Link, useParams } from "react-router-dom";
import "./receptionist-dashboard.css";

export default function ReceptionistDashboard() {
  const { slug } = useParams();

  const tiles = [
    { label: "Book Appointment", path: `/c/${slug}/receptionist/book` },
    { label: "All Appointments", path: `/c/${slug}/receptionist/appointments` },
    { label: "Patients", path: `/c/${slug}/receptionist/patients` },
    { label: "Payments / Billing", path: `/c/${slug}/receptionist/billing` },
    { label: "View Prescriptions", path: `/c/${slug}/receptionist/prescriptions` },
  ];

  return (
    <div className="receptionist-dashboard container py-4">
      <h2 className=" receptionist-title mb-4">Receptionist Dashboard</h2>

      <div className="row g-3">
        {tiles.map((t) => (
          <div key={t.label} className="col-6 col-md-4 col-lg-3">
            <Link to={t.path} className="receptionist-tile text-center">
              {t.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
