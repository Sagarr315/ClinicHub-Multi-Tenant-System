import { Routes, Route } from "react-router-dom";

// MAIN / OFFICIAL Website pages (marketing site)
import Home from "./pages/Marketing/Home";
import Clinics from "./pages/Marketing/Clinics";
import About from "./pages/Marketing/About";
import Contact from "./pages/Marketing/Contact";

// CLINIC Portal pages
import ClinicLanding from "./pages/PublicClinic/ClinicLanding";
import BookAppointment from "./pages/PublicClinic/BookAppointment";

// SUPER-ADMIN pages
import SuperAdminLogin from "./pages/Marketing/SuperAdminLogin";
import SADashboard from "./pages/SuperAdmin/SADashboard";
import CreateClinic from "./pages/SuperAdmin/CreateClinic";
import ViewClinics from "./pages/SuperAdmin/ViewClinics";

function AppRoutes() {
  return (
    <Routes>
      {/* MARKETING WEBSITE */}
      <Route path="/" element={<Home />} />
      <Route path="/clinics" element={<Clinics />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* SUPERADMIN PAGES */}
      <Route path="/superadmin/createclinic" element={<CreateClinic />} />
      <Route path="/superadmin/clinics" element={<ViewClinics />} />

      <Route path="/superadmin/login" element={<SuperAdminLogin />} />
      <Route path="/superadmin/dashboard" element={<SADashboard />} />

      {/* PUBLIC CLINIC PAGES */}
      <Route path="/c/:slug" element={<ClinicLanding />} />
      <Route path="/c/:slug/book" element={<BookAppointment />} />

      {/* FALLBACK */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
