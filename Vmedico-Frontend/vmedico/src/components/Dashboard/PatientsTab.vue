<template>
  <div>
    <!-- Enhanced Search and Filters -->
    <div class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 mb-6">
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Search Bar -->
        <div class="flex-1">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              v-model="search" 
              type="search" 
              placeholder="Search patients by name, ID, or ward..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
            />
          </div>
        </div>

        <!-- Filters -->
        <div class="flex gap-3">
          <select v-model="filterWard" class="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150">
            <option value="">All Wards</option>
            <option v-for="w in wards" :key="w" :value="w">{{ w }}</option>
          </select>
          
          <select v-model="filterStatus" class="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150">
            <option value="">Any Status</option>
            <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button @click="exportPatientsCsv" class="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-150 flex items-center gap-2 shadow-lg hover:shadow-xl">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Export CSV
          </button>
          
          <button @click="addMockPatient" class="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-150 flex items-center gap-2 shadow-lg hover:shadow-xl">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Patient
          </button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="mt-4 flex flex-wrap gap-4 text-sm">
        <div class="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
          <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>{{ filteredPatients.length }} patients found</span>
        </div>
        <div class="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full">
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>{{ criticalPatients }} critical</span>
        </div>
        <div class="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
          <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <span>{{ observationPatients }} under observation</span>
        </div>
      </div>
    </div>

    <!-- Enhanced Patient Table -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient ID</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient Info</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ward</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Doctor</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Admitted</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(p, index) in paginatedPatients" :key="p.id" class="hover:bg-blue-50/50 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {{ p.id.split('-')[1].charAt(0) }}
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-semibold text-gray-900">{{ p.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ p.name }}</div>
                    <div class="text-sm text-gray-500">{{ p.age }} years • {{ p.gender }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div :class="getWardColor(p.ward)" class="w-3 h-3 rounded-full mr-2"></div>
                  <span class="text-sm font-medium text-gray-900">{{ p.ward }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ p.doctor }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(p.admissionDate) }}</div>
                <div class="text-xs text-gray-500">{{ getDaysSinceAdmission(p.admissionDate) }} days</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="statusClass(p.status)" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium">
                  <div :class="getStatusDot(p.status)" class="w-2 h-2 rounded-full mr-2"></div>
                  {{ p.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-2">
                  <button @click="openPatient(p)" class="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-100 transition-all duration-150">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button @click="dischargePatient(p.id)" class="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-100 transition-all duration-150">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                  <button @click="editPatient(p)" class="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-all duration-150">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4">
      <div class="text-sm text-gray-500">Showing {{ paginatedPatients.length }} of {{ filteredPatients.length }} (filtered)</div>
      <div class="flex items-center gap-2">
        <button @click="prevPage" :disabled="currentPage===1" class="px-3 py-1 border rounded">Prev</button>
        <span class="px-3 py-1 border rounded">{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage===totalPages" class="px-3 py-1 border rounded">Next</button>
      </div>
    </div>

    <!-- Patient details modal -->
    <div v-if="selectedPatient" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white w-full max-w-2xl rounded-lg p-6 relative">
        <button @click="closeModal" class="absolute top-3 right-3 text-gray-500">✕</button>
        <h3 class="text-lg font-bold mb-2">{{ selectedPatient.name }} — {{ selectedPatient.id }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Age:</strong> {{ selectedPatient.age }}</p>
            <p><strong>Gender:</strong> {{ selectedPatient.gender }}</p>
            <p><strong>Ward:</strong> {{ selectedPatient.ward }}</p>
            <p><strong>Doctor:</strong> {{ selectedPatient.doctor }}</p>
          </div>
          <div>
            <p><strong>Admitted:</strong> {{ formatDate(selectedPatient.admissionDate) }}</p>
            <p><strong>Status:</strong> {{ selectedPatient.status }}</p>
            <p><strong>Notes:</strong> {{ selectedPatient.notes }}</p>
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <button @click="closeModal" class="px-3 py-1 border rounded">Close</button>
          <button class="px-3 py-1 bg-blue-600 text-white rounded">Open Chart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientsTab',
  props: {
    patients: { type: Array, required: true },
    isDarkMode: { type: Boolean, default: false }
  },
  data() {
    return {
      search: '',
      filterWard: '',
      filterStatus: '',
      wards: ['Cardiology', 'ICU', 'Orthopedics', 'Pediatrics', 'Emergency'],
      statuses: ['Admitted', 'Under Observation', 'Critical', 'Discharged'],
      currentPage: 1,
      pageSize: 6,
      selectedPatient: null,
    }
  },
  computed: {
    filteredPatients() {
      const q = this.search.trim().toLowerCase()
      return this.patients.filter(p => {
        if (q && !(p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.ward.toLowerCase().includes(q))) return false
        if (this.filterWard && p.ward !== this.filterWard) return false
        if (this.filterStatus && p.status !== this.filterStatus) return false
        return true
      })
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredPatients.length / this.pageSize))
    },
    paginatedPatients() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.filteredPatients.slice(start, start + this.pageSize)
    },
    criticalPatients() {
      return this.patients.filter(p => p.status === 'Critical').length
    },
    observationPatients() {
      return this.patients.filter(p => p.status === 'Under Observation').length
    }
  },
  methods: {
    formatDate(d) {
      const dt = new Date(d)
      return dt.toLocaleDateString()
    },
    getDaysSinceAdmission(admissionDate) {
      const today = new Date()
      const admission = new Date(admissionDate)
      const diffTime = Math.abs(today - admission)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    },
    getWardColor(ward) {
      const colors = {
        'ICU': 'bg-red-500',
        'Cardiology': 'bg-blue-500',
        'Pediatrics': 'bg-green-500',
        'Orthopedics': 'bg-purple-500',
        'Emergency': 'bg-orange-500'
      }
      return colors[ward] || 'bg-gray-500'
    },
    getStatusDot(status) {
      const dots = {
        'Critical': 'bg-red-500',
        'Under Observation': 'bg-yellow-500',
        'Admitted': 'bg-blue-500',
        'Discharged': 'bg-green-500'
      }
      return dots[status] || 'bg-gray-500'
    },
    statusClass(status) {
      return {
        'bg-green-100 text-green-800': status === 'Discharged',
        'bg-yellow-100 text-yellow-800': status === 'Under Observation',
        'bg-red-100 text-red-800': status === 'Critical',
        'bg-blue-100 text-blue-800': status === 'Admitted'
      }
    },
    openPatient(p) {
      this.selectedPatient = Object.assign({}, p)
    },
    closeModal() {
      this.selectedPatient = null
    },
    editPatient(p) {
      // Enhanced edit functionality
      const newName = prompt('Edit patient name:', p.name)
      if (newName && newName !== p.name) {
        const idx = this.patients.findIndex(x => x.id === p.id)
        if (idx !== -1) {
          this.$set(this.patients[idx], 'name', newName)
        }
      }
    },
    dischargePatient(id) {
      if (confirm('Are you sure you want to discharge this patient?')) {
        const idx = this.patients.findIndex(x => x.id === id)
        if (idx !== -1) {
          this.$set(this.patients[idx], 'status', 'Discharged')
          this.$set(this.patients[idx], 'dischargeDate', new Date().toISOString().slice(0,10))
        }
        // Show success notification
        this.$emit('show-toast', `Patient ${id} has been discharged successfully`)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    addMockPatient() {
      const id = 'P-' + (Math.floor(Math.random() * 9000) + 1000)
      const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown']
      const wards = ['Emergency', 'Cardiology', 'Pediatrics', 'Orthopedics']
      const doctors = ['Dr. Alice', 'Dr. Rahul', 'Dr. Anita', 'Dr. Raj']
      const statuses = ['Admitted', 'Under Observation']
      
      const newPatient = {
        id,
        name: names[Math.floor(Math.random() * names.length)],
        age: Math.floor(Math.random() * 50) + 20,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        ward: wards[Math.floor(Math.random() * wards.length)],
        doctor: doctors[Math.floor(Math.random() * doctors.length)],
        admissionDate: new Date().toISOString().slice(0,10),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        notes: 'New admission'
      }
      
      this.patients.push(newPatient)
      this.$emit('show-toast', `New patient ${id} added successfully`)
    },
    exportPatientsCsv() {
      const rows = this.filteredPatients
      if (!rows.length) { 
        this.$emit('show-toast', 'No patients to export')
        return 
      }
      
      const keys = Object.keys(rows[0])
      const csv = [keys.join(',')].concat(rows.map(r => keys.map(k => `"${String(r[k] ?? '')}"`).join(','))).join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `patients_export_${new Date().toISOString().slice(0,10)}.csv`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      
      this.$emit('show-toast', 'Patient data exported successfully')
    }
  }
}
</script>

<style scoped>
table th { font-weight: 600; }
</style>

