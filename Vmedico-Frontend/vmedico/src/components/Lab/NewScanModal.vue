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
          <h2 class="text-xl font-semibold text-gray-900">Create New Scan</h2>
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
          <form @submit.prevent="createScan">
            <!-- Scan Name -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Scan Name
              </label>
              <input
                v-model="formData.scanName"
                type="text"
                placeholder="e.g., CT Head Without Contrast"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <!-- Scan Code and Modality Row -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <!-- Scan Code -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Scan Code
                </label>
                <input
                  v-model="formData.scanCode"
                  type="text"
                  placeholder="e.g., CT-1001"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <!-- Modality -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Modality
                </label>
                <select
                  v-model="formData.modality"
                  class="w-full px-3 py-2 border-2 border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Choose</option>
                  <option value="CT">CT Scan</option>
                  <option value="MRI">MRI</option>
                  <option value="X-Ray">X-Ray</option>
                  <option value="Ultrasound">Ultrasound</option>
                  <option value="PET">PET Scan</option>
                  <option value="Mammography">Mammography</option>
                  <option value="Nuclear Medicine">Nuclear Medicine</option>
                </select>
              </div>
            </div>

            <!-- Base Price and Room Row -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <!-- Base Price -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Base Price (Rs)
                </label>
                <input
                  v-model="formData.basePrice"
                  type="number"
                  step="0.01"
                  placeholder="450.00"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <!-- Room -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Room
                </label>
                <input
                  v-model="formData.room"
                  type="text"
                  placeholder="e.g., CT Room 2"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

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
                Create Scan
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
  name: 'NewScanModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        scanName: '',
        scanCode: '',
        modality: '',
        basePrice: '',
        room: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return this.formData.scanName.trim() && 
             this.formData.scanCode.trim() && 
             this.formData.modality && 
             this.formData.basePrice && 
             this.formData.room.trim()
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        // Reset form when modal opens
        this.resetForm()
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
        scanName: '',
        scanCode: '',
        modality: '',
        basePrice: '',
        room: ''
      }
    },
    
    createScan() {
      if (!this.isFormValid) return
      
      // Create scan data object
      const scanData = {
        id: 'SCAN-' + Date.now().toString().slice(-3),
        name: this.formData.scanName.trim(),
        code: this.formData.scanCode.trim(),
        modality: this.formData.modality,
        basePrice: parseFloat(this.formData.basePrice),
        room: this.formData.room.trim(),
        status: 'Active',
        createdAt: new Date().toISOString()
      }
      
      // Emit the scan creation event
      this.$emit('scan-created', scanData)
      
      // Close modal
      this.closeModal()
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