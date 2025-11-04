<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Lab Branding -->
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-3">
            <!-- Nova Diagnostics Logo/Icon -->
            <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-md">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"></path>
              </svg>
            </div>
            
            <!-- Lab Information -->
            <div>
              <h1 class="text-xl font-bold text-gray-900">{{ labInfo.name }}</h1>
              <div class="flex items-center space-x-4 text-sm text-gray-600">
                <span class="font-medium">LAB-ID: {{ labInfo.labId }}</span>
                <span class="font-medium">License: {{ labInfo.license }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Search and User Actions -->
        <div class="flex items-center space-x-6">
          <!-- Global Search -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, email, phone, tests, scans..."
              class="block w-80 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
              @keyup.enter="performSearch"
              @input="handleSearchInput"
            />
            <!-- Search Results Dropdown -->
            <div v-if="showSearchResults && searchResults.length > 0" class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              <div v-for="result in searchResults" :key="result.id" class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0" @click="selectSearchResult(result)">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ result.title }}</div>
                    <div class="text-xs text-gray-500">{{ result.subtitle }}</div>
                  </div>
                  <span class="text-xs px-2 py-1 rounded-full" :class="getSearchResultBadgeClass(result.type)">
                    {{ result.type }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Session Security Indicator -->
          <div class="flex items-center space-x-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="font-medium">Secure Session</span>
          </div>
          
          <!-- User Profile -->
          <div class="flex items-center space-x-3">
            <!-- User Info -->
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ currentUser.name }}</div>
              <div class="text-xs text-gray-500">{{ currentUser.role }}</div>
              <div class="text-xs text-gray-400">Last login: {{ formatLastLogin }}</div>
            </div>
            
            <!-- User Avatar -->
            <div class="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-sm">
              <span class="text-sm font-bold text-white">{{ userInitials }}</span>
            </div>
            
            <!-- Logout Button -->
            <button
              @click="confirmLogout"
              class="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
              title="Secure Logout"
            >
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Patient Details Modal -->
    <div v-if="showPatientModal && selectedPatient" class="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-xl">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-900">Patient Details</h3>
          <button @click="closePatientModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Patient Basic Information -->
        <div class="bg-blue-50 rounded-lg p-6 mb-6">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span class="text-xl font-bold text-white">{{ getPatientInitials(selectedPatient.name) }}</span>
            </div>
            <div>
              <h4 class="text-2xl font-bold text-gray-900">{{ selectedPatient.name }}</h4>
              <p class="text-gray-600">{{ selectedPatient.age }} years • {{ selectedPatient.gender }} • {{ selectedPatient.bloodGroup }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-500">Email</label>
              <p class="text-gray-900">{{ selectedPatient.email }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Phone</label>
              <p class="text-gray-900">{{ selectedPatient.phone }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Address</label>
              <p class="text-gray-900">{{ selectedPatient.address }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Last Visit</label>
              <p class="text-gray-900">{{ formatDate(selectedPatient.lastVisit) }}</p>
            </div>
          </div>
        </div>
        
        <!-- Patient Reports and Tests -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Uploaded Reports -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h5 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Uploaded Reports ({{ getPatientReports(selectedPatient.id).length }})
            </h5>
            
            <div v-if="getPatientReports(selectedPatient.id).length > 0" class="space-y-3">
              <div v-for="report in getPatientReports(selectedPatient.id)" :key="report.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h6 class="text-sm font-medium text-gray-900">{{ report.fileName }}</h6>
                    <div class="mt-1 text-sm text-gray-500">
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                        {{ report.type }}
                      </span>
                      <span>{{ formatDate(report.date) }}</span>
                    </div>
                    <p class="mt-2 text-sm text-gray-600">{{ report.notes || 'No additional notes' }}</p>
                  </div>
                  <div class="flex space-x-2 ml-4">
                    <button @click="viewReport(report)" class="text-blue-600 hover:text-blue-800 text-sm">View</button>
                    <button @click="downloadReport(report)" class="text-green-600 hover:text-green-800 text-sm">Download</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h6 class="mt-2 text-sm font-medium text-gray-900">No reports uploaded</h6>
              <p class="mt-1 text-sm text-gray-500">No reports have been uploaded for this patient yet.</p>
            </div>
          </div>
          
          <!-- Lab Tests & Scans -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h5 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"></path>
              </svg>
              Lab Tests & Scans ({{ getPatientTests(selectedPatient.id).length }})
            </h5>
            
            <div v-if="getPatientTests(selectedPatient.id).length > 0" class="space-y-3">
              <div v-for="test in getPatientTests(selectedPatient.id)" :key="test.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h6 class="text-sm font-medium text-gray-900">{{ test.name }}</h6>
                    <div class="mt-1 text-sm text-gray-500">
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                        {{ test.category }}
                      </span>
                      <span>{{ formatDate(test.date) }}</span>
                    </div>
                    <div class="mt-2 flex items-center">
                      <span class="text-sm text-gray-600 mr-2">Status:</span>
                      <span :class="getTestStatusClass(test.status)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                        {{ test.status }}
                      </span>
                    </div>
                  </div>
                  <div class="flex space-x-2 ml-4">
                    <button @click="viewTestDetails(test)" class="text-blue-600 hover:text-blue-800 text-sm">Details</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"></path>
              </svg>
              <h6 class="mt-2 text-sm font-medium text-gray-900">No tests or scans</h6>
              <p class="mt-1 text-sm text-gray-500">No lab tests or scans have been performed for this patient.</p>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="mt-6 flex justify-end space-x-3">
          <button @click="closePatientModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Close
          </button>
          <button @click="scheduleTest" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Schedule Test
          </button>
          <button @click="uploadReport" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
            Upload Report
          </button>
        </div>
      </div>
    </div>

    <!-- Schedule Test Modal -->
    <div v-if="showScheduleTestModal" class="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Schedule Test</h3>
          <button @click="closeScheduleTestModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="submitScheduleTest" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
            <select v-model="scheduleTestForm.testName" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Test Type</option>
              <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
              <option value="Lipid Profile">Lipid Profile</option>
              <option value="Thyroid Function Test">Thyroid Function Test</option>
              <option value="Liver Function Test">Liver Function Test</option>
              <option value="Blood Sugar Test">Blood Sugar Test</option>
              <option value="Chest X-Ray">Chest X-Ray</option>
              <option value="MRI Brain">MRI Brain</option>
              <option value="CT Abdomen">CT Abdomen</option>
              <option value="Ultrasound">Ultrasound</option>
              <option value="ECG">ECG</option>
            </select>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input v-model="scheduleTestForm.testDate" type="date" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input v-model="scheduleTestForm.testTime" type="time" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
            <textarea v-model="scheduleTestForm.notes" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Any special instructions..."></textarea>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="closeScheduleTestModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Schedule Test
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Upload Report Modal -->
    <div v-if="showUploadReportModal" class="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Upload Report</h3>
          <button @click="closeUploadReportModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="submitUploadReport" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select v-model="uploadReportForm.reportType" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Report Type</option>
              <option value="Blood Test">Blood Test</option>
              <option value="X-Ray">X-Ray</option>
              <option value="MRI Scan">MRI Scan</option>
              <option value="CT Scan">CT Scan</option>
              <option value="Ultrasound">Ultrasound</option>
              <option value="ECG">ECG</option>
              <option value="Pathology">Pathology</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">File Name</label>
            <input v-model="uploadReportForm.fileName" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Blood_Test_Report.pdf">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input type="file" @change="handleFileSelect" class="hidden" ref="fileInput" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p class="mt-2 text-sm text-gray-600">
                <button type="button" @click="$refs.fileInput.click()" class="text-blue-600 hover:text-blue-800">Click to upload</button>
                or drag and drop
              </p>
              <p class="text-xs text-gray-500">PDF, JPG, PNG, DOC up to 10MB</p>
              <p v-if="uploadReportForm.selectedFile" class="mt-2 text-sm text-green-600">
                Selected: {{ uploadReportForm.selectedFile.name }}
              </p>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
            <textarea v-model="uploadReportForm.notes" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Additional notes about the report..."></textarea>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="closeUploadReportModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
              Upload Report
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Confirm Secure Logout</h3>
        </div>
        <p class="text-gray-600 mb-6">Are you sure you want to logout? This will terminate your secure lab administrator session.</p>
        <div class="flex space-x-3">
          <button
            @click="handleLogout"
            class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Yes, Logout
          </button>
          <button
            @click="showLogoutConfirm = false"
            class="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: 'LabHeader',
  props: {
    labInfo: {
      type: Object,
      required: true,
      validator(value) {
        return value && value.name && value.labId && value.license
      }
    },
    currentUser: {
      type: Object,
      required: true,
      validator(value) {
        return value && value.name && value.role && value.lastLogin
      }
    }
  },
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      showSearchResults: false,
      showLogoutConfirm: false,
      showPatientModal: false,
      showScheduleTestModal: false,
      showUploadReportModal: false,
      selectedPatient: null,
      searchTimeout: null,
      
      // Form data for modals
      scheduleTestForm: {
        testName: '',
        testDate: '',
        testTime: '',
        notes: ''
      },
      uploadReportForm: {
        reportType: '',
        fileName: '',
        notes: '',
        selectedFile: null
      },
      
      // Patient Database - This would normally come from an API
      patientDatabase: [
        {
          id: 'PID-00123',
          name: 'John Doe',
          phone: '+91 98765 43210',
          email: 'john.doe@email.com',
          age: 35,
          gender: 'Male',
          bloodGroup: 'O+',
          address: '123 Main Street, City',
          emergencyContact: '+91 98765 43211',
          lastVisit: '2025-10-25'
        },
        {
          id: 'PID-00456',
          name: 'Jane Smith',
          phone: '+91 98765 43213',
          email: 'jane.smith@email.com',
          age: 28,
          gender: 'Female',
          bloodGroup: 'A+',
          address: '456 Oak Avenue, City',
          emergencyContact: '+91 98765 43214',
          lastVisit: '2025-10-28'
        },
        {
          id: 'PID-00789',
          name: 'Mike Johnson',
          phone: '+91 98765 43215',
          email: 'mike.johnson@email.com',
          age: 42,
          gender: 'Male',
          bloodGroup: 'B+',
          address: '789 Pine Street, City',
          emergencyContact: '+91 98765 43216',
          lastVisit: '2025-10-22'
        },
        {
          id: 'PID-00321',
          name: 'Sarah Wilson',
          phone: '+91 98765 43217',
          email: 'sarah.wilson@email.com',
          age: 31,
          gender: 'Female',
          bloodGroup: 'AB+',
          address: '321 Elm Street, City',
          emergencyContact: '+91 98765 43218',
          lastVisit: '2025-10-20'
        },
        {
          id: 'PID-00654',
          name: 'David Brown',
          phone: '+91 98765 43219',
          email: 'david.brown@email.com',
          age: 45,
          gender: 'Male',
          bloodGroup: 'O-',
          address: '654 Maple Avenue, City',
          emergencyContact: '+91 98765 43220',
          lastVisit: '2025-10-18'
        }
      ],
      
      // Available Tests
      availableTests: [
        { id: 'T001', name: 'Complete Blood Count (CBC)', category: 'Blood Test', duration: '30 min' },
        { id: 'T002', name: 'Lipid Profile', category: 'Blood Test', duration: '20 min' },
        { id: 'T003', name: 'Liver Function Test', category: 'Blood Test', duration: '25 min' },
        { id: 'T004', name: 'Thyroid Function Test', category: 'Blood Test', duration: '30 min' },
        { id: 'T005', name: 'Blood Sugar Test', category: 'Blood Test', duration: '15 min' }
      ],
      
      // Available Scans
      availableScans: [
        { id: 'S001', name: 'Chest X-Ray', category: 'X-Ray', duration: '15 min' },
        { id: 'S002', name: 'MRI Brain', category: 'MRI', duration: '45 min' },
        { id: 'S003', name: 'CT Abdomen', category: 'CT Scan', duration: '30 min' },
        { id: 'S004', name: 'Ultrasound', category: 'Ultrasound', duration: '20 min' },
        { id: 'S005', name: 'ECG', category: 'Cardiac', duration: '10 min' }
      ],
      
      // Patient Reports Database
      patientReports: [
        {
          id: 'RPT-001',
          patientId: 'PID-00123',
          fileName: 'Blood_Test_Report_Oct2025.pdf',
          type: 'Blood Test',
          date: '2025-10-25',
          notes: 'All parameters within normal range'
        },
        {
          id: 'RPT-002',
          patientId: 'PID-00456',
          fileName: 'MRI_Brain_Scan_Oct2025.pdf',
          type: 'MRI Scan',
          date: '2025-10-28',
          notes: 'No abnormalities detected'
        },
        {
          id: 'RPT-003',
          patientId: 'PID-00789',
          fileName: 'Chest_Xray_Report_Oct2025.pdf',
          type: 'X-Ray',
          date: '2025-10-22',
          notes: 'Clear chest, no signs of infection'
        }
      ],
      
      // Patient Tests Database
      patientTests: [
        {
          id: 'TEST-001',
          patientId: 'PID-00123',
          name: 'Complete Blood Count (CBC)',
          category: 'Blood Test',
          date: '2025-10-25',
          status: 'Completed'
        },
        {
          id: 'TEST-002',
          patientId: 'PID-00123',
          name: 'Lipid Profile',
          category: 'Blood Test',
          date: '2025-10-20',
          status: 'Completed'
        },
        {
          id: 'TEST-003',
          patientId: 'PID-00456',
          name: 'MRI Brain',
          category: 'MRI Scan',
          date: '2025-10-28',
          status: 'Completed'
        },
        {
          id: 'TEST-004',
          patientId: 'PID-00456',
          name: 'Thyroid Function Test',
          category: 'Blood Test',
          date: '2025-11-01',
          status: 'Scheduled'
        },
        {
          id: 'TEST-005',
          patientId: 'PID-00789',
          name: 'Chest X-Ray',
          category: 'X-Ray',
          date: '2025-10-22',
          status: 'Completed'
        }
      ]
    }
  },
  computed: {
    userInitials() {
      return this.currentUser.name
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2) // Limit to 2 characters
    },
    
    formatLastLogin() {
      if (!this.currentUser.lastLogin) return 'Unknown'
      
      const lastLogin = new Date(this.currentUser.lastLogin)
      const now = new Date()
      const diffInMinutes = Math.floor((now - lastLogin) / (1000 * 60))
      
      if (diffInMinutes < 1) return 'Just now'
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
      return lastLogin.toLocaleDateString()
    }
  },
  
  mounted() {
    // Verify lab administrator authentication on component mount
    this.verifyLabAdministrator()
    
    // Add click outside listener for search results
    document.addEventListener('click', this.handleClickOutside)
  },
  
  beforeUnmount() {
    // Clean up event listeners and timeouts
    document.removeEventListener('click', this.handleClickOutside)
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }
  },
  
  methods: {
    verifyLabAdministrator() {
      // Requirement 8.3: Verify user is authorized Lab Administrator
      if (!this.currentUser || this.currentUser.role !== 'Lab Administrator') {
        console.warn('Unauthorized access attempt detected')
        this.$emit('unauthorized-access')
        return false
      }
      return true
    },
    
    handleSearchInput() {
      // Clear previous timeout
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      
      // Debounce search to avoid excessive API calls
      this.searchTimeout = setTimeout(() => {
        if (this.searchQuery.trim().length >= 2) {
          this.performSearch()
        } else {
          this.clearSearchResults()
        }
      }, 300)
    },
    
    performSearch() {
      if (!this.searchQuery.trim()) {
        this.clearSearchResults()
        return
      }
      
      // Emit search event to parent component for API integration
      this.$emit('search', {
        query: this.searchQuery.trim(),
        types: ['patients', 'tests', 'scans']
      })
      
      // Search through actual patient data
      this.searchPatientData()
    },
    
    searchPatientData() {
      const query = this.searchQuery.toLowerCase().trim()
      let results = []
      
      // Search Patients by name, email, or phone
      const patientResults = this.patientDatabase.filter(patient => {
        return patient.name.toLowerCase().includes(query) ||
               patient.email.toLowerCase().includes(query) ||
               patient.phone.includes(query) ||
               patient.phone.replace(/\s+/g, '').includes(query.replace(/\s+/g, ''))
      }).map(patient => ({
        id: patient.id,
        title: patient.name,
        subtitle: `${patient.email} • ${patient.phone}`,
        type: 'Patient',
        data: patient
      }))
      
      // Search Tests
      const testResults = this.availableTests.filter(test => 
        test.name.toLowerCase().includes(query) ||
        test.category.toLowerCase().includes(query)
      ).map(test => ({
        id: test.id,
        title: test.name,
        subtitle: `${test.category} • Duration: ${test.duration}`,
        type: 'Test',
        data: test
      }))
      
      // Search Scans
      const scanResults = this.availableScans.filter(scan => 
        scan.name.toLowerCase().includes(query) ||
        scan.category.toLowerCase().includes(query)
      ).map(scan => ({
        id: scan.id,
        title: scan.name,
        subtitle: `${scan.category} • Duration: ${scan.duration}`,
        type: 'Scan',
        data: scan
      }))
      
      // Combine all results, prioritizing patients
      results = [...patientResults, ...testResults, ...scanResults]
      
      this.searchResults = results.slice(0, 8) // Limit to 8 results
      this.showSearchResults = this.searchResults.length > 0
    },
    
    selectSearchResult(result) {
      // Handle search result selection
      this.searchQuery = result.title
      this.clearSearchResults()
      
      // If it's a patient, show the patient details modal
      if (result.type === 'Patient') {
        this.selectedPatient = result.data
        this.showPatientModal = true
        console.log('Patient selected:', result.data)
        this.$emit('patient-selected', result.data)
      } else {
        // For tests and scans, emit the selection event
        this.$emit('search-select', {
          ...result,
          fullData: result.data
        })
      }
      
      console.log('Search result selected:', result)
    },
    
    clearSearchResults() {
      this.searchResults = []
      this.showSearchResults = false
    },
    
    getSearchResultBadgeClass(type) {
      const classes = {
        'Patient': 'bg-blue-100 text-blue-800',
        'Test': 'bg-green-100 text-green-800',
        'Scan': 'bg-purple-100 text-purple-800'
      }
      return classes[type] || 'bg-gray-100 text-gray-800'
    },
    
    handleClickOutside(event) {
      // Close search results when clicking outside
      if (!this.$el.contains(event.target)) {
        this.clearSearchResults()
      }
    },
    
    confirmLogout() {
      // Show logout confirmation modal for security
      this.showLogoutConfirm = true
    },
    
    handleLogout() {
      // Requirement 8.5: Secure session termination
      this.showLogoutConfirm = false
      
      // Clear any pending timeouts
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      
      // Emit logout event to parent component for proper handling
      this.$emit('logout', {
        reason: 'user_initiated',
        timestamp: new Date().toISOString()
      })
    },
    
    calculateSessionDuration() {
      if (!this.currentUser.lastLogin) return 0
      const loginTime = new Date(this.currentUser.lastLogin)
      const now = new Date()
      return Math.floor((now - loginTime) / (1000 * 60)) // Duration in minutes
    },
    
    // Patient Modal Methods
    closePatientModal() {
      this.showPatientModal = false
      this.selectedPatient = null
    },
    
    getPatientInitials(name) {
      return name
        .split(' ')
        .map(n => n.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    },
    
    getPatientReports(patientId) {
      return this.patientReports.filter(report => report.patientId === patientId)
    },
    
    getPatientTests(patientId) {
      return this.patientTests.filter(test => test.patientId === patientId)
    },
    
    getTestStatusClass(status) {
      const classes = {
        'Completed': 'bg-green-100 text-green-800',
        'Scheduled': 'bg-blue-100 text-blue-800',
        'In Progress': 'bg-yellow-100 text-yellow-800',
        'Cancelled': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    
    // Functional Button Methods
    viewReport(report) {
      console.log('Viewing report:', report)
      // Create a mock report preview
      const reportContent = `
        Report: ${report.fileName}
        Type: ${report.type}
        Date: ${this.formatDate(report.date)}
        Patient: ${this.selectedPatient.name}
        Notes: ${report.notes}
        
        This is a preview of the ${report.type} report.
        In a real application, this would open the actual report file.
      `
      
      // Show report in a new window/tab
      const newWindow = window.open('', '_blank')
      newWindow.document.write(`
        <html>
          <head>
            <title>${report.fileName}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
              .content { line-height: 1.6; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>${report.fileName}</h2>
              <p>Patient: ${this.selectedPatient.name} | Date: ${this.formatDate(report.date)}</p>
            </div>
            <div class="content">
              <pre>${reportContent}</pre>
            </div>
          </body>
        </html>
      `)
      newWindow.document.close()
    },
    
    downloadReport(report) {
      console.log('Downloading report:', report)
      // Create a downloadable file
      const reportContent = `
Report: ${report.fileName}
Type: ${report.type}
Date: ${this.formatDate(report.date)}
Patient: ${this.selectedPatient.name}
Patient ID: ${this.selectedPatient.id}
Email: ${this.selectedPatient.email}
Phone: ${this.selectedPatient.phone}

Notes: ${report.notes}

This is a sample ${report.type} report for ${this.selectedPatient.name}.
In a real application, this would be the actual medical report data.

Generated on: ${new Date().toLocaleString()}
      `
      
      // Create and download the file
      const blob = new Blob([reportContent], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = report.fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      // Show success message
      alert(`Report "${report.fileName}" downloaded successfully!`)
    },
    
    viewTestDetails(test) {
      console.log('Viewing test details:', test)
      // Show detailed test information
      const testDetails = `
Test Details:
Name: ${test.name}
Category: ${test.category}
Date: ${this.formatDate(test.date)}
Status: ${test.status}
Patient: ${this.selectedPatient.name}

Test Information:
- Test ID: ${test.id}
- Patient ID: ${this.selectedPatient.id}
- Blood Group: ${this.selectedPatient.bloodGroup}
- Age: ${this.selectedPatient.age}
- Gender: ${this.selectedPatient.gender}

${test.status === 'Completed' ? 'Results are available for review.' : 
  test.status === 'Scheduled' ? 'Test is scheduled and pending.' : 
  'Test is currently in progress.'}
      `
      
      alert(testDetails)
    },
    
    scheduleTest() {
      console.log('Scheduling test for patient:', this.selectedPatient)
      // Reset form
      this.scheduleTestForm = {
        testName: '',
        testDate: '',
        testTime: '',
        notes: ''
      }
      this.showScheduleTestModal = true
    },
    
    uploadReport() {
      console.log('Uploading report for patient:', this.selectedPatient)
      // Reset form
      this.uploadReportForm = {
        reportType: '',
        fileName: '',
        notes: '',
        selectedFile: null
      }
      this.showUploadReportModal = true
    },
    
    // Modal Methods
    closeScheduleTestModal() {
      this.showScheduleTestModal = false
      this.scheduleTestForm = {
        testName: '',
        testDate: '',
        testTime: '',
        notes: ''
      }
    },
    
    closeUploadReportModal() {
      this.showUploadReportModal = false
      this.uploadReportForm = {
        reportType: '',
        fileName: '',
        notes: '',
        selectedFile: null
      }
    },
    
    submitScheduleTest() {
      // Add new test to patient's tests
      const newTest = {
        id: `TEST-${Date.now()}`,
        patientId: this.selectedPatient.id,
        name: this.scheduleTestForm.testName,
        category: this.getTestCategory(this.scheduleTestForm.testName),
        date: this.scheduleTestForm.testDate,
        time: this.scheduleTestForm.testTime,
        status: 'Scheduled',
        notes: this.scheduleTestForm.notes
      }
      
      this.patientTests.push(newTest)
      
      // Show success message
      this.showSuccessMessage(`Test "${this.scheduleTestForm.testName}" scheduled successfully for ${this.formatDate(this.scheduleTestForm.testDate)}!`)
      
      // Close modal
      this.closeScheduleTestModal()
    },
    
    submitUploadReport() {
      // Add new report to patient's reports
      const newReport = {
        id: `RPT-${Date.now()}`,
        patientId: this.selectedPatient.id,
        fileName: this.uploadReportForm.fileName,
        type: this.uploadReportForm.reportType,
        date: new Date().toISOString().split('T')[0], // Today's date
        notes: this.uploadReportForm.notes || 'No additional notes',
        file: this.uploadReportForm.selectedFile
      }
      
      this.patientReports.push(newReport)
      
      // Show success message
      this.showSuccessMessage(`Report "${this.uploadReportForm.fileName}" uploaded successfully!`)
      
      // Close modal
      this.closeUploadReportModal()
    },
    
    handleFileSelect(event) {
      const file = event.target.files[0]
      if (file) {
        this.uploadReportForm.selectedFile = file
        // Auto-fill filename if not already filled
        if (!this.uploadReportForm.fileName) {
          this.uploadReportForm.fileName = file.name
        }
      }
    },
    
    getTestCategory(testName) {
      const categories = {
        'Complete Blood Count (CBC)': 'Blood Test',
        'Lipid Profile': 'Blood Test',
        'Thyroid Function Test': 'Blood Test',
        'Liver Function Test': 'Blood Test',
        'Blood Sugar Test': 'Blood Test',
        'Chest X-Ray': 'X-Ray',
        'MRI Brain': 'MRI Scan',
        'CT Abdomen': 'CT Scan',
        'Ultrasound': 'Ultrasound',
        'ECG': 'Cardiac'
      }
      return categories[testName] || 'General Test'
    },
    
    showSuccessMessage(message) {
      // Create a temporary success notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300'
      notification.textContent = message
      document.body.appendChild(notification)
      
      // Remove after 3 seconds
      setTimeout(() => {
        notification.style.opacity = '0'
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 300)
      }, 3000)
    }
  }
}
</script>

<style scoped>
/* Header specific styles */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

/* Search input focus styles */
.search-input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Smooth transitions for interactive elements */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar for search results */
.max-h-64::-webkit-scrollbar {
  width: 6px;
}

.max-h-64::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.max-h-64::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.max-h-64::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Modal backdrop blur effect */
.fixed.inset-0 {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Enhanced button hover effects */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Security indicator pulse animation */
@keyframes security-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

.animate-pulse {
  animation: security-pulse 2s ease-in-out infinite;
}
</style>