# 🏥 Clinic Management System – Backend API  
A comprehensive **multi-tenant Clinic Management System** built with **Spring Boot**, featuring role-based access control, appointment scheduling, billing, prescription management, and real-time analytics.

---

# 1. 📌 Overview  
A production-grade backend powering a multi-clinic ecosystem with isolated tenant data, doctors, receptionists, appointments, billing, and dashboards.

---

# 2. 🚀 Features  

## 2.1 Core Functionality
- **Multi-tenant Architecture** – separate data for each clinic  
- **Role-Based Access Control** – 4 user roles with permissions  
- **Appointment Management** – book, reschedule, cancel with real-time slots  
- **Patient Management** – medical records & history  
- **Billing & Invoicing** – automated bills with tax, discount  
- **Prescription Management** – digital prescription + PDF  
- **Analytics Dashboard** – real-time stats for clinics & doctors  

---

## 2.2 Security & Authentication
- **JWT-based Authentication**  
- **Spring Security (method-level protection)**  
- **Password Reset via Email OTP**  
- **CORS enabled for frontend integration**

---

# 3. 🛠 Tech Stack  

## 3.1 Backend Framework
- Java 17  
- Spring Boot 3.2.4  
- Spring Security  
- Spring Data JPA  
- Spring Mail  

## 3.2 Database & ORM
- MySQL 8.0  
- Hibernate  
- JPA  

## 3.3 Security & Utilities
- JJWT (JWT handling)  
- BCrypt password encryption  
- iText PDF generation  
- Java Mail (Email OTP)  

---

# 4. 📦 Prerequisites
- Java 17+  
- MySQL 8+  
- Maven 3.6+  
- Git  

---

# 5. ⚙️ Installation & Setup  

## 5.1 Clone Repository
```bash
git clone https://github.com/your-username/clinic-management-backend.git
cd clinic-management-backend


5.2 Create Database

CREATE DATABASE clinic_management;

5.3 Configure application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/clinic_management
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

jwt.secret=your_secure_jwt_secret_key_here
jwt.expirationMs=86400000

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password

5.4 Build & Run the Application
mvn clean install
mvn spring-boot:run


App runs at:
➡️ http://localhost:8080

6. 👥 Role-Based Access Control
6.1 User Roles

    ROLE_SUPERADMIN – system-wide access
    ROLE_ADMIN_DOCTOR – clinic & staff management
    ROLE_DOCTOR – appointments & prescriptions
    ROLE_RECEPTIONIST – patient registration & bookings

6.2 Default Super Admin

Email:    superadmin@system.com
Password: Super@123

7. 📘 API Documentation
7.1 Authentication
        
        Method	Endpoint
        
        POST	/api/auth/login
        POST	/auth/forgot-password
        POST	/auth/verify-otp
        POST	/auth/reset-password
7.2 Clinic Management
      
        Method	Endpoint
        
        POST	/api/superadmin/create-clinic
        GET 	/api/clinics/public
        GET	    /api/clinics/subdomain/{subdomain}

7.3 Appointment Management
        
        Method	    Endpoint
        
        GET	    /api/appointments/slots/{doctorId}/{date}
        POST	/api/appointments/book
        GET	    /api/appointments/clinic/{clinicId}
        PUT	    /api/appointments/{id}/status
   
7.4 Patient Management
      
      Method	Endpoint
      
      GET	/api/patients
      GET	/api/patients/search
      GET	/api/patients/{patientId}/history

7.5 Doctor & Staff Management
      
      Method	Endpoint
      
      POST	/api/admin/add-doctor
      POST	/api/admin/add-receptionist
      GET	/api/doctors

7.6 Prescription Management
      
      Method	Endpoint
      
      POST	/api/prescriptions   
      GET	/api/prescriptions/appointment/{appointmentId}
      GET	/api/prescriptions/{id}/download

7.7 Billing & Analytics
      
      Method	Endpoint
      
      GET	/api/bills/clinic/{clinicId}
      PUT	/api/bills/{id}/status
      GET	/api/analytics/summary
      GET	/api/analytics/doctor/{doctorId}


8. 🗄 Database Schema
   8.1 Key Entities
         Clinic
         Doctor
         Receptionist
         Patient
         Appointment
         Prescription
         Bill
         DoctorSchedule

9. ⚙️ Configuration

9.1 Security Configuration
   Stateless JWT authentication
   Role-based endpoint control
   CORS enabled
   BCrypt hashing

9.2 Example JWT Token
{
  "sub": "user@email.com",
  "role": "ROLE_DOCTOR",
  "clinic_id": 123,
  "iat": 1672531200,
  "exp": 1672617600
}

10. 🧪 Testing
mvn test