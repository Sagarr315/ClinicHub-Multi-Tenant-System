import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import "./book-appointment.css";

export default function BookAppointment() {
  const clinicId = localStorage.getItem("clinicId");

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctorSchedule, setDoctorSchedule] = useState([]);

  const [appointmentDate, setAppointmentDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState("");

  // Patient details
  const [patientName, setPatientName] = useState("");
  const [patientContact, setPatientContact] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientAge, setPatientAge] = useState("");

  //  local date formatter (No timezone shift)
  const toLocalYMD = (dateObj) => dateObj.toLocaleDateString("en-CA");

  // Load doctors
  useEffect(() => {
    api
      .get(`/api/doctors/clinic/${clinicId}`)
      .then((res) => setDoctors(res.data))
      .catch(() => toast.error("Could not load doctors"));
  }, []);

  // Load doctor schedule
  useEffect(() => {
    if (!selectedDoctor) {
      setDoctorSchedule([]);
      setAppointmentDate("");
      setAvailableSlots([]);
      return;
    }

    api
      .get(`/api/doctor-schedules/doctor/${selectedDoctor}`)
      .then((res) => setDoctorSchedule(res.data))
      .catch(() => toast.error("Could not load doctor schedule"));
  }, [selectedDoctor]);

  // Load slots for selected date
  useEffect(() => {
    if (!selectedDoctor || !appointmentDate) return;

    api
      .get(`/api/appointments/slots/${selectedDoctor}/${appointmentDate}`)
      .then((res) => setAvailableSlots(res.data))
      .catch(() => toast.error("Could not load slots"));
  }, [appointmentDate, selectedDoctor]);

  // Calendar helpers
  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  // Check if day is in doctor's schedule
  const isDateAvailable = (day) => {
    if (!day) return false;

    const d = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    const dow = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ][d.getDay()];

    return doctorSchedule.some((s) => s.dayOfWeek === dow);
  };

  // handle clicking a schedule day
  const handleDaySelection = (dayOfWeek) => {
    setSelectedDayOfWeek(dayOfWeek);
  };

  // handle clicking calendar date
  const handleDateSelect = (day) => {
    if (!isDateAvailable(day)) return;

    const dt = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    setAppointmentDate(toLocalYMD(dt));
  };

  const navigateMonth = (delta) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1)
    );
  };

  // Final booking
  const bookAppointment = async () => {
    if (
      !patientName ||
      !patientContact ||
      !patientGender ||
      !patientAge ||
      !selectedDoctor ||
      !appointmentDate ||
      !selectedSlot
    ) {
      toast.error("All fields required");
      return;
    }

    try {
      await api.post("/api/appointments/book", {
        doctorId: selectedDoctor,
        clinicId,
        name: patientName,
        contact: patientContact,
        gender: patientGender,
        age: Number(patientAge),
        appointmentDate: selectedSlot,
      });

      toast.success("Appointment booked!");

      // RESET EVERYTHING after successful booking
      setPatientName("");
      setPatientContact("");
      setPatientGender("");
      setPatientAge("");

      setSelectedDoctor("");
      setDoctorSchedule([]);
      setSelectedDayOfWeek("");

      setAppointmentDate("");
      setAvailableSlots([]);
      setSelectedSlot("");

      setCurrentMonth(new Date());
    } catch {
      toast.error("Failed to book appointment");
    }
  };

  // Generate calendar days
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  return (
    <div className="container py-4 bookapt-page">
      <h2 className="ba-title mb-4">Book New Appointment</h2>

      {/* PATIENT SECTION */}
      <div className="ba-section">
        <h5 className="ba-section-title">Patient Information</h5>

        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Patient Name *</label>
            <input
              className="form-control ba-input"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Contact Number *</label>
            <input
              className="form-control ba-input"
              value={patientContact}
              onChange={(e) => setPatientContact(e.target.value)}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <label className="form-label">Gender *</label>
            <select
              className="form-control ba-input"
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Age *</label>
            <input
              type="number"
              className="form-control ba-input"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* DOCTOR SELECTION */}
      <div className="ba-section mt-4">
        <h5 className="ba-section-title">Select Doctor</h5>
        <select
          className="form-control ba-input"
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
        >
          <option value="">Choose doctor...</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              Dr. {d.name} – {d.specialization}
            </option>
          ))}
        </select>
      </div>

      {/* DOCTOR SCHEDULE */}
      {doctorSchedule.length > 0 && (
        <div className="ba-section mt-3">
          <h5 className="ba-section-title">Select Available Day</h5>

          <div className="schedule-list">
            {doctorSchedule.map((s) => (
              <div
                key={s.id}
                className={`schedule-item ${
                  selectedDayOfWeek === s.dayOfWeek ? "schedule-selected" : ""
                }`}
                onClick={() => handleDaySelection(s.dayOfWeek)}
              >
                <span className="day">{s.dayOfWeek}</span>
                <span className="time">
                  {s.startTime} – {s.endTime}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CALENDAR */}
      {doctorSchedule.length > 0 && (
        <div className="ba-section mt-4">
          <h5 className="ba-section-title">Select Date</h5>

          <div className="calendar-header">
            <button className="calendar-nav" onClick={() => navigateMonth(-1)}>
              ‹
            </button>
            <span className="calendar-month">
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button className="calendar-nav" onClick={() => navigateMonth(1)}>
              ›
            </button>
          </div>

          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="calendar-weekday">
                {d}
              </div>
            ))}

            {calendarDays.map((day, index) => {
              const dt = day
                ? new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    day
                  )
                : null;

              const isSelected = day && appointmentDate === toLocalYMD(dt);

              return (
                <div
                  key={index}
                  className={`calendar-day ${
                    day
                      ? isDateAvailable(day)
                        ? "available"
                        : "unavailable"
                      : "empty"
                  } ${isSelected ? "selected" : ""}`}
                  onClick={() => handleDateSelect(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SLOTS */}
      {availableSlots.length > 0 && (
        <div className="ba-section mt-4">
          <h5 className="ba-section-title">Available Time Slots</h5>

          <div className="slots-grid">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                className={`slot-btn ${
                  selectedSlot === slot ? "slot-selected" : ""
                }`}
                onClick={() => setSelectedSlot(slot)}
              >
                {new Date(slot).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* BOOK BUTTON */}
      <button className="ba-book-btn mt-4" onClick={bookAppointment}>
        Book Appointment
      </button>
    </div>
  );
}
