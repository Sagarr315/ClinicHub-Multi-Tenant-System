import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./doctor.css";

export default function DoctorAnalytics() {
  const { slug } = useParams();
  const { user } = useAuth();
  const doctorId = user?.id;

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (doctorId) loadStats();
  }, [doctorId]);

  async function loadStats() {
    try {
      setLoading(true);
      const res = await api.get(`/api/analytics/doctor/${doctorId}`);
      setStats(res.data);
    } catch {
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }

  if (loading || !stats) {
    return <p className="text-center py-4">Loading analytics...</p>;
  }

  const pieData = [
    { name: "Completed", value: stats.completedAppointments },
    { name: "Pending", value: stats.totalAppointments - stats.completedAppointments },
  ];

  const COLORS = ["#0dcaf0", "#1e2a36"];

  const barData = [
    {
      name: "Appointments",
      Completed: stats.completedAppointments,
      Pending: stats.totalAppointments - stats.completedAppointments,
    },
  ];

  return (
    <div className="container py-4 doctor-analytics-page">
      <h2 className="doctor-title mb-4">My Performance Analytics</h2>

      {/* STAT CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-md-3 col-6">
          <div className="analytics-card">
            <h5>Total Appointments</h5>
            <p>{stats.totalAppointments}</p>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="analytics-card">
            <h5>Completed</h5>
            <p>{stats.completedAppointments}</p>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="analytics-card">
            <h5>Completion Rate</h5>
            <p>{stats.completionRate}%</p>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="analytics-card">
            <h5>Revenue Generated</h5>
            <p>₹{stats.revenueGenerated}</p>
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="row g-4">

        {/* PIE CHART */}
        <div className="col-lg-6">
          <div className="chart-card">
            <h5 className="chart-title">Completion Breakdown</h5>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR CHART */}
        <div className="col-lg-6">
          <div className="chart-card">
            <h5 className="chart-title">Appointments Summary</h5>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="Completed" fill="#0dcaf0" />
                <Bar dataKey="Pending" fill="#1e2a36" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
