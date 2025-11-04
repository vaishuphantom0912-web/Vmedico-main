<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Table Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Recent Admissions</h3>
        <button
          @click="viewAllAdmissions"
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
              Ward
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="admission in admissions" 
            :key="admission.id" 
            class="table-row cursor-pointer"
            @click="viewAdmissionDetails(admission)"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ admission.patientName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ admission.doctorName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ admission.date }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {{ admission.ward }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(admission.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                {{ admission.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Empty State -->
      <div v-if="admissions.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No recent admissions</h3>
        <p class="mt-1 text-sm text-gray-500">Recent admissions will appear here.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentAdmissionsTable',
  props: {
    admissions: {
      type: Array,
      required: true
    }
  },
  methods: {
    viewAdmissionDetails(admission) {
      // Handle clicking on an admission row
      console.log('Viewing admission details for:', admission.id)
      // In real implementation, this would navigate to admission details or open a modal
      this.$emit('view-details', admission)
    },
    
    viewAllAdmissions() {
      this.$emit('view-all')
    },
    
    getStatusClass(status) {
      switch (status) {
        case 'Admitted':
          return 'bg-blue-100 text-blue-800'
        case 'Under Observation':
          return 'bg-yellow-100 text-yellow-800'
        case 'Critical':
          return 'bg-red-100 text-red-800'
        case 'Discharged':
          return 'bg-green-100 text-green-800'
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



