<template>
  <div class="min-h-screen bg-gray-50 relative overflow-hidden">
    <!-- Animated Medical Icons Background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <span class="material-symbols-rounded absolute text-red-200 opacity-10 animate-float" style="font-size: 70px; top: 10%; left: 85%; animation-delay: 0s;">health_and_safety</span>
      <span class="material-symbols-rounded absolute text-red-300 opacity: 0.08; animate-float-reverse" style="font-size: 55px; top: 20%; left: 90%; animation-delay: 1s;">medication</span>
      <span class="material-symbols-rounded absolute text-red-200 opacity-10 animate-float" style="font-size: 65px; top: 35%; left: 92%; animation-delay: 2s;">medical_information</span>
      <span class="material-symbols-rounded absolute text-red-300 opacity: 0.08; animate-float-reverse" style="font-size: 60px; top: 45%; left: 88%; animation-delay: 0.5s;">emergency</span>
      <span class="material-symbols-rounded absolute text-red-200 opacity-10 animate-float" style="font-size: 50px; bottom: 30%; left: 93%; animation-delay: 1.5s;">monitoring</span>
      <span class="material-symbols-rounded absolute text-red-300 opacity: 0.08; animate-float-reverse" style="font-size: 75px; bottom: 20%; left: 87%; animation-delay: 2.5s;">local_hospital</span>
    </div>
    <div class="flex relative z-10">
      <!-- Sidebar -->
      <PatientSidebar
        :active-section="activeSection"
        @navigate="handleNavigation"
        @logout="handleLogout"
        @sidebar-toggle="handleSidebarToggle"
      />
      
      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col">
        <!-- Header -->
        <PatientHeader
          :patient-info="patientInfoData"
          :current-user="currentUserData"
          @search="handleSearch"
        />
        
        <!-- Main Content -->
        <main class="flex-1 p-6">
          <!-- Dashboard Section -->
          <div v-if="activeSection === 'dashboard'">
            <!-- Patient Info Header -->
            <div class="mb-6">
              <div class="flex items-center space-x-3 mb-2">
                <span class="material-symbols-rounded text-red-600 text-2xl" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">person</span>
                <h1 class="text-2xl font-bold text-gray-900">{{ patientName }}</h1>
              </div>
              <div class="flex items-center space-x-4 text-sm text-gray-600">
                <span class="font-medium">PATIENT-ID: {{ patientInfoData.patientId }}</span>
                <span v-if="patientProfile.bloodGroup" class="font-medium">Blood Group: {{ patientProfile.bloodGroup }}</span>
              </div>
            </div>

            <!-- Metrics Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <!-- Upcoming Appointments -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.05s;">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                      <span class="material-symbols-rounded text-red-600" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">event</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-2xl font-bold text-gray-900 metric-number">{{ upcomingAppointmentsCount }}</p>
                    <p class="text-sm text-gray-600">{{ confirmedCount }} confirmed • {{ scheduledCount }} scheduled</p>
                  </div>
                </div>
                <div class="mt-2">
                  <p class="text-sm font-medium text-red-600">Upcoming Appointments</p>
                </div>
              </div>

              <!-- Health Alerts -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.1s;">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center">
                      <span class="material-symbols-rounded text-orange-600" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">warning</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-2xl font-bold text-gray-900 metric-number">{{ healthAlertsCount }}</p>
                    <p class="text-sm text-gray-600">{{ alertsCount }} alerts • {{ remindersCount }} reminders</p>
                  </div>
                </div>
                <div class="mt-2">
                  <p class="text-sm font-medium text-orange-600">Health Alerts</p>
                </div>
              </div>

              <!-- Lab Reports -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.15s;">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                      <span class="material-symbols-rounded text-green-600" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">science</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-2xl font-bold text-gray-900 metric-number">{{ labReportsCount }}</p>
                    <p class="text-sm text-gray-600">{{ availableReportsCount }} available • {{ pendingReportsCount }} pending</p>
                  </div>
                </div>
                <div class="mt-2">
                  <p class="text-sm font-medium text-green-600">Lab Reports</p>
                </div>
              </div>

              <!-- Medications -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.2s;">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                      <span class="material-symbols-rounded text-blue-600" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">medication</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-2xl font-bold text-gray-900 metric-number">{{ medicationsCount }}</p>
                    <p class="text-sm text-gray-600">{{ activeMedicationsCount }} active • {{ todayMedicationsCount }} today</p>
                  </div>
                </div>
                <div class="mt-2">
                  <p class="text-sm font-medium text-blue-600">Medications</p>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="mb-6 animate-fade-up" style="animation-delay: 0.3s;">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                <button
                  @click="bookDoctorAppointment"
                  class="flex flex-col items-center justify-center p-4 border-2 border-dashed border-red-300 rounded-lg hover:bg-red-50 hover:border-red-400 transition-all duration-200 group"
                >
                  <div class="p-2 bg-red-100 rounded-lg mb-2 group-hover:bg-red-200 transition-colors">
                    <span class="material-symbols-rounded text-red-600 text-xl" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">person_add</span>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Book Doctor</span>
                </button>
                <button
                  @click="bookLabSlot"
                  class="flex flex-col items-center justify-center p-4 border-2 border-dashed border-green-300 rounded-lg hover:bg-green-50 hover:border-green-400 transition-all duration-200 group"
                >
                  <div class="p-2 bg-green-100 rounded-lg mb-2 group-hover:bg-green-200 transition-colors">
                    <span class="material-symbols-rounded text-green-600 text-xl" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">science</span>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Book Lab Test</span>
                </button>
                <button
                  @click="handleViewAllReports"
                  class="flex flex-col items-center justify-center p-4 border-2 border-dashed border-purple-300 rounded-lg hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 group"
                >
                  <div class="p-2 bg-purple-100 rounded-lg mb-2 group-hover:bg-purple-200 transition-colors">
                    <span class="material-symbols-rounded text-purple-600 text-xl" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">description</span>
                  </div>
                  <span class="text-sm font-medium text-gray-700">View Reports</span>
                </button>
                <button
                  @click="handleViewAllMetrics"
                  class="flex flex-col items-center justify-center p-4 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 group"
                >
                  <div class="p-2 bg-blue-100 rounded-lg mb-2 group-hover:bg-blue-200 transition-colors">
                    <span class="material-symbols-rounded text-blue-600 text-xl" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">favorite</span>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Health Metrics</span>
                </button>
                <button
                  @click="handleProfile"
                  class="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group"
                >
                  <div class="p-2 bg-gray-100 rounded-lg mb-2 group-hover:bg-gray-200 transition-colors">
                    <span class="material-symbols-rounded text-gray-600 text-xl" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">account_circle</span>
                  </div>
                  <span class="text-sm font-medium text-gray-700">My Profile</span>
                </button>
              </div>
            </div>

            <!-- Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Book Appointments Section -->
              <Card title="Book Appointments" padding="p-6">
                <div class="grid grid-cols-1 gap-4">
                  <!-- Doctor Consultation Card -->
                  <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200 shadow-sm">
                    <div class="flex items-center gap-3 mb-4">
                      <div class="p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-md">
                        <span class="material-symbols-rounded text-white text-xl" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">person</span>
                      </div>
                      <div>
                        <h3 class="font-semibold text-gray-800">Doctor Consultation</h3>
                        <p class="text-sm text-gray-600">Book online or offline appointments</p>
                      </div>
                    </div>
                    <button 
                      @click="bookDoctorAppointment"
                      class="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Book Doctor Appointment
                    </button>
                  </div>
                  
                  <!-- Lab Tests Card -->
                  <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 shadow-sm">
                    <div class="flex items-center gap-3 mb-4">
                      <div class="p-3 bg-green-600 rounded-lg shadow-md">
                        <span class="material-symbols-rounded text-white text-xl" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">science</span>
                      </div>
                      <div>
                        <h3 class="font-semibold text-gray-800">Lab Tests</h3>
                        <p class="text-sm text-gray-600">Schedule lab tests and screenings</p>
                      </div>
                    </div>
                    <button 
                      @click="bookLabSlot"
                      class="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Book Lab Slot
                    </button>
                  </div>
                </div>
              </Card>

              <!-- Appointment Calendar -->
              <AppointmentCalendar 
                :appointments="upcomingAppointments"
              />
            </div>

            <!-- Bottom Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <!-- Appointment Details List -->
              <Card title="Appointment Details" padding="p-6">
                <div v-if="upcomingAppointments.length === 0" class="text-center py-8 text-gray-500">
                  <span class="material-symbols-rounded text-4xl mb-2 block" style="font-variation-settings:'OPSZ' 48, 'wght' 300" aria-hidden="true">event</span>
                  <p>No upcoming appointments</p>
                  <p class="text-sm mt-1">Book an appointment to see it here</p>
                </div>
                <div v-else class="space-y-4">
                  <div 
                    v-for="appointment in upcomingAppointments.slice(0, 3)" 
                    :key="appointment.id"
                    class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <!-- Appointment Icon -->
                    <div class="p-2 rounded-lg" :class="appointment.type === 'doctor' ? 'bg-red-100' : 'bg-green-100'">
                      <span 
                        class="material-symbols-rounded" 
                        :class="appointment.type === 'doctor' ? 'text-red-600' : 'text-green-600'"
                        style="font-variation-settings:'OPSZ' 20, 'wght' 600" 
                        aria-hidden="true"
                      >
                        {{ appointment.type === 'doctor' ? 'person' : 'science' }}
                      </span>
                    </div>
                    
                    <!-- Appointment Details -->
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-800">{{ appointment.doctor || appointment.service }}</h4>
                      <p v-if="appointment.specialty" class="text-sm text-gray-600">{{ appointment.specialty }}</p>
                      <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span class="flex items-center gap-1">
                          <span class="material-symbols-rounded text-xs" aria-hidden="true">calendar_today</span>
                          {{ formatAppointmentDate(appointment.date) }}
                        </span>
                        <span class="flex items-center gap-1">
                          <span class="material-symbols-rounded text-xs" aria-hidden="true">schedule</span>
                          {{ appointment.time }}
                        </span>
                      </div>
                    </div>
                    
                    <!-- Status -->
                    <span 
                      class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : appointment.status === 'Pending' || appointment.status === 'Scheduled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'"
                    >
                      {{ appointment.status }}
                    </span>
                  </div>
                </div>
              </Card>

              <!-- Health Summary -->
              <HealthSummary 
                :metrics="healthMetrics"
                @view-all="handleViewAllMetrics"
              />
            </div>

            <!-- Recent Lab Reports Section -->
            <div class="mt-6">
              <LabReports 
                :reports="labReports"
                @download="handleDownloadReport"
                @view-all="handleViewAllReports"
              />
            </div>
          </div>

          <!-- Other Sections -->
          <div v-else-if="activeSection === 'appointments'">
            <Card title="My Appointments" padding="p-6">
              <AppointmentCalendar :appointments="upcomingAppointments" />
              <div class="mt-6">
                <div v-if="upcomingAppointments.length === 0" class="text-center py-8 text-gray-500">
                  <span class="material-symbols-rounded text-4xl mb-2 block" style="font-variation-settings:'OPSZ' 48, 'wght' 300" aria-hidden="true">event</span>
                  <p>No appointments found</p>
                </div>
                <div v-else class="space-y-4">
                  <div 
                    v-for="appointment in upcomingAppointments" 
                    :key="appointment.id"
                    class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div class="p-2 rounded-lg" :class="appointment.type === 'doctor' ? 'bg-red-100' : 'bg-yellow-100'">
                      <span 
                        class="material-symbols-rounded" 
                        :class="appointment.type === 'doctor' ? 'text-red-600' : 'text-yellow-600'"
                        style="font-variation-settings:'OPSZ' 20, 'wght' 600" 
                        aria-hidden="true"
                      >
                        {{ appointment.type === 'doctor' ? 'person' : 'science' }}
                      </span>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-800">{{ appointment.doctor || appointment.service }}</h4>
                      <p v-if="appointment.specialty" class="text-sm text-gray-600">{{ appointment.specialty }}</p>
                      <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span class="flex items-center gap-1">
                          <span class="material-symbols-rounded text-xs" aria-hidden="true">calendar_today</span>
                          {{ formatAppointmentDate(appointment.date) }}
                        </span>
                        <span class="flex items-center gap-1">
                          <span class="material-symbols-rounded text-xs" aria-hidden="true">schedule</span>
                          {{ appointment.time }}
                        </span>
                      </div>
                    </div>
                    <span 
                      class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : appointment.status === 'Pending' || appointment.status === 'Scheduled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'"
                    >
                      {{ appointment.status }}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div v-else-if="activeSection === 'lab-reports'">
            <LabReports 
              :reports="labReports"
              @download="handleDownloadReport"
              @view-all="handleViewAllReports"
            />
          </div>

          <div v-else-if="activeSection === 'health'">
            <HealthSummary 
              :metrics="healthMetrics"
              @view-all="handleViewAllMetrics"
            />
          </div>

          <div v-else-if="activeSection === 'medications'">
            <MedicationReminders 
              :medications="medications"
              @mark-taken="handleMarkMedicationTaken"
              @view-all="handleViewAllMedications"
            />
          </div>

          <div v-else-if="activeSection === 'profile'">
            <Card title="Patient Profile" padding="p-6">
              <div class="space-y-4">
                <div>
                  <label class="text-sm font-medium text-gray-500">Patient Name</label>
                  <p class="text-sm text-gray-900 mt-1">{{ patientName }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Email</label>
                  <p class="text-sm text-gray-900 mt-1">{{ patientProfile.email }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Phone</label>
                  <p class="text-sm text-gray-900 mt-1">{{ patientProfile.phoneNumber }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Blood Group</label>
                  <p class="text-sm text-gray-900 mt-1">{{ patientProfile.bloodGroup }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Gender</label>
                  <p class="text-sm text-gray-900 mt-1">{{ patientProfile.gender }}</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import PatientSidebar from './PatientSidebar.vue'
import PatientHeader from './PatientHeader.vue'
import Card from './base/Card.vue'
import AppointmentCalendar from './AppointmentCalendar.vue'
import HealthSummary from './HealthSummary.vue'
import LabReports from './LabReports.vue'
import MedicationReminders from './MedicationReminders.vue'

export default {
  name: 'PatientPortal',
  components: {
    PatientSidebar,
    PatientHeader,
    Card,
    AppointmentCalendar,
    HealthSummary,
    LabReports,
    MedicationReminders
  },
  props: {
    patientName: {
      type: String,
      default: 'John Doe'
    },
    patientProfile: {
      type: Object,
      default: () => ({
        patientName: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phoneNumber: '+1234567890',
        dateOfBirth: '1990-01-01',
        bloodGroup: 'O+',
        gender: 'Male'
      })
    },
    appointments: {
      type: Array,
      default: () => []
    },
    healthMetrics: {
      type: Array,
      default: () => []
    },
    labReports: {
      type: Array,
      default: () => []
    },
    medications: {
      type: Array,
      default: () => []
    }
  },
  emits: [
    'book-doctor',
    'book-lab',
    'view-appointment',
    'view-metrics',
    'download-report',
    'view-reports',
    'mark-medication',
    'view-medications',
    'go-home',
    'logout',
    'view-profile'
  ],
  setup(props, { emit }) {
    const activeSection = ref('dashboard')

    // Default data
    const upcomingAppointments = computed(() => {
      if (props.appointments.length > 0) {
        return props.appointments
      }
      
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      
      const friday = new Date()
      friday.setDate(friday.getDate() + (5 - friday.getDay() + 7) % 7)
      
      return [
        {
          id: 'apt-1',
          doctor: 'Dr. Sarah Wilson',
          specialty: 'Cardiology',
          time: '2:00 PM',
          date: tomorrow,
          status: 'Confirmed',
          type: 'doctor'
        },
        {
          id: 'apt-2',
          service: 'Lab Test - Blood Work',
          time: '9:00 AM',
          date: friday,
          status: 'Scheduled',
          type: 'lab'
        }
      ]
    })

    // Computed metrics
    const upcomingAppointmentsCount = computed(() => upcomingAppointments.value.length)
    const confirmedCount = computed(() => upcomingAppointments.value.filter(a => a.status === 'Confirmed').length)
    const scheduledCount = computed(() => upcomingAppointments.value.filter(a => a.status === 'Scheduled').length)
    const labReportsCount = computed(() => props.labReports.length || 5)
    const availableReportsCount = computed(() => props.labReports.filter(r => r.status === 'Available').length || 3)
    const pendingReportsCount = computed(() => props.labReports.filter(r => r.status === 'Pending').length || 2)
    const medicationsCount = computed(() => props.medications.length || 3)
    const activeMedicationsCount = computed(() => props.medications.filter(m => m.active).length || 3)
    const todayMedicationsCount = computed(() => props.medications.filter(m => m.today).length || 2)
    const healthAlertsCount = computed(() => 2)
    const alertsCount = computed(() => 1)
    const remindersCount = computed(() => 1)

    // Patient info for header
    const patientInfoData = computed(() => ({
      name: props.patientName,
      patientId: 'PAT-001',
      bloodGroup: props.patientProfile.bloodGroup
    }))

    const currentUserData = computed(() => ({
      name: props.patientName,
      lastLogin: 'Just now'
    }))

    // Event handlers
    const handleNavigation = (section) => {
      activeSection.value = section
      sessionStorage.setItem('patientActiveSection', section)
    }

    const handleSidebarToggle = (isCollapsed) => {
      // Handle sidebar toggle if needed
    }

    const handleLogout = () => {
      emit('logout')
    }

    const handleSearch = (query) => {
      console.log('Searching for:', query)
    }

    const handleProfile = () => {
      emit('view-profile')
    }

    const bookDoctorAppointment = () => {
      emit('book-doctor')
    }

    const bookLabSlot = () => {
      emit('book-lab')
    }

    const handleViewAppointmentDetails = (appointment) => {
      emit('view-appointment', appointment)
    }

    const handleViewAllMetrics = () => {
      emit('view-metrics')
    }

    const handleDownloadReport = (report) => {
      emit('download-report', report)
    }

    const handleViewAllReports = () => {
      emit('view-reports')
    }

    const handleMarkMedicationTaken = (medication) => {
      emit('mark-medication', medication)
    }

    const handleViewAllMedications = () => {
      emit('view-medications')
    }

    const formatAppointmentDate = (date) => {
      if (!date) return 'Date not set'
      
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      
      if (date.toDateString() === today.toDateString()) {
        return 'Today'
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow'
      } else {
        return date.toLocaleDateString('en-US', { 
          weekday: 'short',
          month: 'short', 
          day: 'numeric'
        })
      }
    }

    // Load active section from sessionStorage
    const savedSection = sessionStorage.getItem('patientActiveSection')
    if (savedSection) {
      activeSection.value = savedSection
    }

    return {
      activeSection,
      upcomingAppointments,
      upcomingAppointmentsCount,
      confirmedCount,
      scheduledCount,
      labReportsCount,
      availableReportsCount,
      pendingReportsCount,
      medicationsCount,
      activeMedicationsCount,
      todayMedicationsCount,
      healthAlertsCount,
      alertsCount,
      remindersCount,
      patientInfoData,
      currentUserData,
      handleNavigation,
      handleSidebarToggle,
      handleLogout,
      handleSearch,
      handleProfile,
      bookDoctorAppointment,
      bookLabSlot,
      handleViewAppointmentDetails,
      handleViewAllMetrics,
      handleDownloadReport,
      handleViewAllReports,
      handleMarkMedicationTaken,
      handleViewAllMedications,
      formatAppointmentDate
    }
  }
}
</script>

<style scoped>
/* Patient portal specific styles */
</style>
