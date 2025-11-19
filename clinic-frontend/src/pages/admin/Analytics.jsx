import { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import "./analytics.css";

export default function Analytics() {
  const { slug } = useParams();
  const clinicId = localStorage.getItem("clinicId");

  const [summary, setSummary] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctorStats, setDoctorStats] = useState(null);

  // Load summary
  async function loadSummary() {
    try {
      const res = await api.get(`/api/analytics/summary?clinicId=${clinicId}`);
      setSummary(res.data);
    } catch {
      console.log("Failed loading summary");
    }
  }

  // Load doctor list
  async function loadDoctors() {
    try {
      const res = await api.get(`/api/admin/doctors/clinic/${clinicId}`);
      setDoctors(res.data);
    } catch {
      console.log("Cannot load doctors");
    }
  }

  // Load doctor analytics
  async function loadDoctorAnalytics(id) {
    try {
      const res = await api.get(`/api/analytics/doctor/${id}`);
      setDoctorStats(res.data);
    } catch {
      console.log("Doctor analytics failed");
    }
  }

  useEffect(() => {
    loadSummary();
    loadDoctors();
  }, []);

  const revenueData = summary
    ? [
        { name: "Total Revenue", value: summary.totalRevenue },
        { name: "Pending Revenue", value: summary.pendingRevenue },
      ]
    : [];

  const appointmentPie = summary
    ? [
        { name: "Completed", value: summary.completedAppointments },
        {
          name: "Remaining",
          value: summary.totalAppointments - summary.completedAppointments,
        },
      ]
    : [];

  return (
    <div className="analytics-page container py-4">

      <h2 className="analytics-title mb-4">Analytics & Reports</h2>

      {/* SUMMARY CARDS */}
      {summary && (
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-4 col-lg-2">
            <div className="analytics-card">
              <h4>{summary.totalAppointments}</h4>
              <p>Total Appointments</p>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <div className="analytics-card">
              <h4>{summary.completedAppointments}</h4>
              <p>Completed</p>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <div className="analytics-card">
              <h4>{summary.totalPatients}</h4>
              <p>Total Patients</p>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <div className="analytics-card">
              <h4>₹{summary.totalRevenue}</h4>
              <p>Revenue</p>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <div className="analytics-card">
              <h4>₹{summary.pendingRevenue}</h4>
              <p>Pending</p>
            </div>
          </div>
        </div>
      )}

      {/* CHARTS */}
      <div className="row g-4 mb-5">
        {/* BAR CHART */}
        <div className="col-md-6">
          <div className="chart-box">
            <h5>Revenue Overview</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Bar dataKey="value" fill="#6ab9ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="col-md-6">
          <div className="chart-box">
            <h5>Appointment Completion</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={appointmentPie}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  <Cell fill="#4fd1c5" />
                  <Cell fill="#ff6b6b" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* DOCTOR ANALYTICS */}
      <div className="doctor-section mb-5">
        <h3 className="analytics-subtitle">Doctor Performance</h3>

        <select
          className="form-select doctor-select"
          value={selectedDoctor}
          onChange={(e) => {
            setSelectedDoctor(e.target.value);
            loadDoctorAnalytics(e.target.value);
          }}
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {doctorStats && (
          <div className="row g-3 mt-4">
            <div className="col-6 col-md-3">
              <div className="doctor-card">
                <h4>{doctorStats.totalAppointments}</h4>
                <p>Total</p>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="doctor-card">
                <h4>{doctorStats.completedAppointments}</h4>
                <p>Completed</p>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="doctor-card">
                <h4>{doctorStats.completionRate}%</h4>
                <p>Success Rate</p>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="doctor-card">
                <h4>₹{doctorStats.revenueGenerated}</h4>
                <p>Revenue</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
