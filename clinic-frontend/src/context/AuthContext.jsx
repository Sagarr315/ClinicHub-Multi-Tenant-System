import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

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
    localStorage.setItem("userId", data.id);
    localStorage.setItem("clinicSubdomain", data.clinicSubdomain);

    setUser({
      token: data.token,
      role: data.role,
      clinicId: data.clinicId,
      id: data.id,
      clinicSubdomain: data.clinicSubdomain,
    });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("clinicId");
    localStorage.removeItem("userId");
    localStorage.removeItem("clinicSubdomain");

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
        id: localStorage.getItem("userId"),
        clinicSubdomain: localStorage.getItem("clinicSubdomain"),
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
