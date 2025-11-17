import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import ElectricBorder from "../../Animation/ElectricBorder.jsx";
import "./SuperAdminLogin.css";

export default function SuperAdminLogin() {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { email, password });

      const { role } = res.data;

      if (role !== "ROLE_SUPERADMIN") {
        toast.error(
          "You cannot login here. Please login using your clinic portal."
        );
        return;
      }

      login(res.data); // ✔ FIXED
      toast.success("Welcome SuperAdmin!");
      navigate("/superadmin/dashboard");
    } catch (err) {
      toast.error("Invalid email or password");
    }
  }

  return (
    <div className="superadmin-bg container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <ElectricBorder
        color="#7df9ff"
        speed={1}
        chaos={0.6}
        thickness={2}
        style={{ borderRadius: 16, padding: 0 }}
      >
        <div className="superadmin-card card p-4 text-white">
          <div className="text-center mb-4">
            <FaUserShield size={55} className="text-info mb-2" />
            <h2 className="fw-bold">SuperAdmin Login</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-dark text-light border-secondary">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="SuperAdmin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="form-label">Password</label>

              <div className="input-group">
                <span className="input-group-text bg-dark text-light border-secondary">
                  <FaLock />
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="SuperAdmin Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <span
                  className="input-group-text bg-dark border-secondary password-toggle"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-info w-100 fw-bold electric-hover"
            >
              Login
            </button>
          </form>
        </div>
      </ElectricBorder>
    </div>
  );
}
