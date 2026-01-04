1. ClinicHub Frontend
   React + Vite Multi-Tenant Clinic Management System (Frontend Only)

2. Overview
   2.1 This repository contains the frontend of ClinicHub.
   2.2 Each clinic has its own subdomain and branding.
   2.3 Role-based dashboards for Admin-Doctor, Doctor, and Receptionist.

3. Features
   3.1 Multi-Tenant System
   3.2 Dynamic subdomain routing (/c/:slug)
   3.3 Each clinic loads its own name, address, and branding
   3.4 Cross-clinic access is blocked

3.2 Doctor Module
    3.1 My Appointments
    3.2 Mark Appointment Completed
    3.3 Create Prescription
    3.4 View Prescription   
    3.5 My Schedule
    3.6 Doctor Analytics

3.3 Receptionist Module
    3.1 Book Appointment
    3.2 Manage Appointments (Confirm, Cancel)
    3.3 View Bills
    3.4 Update Bill Status
    3.5 Patient Search
    3.6 Access Doctor Schedules

3.4 Admin-Doctor Module
    3.1 Dashboard
    3.2 Clinic Analytics
    3.3 Appointment, Patient, Revenue Overview

3.5 General
    3.1 JWT authentication
    3.2 Role-based routing
    3.3 Responsive UI
    3.4 Centralized API service
    3.5 Notifications with react-hot-toast

4. Tech Stack
   4.1 React
   4.2 Vite
   4.3 React Router
   4.4 Context API
   4.5 Axios
   4.6 Bootstrap
   4.7 Custom CSS
   4.8 Recharts

5. Project Structure

  clinic-frontend/
│── src/
│   ├── components/
│   │   ├── ClinicHeader/
│   │   ├── ClinicFooter/
│   ├── pages/
│   │   ├── admin/
│   │   ├── doctor/
│   │   ├── receptionist/
│   │   ├── public/
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── layouts/
│   │   └── ClinicLayout.jsx
│   ├── AppRoutes.jsx
│   ├── App.jsx
│── index.html
│── package.json
│── vite.config.js


6. Installation
   6.1 Install dependencies:
        npm install
   6.2 Create .env file:
        VITE_API_BASE_URL=http://localhost:8080
   6.3 Start development server:
        npm run dev

7. Authentication
   7.1 Login at /c/:slug/cliniclogin
   7.2 Token stored in localStorage
   7.3 AuthContext manages:
            7.1 token
            7.2 role
            7.3 clinicId
            7.4 userId
            7.5 clinicSubdomain
   7.4 Axios interceptors auto-attach token

8. API Integration
   8.1 All API code in: src/services/api.js
   8.2 Includes:
        8.1 Base URL
        8.2 Token injection
        8.3 Error handling

9. Theme and Colors
   9.1 Primary Cyan: #6AB9FF
   9.2 Neon Blue: #4A9EFF
   9.3 Background Dark: #0f0f0f
   9.4 Success: #22c55e
   9.5 Error: #ef4444

10. Role-Based Routing
    10.1 Handled in AppRoutes.jsx
    10.2 Redirect rules:
            10.1 Admin-Doctor → Admin dashboard
            10.2 Doctor → Doctor dashboard
            10.3 Receptionist → Receptionist dashboard
            10.4 Unauthorized role → Redirect to login

11. Build for Production
             npm run build

12. Notes
    12.1 Only clinic staff can log in
    12.2 Public users can only access clinic landing page
    12.3 Clinic switching is protected by subdomain validation
