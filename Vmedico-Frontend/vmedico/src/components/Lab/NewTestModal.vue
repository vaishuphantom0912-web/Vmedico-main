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
          <h2 class="text-xl font-semibold text-gray-900">Create New Test</h2>
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
          <form @submit.prevent="createTest">
            <!-- Test Name -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Test Name
              </label>
              <input
                v-model="formData.testName"
                type="text"
                placeholder="e.g., Complete Blood Count"
                class="w-full px-3 py-2 border-2 border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <!-- Test Code and Category Row -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <!-- Test Code -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Test Code
                </label>
                <input
                  v-model="formData.testCode"
                  type="text"
                  placeholder="e.g., CBC-001"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <!-- Category -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  v-model="formData.category"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Choose</option>
                  <option value="Blood Test">Blood Test</option>
                  <option value="Urine Test">Urine Test</option>
                  <option value="Biochemistry">Biochemistry</option>
                  <option value="Hematology">Hematology</option>
                  <option value="Microbiology">Microbiology</option>
                  <option value="Immunology">Immunology</option>
                  <option value="Pathology">Pathology</option>
                </select>
              </div>
            </div>

            <!-- Base Price and Turnaround Row -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <!-- Base Price -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Base Price ($)
                </label>
                <input
                  v-model="formData.basePrice"
                  type="number"
                  step="0.01"
                  placeholder="45.00"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <!-- Turnaround -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Turnaround
                </label>
                <input
                  v-model="formData.turnaround"
                  type="text"
                  placeholder="e.g., 24h"
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
                Create Test
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
  name: 'NewTestModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        testName: '',
        testCode: '',
        category: '',
        basePrice: '',
        turnaround: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return this.formData.testName.trim() && 
             this.formData.testCode.trim() && 
             this.formData.category && 
             this.formData.basePrice && 
             this.formData.turnaround.trim()
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
        testName: '',
        testCode: '',
        category: '',
        basePrice: '',
        turnaround: ''
      }
    },
    
    createTest() {
      if (!this.isFormValid) return
      
      // Create test data object
      const testData = {
        id: 'TEST-' + Date.now().toString().slice(-3),
        name: this.formData.testName.trim(),
        code: this.formData.testCode.trim(),
        category: this.formData.category,
        basePrice: parseFloat(this.formData.basePrice),
        turnaround: this.formData.turnaround.trim(),
        status: 'Active',
        createdAt: new Date().toISOString()
      }
      
      // Emit the test creation event
      this.$emit('test-created', testData)
      
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