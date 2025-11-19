import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import "../../styles/admin.css";

export default function AddDoctor() {
  const { slug } = useParams();
  const clinicId = localStorage.getItem("clinicId");

  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Load all doctors
  async function loadDoctors() {
    try {
      const res = await api.get(`/api/admin/doctors/clinic/${clinicId}`);
      setDoctors(res.data);
    } catch {
      toast.error("Failed to load doctors");
    }
  }

  useEffect(() => {
    loadDoctors();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or update doctor
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!editingId) {
        // ADD NEW DOCTOR
        await api.post("/api/admin/add-doctor", {
          ...form,
          clinicId: Number(clinicId),
        });
        toast.success("Doctor added successfully");
      } else {
        // UPDATE EXISTING DOCTOR
        await api.put(`/api/admin/doctors/${editingId}`, form);
        toast.success("Doctor updated successfully");
      }

      setForm({ name: "", email: "", password: "", specialization: "" });
      setEditingId(null);
      loadDoctors();
    } catch (err) {
      toast.error(err.response?.data || "Error saving doctor");
    }
  }

  // Edit doctor
  function handleEdit(doc) {
    setEditingId(doc.id);
    setForm({
      name: doc.name,
      email: doc.email,
      password: "",
      specialization: doc.specialization || "",
    });
  }

  // Delete doctor
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await api.delete(`/api/admin/doctors/${id}`);
      toast.success("Doctor deleted");
      loadDoctors();
    } catch {
      toast.error("Failed to delete doctor");
    }
  }

  return (
    <div className="container py-4 add-doctor-page">

      <h2 className="admin-title mb-4">
        {editingId ? "Edit Doctor" : "Add New Doctor"}
      </h2>

      {/* FORM */}
      <form className="admin-form mb-5" onSubmit={handleSubmit}>
        <div className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {!editingId && (
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required={!editingId}
              />
            </div>
          )}

          <div className="col-md-6">
            <label className="form-label">Specialization</label>
            <input
              name="specialization"
              type="text"
              className="form-control"
              value={form.specialization}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="btn-submit-admin mt-3" type="submit">
          {editingId ? "Update Doctor" : "Add Doctor"}
        </button>
      </form>

      {/* DOCTORS TABLE */}
      <h3 className="admin-title mb-3">All Doctors</h3>

      <div className="table-responsive admin-table">
        <table className="table table-dark table-striped table-hover align-middle">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-3">
                  No doctors found.
                </td>
              </tr>
            ) : (
              doctors.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.name}</td>
                  <td>{doc.email}</td>
                  <td>{doc.specialization || "—"}</td>
                  <td className="text-center">

                    <button className="btn-edit" onClick={() => handleEdit(doc)}>
                      Edit
                    </button>

                    <button className="btn-delete ms-2" onClick={() => handleDelete(doc.id)}>
                      Delete
                    </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
