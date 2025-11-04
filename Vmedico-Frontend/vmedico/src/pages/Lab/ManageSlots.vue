<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Lab Dashboard Container -->
    <div class="flex">
      <!-- Sidebar Navigation -->
      <LabSidebar 
        :active-section="'slots'"
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
            <h1 class="text-2xl font-semibold text-gray-900">Manage Slots</h1>
            <div class="flex items-center space-x-3">
              <button
                @click="showNewSlotModal = true"
                class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                New Slot
              </button>
            </div>
          </div>

          <!-- Statistics Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="text-3xl font-bold text-gray-900">{{ slotStats.total }}</div>
              <div class="text-sm text-gray-500">Total Slots</div>
            </div>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="text-3xl font-bold text-gray-900">{{ slotStats.open }}</div>
              <div class="text-sm text-gray-500">Open Slots</div>
            </div>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="text-3xl font-bold text-gray-900">{{ slotStats.full }}</div>
              <div class="text-sm text-gray-500">Full Slots</div>
            </div>
          </div>

          <!-- Slots Table -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <p class="text-sm text-gray-600">
                <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Click on any row to view patient details and bookings
              </p>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacity
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booked
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
                  <tr v-for="slot in slots" :key="slot.id" class="hover:bg-blue-50 cursor-pointer transition-colors duration-200" @click="viewSlotDetails(slot)" title="Click to view patient details">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ slot.date }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ slot.timeRange }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ slot.capacity }} max
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ slot.current }} patients
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusClass(slot.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                        {{ slot.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2" @click.stop>
                      <button
                        @click="editSlot(slot)"
                        class="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteSlot(slot)"
                        class="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <!-- Empty State -->
              <div v-if="slots.length === 0" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No slots found</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by creating a new slot.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    
    <!-- New Slot Modal -->
    <NewSlotModal 
      :is-visible="showNewSlotModal"
      @close="showNewSlotModal = false"
      @slot-created="handleSlotCreated"
    />
    
    <!-- Patient Details Modal -->
    <div v-if="showPatientDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">
            Slot Details - {{ selectedSlot?.date }} {{ selectedSlot?.timeRange }}
          </h3>
          <button @click="showPatientDetailsModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="mb-6">
          <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">{{ selectedSlot?.capacity }}</div>
              <div class="text-sm text-blue-600">Total Capacity</div>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{{ selectedSlot?.current }}</div>
              <div class="text-sm text-green-600">Booked</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-gray-600">{{ selectedSlot?.capacity - selectedSlot?.current }}</div>
              <div class="text-sm text-gray-600">Available</div>
            </div>
          </div>
        </div>
        
        <div v-if="selectedSlot?.patients && selectedSlot.patients.length > 0">
          <h4 class="text-md font-semibold text-gray-900 mb-4">Booked Patients ({{ selectedSlot.patients.length }})</h4>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="patient in selectedSlot.patients" :key="patient.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ patient.name }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ patient.phone }}</div>
                    <div class="text-sm text-gray-500">{{ patient.email }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ patient.testType }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ patient.bookingTime }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getPatientStatusClass(patient.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                      {{ patient.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div v-else class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No patients booked</h3>
          <p class="mt-1 text-sm text-gray-500">This slot is available for new bookings.</p>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button @click="showPatientDetailsModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Close
          </button>
          <button @click="editSlotFromDetails" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Edit Slot
          </button>
        </div>
      </div>
    </div>
    
    <!-- Edit Slot Modal -->
    <div v-if="showEditSlotModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Edit Slot</h3>
          <button @click="showEditSlotModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="updateSlot" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input 
              v-model="editForm.date" 
              type="date" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input 
                v-model="editForm.startTime" 
                type="time" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input 
                v-model="editForm.endTime" 
                type="time" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
            <input 
              v-model.number="editForm.capacity" 
              type="number" 
              min="1" 
              max="50" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button 
              type="button" 
              @click="showEditSlotModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Update Slot
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LabHeader from '../../components/Lab/LabHeader.vue'
import LabSidebar from '../../components/Lab/LabSidebar.vue'
import NewSlotModal from '../../components/Lab/NewSlotModal.vue'

export default {
  name: 'ManageSlots',
  components: {
    LabHeader,
    LabSidebar,
    NewSlotModal
  },
  data() {
    return {
      showNewSlotModal: false,
      showPatientDetailsModal: false,
      showEditSlotModal: false,
      selectedSlot: null,
      editForm: {
        date: '',
        startTime: '',
        endTime: '',
        capacity: 10
      },
      
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
      
      // Slots Data - will be populated based on user type
      slots: []
    }
  },
  computed: {
    slotStats() {
      return {
        total: this.slots.length,
        open: this.slots.filter(slot => slot.status === 'Open').length,
        full: this.slots.filter(slot => slot.status === 'Full').length
      }
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
            this.loadSlotsData(userData)
          }
        } catch (error) {
          console.error('Error loading user session:', error)
        }
      }
    },
    
    loadSlotsData(userData) {
      // Check if this is the demo user or a newly registered user
      const isDemoUser = userData.id === 'demo-lab' || userData.username === 'lab'
      
      console.log('Loading slots data for user:', userData.username, 'isDemoUser:', isDemoUser)
      
      if (isDemoUser) {
        // Load demo slots for Nova Diagnostics demo user
        this.slots = [
          {
            id: 'SLOT-001',
            date: '2025-10-09',
            timeRange: '13:00-15:00',
            capacity: 10,
            current: 3,
            status: 'Open',
            patients: [
              {
                id: 'PAT-001',
                name: 'John Doe',
                phone: '+91 98765 43210',
                email: 'john.doe@email.com',
                testType: 'Blood Test',
                bookingTime: '13:00',
                status: 'Confirmed'
              },
              {
                id: 'PAT-002',
                name: 'Jane Smith',
                phone: '+91 98765 43211',
                email: 'jane.smith@email.com',
                testType: 'X-Ray',
                bookingTime: '13:30',
                status: 'Confirmed'
              },
              {
                id: 'PAT-003',
                name: 'Mike Johnson',
                phone: '+91 98765 43212',
                email: 'mike.johnson@email.com',
                testType: 'MRI Scan',
                bookingTime: '14:00',
                status: 'Pending'
              }
            ]
          },
          {
            id: 'SLOT-002',
            date: '2025-10-10',
            timeRange: '10:00-12:00',
            capacity: 8,
            current: 8,
            status: 'Full',
            patients: [
              {
                id: 'PAT-004',
                name: 'Sarah Wilson',
                phone: '+91 98765 43213',
                email: 'sarah.wilson@email.com',
                testType: 'CT Scan',
                bookingTime: '10:00',
                status: 'Confirmed'
              },
              {
                id: 'PAT-005',
                name: 'David Brown',
                phone: '+91 98765 43214',
                email: 'david.brown@email.com',
                testType: 'Blood Test',
                bookingTime: '10:30',
                status: 'Confirmed'
              },
              {
                id: 'PAT-006',
                name: 'Lisa Davis',
                phone: '+91 98765 43215',
                email: 'lisa.davis@email.com',
                testType: 'Ultrasound',
                bookingTime: '11:00',
                status: 'Confirmed'
              },
              {
                id: 'PAT-007',
                name: 'Robert Miller',
                phone: '+91 98765 43216',
                email: 'robert.miller@email.com',
                testType: 'ECG',
                bookingTime: '11:30',
                status: 'Confirmed'
              },
              {
                id: 'PAT-008',
                name: 'Emily Taylor',
                phone: '+91 98765 43217',
                email: 'emily.taylor@email.com',
                testType: 'Blood Test',
                bookingTime: '10:15',
                status: 'Confirmed'
              },
              {
                id: 'PAT-009',
                name: 'James Anderson',
                phone: '+91 98765 43218',
                email: 'james.anderson@email.com',
                testType: 'X-Ray',
                bookingTime: '10:45',
                status: 'Confirmed'
              },
              {
                id: 'PAT-010',
                name: 'Maria Garcia',
                phone: '+91 98765 43219',
                email: 'maria.garcia@email.com',
                testType: 'MRI Scan',
                bookingTime: '11:15',
                status: 'Confirmed'
              },
              {
                id: 'PAT-011',
                name: 'Thomas Wilson',
                phone: '+91 98765 43220',
                email: 'thomas.wilson@email.com',
                testType: 'CT Scan',
                bookingTime: '11:45',
                status: 'Confirmed'
              }
            ]
          },
          {
            id: 'SLOT-003',
            date: '2025-10-11',
            timeRange: '14:00-16:00',
            capacity: 12,
            current: 0,
            status: 'Open',
            patients: []
          }
        ]
      } else {
        // Load saved slots for registered users
        const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
        const userId = userSession.id
        const savedSlots = JSON.parse(localStorage.getItem(`labSlots_${userId}`) || '[]')
        
        console.log('Loading saved slots for userId:', userId, 'slots:', savedSlots)
        this.slots = savedSlots
        
        // If no saved slots, initialize with empty array
        if (this.slots.length === 0) {
          console.log('No saved slots found, starting with empty array')
        }
      }
    },
    
    handleSidebarToggle(isCollapsed) {
      // Handle sidebar toggle event
      console.log('Sidebar toggled:', isCollapsed ? 'collapsed' : 'expanded')
    },
    
    handleNavigation(section) {
      // Navigate to different sections
      switch (section) {
        case 'dashboard':
          this.$router.push('/lab-dashboard')
          break
        case 'slots':
          // Already on slots page
          break
        case 'tests':
          this.$router.push('/lab/manage-tests')
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
    
    handleSlotCreated(slotData) {
      // Add new slot to the list
      const newSlot = {
        ...slotData,
        id: 'SLOT-' + Date.now().toString().slice(-3),
        current: 0,
        patients: [],
        createdAt: new Date().toISOString()
      }
      
      this.slots.unshift(newSlot)
      
      console.log('🆕 New slot created:', newSlot)
      console.log('📊 Total slots now:', this.slots.length)
      
      // Save updated slots data immediately
      this.saveSlotsData()
      
      // Verify the save worked
      setTimeout(() => {
        const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
        const userId = userSession.id
        const savedSlots = JSON.parse(localStorage.getItem(`labSlots_${userId}`) || '[]')
        console.log('🔍 Verification - Saved slots count:', savedSlots.length)
      }, 100)
    },
    
    saveSlotsData() {
      // Save slots data for the logged-in user
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      const userId = userSession.id
      
      if (userId && userId !== 'demo-lab') {
        try {
          localStorage.setItem(`labSlots_${userId}`, JSON.stringify(this.slots))
          console.log('✅ Slots data saved successfully for user:', userId, 'Total slots:', this.slots.length)
          
          // Also save to a global lab data object for cross-page access
          const globalLabData = JSON.parse(localStorage.getItem(`labData_${userId}`) || '{}')
          globalLabData.slots = this.slots
          globalLabData.lastUpdated = new Date().toISOString()
          localStorage.setItem(`labData_${userId}`, JSON.stringify(globalLabData))
          
          console.log('✅ Global lab data updated with slots')
        } catch (error) {
          console.error('❌ Failed to save slots data:', error)
        }
      } else {
        console.log('⚠️ Not saving slots data - demo user or no userId')
      }
    },
    
    viewSlotDetails(slot) {
      this.selectedSlot = slot
      this.showPatientDetailsModal = true
    },
    
    editSlot(slot) {
      this.selectedSlot = slot
      // Parse the time range to get start and end times
      const [startTime, endTime] = slot.timeRange.split('-')
      
      this.editForm = {
        date: slot.date,
        startTime: startTime,
        endTime: endTime,
        capacity: slot.capacity
      }
      
      this.showEditSlotModal = true
    },
    
    editSlotFromDetails() {
      this.showPatientDetailsModal = false
      this.editSlot(this.selectedSlot)
    },
    
    updateSlot() {
      if (!this.selectedSlot) return
      
      const index = this.slots.findIndex(s => s.id === this.selectedSlot.id)
      if (index !== -1) {
        // Update the slot with new values
        this.slots[index] = {
          ...this.slots[index],
          date: this.editForm.date,
          timeRange: `${this.editForm.startTime}-${this.editForm.endTime}`,
          capacity: this.editForm.capacity,
          // Update status based on capacity vs current bookings
          status: this.slots[index].current >= this.editForm.capacity ? 'Full' : 'Open'
        }
        
        // If capacity is reduced below current bookings, we should handle this
        if (this.editForm.capacity < this.slots[index].current) {
          alert(`Warning: New capacity (${this.editForm.capacity}) is less than current bookings (${this.slots[index].current}). Please contact patients to reschedule.`)
        }
        
        this.saveSlotsData()
        this.showEditSlotModal = false
        this.selectedSlot = null
        
        console.log('Slot updated successfully')
      }
    },
    
    getPatientStatusClass(status) {
      switch (status) {
        case 'Confirmed':
          return 'bg-green-100 text-green-800'
        case 'Pending':
          return 'bg-yellow-100 text-yellow-800'
        case 'Cancelled':
          return 'bg-red-100 text-red-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    },
    
    deleteSlot(slot) {
      if (confirm(`Are you sure you want to delete the slot on ${slot.date} at ${slot.timeRange}?`)) {
        const index = this.slots.findIndex(s => s.id === slot.id)
        if (index !== -1) {
          this.slots.splice(index, 1)
          this.saveSlotsData()
          console.log('Slot deleted:', slot.id)
        }
      }
    },
    
    getStatusClass(status) {
      switch (status) {
        case 'Open':
          return 'bg-blue-100 text-blue-800'
        case 'Full':
          return 'bg-gray-100 text-gray-800'
        case 'Cancelled':
          return 'bg-red-100 text-red-800'
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