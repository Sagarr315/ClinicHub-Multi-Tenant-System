import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import "./patient-search.css";

export default function PatientSearch() {
  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientHistory, setPatientHistory] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length >= 2) {
      searchPatients();
    } else {
      setPatients([]);
    }
  }, [query]);

  async function searchPatients() {
    try {
      setLoading(true);
      const res = await api.get(`/api/patients/search?query=${query}`);
      setPatients(res.data);
    } catch {
      toast.error("Failed to search patients");
    } finally {
      setLoading(false);
    }
  }

  async function viewPatientHistory(patientId) {
    try {
      setHistoryLoading(true);
      const res = await api.get(`/api/patients/${patientId}/history`);
      setPatientHistory(res.data);
      setSelectedPatient(patientId);
    } catch {
      toast.error("Failed to load patient history");
    } finally {
      setHistoryLoading(false);
    }
  }

  function closeHistory() {
    setPatientHistory(null);
    setSelectedPatient(null);
  }

  function formatDate(dateTimeString) {
    return new Date(dateTimeString).toLocaleString();
  }

  return (
    <div className="container py-4 patient-search-page">
      <h2 className="ps-title mb-3">Search Patients</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control ps-input"
          placeholder="Search by name or contact number..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center">Searching...</p>
      ) : (
        <div className="table-responsive ps-table">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td className="text-center" colSpan="5">
                    {query.trim().length >= 2 ? "No patients found" : "Enter at least 2 characters to search"}
                  </td>
                </tr>
              ) : (
                patients.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.contact}</td>
                    <td>{p.age || "-"}</td>
                    <td>{p.gender || "-"}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-info"
                        onClick={() => viewPatientHistory(p.id)}
                        disabled={historyLoading && selectedPatient === p.id}
                      >
                        {historyLoading && selectedPatient === p.id ? "Loading..." : "View History"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* PATIENT HISTORY MODAL */}
      {patientHistory && (
        <div className="ps-modal-overlay">
          <div className="ps-modal" style={{maxWidth: '800px'}}>
            <h4>Patient History - {patientHistory.patient?.name}</h4>
            
            {historyLoading ? (
              <p>Loading history...</p>
            ) : (
              <div>
                {/* Basic Patient Info */}
                <div className="patient-info mb-4">
                  <h5>Patient Details</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Name:</strong> {patientHistory.patient?.name}</p>
                      <p><strong>Contact:</strong> {patientHistory.patient?.contact}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Age:</strong> {patientHistory.patient?.age || "-"}</p>
                      <p><strong>Gender:</strong> {patientHistory.patient?.gender || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Appointment History */}
                <div className="appointment-history">
                  <h5>Appointment History</h5>
                  {patientHistory.appointments && patientHistory.appointments.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-sm table-bordered">
                        <thead className="table-secondary">
                          <tr>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th>Doctor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {patientHistory.appointments.map((appointment, index) => (
                            <tr key={index}>
                              <td>{formatDate(appointment[0])}</td>
                              <td>
                                <span className={`badge ${
                                  appointment[1] === 'COMPLETED' ? 'bg-success' :
                                  appointment[1] === 'CONFIRMED' ? 'bg-primary' :
                                  appointment[1] === 'BOOKED' ? 'bg-warning' : 'bg-danger'
                                }`}>
                                  {appointment[1]}
                                </span>
                              </td>
                              <td>{appointment[2]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-muted">No appointment history found</p>
                  )}
                </div>
              </div>
            )}

            <div className="mt-4 d-flex justify-content-end">
              <button className="btn btn-secondary" onClick={closeHistory}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}