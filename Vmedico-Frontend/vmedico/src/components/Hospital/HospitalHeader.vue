<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Hospital Branding -->
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-3">
            <!-- Hospital Logo/Icon -->
            <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            
            <!-- Hospital Information -->
            <div>
              <h1 class="text-xl font-bold text-gray-900">{{ hospitalInfo.name }}</h1>
              <div class="flex items-center space-x-4 text-sm text-gray-600">
                <span class="font-medium">HOSPITAL-ID: {{ hospitalInfo.hospitalId }}</span>
                <span class="font-medium">License: {{ hospitalInfo.license }}</span>
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
              placeholder="Search by name, email, phone, patients, staff..."
              class="block w-80 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              @keyup.enter="performSearch"
              @input="handleSearchInput"
            />
            <!-- Search Results Dropdown -->
            <div v-if="showSearchResults && searchResults.length > 0" class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              <div v-for="result in searchResults" :key="result.id" class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0" @click="selectSearchResult(result)">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ result.title }}</div>
                    <div class="text-xs text-gray-500">{{ result.subtitle }}</div>
                  </div>
                  <span class="text-xs px-2 py-1 rounded-full" :class="getSearchResultBadgeClass(result.type)">
                    {{ result.type }}
                  </span>
                </div>
              </div>
            </div>
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
            <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
              <span class="text-sm font-bold text-white">{{ userInitials }}</span>
            </div>
            
            <!-- Logout Button -->
            <button
              @click="confirmLogout"
              class="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
              title="Secure Logout"
            >
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Confirm Secure Logout</h3>
        </div>
        <p class="text-gray-600 mb-6">Are you sure you want to logout? This will terminate your secure hospital administrator session.</p>
        <div class="flex space-x-3">
          <button
            @click="handleLogout"
            class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Yes, Logout
          </button>
          <button
            @click="showLogoutConfirm = false"
            class="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HospitalHeader',
  props: {
    hospitalInfo: {
      type: Object,
      required: true,
      validator(value) {
        return value && value.name && value.hospitalId && value.license
      }
    },
    currentUser: {
      type: Object,
      required: true,
      validator(value) {
        return value && value.name && value.role && value.lastLogin
      }
    }
  },
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      showSearchResults: false,
      showLogoutConfirm: false,
      searchTimeout: null,
      
      // Patient Database - This would normally come from an API
      patientDatabase: [
        { id: 'P-1001', name: 'Ramesh Kumar', email: 'ramesh.kumar@email.com', phone: '+91 98765 43210' },
        { id: 'P-1002', name: 'Priya Singh', email: 'priya.singh@email.com', phone: '+91 98765 43211' },
        { id: 'P-1003', name: 'Suresh Patel', email: 'suresh.patel@email.com', phone: '+91 98765 43212' }
      ],
      
      // Staff Database
      staffDatabase: [
        { id: 'S-001', name: 'Dr. Alice', email: 'alice@hospital.com', phone: '+91 91234 56789', role: 'Cardiologist' },
        { id: 'S-002', name: 'Dr. Anita', email: 'anita@hospital.com', phone: '+91 99876 54321', role: 'ICU Consultant' },
        { id: 'S-003', name: 'Nurse Kumar', email: 'kumar@hospital.com', phone: '+91 90000 11111', role: 'Head Nurse' }
      ]
    }
  },
  computed: {
    userInitials() {
      return this.currentUser.name
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    },
    
    formatLastLogin() {
      if (!this.currentUser.lastLogin) return 'Unknown'
      
      const lastLogin = new Date(this.currentUser.lastLogin)
      const now = new Date()
      const diffInMinutes = Math.floor((now - lastLogin) / (1000 * 60))
      
      if (diffInMinutes < 1) return 'Just now'
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
      return lastLogin.toLocaleDateString()
    }
  },
  
  mounted() {
    // Verify hospital administrator authentication on component mount
    this.verifyHospitalAdministrator()
    
    // Add click outside listener for search results
    document.addEventListener('click', this.handleClickOutside)
  },
  
  beforeUnmount() {
    // Clean up event listeners and timeouts
    document.removeEventListener('click', this.handleClickOutside)
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }
  },
  
  methods: {
    verifyHospitalAdministrator() {
      // Verify user is authorized Hospital Administrator
      if (!this.currentUser || this.currentUser.role !== 'Hospital Administrator') {
        console.warn('Unauthorized access attempt detected')
        this.$emit('unauthorized-access')
        return false
      }
      return true
    },
    
    handleSearchInput() {
      // Clear previous timeout
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      
      // Debounce search to avoid excessive API calls
      this.searchTimeout = setTimeout(() => {
        if (this.searchQuery.trim().length >= 2) {
          this.performSearch()
        } else {
          this.clearSearchResults()
        }
      }, 300)
    },
    
    performSearch() {
      if (!this.searchQuery.trim()) {
        this.clearSearchResults()
        return
      }
      
      // Emit search event to parent component for API integration
      this.$emit('search', {
        query: this.searchQuery.trim(),
        types: ['patients', 'staff', 'appointments']
      })
      
      // Search through actual data
      this.searchHospitalData()
    },
    
    searchHospitalData() {
      const query = this.searchQuery.toLowerCase().trim()
      let results = []
      
      // Search Patients by name, email, or phone
      const patientResults = this.patientDatabase.filter(patient => {
        return patient.name.toLowerCase().includes(query) ||
               patient.email.toLowerCase().includes(query) ||
               patient.phone.includes(query) ||
               patient.phone.replace(/\s+/g, '').includes(query.replace(/\s+/g, ''))
      }).map(patient => ({
        id: patient.id,
        title: patient.name,
        subtitle: `${patient.email} • ${patient.phone}`,
        type: 'Patient',
        data: patient
      }))
      
      // Search Staff
      const staffResults = this.staffDatabase.filter(staff => 
        staff.name.toLowerCase().includes(query) ||
        staff.email.toLowerCase().includes(query) ||
        staff.role.toLowerCase().includes(query)
      ).map(staff => ({
        id: staff.id,
        title: staff.name,
        subtitle: `${staff.role} • ${staff.email}`,
        type: 'Staff',
        data: staff
      }))
      
      // Combine all results
      results = [...patientResults, ...staffResults]
      
      this.searchResults = results.slice(0, 8) // Limit to 8 results
      this.showSearchResults = this.searchResults.length > 0
    },
    
    selectSearchResult(result) {
      // Handle search result selection
      this.searchQuery = result.title
      this.clearSearchResults()
      
      // Emit the selection event
      this.$emit('search-select', {
        ...result,
        fullData: result.data
      })
      
      console.log('Search result selected:', result)
    },
    
    clearSearchResults() {
      this.searchResults = []
      this.showSearchResults = false
    },
    
    getSearchResultBadgeClass(type) {
      const classes = {
        'Patient': 'bg-blue-100 text-blue-800',
        'Staff': 'bg-green-100 text-green-800'
      }
      return classes[type] || 'bg-gray-100 text-gray-800'
    },
    
    handleClickOutside(event) {
      // Close search results when clicking outside
      if (!this.$el.contains(event.target)) {
        this.clearSearchResults()
      }
    },
    
    confirmLogout() {
      // Show logout confirmation modal for security
      this.showLogoutConfirm = true
    },
    
    handleLogout() {
      // Secure session termination
      this.showLogoutConfirm = false
      
      // Clear any pending timeouts
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      
      // Emit logout event to parent component for proper handling
      this.$emit('logout', {
        reason: 'user_initiated',
        timestamp: new Date().toISOString()
      })
    }
  }
}
</script>

<style scoped>
/* Header specific styles */
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

/* Search input focus styles */
.search-input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Smooth transitions for interactive elements */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar for search results */
.max-h-64::-webkit-scrollbar {
  width: 6px;
}

.max-h-64::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.max-h-64::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.max-h-64::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Modal backdrop blur effect */
.fixed.inset-0 {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Enhanced button hover effects */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}
</style>



