import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

// 👍 Add this!
export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  function login(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("clinicId", data.clinicId);

    setUser({
      token: data.token,
      role: data.role,
      clinicId: data.clinicId,
    });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("clinicId");
    setUser(null);
    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({
        token,
        role: localStorage.getItem("role"),
        clinicId: localStorage.getItem("clinicId"),
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
