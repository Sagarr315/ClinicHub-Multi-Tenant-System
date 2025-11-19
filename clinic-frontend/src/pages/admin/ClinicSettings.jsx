import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import "./clinicSettings.css";

export default function ClinicSettings() {
  const { slug } = useParams();
  const clinicId = localStorage.getItem("clinicId");

  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    consultationFee: "",
    taxRate: "",
  });

  // Load Clinic Info
  async function loadClinic() {
    try {
      const res = await api.get(`/api/clinics/subdomain/${slug}`);
      setClinic(res.data);
      setForm({
        consultationFee: res.data.consultationFee,
        taxRate: res.data.taxRate,
      });
    } catch {
      toast.error("Failed to load clinic info");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClinic();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Update Pricing
  async function handleSave(e) {
    e.preventDefault();

    try {
      await api.put(`/api/admin/clinic/${clinicId}/pricing`, {
        consultationFee: Number(form.consultationFee),
        taxRate: Number(form.taxRate),
      });

      toast.success("Pricing updated successfully!");
      loadClinic();
    } catch (err) {
      toast.error(err.response?.data || "Error updating pricing");
    }
  }

  if (loading) return <div className="text-center text-light mt-5">Loading...</div>;

  return (
    <div className="container py-4 clinic-settings-page">
      <h2 className="admin-title mb-4">Clinic Settings</h2>

      <div className="settings-card">
        <h4 className="section-title mb-3">Clinic Information</h4>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Clinic Name</label>
            <input className="form-control" value={clinic?.name} disabled />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input className="form-control" value={clinic?.email} disabled />
          </div>

          <div className="col-12">
            <label className="form-label">Address</label>
            <input className="form-control" value={clinic?.address} disabled />
          </div>
        </div>

        <h4 className="section-title mb-3">Pricing Settings</h4>

        <form onSubmit={handleSave} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Consultation Fee (₹)</label>
            <input
              type="number"
              name="consultationFee"
              className="form-control"
              value={form.consultationFee}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Tax Rate (0 - 1)</label>
            <input
              type="number"
              step="0.01"
              name="taxRate"
              className="form-control"
              value={form.taxRate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 mt-3">
            <button className="btn-save-settings">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
