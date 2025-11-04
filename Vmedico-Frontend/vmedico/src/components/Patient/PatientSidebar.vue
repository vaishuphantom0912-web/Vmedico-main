<template>
  <aside 
    :class="[
      'bg-white shadow-lg border-r border-gray-200 min-h-screen transition-all duration-300 ease-in-out relative',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <!-- Toggle Button -->
    <button
      @click="toggleSidebar"
      class="absolute -right-3 top-6 bg-white border border-gray-300 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200 z-10"
      :title="isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'"
    >
      <svg 
        :class="['w-4 h-4 text-gray-600 transition-transform duration-200', isCollapsed ? 'rotate-180' : '']"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>

    <!-- Patient Portal Logo/Brand -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center">
        <div class="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
          <span class="material-symbols-rounded text-white text-xl" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">medical_services</span>
        </div>
        <div v-if="!isCollapsed" class="ml-3 transition-opacity duration-200">
          <h2 class="text-lg font-bold text-gray-900">Patient Portal</h2>
          <p class="text-xs text-gray-500">VMedico</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="mt-4">
      <div :class="['space-y-1', isCollapsed ? 'px-2' : 'px-4']">
        <!-- Navigation Items -->
        <div
          v-for="item in navigationItems"
          :key="item.key"
          class="relative group"
        >
          <button
            @click="handleNavigation(item.key)"
            :class="[
              'w-full flex items-center text-left rounded-lg transition-all duration-200 relative',
              isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3',
              activeSection === item.key
                ? 'bg-red-50 text-red-700 shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
            :title="isCollapsed ? item.label : ''"
          >
            <!-- Active indicator -->
            <div 
              v-if="activeSection === item.key"
              class="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-r-full"
            ></div>
            
            <component 
              :is="item.icon" 
              :class="[
                'w-5 h-5 flex-shrink-0 transition-colors duration-200',
                isCollapsed ? '' : 'mr-3',
                activeSection === item.key ? 'text-red-600' : 'text-gray-500'
              ]" 
            />
            
            <span 
              v-if="!isCollapsed" 
              class="font-medium transition-opacity duration-200"
            >
              {{ item.label }}
            </span>

            <!-- Badge for active item -->
            <div 
              v-if="activeSection === item.key && !isCollapsed"
              class="ml-auto w-2 h-2 bg-red-600 rounded-full"
            ></div>
          </button>

          <!-- Tooltip for collapsed state -->
          <div
            v-if="isCollapsed"
            class="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap top-1/2 transform -translate-y-1/2"
          >
            {{ item.label }}
            <div class="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
          </div>
        </div>
        
        <!-- Logout Button -->
        <div :class="['pt-4 mt-6 border-t border-gray-200', isCollapsed ? 'px-0' : '']">
          <div class="relative group">
            <button
              @click="handleLogout"
              :class="[
                'w-full flex items-center text-left rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200',
                isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3'
              ]"
              :title="isCollapsed ? 'Logout' : ''"
            >
              <LogoutIcon 
                :class="[
                  'w-5 h-5 flex-shrink-0',
                  isCollapsed ? '' : 'mr-3'
                ]" 
              />
              <span v-if="!isCollapsed" class="font-medium">Logout</span>
            </button>

            <!-- Tooltip for collapsed logout -->
            <div
              v-if="isCollapsed"
              class="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap top-1/2 transform -translate-y-1/2"
            >
              Logout
              <div class="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Footer -->
    <div v-if="!isCollapsed" class="absolute bottom-4 left-4 right-4">
      <div class="bg-gray-50 rounded-lg p-3 text-center">
        <div class="text-xs text-gray-500">
          <div class="font-medium">Patient Dashboard v2.0</div>
          <div class="mt-1">© 2025 VMedico</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
// Icon Components
const DashboardIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
  </svg>`
}

const AppointmentsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
  </svg>`
}

const LabReportsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
  </svg>`
}

const HealthIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
  </svg>`
}

const MedicationsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
  </svg>`
}

const ProfileIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
  </svg>`
}

const LogoutIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
  </svg>`
}

export default {
  name: 'PatientSidebar',
  components: {
    DashboardIcon,
    AppointmentsIcon,
    LabReportsIcon,
    HealthIcon,
    MedicationsIcon,
    ProfileIcon,
    LogoutIcon
  },
  props: {
    activeSection: {
      type: String,
      default: 'dashboard'
    }
  },
  data() {
    return {
      isCollapsed: false,
      navigationItems: [
        {
          key: 'dashboard',
          label: 'Dashboard',
          icon: 'DashboardIcon'
        },
        {
          key: 'appointments',
          label: 'Appointments',
          icon: 'AppointmentsIcon'
        },
        {
          key: 'lab-reports',
          label: 'Lab Reports',
          icon: 'LabReportsIcon'
        },
        {
          key: 'health',
          label: 'Health Summary',
          icon: 'HealthIcon'
        },
        {
          key: 'medications',
          label: 'Medications',
          icon: 'MedicationsIcon'
        },
        {
          key: 'profile',
          label: 'Patient Profile',
          icon: 'ProfileIcon'
        }
      ]
    }
  },
  mounted() {
    // Load collapsed state from localStorage
    const savedState = localStorage.getItem('patientSidebarCollapsed')
    if (savedState !== null) {
      this.isCollapsed = JSON.parse(savedState)
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
      // Save state to localStorage
      localStorage.setItem('patientSidebarCollapsed', JSON.stringify(this.isCollapsed))
      // Emit event to parent components if needed
      this.$emit('sidebar-toggle', this.isCollapsed)
    },
    
    handleNavigation(section) {
      this.$emit('navigate', section)
    },
    
    handleLogout() {
      this.$emit('logout')
    }
  }
}
</script>

<style scoped>
/* Sidebar specific styles */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Smooth width transition */
aside {
  transition: width 0.3s ease-in-out;
}
</style>

