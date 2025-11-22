import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import "./manage-appointments.css";

export default function ManageAppointments() {
  const { slug } = useParams();
  const { user } = useAuth();
  const clinicId = user?.clinicId;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("TODAY");
  const [sortOrder, setSortOrder] = useState("newest");

  // Reschedule Modal State
  const [showModal, setShowModal] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    id: null,
    patientName: "",
    doctorName: "",
    currentDateTime: "",
    newDate: "",
    newDateTime: "",
    doctorId: null
  });
  const [doctorSchedule, setDoctorSchedule] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState("");

  // Load appointments
  useEffect(() => {
    if (clinicId) loadAppointments();
  }, [clinicId]);

  async function loadAppointments() {
    try {
      setLoading(true);
      const res = await api.get(`/api/appointments/clinic/${clinicId}`);
      setAppointments(res.data);
    } catch (err) {
      console.error("Load appointments error:", err);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }

  // Local date formatter
  const toLocalYMD = (dateObj) => dateObj.toLocaleDateString("en-CA");

  // Filtering
  const today = new Date().toISOString().split("T")[0];
  const filtered = appointments.filter((app) => {
    const date = app.appointmentDate.split("T")[0];
    if (filter === "TODAY") return date === today;
    if (filter === "UPCOMING") return date > today && app.status !== "CANCELLED";
    if (filter === "COMPLETED") return app.status === "COMPLETED";
    if (filter === "CANCELLED") return app.status === "CANCELLED";
    return true;
  });

  // Sorting - newest first by default
  const sortedAppointments = [...filtered].sort((a, b) => {
    const dateA = new Date(a.appointmentDate);
    const dateB = new Date(b.appointmentDate);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Confirm appointment (BOOKED → CONFIRMED)
  async function confirmAppointment(id) {
    try {
      await api.put(`/api/appointments/${id}/status`, { status: "CONFIRMED" });
      toast.success("Appointment confirmed ✅");
      loadAppointments();
    } catch (err) {
      console.error("Confirm error:", err);
      toast.error("Failed to confirm appointment");
    }
  }

  // Cancel appointment
  async function cancelAppointment(id) {
    try {
      await api.put(`/api/appointments/${id}/cancel`);
      toast.success("Appointment cancelled ❌");
      loadAppointments();
    } catch (err) {
      console.error("Cancel error:", err);
      toast.error("Failed to cancel appointment");
    }
  }

  // Open enhanced reschedule modal
  async function openRescheduleModal(appointment) {
    setRescheduleData({
      id: appointment.id,
      patientName: appointment.patient?.name,
      doctorName: appointment.doctor?.name,
      currentDateTime: appointment.appointmentDate,
      newDate: "",
      newDateTime: "",
      doctorId: appointment.doctor?.id
    });
    
    // Load doctor schedule
    try {
      const res = await api.get(`/api/doctor-schedules/doctor/${appointment.doctor.id}`);
      setDoctorSchedule(res.data);
    } catch (err) {
      console.error("Schedule load error:", err);
      toast.error("Failed to load doctor schedule");
    }
    
    setShowModal(true);
  }

  // Calendar functions
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const isDateAvailable = (day) => {
    if (!day || !rescheduleData.doctorId) return false;
    const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dow = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"][d.getDay()];
    return doctorSchedule.some((s) => s.dayOfWeek === dow);
  };

  const navigateMonth = (delta) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1));
  };

  // Load available slots when date changes
  useEffect(() => {
    if (rescheduleData.newDate && rescheduleData.doctorId) {
      api.get(`/api/appointments/slots/${rescheduleData.doctorId}/${rescheduleData.newDate}`)
        .then((res) => setAvailableSlots(res.data))
        .catch(() => toast.error("Could not load slots"));
    } else {
      setAvailableSlots([]);
    }
  }, [rescheduleData.newDate, rescheduleData.doctorId]);

  // Submit reschedule
  async function submitReschedule() {
    if (!rescheduleData.newDateTime) {
      toast.error("Please select a new date and time");
      return;
    }

    try {
      await api.put(`/api/appointments/${rescheduleData.id}/reschedule`, {
        newDateTime: rescheduleData.newDateTime,
      });

      toast.success("Appointment rescheduled successfully 🔄");
      setShowModal(false);
      resetRescheduleData();
      loadAppointments();
    } catch (err) {
      console.error("Reschedule error:", err);
      toast.error("Failed to reschedule appointment");
    }
  }

  const resetRescheduleData = () => {
    setRescheduleData({
      id: null,
      patientName: "",
      doctorName: "",
      currentDateTime: "",
      newDate: "",
      newDateTime: "",
      doctorId: null
    });
    setDoctorSchedule([]);
    setAvailableSlots([]);
    setCurrentMonth(new Date());
    setSelectedDayOfWeek("");
  };

  // Generate calendar days
  const calendarDays = [];
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  return (
    <div className="container py-4 manageapt-page">
      <h2 className="ma-title mb-4">Manage Appointments</h2>

      {/* Filters and Sort */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <select className="ma-filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="TODAY">Today</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="ALL">All</option>
          </select>
          
          <select className="ma-filter" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        
        <button className="btn-ma refresh" onClick={loadAppointments}>
          🔄 Refresh
        </button>
      </div>

      {/* Appointments Table */}
      {loading ? (
        <p className="text-center">Loading appointments...</p>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>
                  Date & Time 
                  <span className="sort-indicator">{sortOrder === "newest" ? " ↓" : " ↑"}</span>
                </th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sortedAppointments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <div className="no-appointments">
                      <p>No appointments found</p>
                      <small className="text-muted">Try changing the filter</small>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedAppointments.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <div className="patient-info">
                        <strong>{app.patient?.name}</strong>
                        <br />
                        <small>{app.patient?.contact}</small>
                      </div>
                    </td>
                    <td>
                      <div className="doctor-info">
                        <strong>Dr. {app.doctor?.name}</strong>
                        <br />
                        <small>{app.doctor?.specialization}</small>
                      </div>
                    </td>
                    <td>{new Date(app.appointmentDate).toLocaleString()}</td>

                    <td>
                      <span className={`badge-status ${app.status.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </td>

                    <td className="text-center">
                      <div className="action-buttons">
                        {/* Receptionist can only manage BOOKED appointments */}
                        {app.status === "BOOKED" && (
                          <>
                            <button
                              className="btn-ma confirm"
                              onClick={() => confirmAppointment(app.id)}
                            >
                              Confirm
                            </button>
                            <button
                              className="btn-ma cancel"
                              onClick={() => cancelAppointment(app.id)}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        
                        {/* Reschedule available for BOOKED and CONFIRMED */}
                        {(app.status === "BOOKED" || app.status === "CONFIRMED") && (
                          <button
                            className="btn-ma reschedule"
                            onClick={() => openRescheduleModal(app)}
                          >
                            Reschedule
                          </button>
                        )}
                        
                        {/* No actions for COMPLETED or CANCELLED */}
                        {(app.status === "COMPLETED" || app.status === "CANCELLED") && (
                          <span className="text-muted">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Enhanced Reschedule Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="ma-modal enhanced-reschedule-modal">
            <h4 className="mb-3">Reschedule Appointment</h4>
            
            {/* Current Appointment Info */}
            <div className="current-appointment-info">
              <h6>Current Appointment:</h6>
              <p><strong>Patient:</strong> {rescheduleData.patientName}</p>
              <p><strong>Doctor:</strong> Dr. {rescheduleData.doctorName}</p>
              <p><strong>Current Time:</strong> {new Date(rescheduleData.currentDateTime).toLocaleString()}</p>
            </div>

            {/* Doctor Schedule */}
            {doctorSchedule.length > 0 && (
              <div className="mb-3">
                <h6>Select Available Day:</h6>
                <div className="schedule-list">
                  {doctorSchedule.map((s) => (
                    <div
                      key={s.id}
                      className={`schedule-item ${
                        selectedDayOfWeek === s.dayOfWeek ? "schedule-selected" : ""
                      }`}
                      onClick={() => setSelectedDayOfWeek(s.dayOfWeek)}
                    >
                      <span className="day">{s.dayOfWeek}</span>
                      <span className="time">{s.startTime} – {s.endTime}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mini Calendar */}
            <div className="mb-3">
              <h6>Select New Date:</h6>
              <div className="calendar-header">
                <button className="calendar-nav" onClick={() => navigateMonth(-1)}>‹</button>
                <span className="calendar-month">
                  {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
                </span>
                <button className="calendar-nav" onClick={() => navigateMonth(1)}>›</button>
              </div>

              <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="calendar-weekday">{d}</div>
                ))}
                
                {calendarDays.map((day, index) => {
                  const dt = day ? new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) : null;
                  const isSelected = day && rescheduleData.newDate === toLocalYMD(dt);
                  
                  return (
                    <div
                      key={index}
                      className={`calendar-day ${
                        day ? (isDateAvailable(day) ? "available" : "unavailable") : "empty"
                      } ${isSelected ? "selected" : ""}`}
                      onClick={() => day && isDateAvailable(day) && setRescheduleData({
                        ...rescheduleData, 
                        newDate: toLocalYMD(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
                      })}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Available Time Slots */}
            {availableSlots.length > 0 && (
              <div className="mb-3">
                <h6>Select New Time:</h6>
                <div className="slots-grid">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      className={`slot-btn ${
                        rescheduleData.newDateTime === slot ? "slot-selected" : ""
                      }`}
                      onClick={() => setRescheduleData({...rescheduleData, newDateTime: slot})}
                    >
                      {new Date(slot).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Time Display */}
            {rescheduleData.newDateTime && (
              <div className="selected-time-info">
                <strong>Selected:</strong> {new Date(rescheduleData.newDateTime).toLocaleString()}
              </div>
            )}

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button className="ma-btn-cancel" onClick={() => {
                setShowModal(false);
                resetRescheduleData();
              }}>
                Cancel
              </button>
              <button 
                className="ma-btn-save" 
                onClick={submitReschedule}
                disabled={!rescheduleData.newDateTime}
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}