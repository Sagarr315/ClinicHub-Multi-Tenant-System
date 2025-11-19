import { Link, useParams } from "react-router-dom";
import "../../styles/admin.css";

export default function AdminDashboard() {
  const { slug } = useParams();

  const tiles = [
    { label: "Add Doctor", path: `/c/${slug}/add-doctor` },
    { label: "Add Receptionist", path: `/c/${slug}/add-receptionist` },
    { label: "Doctor Schedule", path: `/c/${slug}/doctor-schedule` },
    { label: "Billing & Payments", path: `/c/${slug}/billing` },
    { label: "Analytics & Reports", path: `/c/${slug}/analytics` },
    { label: "Clinic Settings", path: `/c/${slug}/clinic-settings` },
    { label: "Prescriptions", path: `/c/${slug}/prescriptions` },
  ];

  return (
    <div className="admin-dashboard container py-4">
      <h2 className="admin-title mb-4">Admin Dashboard</h2>

      <div className="row g-3">
        {tiles.map((t) => (
          <div key={t.label} className="col-6 col-md-4 col-lg-3">
            <Link to={t.path} className="admin-tile text-center">
              {t.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
