<template>
  <div class="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-2">
          <div :class="iconBackgroundClass" class="p-2 rounded-lg">
            <component :is="iconComponent" :class="iconClass" />
          </div>
          <div>
            <h4 class="font-semibold text-gray-800">{{ appointmentTitle }}</h4>
            <p class="text-sm text-gray-600">{{ appointmentSubtitle }}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div class="flex items-center gap-1">
            <span class="material-symbols-rounded text-sm" style="font-variation-settings:'OPSZ' 20, 'wght' 600" aria-hidden="true">schedule</span>
            <span>{{ appointment.time }}</span>
          </div>
          <span :class="statusClass" class="px-2 py-1 rounded-full text-xs font-medium">
            {{ appointment.status }}
          </span>
        </div>
      </div>
      
      <button
        @click="handleViewDetails"
        class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
      >
        <span class="material-symbols-rounded" style="font-variation-settings:'OPSZ' 20, 'wght' 600" aria-hidden="true">visibility</span>
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

// Icon Components
const DoctorIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
    </svg>
  `
}

const LabIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
    </svg>
  `
}

const AppointmentIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
    </svg>
  `
}

export default {
  name: 'AppointmentCard',
  components: {
    DoctorIcon,
    LabIcon,
    AppointmentIcon
  },
  props: {
    appointment: {
      type: Object,
      required: true
    }
  },
  emits: ['view-details'],
  setup(props, { emit }) {
    const appointmentTitle = computed(() => {
      if (props.appointment.type === 'doctor') {
        return props.appointment.doctor || 'Doctor Appointment'
      } else if (props.appointment.type === 'lab') {
        return props.appointment.service || 'Lab Test'
      }
      return 'Appointment'
    })

    const appointmentSubtitle = computed(() => {
      if (props.appointment.type === 'doctor') {
        return props.appointment.specialty || 'Medical Consultation'
      } else if (props.appointment.type === 'lab') {
        return 'Laboratory Test'
      }
      return 'Healthcare Service'
    })

    const iconComponent = computed(() => {
      if (props.appointment.type === 'doctor') {
        return 'DoctorIcon'
      } else if (props.appointment.type === 'lab') {
        return 'LabIcon'
      }
      return 'AppointmentIcon'
    })

    const iconClass = computed(() => {
      if (props.appointment.type === 'doctor') {
        return 'w-5 h-5 text-blue-600'
      } else if (props.appointment.type === 'lab') {
        return 'w-5 h-5 text-green-600'
      }
      return 'w-5 h-5 text-gray-600'
    })

    const iconBackgroundClass = computed(() => {
      if (props.appointment.type === 'doctor') {
        return 'bg-blue-100'
      } else if (props.appointment.type === 'lab') {
        return 'bg-green-100'
      }
      return 'bg-gray-100'
    })

    const statusClass = computed(() => {
      const status = props.appointment.status?.toLowerCase()
      switch (status) {
        case 'confirmed':
          return 'bg-green-100 text-green-800'
        case 'scheduled':
          return 'bg-blue-100 text-blue-800'
        case 'pending':
          return 'bg-yellow-100 text-yellow-800'
        case 'cancelled':
          return 'bg-red-100 text-red-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    })

    const handleViewDetails = () => {
      emit('view-details', props.appointment)
    }

    return {
      appointmentTitle,
      appointmentSubtitle,
      iconComponent,
      iconClass,
      iconBackgroundClass,
      statusClass,
      handleViewDetails
    }
  }
}
</script>
