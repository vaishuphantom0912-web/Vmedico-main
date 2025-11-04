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
          <h2 class="text-xl font-semibold text-gray-900">Upload Reports</h2>
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
          <form @submit.prevent="uploadReport">
            <!-- Attach Files -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Attach Files
              </label>
              <div 
                class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors duration-200"
                @dragover.prevent
                @drop.prevent="handleFileDrop"
                @click="triggerFileInput"
              >
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.dcm"
                  class="hidden"
                  @change="handleFileSelect"
                />
                
                <!-- Upload Icon -->
                <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                
                <p class="text-gray-500 mb-2">
                  <span class="font-medium cursor-pointer text-blue-600 hover:text-blue-500">Drag & Drop files here or Browse</span>
                </p>
                <p class="text-sm text-gray-400">
                  Supported: PDF, JPG, PNG, DICOM. Max 25MB each.
                </p>
                
                <!-- Selected Files Display -->
                <div v-if="selectedFiles.length > 0" class="mt-4 text-left">
                  <div v-for="(file, index) in selectedFiles" :key="index" class="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                    <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                    <button
                      type="button"
                      @click.stop="removeFile(index)"
                      class="text-red-500 hover:text-red-700 ml-2"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

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

            <!-- Report Type and Report Date Row -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <!-- Report Type -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Report Type
                </label>
                <select
                  v-model="formData.reportType"
                  class="w-full px-3 py-2 border-2 border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Choose</option>
                  <option value="Blood Test">Blood Test</option>
                  <option value="Urine Test">Urine Test</option>
                  <option value="X-Ray">X-Ray</option>
                  <option value="CT Scan">CT Scan</option>
                  <option value="MRI">MRI</option>
                  <option value="Ultrasound">Ultrasound</option>
                  <option value="Pathology">Pathology</option>
                  <option value="Microbiology">Microbiology</option>
                </select>
              </div>

              <!-- Report Date -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Report Date
                </label>
                <div class="relative">
                  <input
                    v-model="formData.reportDate"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Ref. Physician and Notes Row -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <!-- Ref. Physician -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Ref. Physician
                </label>
                <input
                  v-model="formData.refPhysician"
                  type="text"
                  placeholder="Optional"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <!-- Notes -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <input
                  v-model="formData.notes"
                  type="text"
                  placeholder="Any remarks"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                Upload
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
  name: 'UploadReportModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedFiles: [],
      formData: {
        patientContact: '',
        reportType: '',
        reportDate: '',
        refPhysician: '',
        notes: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return this.selectedFiles.length > 0 && 
             this.formData.patientContact.trim() &&
             this.formData.reportType && 
             this.formData.reportDate
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        // Reset form when modal opens
        this.resetForm()
        // Set default date to today
        this.formData.reportDate = new Date().toISOString().split('T')[0]
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
      this.selectedFiles = []
      this.formData = {
        patientContact: '',
        reportType: '',
        reportDate: '',
        refPhysician: '',
        notes: ''
      }
    },
    
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    
    handleFileSelect(event) {
      const files = Array.from(event.target.files)
      this.addFiles(files)
    },
    
    handleFileDrop(event) {
      const files = Array.from(event.dataTransfer.files)
      this.addFiles(files)
    },
    
    addFiles(files) {
      const validFiles = files.filter(file => {
        // Check file size (25MB max)
        if (file.size > 25 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Maximum size is 25MB.`)
          return false
        }
        
        // Check file type
        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/dicom']
        const validExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.dcm']
        
        const isValidType = validTypes.includes(file.type) || 
                           validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
        
        if (!isValidType) {
          alert(`File ${file.name} is not supported. Please use PDF, JPG, PNG, or DICOM files.`)
          return false
        }
        
        return true
      })
      
      this.selectedFiles = [...this.selectedFiles, ...validFiles]
    },
    
    removeFile(index) {
      this.selectedFiles.splice(index, 1)
    },
    
    uploadReport() {
      if (!this.isFormValid) return
      
      // Create report data object
      const reportData = {
        id: 'REPORT-' + Date.now().toString().slice(-3),
        patientContact: this.formData.patientContact.trim(),
        type: this.formData.reportType,
        date: this.formData.reportDate,
        refPhysician: this.formData.refPhysician.trim(),
        notes: this.formData.notes.trim(),
        files: this.selectedFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          file: file // Store the actual file object for download
        })),
        uploadedAt: new Date().toISOString(),
        status: 'Uploaded'
      }
      
      // Emit the report upload event
      this.$emit('report-uploaded', reportData)
      
      // Reset form and close modal
      this.resetForm()
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

/* File drop zone styles */
.border-dashed {
  border-style: dashed;
}

.cursor-pointer {
  cursor: pointer;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>