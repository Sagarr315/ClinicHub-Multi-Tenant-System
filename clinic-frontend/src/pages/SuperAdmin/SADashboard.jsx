import "./SADashboard.css";
import { Link } from "react-router-dom";

function SADashboard() {
  return (
    <div className="sa-dashboard">
      <h2>Super Admin Dashboard</h2>

      <div className="sa-btns">
        <Link to="/superadmin/createclinic">Create Clinic</Link>
        <Link to="/superadmin/clinics">View Clinics</Link>
      </div>
    </div>
  );
}

export default SADashboard;
