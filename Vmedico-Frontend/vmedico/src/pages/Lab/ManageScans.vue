<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Lab Dashboard Container -->
    <div class="flex">
      <!-- Sidebar Navigation -->
      <LabSidebar 
        :active-section="'scans'"
        @navigate="handleNavigation"
        @logout="handleLogout"
        @sidebar-toggle="handleSidebarToggle"
      />
      
      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col">
        <!-- Header -->
        <LabHeader 
          :lab-info="labInfo"
          :current-user="currentUser"
          @logout="handleLogout"
          @search="handleSearch"
          @search-select="handleSearchSelect"
          @unauthorized-access="handleUnauthorizedAccess"
        />
        
        <!-- Page Content -->
        <main class="flex-1 p-6">
          <!-- Page Header -->
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-semibold text-gray-900">Manage Scans</h1>
            <div class="flex items-center space-x-3">
              <button
                @click="showNewScanModal = true"
                class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                New Scan
              </button>
            </div>
          </div>

          <!-- Statistics Cards (3 cards, no Available Rooms) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="text-3xl font-bold text-gray-900">{{ scanStats.total }}</div>
              <div class="text-sm text-gray-500">Total Scan Types</div>
            </div>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="text-3xl font-bold text-gray-900">{{ scanStats.pendingApproval }}</div>
              <div class="text-sm text-gray-500">Pending Approval</div>
            </div>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="text-3xl font-bold text-gray-900">{{ scanStats.disabled }}</div>
              <div class="text-sm text-gray-500">Disabled</div>
            </div>
          </div>

          <!-- Filters and Search -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div class="p-6">
              <div class="flex flex-wrap items-center gap-4">
                <!-- Search -->
                <div class="flex-1 min-w-64">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search scans by name, code..."
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    @input="filterScans"
                  />
                </div>
                
                <!-- Status Filter -->
                <div class="min-w-32">
                  <select
                    v-model="statusFilter"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    @change="filterScans"
                  >
                    <option value="">Status: Any</option>
                    <option value="Active">Active</option>
                    <option value="Disabled">Disabled</option>
                    <option value="Pending">Pending Approval</option>
                  </select>
                </div>
                
                <!-- Modality Filter -->
                <div class="min-w-32">
                  <select
                    v-model="modalityFilter"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    @change="filterScans"
                  >
                    <option value="">Modality: All</option>
                    <option value="CT">CT</option>
                    <option value="MRI">MRI</option>
                    <option value="Ultrasound">Ultrasound</option>
                    <option value="X-Ray">X-Ray</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Scans Table -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scan
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Modality
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="scan in filteredScans" :key="scan.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ scan.name }}</div>
                        <div class="text-sm text-gray-500">{{ scan.room }} • Price: Rs.{{ scan.basePrice }}</div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ scan.code }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ scan.modality }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusClass(scan.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                        {{ scan.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        @click="editScan(scan)"
                        class="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        v-if="scan.status === 'Active'"
                        @click="disableScan(scan)"
                        class="text-red-600 hover:text-red-900"
                      >
                        Disable
                      </button>
                      <button
                        v-else
                        @click="enableScan(scan)"
                        class="text-green-600 hover:text-green-900"
                      >
                        Enable
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <!-- Empty State -->
              <div v-if="filteredScans.length === 0" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No scans found</h3>
                <p class="mt-1 text-sm text-gray-500">
                  {{ scans.length === 0 ? 'Get started by creating a new scan.' : 'Try adjusting your search or filter criteria.' }}
                </p>
              </div>
            </div>
            
            <!-- Pagination Footer -->
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div class="flex-1 flex justify-between sm:hidden">
                <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    {{ filteredScans.length }} results
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Prev
                    </button>
                    <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      Page 1 of 1
                    </span>
                    <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    
    <!-- New Scan Modal -->
    <NewScanModal 
      :is-visible="showNewScanModal"
      @close="showNewScanModal = false"
      @scan-created="handleScanCreated"
    />
  </div>
</template>

<script>
import LabHeader from '../../components/Lab/LabHeader.vue'
import LabSidebar from '../../components/Lab/LabSidebar.vue'
import NewScanModal from '../../components/Lab/NewScanModal.vue'

export default {
  name: 'ManageScans',
  components: {
    LabHeader,
    LabSidebar,
    NewScanModal
  },
  data() {
    return {
      showNewScanModal: false,
      searchQuery: '',
      statusFilter: '',
      modalityFilter: '',
      
      // Lab Information
      labInfo: {
        name: 'Nova Diagnostics',
        labId: 'LAB-79378',
        license: 'LIC-9583',
        address: '456 Medical Plaza, Healthcare District',
        phone: '+91 98765 43210',
        email: 'admin@novadiagnostics.com'
      },
      
      // Current User
      currentUser: {
        name: 'Dr. Aria Stone',
        role: 'Lab Administrator',
        email: 'aria.stone@novadiagnostics.com',
        lastLogin: new Date()
      },
      
      // Scans Data - will be populated based on user type
      scans: []
    }
  },
  computed: {
    scanStats() {
      return {
        total: this.scans.length,
        pendingApproval: this.scans.filter(scan => scan.status === 'Pending').length,
        disabled: this.scans.filter(scan => scan.status === 'Disabled').length
      }
    },
    
    filteredScans() {
      let filtered = [...this.scans]
      
      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(scan => 
          scan.name.toLowerCase().includes(query) ||
          scan.code.toLowerCase().includes(query)
        )
      }
      
      // Status filter
      if (this.statusFilter) {
        filtered = filtered.filter(scan => scan.status === this.statusFilter)
      }
      
      // Modality filter
      if (this.modalityFilter) {
        filtered = filtered.filter(scan => scan.modality === this.modalityFilter)
      }
      
      return filtered
    }
  },
  
  mounted() {
    this.loadUserSession()
  },
  
  methods: {
    loadUserSession() {
      // Load user session data from localStorage
      const userSession = localStorage.getItem('userSession')
      if (userSession) {
        try {
          const userData = JSON.parse(userSession)
          
          // Update lab info with registered data
          if (userData.role === 'lab') {
            this.labInfo = {
              name: userData.labName || 'Nova Diagnostics',
              labId: `LAB-${userData.id.toString().slice(-5)}`,
              license: `LIC-${Math.random().toString().slice(-4)}`,
              address: '456 Medical Plaza, Healthcare District',
              phone: userData.phoneNumber || '+91 98765 43210',
              email: userData.email || 'admin@novadiagnostics.com'
            }
            
            // Update current user info with correct role
            this.currentUser = {
              name: (userData.labName || 'Nova Diagnostics') + ' Administrator',
              role: 'Lab Administrator',
              email: userData.email || 'admin@novadiagnostics.com',
              lastLogin: new Date()
            }
            
            // Load appropriate data based on user type
            this.loadScansData(userData)
          }
        } catch (error) {
          console.error('Error loading user session:', error)
        }
      }
    },
    
    loadScansData(userData) {
      // Check if this is the demo user or a newly registered user
      const isDemoUser = userData.id === 'demo-lab' || userData.username === 'lab'
      
      if (isDemoUser) {
        // Load demo scans for Nova Diagnostics demo user
        this.scans = [
          {
            id: 'SCAN-001',
            name: 'CT Head Without Contrast',
            code: 'CT-1001',
            modality: 'CT',
            room: 'CT Room 2',
            status: 'Active',
            basePrice: 450.00,
            createdAt: '2024-10-25'
          },
          {
            id: 'SCAN-002',
            name: 'MRI Brain With Contrast',
            code: 'MRI-2030',
            modality: 'MRI',
            room: 'MRI Suite 1',
            status: 'Active',
            basePrice: 850.00,
            createdAt: '2024-10-20'
          },
          {
            id: 'SCAN-003',
            name: 'Abdominal Ultrasound',
            code: 'USG-088',
            modality: 'Ultrasound',
            room: 'USG Room 1',
            status: 'Disabled',
            basePrice: 180.00,
            createdAt: '2024-10-18'
          },
          {
            id: 'SCAN-004',
            name: 'Chest X-Ray PA View',
            code: 'XR-555',
            modality: 'X-Ray',
            room: 'X-Ray Room 3',
            status: 'Active',
            basePrice: 65.00,
            createdAt: '2024-10-22'
          }
        ]
      } else {
        // Load saved scans for registered users
        const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
        const userId = userSession.id
        const savedScans = JSON.parse(localStorage.getItem(`labScans_${userId}`) || '[]')
        this.scans = savedScans
      }
    },
    
    handleNavigation(section) {
      // Navigate to different sections
      switch (section) {
        case 'dashboard':
          this.$router.push('/lab-dashboard')
          break
        case 'slots':
          this.$router.push('/lab/manage-slots')
          break
        case 'tests':
          this.$router.push('/lab/manage-tests')
          break
        case 'scans':
          // Already on scans page
          break
        case 'reports':
          this.$router.push('/lab/manage-reports')
          break
        case 'admin-profile':
          this.$router.push('/lab/admin-profile')
          break
      }
    },
    
    handleLogout(logoutData) {
      // Requirement 8.5: Secure session termination
      console.log('Processing secure logout:', logoutData)
      
      // Clear all session data
      localStorage.removeItem('labAdminSession')
      sessionStorage.clear()
      
      // Log security event for audit purposes
      this.logSecurityEvent('logout', {
        user: this.currentUser.name,
        reason: logoutData?.reason || 'user_initiated',
        timestamp: logoutData?.timestamp || new Date().toISOString()
      })
      
      // Redirect to login with logout confirmation
      this.$router.push({
        path: '/login',
        query: { 
          message: 'You have been securely logged out',
          type: 'success'
        }
      })
    },
    
    logSecurityEvent(eventType, eventData) {
      // Log security events for audit purposes
      const securityLog = {
        type: eventType,
        timestamp: new Date().toISOString(),
        labId: this.labInfo.labId,
        ...eventData
      }
      
      console.log('Security Event:', securityLog)
      
      // Store in localStorage for demonstration
      const existingLogs = JSON.parse(localStorage.getItem('labSecurityLogs') || '[]')
      existingLogs.push(securityLog)
      
      // Keep only last 100 logs
      if (existingLogs.length > 100) {
        existingLogs.splice(0, existingLogs.length - 100)
      }
      
      localStorage.setItem('labSecurityLogs', JSON.stringify(existingLogs))
    },
    
    handleSearch(searchData) {
      console.log('Search:', searchData)
    },
    
    handleSearchSelect(result) {
      console.log('Search result selected:', result)
    },
    
    handleUnauthorizedAccess() {
      // Requirement 8.1, 8.3: Handle unauthorized access attempts
      console.warn('Unauthorized access attempt detected')
      
      // Log security event
      this.logSecurityEvent('unauthorized_access', {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        currentUser: this.currentUser?.name || 'Unknown'
      })
      
      // Force logout and redirect to login
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
    
    filterScans() {
      // Filtering is handled by computed property
    },
    
    handleScanCreated(scanData) {
      // Add new scan to the list
      this.scans.unshift({
        ...scanData,
        createdAt: new Date().toISOString().split('T')[0]
      })
      
      // Save updated scans data
      this.saveScansData()
      
      console.log('New scan created:', scanData)
    },
    
    saveScansData() {
      // Save scans data for the logged-in user
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      const userId = userSession.id
      
      if (userId && userId !== 'demo-lab') {
        localStorage.setItem(`labScans_${userId}`, JSON.stringify(this.scans))
        console.log('Scans data saved for user:', userId)
      }
    },
    
    editScan(scan) {
      console.log('Edit scan:', scan.id)
      // In real implementation, this would open edit modal or navigate to edit page
    },
    
    disableScan(scan) {
      const index = this.scans.findIndex(s => s.id === scan.id)
      if (index !== -1) {
        this.scans[index].status = 'Disabled'
        this.saveScansData()
        console.log('Scan disabled:', scan.id)
      }
    },
    
    enableScan(scan) {
      const index = this.scans.findIndex(s => s.id === scan.id)
      if (index !== -1) {
        this.scans[index].status = 'Active'
        this.saveScansData()
        console.log('Scan enabled:', scan.id)
      }
    },
    
    getStatusClass(status) {
      switch (status) {
        case 'Active':
          return 'bg-green-100 text-green-800'
        case 'Disabled':
          return 'bg-red-100 text-red-800'
        case 'Pending':
          return 'bg-yellow-100 text-yellow-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }
  }
}
</script>

<style scoped>
/* Page specific styles */
.min-h-screen {
  min-height: 100vh;
}
</style>