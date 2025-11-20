import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import ClinicHeader from "../components/ClinicHeader/ClinicHeader";
import ClinicFooter from "../components/ClinicFooter/ClinicFooter";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function ClinicLayout() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.clinicSubdomain && user.clinicSubdomain !== slug) {
      navigate(`/c/${user.clinicSubdomain}`);
      return;
    }
  }, [user, slug, navigate]);

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

  if (loading) return <h2>Loading clinic...</h2>;
  if (!clinic) return <h2>Clinic not found</h2>;

  return (
    <>
      <ClinicHeader clinic={clinic} />

      <div className="clinic-content">
        <Outlet context={{ clinic }} />
      </div>

      <ClinicFooter clinic={clinic} />
    </>
  );
}
