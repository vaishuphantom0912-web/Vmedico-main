<template>
  <div class="space-y-6">
    <!-- Hospital Profile Header Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- Hospital Icon -->
            <div class="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-white">{{ hospital.name }}</h2>
              <p class="text-blue-100 mt-1">{{ hospital.address }}</p>
              <div class="flex items-center space-x-4 mt-2 text-blue-100">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span>{{ hospital.phone }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>{{ hospital.email }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-end space-y-2">
            <button 
              @click="editing = !editing" 
              :class="editing ? 'bg-gray-600 hover:bg-gray-700' : 'bg-white text-blue-600 hover:bg-blue-50'"
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

      <!-- Hospital Details Section -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Services Offered -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Services Offered
            </h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="(service, i) in hospital.services" 
                :key="i"
                class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
              >
                {{ service }}
              </span>
            </div>
          </div>

          <!-- Operational Metrics -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Operational Metrics
            </h4>
            <div class="space-y-4">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700">Occupancy Rate</span>
                  <span class="text-sm font-bold text-blue-600">{{ hospital.occupancyRate }}%</span>
                </div>
                <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    :style="{ width: hospital.occupancyRate + '%' }" 
                    :class="getOccupancyColor(hospital.occupancyRate)"
                    class="h-full rounded-full transition-all duration-500"
                  ></div>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4 mt-4">
                <div class="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div class="text-sm text-gray-600">Total Beds</div>
                  <div class="text-2xl font-bold text-blue-600 mt-1">{{ hospital.totalBeds }}</div>
                </div>
                <div class="bg-red-50 rounded-lg p-4 border border-red-100">
                  <div class="text-sm text-gray-600">ICU Beds</div>
                  <div class="text-2xl font-bold text-red-600 mt-1">{{ hospital.icuBeds }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Form Modal -->
    <div v-if="editing" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h4 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
        Edit Hospital Profile
      </h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
          <input 
            v-model="form.name" 
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter hospital name"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input 
            v-model="form.address" 
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter hospital address"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input 
            v-model="form.phone" 
            type="tel"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="+91 98765 43210"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input 
            v-model="form.email" 
            type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="info@hospital.com"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Total Beds</label>
          <input 
            v-model.number="form.totalBeds" 
            type="number"
            min="0"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="320"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">ICU Beds</label>
          <input 
            v-model.number="form.icuBeds" 
            type="number"
            min="0"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="30"
          />
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Services (comma separated)</label>
          <input 
            v-model="form.servicesText" 
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Emergency, Cardiology, Neurology, Orthopedics, Pediatrics"
          />
          <p class="text-xs text-gray-500 mt-1">Separate multiple services with commas</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileTab',
  props: {
    hospital: { type: Object, required: true }
  },
  data() {
    return {
      editing: false,
      form: { name: '', phone: '', email: '', totalBeds: 0, servicesText: '', icuBeds: 0, address: '' }
    }
  },
  mounted() {
    this.resetForm()
  },
  methods: {
    resetForm() {
      this.form = {
        name: this.hospital.name || '',
        phone: this.hospital.phone || '',
        email: this.hospital.email || '',
        address: this.hospital.address || '',
        totalBeds: this.hospital.totalBeds || 0,
        servicesText: (this.hospital.services || []).join(', '),
        icuBeds: this.hospital.icuBeds || 0
      }
    },
    save() {
      // Validate form
      if (!this.form.name || !this.form.phone || !this.form.email) {
        alert('Please fill in all required fields (Name, Phone, Email)')
        return
      }
      
      // Copy back into parent hospital object (two-way sync)
      this.hospital.name = this.form.name
      this.hospital.phone = this.form.phone
      this.hospital.email = this.form.email
      this.hospital.address = this.form.address
      this.hospital.totalBeds = this.form.totalBeds
      this.hospital.icuBeds = this.form.icuBeds
      this.hospital.services = this.form.servicesText.split(',').map(s => s.trim()).filter(Boolean)
      this.editing = false
      
      // Show success message
      this.showSuccessMessage('Hospital profile updated successfully!')
    },
    getOccupancyColor(rate) {
      if (rate >= 90) return 'bg-red-500'
      if (rate >= 75) return 'bg-orange-500'
      if (rate >= 50) return 'bg-yellow-500'
      return 'bg-green-500'
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
    hospital() { this.resetForm() }
  }
}
</script>

<style scoped>
</style>

