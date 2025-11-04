<template>
  <div class="space-y-6">
    <!-- Search and Filter Section -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input 
            v-model="q" 
            placeholder="Search staff by name" 
            class="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select 
          v-model="filterRole" 
          class="block px-4 py-2 border border-gray-300 rounded-lg leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All roles</option>
          <option v-for="r in uniqueRoles" :key="r" :value="r">{{ r }}</option>
        </select>
      </div>
      <div>
        <button 
          @click="messageSelected" 
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          Message
        </button>
      </div>
    </div>

    <!-- Staff Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="s in filteredStaff" :key="s.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                  <span class="text-sm font-bold text-white">{{ getInitials(s.name) }}</span>
                </div>
                <div class="text-sm font-medium text-gray-900">{{ s.name }}</div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {{ s.role }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ s.contact }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getShiftClass(s.shift)">
                {{ s.shift }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {{ s.status || 'Active' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button 
                class="text-blue-600 hover:text-blue-900 mr-4 transition-colors" 
                @click="viewProfile(s)"
              >
                Profile
              </button>
              <button 
                class="text-green-600 hover:text-green-900 transition-colors" 
                @click="assignShift(s)"
              >
                Assign
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Empty State -->
      <div v-if="filteredStaff.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No staff found</h3>
        <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
      </div>
    </div>

    <!-- Staff Details Modal -->
    <div v-if="selectedStaff" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="selectedStaff = null">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6" @click.stop>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">{{ selectedStaff.name }} — Details</h3>
          <button @click="selectedStaff = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="text-sm font-medium text-gray-500">Role</label>
            <p class="text-sm text-gray-900">{{ selectedStaff.role }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Contact</label>
            <p class="text-sm text-gray-900">{{ selectedStaff.contact }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Shift</label>
            <p class="text-sm text-gray-900">{{ selectedStaff.shift }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Status</label>
            <p class="text-sm text-gray-900">{{ selectedStaff.status || 'Active' }}</p>
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            @click="selectedStaff = null" 
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
          <button 
            @click="assignShift(selectedStaff)" 
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Assign Shift
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StaffTab',
  props: { staff: { type: Array, required: true } },
  data() {
    return { q: '', filterRole: '', selectedStaff: null }
  },
  computed: {
    filteredStaff() {
      return this.staff.filter(s => {
        if (this.q && !s.name.toLowerCase().includes(this.q.toLowerCase())) return false
        if (this.filterRole && s.role !== this.filterRole) return false
        return true
      })
    },
    uniqueRoles() {
      return [...new Set(this.staff.map(s => s.role))]
    }
  },
  methods: {
    viewProfile(s) { 
      this.selectedStaff = s 
    },
    assignShift(s) { 
      // In a real app, this would open a modal to assign shifts
      const staffName = s?.name || 'Staff member'
      alert(`Assign shift functionality for ${staffName}.\n\nIn production, this would open a modal to:\n- Select date and time\n- Choose shift type\n- Assign to specific ward/department`)
    },
    messageSelected() { 
      alert('Message functionality.\n\nIn production, this would open a messaging interface to communicate with selected staff members.') 
    },
    getInitials(name) {
      return name
        .split(' ')
        .map(n => n.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    },
    getShiftClass(shift) {
      const classes = {
        'Morning': 'bg-yellow-100 text-yellow-800',
        'Evening': 'bg-orange-100 text-orange-800',
        'Night': 'bg-indigo-100 text-indigo-800',
        'Day': 'bg-blue-100 text-blue-800'
      }
      return classes[shift] || 'bg-gray-100 text-gray-800'
    }
  }
}
</script>

<style scoped>
</style>

