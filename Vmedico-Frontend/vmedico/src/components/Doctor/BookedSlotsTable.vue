<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Booked Appointments</h3>
        <p class="text-sm text-gray-500 mt-1">Manage your scheduled patient consultations</p>
      </div>
      <button
        @click="refreshSlots"
        class="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Refresh
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symptoms</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="slot in filteredSlots" :key="slot.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ formatDate(slot.date) }}</div>
              <div class="text-sm text-gray-500">{{ slot.time }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ slot.patientName || slot.patient }}</div>
              <div class="text-sm text-gray-500">{{ slot.patientAge || '' }} {{ slot.patientGender || '' }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ slot.patientPhone || slot.contact || 'N/A' }}</div>
              <div class="text-sm text-gray-500">{{ slot.patientEmail || '' }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900 max-w-xs truncate">{{ slot.symptoms || slot.complaint || 'Not specified' }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                :class="getStatusClass(slot.status)"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {{ slot.status || 'Scheduled' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <template v-if="slot.status === 'In Progress'">
                <button
                  @click="finishConsultation(slot)"
                  class="px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors mr-3 flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Finish Consultation
                </button>
                <button
                  @click="startConsultation(slot)"
                  class="text-blue-600 hover:text-blue-900 transition-colors mr-3"
                >
                  Resume Consultation
                </button>
              </template>
              <template v-else-if="slot.status === 'Completed'">
                <span class="text-gray-500 italic">Consultation Completed</span>
                <button
                  @click="viewDetails(slot)"
                  class="text-blue-600 hover:text-blue-900 transition-colors ml-3"
                >
                  View Details
                </button>
              </template>
              <template v-else>
                <button
                  @click="startConsultation(slot)"
                  class="px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors mr-3 flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Start Consultation
                </button>
                <button
                  @click="viewDetails(slot)"
                  class="text-blue-600 hover:text-blue-900 transition-colors"
                >
                  View Details
                </button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="filteredSlots.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
        <p class="mt-1 text-sm text-gray-500">You don't have any booked appointments yet.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookedSlotsTable',
  props: {
    slots: {
      type: Array,
      required: true,
      default: () => []
    },
    refreshInterval: {
      type: Number,
      default: 30000 // 30 seconds
    }
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    filteredSlots() {
      if (!this.searchQuery) return this.slots
      const query = this.searchQuery.toLowerCase()
      return this.slots.filter(slot => 
        (slot.patientName || slot.patient || '').toLowerCase().includes(query) ||
        (slot.patientPhone || slot.contact || '').toLowerCase().includes(query) ||
        (slot.symptoms || slot.complaint || '').toLowerCase().includes(query)
      )
    }
  },
  mounted() {
    // Auto-refresh slots at specified interval
    if (this.refreshInterval > 0) {
      setInterval(() => {
        this.refreshSlots()
      }, this.refreshInterval)
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return 'N/A'
      const d = new Date(date)
      return d.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    },
    getStatusClass(status) {
      const classes = {
        'Scheduled': 'bg-blue-100 text-blue-800',
        'Confirmed': 'bg-green-100 text-green-800',
        'In Progress': 'bg-yellow-100 text-yellow-800',
        'Completed': 'bg-gray-100 text-gray-800',
        'Cancelled': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    refreshSlots() {
      this.$emit('refresh')
    },
    startConsultation(slot) {
      // Mark as "In Progress" if not already started
      if (slot.status !== 'In Progress') {
        this.$emit('update-status', { slot, status: 'In Progress' })
      }
      this.$emit('start-consultation', slot)
    },
    finishConsultation(slot) {
      this.$emit('finish-consultation', slot)
    },
    viewDetails(slot) {
      this.$emit('view-details', slot)
    }
  }
}
</script>

<style scoped>
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>

