<template>
  <Card title="Medication Reminders" padding="p-4">
    <div class="space-y-3">
      <div 
        v-for="medication in medications" 
        :key="medication.id"
        class="p-3 rounded-lg border-l-4"
        :class="[medication.borderClass, medication.backgroundClass]"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <component :is="medication.icon" :class="medication.iconClass" />
              <h4 class="font-semibold text-gray-800">{{ medication.name }}</h4>
              <span 
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                :class="medication.dosageClass"
              >
                {{ medication.dosage }}
              </span>
            </div>
            
            <p class="text-sm text-gray-600 mb-2">{{ medication.instruction }}</p>
            
            <div class="flex items-center gap-2">
              <ClockIcon class="w-4 h-4 text-gray-500" />
              <span class="text-sm text-gray-700">{{ medication.time }}</span>
              <span 
                v-if="medication.status"
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ml-auto"
                :class="medication.statusClass"
              >
                {{ medication.status }}
              </span>
            </div>
          </div>
          
          <button
            v-if="medication.status === 'Pending'"
            @click="handleMarkTaken(medication)"
            class="p-1.5 rounded-lg hover:bg-green-100 transition-colors duration-200"
            title="Mark as taken"
          >
            <CheckIcon class="w-4 h-4 text-green-600" />
          </button>
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
        Manage Medications
      </Button>
    </div>
  </Card>
</template>

<script>
import { computed } from 'vue'
import Card from './base/Card.vue'
import Button from './base/Button.vue'

// Icon Components
const HeartIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
    </svg>
  `
}

const SunIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
    </svg>
  `
}

const ClockIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  `
}

const CheckIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
  `
}

export default {
  name: 'MedicationReminders',
  components: {
    Card,
    Button,
    HeartIcon,
    SunIcon,
    ClockIcon,
    CheckIcon
  },
  props: {
    medications: {
      type: Array,
      default: () => []
    }
  },
  emits: ['mark-taken', 'view-all'],
  setup(props, { emit }) {
    const defaultMedications = [
      {
        id: 'aspirin-1',
        name: 'Aspirin',
        dosage: '75mg',
        instruction: 'Take after breakfast',
        time: '8:00 AM',
        status: 'Pending',
        icon: HeartIcon,
        iconClass: 'w-5 h-5 text-red-600',
        borderClass: 'border-red-500',
        backgroundClass: 'bg-red-50',
        dosageClass: 'bg-red-100 text-red-800',
        statusClass: 'bg-yellow-100 text-yellow-800'
      },
      {
        id: 'vitamin-d-1',
        name: 'Vitamin D',
        dosage: '1000 IU',
        instruction: 'Take with lunch',
        time: '12:00 PM',
        status: 'Pending',
        icon: SunIcon,
        iconClass: 'w-5 h-5 text-yellow-600',
        borderClass: 'border-yellow-500',
        backgroundClass: 'bg-yellow-50',
        dosageClass: 'bg-yellow-100 text-yellow-800',
        statusClass: 'bg-yellow-100 text-yellow-800'
      },
      {
        id: 'metformin-1',
        name: 'Metformin',
        dosage: '500mg',
        instruction: 'Take with dinner',
        time: '7:00 PM',
        status: 'Taken',
        icon: HeartIcon,
        iconClass: 'w-5 h-5 text-blue-600',
        borderClass: 'border-blue-500',
        backgroundClass: 'bg-blue-50',
        dosageClass: 'bg-blue-100 text-blue-800',
        statusClass: 'bg-green-100 text-green-800'
      }
    ]

    const medications = computed(() => {
      return props.medications.length > 0 ? props.medications : defaultMedications
    })

    const handleMarkTaken = (medication) => {
      emit('mark-taken', medication)
      // TODO: Implement API call to mark medication as taken
      console.log(`Marking ${medication.name} as taken...`)
    }

    const handleViewAll = () => {
      emit('view-all')
    }

    return {
      medications,
      handleMarkTaken,
      handleViewAll
    }
  }
}
</script>
