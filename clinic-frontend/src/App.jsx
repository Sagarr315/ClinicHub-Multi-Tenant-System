// src/App.jsx
import "./App.css";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  // Hide marketing header/footer for clinic portal
  const isClinicPath = location.pathname.startsWith("/c/");

  return (
    <AuthProvider>
      <div className="app-wrapper">

        {/* Marketing header only for marketing site */}
        {!isClinicPath && <Header />}

        <div className="app-content">
          <AppRoutes />
        </div>

        {/* Marketing footer only for marketing site */}
        {!isClinicPath && <Footer />}

      </div>
    </AuthProvider>
  );
}

export default App;
