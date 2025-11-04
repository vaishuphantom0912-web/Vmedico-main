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

    <!-- Hospital Logo/Brand -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center">
        <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <div v-if="!isCollapsed" class="ml-3 transition-opacity duration-200">
          <h2 class="text-lg font-bold text-gray-900">Hospital Portal</h2>
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
                ? 'bg-blue-50 text-blue-700 shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
            :title="isCollapsed ? item.label : ''"
          >
            <!-- Active indicator -->
            <div 
              v-if="activeSection === item.key"
              class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full"
            ></div>
            
            <component 
              :is="item.icon" 
              :class="[
                'w-5 h-5 flex-shrink-0 transition-colors duration-200',
                isCollapsed ? '' : 'mr-3',
                activeSection === item.key ? 'text-blue-600' : 'text-gray-500'
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
              class="ml-auto w-2 h-2 bg-blue-600 rounded-full"
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
          <div class="font-medium">Hospital Dashboard v2.0</div>
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

const PatientsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
  </svg>`
}

const StaffIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
  </svg>`
}

const ReportsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
  </svg>`
}

const LabIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"></path>
  </svg>`
}

const ProfileIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
  </svg>`
}

const LogoutIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
  </svg>`
}

export default {
  name: 'HospitalSidebar',
  components: {
    DashboardIcon,
    PatientsIcon,
    StaffIcon,
    ReportsIcon,
    LabIcon,
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
          key: 'patients',
          label: 'Patients',
          icon: 'PatientsIcon'
        },
        {
          key: 'staff',
          label: 'Staff',
          icon: 'StaffIcon'
        },
        {
          key: 'reports',
          label: 'Reports',
          icon: 'ReportsIcon'
        },
        {
          key: 'lab',
          label: 'Lab Management',
          icon: 'LabIcon'
        },
        {
          key: 'profile',
          label: 'Hospital Profile',
          icon: 'ProfileIcon'
        }
      ]
    }
  },
  mounted() {
    // Load collapsed state from localStorage
    const savedState = localStorage.getItem('hospitalSidebarCollapsed')
    if (savedState !== null) {
      this.isCollapsed = JSON.parse(savedState)
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
      // Save state to localStorage
      localStorage.setItem('hospitalSidebarCollapsed', JSON.stringify(this.isCollapsed))
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
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Active indicator animation */
.bg-blue-50 {
  position: relative;
}

/* Hover effects */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Logo animation */
.w-10.h-10 {
  transition: all 0.3s ease;
}

.w-10.h-10:hover {
  transform: scale(1.05);
}

/* Text fade animation */
.transition-opacity {
  transition: opacity 0.2s ease-in-out;
}

/* Focus styles for accessibility */
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Animation for active state */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.bg-blue-50 {
  animation: slideIn 0.2s ease-out;
}

/* Gradient background for active items */
.bg-blue-50 {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
}

/* Shadow effects */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>



