<template>
  <div class="min-h-screen bg-gray-50 relative overflow-hidden">
    <!-- Animated Medical Icons Background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <span class="material-symbols-rounded absolute text-yellow-200 opacity-10 animate-float" style="font-size: 70px; top: 10%; left: 85%; animation-delay: 0s;">science</span>
      <span class="material-symbols-rounded absolute text-yellow-300 animate-float-reverse" style="font-size: 55px; top: 20%; left: 90%; animation-delay: 1s; opacity: 0.08;">biotech</span>
      <span class="material-symbols-rounded absolute text-yellow-200 opacity-10 animate-float" style="font-size: 65px; top: 35%; left: 92%; animation-delay: 2s;">local_hospital</span>
      <span class="material-symbols-rounded absolute text-yellow-300 opacity: 0.08; animate-float-reverse" style="font-size: 60px; top: 45%; left: 88%; animation-delay: 0.5s;">health_and_safety</span>
      <span class="material-symbols-rounded absolute text-yellow-200 opacity-10 animate-float" style="font-size: 50px; bottom: 30%; left: 93%; animation-delay: 1.5s;">medication</span>
      <span class="material-symbols-rounded absolute text-yellow-300 opacity: 0.08; animate-float-reverse" style="font-size: 75px; bottom: 20%; left: 87%; animation-delay: 2.5s;">monitoring</span>
    </div>
    <!-- Lab Dashboard Container -->
    <div class="flex relative z-10">
      <!-- Sidebar Navigation -->
      <LabSidebar 
        :active-section="activeSection"
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
        
        <!-- Dashboard Content -->
        <main class="flex-1 p-6 page-enter">
          <!-- Dashboard Metrics -->
          <DashboardMetrics 
            :metrics="dashboardMetrics"
            @quick-action="handleQuickAction"
          />
          
          <!-- Tables Section -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 animate-fade-up" style="animation-delay: 0.2s;">
            <!-- Upcoming Slots -->
            <UpcomingSlotsTable 
              :slots="upcomingSlots"
              :refresh-interval="30000"
              @refresh="refreshSlots"
              @update-capacity="handleUpdateCapacity"
              @update-status="handleUpdateStatus"
              @view-details="handleViewSlotDetails"
              @show-message="handleShowMessage"
            />
            
            <!-- Recent Reports -->
            <RecentReportsTable 
              :reports="recentReports"
              @view-all="navigateToReports"
            />
          </div>
        </main>
      </div>
    </div>
    
    <!-- New Slot Modal Overlay -->
    <NewSlotModal 
      :is-visible="showNewSlotModal"
      @close="showNewSlotModal = false"
      @slot-created="handleSlotCreated"
    />
    
    <!-- New Test Modal Overlay -->
    <NewTestModal 
      :is-visible="showNewTestModal"
      @close="showNewTestModal = false"
      @test-created="handleTestCreated"
    />
    
    <!-- New Scan Modal Overlay -->
    <NewScanModal 
      :is-visible="showNewScanModal"
      @close="showNewScanModal = false"
      @scan-created="handleScanCreated"
    />
    
    <!-- Upload Report Modal Overlay -->
    <UploadReportModal 
      :is-visible="showUploadReportModal"
      @close="showUploadReportModal = false"
      @report-uploaded="handleReportUploaded"
    />
  </div>
</template>

<script>
import LabHeader from '../../components/Lab/LabHeader.vue'
import LabSidebar from '../../components/Lab/LabSidebar.vue'
import DashboardMetrics from '../../components/Lab/DashboardMetrics.vue'
import UpcomingSlotsTable from '../../components/Lab/UpcomingSlotsTable.vue'
import RecentReportsTable from '../../components/Lab/RecentReportsTable.vue'
import NewSlotModal from '../../components/Lab/NewSlotModal.vue'
import NewTestModal from '../../components/Lab/NewTestModal.vue'
import NewScanModal from '../../components/Lab/NewScanModal.vue'
import UploadReportModal from '../../components/Lab/UploadReportModal.vue'
import ApiService from '../../services/api.js'

export default {
  name: 'LabDashboard',
  components: {
    LabHeader,
    LabSidebar,
    DashboardMetrics,
    UpcomingSlotsTable,
    RecentReportsTable,
    NewSlotModal,
    NewTestModal,
    NewScanModal,
    UploadReportModal
  },
  data() {
    return {
      activeSection: 'dashboard',
      refreshInterval: null,
      showNewSlotModal: false,
      showNewTestModal: false,
      showNewScanModal: false,
      showUploadReportModal: false,
      
      // Lab Information - will be populated from user session
      labInfo: {
        name: 'VMedico',
        labId: 'VMD-79378',
        license: 'MED-9583',
        address: '456 Medical Plaza, Healthcare District',
        phone: '+91 98765 43210',
        email: 'admin@vmedico.com'
      },
      
      // Current User - will be populated from user session
      currentUser: {
        name: 'Lab Administrator',
        role: 'Lab Administrator',
        email: 'admin@vmedico.com',
        lastLogin: new Date()
      },
      
      // Dashboard Metrics
      dashboardMetrics: {
        todayAppointments: {
          count: 24,
          booked: 18,
          open: 6
        },
        pendingReports: {
          count: 12,
          tests: 8,
          scans: 4
        },
        activeTests: {
          count: 15,
          scheduled: 15
        },
        equipmentStatus: {
          percentage: 92,
          operational: 11,
          total: 12
        }
      },
      
      // Data arrays - will be populated based on user type (demo vs new user)
      upcomingSlots: [],
      recentReports: []
    }
  },
  
  mounted() {
    this.loadUserSession()
    this.setActiveSectionFromRoute()
    this.startAutoRefresh()
  },
  
  beforeUnmount() {
    this.stopAutoRefresh()
  },
  
  watch: {
    '$route'() {
      // Update active section when route changes
      this.setActiveSectionFromRoute()
    }
  },
  
  methods: {
    async loadUserSession() {
      // Load user session data from localStorage
      const userSession = localStorage.getItem('userSession')
      if (userSession) {
        try {
          const userData = JSON.parse(userSession)
          console.log('Loading user session:', userData)
          
          // Update lab info and user data for lab users
          if (userData.role === 'LAB' || userData.role === 'lab') {
            // Fetch real lab profile data from backend
            await this.fetchLabProfile()
            
            // Load appropriate data based on user type
            this.loadLabData(userData)
          }
        } catch (error) {
          console.error('Error loading user session:', error)
          // Fallback to session data if API fails
          this.loadFallbackLabData()
        }
      }
    },

    async fetchLabProfile() {
      try {
        const labProfile = await ApiService.getLabProfile()
        
        console.log('Fetched lab profile:', labProfile)
        
        // Update lab info with real backend data
        this.labInfo = {
          name: labProfile.labName || 'Lab Name',
          labId: `LAB-${labProfile.id.toString().padStart(5, '0')}`,
          license: labProfile.licenseNumber || 'N/A',
          address: labProfile.address || 'Address not provided',
          phone: labProfile.phoneNumber || 'N/A',
          email: this.getUserEmail() || 'N/A'
        }
        
        // Update current user info
        this.currentUser = {
          name: labProfile.labName + ' Administrator',
          role: 'Lab Administrator',
          email: this.getUserEmail() || 'N/A',
          lastLogin: new Date()
        }
        
        console.log('Updated lab info from backend:', this.labInfo)
        console.log('Updated current user:', this.currentUser)
        
      } catch (error) {
        console.error('Failed to fetch lab profile:', error)
        // Use fallback data if API call fails
        this.loadFallbackLabData()
      }
    },

    loadFallbackLabData() {
      // Fallback to session data if backend is unavailable
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      
      this.labInfo = {
        name: userSession.labName || 'Lab Name',
        labId: `LAB-${(userSession.id || '00000').toString().slice(-5)}`,
        license: 'LIC-' + Math.random().toString().slice(-4),
        address: 'Address not available',
        phone: userSession.phoneNumber || 'N/A',
        email: userSession.email || 'N/A'
      }
      
      this.currentUser = {
        name: (userSession.labName || 'Lab') + ' Administrator',
        role: 'Lab Administrator',
        email: userSession.email || 'N/A',
        lastLogin: new Date()
      }
    },

    getUserEmail() {
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      return userSession.email
    },
    
    loadLabData(userData) {
      // Check if this is the demo user or a newly registered user
      const isDemoUser = userData.username === 'lab' || userData.id === 'demo-lab'
      
      if (isDemoUser) {
        // Load demo data for the demo lab user
        this.loadDemoData()
      } else {
        // Load empty/fresh data for new registered users
        this.loadFreshData()
      }
    },
    
    loadDemoData() {
      // Demo data for Nova Diagnostics
      this.dashboardMetrics = {
        todayAppointments: {
          count: 24,
          booked: 18,
          open: 6
        },
        pendingReports: {
          count: 12,
          tests: 8,
          scans: 4
        },
        activeTests: {
          count: 15,
          scheduled: 15
        },
        equipmentStatus: {
          percentage: 92,
          operational: 11,
          total: 12
        }
      }
      
      this.upcomingSlots = [
        {
          id: 'SLOT-001',
          date: '10-29',
          timeRange: '09:00-11:00',
          capacity: 8,
          current: 6,
          status: 'Open'
        },
        {
          id: 'SLOT-002',
          date: '10-29',
          timeRange: '13:00-15:00',
          capacity: 10,
          current: 10,
          status: 'Full'
        },
        {
          id: 'SLOT-003',
          date: '10-30',
          timeRange: '10:00-12:00',
          capacity: 6,
          current: 2,
          status: 'Open'
        }
      ]
      
      this.recentReports = [
        {
          id: 'RPT-001',
          patientId: 'PID-00123',
          doctorName: 'Dr. Lee',
          date: '10-28',
          testType: 'CBC',
          status: 'Completed'
        },
        {
          id: 'RPT-002',
          patientId: 'PID-00124',
          doctorName: 'Dr. Patel',
          date: '10-28',
          testType: 'X-Ray',
          status: 'Pending'
        },
        {
          id: 'RPT-003',
          patientId: 'PID-00125',
          doctorName: 'Dr. Kumar',
          date: '10-27',
          testType: 'MRI',
          status: 'Completed'
        }
      ]
    },
    
    async loadFreshData() {
      // Load real data from backend for new registered users
      try {
        await this.fetchRealLabData()
      } catch (error) {
        console.error('Failed to load real lab data:', error)
        // Fallback to empty data structure
        this.loadEmptyData()
      }
    },

    async fetchRealLabData() {
      // Fetch real data from backend APIs
      try {
        // Fetch lab bookings for dashboard metrics
        const bookings = await ApiService.getLabBookings()
        console.log('Fetched lab bookings:', bookings)
        
        // Fetch lab tests
        const tests = await ApiService.getLabTests()
        console.log('Fetched lab tests:', tests)
        
        // Calculate real dashboard metrics from fetched data
        this.calculateDashboardMetrics(bookings, tests)
        
        // Update slots and reports with real data
        this.updateSlotsFromBookings(bookings)
        this.updateReportsFromBookings(bookings)
        
      } catch (error) {
        console.error('Error fetching real lab data:', error)
        throw error
      }
    },

    loadEmptyData() {
      // Load empty data structure for new labs
      this.dashboardMetrics = {
        todayAppointments: {
          count: 0,
          booked: 0,
          open: 0
        },
        pendingReports: {
          count: 0,
          tests: 0,
          scans: 0
        },
        activeTests: {
          count: 0,
          scheduled: 0
        },
        equipmentStatus: {
          percentage: 100,
          operational: 0,
          total: 0
        }
      }
      
      this.upcomingSlots = []
      this.recentReports = []
    },

    calculateDashboardMetrics(bookings, tests) {
      // Calculate real metrics from backend data
      const today = new Date().toISOString().split('T')[0]
      const todayBookings = bookings.filter(booking => booking.date === today)
      const completedBookings = bookings.filter(booking => booking.bookingStatus === 'COMPLETED')
      const pendingReports = bookings.filter(booking => 
        booking.bookingStatus === 'COMPLETED' && !booking.reportUploaded
      )
      
      this.dashboardMetrics = {
        todayAppointments: {
          count: todayBookings.length,
          booked: todayBookings.length,
          open: Math.max(0, 10 - todayBookings.length) // Assume 10 slots per day
        },
        pendingReports: {
          count: pendingReports.length,
          tests: pendingReports.length,
          scans: 0 // No scan data yet
        },
        activeTests: {
          count: tests.length,
          scheduled: tests.filter(test => test.active).length
        },
        equipmentStatus: {
          percentage: 95, // Mock for now
          operational: Math.floor(tests.length * 0.95),
          total: tests.length
        }
      }
    },

    updateSlotsFromBookings(bookings) {
      // First, try to load slots created in ManageSlots page
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      const userId = userSession.id
      const savedSlots = JSON.parse(localStorage.getItem(`labSlots_${userId}`) || '[]')
      
      console.log('📊 Loading slots for dashboard - saved slots:', savedSlots.length)
      
      if (savedSlots.length > 0) {
        // Use slots created in ManageSlots page
        this.upcomingSlots = savedSlots
          .filter(slot => new Date(slot.date) >= new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 5) // Show only next 5 slots
        
        console.log('✅ Using saved slots for dashboard:', this.upcomingSlots.length)
      } else {
        // Fallback: Convert bookings to slot format for display
        const slotMap = new Map()
        
        bookings.forEach(booking => {
          const slotKey = `${booking.date}-${booking.startTime}-${booking.endTime}`
          if (!slotMap.has(slotKey)) {
            slotMap.set(slotKey, {
              id: `SLOT-${booking.date}-${booking.startTime}`,
              date: booking.date,
              timeRange: `${booking.startTime}-${booking.endTime}`,
              capacity: 10, // Default capacity
              current: 0,
              status: 'Open'
            })
          }
          
          const slot = slotMap.get(slotKey)
          slot.current += 1
          slot.status = slot.current >= slot.capacity ? 'Full' : 'Open'
        })
        
        this.upcomingSlots = Array.from(slotMap.values())
          .filter(slot => new Date(slot.date) >= new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 5) // Show only next 5 slots
        
        console.log('📋 Using bookings-derived slots for dashboard:', this.upcomingSlots.length)
      }
    },

    updateReportsFromBookings(bookings) {
      // Convert completed bookings to recent reports format
      this.recentReports = bookings
        .filter(booking => booking.reportUploaded)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5) // Show only 5 most recent
        .map(booking => ({
          id: `RPT-${booking.id}`,
          patientId: `PID-${booking.patientId || '00000'}`,
          doctorName: 'Dr. Unknown', // Not available in booking data
          date: booking.date,
          testType: booking.testName || 'Unknown Test',
          status: 'Completed'
        }))
    },
    
    saveUserData() {
      // Save current lab data for the logged-in user
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      const userId = userSession.id
      
      if (userId && userId !== 'demo-lab') {
        const labData = {
          dashboardMetrics: this.dashboardMetrics,
          upcomingSlots: this.upcomingSlots,
          recentReports: this.recentReports,
          lastUpdated: new Date().toISOString()
        }
        
        localStorage.setItem(`labData_${userId}`, JSON.stringify(labData))
        console.log('Lab data saved for user:', userId)
      }
    },
    
    handleNavigation(section) {
      // Requirement 7.1: Navigation between different lab management sections
      // Requirement 7.4: Highlight current active section
      this.activeSection = section
      
      // Navigate to different lab management sections
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
          this.$router.push('/lab/manage-scans')
          break
        case 'reports':
          this.$router.push('/lab/manage-reports')
          break
        case 'admin-profile':
          this.$router.push('/lab/admin-profile')
          break
        default:
          // Stay on current section
          break
      }
    },
    
    handleQuickAction(actionType) {
      // Handle quick action button clicks
      switch (actionType) {
        case 'new-slot':
          this.createNewSlot()
          break
        case 'new-test':
          this.createNewTest()
          break
        case 'new-scan':
          this.createNewScan()
          break
        case 'upload-report':
          this.uploadReport()
          break
        case 'admin-profile':
          this.$router.push('/lab/admin-profile')
          break
      }
    },
    
    handleLogout(logoutData) {
      // Requirement 8.5: Secure session termination
      console.log('Processing secure logout:', logoutData)
      
      // Stop auto-refresh to prevent unnecessary API calls
      this.stopAutoRefresh()
      
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
    
    handleSearch(searchData) {
      // Handle global search functionality
      console.log('Performing search:', searchData)
      
      // In real implementation, this would call search APIs
      // For now, we'll just log the search activity
      this.logSearchActivity(searchData)
    },
    
    handleSearchSelect(selectedResult) {
      // Handle search result selection
      console.log('Search result selected:', selectedResult)
      
      // Navigate based on result type
      switch (selectedResult.type) {
        case 'Patient':
          // Navigate to patient details or create appointment
          console.log('Navigating to patient:', selectedResult.id)
          break
        case 'Test':
          // Navigate to test management
          this.$router.push('/lab/manage-tests')
          break
        case 'Scan':
          // Navigate to scan management
          this.$router.push('/lab/manage-scans')
          break
        default:
          console.log('Unknown result type:', selectedResult.type)
      }
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
      this.stopAutoRefresh()
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
    
    logSecurityEvent(eventType, eventData) {
      // Log security events for audit purposes
      const securityLog = {
        type: eventType,
        timestamp: new Date().toISOString(),
        labId: this.labInfo.labId,
        ...eventData
      }
      
      console.log('Security Event:', securityLog)
      
      // In real implementation, this would send to security logging service
      // Store in localStorage for demonstration
      const existingLogs = JSON.parse(localStorage.getItem('labSecurityLogs') || '[]')
      existingLogs.push(securityLog)
      
      // Keep only last 100 logs
      if (existingLogs.length > 100) {
        existingLogs.splice(0, existingLogs.length - 100)
      }
      
      localStorage.setItem('labSecurityLogs', JSON.stringify(existingLogs))
    },
    
    logSearchActivity(searchData) {
      // Log search activity for analytics
      const searchLog = {
        query: searchData.query,
        types: searchData.types,
        timestamp: new Date().toISOString(),
        user: this.currentUser.name
      }
      
      console.log('Search Activity:', searchLog)
      
      // In real implementation, this would send to analytics service
    },
    
    async refreshSlots() {
      // Refresh upcoming slots data
      // In real implementation, this would call an API
      console.log('Refreshing slots data...')
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Update slot statuses based on capacity
        this.upcomingSlots = this.upcomingSlots.map(slot => ({
          ...slot,
          status: slot.current >= slot.capacity ? 'Full' : 
                  slot.status === 'Cancelled' ? 'Cancelled' : 'Open'
        }))
        
        // Update dashboard metrics
        this.updateDashboardMetrics()
        
      } catch (error) {
        console.error('Failed to refresh slots:', error)
        this.handleShowMessage({
          type: 'error',
          message: 'Failed to refresh slot data'
        })
      }
    },
    
    async handleUpdateCapacity({ slotId, newCapacity }) {
      // Requirement 2.3: Slot capacity management
      console.log('Updating slot capacity:', { slotId, newCapacity })
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Find and update the slot
        const slotIndex = this.upcomingSlots.findIndex(slot => slot.id === slotId)
        if (slotIndex !== -1) {
          const slot = this.upcomingSlots[slotIndex]
          
          // Validate capacity change
          if (newCapacity < slot.current) {
            throw new Error('New capacity cannot be less than current bookings')
          }
          
          // Update capacity
          this.upcomingSlots[slotIndex] = {
            ...slot,
            capacity: newCapacity,
            status: slot.current >= newCapacity ? 'Full' : 'Open'
          }
          
          // Update dashboard metrics
          this.updateDashboardMetrics()
          
          // Log the change for audit
          this.logSlotChange('capacity_update', {
            slotId,
            oldCapacity: slot.capacity,
            newCapacity,
            user: this.currentUser.name
          })
        }
        
      } catch (error) {
        console.error('Failed to update capacity:', error)
        throw error
      }
    },
    
    async handleUpdateStatus({ slotId, newStatus }) {
      // Requirement 2.4: Slot status modification
      console.log('Updating slot status:', { slotId, newStatus })
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Find and update the slot
        const slotIndex = this.upcomingSlots.findIndex(slot => slot.id === slotId)
        if (slotIndex !== -1) {
          const slot = this.upcomingSlots[slotIndex]
          const oldStatus = slot.status
          
          // Update status
          this.upcomingSlots[slotIndex] = {
            ...slot,
            status: newStatus
          }
          
          // Update dashboard metrics
          this.updateDashboardMetrics()
          
          // Log the change for audit
          this.logSlotChange('status_update', {
            slotId,
            oldStatus,
            newStatus,
            user: this.currentUser.name
          })
          
          // Send notifications if needed
          if (newStatus === 'Cancelled') {
            this.notifyPatientsOfCancellation(slot)
          }
        }
        
      } catch (error) {
        console.error('Failed to update status:', error)
        throw error
      }
    },
    
    handleViewSlotDetails(slot) {
      // Navigate to detailed slot view
      console.log('Viewing slot details:', slot)
      
      this.$router.push({
        path: '/lab/manage-slots',
        query: { 
          action: 'view',
          slotId: slot.id
        }
      })
    },
    
    handleShowMessage({ type, message }) {
      // Handle toast notifications
      console.log(`${type.toUpperCase()}: ${message}`)
      
      // In real implementation, this would show a toast notification
      // For now, we'll use a simple alert or console log
      if (type === 'error') {
        console.error(message)
      } else {
        console.info(message)
      }
    },
    
    updateDashboardMetrics() {
      // Update metrics based on current slot data
      const openSlots = this.upcomingSlots.filter(slot => slot.status === 'Open').length
      const totalBookings = this.upcomingSlots.reduce((sum, slot) => sum + slot.current, 0)
      
      this.dashboardMetrics.todayAppointments = {
        count: totalBookings,
        booked: totalBookings,
        open: openSlots
      }
    },
    
    logSlotChange(changeType, changeData) {
      // Log slot changes for audit purposes
      const changeLog = {
        type: changeType,
        timestamp: new Date().toISOString(),
        labId: this.labInfo.labId,
        ...changeData
      }
      
      console.log('Slot Change Log:', changeLog)
      
      // Store in localStorage for demonstration
      const existingLogs = JSON.parse(localStorage.getItem('labSlotChanges') || '[]')
      existingLogs.push(changeLog)
      
      // Keep only last 100 logs
      if (existingLogs.length > 100) {
        existingLogs.splice(0, existingLogs.length - 100)
      }
      
      localStorage.setItem('labSlotChanges', JSON.stringify(existingLogs))
    },
    
    notifyPatientsOfCancellation(slot) {
      // Requirement 2.5: Send notifications to affected patients
      console.log('Sending cancellation notifications for slot:', slot.id)
      
      // In real implementation, this would send notifications via email/SMS
      // For now, we'll just log the notification activity
      const notificationLog = {
        type: 'slot_cancellation',
        slotId: slot.id,
        date: slot.date,
        timeRange: slot.timeRange,
        affectedPatients: slot.current,
        timestamp: new Date().toISOString()
      }
      
      console.log('Notification sent:', notificationLog)
    },
    
    navigateToReports() {
      this.$router.push('/lab/manage-reports')
    },
    
    refreshDashboard() {
      // Refresh all dashboard data
      // In real implementation, this would call multiple APIs
      console.log('Refreshing dashboard data...')
    },
    
    startAutoRefresh() {
      // Auto-refresh every 30 seconds as per requirements
      this.refreshInterval = setInterval(() => {
        this.refreshDashboard()
      }, 30000)
    },
    
    stopAutoRefresh() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval)
        this.refreshInterval = null
      }
    },
    
    // Quick Action Methods - Requirement 2.1, 3.1, 4.1, 5.1
    createNewSlot() {
      // Requirement 2.1: New Slot creation interface with date, time, and capacity settings
      console.log('Opening new slot modal...')
      
      // Show the new slot modal overlay
      this.showNewSlotModal = true
    },
    
    handleSlotCreated(slotData) {
      // Add the new slot to the upcoming slots array
      this.upcomingSlots.push(slotData)
      
      // Update dashboard metrics
      this.updateDashboardMetrics()
      
      // Log the slot creation for audit
      this.logSlotChange('slot_created', {
        slotId: slotData.id,
        patientId: slotData.patientId,
        date: slotData.date,
        timeRange: slotData.timeRange,
        user: this.currentUser.name
      })
      
      console.log('New slot created:', slotData)
    },
    
    createNewTest() {
      // Requirement 3.1: New Test interface for creating test requests with patient and test details
      console.log('Opening new test modal...')
      
      // Show the new test modal overlay
      this.showNewTestModal = true
    },
    
    handleTestCreated(testData) {
      // Handle the new test creation
      console.log('New test created:', testData)
      
      // In a real implementation, this would:
      // 1. Add the test to a tests array/store
      // 2. Update dashboard metrics if needed
      // 3. Show success notification
      
      // For now, just log the test creation
      this.logTestCreation(testData)
    },
    
    logTestCreation(testData) {
      // Log test creation for audit purposes
      const testLog = {
        type: 'test_created',
        testId: testData.id,
        testName: testData.name,
        testCode: testData.code,
        category: testData.category,
        createdBy: this.currentUser.name,
        timestamp: new Date().toISOString()
      }
      
      console.log('Test Creation Log:', testLog)
      
      // Store in localStorage for demonstration
      const existingLogs = JSON.parse(localStorage.getItem('labTestLogs') || '[]')
      existingLogs.push(testLog)
      
      // Keep only last 100 logs
      if (existingLogs.length > 100) {
        existingLogs.splice(0, existingLogs.length - 100)
      }
      
      localStorage.setItem('labTestLogs', JSON.stringify(existingLogs))
    },
    
    createNewScan() {
      // Requirement 4.1: New Scan interface for scheduling imaging appointments
      console.log('Opening new scan modal...')
      
      // Show the new scan modal overlay
      this.showNewScanModal = true
    },
    
    handleScanCreated(scanData) {
      // Handle the new scan creation
      console.log('New scan created:', scanData)
      
      // In a real implementation, this would:
      // 1. Add the scan to a scans array/store
      // 2. Update dashboard metrics if needed
      // 3. Show success notification
      
      // For now, just log the scan creation
      this.logScanCreation(scanData)
    },
    
    logScanCreation(scanData) {
      // Log scan creation for audit purposes
      const scanLog = {
        type: 'scan_created',
        scanId: scanData.id,
        scanName: scanData.name,
        scanCode: scanData.code,
        modality: scanData.modality,
        room: scanData.room,
        createdBy: this.currentUser.name,
        timestamp: new Date().toISOString()
      }
      
      console.log('Scan Creation Log:', scanLog)
      
      // Store in localStorage for demonstration
      const existingLogs = JSON.parse(localStorage.getItem('labScanLogs') || '[]')
      existingLogs.push(scanLog)
      
      // Keep only last 100 logs
      if (existingLogs.length > 100) {
        existingLogs.splice(0, existingLogs.length - 100)
      }
      
      localStorage.setItem('labScanLogs', JSON.stringify(existingLogs))
    },
    
    uploadReport() {
      // Requirement 5.1: Upload Report interface supporting multiple file formats
      console.log('Opening upload report modal...')
      
      // Show the upload report modal overlay
      this.showUploadReportModal = true
    },
    
    handleReportUploaded(reportData) {
      // Handle the report upload
      console.log('Report uploaded:', reportData)
      
      // In a real implementation, this would:
      // 1. Upload files to server/cloud storage
      // 2. Add the report to reports array/store
      // 3. Update dashboard metrics if needed
      // 4. Show success notification
      
      // For now, just log the report upload
      this.logReportUpload(reportData)
    },
    
    logReportUpload(reportData) {
      // Log report upload for audit purposes
      const uploadLog = {
        type: 'report_uploaded',
        reportId: reportData.id,
        patientId: reportData.patientId,
        reportType: reportData.type,
        fileCount: reportData.files.length,
        totalSize: reportData.files.reduce((sum, file) => sum + file.size, 0),
        refPhysician: reportData.refPhysician,
        uploadedBy: this.currentUser.name,
        timestamp: new Date().toISOString()
      }
      
      console.log('Report Upload Log:', uploadLog)
      
      // Store in localStorage for demonstration
      const existingLogs = JSON.parse(localStorage.getItem('labReportUploadLogs') || '[]')
      existingLogs.push(uploadLog)
      
      // Keep only last 100 logs
      if (existingLogs.length > 100) {
        existingLogs.splice(0, existingLogs.length - 100)
      }
      
      localStorage.setItem('labReportUploadLogs', JSON.stringify(existingLogs))
    },
    
    handleSidebarToggle(isCollapsed) {
      // Handle sidebar toggle event
      console.log('Sidebar toggled:', isCollapsed ? 'collapsed' : 'expanded')
      // You can add additional logic here if needed
    },
    
    setActiveSectionFromRoute() {
      // Set active section based on current route for proper highlighting
      const currentPath = this.$route.path
      
      if (currentPath === '/lab-dashboard') {
        this.activeSection = 'dashboard'
      } else if (currentPath === '/lab/manage-slots') {
        this.activeSection = 'slots'
      } else if (currentPath === '/lab/manage-tests') {
        this.activeSection = 'tests'
      } else if (currentPath === '/lab/manage-scans') {
        this.activeSection = 'scans'
      } else if (currentPath === '/lab/manage-reports') {
        this.activeSection = 'reports'
      } else {
        this.activeSection = 'dashboard'
      }
    }
  }
}
</script>

<style scoped>
/* Lab Dashboard specific styles */
.min-h-screen {
  min-height: 100vh;
}
</style>