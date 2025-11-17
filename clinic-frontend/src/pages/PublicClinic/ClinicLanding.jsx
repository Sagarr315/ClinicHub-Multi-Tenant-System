import "./ClinicLanding.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

import ClinicHeader from "../../components/ClinicHeader/ClinicHeader";
import ClinicFooter from "../../components/ClinicFooter/ClinicFooter";

function ClinicLanding() {
  const { slug } = useParams();
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadClinic() {
    try {
      const res = await api.get(`/api/clinics/subdomain/${slug}`);
      setClinic(res.data);
    } catch (err) {
      toast.error("Clinic not found");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClinic();
  }, [slug]);

  if (loading) {
    return (
      <div className="clinic-loading">
        <h2>Loading clinic...</h2>
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="clinic-loading">
        <h2>Clinic not found.</h2>
      </div>
    );
  }

  return (
    <>
      <ClinicHeader clinic={clinic} />

      <div className="clinic-landing-container">
        <h1>Welcome to {clinic.name}</h1>
        <p className="tagline">{clinic.subscriptionPlan || "Your Health. Our Priority."}</p>

        <div className="clinic-info">
          <p><strong>Address:</strong> {clinic.address}</p>
          <p><strong>Email:</strong> {clinic.email}</p>
        </div>

        <a href={`/c/${slug}/book`} className="book-now-btn">
          Book Appointment
        </a>
      </div>

      <ClinicFooter clinic={clinic} />
    </>
  );
}

export default ClinicLanding;
