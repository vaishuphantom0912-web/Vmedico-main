<template>
  <div class="min-h-screen bg-gray-50 relative overflow-hidden">
    <!-- Animated Medical Icons Background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <span class="material-symbols-rounded absolute text-blue-200 opacity-10 animate-float" style="font-size: 70px; top: 10%; left: 85%; animation-delay: 0s;">local_hospital</span>
      <span class="material-symbols-rounded absolute text-blue-300 opacity: 0.08; animate-float-reverse" style="font-size: 55px; top: 20%; left: 90%; animation-delay: 1s;">emergency</span>
      <span class="material-symbols-rounded absolute text-blue-200 opacity-10 animate-float" style="font-size: 65px; top: 35%; left: 92%; animation-delay: 2s;">monitoring</span>
      <span class="material-symbols-rounded absolute text-blue-300 opacity: 0.08; animate-float-reverse" style="font-size: 60px; top: 45%; left: 88%; animation-delay: 0.5s;">vaccines</span>
      <span class="material-symbols-rounded absolute text-blue-200 opacity-10 animate-float" style="font-size: 50px; bottom: 30%; left: 93%; animation-delay: 1.5s;">health_and_safety</span>
      <span class="material-symbols-rounded absolute text-blue-300 opacity: 0.08; animate-float-reverse" style="font-size: 75px; bottom: 20%; left: 87%; animation-delay: 2.5s;">medication</span>
    </div>
    <!-- Hospital Dashboard Container -->
    <div class="flex relative z-10">
      <!-- Sidebar Navigation -->
      <HospitalSidebar 
        :active-section="activeSection"
        @navigate="handleNavigation"
        @logout="handleLogout"
        @sidebar-toggle="handleSidebarToggle"
      />
      
      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col">
        <!-- Header -->
        <HospitalHeader 
          :hospital-info="hospitalInfo"
          :current-user="currentUser"
          @logout="handleLogout"
          @search="handleSearch"
          @search-select="handleSearchSelect"
          @unauthorized-access="handleUnauthorizedAccess"
        />
        
        <!-- Dashboard Content -->
        <main class="flex-1 p-6 page-enter">
          <!-- Show Dashboard View -->
          <div v-if="activeSection === 'dashboard'">
            <!-- Dashboard Metrics -->
            <HospitalDashboardMetrics 
              :metrics="dashboardMetrics"
              @quick-action="handleQuickAction"
            />
            
            <!-- Tables Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 animate-fade-up" style="animation-delay: 0.2s;">
              <!-- Upcoming Appointments -->
              <UpcomingAppointmentsTable 
                :appointments="upcomingAppointments"
                :refresh-interval="30000"
                @refresh="refreshAppointments"
                @view-details="handleViewAppointmentDetails"
              />
              
              <!-- Recent Admissions -->
              <RecentAdmissionsTable 
                :admissions="recentAdmissions"
                @view-all="navigateToPatients"
                @view-details="handleViewAdmissionDetails"
              />
            </div>
          </div>
          
          <!-- Show Tab Content for other sections -->
          <div v-else class="tab-content">
            <div v-if="activeSection === 'patients'" class="h-full">
              <PatientsTab :patients.sync="patients" :is-dark-mode="false"/>
            </div>
            <div v-if="activeSection === 'staff'" class="h-full">
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Staff Management</h2>
                <StaffTab :staff.sync="staff" :is-dark-mode="false"/>
              </div>
            </div>
            <div v-if="activeSection === 'reports'" class="h-full">
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h2>
                <ReportsTab :reports.sync="reports" :patients="patients" :is-dark-mode="false"/>
              </div>
            </div>
            <div v-if="activeSection === 'lab'" class="h-full">
              <LabTab :is-dark-mode="false"/>
            </div>
            <div v-if="activeSection === 'profile'" class="h-full">
              <ProfileTab :hospital.sync="hospital" :is-dark-mode="false"/>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Settings Modal -->
    <div v-if="showSettings" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate__animated animate__fadeIn">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 animate__animated animate__zoomIn">
        <div class="p-6 border-b">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Settings</h3>
            <button @click="showSettings = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between">
            <span>Dark Mode</span>
            <button @click="toggleDarkMode" :class="isDarkMode ? 'bg-blue-600' : 'bg-gray-300'" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200">
              <span :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'" class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"></span>
            </button>
          </div>
          <div class="flex items-center justify-between">
            <span>Auto-refresh</span>
            <button @click="toggleAutoRefresh" :class="autoRefresh ? 'bg-blue-600' : 'bg-gray-300'" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200">
              <span :class="autoRefresh ? 'translate-x-6' : 'translate-x-1'" class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"></span>
            </button>
          </div>
          <div class="flex items-center justify-between">
            <span>Notifications</span>
            <button @click="toggleNotifications" :class="notificationsEnabled ? 'bg-blue-600' : 'bg-gray-300'" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200">
              <span :class="notificationsEnabled ? 'translate-x-6' : 'translate-x-1'" class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"></span>
            </button>
          </div>
        </div>
        <div class="p-6 border-t flex justify-end gap-3">
          <button @click="showSettings = false" class="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            Cancel
          </button>
          <button @click="saveSettings" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- Notification Panel -->
    <div v-if="showNotifications" class="fixed top-20 right-4 w-80 bg-white rounded-xl shadow-lg border z-50 animate__animated animate__fadeInDown">
      <div class="p-4 border-b">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">Hospital Notifications</h3>
          <button @click="showNotifications = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="max-h-96 overflow-y-auto">
        <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500">
          No notifications
        </div>
        <div v-for="notification in notifications" :key="notification.id" class="p-4 border-b hover:bg-gray-50">
          <div class="flex items-start gap-3">
            <div :class="notification.type === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'" class="w-2 h-2 rounded-full mt-2"></div>
            <div class="flex-1">
              <p class="text-sm font-medium">{{ notification.title }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ notification.message }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ formatTime(notification.timestamp) }}</p>
            </div>
            <button @click="clearNotification(notification.id)" class="text-gray-400 hover:text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import HospitalHeader from '../../components/Hospital/HospitalHeader.vue'
import HospitalSidebar from '../../components/Hospital/HospitalSidebar.vue'
import HospitalDashboardMetrics from '../../components/Hospital/HospitalDashboardMetrics.vue'
import UpcomingAppointmentsTable from '../../components/Hospital/UpcomingAppointmentsTable.vue'
import RecentAdmissionsTable from '../../components/Hospital/RecentAdmissionsTable.vue'
import OverviewTab from '../../components/Dashboard/OverviewTab.vue'
import PatientsTab from '../../components/Dashboard/PatientsTab.vue'
import StaffTab from '../../components/Dashboard/StaffTab.vue'
import ReportsTab from '../../components/Dashboard/ReportsTab.vue'
import LabTab from '../../components/Dashboard/LabTab.vue'
import ProfileTab from '../../components/Dashboard/ProfileTab.vue'

// Icon components
const OverviewIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
  </svg>`
}

const PatientsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
  </svg>`
}

const StaffIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
  </svg>`
}

const ReportsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
  </svg>`
}

const LabIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
  </svg>`
}

const ProfileIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
  </svg>`
}

export default {
  name: 'HospitalLanding',
  components: {
    HospitalHeader,
    HospitalSidebar,
    HospitalDashboardMetrics,
    UpcomingAppointmentsTable,
    RecentAdmissionsTable,
    OverviewTab, 
    PatientsTab, 
    StaffTab, 
    ReportsTab, 
    LabTab,
    ProfileTab,
    OverviewIcon,
    PatientsIcon,
    StaffIcon,
    ReportsIcon,
    LabIcon,
    ProfileIcon
  },
  props: {
    isDarkMode: { type: Boolean, default: false },
    notifications: { type: Array, default: () => [] }
  },
  data() {
    return {
      activeSection: 'dashboard',
      activeTab: 'overview',
      refreshInterval: null,
      showSettings: false,
      showNotifications: false,
      autoRefresh: false,
      notificationsEnabled: true,
      
      // Hospital Information - will be populated from user session
      hospitalInfo: {
        name: 'Central Medical Center',
        hospitalId: 'HSP-001',
        license: 'LIC-1234',
        address: '123 Health St, Cityville',
        phone: '+91 98765 43210',
        email: 'info@centralmed.com'
      },
      
      // Current User - will be populated from user session
      currentUser: {
        name: 'Hospital Administrator',
        role: 'Hospital Administrator',
        email: 'admin@centralmed.com',
        lastLogin: new Date()
      },
      
      // Dashboard Metrics
      dashboardMetrics: {
        todayAdmissions: {
          count: 12,
          admitted: 8,
          discharged: 4
        },
        icuOccupancy: {
          percentage: 88,
          occupied: 26,
          total: 30
        },
        erVisits: {
          count: 45,
          treated: 42
        },
        staffOnDuty: {
          count: 156,
          doctors: 45,
          nurses: 111
        }
      },
      
      // Data arrays
      upcomingAppointments: [],
      recentAdmissions: [],
      notifications: [
        {
          id: 1,
          title: 'ICU Alert',
          message: 'ICU at 88% capacity — consider discharge planning',
          type: 'urgent',
          timestamp: new Date(Date.now() - 15 * 60 * 1000)
        },
        {
          id: 2,
          title: 'Maintenance Scheduled',
          message: 'MRI #2 scheduled for maintenance at 3:00 PM',
          type: 'info',
          timestamp: new Date(Date.now() - 30 * 60 * 1000)
        },
        {
          id: 3,
          title: 'New Patient Admitted',
          message: 'Patient P-1004 admitted to Cardiology ward',
          type: 'info',
          timestamp: new Date(Date.now() - 45 * 60 * 1000)
        }
      ],
      tabs: [
        { key: 'overview', label: 'Overview', icon: 'OverviewIcon', badge: null },
        { key: 'patients', label: 'Patients', icon: 'PatientsIcon', badge: 3 },
        { key: 'staff', label: 'Staff', icon: 'StaffIcon', badge: null },
        { key: 'reports', label: 'Reports', icon: 'ReportsIcon', badge: 2 },
        { key: 'lab', label: 'Lab Management', icon: 'LabIcon', badge: null },
        { key: 'profile', label: 'Hospital Profile', icon: 'ProfileIcon', badge: null },
      ],
      // mock hospital info
      hospital: {
        name: 'Central Medical Center',
        address: '123 Health St, Cityville',
        phone: '+91 98765 43210',
        email: 'info@centralmed.com',
        totalBeds: 320,
        icuBeds: 30,
        occupancyRate: 82,
        services: ['Emergency', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics']
      },
      // mock patients
      patients: [
        { id: 'P-1001', name: 'Ramesh Kumar', age: 54, gender: 'Male', ward: 'Cardiology', doctor: 'Dr. Alice', admissionDate: '2025-09-06', status: 'Admitted', notes:'High BP', labIds: ['L-9001']},
        { id: 'P-1002', name: 'Priya Singh', age: 29, gender: 'Female', ward: 'Pediatrics', doctor: 'Dr. Rahul', admissionDate: '2025-09-09', status: 'Under Observation', notes:'Fever'},
        { id: 'P-1003', name: 'Suresh Patel', age: 67, gender: 'Male', ward: 'ICU', doctor: 'Dr. Anita', admissionDate: '2025-09-04', status: 'Critical', notes:'Post-op'},
        { id: 'P-1004', name: 'Anita Sharma', age: 45, gender: 'Female', ward: 'Orthopedics', doctor: 'Dr. Raj', admissionDate: '2025-09-08', status: 'Admitted', notes:'Fracture'},
        { id: 'P-1005', name: 'Vikram Singh', age: 38, gender: 'Male', ward: 'Emergency', doctor: 'Dr. Meera', admissionDate: '2025-09-10', status: 'Under Observation', notes:'Accident'},
      ],
      // mock staff
      staff: [
        { id: 'S-001', name: 'Dr. Alice', role: 'Cardiologist', contact: '+91 91234 56789', shift: 'Morning', status: 'Active' },
        { id: 'S-002', name: 'Dr. Anita', role: 'ICU Consultant', contact: '+91 99876 54321', shift: 'Night', status: 'Active' },
        { id: 'S-003', name: 'Nurse Kumar', role: 'Head Nurse', contact: '+91 90000 11111', shift: 'Evening', status: 'Active' },
        { id: 'S-004', name: 'Dr. Rahul', role: 'Pediatrician', contact: '+91 98765 43210', shift: 'Morning', status: 'Active' },
        { id: 'S-005', name: 'Dr. Raj', role: 'Orthopedic Surgeon', contact: '+91 91234 56789', shift: 'Day', status: 'Active' },
      ],
      // mock reports
      reports: [
        { id: 'R-3001', title: 'ER Summary - Sep 09', type: 'Summary', date: '2025-09-09', generatedBy: 'System', status: 'Ready' },
        { id: 'R-3002', title: 'ICU Occupancy - Sep 08', type: 'Occupancy', date: '2025-09-08', generatedBy: 'Admin', status: 'Ready' },
        { id: 'R-3003', title: 'Patient Discharge Report', type: 'Discharge', date: '2025-09-10', generatedBy: 'System', status: 'Processing' },
      ],
    }
  },
  mounted() {
    this.loadUserSession()
    this.setActiveSectionFromRoute()
    
    // Restore active section from sessionStorage if available
    const savedSection = sessionStorage.getItem('hospitalActiveSection')
    if (savedSection && savedSection !== 'dashboard') {
      this.activeSection = savedSection
      this.activeTab = savedSection === 'dashboard' ? 'overview' : savedSection
    }
    
    this.startAutoRefresh()
    this.loadDemoData()
  },
  
  beforeUnmount() {
    this.stopAutoRefresh()
  },
  
  watch: {
    '$route'() {
      // Update active section when route changes
      this.setActiveSectionFromRoute()
    }
  },
  
  methods: {
    loadUserSession() {
      // Load user session data from localStorage
      const userSession = localStorage.getItem('userSession')
      if (userSession) {
        try {
          const userData = JSON.parse(userSession)
          console.log('Loading user session:', userData)
          
          // Update hospital info and user data for hospital users
          if (userData.role === 'hospital') {
            // Update hospital info with registered data
            this.hospitalInfo = {
              name: userData.hospitalName || 'Central Medical Center',
              hospitalId: `HSP-${userData.id.toString().slice(-5)}`,
              license: `LIC-${Math.random().toString().slice(-4)}`,
              address: userData.address || '123 Health St, Cityville',
              phone: userData.phoneNumber || '+91 98765 43210',
              email: userData.email || 'info@centralmed.com'
            }
            
            // Update current user info with correct role
            this.currentUser = {
              name: (userData.hospitalName || 'Central Medical Center') + ' Administrator',
              role: 'Hospital Administrator',
              email: userData.email || 'admin@centralmed.com',
              lastLogin: new Date()
            }
            
            console.log('Updated currentUser:', this.currentUser)
            
            // Load appropriate data based on user type
            this.loadHospitalData(userData)
          }
        } catch (error) {
          console.error('Error loading user session:', error)
        }
      }
    },
    
    loadHospitalData(userData) {
      // Check if this is the demo user or a newly registered user
      const isDemoUser = userData.id === 'demo-hospital' || userData.username === 'hospital'
      
      if (isDemoUser) {
        // Load demo data
        this.loadDemoData()
      } else {
        // Load empty/fresh data for new registered users
        this.loadFreshData()
      }
    },
    
    loadDemoData() {
      // Demo data for Central Medical Center
      this.dashboardMetrics = {
        todayAdmissions: {
          count: 12,
          admitted: 8,
          discharged: 4
        },
        icuOccupancy: {
          percentage: 88,
          occupied: 26,
          total: 30
        },
        erVisits: {
          count: 45,
          treated: 42
        },
        staffOnDuty: {
          count: 156,
          doctors: 45,
          nurses: 111
        }
      }
      
      this.upcomingAppointments = [
        {
          id: 'APT-001',
          date: '2025-10-29',
          patientName: 'Ramesh Kumar',
          doctorName: 'Dr. Alice',
          ward: 'Cardiology',
          status: 'Scheduled'
        },
        {
          id: 'APT-002',
          date: '2025-10-29',
          patientName: 'Priya Singh',
          doctorName: 'Dr. Rahul',
          ward: 'Pediatrics',
          status: 'Confirmed'
        },
        {
          id: 'APT-003',
          date: '2025-10-30',
          patientName: 'Vikram Singh',
          doctorName: 'Dr. Meera',
          ward: 'Emergency',
          status: 'Scheduled'
        }
      ]
      
      this.recentAdmissions = [
        {
          id: 'ADM-001',
          patientName: 'Ramesh Kumar',
          doctorName: 'Dr. Alice',
          date: '2025-10-28',
          ward: 'Cardiology',
          status: 'Admitted'
        },
        {
          id: 'ADM-002',
          patientName: 'Priya Singh',
          doctorName: 'Dr. Rahul',
          date: '2025-10-27',
          ward: 'Pediatrics',
          status: 'Under Observation'
        },
        {
          id: 'ADM-003',
          patientName: 'Suresh Patel',
          doctorName: 'Dr. Anita',
          date: '2025-10-26',
          ward: 'ICU',
          status: 'Critical'
        }
      ]
    },
    
    loadFreshData() {
      // Load saved data for registered users or start with empty data
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      const userId = userSession.id
      
      // Load saved hospital data for this user
      const savedHospitalData = JSON.parse(localStorage.getItem(`hospitalData_${userId}`) || '{}')
      
      // Load dashboard metrics
      this.dashboardMetrics = savedHospitalData.dashboardMetrics || {
        todayAdmissions: {
          count: 0,
          admitted: 0,
          discharged: 0
        },
        icuOccupancy: {
          percentage: 0,
          occupied: 0,
          total: 0
        },
        erVisits: {
          count: 0,
          treated: 0
        },
        staffOnDuty: {
          count: 0,
          doctors: 0,
          nurses: 0
        }
      }
      
      // Load saved appointments and admissions
      this.upcomingAppointments = savedHospitalData.upcomingAppointments || []
      this.recentAdmissions = savedHospitalData.recentAdmissions || []
    },
    
    handleNavigation(section) {
      // Update active section - this will show the appropriate tab
      this.activeSection = section
      this.activeTab = section === 'dashboard' ? 'overview' : section
      
      // Store current section for persistence
      sessionStorage.setItem('hospitalActiveSection', section)
      
      // Navigate to different hospital management sections
      // Note: We're using activeSection to control what's shown, not router navigation
      // This provides smoother transitions without page reloads
      
      // Scroll to top when switching sections
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    
    handleQuickAction(actionType) {
      // Handle quick action button clicks - properly link to sections
      switch (actionType) {
        case 'new-admission':
          // Navigate to patients section for new admission
          this.handleNavigation('patients')
          // In a real app, this could open a modal for new admission
          this.$nextTick(() => {
            // Could trigger a modal or form here
            console.log('Opening new admission form...')
          })
          break
        case 'assign-staff':
          // Navigate directly to staff section
          this.handleNavigation('staff')
          break
        case 'generate-report':
          // Navigate directly to reports section
          this.handleNavigation('reports')
          this.$nextTick(() => {
            // Optionally auto-trigger report generation UI
            console.log('Opening report generation...')
          })
          break
        case 'icu-panel':
          // Navigate to patients section with ICU filter or create ICU view
          this.handleNavigation('patients')
          // In a real app, this could filter by ICU ward or open ICU-specific panel
          console.log('Opening ICU panel...')
          break
        case 'hospital-profile':
          // Navigate to hospital profile section
          this.handleNavigation('profile')
          break
        default:
          console.warn('Unknown quick action:', actionType)
      }
    },
    
    handleLogout(logoutData) {
      console.log('Processing secure logout:', logoutData)
      
      // Stop auto-refresh to prevent unnecessary API calls
      this.stopAutoRefresh()
      
      // Clear all session data
      localStorage.removeItem('hospitalAdminSession')
      sessionStorage.clear()
      
      // Redirect to login with logout confirmation
      this.$router.push({
        path: '/login',
        query: { 
          message: 'You have been securely logged out',
          type: 'success'
        }
      })
    },
    
    handleSearch(searchData) {
      // Handle global search functionality
      console.log('Performing search:', searchData)
    },
    
    handleSearchSelect(selectedResult) {
      // Handle search result selection
      console.log('Search result selected:', selectedResult)
    },
    
    handleUnauthorizedAccess() {
      console.warn('Unauthorized access attempt detected')
      
      // Force logout and redirect to login
      this.stopAutoRefresh()
      localStorage.clear()
      sessionStorage.clear()
      
      this.$router.push({
        path: '/login',
        query: { 
          message: 'Unauthorized access detected. Please login again.',
          type: 'error'
        }
      })
    },
    
    async refreshAppointments() {
      // Refresh upcoming appointments data
      console.log('Refreshing appointments data...')
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Update dashboard metrics
        this.updateDashboardMetrics()
        
      } catch (error) {
        console.error('Failed to refresh appointments:', error)
      }
    },
    
    handleViewAppointmentDetails(appointment) {
      console.log('Viewing appointment details:', appointment)
      // Navigate to appointment details or open modal
    },
    
    handleViewAdmissionDetails(admission) {
      console.log('Viewing admission details:', admission)
      // Navigate to admission details or open modal
    },
    
    navigateToPatients() {
      this.handleNavigation('patients')
    },
    
    updateDashboardMetrics() {
      // Update metrics based on current data
      const totalAdmissions = this.recentAdmissions.filter(a => 
        new Date(a.date).toDateString() === new Date().toDateString()
      ).length
      
      this.dashboardMetrics.todayAdmissions = {
        count: totalAdmissions,
        admitted: totalAdmissions,
        discharged: 0
      }
    },
    
    handleSidebarToggle(isCollapsed) {
      // Handle sidebar toggle event
      console.log('Sidebar toggled:', isCollapsed ? 'collapsed' : 'expanded')
    },
    
    setActiveSectionFromRoute() {
      // Set active section based on current route
      const currentPath = this.$route.path
      
      if (currentPath === '/dashboard') {
        this.activeSection = 'dashboard'
        this.activeTab = 'overview'
      } else {
        this.activeSection = 'dashboard'
      }
    },
    
    switchTab(key) {
      // Immediate tab switch for fast response
      this.activeTab = key
      // Add haptic feedback if supported
      if (navigator.vibrate) {
        navigator.vibrate(30)
      }
    },
    tabClass(key) {
      const baseClasses = 'transition-all duration-150 hover:scale-105'
      return this.activeTab === key
        ? `${baseClasses} bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105`
        : `${baseClasses} bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-gray-50`
    },
    refreshData() {
      // Simulate data refresh
      this.hospital.occupancyRate = Math.floor(Math.random() * 20) + 70
      this.patients.forEach(patient => {
        if (Math.random() > 0.8) {
          patient.status = patient.status === 'Admitted' ? 'Under Observation' : 'Admitted'
        }
      })
      
      // Show refresh feedback
      this.$emit('show-toast', 'Data refreshed successfully')
    },
    toggleDarkMode() {
      this.$emit('toggle-dark-mode')
    },
    toggleAutoRefresh() {
      this.autoRefresh = !this.autoRefresh
      if (this.autoRefresh) {
        this.startAutoRefresh()
      } else {
        this.stopAutoRefresh()
      }
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications
    },
    startAutoRefresh() {
      if (this.autoRefresh) {
        this.refreshInterval = setInterval(() => {
          this.refreshData()
        }, 30000) // Refresh every 30 seconds
      }
    },
    stopAutoRefresh() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval)
        this.refreshInterval = null
      }
    },
    saveSettings() {
      localStorage.setItem('autoRefresh', this.autoRefresh.toString())
      localStorage.setItem('notificationsEnabled', this.notificationsEnabled.toString())
      this.showSettings = false
      this.$emit('show-toast', 'Settings saved successfully')
    },
    clearNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id)
    },
    formatTime(timestamp) {
      const now = new Date()
      const diff = now - timestamp
      const minutes = Math.floor(diff / 60000)
      
      if (minutes < 1) return 'Just now'
      if (minutes < 60) return `${minutes}m ago`
      const hours = Math.floor(minutes / 60)
      if (hours < 24) return `${hours}h ago`
      const days = Math.floor(hours / 24)
      return `${days}d ago`
    }
  }
}
</script>

<style scoped>
.tab-content {
  min-height: 400px;
}

.tab-content > * {
  transition: opacity 0.1s ease-in-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
  background: #374151;
}
.dark ::-webkit-scrollbar-thumb {
  background: #6b7280;
}
.dark ::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>

