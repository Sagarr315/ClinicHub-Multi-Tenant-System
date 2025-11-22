import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import "./receptionist-billing.css";

export default function ReceptionistBilling() {
  const { slug } = useParams();
  const clinicId = localStorage.getItem("clinicId");

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" or "oldest"

  useEffect(() => {
    loadBills();
  }, []);

  async function loadBills() {
    try {
      setLoading(true);
      const res = await api.get(`/api/bills/clinic/${clinicId}`);
      setBills(res.data);
    } catch (err) {
      toast.error("Failed to load billing data");
    } finally {
      setLoading(false);
    }
  }

  async function markPaid(id) {
    try {
      await api.put(`/api/bills/${id}/status`, { status: "PAID" });
      toast.success("Payment marked as PAID");
      loadBills();
    } catch {
      toast.error("Failed to update payment");
    }
  }

  // Sort bills by date
  const sortedBills = [...bills].sort((a, b) => {
    const dateA = new Date(a.appointment?.appointmentDate || a.createdDate || 0);
    const dateB = new Date(b.appointment?.appointmentDate || b.createdDate || 0);
    
    return sortOrder === "newest" 
      ? dateB - dateA  // Newest first
      : dateA - dateB; // Oldest first
  });

  // Filter bills based on status
  const filtered = filter === "ALL" 
    ? sortedBills 
    : sortedBills.filter((b) => b.status === filter);

  return (
    <div className="container py-4 receptionist-billing-page">
      <h2 className="rcp-title mb-4">Billing & Payments</h2>

      {/* Filters and Sort Controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <select
            className="rcp-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="ALL">All Bills</option>
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
          </select>
          
          <select
            className="rcp-filter"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading bills...</p>
      ) : (
        <div className="table-responsive rcp-billing-table">
          <table className="table table-dark table-striped align-middle">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>
                  Date 
                  <span className="sort-indicator">
                    {sortOrder === "newest" ? " ↓" : " ↑"}
                  </span>
                </th>
                <th>Fee</th>
                <th>Tax</th>
                <th>Discount</th>
                <th>Total</th>
                <th>Status</th>
                <th style={{ width: "130px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-3">
                    No bills found.
                  </td>
                </tr>
              ) : (
                filtered.map((bill) => (
                  <tr key={bill.id}>
                    <td>{bill.patient?.name || bill.appointment?.patient?.name || "—"}</td>
                    <td>{bill.doctor?.name || bill.appointment?.doctor?.name || "—"}</td>
                    <td>
                      {bill.appointment?.appointmentDate
                        ? new Date(bill.appointment.appointmentDate).toLocaleDateString()
                        : "—"}
                    </td>
                    <td>₹{bill.consultationFee}</td>
                    <td>₹{bill.tax}</td>
                    <td>₹{bill.discount}</td>
                    <td>₹{bill.totalAmount}</td>

                    <td>
                      <span
                        className={`rcp-status ${
                          bill.status === "PAID" 
                            ? "rcp-paid" 
                            : bill.status === "PENDING"
                            ? "rcp-pending"
                            : "rcp-unknown"
                        }`}
                      >
                        {bill.status}
                      </span>
                    </td>

                    <td>
                      {bill.status === "PENDING" ? (
                        <button
                          className="rcp-btn rcp-pay"
                          onClick={() => markPaid(bill.id)}
                        >
                          Mark Paid
                        </button>
                      ) : (
                        <span className="text-muted">—</span>
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