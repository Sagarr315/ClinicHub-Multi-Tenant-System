import "./Clinics.css";
import ClinicCard from "../../components/ClinicCard/ClinicCard";
import api from "../../services/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Clinics() {
  const [clinics, setClinics] = useState([]);

  async function loadClinics() {
    try {
      const res = await api.get("/api/clinics/public"); // REAL BACKEND
      setClinics(res.data);
    } catch (err) {
      toast.error("Failed to load clinics");
    }
  }

  useEffect(() => {
    loadClinics();
  }, []);

  return (
    <>
      
      <div className="page-container clinics-page">
        <h2>Clinics Using Our Platform</h2>

        <div className="clinic-grid">
          {clinics.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} />
          ))}
        </div>
      </div>

   
    </>
  );
}

export default Clinics;
