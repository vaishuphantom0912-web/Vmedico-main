<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Table Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Upcoming Slots</h3>
        <div class="flex items-center space-x-2">
          <div v-if="isRefreshing" class="flex items-center text-sm text-gray-500">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Updating...
          </div>
          <button
            @click="refreshSlots"
            :disabled="isRefreshing"
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200 disabled:opacity-50"
            title="Refresh Slots"
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
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sortBy('timeRange')">
              Time
              <svg v-if="sortField === 'timeRange'" class="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="sortDirection === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'"></path>
              </svg>
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sortBy('capacity')">
              Capacity
              <svg v-if="sortField === 'capacity'" class="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="sortDirection === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'"></path>
              </svg>
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
          <tr v-for="slot in sortedSlots" :key="slot.id" class="table-row">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ slot.date }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ slot.timeRange }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex items-center space-x-2">
                <span>{{ slot.current }}/{{ slot.capacity }} max</span>
                <button
                  v-if="slot.status === 'Open'"
                  @click="openCapacityModal(slot)"
                  class="text-blue-600 hover:text-blue-800 text-xs underline"
                  title="Modify Capacity"
                >
                  Edit
                </button>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center space-x-2">
                <span :class="getStatusClass(slot.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ slot.status }}
                </span>
                <div v-if="hasConflict(slot)" class="flex items-center text-yellow-600" title="Scheduling conflict detected">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex items-center space-x-2">
                <button
                  v-if="slot.status === 'Open'"
                  @click="changeSlotStatus(slot, 'Cancelled')"
                  class="text-red-600 hover:text-red-800 text-xs font-medium"
                  title="Cancel Slot"
                >
                  Cancel
                </button>
                <button
                  v-if="slot.status === 'Cancelled'"
                  @click="changeSlotStatus(slot, 'Open')"
                  class="text-green-600 hover:text-green-800 text-xs font-medium"
                  title="Reopen Slot"
                >
                  Reopen
                </button>
                <button
                  @click="viewSlotDetails(slot)"
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
      <div v-if="slots.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No upcoming slots</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new appointment slot.</p>
      </div>
    </div>

    <!-- Capacity Modification Modal -->
    <div v-if="showCapacityModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeCapacityModal">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" @click.stop>
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Modify Slot Capacity</h3>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Date: {{ selectedSlot?.date }} {{ selectedSlot?.timeRange }}
            </label>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Current Bookings: {{ selectedSlot?.current }}
            </label>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              New Capacity:
            </label>
            <input
              v-model.number="newCapacity"
              type="number"
              :min="selectedSlot?.current || 0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{ 'border-red-500': capacityError }"
            />
            <p v-if="capacityError" class="text-red-500 text-sm mt-1">{{ capacityError }}</p>
          </div>
          <div class="flex justify-end space-x-3">
            <button
              @click="closeCapacityModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              @click="updateCapacity"
              :disabled="!!capacityError || !newCapacity"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpcomingSlotsTable',
  props: {
    slots: {
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
      showCapacityModal: false,
      selectedSlot: null,
      newCapacity: null,
      refreshTimer: null
    }
  },
  computed: {
    sortedSlots() {
      const sorted = [...this.slots].sort((a, b) => {
        let aValue = a[this.sortField]
        let bValue = b[this.sortField]
        
        // Handle different data types
        if (this.sortField === 'capacity') {
          aValue = a.capacity
          bValue = b.capacity
        } else if (this.sortField === 'date') {
          // Convert MM-DD format to comparable date
          aValue = new Date(`2024-${a.date}`)
          bValue = new Date(`2024-${b.date}`)
        } else if (this.sortField === 'timeRange') {
          // Extract start time for comparison
          aValue = a.timeRange.split('-')[0]
          bValue = b.timeRange.split('-')[0]
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
    },
    
    capacityError() {
      if (!this.newCapacity || !this.selectedSlot) return null
      
      if (this.newCapacity < this.selectedSlot.current) {
        return `Capacity cannot be less than current bookings (${this.selectedSlot.current})`
      }
      
      if (this.newCapacity < 1) {
        return 'Capacity must be at least 1'
      }
      
      if (this.newCapacity > 50) {
        return 'Capacity cannot exceed 50'
      }
      
      return null
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
        case 'Open':
          return 'bg-green-100 text-green-800'
        case 'Full':
          return 'bg-red-100 text-red-800'
        case 'Cancelled':
          return 'bg-gray-100 text-gray-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    },
    
    async refreshSlots() {
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
          this.refreshSlots()
        }
      }, this.refreshInterval)
    },
    
    // Capacity Management Methods
    openCapacityModal(slot) {
      this.selectedSlot = slot
      this.newCapacity = slot.capacity
      this.showCapacityModal = true
    },
    
    closeCapacityModal() {
      this.showCapacityModal = false
      this.selectedSlot = null
      this.newCapacity = null
    },
    
    async updateCapacity() {
      if (this.capacityError || !this.selectedSlot) return
      
      try {
        await this.$emit('update-capacity', {
          slotId: this.selectedSlot.id,
          newCapacity: this.newCapacity
        })
        
        this.closeCapacityModal()
        
        // Show success message
        this.$emit('show-message', {
          type: 'success',
          message: 'Slot capacity updated successfully'
        })
      } catch (error) {
        this.$emit('show-message', {
          type: 'error',
          message: 'Failed to update slot capacity'
        })
      }
    },
    
    // Status Management Methods
    async changeSlotStatus(slot, newStatus) {
      try {
        await this.$emit('update-status', {
          slotId: slot.id,
          newStatus: newStatus
        })
        
        this.$emit('show-message', {
          type: 'success',
          message: `Slot ${newStatus.toLowerCase()} successfully`
        })
      } catch (error) {
        this.$emit('show-message', {
          type: 'error',
          message: `Failed to ${newStatus.toLowerCase()} slot`
        })
      }
    },
    
    viewSlotDetails(slot) {
      this.$emit('view-details', slot)
    },
    
    // Conflict Detection
    hasConflict(slot) {
      // Check for scheduling conflicts with other slots
      const conflicts = this.slots.filter(otherSlot => {
        if (otherSlot.id === slot.id) return false
        
        // Check if dates match
        if (otherSlot.date !== slot.date) return false
        
        // Check for time overlap
        const [slotStart, slotEnd] = slot.timeRange.split('-').map(t => this.timeToMinutes(t))
        const [otherStart, otherEnd] = otherSlot.timeRange.split('-').map(t => this.timeToMinutes(t))
        
        return (slotStart < otherEnd && slotEnd > otherStart)
      })
      
      return conflicts.length > 0
    },
    
    timeToMinutes(timeStr) {
      const [hours, minutes] = timeStr.split(':').map(Number)
      return hours * 60 + minutes
    }
  }
}
</script>

<style scoped>
/* Table specific styles */
</style>