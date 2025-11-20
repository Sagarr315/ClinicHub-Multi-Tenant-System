import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import "./doctor.css";

export default function DoctorSchedule() {
  const { slug } = useParams();
  const { user } = useAuth(); // doctor info from context

  const doctorId = user?.id;
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (doctorId) loadSchedule();
  }, [doctorId]);

  async function loadSchedule() {
    try {
      setLoading(true);
      const res = await api.get(`/api/doctor-schedules/doctor/${doctorId}`);
      setSchedule(res.data);
    } catch (err) {
      toast.error("Failed to load schedule");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-4 doctor-schedule-page">
      <h2 className="doctor-title mb-4">My Schedule</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : schedule.length === 0 ? (
        <p className="text-center">No schedule available.</p>
      ) : (
        <div className="schedule-grid">
          {schedule.map((slot) => (
            <div key={slot.id} className="schedule-card">
              <h5>{slot.dayOfWeek}</h5>
              <p>
                {slot.startTime} — {slot.endTime}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
