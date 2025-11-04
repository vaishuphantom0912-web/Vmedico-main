<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Table Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
        <div class="flex items-center space-x-2">
          <div v-if="isRefreshing" class="flex items-center text-sm text-gray-500">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Updating...
          </div>
          <button
            @click="refreshAppointments"
            :disabled="isRefreshing"
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200 disabled:opacity-50"
            title="Refresh Appointments"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Table Content -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sortBy('date')">
              Date
              <svg v-if="sortField === 'date'" class="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="sortDirection === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'"></path>
              </svg>
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Patient
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Doctor
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ward/Department
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sortBy('status')">
              Status
              <svg v-if="sortField === 'status'" class="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="sortDirection === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'"></path>
              </svg>
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="appointment in sortedAppointments" :key="appointment.id" class="table-row">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ appointment.date }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ appointment.patientName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ appointment.doctorName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ appointment.ward }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(appointment.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                {{ appointment.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex items-center space-x-2">
                <button
                  @click="viewAppointmentDetails(appointment)"
                  class="text-blue-600 hover:text-blue-800 text-xs font-medium"
                  title="View Details"
                >
                  Details
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Empty State -->
      <div v-if="appointments.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No upcoming appointments</h3>
        <p class="mt-1 text-sm text-gray-500">Appointments will appear here once scheduled.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpcomingAppointmentsTable',
  props: {
    appointments: {
      type: Array,
      required: true
    },
    refreshInterval: {
      type: Number,
      default: 30000 // 30 seconds
    }
  },
  data() {
    return {
      sortField: 'date',
      sortDirection: 'asc',
      isRefreshing: false,
      refreshTimer: null
    }
  },
  computed: {
    sortedAppointments() {
      const sorted = [...this.appointments].sort((a, b) => {
        let aValue = a[this.sortField]
        let bValue = b[this.sortField]
        
        if (this.sortField === 'date') {
          // Convert date format to comparable
          aValue = new Date(a.date)
          bValue = new Date(b.date)
        }
        
        if (aValue < bValue) {
          return this.sortDirection === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return this.sortDirection === 'asc' ? 1 : -1
        }
        return 0
      })
      
      return sorted
    }
  },
  mounted() {
    // Start auto-refresh timer
    this.startAutoRefresh()
  },
  
  beforeUnmount() {
    // Clean up timer
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
    }
  },
  
  methods: {
    sortBy(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortField = field
        this.sortDirection = 'asc'
      }
    },
    
    getStatusClass(status) {
      switch (status) {
        case 'Scheduled':
          return 'bg-blue-100 text-blue-800'
        case 'Confirmed':
          return 'bg-green-100 text-green-800'
        case 'Cancelled':
          return 'bg-red-100 text-red-800'
        case 'Completed':
          return 'bg-gray-100 text-gray-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    },
    
    async refreshAppointments() {
      this.isRefreshing = true
      try {
        await this.$emit('refresh')
      } finally {
        this.isRefreshing = false
      }
    },
    
    startAutoRefresh() {
      this.refreshTimer = setInterval(() => {
        if (!this.isRefreshing) {
          this.refreshAppointments()
        }
      }, this.refreshInterval)
    },
    
    viewAppointmentDetails(appointment) {
      this.$emit('view-details', appointment)
    }
  }
}
</script>

<style scoped>
/* Table specific styles */
</style>



