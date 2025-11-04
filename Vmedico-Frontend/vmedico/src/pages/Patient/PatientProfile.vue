<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Left: Back to Dashboard -->
          <div class="flex items-center">
            <button 
              @click="goBackToDashboard"
              class="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <span class="material-symbols-rounded" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">arrow_back</span>
              <span class="font-semibold text-lg">Back to Dashboard</span>
            </button>
          </div>
          
          <!-- Center: Page Title -->
          <div class="text-center">
            <h1 class="text-xl font-bold text-gray-800">Patient Profile</h1>
            <p class="text-sm text-gray-600">Manage your personal information</p>
          </div>
          
          <!-- Right: Logout Button -->
          <div class="flex items-center gap-2">
            <button 
              @click="handleLogout"
              class="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <span class="material-symbols-rounded" style="font-variation-settings:'OPSZ' 20, 'wght' 600" aria-hidden="true">logout</span>
              <span class="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Profile Information Card -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span class="material-symbols-rounded text-blue-600" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">account_circle</span>
            Personal Information
          </h2>
        </div>

        <div class="p-6">
          <form @submit.prevent="saveProfile" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Patient Name -->
              <div>
                <label class="block text-sm font-medium text-blue-700 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-rounded text-blue-700" aria-hidden="true">badge</span>
                    <span>Patient Name</span>
                  </span>
                </label>
                <input 
                  type="text" 
                  v-model="profileData.patientName"
                  :disabled="!isEditing"
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600" 
                />
              </div>

              <!-- Username -->
              <div>
                <label class="block text-sm font-medium text-blue-700 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-rounded text-blue-700" aria-hidden="true">account_circle</span>
                    <span>Username</span>
                  </span>
                </label>
                <input 
                  type="text" 
                  v-model="profileData.username"
                  disabled
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 bg-gray-50 text-gray-600" 
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-blue-700 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-rounded text-blue-700" aria-hidden="true">mail</span>
                    <span>Email</span>
                  </span>
                </label>
                <input 
                  type="email" 
                  v-model="profileData.email"
                  :disabled="!isEditing"
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600" 
                />
              </div>

              <!-- Phone Number -->
              <div>
                <label class="block text-sm font-medium text-blue-700 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-rounded text-blue-700" aria-hidden="true">call</span>
                    <span>Phone Number</span>
                  </span>
                </label>
                <input 
                  type="tel" 
                  v-model="profileData.phoneNumber"
                  :disabled="!isEditing"
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600" 
                />
              </div>

              <!-- Date of Birth -->
              <div>
                <label class="block text-sm font-medium text-blue-700 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-rounded text-blue-700" aria-hidden="true">calendar_month</span>
                    <span>Date of Birth</span>
                  </span>
                </label>
                <input 
                  type="date" 
                  v-model="profileData.dateOfBirth"
                  :disabled="!isEditing"
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600" 
                />
              </div>

              <!-- Blood Group -->
              <div>
                <label class="block text-sm font-medium text-blue-700 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-rounded text-blue-700" aria-hidden="true">bloodtype</span>
                    <span>Blood Group</span>
                  </span>
                </label>
                <select 
                  v-model="profileData.bloodGroup"
                  :disabled="!isEditing"
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
                >
                  <option value="">Select Blood Group</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <!-- Gender -->
              <div>
                <label class="block text-sm font-medium text-blue-700 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-rounded text-blue-700" aria-hidden="true">face_6</span>
                    <span>Gender</span>
                  </span>
                </label>
                <select 
                  v-model="profileData.gender"
                  :disabled="!isEditing"
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <!-- Password Change (only when editing) -->
              <div v-if="isEditing" class="md:col-span-2">
                <label class="block text-sm font-medium text-blue-700 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-rounded text-blue-700" aria-hidden="true">lock</span>
                    <span>New Password (leave blank to keep current)</span>
                  </span>
                </label>
                <input 
                  type="password" 
                  v-model="profileData.newPassword"
                  placeholder="Enter new password"
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <button 
                v-if="!isEditing"
                type="button"
                @click="startEditing"
                class="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <span class="material-symbols-rounded text-sm" aria-hidden="true">edit</span>
                Edit Profile
              </button>
              <template v-if="isEditing">
                <button 
                  type="button"
                  @click="cancelEditing"
                  class="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  class="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <span class="material-symbols-rounded text-sm" aria-hidden="true">save</span>
                  Save Changes
                </button>
              </template>
            </div>
          </form>
        </div>
      </div>

      <!-- Past Consultations Section -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span class="material-symbols-rounded text-blue-600" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">history</span>
            Past Consultations
          </h2>
        </div>

        <div class="p-6">
          <div v-if="pastConsultations.length === 0" class="text-center py-8 text-gray-500">
            <span class="material-symbols-rounded text-4xl mb-2 block" style="font-variation-settings:'OPSZ' 48, 'wght' 300" aria-hidden="true">history</span>
            <p>No past consultations found</p>
          </div>
          <div v-else class="space-y-4">
            <div 
              v-for="consultation in pastConsultations" 
              :key="consultation.id"
              class="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div class="flex items-start justify-between">
                <div class="flex items-start gap-4">
                  <div class="p-2 bg-blue-100 rounded-lg">
                    <span class="material-symbols-rounded text-blue-600" style="font-variation-settings:'OPSZ' 20, 'wght' 600" aria-hidden="true">
                      {{ consultation.type === 'doctor' ? 'person' : 'science' }}
                    </span>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-800">{{ consultation.doctor || consultation.service }}</h4>
                    <p v-if="consultation.specialty" class="text-sm text-gray-600">{{ consultation.specialty }}</p>
                    <p class="text-sm text-gray-500 mt-1">{{ consultation.date }}</p>
                    <p v-if="consultation.diagnosis" class="text-sm text-gray-700 mt-2">
                      <span class="font-medium">Diagnosis:</span> {{ consultation.diagnosis }}
                    </p>
                    <p v-if="consultation.prescription" class="text-sm text-gray-700 mt-1">
                      <span class="font-medium">Prescription:</span> {{ consultation.prescription }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-1 text-xs font-medium rounded-full" 
                        :class="consultation.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                    {{ consultation.status }}
                  </span>
                  <button 
                    @click="viewConsultationDetails(consultation)"
                    class="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    <span class="material-symbols-rounded text-sm" aria-hidden="true">visibility</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'PatientProfile',
  setup() {
    const router = useRouter()
    const isEditing = ref(false)
    
    const profileData = reactive({
      patientName: '',
      username: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      bloodGroup: '',
      gender: '',
      newPassword: ''
    })

    const pastConsultations = ref([
      {
        id: 'past-1',
        doctor: 'Dr. Michael Chen',
        specialty: 'General Medicine',
        date: 'October 15, 2024',
        status: 'Completed',
        type: 'doctor',
        diagnosis: 'Common cold, mild fever',
        prescription: 'Paracetamol 500mg, Rest for 3 days'
      },
      {
        id: 'past-2',
        doctor: 'Dr. Emily Rodriguez',
        specialty: 'Dermatology',
        date: 'September 28, 2024',
        status: 'Completed',
        type: 'doctor',
        diagnosis: 'Mild eczema',
        prescription: 'Hydrocortisone cream, Moisturizer'
      },
      {
        id: 'past-3',
        service: 'Blood Test - Complete Blood Count',
        date: 'September 20, 2024',
        status: 'Completed',
        type: 'lab',
        diagnosis: 'Normal results',
        prescription: 'No action required'
      },
      {
        id: 'past-4',
        doctor: 'Dr. Sarah Wilson',
        specialty: 'Cardiology',
        date: 'August 10, 2024',
        status: 'Completed',
        type: 'doctor',
        diagnosis: 'Routine checkup - Heart healthy',
        prescription: 'Continue regular exercise'
      }
    ])

    // Load user data from localStorage on component mount
    onMounted(() => {
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      if (userSession.id && userSession.role === 'patient') {
        Object.assign(profileData, {
          patientName: userSession.patientName || 'Patient',
          username: userSession.username || 'patient',
          email: userSession.email || 'patient@example.com',
          phoneNumber: userSession.phoneNumber || '',
          dateOfBirth: userSession.dateOfBirth || '',
          bloodGroup: userSession.bloodGroup || '',
          gender: userSession.gender || ''
        })
      } else {
        // Default data if no session
        Object.assign(profileData, {
          patientName: 'John Doe',
          username: 'johndoe',
          email: 'john@example.com',
          phoneNumber: '+1234567890',
          dateOfBirth: '1990-01-01',
          bloodGroup: 'O+',
          gender: 'Male'
        })
      }
    })

    const goBackToDashboard = () => {
      router.push('/patient-dashboard')
    }

    const handleLogout = () => {
      // Clear any stored user data/tokens
      localStorage.removeItem('userToken')
      localStorage.removeItem('patientData')
      localStorage.removeItem('userSession')
      
      // Redirect to login page
      router.push('/login')
    }

    const startEditing = () => {
      isEditing.value = true
    }

    const cancelEditing = () => {
      isEditing.value = false
      profileData.newPassword = ''
      
      // Reset to original data
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      if (userSession.id) {
        Object.assign(profileData, {
          patientName: userSession.patientName || 'Patient',
          username: userSession.username || 'patient',
          email: userSession.email || 'patient@example.com',
          phoneNumber: userSession.phoneNumber || '',
          dateOfBirth: userSession.dateOfBirth || '',
          bloodGroup: userSession.bloodGroup || '',
          gender: userSession.gender || ''
        })
      }
    }

    const saveProfile = () => {
      // Validate required fields
      const requiredFields = ['patientName', 'email', 'phoneNumber', 'dateOfBirth', 'bloodGroup', 'gender']
      const missingFields = requiredFields.filter(field => !profileData[field])
      
      if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`)
        return
      }

      // Prepare update data
      const updateData = {
        patientName: profileData.patientName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        dateOfBirth: profileData.dateOfBirth,
        bloodGroup: profileData.bloodGroup,
        gender: profileData.gender
      }

      // Include password if provided
      if (profileData.newPassword.trim()) {
        updateData.password = profileData.newPassword
      }

      // Update localStorage
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      if (userSession.id) {
        Object.assign(userSession, updateData)
        localStorage.setItem('userSession', JSON.stringify(userSession))
      }
      
      // Update registered users data if it exists
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const userIndex = registeredUsers.findIndex(user => user.username === profileData.username)
      if (userIndex !== -1) {
        Object.assign(registeredUsers[userIndex].userData, updateData)
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
      }
      
      // Close editing mode and reset password field
      isEditing.value = false
      profileData.newPassword = ''
      
      alert('Profile updated successfully!')
    }

    const viewConsultationDetails = (consultation) => {
      // Show detailed view of the consultation
      const details = `
Consultation Details:
${consultation.doctor || consultation.service}
${consultation.specialty ? consultation.specialty : ''}
Date: ${consultation.date}
Status: ${consultation.status}

Diagnosis: ${consultation.diagnosis || 'N/A'}
Prescription: ${consultation.prescription || 'N/A'}
      `
      alert(details)
    }

    return {
      profileData,
      pastConsultations,
      isEditing,
      goBackToDashboard,
      handleLogout,
      startEditing,
      cancelEditing,
      saveProfile,
      viewConsultationDetails
    }
  }
}
</script>

<style scoped>
/* Smooth transitions for all interactive elements */
.transition-colors {
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
}

.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}

/* Material Design elevation on hover */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>