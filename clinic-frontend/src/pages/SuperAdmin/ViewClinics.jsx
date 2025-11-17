import { useEffect, useState } from "react";
import api from "../../services/api";
import "./ViewClinics.css";

export default function ViewClinics() {
  const [clinics, setClinics] = useState([]);

  async function loadClinics() {
    const res = await api.get("/api/superadmin/clinics");
    setClinics(res.data);
  }

  useEffect(() => {
    loadClinics();
  }, []);

  return (
    <div className="viewclinics-container container py-4">
      <h2 className="page-title">All Clinics</h2>

      <div className="row">
        {clinics.map((c) => (
          <div className="col-md-4 mb-4" key={c.id}>
            <div className="clinic-card p-3">
              <h4>{c.name}</h4>
              <p className="sub-info">@{c.subdomain}</p>
              <p>Email: {c.email}</p>
              <p>Address: {c.address}</p>
              <p>Plan: {c.subscriptionPlan}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
