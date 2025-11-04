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

    <!-- Doctor Logo/Brand -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center">
        <div class="w-10 h-10 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <div v-if="!isCollapsed" class="ml-3 transition-opacity duration-200">
          <h2 class="text-lg font-bold text-gray-900">Doctor Portal</h2>
          <p class="text-xs text-gray-500">VMedico</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="mt-4 flex-1">
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
                ? 'bg-green-50 text-green-700 shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
            :title="isCollapsed ? item.label : ''"
          >
            <!-- Active indicator -->
            <div 
              v-if="activeSection === item.key"
              class="absolute left-0 top-0 bottom-0 w-1 bg-green-600 rounded-r-full"
            ></div>
            
            <component 
              :is="item.icon" 
              :class="[
                'w-5 h-5 flex-shrink-0 transition-colors duration-200',
                isCollapsed ? '' : 'mr-3',
                activeSection === item.key ? 'text-green-600' : 'text-gray-500'
              ]" 
            />
            
            <span 
              v-if="!isCollapsed" 
              class="font-medium transition-opacity duration-200"
            >
              {{ item.label }}
            </span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Footer -->
    <div v-if="!isCollapsed" class="absolute bottom-4 left-4 right-4">
      <div class="bg-gray-50 rounded-lg p-3 text-center">
        <div class="text-xs text-gray-500">
          <div class="font-medium">Doctor Portal v2.0</div>
          <div class="mt-1">© 2025 VMedico</div>
        </div>
      </div>
    </div>

    <!-- Logout Button -->
    <div :class="['border-t border-gray-200', isCollapsed ? 'px-2 py-4' : 'px-4 py-4']">
      <button
        @click="handleLogout"
        :class="[
          'w-full flex items-center text-left rounded-lg transition-all duration-200 text-red-600 hover:bg-red-50',
          isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3'
        ]"
        title="Logout"
      >
        <LogoutIcon :class="['w-5 h-5 flex-shrink-0', isCollapsed ? '' : 'mr-3']" />
        <span v-if="!isCollapsed" class="font-medium">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script>
// Icon Components
const DashboardIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
  </svg>`
}

const AppointmentsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
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
  name: 'DoctorSidebar',
  components: {
    DashboardIcon,
    AppointmentsIcon,
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
          label: 'Booked Slots',
          icon: 'AppointmentsIcon'
        },
        {
          key: 'profile',
          label: 'Profile',
          icon: 'ProfileIcon'
        }
      ]
    }
  },
  mounted() {
    // Load collapsed state from localStorage
    const savedState = localStorage.getItem('doctorSidebarCollapsed')
    if (savedState !== null) {
      this.isCollapsed = JSON.parse(savedState)
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
      // Save state to localStorage
      localStorage.setItem('doctorSidebarCollapsed', JSON.stringify(this.isCollapsed))
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
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

aside {
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>



