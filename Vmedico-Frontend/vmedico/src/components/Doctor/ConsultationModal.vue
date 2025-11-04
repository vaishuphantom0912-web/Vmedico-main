<template>
  <div v-if="isVisible" class="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="closeModal">
    <div class="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-600 to-teal-600">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-white">Patient Consultation</h2>
            <p class="text-green-100 mt-1">{{ patient?.patientName || patient?.patient || 'Patient Details' }}</p>
          </div>
          <button
            @click="closeModal"
            class="text-white hover:text-green-100 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content - Side by Side Layout -->
      <div class="flex-1 overflow-y-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <!-- Left Side - Patient Details -->
          <div class="space-y-4">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Patient Information
              </h3>
              
              <div class="space-y-3">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-sm font-medium text-gray-500">Name</label>
                    <p class="text-sm text-gray-900 mt-1">{{ patient?.patientName || patient?.patient || 'N/A' }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Age</label>
                    <p class="text-sm text-gray-900 mt-1">{{ patient?.patientAge || 'N/A' }}</p>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-sm font-medium text-gray-500">Gender</label>
                    <p class="text-sm text-gray-900 mt-1">{{ patient?.patientGender || 'N/A' }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Phone</label>
                    <p class="text-sm text-gray-900 mt-1">{{ patient?.patientPhone || patient?.contact || 'N/A' }}</p>
                  </div>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Email</label>
                  <p class="text-sm text-gray-900 mt-1">{{ patient?.patientEmail || 'N/A' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Appointment Date & Time</label>
                  <p class="text-sm text-gray-900 mt-1">{{ formatDate(patient?.date) }} at {{ patient?.time || 'N/A' }}</p>
                </div>
              </div>
            </div>

            <!-- Symptoms/Complaints -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Chief Complaint & Symptoms
              </h3>
              <div class="bg-orange-50 rounded-lg p-4">
                <p class="text-sm text-gray-700">{{ patient?.symptoms || patient?.complaint || 'No symptoms mentioned' }}</p>
              </div>
            </div>

            <!-- Vitals (if available) -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Vital Signs</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-blue-50 rounded-lg p-3">
                  <label class="text-xs font-medium text-gray-500">Blood Pressure</label>
                  <input 
                    v-model="vitals.bp" 
                    type="text" 
                    placeholder="120/80"
                    class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div class="bg-blue-50 rounded-lg p-3">
                  <label class="text-xs font-medium text-gray-500">Pulse Rate</label>
                  <input 
                    v-model="vitals.pulse" 
                    type="text" 
                    placeholder="72 bpm"
                    class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div class="bg-blue-50 rounded-lg p-3">
                  <label class="text-xs font-medium text-gray-500">Temperature</label>
                  <input 
                    v-model="vitals.temperature" 
                    type="text" 
                    placeholder="98.6°F"
                    class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div class="bg-blue-50 rounded-lg p-3">
                  <label class="text-xs font-medium text-gray-500">Weight</label>
                  <input 
                    v-model="vitals.weight" 
                    type="text" 
                    placeholder="70 kg"
                    class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side - Prescription Form -->
          <div class="space-y-4">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Prescription
              </h3>

              <!-- Diagnosis -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
                <textarea
                  v-model="prescriptionData.diagnosis"
                  rows="3"
                  placeholder="Enter primary diagnosis..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>

              <!-- Medicines -->
              <div class="mb-4">
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-medium text-gray-700">Medicines</label>
                  <button
                    @click="addMedicine"
                    class="px-3 py-1 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    + Add Medicine
                  </button>
                </div>
                
                <div v-for="(medicine, index) in prescriptionData.medicines" :key="index" class="mb-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div class="grid grid-cols-12 gap-3">
                    <div class="col-span-5">
                      <label class="block text-xs font-medium text-gray-600 mb-1">Medicine Name</label>
                      <input
                        v-model="medicine.name"
                        type="text"
                        placeholder="e.g., Paracetamol"
                        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div class="col-span-3">
                      <label class="block text-xs font-medium text-gray-600 mb-1">Dosage</label>
                      <input
                        v-model="medicine.dosage"
                        type="text"
                        placeholder="500mg"
                        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div class="col-span-3">
                      <label class="block text-xs font-medium text-gray-600 mb-1">Frequency</label>
                      <input
                        v-model="medicine.frequency"
                        type="text"
                        placeholder="2x daily"
                        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div class="col-span-1 flex items-end">
                      <button
                        @click="removeMedicine(index)"
                        class="w-full p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="mt-2">
                    <label class="block text-xs font-medium text-gray-600 mb-1">Instructions</label>
                    <input
                      v-model="medicine.instructions"
                      type="text"
                      placeholder="After meals, with water..."
                      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <!-- Additional Instructions -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Additional Instructions</label>
                <textarea
                  v-model="prescriptionData.additionalInstructions"
                  rows="3"
                  placeholder="Diet, lifestyle, follow-up instructions..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>

              <!-- Follow-up -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Follow-up Date</label>
                <input
                  v-model="prescriptionData.followUpDate"
                  type="date"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <!-- Tests Recommended -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Tests Recommended (if any)</label>
                <textarea
                  v-model="prescriptionData.testsRecommended"
                  rows="2"
                  placeholder="Blood test, X-Ray, etc."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
        <button
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <div class="flex space-x-3">
          <button
            @click="finishConsultation"
            class="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Finish Consultation
          </button>
          <button
            @click="saveDraft"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Save Draft
          </button>
          <button
            @click="savePrescription"
            class="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Save & Generate PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsultationModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    patient: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      vitals: {
        bp: '',
        pulse: '',
        temperature: '',
        weight: ''
      },
      prescriptionData: {
        diagnosis: '',
        medicines: [
          { name: '', dosage: '', frequency: '', instructions: '' }
        ],
        additionalInstructions: '',
        followUpDate: '',
        testsRecommended: ''
      }
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal && this.patient) {
        this.resetForm()
      }
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
    resetForm() {
      this.vitals = {
        bp: '',
        pulse: '',
        temperature: '',
        weight: ''
      }
      this.prescriptionData = {
        diagnosis: '',
        medicines: [
          { name: '', dosage: '', frequency: '', instructions: '' }
        ],
        additionalInstructions: '',
        followUpDate: '',
        testsRecommended: ''
      }
    },
    addMedicine() {
      this.prescriptionData.medicines.push({
        name: '',
        dosage: '',
        frequency: '',
        instructions: ''
      })
    },
    removeMedicine(index) {
      if (this.prescriptionData.medicines.length > 1) {
        this.prescriptionData.medicines.splice(index, 1)
      }
    },
    closeModal() {
      this.$emit('close')
    },
    finishConsultation() {
      // Finish consultation without saving prescription (optional completion)
      if (confirm('Are you sure you want to finish this consultation? The prescription will not be saved.')) {
        this.$emit('finish-consultation', {
          patient: this.patient,
          vitals: this.vitals,
          completedAt: new Date().toISOString()
        })
        this.resetForm()
        this.closeModal()
      }
    },
    saveDraft() {
      // Save draft to localStorage
      const draftData = {
        patientId: this.patient?.id,
        patientName: this.patient?.patientName || this.patient?.patient,
        vitals: this.vitals,
        prescription: this.prescriptionData,
        timestamp: new Date().toISOString()
      }
      
      let drafts = JSON.parse(localStorage.getItem('prescriptionDrafts') || '[]')
      const existingIndex = drafts.findIndex(d => d.patientId === this.patient?.id)
      
      if (existingIndex >= 0) {
        drafts[existingIndex] = draftData
      } else {
        drafts.push(draftData)
      }
      
      localStorage.setItem('prescriptionDrafts', JSON.stringify(drafts))
      
      alert('Draft saved successfully!')
    },
    savePrescription() {
      // Validate required fields
      if (!this.prescriptionData.diagnosis.trim()) {
        alert('Please enter a diagnosis')
        return
      }
      
      // Filter out empty medicines
      const medicines = this.prescriptionData.medicines.filter(m => m.name.trim())
      
      if (medicines.length === 0) {
        alert('Please add at least one medicine')
        return
      }
      
      // Prepare prescription data for PDF generation
      const prescriptionPayload = {
        patient: {
          id: this.patient?.id,
          name: this.patient?.patientName || this.patient?.patient,
          age: this.patient?.patientAge,
          gender: this.patient?.patientGender,
          phone: this.patient?.patientPhone || this.patient?.contact,
          email: this.patient?.patientEmail,
          appointmentDate: this.patient?.date,
          appointmentTime: this.patient?.time,
          symptoms: this.patient?.symptoms || this.patient?.complaint
        },
        vitals: this.vitals,
        prescription: {
          diagnosis: this.prescriptionData.diagnosis,
          medicines: medicines,
          additionalInstructions: this.prescriptionData.additionalInstructions,
          followUpDate: this.prescriptionData.followUpDate,
          testsRecommended: this.prescriptionData.testsRecommended,
          date: new Date().toISOString()
        },
        doctor: {
          name: 'Dr. Sarah Wilson', // This should come from user session
          specialization: 'Cardiology',
          license: 'DR-LIC-12345'
        }
      }
      
      // Emit event with prescription data for PDF generation
      this.$emit('save-prescription', prescriptionPayload)
      
      // Reset form
      this.resetForm()
      this.closeModal()
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

