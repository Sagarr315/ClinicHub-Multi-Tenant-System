import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import "./doctor.css";

export default function CreatePrescription() {
  const { slug, appointmentId } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    diagnosis: "",
    notes: "",
    followUpDate: "",
  });

  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
  ]);

  useEffect(() => {
    loadAppointment();
  }, []);

  async function loadAppointment() {
    try {
      setLoading(true);
      const res = await api.get(`/api/appointments/${appointmentId}`);
      setAppointment(res.data);
    } catch {
      toast.error("Failed to load appointment info");
    } finally {
      setLoading(false);
    }
  }

  // -------------------------
  // Handle input
  // -------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // -------------------------
  // Medicines management
  // -------------------------
  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicineRow = () => {
    setMedicines([
      ...medicines,
      { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
    ]);
  };

  const removeMedicineRow = (i) => {
    const updated = medicines.filter((_, idx) => idx !== i);
    setMedicines(updated);
  };

  // -------------------------
  // Submit Prescription
  // -------------------------
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const payload = {
        appointmentId: Number(appointmentId),
        diagnosis: form.diagnosis,
        notes: form.notes,
        followUpDate: form.followUpDate,
        medicines: medicines,
      };

      await api.post("/api/prescriptions", payload);

      toast.success("Prescription created successfully");

      navigate(`/c/${slug}/doctor/my-appointments`);
    } catch (err) {
      toast.error("Failed to create prescription");
    }
  }

  return (
    <div className="container py-4 prescription-form-page">
      <h2 className="doctor-title mb-3">Create Prescription</h2>

      {loading ? (
        <p>Loading appointment info...</p>
      ) : appointment ? (
        <>
          <div className="prescription-appointment-info mb-4">
            <p><strong>Patient:</strong> {appointment.patient?.name}</p>
            <p><strong>Doctor:</strong> {appointment.doctor?.name}</p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(appointment.appointmentDate).toLocaleString()}
            </p>
          </div>

          {/* FORM */}
          <form className="prescription-form" onSubmit={handleSubmit}>
            
            <label className="form-label">Diagnosis</label>
            <textarea
              name="diagnosis"
              className="form-control"
              value={form.diagnosis}
              onChange={handleChange}
              required
            />

            <label className="form-label mt-3">Notes</label>
            <textarea
              name="notes"
              className="form-control"
              value={form.notes}
              onChange={handleChange}
            />

            <label className="form-label mt-3">Follow-up Date</label>
            <input
              type="date"
              name="followUpDate"
              className="form-control"
              value={form.followUpDate}
              onChange={handleChange}
            />

            {/* MEDICINES */}
            <h4 className="mt-4 mb-2">Medicines</h4>

            {medicines.map((m, i) => (
              <div className="medicine-row" key={i}>
                <input
                  type="text"
                  placeholder="Name"
                  value={m.name}
                  onChange={(e) =>
                    handleMedicineChange(i, "name", e.target.value)
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Dosage"
                  value={m.dosage}
                  onChange={(e) =>
                    handleMedicineChange(i, "dosage", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Frequency"
                  value={m.frequency}
                  onChange={(e) =>
                    handleMedicineChange(i, "frequency", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={m.duration}
                  onChange={(e) =>
                    handleMedicineChange(i, "duration", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Instructions"
                  value={m.instructions}
                  onChange={(e) =>
                    handleMedicineChange(i, "instructions", e.target.value)
                  }
                />

                {i > 0 && (
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeMedicineRow(i)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="btn-add-row mt-2"
              onClick={addMedicineRow}
            >
              + Add Medicine
            </button>

            <button type="submit" className="btn-submit-doctor mt-4">
              Save Prescription
            </button>
          </form>
        </>
      ) : (
        <p>Update the status of the patients first as Mark Completed.</p>
      )}
    </div>
  );
}
