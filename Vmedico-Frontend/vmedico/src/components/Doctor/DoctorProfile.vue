<template>
  <div class="space-y-6">
    <!-- Doctor Profile Header Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- Doctor Icon -->
            <div class="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-white">{{ doctor.name }}</h2>
              <p class="text-green-100 mt-1">{{ doctor.specialization }}</p>
              <div class="flex items-center space-x-4 mt-2 text-green-100">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  <span>{{ doctor.hospital }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span>{{ doctor.phoneNumber }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>{{ doctor.email }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-end space-y-2">
            <button 
              @click="editing = !editing" 
              :class="editing ? 'bg-gray-600 hover:bg-gray-700' : 'bg-white text-green-600 hover:bg-green-50'"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg v-if="!editing" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              {{ editing ? 'Cancel' : 'Edit Profile' }}
            </button>
            <button 
              v-if="editing" 
              @click="save" 
              class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <!-- Doctor Details Section -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Professional Information -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Professional Information
            </h4>
            <div class="space-y-3">
              <div>
                <label class="text-sm font-medium text-gray-500">Qualification</label>
                <p class="text-sm text-gray-900 mt-1">{{ doctor.qualification || 'N/A' }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500">Specialization</label>
                <p class="text-sm text-gray-900 mt-1">{{ doctor.specialization }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500">Hospital/Clinic</label>
                <p class="text-sm text-gray-900 mt-1">{{ doctor.hospital }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500">License Number</label>
                <p class="text-sm text-gray-900 mt-1">{{ doctor.licenseNumber || 'N/A' }}</p>
              </div>
            </div>
          </div>

          <!-- Contact & Statistics -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Practice Statistics
            </h4>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-green-50 rounded-lg p-4 border border-green-100">
                <div class="text-sm text-gray-600">Total Patients</div>
                <div class="text-2xl font-bold text-green-600 mt-1">{{ statistics.totalPatients || 0 }}</div>
              </div>
              <div class="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div class="text-sm text-gray-600">Consultations</div>
                <div class="text-2xl font-bold text-blue-600 mt-1">{{ statistics.totalConsultations || 0 }}</div>
              </div>
              <div class="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <div class="text-sm text-gray-600">Prescriptions</div>
                <div class="text-2xl font-bold text-purple-600 mt-1">{{ statistics.totalPrescriptions || 0 }}</div>
              </div>
              <div class="bg-orange-50 rounded-lg p-4 border border-orange-100">
                <div class="text-sm text-gray-600">Years of Experience</div>
                <div class="text-2xl font-bold text-orange-600 mt-1">{{ statistics.experience || 'N/A' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Form Modal -->
    <div v-if="editing" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h4 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
        Edit Doctor Profile
      </h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input 
            v-model="form.name" 
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Dr. Sarah Wilson"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
          <input 
            v-model="form.specialization" 
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Cardiology"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
          <input 
            v-model="form.qualification" 
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="MD, MBBS"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Hospital/Clinic</label>
          <input 
            v-model="form.hospital" 
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Central Medical Center"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input 
            v-model="form.phoneNumber" 
            type="tel"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="+91 98765 43210"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input 
            v-model="form.email" 
            type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="sarah.wilson@centralmed.com"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">License Number</label>
          <input 
            v-model="form.licenseNumber" 
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="DR-LIC-12345"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
          <input 
            v-model.number="form.experience" 
            type="number"
            min="0"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="10"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorProfile',
  props: {
    doctor: {
      type: Object,
      required: true
    },
    statistics: {
      type: Object,
      default: () => ({
        totalPatients: 0,
        totalConsultations: 0,
        totalPrescriptions: 0,
        experience: 'N/A'
      })
    }
  },
  data() {
    return {
      editing: false,
      form: {
        name: '',
        specialization: '',
        qualification: '',
        hospital: '',
        phoneNumber: '',
        email: '',
        licenseNumber: '',
        experience: ''
      }
    }
  },
  mounted() {
    this.resetForm()
  },
  methods: {
    resetForm() {
      this.form = {
        name: this.doctor.name || '',
        specialization: this.doctor.specialization || '',
        qualification: this.doctor.qualification || '',
        hospital: this.doctor.hospital || '',
        phoneNumber: this.doctor.phoneNumber || '',
        email: this.doctor.email || '',
        licenseNumber: this.doctor.licenseNumber || '',
        experience: this.statistics.experience || ''
      }
    },
    save() {
      // Validate form
      if (!this.form.name || !this.form.specialization || !this.form.email) {
        alert('Please fill in all required fields (Name, Specialization, Email)')
        return
      }
      
      // Emit update event to parent
      const updatedDoctor = {
        ...this.doctor,
        name: this.form.name,
        specialization: this.form.specialization,
        qualification: this.form.qualification,
        hospital: this.form.hospital,
        phoneNumber: this.form.phoneNumber,
        email: this.form.email,
        licenseNumber: this.form.licenseNumber
      }
      
      this.$emit('update-doctor', updatedDoctor)
      this.$emit('update-statistics', { experience: this.form.experience })
      
      this.editing = false
      this.showSuccessMessage('Doctor profile updated successfully!')
    },
    showSuccessMessage(message) {
      // Create a temporary success notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300'
      notification.textContent = message
      document.body.appendChild(notification)
      
      // Remove after 3 seconds
      setTimeout(() => {
        notification.style.opacity = '0'
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification)
          }
        }, 300)
      }, 3000)
    }
  },
  watch: {
    doctor() {
      this.resetForm()
    },
    editing(newVal) {
      if (newVal) {
        this.resetForm()
      }
    }
  }
}
</script>

<style scoped>
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>



