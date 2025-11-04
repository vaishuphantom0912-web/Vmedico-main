import { createRouter, createWebHistory } from 'vue-router'

// Lazy load pages
const Home = () => import('../pages/Home/Home.vue')
const About = () => import('../pages/About/About.vue')
const Login = () => import('../pages/Login/Login.vue')
const Register = () => import('../pages/Register/Register.vue')
const PatientDashboard = () => import('../pages/Patient/PatientDashboard.vue')
const BookAppointments = () => import('../pages/Patient/BookAppointments.vue')
const BookLabTests = () => import('../pages/Patient/BookLabTests.vue')
const BookingSlots = () => import('../pages/Patient/BookingSlots.vue')
const PatientProfile = () => import('../pages/Patient/PatientProfile.vue')
const LabSelection = () => import('../pages/Patient/LabSelection.vue')

// Lab Dashboard pages
const LabDashboard = () => import('../pages/Lab/LabDashboard.vue')
const TestDashboard = () => import('../pages/Lab/TestDashboard.vue')
const MinimalLabDashboard = () => import('../pages/Lab/MinimalLabDashboard.vue')
const ManageTests = () => import('../pages/Lab/ManageTests.vue')
const ManageSlots = () => import('../pages/Lab/ManageSlots.vue')
const ManageScans = () => import('../pages/Lab/ManageScans.vue')
const ManageReports = () => import('../pages/Lab/ManageReports.vue')
const SimpleProfile = () => import('../pages/Lab/SimpleProfile.vue')
const HospitalLanding = () => import('../pages/Dashboard/HospitalLanding.vue')
const DoctorDashboard = () => import('../pages/Doctor/DoctorDashboard.vue')

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/dashboard', name: 'dashboard', component: HospitalLanding },
  { path: '/about', name: 'about', component: About },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/patient-dashboard', name: 'patient-dashboard', component: PatientDashboard },
  { path: '/patient/book-appointments', name: 'book-appointments', component: BookAppointments },
  { path: '/patient/book-lab-tests', name: 'book-lab-tests', component: BookLabTests },
  { path: '/patient/booking-slots/:doctor?', name: 'booking-slots', component: BookingSlots },
  { path: '/patient/profile', name: 'patient-profile', component: PatientProfile },
  { path: '/patient/lab-selection', name: 'lab-selection', component: LabSelection },
  
  // Lab Dashboard routes
  { path: '/lab-dashboard', name: 'lab-dashboard', component: LabDashboard },
  { path: '/test-dashboard', name: 'test-dashboard', component: TestDashboard },
  { path: '/minimal-lab-dashboard', name: 'minimal-lab-dashboard', component: MinimalLabDashboard },
  { path: '/lab/manage-slots', name: 'lab-manage-slots', component: ManageSlots },
  { path: '/lab/manage-tests', name: 'lab-manage-tests', component: ManageTests },
  { path: '/lab/manage-scans', name: 'lab-manage-scans', component: ManageScans },
  { path: '/lab/manage-reports', name: 'lab-manage-reports', component: ManageReports },
  { path: '/lab/admin-profile', name: 'lab-admin-profile', component: SimpleProfile },
  
  // Doctor Dashboard routes
  { path: '/doctor-dashboard', name: 'doctor-dashboard', component: DoctorDashboard },
  
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router


