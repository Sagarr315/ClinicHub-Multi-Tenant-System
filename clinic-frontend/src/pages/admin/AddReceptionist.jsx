import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import "../../styles/admin.css";

export default function AddReceptionist() {
  const { slug } = useParams();
  const clinicId = localStorage.getItem("clinicId");

  const [receptionists, setReceptionists] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Load all receptionists
  async function loadReceptionists() {
    try {
      const res = await api.get(`/api/admin/receptionists/clinic/${clinicId}`);
      setReceptionists(res.data);
    } catch {
      toast.error("Failed to load receptionists");
    }
  }

  useEffect(() => {
    loadReceptionists();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit (add or update)
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!editingId) {
        // ADD NEW
        await api.post("/api/admin/add-receptionist", {
          ...form,
          clinicId: Number(clinicId),
        });
        toast.success("Receptionist added successfully");
      } else {
        // UPDATE
        await api.put(`/api/admin/receptionists/${editingId}`, form);
        toast.success("Receptionist updated successfully");
      }

      setForm({ name: "", email: "", password: "" });
      setEditingId(null);
      loadReceptionists();
    } catch (err) {
      toast.error(err.response?.data || "Error saving receptionist");
    }
  }

  // Edit receptionist
  function handleEdit(rec) {
    setEditingId(rec.id);
    setForm({
      name: rec.name,
      email: rec.email,
      password: "",
    });
  }

  // Delete receptionist
  async function handleDelete(id) {
    if (!window.confirm("Delete this receptionist?")) return;

    try {
      await api.delete(`/api/admin/receptionists/${id}`);
      toast.success("Receptionist deleted");
      loadReceptionists();
    } catch {
      toast.error("Failed to delete receptionist");
    }
  }

  return (
    <div className="container py-4 add-doctor-page">

      <h2 className="admin-title mb-4">
        {editingId ? "Edit Receptionist" : "Add New Receptionist"}
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

        </div>

        <button className="btn-submit-admin mt-3" type="submit">
          {editingId ? "Update Receptionist" : "Add Receptionist"}
        </button>
      </form>

      {/* TABLE */}
      <h3 className="admin-title mb-3">All Receptionists</h3>

      <div className="table-responsive admin-table">
        <table className="table table-dark table-striped table-hover align-middle">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {receptionists.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-3">
                  No receptionists found.
                </td>
              </tr>
            ) : (
              receptionists.map((rec) => (
                <tr key={rec.id}>
                  <td>{rec.name}</td>
                  <td>{rec.email}</td>
                  <td className="text-center">

                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(rec)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete ms-2"
                      onClick={() => handleDelete(rec.id)}
                    >
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
