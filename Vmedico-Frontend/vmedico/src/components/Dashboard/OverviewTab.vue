<template>
  <div class="space-y-6">
    <!-- Enhanced KPI Cards with animations -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-150 hover:scale-105 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-500 font-medium">Total Patients</div>
            <div class="text-3xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{{ totalPatients }}</div>
            <div class="text-xs text-green-600 mt-1 flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              +12% from last week
            </div>
          </div>
          <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-150 hover:scale-105 border border-gray-100">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <div class="text-sm text-gray-500 font-medium">Occupancy Rate</div>
            <div class="text-3xl font-bold mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{{ hospital.occupancyRate }}%</div>
            <div class="mt-3">
              <div class="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Current</span>
                <span>{{ hospital.occupancyRate }}%</span>
              </div>
              <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000" :style="{ width: hospital.occupancyRate + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-150 hover:scale-105 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-500 font-medium">ER Visits (Today)</div>
            <div class="text-3xl font-bold mt-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{{ erVisits }}</div>
            <div class="text-xs text-orange-600 mt-1 flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              +8% from yesterday
            </div>
          </div>
          <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-150 hover:scale-105 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-500 font-medium">Avg Length of Stay</div>
            <div class="text-3xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{{ avgLoS }} days</div>
            <div class="text-xs text-purple-600 mt-1 flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              -0.3 days from last month
            </div>
          </div>
          <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Admissions Trend Chart -->
      <div class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="font-bold text-lg text-gray-800">Admissions Trend</h3>
            <p class="text-sm text-gray-500">Last 7 days</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span class="text-sm text-gray-600">Admissions</span>
          </div>
        </div>

        <div class="h-64 flex items-end gap-2">
          <div v-for="(val, idx) in admissionsTrend" :key="idx" class="flex-1 flex flex-col items-center group cursor-pointer">
            <div class="relative">
              <div
                :title="val + ' admissions'"
                class="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-150 hover:from-blue-600 hover:to-blue-500 group-hover:scale-105"
                :style="{ height: (val * 8) + 'px', minHeight: '4px' }"
              ></div>
              <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {{ val }}
              </div>
            </div>
            <div class="text-xs text-center mt-3 text-gray-600 font-medium">{{ lastNDays[idx] }}</div>
          </div>
        </div>
      </div>

      <!-- Ward Distribution -->
      <div class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="font-bold text-lg text-gray-800">Ward Distribution</h3>
            <p class="text-sm text-gray-500">Current occupancy</p>
          </div>
        </div>

        <div class="space-y-4">
          <div v-for="ward in wardDistribution" :key="ward.name" class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div :class="ward.color" class="w-4 h-4 rounded-full"></div>
              <span class="text-sm font-medium text-gray-700">{{ ward.name }}</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div :class="ward.bgColor" class="h-full rounded-full transition-all duration-1000" :style="{ width: ward.percentage + '%' }"></div>
              </div>
              <span class="text-sm font-medium text-gray-600 w-12 text-right">{{ ward.percentage }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions & Alerts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h4 class="font-bold text-lg text-gray-800">Quick Actions</h4>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button @click="$emit('generateReport')" class="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="text-left">
                <div class="text-sm font-medium text-gray-700">Generate Report</div>
                <div class="text-xs text-gray-500">Daily summary</div>
              </div>
            </div>
          </button>
          
          <button class="p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="text-left">
                <div class="text-sm font-medium text-gray-700">Export Data</div>
                <div class="text-xs text-gray-500">Patient list</div>
              </div>
            </div>
          </button>
          
          <button class="p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <div class="text-left">
                <div class="text-sm font-medium text-gray-700">ICU Panel</div>
                <div class="text-xs text-gray-500">Monitor beds</div>
              </div>
            </div>
          </button>
          
          <button class="p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div class="text-left">
                <div class="text-sm font-medium text-gray-700">Assign Staff</div>
                <div class="text-xs text-gray-500">Schedule shifts</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h4 class="font-bold text-lg text-gray-800">Hospital Alerts</h4>
        </div>
        <div class="space-y-3">
          <div class="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-xl hover:bg-red-100 transition-colors duration-200">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 bg-red-500 rounded-full mt-2 animate-pulse"></div>
              <div class="flex-1">
                <div class="text-sm font-medium text-red-800">ICU Capacity Alert</div>
                <div class="text-xs text-red-600 mt-1">ICU at 88% capacity — consider discharge planning</div>
                <div class="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                  </svg>
                  15 min ago
                </div>
              </div>
            </div>
          </div>
          
          <div class="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r-xl hover:bg-yellow-100 transition-colors duration-200">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div class="flex-1">
                <div class="text-sm font-medium text-yellow-800">Maintenance Scheduled</div>
                <div class="text-xs text-yellow-600 mt-1">MRI #2 scheduled for maintenance at 3:00 PM</div>
                <div class="text-xs text-yellow-500 mt-2 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                  </svg>
                  30 min ago
                </div>
              </div>
            </div>
          </div>

          <div class="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-r-xl hover:bg-blue-100 transition-colors duration-200">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div class="flex-1">
                <div class="text-sm font-medium text-blue-800">New Patient Admitted</div>
                <div class="text-xs text-blue-600 mt-1">Patient P-1004 admitted to Cardiology ward</div>
                <div class="text-xs text-blue-500 mt-2 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                  </svg>
                  45 min ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverviewTab',
  props: {
    hospital: { type: Object, required: true },
    isDarkMode: { type: Boolean, default: false }
  },
  data() {
    return {
      erVisits: 45,
      avgLoS: 4.2,
      // admissions trend sample values (last 7 days)
      admissionsTrend: [5, 7, 6, 8, 9, 4, 6],
      lastNDays: ['D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1', 'Today'],
      // totalPatients would normally be computed from patients dataset — mocked here
      totalPatients: 287,
      // Ward distribution data
      wardDistribution: [
        { name: 'ICU', percentage: 88, color: 'bg-red-500', bgColor: 'bg-gradient-to-r from-red-500 to-red-400' },
        { name: 'Cardiology', percentage: 75, color: 'bg-blue-500', bgColor: 'bg-gradient-to-r from-blue-500 to-blue-400' },
        { name: 'Pediatrics', percentage: 60, color: 'bg-green-500', bgColor: 'bg-gradient-to-r from-green-500 to-green-400' },
        { name: 'Orthopedics', percentage: 45, color: 'bg-purple-500', bgColor: 'bg-gradient-to-r from-purple-500 to-purple-400' },
        { name: 'Emergency', percentage: 30, color: 'bg-orange-500', bgColor: 'bg-gradient-to-r from-orange-500 to-orange-400' }
      ]
    }
  },
  mounted() {
    // Animate numbers on load
    this.animateNumbers()
  },
  methods: {
    animateNumbers() {
      // Animate the KPI numbers
      const animateValue = (start, end, duration, callback) => {
        const startTime = performance.now()
        const animate = (currentTime) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          const current = Math.floor(start + (end - start) * progress)
          callback(current)
          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }
        requestAnimationFrame(animate)
      }

      // Animate total patients
      animateValue(0, this.totalPatients, 1000, (value) => {
        this.totalPatients = value
      })

      // Animate ER visits
      animateValue(0, this.erVisits, 1200, (value) => {
        this.erVisits = value
      })

      // Animate average length of stay
      animateValue(0, this.avgLoS * 10, 1500, (value) => {
        this.avgLoS = (value / 10).toFixed(1)
      })
    }
  }
}
</script>

<style scoped>
/* small helpers */
</style>

