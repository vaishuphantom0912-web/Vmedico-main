<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Doctor Branding -->
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-3">
            <!-- Doctor Logo/Icon -->
            <div class="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            
            <!-- Doctor Information -->
            <div>
              <h1 class="text-xl font-bold text-gray-900">{{ doctorInfo.name }}</h1>
              <div class="flex items-center space-x-4 text-sm text-gray-600">
                <span class="font-medium">{{ doctorInfo.specialization }}</span>
                <span class="font-medium">{{ doctorInfo.hospital }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Search and User Actions -->
        <div class="flex items-center space-x-6">
          <!-- Global Search -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search patients..."
              class="block w-80 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              @keyup.enter="performSearch"
              @input="handleSearchInput"
            />
          </div>
          
          <!-- Session Security Indicator -->
          <div class="flex items-center space-x-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="font-medium">Secure Session</span>
          </div>
          
          <!-- User Profile -->
          <div class="flex items-center space-x-3">
            <!-- User Info -->
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ currentUser.name }}</div>
              <div class="text-xs text-gray-500">{{ currentUser.role }}</div>
              <div class="text-xs text-gray-400">Last login: {{ formatLastLogin }}</div>
            </div>
            
            <!-- User Avatar -->
            <div class="w-10 h-10 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center shadow-sm">
              <span class="text-sm font-bold text-white">{{ userInitials }}</span>
            </div>
            
            <!-- Logout Button -->
            <button
              @click="confirmLogout"
              class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              title="Logout"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showLogoutConfirm = false">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6" @click.stop>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Confirm Logout</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to logout? Your session will be securely terminated.</p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showLogoutConfirm = false" 
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button 
            @click="handleLogout" 
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'DoctorHeader',
  props: {
    doctorInfo: {
      type: Object,
      required: true,
      default: () => ({
        name: 'Dr. Sarah Wilson',
        specialization: 'Cardiology',
        hospital: 'Central Medical Center'
      })
    },
    currentUser: {
      type: Object,
      required: true,
      default: () => ({
        name: 'Dr. Sarah Wilson',
        role: 'Doctor',
        lastLogin: new Date()
      })
    }
  },
  data() {
    return {
      searchQuery: '',
      showLogoutConfirm: false,
      searchTimeout: null
    }
  },
  computed: {
    userInitials() {
      const name = this.currentUser.name || ''
      const parts = name.split(' ')
      if (parts.length >= 2) {
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase()
      }
      return name.charAt(0).toUpperCase() + (name.charAt(1) || '').toUpperCase()
    },
    formatLastLogin() {
      if (!this.currentUser.lastLogin) return 'Never'
      const date = new Date(this.currentUser.lastLogin)
      const now = new Date()
      const diffMs = now - date
      const diffMins = Math.floor(diffMs / 60000)
      
      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins} mins ago`
      if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`
      return date.toLocaleDateString()
    }
  },
  methods: {
    handleSearchInput() {
      // Clear previous timeout
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      
      // Debounce search
      this.searchTimeout = setTimeout(() => {
        if (this.searchQuery.trim().length >= 2) {
          this.performSearch()
        }
      }, 300)
    },
    
    performSearch() {
      if (!this.searchQuery.trim()) return
      
      // Emit search event to parent component
      this.$emit('search', {
        query: this.searchQuery.trim(),
        types: ['patients', 'appointments']
      })
    },
    
    confirmLogout() {
      this.showLogoutConfirm = true
    },
    
    handleLogout() {
      // Secure session termination
      this.showLogoutConfirm = false
      
      // Clear any pending timeouts
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      
      // Emit logout event to parent component
      this.$emit('logout', {
        reason: 'user_initiated',
        timestamp: new Date().toISOString()
      })
    }
  },
  beforeUnmount() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }
  }
}
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>



