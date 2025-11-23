import { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./ForgotPassword.css";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const { slug } = useParams();
  const location = useLocation();

  const email = new URLSearchParams(location.search).get("email");
  const isSuperAdmin = location.pathname.startsWith("/superadmin");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/auth/verify-otp", { email, otp });

      //  CHECK THE RESPONSE CONTENT, not just HTTP status
      if (response.data === "OTP verified") {
        toast.success("OTP Verified");

        if (isSuperAdmin) {
          navigate(`/superadmin/reset-password?email=${email}`);
        } else {
          navigate(`/c/${slug}/reset-password?email=${email}`);
        }
      } else {
        // Handle other successful responses that are not "OTP verified"
        if (response.data === "Invalid OTP") {
          toast.error("Invalid OTP");
        } else if (response.data === "OTP expired") {
          toast.error("OTP expired. Please request a new one.");
        } else {
          toast.error("Verification failed");
        }
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  }
  return (
    <div className="fp-bg">
      <div className="fp-card">
        <h2>Enter OTP</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
}
