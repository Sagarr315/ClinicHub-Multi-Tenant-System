# ClinicHub Frontend
React + Vite Multi-Tenant Clinic Management System (Frontend Only)

---

## 1. Overview
- This repository contains the frontend of ClinicHub
- Each clinic has its own subdomain and branding
- Role-based dashboards for:
  - Admin-Doctor
  - Doctor
  - Receptionist

---

## 2. Features

### 2.1 Multi-Tenant System
- Dynamic subdomain routing (`/c/:slug`)
- Each clinic loads its own name, address, and branding
- Cross-clinic access is blocked

### 2.2 Doctor Module
- My Appointments
- Mark Appointment Completed
- Create Prescription
- View Prescription
- My Schedule
- Doctor Analytics

### 2.3 Receptionist Module
- Book Appointment
- Manage Appointments (Confirm, Cancel)
- View Bills
- Update Bill Status
- Patient Search
- Access Doctor Schedules

### 2.4 Admin-Doctor Module
- Dashboard
- Clinic Analytics
- Appointment, Patient, Revenue Overview

### 2.5 General
- JWT authentication
- Role-based routing
- Responsive UI
- Centralized API service
- Notifications with `react-hot-toast`

---

## 3. Tech Stack
- React
- Vite
- React Router
- Context API
- Axios
- Bootstrap
- Custom CSS
- Recharts

---

## 4. Project Structure

```bash
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
```
5. Installation
5.1 Install Dependencies
```bash
npm install
```
5.2 Create .env File
```bash
VITE_API_BASE_URL=http://localhost:8080
```
5.3 Start Development Server
```bash
npm run dev
```
## 6. Authentication
- Login URL: `/c/:slug/cliniclogin`
- Token stored in `localStorage`
- AuthContext manages:
  - token
  - role
  - clinicId
  - userId
  - clinicSubdomain
- Axios interceptors automatically attach token

---

## 7. API Integration
- All API code located in: `src/services/api.js`
- Includes:
  - Base URL configuration
  - Token injection
  - Error handling

---

## 8. Theme and Colors
- Primary Cyan: `#6AB9FF`
- Neon Blue: `#4A9EFF`
- Background Dark: `#0f0f0f`
- Success: `#22c55e`
- Error: `#ef4444`

---

## 9. Role-Based Routing
- Handled in `AppRoutes.jsx`
- Redirect rules:
  - Admin-Doctor → Admin dashboard
  - Doctor → Doctor dashboard
  - Receptionist → Receptionist dashboard
  - Unauthorized role → Redirect to login

---

## 10. Build for Production
- Build command:
```bash
npm run build
```
## 11. Notes
- Only clinic staff can log in
- Public users can only access clinic landing page
- Clinic switching is protected by subdomain validation