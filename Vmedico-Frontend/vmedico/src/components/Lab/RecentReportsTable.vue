<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Table Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Recent Reports</h3>
        <button
          @click="viewAllReports"
          class="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
        >
          View All →
        </button>
      </div>
    </div>
    
    <!-- Table Content -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Patient
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Doctor
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Test/Scan
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="report in reports" 
            :key="report.id" 
            class="table-row cursor-pointer"
            @click="viewReportDetails(report)"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ getPatientEmailOrPhone(report.patientId) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ report.doctorName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ report.date }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {{ report.testType }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(report.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                {{ report.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Empty State -->
      <div v-if="reports.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No recent reports</h3>
        <p class="mt-1 text-sm text-gray-500">Reports will appear here once tests are completed.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentReportsTable',
  props: {
    reports: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // Patient Database for lookup
      patientDatabase: [
        {
          id: 'PID-00123',
          name: 'John Doe',
          phone: '+91 98765 43210',
          email: 'john.doe@email.com'
        },
        {
          id: 'PID-00456',
          name: 'Jane Smith',
          phone: '+91 98765 43213',
          email: 'jane.smith@email.com'
        },
        {
          id: 'PID-00789',
          name: 'Mike Johnson',
          phone: '+91 98765 43215',
          email: 'mike.johnson@email.com'
        }
      ]
    }
  },
  methods: {
    viewReportDetails(report) {
      // Handle clicking on a report row
      console.log('Viewing report details for:', report.id)
      // In real implementation, this would navigate to report details or open a modal
    },
    
    viewAllReports() {
      this.$emit('view-all')
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
    
    getStatusClass(status) {
      switch (status) {
        case 'Completed':
          return 'bg-green-100 text-green-800'
        case 'Pending':
          return 'bg-yellow-100 text-yellow-800'
        case 'In Review':
          return 'bg-blue-100 text-blue-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }
  }
}
</script>

<style scoped>
/* Table specific styles */
</style>