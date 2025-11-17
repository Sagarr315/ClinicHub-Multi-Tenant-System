import "./ClinicCard.css";
import ElectricBorder from "../../Animation/ElectricBorder.jsx";

function ClinicCard({ clinic }) {
  return (
    <ElectricBorder
      color="#7df9ff"
      speed={1}
      chaos={0.4}
      thickness={2}
      style={{ borderRadius: 16 }}
    >
      <div className="clinic-card shadow-sm">
        <h3 className="clinic-name">{clinic.name}</h3>

        <p className="subdomain">@{clinic.subdomain}</p>

        {/* ✓ LOCAL DEVELOPMENT FRIENDLY LINK */}
        <a
          href={`http://localhost:5173/c/${clinic.subdomain}`}
          className="visit-btn"
        >
          Visit Clinic
        </a>
      </div>
    </ElectricBorder>
  );
}

export default ClinicCard;
