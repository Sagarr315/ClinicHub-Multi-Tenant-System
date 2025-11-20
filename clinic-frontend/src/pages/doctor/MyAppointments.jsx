import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import "./doctor.css";

export default function MyAppointments() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from context

  const doctorId = user?.id; // Get doctor ID from user context
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("TODAY");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (doctorId) { //Only load if doctorId exists
      loadAppointments();
    }
  }, [doctorId]); //doctorId dependency

  async function loadAppointments() {
    try {
      setLoading(true);
      const res = await api.get(`/api/appointments/doctor/${doctorId}`);
      setAppointments(res.data);
    } catch (err) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }

  // ... rest of your code remains the same
  const todayDate = new Date().toISOString().split("T")[0];

  const filteredAppointments = appointments.filter((app) => {
    const date = app?.appointmentDate?.split("T")[0];

    if (filter === "TODAY") return date === todayDate;
    if (filter === "UPCOMING") return date > todayDate && app.status !== "COMPLETED";
    if (filter === "COMPLETED") return app.status === "COMPLETED";
    return true; // ALL
  });

  async function markCompleted(id) {
    try {
      await api.put(`/api/appointments/${id}/status`, { status: "COMPLETED" });
      toast.success("Appointment marked completed");
      navigate(`/c/${slug}/doctor/create-prescription/${id}`);
    } catch (err) {
      toast.error("Failed to update appointment");
    }
  }

  return (
    <div className="container py-4 doctor-appointments-page">
      <div className="doctor-header-bar mb-3">
        <h2 className="doctor-title">My Appointments</h2>
        <select
          className="doctor-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="TODAY">Today</option>
          <option value="UPCOMING">Upcoming</option>
          <option value="COMPLETED">Completed</option>
          <option value="ALL">All</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="table-responsive doctor-table">
          <table className="table table-dark table-striped align-middle">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-3">No appointments found.</td>
                </tr>
              ) : (
                filteredAppointments.map((app) => (
                  <tr key={app.id}>
                    <td>{app.patient?.name}</td>
                    <td>{new Date(app.appointmentDate).toLocaleString()}</td>
                    <td>
                      <span
                        className={
                          app.status === "COMPLETED"
                            ? "status-badge completed"
                            : "status-badge scheduled"
                        }
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="text-center">
                      {app.status !== "COMPLETED" ? (
                        <button
                          className="btn-complete"
                          onClick={() => markCompleted(app.id)}
                        >
                          Mark Completed
                        </button>
                      ) : (
                        <button
                          className="btn-view"
                          onClick={() =>
                            navigate(`/c/${slug}/doctor/view-prescription/${app.id}`)
                          }
                        >
                          View Prescription
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}