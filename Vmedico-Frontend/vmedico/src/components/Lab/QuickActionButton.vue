<template>
  <button
    @click="handleClick"
    :class="buttonClasses"
    class="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg transition-colors duration-200"
  >
    <div :class="iconContainerClasses" class="w-8 h-8 rounded-md flex items-center justify-center mb-2">
      <!-- New Slot Icon -->
      <svg v-if="actionType === 'new-slot'" class="w-5 h-5" :class="iconClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      
      <!-- New Test Icon -->
      <svg v-else-if="actionType === 'new-test'" class="w-5 h-5" :class="iconClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"></path>
      </svg>
      
      <!-- New Scan Icon -->
      <svg v-else-if="actionType === 'new-scan'" class="w-5 h-5" :class="iconClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
      </svg>
      
      <!-- Upload Report Icon -->
      <svg v-else-if="actionType === 'upload-report'" class="w-5 h-5" :class="iconClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
      </svg>
      
      <!-- Admin Profile Icon -->
      <svg v-else-if="actionType === 'admin-profile'" class="w-5 h-5" :class="iconClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
      
      <!-- New Admission Icon (Hospital) -->
      <svg v-else-if="actionType === 'new-admission'" class="w-5 h-5" :class="iconClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
      </svg>
      
      <!-- Assign Staff Icon (Hospital) -->
      <svg v-else-if="actionType === 'assign-staff'" class="w-5 h-5" :class="iconClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
      
      <!-- Generate Report Icon (Hospital) -->
      <svg v-else-if="actionType === 'generate-report'" class="w-5 h-5" :class="iconClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      
      <!-- ICU Panel Icon (Hospital) -->
      <svg v-else-if="actionType === 'icu-panel'" class="w-5 h-5" :class="iconClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
      </svg>
      
      <!-- Hospital Profile Icon -->
      <svg v-else-if="actionType === 'hospital-profile'" class="w-5 h-5" :class="iconClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
      </svg>
    </div>
    <span class="text-sm font-medium text-gray-700">{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'QuickActionButton',
  props: {
    actionType: {
      type: String,
      required: true,
      validator: (value) => ['new-slot', 'new-test', 'new-scan', 'upload-report', 'admin-profile', 'new-admission', 'assign-staff', 'generate-report', 'icu-panel', 'hospital-profile'].includes(value)
    },
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClasses() {
      const baseClasses = []
      
      if (this.disabled) {
        baseClasses.push('opacity-50 cursor-not-allowed')
      } else {
        switch (this.actionType) {
          case 'new-slot':
            baseClasses.push('hover:border-yellow-500 hover:bg-yellow-50')
            break
          case 'new-test':
            baseClasses.push('hover:border-green-500 hover:bg-green-50')
            break
          case 'new-scan':
            baseClasses.push('hover:border-purple-500 hover:bg-purple-50')
            break
          case 'upload-report':
            baseClasses.push('hover:border-orange-500 hover:bg-orange-50')
            break
          case 'admin-profile':
            baseClasses.push('hover:border-purple-500 hover:bg-purple-50')
            break
          case 'new-admission':
            baseClasses.push('hover:border-blue-500 hover:bg-blue-50')
            break
          case 'assign-staff':
            baseClasses.push('hover:border-green-500 hover:bg-green-50')
            break
          case 'generate-report':
            baseClasses.push('hover:border-purple-500 hover:bg-purple-50')
            break
          case 'icu-panel':
            baseClasses.push('hover:border-red-500 hover:bg-red-50')
            break
          case 'hospital-profile':
            baseClasses.push('hover:border-blue-500 hover:bg-blue-50')
            break
        }
      }
      
      return baseClasses.join(' ')
    },
    iconContainerClasses() {
      switch (this.actionType) {
        case 'new-slot':
          return 'bg-yellow-100'
        case 'new-test':
          return 'bg-green-100'
        case 'new-scan':
          return 'bg-purple-100'
        case 'upload-report':
          return 'bg-orange-100'
        case 'admin-profile':
          return 'bg-purple-100'
        case 'new-admission':
          return 'bg-blue-100'
        case 'assign-staff':
          return 'bg-green-100'
        case 'generate-report':
          return 'bg-purple-100'
        case 'icu-panel':
          return 'bg-red-100'
        case 'hospital-profile':
          return 'bg-blue-100'
        default:
          return 'bg-gray-100'
      }
    },
    iconClasses() {
      switch (this.actionType) {
        case 'new-slot':
          return 'text-yellow-600'
        case 'new-test':
          return 'text-green-600'
        case 'new-scan':
          return 'text-purple-600'
        case 'upload-report':
          return 'text-orange-600'
        case 'admin-profile':
          return 'text-purple-600'
        case 'new-admission':
          return 'text-blue-600'
        case 'assign-staff':
          return 'text-green-600'
        case 'generate-report':
          return 'text-purple-600'
        case 'icu-panel':
          return 'text-red-600'
        case 'hospital-profile':
          return 'text-blue-600'
        default:
          return 'text-gray-600'
      }
    },

  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit('click', this.actionType)
      }
    }
  }
}
</script>

<style scoped>
/* Component specific styles */
</style>