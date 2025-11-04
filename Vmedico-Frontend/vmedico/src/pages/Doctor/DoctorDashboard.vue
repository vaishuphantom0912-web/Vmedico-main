<template>
  <div class="min-h-screen bg-gray-50 relative overflow-hidden">
    <!-- Animated Medical Icons Background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <span class="material-symbols-rounded absolute text-green-200 opacity-10 animate-float" style="font-size: 70px; top: 10%; left: 85%; animation-delay: 0s;">medical_services</span>
      <span class="material-symbols-rounded absolute text-green-300 opacity: 0.08; animate-float-reverse" style="font-size: 55px; top: 20%; left: 90%; animation-delay: 1s;">stethoscope</span>
      <span class="material-symbols-rounded absolute text-green-200 opacity-10 animate-float" style="font-size: 65px; top: 35%; left: 92%; animation-delay: 2s;">prescriptions</span>
      <span class="material-symbols-rounded absolute text-green-300 opacity: 0.08; animate-float-reverse" style="font-size: 60px; top: 45%; left: 88%; animation-delay: 0.5s;">heart_plus</span>
      <span class="material-symbols-rounded absolute text-green-200 opacity-10 animate-float" style="font-size: 50px; bottom: 30%; left: 93%; animation-delay: 1.5s;">monitoring</span>
      <span class="material-symbols-rounded absolute text-green-300 opacity: 0.08; animate-float-reverse" style="font-size: 75px; bottom: 20%; left: 87%; animation-delay: 2.5s;">emergency</span>
    </div>
    <!-- Doctor Dashboard Container -->
    <div class="flex relative z-10">
      <!-- Sidebar Navigation -->
      <DoctorSidebar 
        :active-section="activeSection"
        @navigate="handleNavigation"
        @logout="handleLogout"
        @sidebar-toggle="handleSidebarToggle"
      />
      
      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col">
        <!-- Header -->
        <DoctorHeader 
          :doctor-info="doctorInfo"
          :current-user="currentUser"
          @logout="handleLogout"
          @search="handleSearch"
        />
        
        <!-- Dashboard Content -->
        <main class="flex-1 p-6 page-enter">
          <!-- Dashboard View -->
          <div v-if="activeSection === 'dashboard'">
            <!-- Welcome Card -->
            <div class="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg shadow-lg p-6 mb-6 text-white animate-fade-up">
              <h2 class="text-2xl font-bold mb-2">Welcome, {{ doctorInfo.name }}!</h2>
              <p class="text-green-100">You have <span class="font-bold">{{ upcomingAppointments.length }}</span> appointments scheduled today</p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.05s;">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-2xl font-bold text-gray-900 metric-number">{{ todayAppointments.length }}</p>
                    <p class="text-sm text-gray-600">Today's Appointments</p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.1s;">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-2xl font-bold text-gray-900 metric-number">{{ completedToday }}</p>
                    <p class="text-sm text-gray-600">Completed Today</p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.15s;">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-2xl font-bold text-gray-900 metric-number">{{ pendingAppointments.length }}</p>
                    <p class="text-sm text-gray-600">Pending</p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.2s;">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-2xl font-bold text-gray-900 metric-number">{{ prescriptionsCount }}</p>
                    <p class="text-sm text-gray-600">Prescriptions</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Booked Slots Table -->
            <BookedSlotsTable 
              :slots="upcomingAppointments"
              :refresh-interval="30000"
              @refresh="refreshAppointments"
              @start-consultation="handleStartConsultation"
              @finish-consultation="handleFinishConsultation"
              @update-status="handleUpdateStatus"
              @view-details="handleViewDetails"
            />

            <!-- Completed Consultations Overview -->
            <div class="mt-8">
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Completed Consultations</h3>
                    <p class="text-sm text-gray-500 mt-1">Every patient that you finish automatically appears here with the latest details.</p>
                  </div>
                  <div class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-50 text-green-700">
                    {{ completedAppointments.length }} Completed
                  </div>
                </div>

                <div v-if="recentCompletedConsultations.length" class="mt-6 divide-y divide-gray-200">
                  <div
                    v-for="consult in recentCompletedConsultations"
                    :key="consult.id"
                    class="py-4"
                  >
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div class="text-base font-semibold text-gray-900 flex items-center gap-2">
                          <span class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-100 text-green-700 font-medium">
                            {{ (consult.patientName || consult.patient || 'P').charAt(0).toUpperCase() }}
                          </span>
                          <div>
                            <div>{{ consult.patientName || consult.patient }}</div>
                            <div class="text-sm text-gray-500">{{ consult.patientPhone }} • {{ consult.patientEmail }}</div>
                          </div>
                        </div>
                        <div class="text-sm text-gray-500 mt-2">
                          Completed on {{ formatCompletionTimestamp(consult) }}
                        </div>
                      </div>
                      <div class="flex items-center gap-3">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          Completed
                        </span>
                        <div class="text-sm text-gray-500">{{ consult.doctor || doctorInfo.name }}</div>
                      </div>
                    </div>

                    <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div class="bg-gray-50 rounded-lg p-4">
                        <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Symptoms</div>
                        <div class="text-sm text-gray-700 mt-2">{{ consult.symptoms }}</div>
                      </div>
                      <div class="bg-gray-50 rounded-lg p-4">
                        <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Diagnosis</div>
                        <div class="text-sm mt-2" :class="consult.diagnosis ? 'text-gray-700' : 'text-gray-400 italic'">
                          {{ consult.diagnosis || 'Not recorded' }}
                        </div>
                      </div>
                      <div class="bg-gray-50 rounded-lg p-4">
                        <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Follow-up</div>
                        <div class="text-sm mt-2" :class="consult.followUpDate ? 'text-gray-700' : 'text-gray-400 italic'">
                          {{ consult.followUpDate ? formatFollowUpDate(consult.followUpDate) : 'Not scheduled' }}
                        </div>
                      </div>
                    </div>

                    <div v-if="consult.medicines && consult.medicines.length" class="mt-4">
                      <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Prescribed Medicines</div>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div
                          v-for="(medicine, index) in consult.medicines.slice(0, 4)"
                          :key="index"
                          class="border border-gray-200 rounded-lg px-4 py-3 bg-white"
                        >
                          <div class="text-sm font-semibold text-gray-900">{{ medicine.name }}</div>
                          <div class="text-xs text-gray-500 mt-1">{{ medicine.dosage }} • {{ medicine.frequency }}</div>
                          <div class="text-xs text-gray-400 mt-1">{{ medicine.instructions }}</div>
                        </div>
                      </div>
                      <div v-if="consult.medicines.length > 4" class="text-xs text-gray-400 mt-2">
                        + {{ consult.medicines.length - 4 }} more medicines
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else class="mt-6">
                  <div class="border border-dashed border-gray-200 rounded-lg py-12 text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h4 class="mt-4 text-sm font-semibold text-gray-900">No completed consultations yet</h4>
                    <p class="mt-1 text-sm text-gray-500">Finish a consultation to see the patient summary here instantly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Appointments View -->
          <div v-else-if="activeSection === 'appointments'">
            <BookedSlotsTable 
              :slots="allAppointments"
              :refresh-interval="30000"
              @refresh="refreshAppointments"
              @start-consultation="handleStartConsultation"
              @finish-consultation="handleFinishConsultation"
              @update-status="handleUpdateStatus"
              @view-details="handleViewDetails"
            />
          </div>

          <!-- Profile View -->
          <div v-else-if="activeSection === 'profile'">
            <DoctorProfile
              :doctor="doctorInfo"
              :statistics="doctorStatistics"
              @update-doctor="handleUpdateDoctor"
              @update-statistics="handleUpdateStatistics"
            />
          </div>
        </main>
      </div>
    </div>

    <!-- Consultation Modal -->
    <ConsultationModal
      :is-visible="showConsultationModal"
      :patient="selectedPatient"
      @close="showConsultationModal = false"
      @save-prescription="handleSavePrescription"
      @finish-consultation="handleFinishConsultation"
    />
  </div>
</template>

<script>
import DoctorHeader from '../../components/Doctor/DoctorHeader.vue'
import DoctorSidebar from '../../components/Doctor/DoctorSidebar.vue'
import BookedSlotsTable from '../../components/Doctor/BookedSlotsTable.vue'
import ConsultationModal from '../../components/Doctor/ConsultationModal.vue'
import DoctorProfile from '../../components/Doctor/DoctorProfile.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'DoctorDashboard',
  components: {
    DoctorHeader,
    DoctorSidebar,
    BookedSlotsTable,
    ConsultationModal,
    DoctorProfile
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  data() {
    return {
      activeSection: 'dashboard',
      showConsultationModal: false,
      selectedPatient: null,
      doctorInfo: {
        name: 'Dr. Sarah Wilson',
        specialization: 'Cardiology',
        hospital: 'Central Medical Center',
        qualification: 'MD, MBBS',
        email: 'sarah.wilson@centralmed.com',
        phoneNumber: '+91 98765 43210',
        licenseNumber: 'DR-LIC-12345'
      },
      currentUser: {
        name: 'Dr. Sarah Wilson',
        role: 'Doctor',
        lastLogin: new Date()
      },
      allAppointments: [],
      prescriptionsCount: 0,
      prescriptionsList: [],
      doctorStatistics: {
        totalPatients: 0,
        totalConsultations: 0,
        totalPrescriptions: 0,
        experience: '10'
      }
    }
  },
  computed: {
    upcomingAppointments() {
      // Filter appointments for today and upcoming
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      return this.allAppointments.filter(apt => {
        const aptDate = new Date(apt.date)
        aptDate.setHours(0, 0, 0, 0)
        return aptDate >= today && (apt.status === 'Scheduled' || apt.status === 'Confirmed')
      }).sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`)
        const dateB = new Date(`${b.date} ${b.time}`)
        return dateA - dateB
      })
    },
    todayAppointments() {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      return this.allAppointments.filter(apt => {
        const aptDate = new Date(apt.date)
        aptDate.setHours(0, 0, 0, 0)
        return aptDate.getTime() === today.getTime()
      })
    },
    completedToday() {
      return this.todayAppointments.filter(apt => apt.status === 'Completed').length
    },
    pendingAppointments() {
      return this.allAppointments.filter(apt => 
        apt.status === 'Scheduled' || apt.status === 'Confirmed'
      )
    },
    completedAppointments() {
      return this.allAppointments.filter(apt => apt.status === 'Completed')
    },
    recentCompletedConsultations() {
      const map = new Map(
        (this.prescriptionsList || []).map(record => [record.patient?.id, record])
      )

      return this.completedAppointments
        .map(apt => {
          const prescriptionRecord = map.get(apt.id) || null
          const prescription = prescriptionRecord?.prescription || {}
          return {
            ...apt,
            completedAt: apt.completedAt || prescriptionRecord?.completedAt || null,
            diagnosis: prescription.diagnosis || '',
            followUpDate: prescription.followUpDate || '',
            medicines: Array.isArray(prescription.medicines) ? prescription.medicines : [],
            prescriptionRecord
          }
        })
        .sort((a, b) => {
          return this.getAppointmentDateValue(b) - this.getAppointmentDateValue(a)
        })
    }
  },
  mounted() {
    // Load doctor session
    this.loadDoctorSession()
    
    // Load appointments
    this.loadAppointments()
    
    // Load prescription count
    this.loadPrescriptionCount()
    
    // Load statistics
    this.loadStatistics()
    
    // Restore active section from sessionStorage
    const savedSection = sessionStorage.getItem('doctorActiveSection')
    if (savedSection) {
      this.activeSection = savedSection
    }
  },
  methods: {
    convertTo24Hour(timeStr) {
      if (!timeStr) return '00:00'
      const parts = timeStr.trim().split(' ')
      if (parts.length < 2) return timeStr
      let [hours, minutes] = parts[0].split(':')
      const modifier = parts[1].toUpperCase()
      if (modifier === 'PM' && hours !== '12') {
        hours = String(Number(hours) + 12)
      }
      if (modifier === 'AM' && hours === '12') {
        hours = '00'
      }
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
    },
    getAppointmentDateValue(appointment) {
      if (!appointment) return Date.now()
      if (appointment.completedAt) {
        const completedDate = new Date(appointment.completedAt)
        if (!Number.isNaN(completedDate)) {
          return completedDate.getTime()
        }
      }
      if (appointment.date) {
        let iso = appointment.date
        if (appointment.time) {
          const time24 = this.convertTo24Hour(appointment.time)
          iso = `${appointment.date}T${time24}:00`
        }
        const dateObj = new Date(iso)
        if (!Number.isNaN(dateObj)) {
          return dateObj.getTime()
        }
      }
      return Date.now()
    },
    formatCompletionTimestamp(consult) {
      const timestamp = this.getAppointmentDateValue(consult)
      return new Date(timestamp).toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    formatFollowUpDate(dateStr) {
      if (!dateStr) return 'Not scheduled'
      const dateObj = new Date(dateStr)
      if (Number.isNaN(dateObj)) return dateStr
      return dateObj.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    loadStatistics() {
      // Load statistics from localStorage or calculate from data
      const prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]')
      const uniquePatients = new Set(
        this.allAppointments.map(apt => apt.patientName || apt.patient)
      )
      
      this.doctorStatistics = {
        totalPatients: uniquePatients.size || this.allAppointments.length,
        totalConsultations: this.allAppointments.length,
        totalPrescriptions: prescriptions.length,
        experience: '10' // Can be loaded from profile
      }
    },
    loadDoctorSession() {
      const session = JSON.parse(localStorage.getItem('userSession') || '{}')
      if (session.name) {
        this.doctorInfo = {
          name: session.name,
          specialization: session.specialization || this.doctorInfo.specialization,
          hospital: session.hospital || this.doctorInfo.hospital,
          qualification: session.qualification || this.doctorInfo.qualification,
          email: session.email || this.doctorInfo.email,
          phoneNumber: session.phoneNumber || this.doctorInfo.phoneNumber,
          licenseNumber: session.licenseNumber || this.doctorInfo.licenseNumber
        }
        this.currentUser = {
          name: session.name,
          role: 'Doctor',
          lastLogin: new Date(session.lastLogin || new Date())
        }
      }
    },
    loadAppointments() {
      // Load appointments from patient bookings (localStorage)
      const patientAppointments = JSON.parse(localStorage.getItem('patientAppointments') || '[]')
      
      // Filter appointments for this doctor
      // In a real app, this would filter by doctor ID
      this.allAppointments = patientAppointments
        .filter(apt => apt.type === 'doctor' && apt.doctor)
        .map(apt => ({
          id: apt.id || `apt-${Date.now()}`,
          date: apt.date,
          time: apt.time,
          patientName: apt.patient || 'Unknown Patient',
          patient: apt.patient || 'Unknown Patient',
          patientAge: apt.patientAge || 'N/A',
          patientGender: apt.patientGender || 'N/A',
          patientPhone: apt.patientPhone || apt.contact || 'N/A',
          patientEmail: apt.patientEmail || 'N/A',
          contact: apt.contact || 'N/A',
          symptoms: apt.symptoms || apt.complaint || 'Not specified',
          complaint: apt.complaint || 'Not specified',
          status: apt.status || 'Scheduled',
          completedAt: apt.completedAt || null,
          doctor: apt.doctor
        }))
      
      // If no appointments found, add some demo data
      if (this.allAppointments.length === 0) {
        this.allAppointments = [
          {
            id: 'apt-1',
            date: new Date().toISOString().split('T')[0],
            time: '10:00 AM',
            patientName: 'Ramesh Kumar',
            patient: 'Ramesh Kumar',
            patientAge: '45',
            patientGender: 'Male',
            patientPhone: '+91 98765 43210',
            patientEmail: 'ramesh@example.com',
            symptoms: 'Chest pain and shortness of breath',
            status: 'Scheduled',
            completedAt: null,
            doctor: 'Dr. Sarah Wilson'
          },
          {
            id: 'apt-2',
            date: new Date().toISOString().split('T')[0],
            time: '2:00 PM',
            patientName: 'Priya Singh',
            patient: 'Priya Singh',
            patientAge: '32',
            patientGender: 'Female',
            patientPhone: '+91 98765 43211',
            patientEmail: 'priya@example.com',
            symptoms: 'Headache and dizziness',
            status: 'Confirmed',
            completedAt: null,
            doctor: 'Dr. Sarah Wilson'
          }
        ]
      }
    },
    loadPrescriptionCount() {
      const prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]')
      this.prescriptionsCount = prescriptions.length
      this.prescriptionsList = prescriptions
    },
    handleNavigation(section) {
      this.activeSection = section
      sessionStorage.setItem('doctorActiveSection', section)
    },
    handleSidebarToggle(isCollapsed) {
      // Handle sidebar toggle if needed
      console.log('Sidebar collapsed:', isCollapsed)
    },
    handleLogout() {
      // Clear session
      localStorage.removeItem('userSession')
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userRole')
      sessionStorage.clear()
      
      // Redirect to login
      this.router.push('/login')
    },
    handleSearch(searchData) {
      console.log('Search:', searchData)
      // Implement search functionality
    },
    refreshAppointments() {
      this.loadAppointments()
    },
    handleStartConsultation(patient) {
      this.selectedPatient = patient
      this.showConsultationModal = true
    },
    handleUpdateStatus({ slot, status }) {
      // Update appointment status to "In Progress" when consultation starts
      const appointmentIndex = this.allAppointments.findIndex(apt => apt.id === slot.id)
      if (appointmentIndex >= 0) {
        this.allAppointments[appointmentIndex].status = status
        if (status !== 'Completed') {
          this.allAppointments[appointmentIndex].completedAt = null
        }
        
        // Update in patient appointments too
        const patientAppointments = JSON.parse(localStorage.getItem('patientAppointments') || '[]')
        const patientAptIndex = patientAppointments.findIndex(apt => apt.id === slot.id)
        if (patientAptIndex >= 0) {
          patientAppointments[patientAptIndex].status = status
          if (status !== 'Completed') {
            patientAppointments[patientAptIndex].completedAt = null
          }
          localStorage.setItem('patientAppointments', JSON.stringify(patientAppointments))
        }
      }
    },
    handleFinishConsultation(data) {
      // Finish consultation - mark appointment as completed
      const patient = data.patient || data
      const appointmentIndex = this.allAppointments.findIndex(apt => apt.id === patient.id)
      const completionTimestamp = new Date().toISOString()
      
      if (appointmentIndex >= 0) {
        this.allAppointments[appointmentIndex].status = 'Completed'
        this.allAppointments[appointmentIndex].completedAt = completionTimestamp
        
        // Update in patient appointments too
        const patientAppointments = JSON.parse(localStorage.getItem('patientAppointments') || '[]')
        const patientAptIndex = patientAppointments.findIndex(apt => apt.id === patient.id)
        if (patientAptIndex >= 0) {
          patientAppointments[patientAptIndex].status = 'Completed'
          patientAppointments[patientAptIndex].completedAt = completionTimestamp
          localStorage.setItem('patientAppointments', JSON.stringify(patientAppointments))
        }
      }
      
      // Close consultation modal if open
      if (this.showConsultationModal) {
        this.showConsultationModal = false
        this.selectedPatient = null
      }
      
      // Reload appointments
      this.loadAppointments()
      this.loadStatistics()
      this.loadPrescriptionCount()
      
      // Show success message
      alert('Consultation completed successfully!')
    },
    handleViewDetails(patient) {
      // Show patient details in a modal or navigate
      alert(`Patient: ${patient.patientName}\nDate: ${patient.date}\nTime: ${patient.time}\nSymptoms: ${patient.symptoms}`)
    },
    handleSavePrescription(prescriptionData) {
      // Save prescription to localStorage
      let prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]')
      const completionTimestamp = new Date().toISOString()
      prescriptions.push({
        ...prescriptionData,
        id: `pres-${Date.now()}`,
        createdAt: completionTimestamp,
        completedAt: completionTimestamp
      })
      localStorage.setItem('prescriptions', JSON.stringify(prescriptions))
      
      // Update appointment status
      if (this.selectedPatient) {
        const appointmentIndex = this.allAppointments.findIndex(apt => apt.id === this.selectedPatient.id)
        if (appointmentIndex >= 0) {
          this.allAppointments[appointmentIndex].status = 'Completed'
          this.allAppointments[appointmentIndex].completedAt = completionTimestamp
          
          // Update in patient appointments too
          const patientAppointments = JSON.parse(localStorage.getItem('patientAppointments') || '[]')
          const patientAptIndex = patientAppointments.findIndex(apt => apt.id === this.selectedPatient.id)
          if (patientAptIndex >= 0) {
            patientAppointments[patientAptIndex].status = 'Completed'
            patientAppointments[patientAptIndex].completedAt = completionTimestamp
            localStorage.setItem('patientAppointments', JSON.stringify(patientAppointments))
          }
        }
      }
      
      // Show success message
      alert('Prescription saved successfully! PDF will be generated in the backend.')
      
      // Reload counts
      this.loadPrescriptionCount()
      this.loadAppointments()
      this.loadStatistics()
      
      // In a real app, send prescriptionData to backend for PDF generation
      console.log('Prescription data for PDF generation:', prescriptionData)
    },
    handleUpdateDoctor(updatedDoctor) {
      this.doctorInfo = { ...this.doctorInfo, ...updatedDoctor }
      // Update in localStorage/session
      const session = JSON.parse(localStorage.getItem('userSession') || '{}')
      localStorage.setItem('userSession', JSON.stringify({ ...session, ...updatedDoctor }))
      
      // Update current user
      this.currentUser = {
        ...this.currentUser,
        name: updatedDoctor.name
      }
    },
    handleUpdateStatistics(updatedStats) {
      this.doctorStatistics = { ...this.doctorStatistics, ...updatedStats }
    },
    loadStatistics() {
      // Load statistics from localStorage or calculate from data
      const prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]')
      const uniquePatients = new Set(
        this.allAppointments.map(apt => apt.patientName || apt.patient)
      )
      
      this.doctorStatistics = {
        totalPatients: uniquePatients.size || this.allAppointments.length,
        totalConsultations: this.allAppointments.length,
        totalPrescriptions: prescriptions.length,
        experience: '10' // Can be loaded from profile
      }
    }
  }
}
</script>

<style scoped>
/* Doctor Dashboard specific styles */
</style>

