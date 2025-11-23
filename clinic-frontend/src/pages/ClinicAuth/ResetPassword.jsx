import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import "./ForgotPassword.css"
export default function ResetPassword() {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { slug } = useParams();
  const location = useLocation();

  const email = new URLSearchParams(location.search).get("email");
  const isSuperAdmin = location.pathname.startsWith("/superadmin");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/auth/reset-password", { email, newPassword: password });
      toast.success("Password reset successfully");

      if (isSuperAdmin) {
        navigate("/superadmin/login");
      } else {
        navigate(`/c/${slug}/cliniclogin`);
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="fp-bg">
      <div className="fp-card">
        <h2>Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
}
