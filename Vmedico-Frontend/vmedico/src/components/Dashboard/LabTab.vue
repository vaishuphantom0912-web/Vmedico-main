<template>
  <div class="space-y-6 animate__animated animate__fadeIn">
    <!-- Lab Management Header -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
            Laboratory Management
          </h2>
          <p class="text-gray-600 mt-1">Manage laboratory operations and access lab dashboard</p>
        </div>
        <router-link to="/lab-dashboard" class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors duration-200 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
          Open Lab Dashboard
        </router-link>
      </div>
    </div>

    <!-- Lab Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Manage Slots</h3>
            <p class="text-sm text-gray-600">Schedule appointments</p>
          </div>
        </div>
        <router-link to="/lab/manage-slots" class="mt-4 block w-full text-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors duration-200">
          Access
        </router-link>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Manage Tests</h3>
            <p class="text-sm text-gray-600">Process lab tests</p>
          </div>
        </div>
        <router-link to="/lab/manage-tests" class="mt-4 block w-full text-center px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100 transition-colors duration-200">
          Access
        </router-link>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Manage Scans</h3>
            <p class="text-sm text-gray-600">Handle imaging</p>
          </div>
        </div>
        <router-link to="/lab/manage-scans" class="mt-4 block w-full text-center px-4 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm hover:bg-purple-100 transition-colors duration-200">
          Access
        </router-link>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Manage Reports</h3>
            <p class="text-sm text-gray-600">Upload & review</p>
          </div>
        </div>
        <router-link to="/lab/manage-reports" class="mt-4 block w-full text-center px-4 py-2 bg-orange-50 text-orange-600 rounded-lg text-sm hover:bg-orange-100 transition-colors duration-200">
          Access
        </router-link>
      </div>
    </div>

    <!-- Lab Status Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Lab Statistics -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Lab Statistics</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Today's Appointments</span>
            <span class="font-semibold text-blue-600">{{ labStats.todayAppointments }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Pending Reports</span>
            <span class="font-semibold text-orange-600">{{ labStats.pendingReports }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Active Tests</span>
            <span class="font-semibold text-green-600">{{ labStats.activeTests }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Equipment Status</span>
            <span class="font-semibold text-purple-600">{{ labStats.equipmentStatus }}%</span>
          </div>
        </div>
      </div>

      <!-- Recent Lab Activity -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Lab Activity</h3>
        <div class="space-y-3">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div :class="activity.type === 'test' ? 'bg-green-100 text-green-600' : activity.type === 'scan' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'" class="w-8 h-8 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ activity.description }}</p>
              <p class="text-xs text-gray-500">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LabTab',
  props: {
    isDarkMode: { type: Boolean, default: false }
  },
  data() {
    return {
      labStats: {
        todayAppointments: 24,
        pendingReports: 8,
        activeTests: 12,
        equipmentStatus: 95
      },
      recentActivity: [
        {
          id: 1,
          type: 'test',
          description: 'Blood test completed for Patient P-1001',
          time: '2 minutes ago'
        },
        {
          id: 2,
          type: 'scan',
          description: 'X-Ray scan uploaded for Patient P-1003',
          time: '15 minutes ago'
        },
        {
          id: 3,
          type: 'report',
          description: 'Lab report generated for Patient P-1002',
          time: '30 minutes ago'
        },
        {
          id: 4,
          type: 'test',
          description: 'New test request received from Dr. Alice',
          time: '1 hour ago'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Custom animations */
.animate__fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>