<template>
  <div class="min-h-screen bg-gray-50">
    <div class="p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Lab Dashboard</h1>
      
      <!-- Test with just the DashboardMetrics component -->
      <DashboardMetrics 
        :metrics="dashboardMetrics"
        @quick-action="handleQuickAction"
      />
    </div>
  </div>
</template>

<script>
import DashboardMetrics from '../../components/Lab/DashboardMetrics.vue'

export default {
  name: 'MinimalLabDashboard',
  components: {
    DashboardMetrics
  },
  data() {
    return {
      // Dashboard Metrics
      dashboardMetrics: {
        todayAppointments: {
          count: 24,
          booked: 18,
          open: 6
        },
        pendingReports: {
          count: 12,
          tests: 8,
          scans: 4
        },
        activeTests: {
          count: 15,
          scheduled: 15
        },
        equipmentStatus: {
          percentage: 92,
          operational: 11,
          total: 12
        }
      }
    }
  },
  methods: {
    handleQuickAction(actionType) {
      console.log('Quick action clicked:', actionType)
      
      switch (actionType) {
        case 'admin-profile':
          this.$router.push('/lab/admin-profile')
          break
        default:
          alert(`Quick action: ${actionType}`)
      }
    }
  }
}
</script>