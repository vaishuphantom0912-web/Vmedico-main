<template>
  <div class="space-y-6">
    <!-- Metrics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Today Appointments -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.05s;">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-bold text-gray-900 metric-number">{{ metrics.todayAppointments.count }}</p>
            <p class="text-sm text-gray-600">{{ metrics.todayAppointments.booked }} booked • {{ metrics.todayAppointments.open }} open</p>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-sm font-medium text-yellow-600">Today Appointments</p>
        </div>
      </div>
      
      <!-- Pending Reports -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.1s;">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-bold text-gray-900 metric-number">{{ metrics.pendingReports.count }}</p>
            <p class="text-sm text-gray-600">{{ metrics.pendingReports.tests }} tests • {{ metrics.pendingReports.scans }} scans</p>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-sm font-medium text-orange-600">Pending Reports</p>
        </div>
      </div>
      
      <!-- Active Tests -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.15s;">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-bold text-gray-900 metric-number">{{ metrics.activeTests.count }}</p>
            <p class="text-sm text-gray-600">{{ metrics.activeTests.scheduled }} scheduled</p>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-sm font-medium text-green-600">Active Tests</p>
        </div>
      </div>
      
      <!-- Equipment Status -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.2s;">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-bold text-gray-900 metric-number">{{ metrics.equipmentStatus.percentage }}%</p>
            <p class="text-sm text-gray-600">{{ metrics.equipmentStatus.operational }}/{{ metrics.equipmentStatus.total }} operational</p>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-sm font-medium text-purple-600">Equipment Status</p>
        </div>
      </div>
    </div>
    
    <!-- Quick Action Buttons -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-fade-up" style="animation-delay: 0.25s;">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <QuickActionButton
          action-type="new-slot"
          label="New Slot"
          @click="handleQuickAction"
        />
        <QuickActionButton
          action-type="new-test"
          label="New Test"
          @click="handleQuickAction"
        />
        <QuickActionButton
          action-type="new-scan"
          label="New Scan"
          @click="handleQuickAction"
        />
        <QuickActionButton
          action-type="upload-report"
          label="Upload Report"
          @click="handleQuickAction"
        />
        <QuickActionButton
          action-type="admin-profile"
          label="Lab Details"
          @click="handleQuickAction"
        />
      </div>
    </div>
  </div>
</template>

<script>
import QuickActionButton from './QuickActionButton.vue'

export default {
  name: 'DashboardMetrics',
  components: {
    QuickActionButton
  },
  props: {
    metrics: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleQuickAction(actionType) {
      this.$emit('quick-action', actionType)
    }
  }
}
</script>

<style scoped>
/* Metrics specific styles */
</style>