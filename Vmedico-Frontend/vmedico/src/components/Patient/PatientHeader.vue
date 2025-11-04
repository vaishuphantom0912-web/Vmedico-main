<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Patient Branding - Prominent Rectangle Block -->
        <div class="bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4">
          <div class="flex items-center space-x-4">
            <!-- Patient Logo/Icon -->
            <div class="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
              <span class="material-symbols-rounded text-white text-xl" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">medical_services</span>
            </div>
            
            <!-- Patient Information -->
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ patientInfo.name }}</h1>
              <div class="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span class="font-medium">PATIENT-ID: {{ patientInfo.patientId }}</span>
                <span v-if="patientInfo.bloodGroup" class="font-medium">Blood Group: {{ patientInfo.bloodGroup }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Search and User Actions -->
        <div class="flex items-center space-x-6">
          <!-- Search Bar -->
          <div class="relative hidden md:block">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="material-symbols-rounded text-gray-400 text-sm" aria-hidden="true">search</span>
            </div>
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Search by name, email, phone, tests..."
              class="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-sm"
            />
          </div>

          <!-- User Info -->
          <div class="flex items-center space-x-4">
            <div class="text-right hidden md:block">
              <p class="text-sm font-medium text-gray-800">{{ currentUser.name }}</p>
              <p class="text-xs text-gray-500">{{ currentUser.lastLogin || 'Patient' }}</p>
            </div>
            
            <!-- User Avatar -->
            <div class="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-medium shadow-md">
              {{ getInitials(currentUser.name) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PatientHeader',
  props: {
    patientInfo: {
      type: Object,
      default: () => ({
        name: 'John Doe',
        patientId: 'PAT-001',
        bloodGroup: 'O+'
      })
    },
    currentUser: {
      type: Object,
      default: () => ({
        name: 'John Doe',
        lastLogin: 'Just now'
      })
    }
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery)
    },
    getInitials(name) {
      if (!name) return 'P'
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2)
    }
  }
}
</script>

<style scoped>
/* Header specific styles */
</style>

