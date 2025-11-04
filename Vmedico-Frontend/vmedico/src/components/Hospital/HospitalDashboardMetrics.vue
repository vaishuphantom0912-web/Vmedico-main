<template>
  <div class="space-y-6">
    <!-- Metrics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Today Admissions -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.05s;">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-bold text-gray-900 metric-number">{{ metrics.todayAdmissions.count }}</p>
            <p class="text-sm text-gray-600">{{ metrics.todayAdmissions.admitted }} admitted • {{ metrics.todayAdmissions.discharged }} discharged</p>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-sm font-medium text-blue-600">Today Admissions</p>
        </div>
      </div>
      
      <!-- ICU Occupancy -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.1s;">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-bold text-gray-900 metric-number">{{ metrics.icuOccupancy.percentage }}%</p>
            <p class="text-sm text-gray-600">{{ metrics.icuOccupancy.occupied }}/{{ metrics.icuOccupancy.total }} beds</p>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-sm font-medium text-red-600">ICU Occupancy</p>
        </div>
      </div>
      
      <!-- ER Visits -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.15s;">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-bold text-gray-900 metric-number">{{ metrics.erVisits.count }}</p>
            <p class="text-sm text-gray-600">{{ metrics.erVisits.treated }} treated today</p>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-sm font-medium text-orange-600">ER Visits Today</p>
        </div>
      </div>
      
      <!-- Staff On Duty -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dashboard-card animate-fade-up" style="animation-delay: 0.2s;">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-bold text-gray-900 metric-number">{{ metrics.staffOnDuty.count }}</p>
            <p class="text-sm text-gray-600">{{ metrics.staffOnDuty.doctors }} doctors • {{ metrics.staffOnDuty.nurses }} nurses</p>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-sm font-medium text-green-600">Staff On Duty</p>
        </div>
      </div>
    </div>
    
    <!-- Quick Action Buttons -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-fade-up" style="animation-delay: 0.25s;">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <QuickActionButton
          action-type="new-admission"
          label="New Admission"
          @click="handleQuickAction"
        />
        <QuickActionButton
          action-type="assign-staff"
          label="Assign Staff"
          @click="handleQuickAction"
        />
        <QuickActionButton
          action-type="generate-report"
          label="Generate Report"
          @click="handleQuickAction"
        />
        <QuickActionButton
          action-type="icu-panel"
          label="ICU Panel"
          @click="handleQuickAction"
        />
        <QuickActionButton
          action-type="hospital-profile"
          label="Hospital Profile"
          @click="handleQuickAction"
        />
      </div>
    </div>
  </div>
</template>

<script>
import QuickActionButton from '../Lab/QuickActionButton.vue'

export default {
  name: 'HospitalDashboardMetrics',
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



