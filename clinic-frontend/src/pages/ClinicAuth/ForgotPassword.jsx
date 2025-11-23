import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./ForgotPassword.css"

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { slug } = useParams();
  const location = useLocation();

  // Check if user is superadmin page
  const isSuperAdmin = location.pathname.startsWith("/superadmin");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("OTP sent to your email");

      if (isSuperAdmin) {
        navigate(`/superadmin/verify-otp?email=${email}`);
      } else {
        navigate(`/c/${slug}/verify-otp?email=${email}`);
      }
    } catch {
      toast.error("Email not found");
    }
  }

  return (
    <div className="fp-bg">
      <div className="fp-card">
        <h2>Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      </div>
    </div>
  );
}
