import "./ClinicHeader.css";
import { Link, useParams } from "react-router-dom";

function ClinicHeader({ clinic }) {
  const { slug } = useParams();

  return (
    <header className="clinic-header shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        
        <div className="clinic-logo">
          <h2>{clinic.name}</h2>
        </div>

        <nav className="clinic-nav">
          <Link to={`/c/${slug}`} className="nav-btn">Home</Link>
          <Link to={`/c/${slug}/book`} className="nav-btn">Book</Link>
        </nav>
      </div>
    </header>
  );
}

export default ClinicHeader;
