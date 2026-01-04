# ClinicHub – Full Stack Multi-Tenant Clinic Management System

This repository contains both the backend API (Spring Boot) and frontend web application (React + Vite) for ClinicHub — a multi-tenant clinic management platform with role-based dashboards, appointment scheduling, billing, prescriptions, and real-time analytics.

## 📂 Project Structure

```bash
/ClinicHub
│── backend/      → Spring Boot Clinic Management System (API)
│── frontend/     → React + Vite Multi-Tenant UI
│── README.md     → (this file)

```
### 🚀 Features Overview

## 1. Multi-Tenant System
- Each clinic has isolated data
- Custom subdomains (`/c/:slug`)
- Independent branding & configuration

## 2. Role-Based Access
- Super Admin
- Admin-Doctor
- Doctor
- Receptionist

## 3. Key Modules
- Appointment scheduling
- Patient management
- Billing & invoicing
- Prescription creation + PDF download
- Doctor schedules
- Real-time analytics dashboards
- JWT authentication with secure access

## 4. 🛠 Tech Stack Overview

### Backend
- Java 17
- Spring Boot 3.2
- Spring Security + JWT
- MySQL 8
- Hibernate / JPA
- iText PDF
- Java Mail

### Frontend
- React + Vite
- React Router
- Context API
- Axios + Interceptors
- Bootstrap + Custom CSS
- Recharts

## 🔧 Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/Sagarr315/ClinicHub-Multi-Tenant-System.git
cd clinic-hub
```
⚙️ Backend Setup (Spring Boot)
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs at:
```bash
http://localhost:8080

```

Backend Details:
```bash
/backend/README.md
```

🎨 Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev

```
Frontend runs at:
```bash
http://localhost:5173
```

Create .env file:
```bash
VITE_API_BASE_URL=http://localhost:8080

```
Frontend Details:
```bash
/frontend/README.md
```
