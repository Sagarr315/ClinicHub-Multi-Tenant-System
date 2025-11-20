import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import "./doctor.css";

export default function ViewPrescription() {
  const { slug, appointmentId } = useParams();
  const navigate = useNavigate();

  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load prescription based on appointment
  useEffect(() => {
    loadPrescription();
  }, []);

  async function loadPrescription() {
  try {
    setLoading(true);
    const res = await api.get(`/api/prescriptions/appointment/${appointmentId}`);
    console.log("Full prescription response:", res.data);
    console.log("Medicines array:", res.data.medicines);
    console.log("Medicine structure:", res.data.medicines?.[0]);
    setPrescription(res.data);
  } catch (err) {
    toast.error("No prescription found for this appointment");
  } finally {
    setLoading(false);
  }
}

  // Download PDF
  async function downloadPDF(id) {
    try {
      const res = await api.get(`/api/prescriptions/${id}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `prescription_${id}.pdf`;
      a.click();
      toast.success("PDF downloaded");
    } catch (err) {
      toast.error("Failed to download PDF");
    }
  }

  return (
    <div className="container py-4 view-prescription-page">

      <h2 className="doctor-title mb-4">Prescription Details</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : !prescription ? (
        <p className="text-center">No prescription found.</p>
      ) : (
        <div className="prescription-card">

          <div className="prescription-section">
            <h4>Basic Info</h4>
            <p><strong>Prescription ID:</strong> {prescription.id}</p>
            <p><strong>Date:</strong> {prescription.prescriptionDate}</p>
            <p><strong>Doctor:</strong> {prescription.doctor?.name}</p>
            <p><strong>Patient:</strong> {prescription.patient?.name}</p>
          </div>

          <div className="prescription-section">
            <h4>Diagnosis</h4>
            <p>{prescription.diagnosis}</p>
          </div>

          <div className="prescription-section">
            <h4>Notes</h4>
            <p>{prescription.notes || "No additional notes."}</p>
          </div>

          <div className="prescription-section">
            <h4>Follow-up Date</h4>
            <p>{prescription.followUpDate || "—"}</p>
          </div>

          <div className="prescription-section">
  <h4>Medicines</h4>

  {prescription.medicines?.length > 0 ? (
    <div className="medicine-table">
      <table className="table table-dark table-sm">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Duration</th>
            <th>Instructions</th>
          </tr>
        </thead>
        <tbody>
          {prescription.medicines.map((m) => (
            <tr key={m.id}>
              <td><strong>{m.name}</strong></td>
              <td>{m.dosage}</td>
              <td>{m.frequency}</td>
              <td>{m.duration}</td>
              <td><small>{m.instructions}</small></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No medicines added.</p>
  )}
</div>

          <div className="mt-3">
            <button
              className="btn-download"
              onClick={() => downloadPDF(prescription.id)}
            >
              Download PDF
            </button>

            <button
              className="btn-back ms-2"
              onClick={() => navigate(`/c/${slug}/doctor/my-appointments`)}
            >
              Back to Appointments
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
