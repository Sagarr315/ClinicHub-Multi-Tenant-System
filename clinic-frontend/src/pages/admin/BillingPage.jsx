import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import "./billing.css";

export default function BillingPage() {
  const { slug } = useParams();
  const clinicId = localStorage.getItem("clinicId");

  const [bills, setBills] = useState([]);
  const [filter, setFilter] = useState("ALL");

  // Discount Modal
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState(null);
  const [discountValue, setDiscountValue] = useState("");

  async function loadBills() {
    try {
      const res = await api.get(`/api/bills/clinic/${clinicId}`);
      setBills(res.data);
    } catch {
      toast.error("Failed to load bills");
    }
  }

  useEffect(() => {
    loadBills();
  }, []);

  const filteredBills =
    filter === "ALL" ? bills : bills.filter((bill) => bill.status === filter);

  const openDiscountModal = (billId) => {
    setSelectedBillId(billId);
    setDiscountValue("");
    setShowDiscountModal(true);
  };

  const applyDiscount = async () => {
    if (!discountValue || discountValue < 0) {
      toast.error("Enter a valid discount");
      return;
    }

    try {
      await api.put(`/api/bills/${selectedBillId}/discount`, {
        discount: Number(discountValue),
      });

      toast.success("Discount applied!");
      setShowDiscountModal(false);
      loadBills();
    } catch {
      toast.error("Failed to apply discount");
    }
  };

  return (
    <div className="billing-page container py-4">

      <div className="billing-header mb-3">
        <h2 className="billing-title">Billing & Payments</h2>

        <select
          className="billing-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="PAID">Paid</option>
          <option value="UNPAID">Unpaid</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="table-responsive billing-table">
        <table className="table table-dark table-striped align-middle">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Fee</th>
              <th>Tax</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBills.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-3">
                  No bills found.
                </td>
              </tr>
            ) : (
              filteredBills.map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.appointment?.patient?.name}</td>
                  <td>{bill.appointment?.doctor?.name}</td>
                  <td>
                    {bill?.appointment?.appointmentDate
                      ? new Date(bill.appointment.appointmentDate).toLocaleString()
                      : "—"}
                  </td>
                  <td>₹{bill.consultationFee}</td>
                  <td>₹{bill.tax}</td>
                  <td>₹{bill.discount}</td>
                  <td>₹{bill.totalAmount}</td>
                  <td>
                    <span
                      className={
                        bill.status === "PAID"
                          ? "status-badge paid"
                          : "status-badge unpaid"
                      }
                    >
                      {bill.status}
                    </span>
                  </td>

                  {/* DISCOUNT BUTTON */}
                  <td>
                    {bill.status === "PENDING" ? (
                      <button
                        className="btn-discount"
                        onClick={() => openDiscountModal(bill.id)}
                      >
                        Add Discount
                      </button>
                    ) : (
                      "--"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* DISCOUNT MODAL */}
      {showDiscountModal && (
        <div className="discount-modal-bg">
          <div className="discount-modal">
            <h3>Apply Discount</h3>

            <input
              type="number"
              className="form-control mt-2"
              placeholder="Enter discount amount"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
            />

            <div className="modal-buttons mt-3">
              <button className="btn-save" onClick={applyDiscount}>
                Apply
              </button>
              <button
                className="btn-cancel ms-2"
                onClick={() => setShowDiscountModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
