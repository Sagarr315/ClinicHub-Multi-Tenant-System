import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  FaUserMd,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import ElectricBorder from "../../Animation/ElectricBorder.jsx";
import "./ClinicLogin.css";

export default function ClinicLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { slug } = useParams();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", { email, password });

      const { role, clinicSubdomain } = res.data;

      const allowed = ["ROLE_ADMIN_DOCTOR", "ROLE_DOCTOR", "ROLE_RECEPTIONIST"];
      if (!allowed.includes(role)) {
        toast.error("This login is only for clinic staff");
        return;
      }

      // Save token + role + clinic info
      login(res.data);

      toast.success("Welcome");

      // If user belongs to another clinic, redirect to THEIR clinic
      if (clinicSubdomain !== slug) {
        navigate(`/c/${clinicSubdomain}`);
        return;
      }

      // Otherwise go inside current clinic
      navigate(`/c/${slug}`);
    } catch (err) {
      toast.error("Invalid email or password");
    }
  }

  return (
    <div className="cliniclogin-bg container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <ElectricBorder
        color="#7df9ff"
        speed={1}
        chaos={0.6}
        thickness={2}
        style={{ borderRadius: 16 }}
      >
        <div className="cliniclogin-card card p-4 text-white">
          <div className="text-center ">
            <FaUserMd size={50} className="text-info " />
            <h2 className="fw-bold">Clinic Staff Login</h2>
            <p className="cliniclogin-role-note">
              Admin • Doctor • Receptionist
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text icon-box">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  className="form-control dark-input"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text icon-box">
                  <FaLock />
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control dark-input"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <span
                  className="input-group-text icon-box toggle-pass"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-info w-100 fw-bold login-hover"
            >
              Login
            </button>
          </form>
        </div>
      </ElectricBorder>
    </div>
  );
}
