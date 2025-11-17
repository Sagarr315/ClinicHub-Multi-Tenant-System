import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import "./CreateClinic.css";

export default function CreateClinic() {
  const [form, setForm] = useState({
    clinicName: "",
    clinicEmail: "",
    clinicAddress: "",
    subscriptionPlan: "",
    consultationFee: "",
    taxRate: "",
    subdomain: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/api/superadmin/create-clinic", form);
      toast.success("Clinic created successfully!");

      setForm({
        clinicName: "",
        clinicEmail: "",
        clinicAddress: "",
        subscriptionPlan: "",
        consultationFee: "",
        taxRate: "",
        subdomain: "",
        adminName: "",
        adminEmail: "",
        adminPassword: "",
      });
    } catch (err) {
      toast.error("Failed to create clinic");
    }
  }
 
  return (
    <div className="createclinic-container container py-4 ">
      <h2 className="page-title">Create New Clinic</h2>

      <div className="card createclinic-card p-4 m-4">
        <form onSubmit={handleSubmit}>

          <h4 className="section-title">Clinic Details</h4>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="text-white">Clinic Name</label>
              <input name="clinicName" className="form-control input-dark"
                value={form.clinicName} onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-3">
              <label className="text-white">Clinic Email</label>
              <input name="clinicEmail" type="email" className="form-control input-dark"
                value={form.clinicEmail} onChange={handleChange} required />
            </div>

            <div className="col-md-12 mb-3">
              <label className="text-white">Address</label>
              <input name="clinicAddress" className="form-control input-dark"
                value={form.clinicAddress} onChange={handleChange} required />
            </div>

            <div className="col-md-4 mb-3">
              <label className="text-white">Subscription Plan</label>
              <input name="subscriptionPlan" className="form-control input-dark"
                value={form.subscriptionPlan} onChange={handleChange} />
            </div>

            <div className="col-md-4 mb-3">
              <label className="text-white">Consultation Fee</label>
              <input name="consultationFee" type="number" className="form-control input-dark"
                value={form.consultationFee} onChange={handleChange} />
            </div>

            <div className="col-md-4 mb-3">
              <label className="text-white">Tax Rate (%)</label>
              <input name="taxRate" type="number" className="form-control input-dark"
                value={form.taxRate} onChange={handleChange} />
            </div>

            <div className="col-md-6 mb-3">
              <label className="text-white">Subdomain</label>
              <input name="subdomain" className="form-control input-dark"
                placeholder="example → apollo"
                value={form.subdomain} onChange={handleChange} required />
            </div>
          </div>

          <h4 className="section-title mt-4">Admin Doctor Details</h4>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="text-white">Admin Name</label>
              <input name="adminName" className="form-control input-dark"
                value={form.adminName} onChange={handleChange} required />
            </div>

            <div className="col-md-4 mb-3">
              <label className="text-white">Admin Email</label>
              <input name="adminEmail" type="email" className="form-control input-dark"
                value={form.adminEmail} onChange={handleChange} required />
            </div>

            <div className="col-md-4 mb-3">
              <label className="text-white">Admin Password</label>
              <input name="adminPassword" type="password" className="form-control input-dark"
                value={form.adminPassword} onChange={handleChange} required />
            </div>
          </div>

          <button className="btn btn-primary mt-3 w-100 create-btn">Create Clinic</button>
        </form>
      </div>
    </div>
  );
}
