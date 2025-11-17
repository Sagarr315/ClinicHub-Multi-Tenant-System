import "./App.css";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideMarketingLayout = location.pathname.startsWith("/c/");

  return (
    <AuthProvider>
      <div className="app-wrapper">

        {!hideMarketingLayout && <Header />}

        <div className="app-content">
          <AppRoutes />
        </div>

        {!hideMarketingLayout && <Footer />}

      </div>
    </AuthProvider>
  );
}

export default App;
