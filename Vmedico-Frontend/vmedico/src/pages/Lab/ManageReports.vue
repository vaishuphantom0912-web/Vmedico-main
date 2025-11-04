<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex">
      <LabSidebar 
        :active-section="'reports'"
        @navigate="handleNavigation"
        @logout="handleLogout"
        @sidebar-toggle="handleSidebarToggle"
      />
      
      <div class="flex-1 flex flex-col">
        <LabHeader 
          :lab-info="labInfo"
          :current-user="currentUser"
          @logout="handleLogout"
          @search="handleSearch"
          @search-select="handleSearchSelect"
          @unauthorized-access="handleUnauthorizedAccess"
        />
        
        <main class="flex-1 p-6">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-semibold text-gray-900">Manage Reports</h1>
            <div class="flex space-x-3">
              <button
                @click="showUploadModal = true"
                class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                Upload
              </button>
              <button
                @click="viewHistory"
                class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                History
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Search Form -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-lg font-medium text-gray-900 mb-4">Find Patient</h2>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Email or Phone Number</label>
                <input
                  v-model="searchForm.emailOrPhone"
                  type="text"
                  placeholder="Enter email (e.g., john.doe@email.com) or phone (+91 98765 43210)"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div class="flex items-center my-4">
                <div class="flex-1 border-t border-gray-300"></div>
                <span class="px-3 text-sm text-gray-500">or</span>
                <div class="flex-1 border-t border-gray-300"></div>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Patient Name (optional)</label>
                <input
                  v-model="searchForm.patientName"
                  type="text"
                  placeholder="Search by name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div class="flex space-x-3">
                <button
                  @click="searchPatient"
                  :disabled="!searchForm.emailOrPhone && !searchForm.patientName"
                  class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Search
                </button>
                <button
                  @click="clearSearch"
                  class="px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors duration-200"
                >
                  Clear
                </button>
              </div>
            </div>

            <!-- Patient Details Section -->
            <div v-if="showPatientDetails && searchResults" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <!-- Patient Information -->
              <div class="mb-6">
                <div class="flex justify-between items-start mb-4">
                  <h2 class="text-lg font-medium text-gray-900">Patient Details</h2>
                  <button @click="clearSearch" class="text-sm text-gray-500 hover:text-gray-700">
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Clear
                  </button>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="text-sm font-medium text-gray-500">Patient ID</label>
                    <p class="text-sm text-gray-900">{{ searchResults.id }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Name</label>
                    <p class="text-sm text-gray-900">{{ searchResults.name }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Phone</label>
                    <p class="text-sm text-gray-900">{{ searchResults.phone }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Email</label>
                    <p class="text-sm text-gray-900">{{ searchResults.email }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Age</label>
                    <p class="text-sm text-gray-900">{{ searchResults.age }} years</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Blood Group</label>
                    <p class="text-sm text-gray-900">{{ searchResults.bloodGroup }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Patient's Reports -->
              <div class="border-t border-gray-200 pt-6">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-md font-medium text-gray-900">Patient's Reports</h3>
                  <span class="text-sm text-gray-500 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    {{ searchResults.uploadedReports ? searchResults.uploadedReports.length : 0 }} reports
                  </span>
                </div>
                
                <div v-if="searchResults.uploadedReports && searchResults.uploadedReports.length > 0" class="space-y-3">
                  <div 
                    v-for="report in searchResults.uploadedReports" 
                    :key="report.id"
                    class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div class="flex justify-between items-start">
                      <div class="flex-1">
                        <h4 class="text-sm font-medium text-gray-900">{{ report.fileName }}</h4>
                        <div class="mt-1 text-sm text-gray-500">
                          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                            {{ report.type }}
                          </span>
                          <span>{{ report.date }}</span>
                          <span class="mx-2">•</span>
                          <span>{{ report.doctor }}</span>
                        </div>
                        <p class="mt-2 text-sm text-gray-600">{{ report.notes }}</p>
                      </div>
                      <div class="flex space-x-2 ml-4">
                        <button @click="previewReport(report)" class="text-blue-600 hover:text-blue-800 text-sm">
                          Preview
                        </button>
                        <button @click="shareReport(report)" class="text-green-600 hover:text-green-800 text-sm">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-else class="text-center py-8">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <h3 class="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
                  <p class="mt-1 text-sm text-gray-500">This patient has no uploaded reports yet.</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- All Uploaded Reports Section -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-medium text-gray-900">All Uploaded Reports</h2>
              <span class="text-sm text-gray-500 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4"></path>
                </svg>
                {{ uploadedReports.length }} uploaded
              </span>
            </div>

            <div class="overflow-hidden">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">File</th>
                    <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">Type</th>
                    <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">Date</th>
                    <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">Email/Phone</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr 
                    v-for="report in paginatedReports" 
                    :key="report.id"
                    class="hover:bg-gray-50 cursor-pointer"
                    @click="viewReport(report)"
                  >
                    <td class="py-3">
                      <div class="flex flex-col">
                        <span class="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">{{ report.fileName }}</span>
                        <div class="flex items-center mt-1 space-x-3">
                          <button 
                            @click.stop="previewReport(report)"
                            class="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Preview
                          </button>
                          <button 
                            @click.stop="downloadReportFromTable(report)"
                            class="text-xs text-purple-600 hover:text-purple-800"
                          >
                            Download
                          </button>
                          <button 
                            @click.stop="shareReport(report)"
                            class="text-xs text-green-600 hover:text-green-800"
                          >
                            Share
                          </button>
                        </div>
                      </div>
                    </td>
                    <td class="py-3">
                      <span class="text-sm text-gray-900">{{ report.type }}</span>
                    </td>
                    <td class="py-3">
                      <span class="text-sm text-gray-900">{{ report.date }}</span>
                    </td>
                    <td class="py-3">
                      <span class="text-sm text-gray-900">{{ getPatientEmailOrPhone(report.patientId) }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div v-if="uploadedReports.length === 0" class="text-center py-8">
                <p class="text-sm text-gray-500">No reports uploaded yet</p>
              </div>
            </div>

            <div v-if="uploadedReports.length > 0" class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <span class="text-sm text-gray-600">
                Page {{ currentPage }} of {{ totalPages }}
              </span>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>

    <UploadReportModal 
      :is-visible="showUploadModal"
      @close="showUploadModal = false"
      @report-uploaded="handleReportUploaded"
    />
    
    <!-- History Modal -->
    <div v-if="showHistoryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Report Upload History</h3>
          <button @click="showHistoryModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="mb-6">
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">{{ uploadedReports.length }}</div>
              <div class="text-sm text-blue-600">Total Reports</div>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{{ getReportsThisMonth() }}</div>
              <div class="text-sm text-green-600">This Month</div>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">{{ getReportsThisWeek() }}</div>
              <div class="text-sm text-purple-600">This Week</div>
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="report in uploadedReports" :key="report.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ report.fileName }}</div>
                  <div class="text-sm text-gray-500">ID: {{ report.id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ report.type }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ report.patientId }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(report.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button @click="previewReport(report)" class="text-blue-600 hover:text-blue-900">
                    Preview
                  </button>
                  <button @click="downloadReportFromTable(report)" class="text-purple-600 hover:text-purple-900">
                    Download
                  </button>
                  <button @click="shareReport(report)" class="text-green-600 hover:text-green-900">
                    Share
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-if="uploadedReports.length === 0" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No reports uploaded</h3>
          <p class="mt-1 text-sm text-gray-500">Start by uploading your first report.</p>
        </div>
        
        <div class="mt-6 flex justify-end">
          <button @click="showHistoryModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Close
          </button>
        </div>
      </div>
    </div>
    
    <!-- Preview Modal -->
    <div v-if="showPreviewModal && selectedReport" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Report Preview</h3>
          <button @click="showPreviewModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Report Information -->
        <div class="mb-6">
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-500">File Name</label>
                <p class="text-sm text-gray-900">{{ selectedReport.fileName }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500">Report Type</label>
                <p class="text-sm text-gray-900">{{ selectedReport.type }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500">Patient ID</label>
                <p class="text-sm text-gray-900">{{ selectedReport.patientId }}</p>
              </div>
              <div v-if="selectedReport.refPhysician">
                <label class="text-sm font-medium text-gray-500">Referring Physician</label>
                <p class="text-sm text-gray-900">{{ selectedReport.refPhysician }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500">Date</label>
                <p class="text-sm text-gray-900">{{ formatDate(selectedReport.date) }}</p>
              </div>
              <div v-if="selectedReport.doctor">
                <label class="text-sm font-medium text-gray-500">Doctor</label>
                <p class="text-sm text-gray-900">{{ selectedReport.doctor }}</p>
              </div>
              <div v-if="selectedReport.status">
                <label class="text-sm font-medium text-gray-500">Status</label>
                <p class="text-sm text-gray-900">{{ selectedReport.status }}</p>
              </div>
            </div>
          </div>
          
          <!-- Report Notes -->
          <div v-if="selectedReport.notes" class="mb-4">
            <label class="text-sm font-medium text-gray-500">Notes</label>
            <p class="text-sm text-gray-900 mt-1 p-3 bg-blue-50 rounded-lg">{{ selectedReport.notes }}</p>
          </div>
        </div>
        
        <!-- Preview Area -->
        <div class="mb-6">
          <label class="text-sm font-medium text-gray-500 mb-2 block">File Preview</label>
          
          <!-- PDF Preview -->
          <div v-if="getFileTypeFromReport(selectedReport) === 'pdf'" class="border border-gray-300 rounded-lg overflow-hidden bg-white">
            <div class="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">{{ selectedReport.fileName }}</span>
              <div class="flex items-center space-x-2">
                <button @click="zoomOut" class="text-gray-600 hover:text-gray-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"></path>
                  </svg>
                </button>
                <span class="text-sm text-gray-600">{{ Math.round(zoomLevel * 100) }}%</span>
                <button @click="zoomIn" class="text-gray-600 hover:text-gray-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="h-96 overflow-auto bg-gray-50 flex items-center justify-center" :style="{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }">
              <div class="bg-white shadow-lg p-8 max-w-lg w-full">
                <div class="text-center mb-6">
                  <h2 class="text-xl font-bold text-gray-900">Medical Report</h2>
                  <p class="text-sm text-gray-600">{{ selectedReport.type }} - {{ formatDate(selectedReport.date) }}</p>
                </div>
                
                <div class="space-y-4">
                  <div class="border-b pb-2">
                    <h3 class="font-semibold text-gray-800">Patient Information</h3>
                    <p class="text-sm text-gray-600">Patient ID: {{ selectedReport.patientId }}</p>
                    <p v-if="selectedReport.refPhysician" class="text-sm text-gray-600">Referring Physician: {{ selectedReport.refPhysician }}</p>
                    <p class="text-sm text-gray-600">Report Date: {{ formatDate(selectedReport.date) }}</p>
                  </div>
                  
                  <div class="border-b pb-2">
                    <h3 class="font-semibold text-gray-800">Test Results</h3>
                    <div class="bg-blue-50 p-3 rounded mt-2">
                      <p class="text-sm text-gray-700">{{ getReportContent(selectedReport) }}</p>
                    </div>
                  </div>
                  
                  <div v-if="selectedReport.notes">
                    <h3 class="font-semibold text-gray-800">Clinical Notes</h3>
                    <p class="text-sm text-gray-600 mt-1">{{ selectedReport.notes }}</p>
                  </div>
                  
                  <div class="border-t pt-2 mt-4">
                    <p class="text-xs text-gray-500">Report generated by {{ selectedReport.doctor || 'Lab System' }}</p>
                    <p class="text-xs text-gray-500">Nova Diagnostics Laboratory</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Image Preview -->
          <div v-else-if="getFileTypeFromReport(selectedReport) === 'image'" class="border border-gray-300 rounded-lg overflow-hidden bg-white">
            <div class="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">{{ selectedReport.fileName }}</span>
              <div class="flex items-center space-x-2">
                <button @click="zoomOut" class="text-gray-600 hover:text-gray-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"></path>
                  </svg>
                </button>
                <span class="text-sm text-gray-600">{{ Math.round(zoomLevel * 100) }}%</span>
                <button @click="zoomIn" class="text-gray-600 hover:text-gray-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="h-96 overflow-auto bg-gray-900 flex items-center justify-center">
              <div class="relative" :style="{ transform: `scale(${zoomLevel})` }">
                <img 
                  :src="getMockImageUrl(selectedReport)" 
                  :alt="selectedReport.fileName"
                  class="max-w-full max-h-full object-contain"
                  @error="handleImageError"
                />
                <div class="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  {{ selectedReport.type }} - {{ selectedReport.patientId }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- DICOM/Medical Image Preview -->
          <div v-else-if="getFileTypeFromReport(selectedReport) === 'dicom'" class="border border-gray-300 rounded-lg overflow-hidden bg-black">
            <div class="bg-gray-800 px-4 py-2 border-b border-gray-600 flex items-center justify-between">
              <span class="text-sm font-medium text-white">{{ selectedReport.fileName }}</span>
              <div class="flex items-center space-x-2">
                <button @click="adjustContrast(-10)" class="text-gray-300 hover:text-white text-xs">C-</button>
                <button @click="adjustContrast(10)" class="text-gray-300 hover:text-white text-xs">C+</button>
                <button @click="adjustBrightness(-10)" class="text-gray-300 hover:text-white text-xs">B-</button>
                <button @click="adjustBrightness(10)" class="text-gray-300 hover:text-white text-xs">B+</button>
              </div>
            </div>
            <div class="h-96 bg-black flex items-center justify-center relative">
              <div class="relative" :style="{ 
                transform: `scale(${zoomLevel})`,
                filter: `contrast(${contrast}%) brightness(${brightness}%)`
              }">
                <div class="w-80 h-80 bg-gray-800 border border-gray-600 flex items-center justify-center">
                  <div class="text-center text-gray-400">
                    <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <p class="text-sm">{{ selectedReport.type }} Scan</p>
                    <p class="text-xs text-gray-500">{{ selectedReport.patientId }}</p>
                  </div>
                </div>
              </div>
              <div class="absolute top-2 left-2 text-white text-xs space-y-1">
                <div>Patient: {{ selectedReport.patientId }}</div>
                <div>Study: {{ selectedReport.type }}</div>
                <div>Date: {{ formatDate(selectedReport.date) }}</div>
              </div>
            </div>
          </div>
          
          <!-- Unsupported File Type -->
          <div v-else class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
            <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">{{ selectedReport.fileName }}</h3>
            <p class="text-sm text-gray-500 mb-4">Preview not available for this file type</p>
            <button @click="downloadReport" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Download to view
            </button>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex justify-between">
          <div class="flex space-x-3">
            <button @click="downloadReport" class="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100">
              <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Download
            </button>
            <button @click="shareReport(selectedReport)" class="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100">
              <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
              </svg>
              Share
            </button>
          </div>
          <button @click="showPreviewModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LabHeader from '../../components/Lab/LabHeader.vue'
import LabSidebar from '../../components/Lab/LabSidebar.vue'
import UploadReportModal from '../../components/Lab/UploadReportModal.vue'
import ApiService from '../../services/api.js'

export default {
  name: 'ManageReports',
  components: {
    LabHeader,
    LabSidebar,
    UploadReportModal
  },
  data() {
    return {
      showUploadModal: false,
      currentPage: 1,
      reportsPerPage: 3,
      
      searchForm: {
        emailOrPhone: '',
        patientName: ''
      },
      
      searchResults: null,
      showPatientDetails: false,
      showHistoryModal: false,
      showPreviewModal: false,
      selectedReport: null,
      zoomLevel: 1,
      contrast: 100,
      brightness: 100,
      
      // Comprehensive patient database
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
          uploadedReports: [
            {
              id: 'RPT-001',
              fileName: 'REP_CT_2025-0426.pdf',
              type: 'CT Scan',
              date: '2025-10-30',
              status: 'Completed',
              doctor: 'Dr. Smith',
              notes: 'Normal findings'
            }
          ],
          pendingUploads: [
            {
              id: 'PEN-001',
              testType: 'Blood Test',
              scheduledDate: '2025-11-05',
              status: 'Sample Collected',
              expectedUpload: '2025-11-06'
            }
          ],
          scheduledTests: [
            {
              id: 'SCH-001',
              testType: 'MRI Brain',
              scheduledDate: '2025-11-10',
              timeSlot: '14:00-15:00',
              status: 'Scheduled',
              preparation: 'Fasting required'
            }
          ]
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
          uploadedReports: [
            {
    
           id: 'RPT-002',
              fileName: 'MRI_SOFIA_0426.png',
              type: 'MRI',
              date: '2025-10-27',
              status: 'Completed',
              doctor: 'Dr. Johnson',
              notes: 'Follow-up recommended'
            }
          ],
          pendingUploads: [],
          scheduledTests: [
            {
              id: 'SCH-002',
              testType: 'X-Ray Chest',
              scheduledDate: '2025-11-08',
              timeSlot: '10:00-11:00',
              status: 'Scheduled',
              preparation: 'No special preparation'
            },
            {
              id: 'SCH-003',
              testType: 'Blood Panel',
              scheduledDate: '2025-11-12',
              timeSlot: '09:00-10:00',
              status: 'Scheduled',
              preparation: '12-hour fasting required'
            }
          ]
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
          uploadedReports: [
            {
              id: 'RPT-003',
              fileName: 'BloodPanel_Marco_b426.pdf',
              type: 'Blood Test',
              date: '2025-10-25',
              status: 'Completed',
              doctor: 'Dr. Brown',
              notes: 'All parameters normal'
            }
          ],
          pendingUploads: [
            {
              id: 'PEN-002',
              testType: 'CT Abdomen',
              scheduledDate: '2025-11-03',
              status: 'Test Completed',
              expectedUpload: '2025-11-04'
            },
            {
              id: 'PEN-003',
              testType: 'Ultrasound',
              scheduledDate: '2025-11-01',
              status: 'Processing',
              expectedUpload: '2025-11-02'
            }
          ],
          scheduledTests: []
        }
      ],
      
      labInfo: {
        name: 'VMedico',
        labId: 'VMD-79378',
        license: 'MED-9583',
        address: '456 Medical Plaza, Healthcare District',
        phone: '+91 98765 43210',
        email: 'admin@vmedico.com'
      },
      
      currentUser: {
        name: 'Lab Administrator',
        role: 'Lab Administrator',
        email: 'admin@vmedico.com',
        lastLogin: new Date()
      },
      
      uploadedReports: []
    }
  },
  
  computed: {
    totalPages() {
      return Math.ceil(this.uploadedReports.length / this.reportsPerPage)
    },
    
    paginatedReports() {
      const start = (this.currentPage - 1) * this.reportsPerPage
      const end = start + this.reportsPerPage
      return this.uploadedReports.slice(start, end)
    }
  },
  
  async mounted() {
    this.loadUserSession()
    await this.loadReportsData()
    
    // Also check if there are any slots created (for debugging)
    this.checkSlotsData()
  },
  
  methods: {
    loadUserSession() {
      // Load user session data from localStorage
      const userSession = localStorage.getItem('userSession')
      if (userSession) {
        try {
          const userData = JSON.parse(userSession)
          
          // Update lab info with registered data
          if (userData.role === 'lab') {
            this.labInfo = {
              name: userData.labName || 'Nova Diagnostics',
              labId: `LAB-${userData.id.toString().slice(-5)}`,
              license: `LIC-${Math.random().toString().slice(-4)}`,
              address: '456 Medical Plaza, Healthcare District',
              phone: userData.phoneNumber || '+91 98765 43210',
              email: userData.email || 'admin@vmedico.com'
            }
            
            // Update current user info with correct role
            this.currentUser = {
              name: (userData.labName || 'Nova Diagnostics') + ' Administrator',
              role: 'Lab Administrator', // This must match the LabHeader check
              email: userData.email || 'admin@vmedico.com',
              lastLogin: new Date()
            }
            
            // Load appropriate data based on user type
            this.loadReportsData(userData)
          }
        } catch (error) {
          console.error('Error loading user session:', error)
        }
      }
    },
    
    async loadReportsData(userData) {
      // Check if this is the demo user or a newly registered user
      const isDemoUser = userData?.id === 'demo-lab' || userData?.username === 'lab'
      
      if (isDemoUser) {
        // Load demo reports for Nova Diagnostics demo user
        this.uploadedReports = [
          {
            id: 'RPT-001',
            fileName: 'REP_CT_2025-0426.pdf',
            type: 'CT',
            date: '2025-10-30',
            patientId: 'PID-00123'
          },
          {
            id: 'RPT-002',
            fileName: 'MRI_SOFIA_0426.png',
            type: 'MRI',
            date: '2025-10-27',
            patientId: 'PID-00456'
          },
          {
            id: 'RPT-003',
            fileName: 'BloodPanel_Marco_b426...',
            type: 'Blood Test',
            date: '2025-10-25',
            patientId: 'PID-00789'
          }
        ]
      } else {
        // Load real reports data from backend API for registered users
        try {
          // Import API service dynamically to avoid circular imports
          const ApiService = (await import('../../services/api.js')).default
          
          // Fetch lab bookings to get reports data
          const bookings = await ApiService.getLabBookings()
          console.log('Fetched lab bookings for reports:', bookings)
          
          // Convert bookings with uploaded reports to report format
          this.uploadedReports = bookings
            .filter(booking => booking.reportUploaded && booking.reportFileName)
            .map(booking => ({
              id: `RPT-${booking.id}`,
              patientId: `PID-${booking.patientId || booking.id}`,
              bookingId: booking.id,
              fileName: booking.reportFileName,
              type: booking.testName || 'Lab Test',
              date: booking.date,
              notes: booking.remarks || 'Report uploaded successfully'
            }))
          
          console.log('Processed uploaded reports:', this.uploadedReports)
          
        } catch (error) {
          console.error('Failed to load reports data from API:', error)
          // Fallback to saved local data if API fails
          const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
          const userId = userSession.id
          const savedReports = JSON.parse(localStorage.getItem(`labReports_${userId}`) || '[]')
          const savedPatients = JSON.parse(localStorage.getItem(`labPatients_${userId}`) || '[]')
          
          this.uploadedReports = savedReports
          
          if (savedPatients.length > 0) {
            this.patientDatabase = savedPatients
          }
        }
      }
    },

    checkSlotsData() {
      // Debug method to check if slots data persists across pages
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      const userId = userSession.id
      const savedSlots = JSON.parse(localStorage.getItem(`labSlots_${userId}`) || '[]')
      
      console.log('🔍 [ManageReports] Checking slots data persistence:')
      console.log('   - User ID:', userId)
      console.log('   - Saved slots count:', savedSlots.length)
      console.log('   - Slots data:', savedSlots)
      
      if (savedSlots.length > 0) {
        console.log('✅ Slots data is persisting across pages!')
      } else {
        console.log('⚠️ No slots data found - either none created or data not persisting')
      }
    },
    
    handleNavigation(section) {
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
          break
        case 'admin-profile':
          this.$router.push('/lab/admin-profile')
          break
        default:
          this.$router.push('/lab-dashboard')
          break
      }
    },
    
    handleLogout() {
      localStorage.removeItem('labAdminSession')
      sessionStorage.clear()
      this.$router.push({
        path: '/login',
        query: { 
          message: 'You have been securely logged out',
          type: 'success'
        }
      })
    },
    
    handleSearch() {
      console.log('Search functionality triggered')
    },
    
    handleSearchSelect() {
      console.log('Search result selected')
    },
    
    handleUnauthorizedAccess() {
      console.warn('Unauthorized access attempt detected')
      this.$router.push('/login')
    },
    
    searchPatient() {
      console.log('Searching for patient:', this.searchForm)
      if (!this.searchForm.emailOrPhone && !this.searchForm.patientName) {
        return
      }
      this.performPatientSearch()
    },
    
    performPatientSearch() {
      let searchTerm = (this.searchForm.emailOrPhone || this.searchForm.patientName).trim()
      
      // If searching by email or phone number
      if (this.searchForm.emailOrPhone) {
        console.log('Searching for patient by email/phone:', searchTerm)
        
        // Search for exact match by email or phone
        let patient = this.patientDatabase.find(p => 
          p.email.toLowerCase() === searchTerm.toLowerCase() ||
          p.phone === searchTerm ||
          p.phone.replace(/\s+/g, '') === searchTerm.replace(/\s+/g, '') ||
          p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.phone.includes(searchTerm)
        )
        
        if (patient) {
          this.searchResults = patient
          this.showPatientDetails = true
          console.log('Patient found:', patient)
          return
        }
      } else if (this.searchForm.patientName) {
        // Search by name
        const patient = this.patientDatabase.find(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        
        if (patient) {
          this.searchResults = patient
          this.showPatientDetails = true
          console.log('Patient found:', patient)
          return
        }
      }
      
      // If no patient found, show error
      this.searchResults = null
      this.showPatientDetails = false
      alert('Patient not found. Please check the email, phone number, or name.')
    },
    
    clearSearch() {
      this.searchForm.emailOrPhone = ''
      this.searchForm.patientName = ''
      this.searchResults = null
      this.showPatientDetails = false
      this.currentPage = 1
      console.log('Search cleared')
    },
    
    viewReport(report) {
      console.log('Viewing report:', report)
    },
    
    previewReport(report) {
      console.log('Previewing report:', report)
      this.selectedReport = report
      this.showPreviewModal = true
      // Reset preview settings
      this.zoomLevel = 1
      this.contrast = 100
      this.brightness = 100
    },
    
    downloadReport() {
      if (!this.selectedReport) return
      
      console.log('Downloading report:', this.selectedReport)
      
      // Check if this report has actual file data from upload
      if (this.selectedReport.files && this.selectedReport.files.length > 0) {
        // For uploaded reports with actual files, try to download the first file
        const primaryFile = this.selectedReport.files[0]
        
        // Check if we have the actual file object stored
        if (primaryFile.file && primaryFile.file instanceof File) {
          this.downloadActualFile(primaryFile.file, primaryFile.name)
        } else {
          // If no actual file data, create a mock download
          this.downloadMockReport()
        }
      } else {
        // For demo/existing reports, create a mock download
        this.downloadMockReport()
      }
    },
    
    downloadActualFile(file, fileName) {
      try {
        // Create a download link for the actual file
        const url = URL.createObjectURL(file)
        const link = document.createElement('a')
        link.href = url
        link.download = fileName || file.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        
        console.log('File downloaded successfully:', fileName)
      } catch (error) {
        console.error('Error downloading file:', error)
        this.downloadMockReport()
      }
    },
    
    downloadMockReport() {
      // Generate PDF using print-to-PDF approach
      this.generateAndDownloadPDF()
    },
    
    generateAndDownloadPDF() {
      // Create a hidden iframe with the report content
      const iframe = document.createElement('iframe')
      iframe.style.position = 'absolute'
      iframe.style.left = '-9999px'
      iframe.style.width = '210mm'
      iframe.style.height = '297mm'
      
      document.body.appendChild(iframe)
      
      const reportHtml = this.generateReportHTML()
      iframe.contentDocument.open()
      iframe.contentDocument.write(reportHtml)
      iframe.contentDocument.close()
      
      // Wait for content to load
      iframe.onload = () => {
        setTimeout(() => {
          try {
            // Try to use the browser's save as PDF functionality
            iframe.contentWindow.print()
            
            // Clean up
            setTimeout(() => {
              document.body.removeChild(iframe)
            }, 1000)
            
          } catch (error) {
            console.error('Print failed, falling back to HTML download:', error)
            // Fallback: download as HTML file that can be printed to PDF
            this.downloadAsHTML()
            document.body.removeChild(iframe)
          }
        }, 500)
      }
      
      console.log('PDF generation initiated for:', this.selectedReport.fileName)
    },
    
    downloadAsHTML() {
      // Fallback: create an HTML file that can be opened and printed to PDF
      const reportHtml = this.generateReportHTML()
      const blob = new Blob([reportHtml], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${this.selectedReport.fileName || 'report'}_printable.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      // Show instructions to user
      alert('HTML report downloaded. To convert to PDF:\n1. Open the downloaded HTML file\n2. Press Ctrl+P (or Cmd+P on Mac)\n3. Select "Save as PDF" as destination\n4. Click Save')
    },
    
    generateReportHTML() {
      const currentDate = new Date().toLocaleString()
      const reportDate = this.formatDate(this.selectedReport.date)
      
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Medical Report - ${this.selectedReport.id}</title>
          <style>
            @media print {
              @page { margin: 1in; size: A4; }
              body { -webkit-print-color-adjust: exact; }
            }
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #2563eb;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #2563eb;
              margin-bottom: 10px;
            }
            .report-title {
              font-size: 20px;
              font-weight: bold;
              margin: 20px 0;
              color: #1f2937;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin: 20px 0;
            }
            .info-item {
              padding: 10px;
              background: #f8fafc;
              border-left: 4px solid #2563eb;
            }
            .info-label {
              font-weight: bold;
              color: #374151;
              font-size: 12px;
              text-transform: uppercase;
              margin-bottom: 5px;
            }
            .info-value {
              color: #1f2937;
              font-size: 14px;
            }
            .section {
              margin: 30px 0;
              padding: 20px;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
            }
            .section-title {
              font-size: 16px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 15px;
              padding-bottom: 10px;
              border-bottom: 2px solid #e5e7eb;
            }
            .notes-content {
              background: #eff6ff;
              padding: 15px;
              border-radius: 6px;
              border-left: 4px solid #3b82f6;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              font-size: 12px;
              color: #6b7280;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 12px;
              background: #dcfce7;
              color: #166534;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🏥 VMEDICO</div>
            <div style="color: #6b7280;">Laboratory Management System</div>
          </div>
          
          <div class="report-title">MEDICAL REPORT</div>
          
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Report ID</div>
              <div class="info-value">${this.selectedReport.id}</div>
            </div>
            <div class="info-item">
              <div class="info-label">File Name</div>
              <div class="info-value">${this.selectedReport.fileName}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Report Type</div>
              <div class="info-value">${this.selectedReport.type}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Report Date</div>
              <div class="info-value">${reportDate}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Patient ID</div>
              <div class="info-value">${this.selectedReport.patientId}</div>
            </div>
            ${this.selectedReport.refPhysician ? `
            <div class="info-item">
              <div class="info-label">Referring Physician</div>
              <div class="info-value">${this.selectedReport.refPhysician}</div>
            </div>
            ` : ''}
            <div class="info-item">
              <div class="info-label">Status</div>
              <div class="info-value">
                <span class="status-badge">${this.selectedReport.status || 'Completed'}</span>
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">Generated</div>
              <div class="info-value">${currentDate}</div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">📋 Test Results</div>
            <div>${this.getReportContent(this.selectedReport)}</div>
          </div>
          
          ${this.selectedReport.notes ? `
          <div class="section">
            <div class="section-title">📝 Clinical Notes</div>
            <div class="notes-content">${this.selectedReport.notes}</div>
          </div>
          ` : ''}
          
          ${this.selectedReport.files && this.selectedReport.files.length > 0 ? `
          <div class="section">
            <div class="section-title">📎 Attached Files</div>
            <ul>
              ${this.selectedReport.files.map(file => `
                <li style="margin: 5px 0;">
                  <strong>${file.name}</strong> 
                  <span style="color: #6b7280;">(${this.formatFileSize(file.size)})</span>
                </li>
              `).join('')}
            </ul>
          </div>
          ` : ''}
          
          <div class="footer">
            <div>This report was generated by Vmedico Laboratory Management System</div>
            <div>Generated on ${currentDate}</div>
            <div style="margin-top: 10px; font-style: italic;">
              This is an electronically generated document and does not require a signature.
            </div>
          </div>
        </body>
        </html>
      `
    },
    
    generateReportContent() {
      return `MEDICAL REPORT
==================

Report ID: ${this.selectedReport.id}
File Name: ${this.selectedReport.fileName}
Report Type: ${this.selectedReport.type}
Date: ${this.selectedReport.date}
Patient ID: ${this.selectedReport.patientId}
${this.selectedReport.refPhysician ? `Referring Physician: ${this.selectedReport.refPhysician}` : ''}
Status: ${this.selectedReport.status}

${this.selectedReport.notes ? `CLINICAL NOTES:\n${this.selectedReport.notes}` : ''}

REPORT CONTENT:
${this.getReportContent(this.selectedReport)}

---
Generated by Vmedico Lab Management System
${new Date().toLocaleString()}
`
    },
    
    downloadReportFromTable(report) {
      // Set the selected report and trigger download
      this.selectedReport = report
      this.downloadReport()
    },
    
    getPDFFileName() {
      let fileName = this.selectedReport.fileName || 'medical_report'
      
      // Remove existing extension if present
      fileName = fileName.replace(/\.[^/.]+$/, '')
      
      // Add PDF extension
      return `${fileName}.pdf`
    },
    
    // File type detection methods
    isPDF(fileName) {
      if (!fileName) return false
      return fileName.toLowerCase().endsWith('.pdf') || fileName.toLowerCase().includes('pdf')
    },
    
    isImage(fileName) {
      if (!fileName) return false
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
      return imageExtensions.some(ext => fileName.toLowerCase().endsWith(ext)) || 
             fileName.toLowerCase().includes('image') ||
             fileName.toLowerCase().includes('scan')
    },
    
    isDICOM(fileName) {
      if (!fileName) return false
      const dicomExtensions = ['.dcm', '.dicom']
      return dicomExtensions.some(ext => fileName.toLowerCase().endsWith(ext)) ||
             fileName.toLowerCase().includes('dicom')
    },
    
    // Enhanced file type detection based on report type
    getFileTypeFromReport(report) {
      if (!report) return 'unknown'
      
      // Check file extension first
      if (this.isPDF(report.fileName)) return 'pdf'
      if (this.isImage(report.fileName)) return 'image'
      if (this.isDICOM(report.fileName)) return 'dicom'
      
      // Fallback to report type
      const reportType = report.type.toLowerCase()
      
      // Map report types to file types
      if (reportType.includes('blood') || reportType.includes('lab') || reportType.includes('test')) {
        return 'pdf' // Lab reports are typically PDFs
      }
      
      if (reportType.includes('x-ray') || reportType.includes('xray') || 
          reportType.includes('mri') || reportType.includes('ct') || 
          reportType.includes('ultrasound') || reportType.includes('scan')) {
        return 'image' // Medical imaging
      }
      
      if (reportType.includes('dicom')) {
        return 'dicom'
      }
      
      return 'pdf' // Default to PDF for most medical reports
    },
    
    // Zoom and view controls
    zoomIn() {
      this.zoomLevel = Math.min(this.zoomLevel + 0.25, 3)
    },
    
    zoomOut() {
      this.zoomLevel = Math.max(this.zoomLevel - 0.25, 0.25)
    },
    
    adjustContrast(delta) {
      this.contrast = Math.max(0, Math.min(200, this.contrast + delta))
    },
    
    adjustBrightness(delta) {
      this.brightness = Math.max(0, Math.min(200, this.brightness + delta))
    },
    
    // Mock content generators
    getMockImageUrl(report) {
      // Generate a placeholder image based on report type
      const width = 400
      const height = 300
      const text = `${report.type} - ${report.patientId}`
      return `https://via.placeholder.com/${width}x${height}/e5e7eb/374151?text=${encodeURIComponent(text)}`
    },
    
    getReportContent(report) {
      // Generate mock report content based on type
      const contentMap = {
        'Blood Test': 'Hemoglobin: 14.2 g/dL (Normal)\nWhite Blood Cells: 7,200/μL (Normal)\nPlatelets: 250,000/μL (Normal)\nGlucose: 95 mg/dL (Normal)',
        'X-Ray': 'Chest X-ray shows clear lung fields with no evidence of consolidation, pleural effusion, or pneumothorax. Heart size is within normal limits.',
        'MRI': 'Brain MRI demonstrates normal brain parenchyma with no evidence of acute infarction, hemorrhage, or mass effect. Ventricular system is normal.',
        'CT': 'CT scan shows normal anatomical structures with no abnormal findings. No evidence of pathology in the scanned region.',
        'Ultrasound': 'Ultrasound examination reveals normal echogenicity and structure. No abnormal masses or fluid collections identified.',
        'ECG': 'Normal sinus rhythm at 72 bpm. No ST-T wave abnormalities. QRS duration within normal limits.',
        'Default': 'Test results are within normal parameters. No significant abnormalities detected.'
      }
      
      return contentMap[report.type] || contentMap['Default']
    },
    
    handleImageError(event) {
      // Handle image loading errors
      console.log('Image failed to load:', event)
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1lZGljYWwgSW1hZ2U8L3RleHQ+PC9zdmc+'
    },
    
    shareReport(report) {
      console.log('Sharing report:', report)
      // In a real implementation, this would open a share dialog
      const shareText = `Report: ${report.fileName}\nType: ${report.type}\nDate: ${report.date}\nPatient: ${report.patientId}`
      
      if (navigator.share) {
        navigator.share({
          title: 'Lab Report',
          text: shareText,
        }).catch(console.error)
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
          alert('Report details copied to clipboard!')
        }).catch(() => {
          alert(`Share Report:\n${shareText}`)
        })
      }
    },
    
    viewHistory() {
      console.log('Viewing report history')
      this.showHistoryModal = true
    },
    
    getReportsThisMonth() {
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      return this.uploadedReports.filter(report => {
        const reportDate = new Date(report.date)
        return reportDate.getMonth() === currentMonth && reportDate.getFullYear() === currentYear
      }).length
    },
    
    getReportsThisWeek() {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return this.uploadedReports.filter(report => {
        const reportDate = new Date(report.date)
        return reportDate >= oneWeekAgo
      }).length
    },
    
    getPatientEmailOrPhone(patientId) {
      // Find the patient in the database by ID
      const patient = this.patientDatabase.find(p => p.id === patientId)
      if (patient) {
        // Return email if available, otherwise return phone
        return patient.email || patient.phone || 'N/A'
      }
      return 'N/A'
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    
    handleReportUploaded(reportData) {
      console.log('New report uploaded:', reportData)
      
      // Calculate total file size from all uploaded files
      const totalSize = reportData.files.reduce((sum, file) => sum + file.size, 0)
      const fileSizeFormatted = this.formatFileSize(totalSize)
      
      // Create the main file name from the first file or use a default
      const primaryFileName = reportData.files.length > 0 ? reportData.files[0].name : 'New Report'
      
      const newReport = {
        id: reportData.id,
        fileName: primaryFileName,
        type: reportData.type,
        date: reportData.date,
        patientId: reportData.patientId,
        refPhysician: reportData.refPhysician,
        notes: reportData.notes,
        files: reportData.files,
        fileSize: fileSizeFormatted,
        uploadedAt: reportData.uploadedAt,
        status: reportData.status
      }
      
      // Check if patient exists in database, if not create a new patient record
      if (reportData.patientId) {
        this.ensurePatientExists(reportData.patientId, newReport)
      }
      
      this.uploadedReports.unshift(newReport)
      this.currentPage = 1
      this.showUploadModal = false
      
      // Save updated reports data
      this.saveReportsData()
    },
    
    ensurePatientExists(patientId, report) {
      // Normalize the patient ID format
      const cleanId = patientId.replace(/^PID-?/i, '')
      const normalizedPatientId = `PID-${cleanId.padStart(5, '0')}`
      
      // Check if patient already exists in the database
      const existingPatient = this.patientDatabase.find(p => p.id === normalizedPatientId)
      
      if (!existingPatient) {
        // Create a new patient record with basic information
        const newPatient = {
          id: normalizedPatientId,
          name: `Patient ${cleanId}`, // Generate a default name
          phone: '+91 98765 43XXX', // Placeholder phone
          email: `patient${cleanId}@email.com`, // Generate email
          age: 'Unknown',
          gender: 'Unknown',
          bloodGroup: 'Unknown',
          address: 'Address not provided',
          emergencyContact: 'Not provided',
          uploadedReports: [
            {
              id: report.id,
              fileName: report.fileName,
              type: report.type,
              date: report.date,
              status: 'Completed',
              doctor: 'Lab Report',
              notes: 'Uploaded via lab portal'
            }
          ],
          pendingUploads: [],
          scheduledTests: []
        }
        
        // Add the new patient to the database
        this.patientDatabase.push(newPatient)
        console.log('Created new patient record:', newPatient)
        
        // Also update the report's patient ID to use the normalized format
        report.patientId = normalizedPatientId
      } else {
        // Patient exists, add the report to their uploaded reports
        const reportRecord = {
          id: report.id,
          fileName: report.fileName,
          type: report.type,
          date: report.date,
          status: 'Completed',
          doctor: 'Lab Report',
          notes: 'Uploaded via lab portal'
        }
        
        if (!existingPatient.uploadedReports) {
          existingPatient.uploadedReports = []
        }
        
        existingPatient.uploadedReports.unshift(reportRecord)
        console.log('Added report to existing patient:', existingPatient.id)
        
        // Update the report's patient ID to use the normalized format
        report.patientId = normalizedPatientId
      }
    },
    
    saveReportsData() {
      // Save reports data for the logged-in user
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}')
      const userId = userSession.id
      
      if (userId && userId !== 'demo-lab') {
        localStorage.setItem(`labReports_${userId}`, JSON.stringify(this.uploadedReports))
        localStorage.setItem(`labPatients_${userId}`, JSON.stringify(this.patientDatabase))
        console.log('Reports and patient data saved for user:', userId)
      }
    },
    
    formatFileSize(bytes) {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },
    
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    
    handleSidebarToggle(isCollapsed) {
      // Handle sidebar toggle event
      console.log('Sidebar toggled:', isCollapsed ? 'collapsed' : 'expanded')
      // You can add additional logic here if needed
    }
  }
}
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>