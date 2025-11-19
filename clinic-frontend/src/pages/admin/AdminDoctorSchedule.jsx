import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import "./schedule.css";

export default function AdminDoctorSchedule() {
  const { slug } = useParams();
  const clinicId = localStorage.getItem("clinicId");

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [schedules, setSchedules] = useState([]);

  const [form, setForm] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
  });

  const [editingId, setEditingId] = useState(null);

  async function loadDoctors() {
    try {
      const res = await api.get(`/api/admin/doctors/clinic/${clinicId}`);
      setDoctors(res.data);
    } catch {
      toast.error("Failed to load doctors");
    }
  }

  async function loadSchedules(doctorId) {
    try {
      const res = await api.get(`/api/doctor-schedules/doctor/${doctorId}`);
      setSchedules(res.data);
    } catch {
      setSchedules([]);
    }
  }

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
    loadSchedules(e.target.value);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!editingId) {
        await api.post("/api/doctor-schedules", {
          doctorId: selectedDoctor,
          ...form,
        });
        toast.success("Schedule added");
      } else {
        await api.put(`/api/doctor-schedules/${editingId}`, form);
        toast.success("Schedule updated");
        setEditingId(null);
      }

      setForm({ dayOfWeek: "", startTime: "", endTime: "" });
      loadSchedules(selectedDoctor);

    } catch {
      toast.error("Failed to save schedule");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete schedule?")) return;
    try {
      await api.delete(`/api/doctor-schedules/${id}`);
      toast.success("Deleted successfully");
      loadSchedules(selectedDoctor);
    } catch {
      toast.error("Delete failed");
    }
  }

  function handleEdit(s) {
    setEditingId(s.id);
    setForm({
      dayOfWeek: s.dayOfWeek,
      startTime: s.startTime,
      endTime: s.endTime,
    });
  }

  return (
    <div className="container py-4 schedule-page">

      <h2 className="schedule-title mb-4">Doctor Schedule Management</h2>

      <div className="mb-3">
        <label className="form-label">Select Doctor</label>
        <select className="form-select" value={selectedDoctor} onChange={handleDoctorChange}>
          <option value="">Select...</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      {selectedDoctor && (
        <>
          <form className="schedule-form mb-4" onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-4">
                <label className="form-label">Day</label>
                <select name="dayOfWeek" className="form-select" value={form.dayOfWeek} onChange={handleChange}>
                  <option value="">Select Day</option>
                  {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Start Time</label>
                <input name="startTime" type="time" className="form-control" value={form.startTime} onChange={handleChange} />
              </div>

              <div className="col-md-4">
                <label className="form-label">End Time</label>
                <input name="endTime" type="time" className="form-control" value={form.endTime} onChange={handleChange} />
              </div>
            </div>

            <button className="btn-save mt-3" type="submit">
              {editingId ? "Update Schedule" : "Add Schedule"}
            </button>
          </form>

          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Start</th>
                  <th>End</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((s) => (
                  <tr key={s.id}>
                    <td>{s.dayOfWeek}</td>
                    <td>{s.startTime}</td>
                    <td>{s.endTime}</td>
                    <td className="text-center">
                      <button className="btn-edit" onClick={() => handleEdit(s)}>Edit</button>
                      <button className="btn-delete ms-2" onClick={() => handleDelete(s.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

    </div>
  );
}
