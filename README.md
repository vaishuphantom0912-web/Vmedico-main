# 🏥 VMedico - Healthcare Management System

A comprehensive healthcare management platform connecting **patients**, **doctors**, and **laboratories** with seamless appointment booking, test management, and medical record handling.

## 🌟 Features

### 👩‍⚕️ For Patients
- User Registration & Authentication — Secure account creation and login  
- Doctor Appointments — Browse and book appointments with healthcare providers  
- Lab Test Booking — Select and schedule laboratory tests  
- Medical Records — Access and manage personal health records  
- Dashboard — Centralized view of appointments, tests, and health data  

### 🧑‍⚕️ For Doctors
- Patient Management — View and manage patient records  
- Appointment Scheduling — Manage availability and appointments  
- Medical Records — Update patient diagnoses and prescriptions  
- Dashboard — Overview of daily schedule and patient interactions  

### 🧪 For Laboratories
- Test Management — Add, edit, and manage available tests  
- Scan Management — Handle medical imaging and scan services  
- Slot Management — Configure available time slots for tests  
- Report Management — Generate and manage test reports  
- Dashboard — Real-time overview of bookings and operations  

### 👨‍💼 For Administrators
- User Management — Oversee all system users  
- System Configuration — Manage platform settings  
- Analytics — Monitor system usage and performance  

## 🛠️ Technology Stack

### Backend
- Java Spring Boot — RESTful API development  
- Spring Security — Authentication and authorization  
- JPA / Hibernate — ORM for database management  
- MySQL — Primary database  
- Maven — Dependency management  

### Frontend
- Vue.js 3 — Progressive web framework  
- Vue Router — Client-side routing  
- Tailwind CSS — Utility-first CSS framework  
- Axios — HTTP client for API calls  

## ⚙️ Getting Started

### Prerequisites
- Java 17 or higher  
- Node.js 16+ and npm  
- MySQL 8.0+  
- Maven 3.6+  

## Backend Setup

1. Clone the Repository  
   git clone <repository-url>  
   cd Vmedico/back-end/vmedico  

2. Configure the Database  
   Create a new MySQL database named vmmedico.  
   Update your application.properties file (located in src/main/resources/) with your database credentials:  

   spring.datasource.url=jdbc:mysql://localhost:3306/vmmedico  
   spring.datasource.username=your_username  
   spring.datasource.password=your_password  
   spring.jpa.hibernate.ddl-auto=update  
   spring.jpa.show-sql=true  

3. Run the Application  
   Use Maven to build and run the Spring Boot application:  
   mvn spring-boot:run  

   Once started successfully, the backend server will run at:  
   👉 http://localhost:8080  

## Frontend Setup

1. Navigate to the Frontend Directory  
   cd Vmedico-Frontend/vmedico  

2. Install Dependencies  
   Install all required npm packages:  
   npm install  

3. Run the Development Server  
   Start the Vue.js frontend:  
   npm run dev  

   The frontend application will run at:  
   👉 http://localhost:5173  


## 🔐 Security
- Authentication and authorization managed with Spring Security + JWT  
- All sensitive endpoints are role-protected for doctors, patients, labs, and admins  

## 📞 Support
For support and questions, please contact the development team or create an issue in the GitHub repository.

## ❤️ VMedico — Connecting Healthcare, Simplifying Lives
