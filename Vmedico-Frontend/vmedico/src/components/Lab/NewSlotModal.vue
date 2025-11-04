<template>
  <!-- Modal Overlay - teleported to body for proper overlay -->
  <Teleport to="body">
    <div 
      v-if="isVisible" 
      class="modal-backdrop"
      @click.self="closeModal"
    >
      <!-- Modal Content -->
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">New Slot</h2>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6">
        <form @submit.prevent="createSlot">
          <!-- Patient Email or Phone -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Patient Email or Phone Number
            </label>
            <input
              v-model="formData.patientContact"
              type="text"
              placeholder="Enter email (john.doe@email.com) or phone (+91 98765 43210)"
              class="w-full px-3 py-2 border-2 border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- Date and Time Row -->
          <div class="grid grid-cols-2 gap-4 mb-4">
            <!-- Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <div class="relative">
                <input
                  v-model="formData.date"
                  type="date"
                  placeholder="dd-mm-yyyy"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>

            <!-- Time -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                v-model="formData.time"
                type="time"
                placeholder="HH:MM AM/PM"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <!-- Notes -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              v-model="formData.notes"
              placeholder="Optional instructions"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            ></textarea>
          </div>

          <!-- Info Text -->
          <p class="text-sm text-gray-500 mb-6">
            Conflicts and holidays are automatically checked before slot creation.
          </p>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!isFormValid"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Create Slot
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'NewSlotModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        patientContact: '',
        date: '',
        time: '',
        notes: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return this.formData.patientContact.trim() && 
             this.formData.date && 
             this.formData.time
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        // Reset form when modal opens
        this.resetForm()
        // Set default date to today
        this.formData.date = new Date().toISOString().split('T')[0]
        // Add escape key listener
        document.addEventListener('keydown', this.handleEscapeKey)
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden'
      } else {
        // Remove escape key listener
        document.removeEventListener('keydown', this.handleEscapeKey)
        // Restore body scroll
        document.body.style.overflow = 'auto'
      }
    }
  },
  beforeUnmount() {
    // Clean up event listener and restore scroll
    document.removeEventListener('keydown', this.handleEscapeKey)
    document.body.style.overflow = 'auto'
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    
    handleEscapeKey(event) {
      if (event.key === 'Escape') {
        this.closeModal()
      }
    },
    
    resetForm() {
      this.formData = {
        patientContact: '',
        date: '',
        time: '',
        notes: ''
      }
    },
    
    createSlot() {
      if (!this.isFormValid) return
      
      // Create slot data object
      const slotData = {
        id: 'SLOT-' + Date.now().toString().slice(-3),
        patientContact: this.formData.patientContact.trim(),
        date: this.formatDate(this.formData.date),
        timeRange: this.formatTimeRange(this.formData.time),
        capacity: 1,
        current: 1,
        status: 'Booked',
        notes: this.formData.notes.trim()
      }
      
      // Emit the slot creation event
      this.$emit('slot-created', slotData)
      
      // Close modal
      this.closeModal()
    },
    
    formatDate(dateString) {
      // Convert YYYY-MM-DD to MM-DD format
      const date = new Date(dateString)
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${month}-${day}`
    },
    
    formatTimeRange(timeString) {
      // Convert HH:MM to HH:MM-HH:MM format (1 hour slot)
      const [hours, minutes] = timeString.split(':')
      const startTime = `${hours}:${minutes}`
      
      // Add 1 hour for end time
      let endHour = parseInt(hours) + 1
      const endTime = `${endHour.toString().padStart(2, '0')}:${minutes}`
      
      return `${startTime}-${endTime}`
    }
  }
}
</script>

<style scoped>
/* Modal backdrop that covers the entire viewport */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

/* Additional styles for better modal appearance */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Ensure modal content is properly positioned */
.bg-white {
  background-color: white;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.relative {
  position: relative;
}
</style>