import { Routes, Route } from "react-router-dom";

// Marketing Pages
import Home from "./pages/Marketing/Home";
import Clinics from "./pages/Marketing/Clinics";
import About from "./pages/Marketing/About";
import Contact from "./pages/Marketing/Contact";

// Clinic Pages
import ClinicLayout from "./layouts/ClinicLayout";
import ClinicLanding from "./pages/PublicClinic/ClinicLanding";
import ClinicLogin from "./pages/ClinicAuth/ClinicLogin";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddDoctor from "./pages/admin/AddDoctor";
import AddReceptionist from "./pages/admin/AddReceptionist";
import BillingPage from "./pages/admin/BillingPage";
import Analytics from "./pages/admin/Analytics";
import ClinicSettings from "./pages/admin/ClinicSettings";
import AdminDoctorSchedule from "./pages/admin/AdminDoctorSchedule";
import PrescriptionView from "./pages/admin/PrescriptionView";

//Doctor pages

import MyAppointments from "./pages/doctor/MyAppointments";
import CreatePrescription from "./pages/doctor/CreatePrescription";
import ViewPrescription from "./pages/doctor/ViewPrescription";
import DoctorSchedule from "./pages/doctor/DoctorSchedule";
import DoctorAnalytics from "./pages/doctor/DoctorAnalytics";

//
import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";

import ReceptionistBilling from "./pages/receptionist/ReceptionistBilling";
import PatientSearch from "./pages/receptionist/PatientSearch";
import BookAppointment from "./pages/receptionist/BookAppointment";

// Super Admin Pages
import SuperAdminLogin from "./pages/Marketing/SuperAdminLogin";
import SADashboard from "./pages/SuperAdmin/SADashboard";
import CreateClinic from "./pages/SuperAdmin/CreateClinic";
import ViewClinics from "./pages/SuperAdmin/ViewClinics";
import ManageAppointments from "./pages/receptionist/ManageAppointments";

export default function AppRoutes() {
  return (
    <Routes>
      {/* MARKETING WEBSITE */}
      <Route path="/" element={<Home />} />
      <Route path="/clinics" element={<Clinics />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* SUPERADMIN */}
      <Route path="/superadmin/login" element={<SuperAdminLogin />} />
      <Route path="/superadmin/dashboard" element={<SADashboard />} />
      <Route path="/superadmin/createclinic" element={<CreateClinic />} />
      <Route path="/superadmin/clinics" element={<ViewClinics />} />

      {/* CLINIC SOFTWARE AREA */}
      <Route path="/c/:slug" element={<ClinicLayout />}>
        {/* Public Pages */}
        <Route index element={<ClinicLanding />} />

        <Route path="cliniclogin" element={<ClinicLogin />} />

        {/* ADMIN PAGES */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="add-doctor" element={<AddDoctor />} />
        <Route path="add-receptionist" element={<AddReceptionist />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="clinic-settings" element={<ClinicSettings />} />
        <Route path="doctor-schedule" element={<AdminDoctorSchedule />} />
        <Route path="prescriptions" element={<PrescriptionView />} />

        {/* DOCTOR ROUTES */}

        <Route path="doctor/my-appointments" element={<MyAppointments />} />
        <Route
          path="doctor/create-prescription/:appointmentId"
          element={<CreatePrescription />}
        />
        <Route
          path="doctor/view-prescription/:appointmentId"
          element={<ViewPrescription />}
        />
        <Route path="doctor/schedule" element={<DoctorSchedule />} />
        <Route path="doctor/analytics" element={<DoctorAnalytics />} />

        {/* receptionist RECEPTIONIST ROUTES */}
        <Route
          path="receptionist/dashboard"
          element={<ReceptionistDashboard />}
        />
        <Route
          path="receptionist/appointments"
          element={<ManageAppointments />}
        />

        <Route path="receptionist/billing" element={<ReceptionistBilling />} />
        <Route path="receptionist/patients" element={<PatientSearch />} />
        <Route path="receptionist/book" element={<BookAppointment />} />
        <Route
          path="receptionist/prescriptions"
          element={<PrescriptionView />}
        />
      </Route>
    </Routes>
  );
}
