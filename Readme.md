1.ClinicHub – Full Stack Multi-Tenant Clinic Management System

This repository contains both the backend API (Spring Boot) and frontend web application (React + Vite) for ClinicHub — a multi-tenant clinic management platform with role-based dashboards, appointment scheduling, billing, prescriptions, and real-time analytics.

2.📂 Project Structure
/ClinicHub
│── backend/      → Spring Boot Clinic Management System (API)
│── frontend/     → React + Vite Multi-Tenant UI
│── README.md     → (this file)


Each folder includes its own detailed README.

🚀 Features Overview
1.Multi-Tenant System
    Each clinic has isolated data
    Custom subdomains (/c/:slug)
    Independent branding & configuration
2.Role-Based Access
    Super Admin
    Admin-Doctor
    Doctor
    Receptionist
3.Key Modules
    Appointment scheduling
    Patient management
    Billing & invoicing
    Prescription creation + PDF download
    Doctor schedules
    Real-time analytics dashboards

JWT authentication with secure access
🛠 Tech Stack Overview
 1.Backend
    Java 17
    Spring Boot 3.2
    Spring Security + JWT
    MySQL 8
    Hibernate/JPA
    iText PDF
    Java Mail
 2.Frontend
    React + Vite
    React Router
    Context API
    Axios + Interceptors
    Bootstrap + Custom CSS
    Recharts

🔧 Setup Instructions
1. Clone the Repository
    git clone https://github.com/Sagarr315/ClinicHub-Multi-Tenant-System.git
    cd clinic-hub

⚙️ Backend Setup (Spring Boot)
    Inside /backend:
       cd backend

Install dependencies and run
      mvn clean install
      mvn spring-boot:run


Backend runs at:
      http://localhost:8080

Backend Details:
       See full docs → /backend/README.md

🎨 Frontend Setup (React + Vite)
Inside /frontend:
        1.cd frontend
        2.npm install
        3.npm run dev


Frontend runs at:
        http://localhost:5173

Configure API
    Create .env:
    VITE_API_BASE_URL=http://localhost:8080

Frontend Details:
    See full docs → /frontend/README.md

🧪 Testing
    Backend:
        mvn test

    Frontend:
        npm run dev