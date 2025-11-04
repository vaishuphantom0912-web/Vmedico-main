<template>
  <Card title="Recent Lab Reports" padding="p-4">
    <div class="space-y-3">
      <button 
        v-for="report in reports" 
        :key="report.id"
        @click="viewReportDetails(report)"
        class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left border border-transparent hover:border-blue-200"
        :disabled="report.status === 'Processing'"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg" :class="report.iconBackground">
            <component :is="report.icon" :class="report.iconClass" />
          </div>
          <div>
            <p class="font-medium text-gray-800">{{ report.name }}</p>
            <p class="text-sm text-gray-500">{{ report.date }}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <span 
            v-if="report.status"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
            :class="report.statusClass"
          >
            {{ report.status }}
          </span>
          <button
            @click.stop="handleDownload(report)"
            class="p-1.5 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            :title="`Download ${report.name}`"
            v-if="report.status === 'Available'"
          >
            <ArrowDownTrayIcon class="w-4 h-4 text-gray-600" />
          </button>
          <EyeIcon class="w-4 h-4 text-blue-600" v-if="report.status === 'Available'" />
        </div>
      </button>
    </div>

    <!-- Report Details Modal -->
    <div v-if="showReportModal" class="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <!-- Left: Back Button -->
          <div class="flex items-center">
            <button 
              @click="closeReportModal"
              class="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <span class="material-symbols-rounded" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">arrow_back</span>
              <span class="font-semibold text-lg">Back to Dashboard</span>
            </button>
          </div>
          
          <!-- Center: Report Title -->
          <div class="text-center">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <component :is="selectedReport?.icon" :class="selectedReport?.iconClass" />
              {{ selectedReport?.name }}
            </h2>
            <p class="text-sm text-gray-600">{{ selectedReport?.date }}</p>
          </div>
          
          <!-- Right: Close Button -->
          <div class="flex items-center">
            <button 
              @click="closeReportModal"
              class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <XMarkIcon class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <div v-if="selectedReport" class="space-y-6">
            <!-- Report Header Info -->
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p class="text-sm text-gray-600">Report Date</p>
                  <p class="font-semibold">{{ selectedReport.date }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Status</p>
                  <span 
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                    :class="selectedReport.statusClass"
                  >
                    {{ selectedReport.status }}
                  </span>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Lab</p>
                  <p class="font-semibold">{{ selectedReport.lab || 'PathLab Diagnostics' }}</p>
                </div>
              </div>
            </div>

            <!-- Report Details -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-800">Test Results</h3>
              
              <div v-if="selectedReport.results" class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Normal Range</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="result in selectedReport.results" :key="result.parameter">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ result.parameter }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ result.value }} {{ result.unit }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ result.normalRange }}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span 
                          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          :class="result.status === 'Normal' ? 'bg-green-100 text-green-800' : 
                                 result.status === 'High' ? 'bg-red-100 text-red-800' : 
                                 'bg-yellow-100 text-yellow-800'"
                        >
                          {{ result.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Doctor's Notes -->
              <div v-if="selectedReport.notes" class="bg-blue-50 rounded-lg p-4">
                <h4 class="font-semibold text-blue-900 mb-2">Doctor's Notes</h4>
                <p class="text-blue-800">{{ selectedReport.notes }}</p>
              </div>

              <!-- Recommendations -->
              <div v-if="selectedReport.recommendations" class="bg-green-50 rounded-lg p-4">
                <h4 class="font-semibold text-green-900 mb-2">Recommendations</h4>
                <ul class="list-disc list-inside text-green-800 space-y-1">
                  <li v-for="rec in selectedReport.recommendations" :key="rec">{{ rec }}</li>
                </ul>
              </div>
            </div>

            <!-- Modal Actions -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <button 
                @click="closeReportModal"
                class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Close
              </button>
              <button 
                @click="handleDownload(selectedReport)"
                class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <ArrowDownTrayIcon class="w-4 h-4" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-4 pt-4 border-t border-gray-200">
      <Button 
        variant="ghost" 
        size="sm" 
        full-width
        @click="handleViewAll"
      >
        View All Reports
      </Button>
    </div>
  </Card>
</template>

<script>
import { computed, ref } from 'vue'
import Card from './base/Card.vue'
import Button from './base/Button.vue'

// Icon Components
const BeakerIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
    </svg>
  `
}

const DocumentTextIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
  `
}

const ArrowDownTrayIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
    </svg>
  `
}

const EyeIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
    </svg>
  `
}

const XMarkIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  `
}

const ArrowBackIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
    </svg>
  `
}

export default {
  name: 'LabReports',
  components: {
    Card,
    Button,
    BeakerIcon,
    DocumentTextIcon,
    ArrowDownTrayIcon,
    EyeIcon,
    XMarkIcon,
    ArrowBackIcon
  },
  props: {
    reports: {
      type: Array,
      default: () => []
    }
  },
  emits: ['download', 'view-all'],
  setup(props, { emit }) {
    const showReportModal = ref(false)
    const selectedReport = ref(null)

    const defaultReports = [
      {
        id: 'blood-test-1',
        name: 'Blood Test Report',
        date: 'Dec 15, 2024',
        status: 'Available',
        icon: BeakerIcon,
        iconClass: 'w-5 h-5 text-red-600',
        iconBackground: 'bg-red-100',
        statusClass: 'bg-green-100 text-green-800',
        lab: 'PathLab Diagnostics',
        results: [
          { parameter: 'Hemoglobin', value: '14.2', unit: 'g/dL', normalRange: '12.0-15.5', status: 'Normal' },
          { parameter: 'White Blood Cells', value: '7.8', unit: '×10³/μL', normalRange: '4.0-11.0', status: 'Normal' },
          { parameter: 'Platelets', value: '285', unit: '×10³/μL', normalRange: '150-450', status: 'Normal' },
          { parameter: 'Blood Sugar', value: '110', unit: 'mg/dL', normalRange: '70-100', status: 'High' },
          { parameter: 'Cholesterol', value: '180', unit: 'mg/dL', normalRange: '<200', status: 'Normal' }
        ],
        notes: 'Overall blood parameters are within normal limits. Slight elevation in blood sugar levels noted.',
        recommendations: [
          'Monitor blood sugar levels regularly',
          'Follow a balanced diet with reduced sugar intake',
          'Regular exercise recommended',
          'Follow-up test in 3 months'
        ]
      },
      {
        id: 'xray-1',
        name: 'X-Ray Report',
        date: 'Dec 10, 2024',
        status: 'Available',
        icon: DocumentTextIcon,
        iconClass: 'w-5 h-5 text-blue-600',
        iconBackground: 'bg-blue-100',
        statusClass: 'bg-green-100 text-green-800',
        lab: 'SRL Diagnostics',
        results: [
          { parameter: 'Chest X-Ray', value: 'Normal', unit: '', normalRange: 'Normal', status: 'Normal' },
          { parameter: 'Heart Size', value: 'Normal', unit: '', normalRange: 'Normal', status: 'Normal' },
          { parameter: 'Lung Fields', value: 'Clear', unit: '', normalRange: 'Clear', status: 'Normal' },
          { parameter: 'Bone Structure', value: 'Normal', unit: '', normalRange: 'Normal', status: 'Normal' }
        ],
        notes: 'Chest X-ray shows normal heart size and clear lung fields. No abnormalities detected.',
        recommendations: [
          'No immediate action required',
          'Maintain good respiratory health',
          'Annual chest X-ray recommended for routine screening'
        ]
      },
      {
        id: 'urine-test-1',
        name: 'Urine Analysis',
        date: 'Dec 8, 2024',
        status: 'Processing',
        icon: BeakerIcon,
        iconClass: 'w-5 h-5 text-yellow-600',
        iconBackground: 'bg-yellow-100',
        statusClass: 'bg-yellow-100 text-yellow-800',
        lab: 'Metropolis Healthcare'
      }
    ]

    const reports = computed(() => {
      return props.reports.length > 0 ? props.reports : defaultReports
    })

    const handleDownload = (report) => {
      emit('download', report)
      // TODO: Implement actual download functionality
      console.log(`Downloading ${report.name}...`)
    }

    const handleViewAll = () => {
      emit('view-all')
    }

    const viewReportDetails = (report) => {
      if (report.status === 'Processing') {
        alert('Report is still being processed. Please check back later.')
        return
      }
      selectedReport.value = report
      showReportModal.value = true
    }

    const closeReportModal = () => {
      showReportModal.value = false
      selectedReport.value = null
    }

    return {
      reports,
      showReportModal,
      selectedReport,
      handleDownload,
      handleViewAll,
      viewReportDetails,
      closeReportModal
    }
  }
}
</script>
