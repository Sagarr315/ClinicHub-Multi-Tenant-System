import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import "./prescription.css";

export default function PrescriptionList() {
  const { slug } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Load all prescriptions for admin
  useEffect(() => {
    loadPrescriptions();
  }, []);

  async function loadPrescriptions() {
    try {
      setLoading(true);
      const res = await api.get("/api/prescriptions");
      setPrescriptions(res.data);
    } catch (err) {
      toast.error("Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload(prescriptionId) {
    try {
      const res = await api.get(`/api/prescriptions/${prescriptionId}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `prescription_${prescriptionId}.pdf`;
      a.click();
      toast.success("Downloaded PDF");
    } catch {
      toast.error("Failed to download");
    }
  }

  function viewPrescription(prescription) {
    setSelectedPrescription(prescription);
  }

  return (
    <div className="container py-4 prescription-page">
      <h2 className="prescription-title mb-4">All Prescriptions</h2>

      {loading ? (
        <p className="text-center">Loading prescriptions...</p>
      ) : (
        <>
          {/* PRESCRIPTIONS LIST */}
          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Diagnosis</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((pres) => (
                  <tr key={pres.id}>
                    <td>{pres.id}</td>
                    <td>{pres.patient?.name}</td>
                    <td>{pres.doctor?.name}</td>
                    <td>{pres.prescriptionDate}</td>
                    <td>{pres.diagnosis}</td>
                    <td>
                      <button 
                        className="btn-fetch me-2"
                        onClick={() => viewPrescription(pres)}
                      >
                        View
                      </button>
                      <button 
                        className="btn-download"
                        onClick={() => handleDownload(pres.id)}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SELECTED PRESCRIPTION DETAILS */}
          {selectedPrescription && (
            <div className="prescription-card mt-4">
              <h4>Prescription Details #{selectedPrescription.id}</h4>
              <p><strong>Doctor:</strong> {selectedPrescription.doctor?.name}</p>
              <p><strong>Patient:</strong> {selectedPrescription.patient?.name}</p>
              <p><strong>Date:</strong> {selectedPrescription.prescriptionDate}</p>
              <p><strong>Diagnosis:</strong> {selectedPrescription.diagnosis}</p>
              <p><strong>Notes:</strong> {selectedPrescription.notes}</p>
              <p><strong>Follow-up:</strong> {selectedPrescription.followUpDate || "—"}</p>

              <h5 className="mt-3">Medicines:</h5>
              {selectedPrescription.medicines?.length > 0 ? (
                <ul className="medicine-list">
                  {selectedPrescription.medicines.map((m) => (
                    <li key={m.id}>
                      {m.name} — {m.dosage} — {m.duration}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No medicines added.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}