<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Lab Dashboard Container -->
    <div class="flex">
      <!-- Sidebar Navigation -->
      <LabSidebar 
        :active-section="'tests'"
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
            <h1 class="text-2xl font-semibold text-gray-900">Manage Tests</h1>
            <div class="flex items-center space-x-3">
              <button
                @click="importTests"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4"></path>
                </svg>
                Import
              </button>
              <button
                @click="showNewTestModal = true"
                class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                New Test
              </button>
            </div>
          </div>

          <!-- Statistics Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="text-3xl font-bold text-gray-900">{{ testStats.total }}</div>
              <div class="text-sm text-gray-500">Total Tests</div>
            </div>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="text-3xl font-bold text-gray-900">{{ testStats.pendingApproval }}</div>
              <div class="text-sm text-gray-500">Pending Approval</div>
            </div>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="text-3xl font-bold text-gray-900">{{ testStats.disabled }}</div>
              <div class="text-sm text-gray-500">Disabled</div>
            </div>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="text-3xl font-bold text-gray-900">{{ testStats.newThisWeek }}</div>
              <div class="text-sm text-gray-500">New this week</div>
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
                    placeholder="Search tests by name, code..."
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    @input="filterTests"
                  />
                </div>
                
                <!-- Status Filter -->
                <div class="min-w-32">
                  <select
                    v-model="statusFilter"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    @change="filterTests"
                  >
                    <option value="">Status: Any</option>
                    <option value="Active">Active</option>
                    <option value="Disabled">Disabled</option>
                    <option value="Pending">Pending Approval</option>
                  </select>
                </div>
                
                <!-- Category Filter -->
                <div class="min-w-32">
                  <select
                    v-model="categoryFilter"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    @change="filterTests"
                  >
                    <option value="">Category: All</option>
                    <option value="Blood">Blood</option>
                    <option value="Urine">Urine</option>
                    <option value="Biochemistry">Biochemistry</option>
                    <option value="Hematology">Hematology</option>
                    <option value="Microbiology">Microbiology</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Tests Table -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Test
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
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
                  <tr v-for="test in filteredTests" :key="test.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ test.name }}</div>
                        <div class="text-sm text-gray-500">Results in {{ test.turnaround }} • Price: Rs.{{ test.basePrice }}</div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ test.code }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ test.category }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusClass(test.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                        {{ test.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        @click="editTest(test)"
                        class="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        v-if="test.status === 'Active'"
                        @click="disableTest(test)"
                        class="text-red-600 hover:text-red-900"
                      >
                        Disable
                      </button>
                      <button
                        v-else
                        @click="enableTest(test)"
                        class="text-green-600 hover:text-green-900"
                      >
                        Enable
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <!-- Empty State -->
              <div v-if="filteredTests.length === 0" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No tests found</h3>
                <p class="mt-1 text-sm text-gray-500">
                  {{ tests.length === 0 ? 'Get started by creating a new test.' : 'Try adjusting your search or filter criteria.' }}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    
    <!-- New Test Modal -->
    <NewTestModal 
      :is-visible="showNewTestModal"
      @close="showNewTestModal = false"
      @test-created="handleTestCreated"
    />
  </div>
</template>

<script>
import LabHeader from '../../components/Lab/LabHeader.vue'
import LabSidebar from '../../components/Lab/LabSidebar.vue'
import NewTestModal from '../../components/Lab/NewTestModal.vue'
import ApiService from '../../services/api.js'

export default {
  name: 'ManageTests',
  components: {
    LabHeader,
    LabSidebar,
    NewTestModal
  },
  data() {
    return {
      showNewTestModal: false,
      searchQuery: '',
      statusFilter: '',
      categoryFilter: '',
      
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
      
      // Tests Data - will be populated based on user type
      tests: []
    }
  },
  computed: {
    testStats() {
      return {
        total: this.tests.length,
        pendingApproval: this.tests.filter(test => test.status === 'Pending').length,
        disabled: this.tests.filter(test => test.status === 'Disabled').length,
        newThisWeek: this.tests.filter(test => {
          const testDate = new Date(test.createdAt)
          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7)
          return testDate >= weekAgo
        }).length
      }
    },
    
    filteredTests() {
      let filtered = [...this.tests]
      
      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(test => 
          test.name.toLowerCase().includes(query) ||
          test.code.toLowerCase().includes(query)
        )
      }
      
      // Status filter
      if (this.statusFilter) {
        filtered = filtered.filter(test => test.status === this.statusFilter)
      }
      
      // Category filter
      if (this.categoryFilter) {
        filtered = filtered.filter(test => test.category === this.categoryFilter)
      }
      
      return filtered
    }
  },
  
  async mounted() {
    this.loadUserSession()
    await this.loadTestsFromAPI()
    
    // Also check if there are any slots created (for debugging)
    this.checkSlotsData()
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
            this.loadTestsData(userData)
          }
        } catch (error) {
          console.error('Error loading user session:', error)
        }
      }
    },
    
    async loadTestsFromAPI() {
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      const isDemoUser = userSession.username === 'lab' || userSession.id === 'demo-lab'
      
      if (isDemoUser) {
        // Demo user keeps existing demo data
        return
      }
      
      try {
        // Import API service and fetch real tests data
        const ApiService = (await import('../../services/api.js')).default
        const testsData = await ApiService.getLabTests()
        
        console.log('Fetched lab tests:', testsData)
        
        // Convert backend test data to frontend format
        this.tests = testsData.map(test => ({
          id: test.id,
          name: test.name,
          code: test.testCode,
          category: 'Lab Test', // Default category
          status: test.active ? 'Active' : 'Disabled',
          basePrice: test.price,
          turnaround: '24h', // Default turnaround
          createdAt: new Date().toISOString().split('T')[0], // Default to today
          description: test.description || ''
        }))
        
        console.log('Processed tests data:', this.tests)
        
      } catch (error) {
        console.error('Failed to load tests from API:', error)
        // Keep empty array for new users if API fails
        this.tests = []
      }
    },

    checkSlotsData() {
      // Debug method to check if slots data persists across pages
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      const userId = userSession.id
      const savedSlots = JSON.parse(localStorage.getItem(`labSlots_${userId}`) || '[]')
      
      console.log('🔍 [ManageTests] Checking slots data persistence:')
      console.log('   - User ID:', userId)
      console.log('   - Saved slots count:', savedSlots.length)
      console.log('   - Slots data:', savedSlots)
      
      if (savedSlots.length > 0) {
        console.log('✅ Slots data is persisting across pages!')
      } else {
        console.log('⚠️ No slots data found - either none created or data not persisting')
      }
    },

    loadTestsData(userData) {
      // Check if this is the demo user or a newly registered user
      const isDemoUser = userData.id === 'demo-lab' || userData.username === 'lab'
      
      if (isDemoUser) {
        // Load demo tests for Nova Diagnostics demo user
        this.tests = [
          {
            id: 'TEST-001',
            name: 'Complete Blood Count',
            code: 'CBC-001',
            category: 'Blood',
            status: 'Active',
            basePrice: 45.00,
            turnaround: '24h',
            createdAt: '2024-10-25'
          },
          {
            id: 'TEST-002',
            name: 'Liver Function Test',
            code: 'LFT-021',
            category: 'Blood',
            status: 'Disabled',
            basePrice: 65.00,
            turnaround: '48h',
            createdAt: '2024-10-20'
          },
          {
            id: 'TEST-003',
            name: 'Thyroid Profile',
            code: 'THY-112',
            category: 'Blood',
            status: 'Disabled',
            basePrice: 85.00,
            turnaround: '24h',
            createdAt: '2024-10-18'
          },
          {
            id: 'TEST-004',
            name: 'Urine Analysis',
            code: 'URN-045',
            category: 'Urine',
            status: 'Active',
            basePrice: 25.00,
            turnaround: '12h',
            createdAt: '2024-10-22'
          },
          {
            id: 'TEST-005',
            name: 'Blood Glucose',
            code: 'GLU-089',
            category: 'Biochemistry',
            status: 'Pending',
            basePrice: 15.00,
            turnaround: '2h',
            createdAt: '2024-10-28'
          },
          {
            id: 'TEST-006',
            name: 'Hemoglobin A1C',
            code: 'HBA-156',
            category: 'Hematology',
            status: 'Active',
            basePrice: 55.00,
            turnaround: '24h',
            createdAt: '2024-10-26'
          }
        ]
      } else {
        // Load saved tests for registered users
        const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
        const userId = userSession.id
        const savedTests = JSON.parse(localStorage.getItem(`labTests_${userId}`) || '[]')
        this.tests = savedTests
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
          // Already on tests page
          break
        case 'scans':
          this.$router.push('/lab/manage-scans')
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
    
    filterTests() {
      // Filtering is handled by computed property
    },
    
    importTests() {
      console.log('Import tests functionality')
      // In real implementation, this would open file picker or import modal
    },
    
    async handleTestCreated(testData) {
      try {
        // Import API service and create test via API
        const ApiService = (await import('../../services/api.js')).default
        
        // Prepare test data for backend
        const backendTestData = {
          name: testData.name,
          testCode: testData.code,
          price: testData.basePrice,
          description: testData.description || '',
          active: true
        }
        
        const response = await ApiService.createLabTest(backendTestData)
        console.log('Test created via API:', response)
        
        // Add new test to the list with backend response data
        this.tests.unshift({
          id: response.testId,
          name: response.testName || testData.name,
          code: testData.code,
          category: testData.category || 'Lab Test',
          status: 'Active',
          basePrice: response.price || testData.basePrice,
          turnaround: testData.turnaround || '24h',
          createdAt: new Date().toISOString().split('T')[0],
          description: testData.description || ''
        })
        
        // Also save locally as backup
        this.saveTestsData()
        
        console.log('New test created successfully:', testData)
        
      } catch (error) {
        console.error('Failed to create test via API:', error)
        
        // Fallback to local storage only
        this.tests.unshift({
          ...testData,
          id: Date.now(), // Generate temporary ID
          createdAt: new Date().toISOString().split('T')[0]
        })
        
        this.saveTestsData()
        
        // Show error message to user
        alert('Failed to create test on server. Test saved locally only.')
      }
    },
    
    saveTestsData() {
      // Save tests data for the logged-in user
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      const userId = userSession.id
      
      if (userId && userId !== 'demo-lab') {
        localStorage.setItem(`labTests_${userId}`, JSON.stringify(this.tests))
        console.log('Tests data saved for user:', userId)
      }
    },
    
    editTest(test) {
      console.log('Edit test:', test.id)
      // In real implementation, this would open edit modal or navigate to edit page
    },
    
    disableTest(test) {
      const index = this.tests.findIndex(t => t.id === test.id)
      if (index !== -1) {
        this.tests[index].status = 'Disabled'
        this.saveTestsData()
        console.log('Test disabled:', test.id)
      }
    },
    
    enableTest(test) {
      const index = this.tests.findIndex(t => t.id === test.id)
      if (index !== -1) {
        this.tests[index].status = 'Active'
        this.saveTestsData()
        console.log('Test enabled:', test.id)
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