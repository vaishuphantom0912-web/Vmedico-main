<template>
  <div id="patient-dashboard">
    <PatientPortal 
      :patient-name="patientData.name"
      :patient-profile="patientData.profile"
      :appointments="patientData.appointments"
      :health-metrics="patientData.healthMetrics"
      :lab-reports="patientData.labReports"
      :medications="patientData.medications"

      @book-doctor="handleBookDoctor"
      @book-lab="handleBookLab"
      @view-appointment="handleViewAppointment"
      @view-metrics="handleViewMetrics"
      @download-report="handleDownloadReport"
      @view-reports="handleViewReports"
      @mark-medication="handleMarkMedication"
      @view-medications="handleViewMedications"
      @go-home="handleGoHome"
      @logout="handleLogout"
      @view-profile="handleViewProfile"
    />


  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PatientPortal from '../../components/Patient/PatientPortal.vue'

export default {
  name: 'PatientDashboard',
  components: {
    PatientPortal
  },
  setup() {
    const router = useRouter()
    
    // Patient data with profile information
    const patientData = ref({
      name: 'John Doe',
      profile: {
        patientName: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phoneNumber: '+1234567890',
        dateOfBirth: '1990-01-01',
        bloodGroup: 'O+',
        gender: 'Male'
      },
      appointments: [],
      healthMetrics: [],
      labReports: [],
      medications: []
    })

    // ...existing code...
    const handleBookDoctor = () => {
      router.push('/patient/book-appointments')
    }

    // ...existing code: other handlers ...
    const handleBookLab = () => {
      router.push('/patient/lab-selection')
    }
    const handleViewAppointment = () => { /* ...existing code... */ }
    const handleViewMetrics = () => { /* ...existing code... */ }
    const handleDownloadReport = () => { /* ...existing code... */ }
    const handleViewReports = () => { /* ...existing code... */ }
    const handleMarkMedication = () => { /* ...existing code... */ }
    const handleViewMedications = () => { /* ...existing code... */ }
    const handleGoHome = () => { /* ...existing code... */ }

    const handleLogout = () => {
      // Clear any stored user data/tokens
      localStorage.removeItem('userToken')
      localStorage.removeItem('patientData')
      
      // Redirect to login page
      router.push('/login')
    }

    const handleViewProfile = () => {
      router.push('/patient/profile')
    }

    // Load user data from localStorage on component mount
    onMounted(() => {
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      if (userSession.id && userSession.role === 'patient') {
        patientData.value.name = userSession.patientName || userSession.name || 'Patient'
        patientData.value.profile = {
          patientName: userSession.patientName || 'Patient',
          username: userSession.username || 'patient',
          email: userSession.email || 'patient@example.com',
          phoneNumber: userSession.phoneNumber || '',
          dateOfBirth: userSession.dateOfBirth || '',
          bloodGroup: userSession.bloodGroup || '',
          gender: userSession.gender || ''
        }
      }

      // Load appointments from localStorage
      loadAppointments()
    })

    // Function to load appointments from localStorage
    const loadAppointments = () => {
      const storedAppointments = JSON.parse(localStorage.getItem('patientAppointments') || '[]')
      patientData.value.appointments = storedAppointments.map(apt => ({
        ...apt,
        date: apt.date ? new Date(apt.date) : null
      }))
    }

    // Function to add new appointment
    const addAppointment = (appointmentData) => {
      const newAppointment = {
        id: `apt-${Date.now()}`,
        ...appointmentData,
        date: appointmentData.date || new Date(),
        status: 'Scheduled'
      }
      
      patientData.value.appointments.push(newAppointment)
      
      // Save to localStorage
      const appointmentsToStore = patientData.value.appointments.map(apt => ({
        ...apt,
        date: apt.date ? apt.date.toISOString() : null
      }))
      localStorage.setItem('patientAppointments', JSON.stringify(appointmentsToStore))
    }

    // Check for new appointments from booking pages
    const checkForNewAppointments = () => {
      const newAppointment = JSON.parse(localStorage.getItem('newAppointment') || 'null')
      if (newAppointment) {
        addAppointment(newAppointment)
        localStorage.removeItem('newAppointment')
      }
    }

    // Check for new appointments periodically
    setInterval(checkForNewAppointments, 1000)

    return {
      patientData,
      handleBookDoctor,
      handleBookLab,
      handleViewAppointment,
      handleViewMetrics,
      handleDownloadReport,
      handleViewReports,
      handleMarkMedication,
      handleViewMedications,
      handleGoHome,
      handleLogout,
      handleViewProfile
    }
  }
}
</script>

<style>
/* Global styles */
#patient-dashboard {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Material Design typography */
body {
  margin: 0;
  padding: 0;
  background-color: #f5f6fa;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}


</style>