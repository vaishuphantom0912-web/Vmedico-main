<template>
  <Card title="Appointment Calendar" padding="p-4">
    <!-- Calendar Navigation Header -->
    <div class="flex items-center justify-between mb-4">
      <button 
        @click="previousMonth"
        class="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        title="Previous Month"
      >
        <ChevronLeftIcon class="w-5 h-5 text-gray-600" />
      </button>
      
      <h3 class="text-lg font-semibold text-gray-800">
        {{ currentMonthName }} {{ currentYear }}
      </h3>
      
      <button 
        @click="nextMonth"
        class="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        title="Next Month"
      >
        <ChevronRightIcon class="w-5 h-5 text-gray-600" />
      </button>
    </div>

    <!-- Single Month Calendar Container -->
    <div class="space-y-4">
      <!-- Current Month Calendar -->
      <div class="border border-gray-200 rounded-lg p-4 bg-white">
        <!-- Month Appointments Count -->
        <div v-if="currentMonthAppointments.length > 0" class="flex justify-end mb-3">
          <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            {{ currentMonthAppointments.length }} appointment{{ currentMonthAppointments.length > 1 ? 's' : '' }}
          </span>
        </div>

        <!-- Day Headers -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div 
            v-for="day in dayHeaders" 
            :key="day"
            class="text-center text-xs font-medium text-gray-500 py-1"
          >
            {{ day }}
          </div>
        </div>

        <!-- Calendar Days for current month -->
        <div class="grid grid-cols-7 gap-1">
          <div
            v-for="date in currentMonthDays"
            :key="date.key"
            :class="[
              'relative h-10 flex items-center justify-center text-sm cursor-pointer rounded transition-colors duration-200',
              date.isCurrentMonth ? 'text-gray-900 hover:bg-blue-50' : 'text-gray-300',
              date.isToday ? 'bg-blue-600 text-white font-semibold' : '',
              date.hasAppointment ? 'bg-green-100 text-green-800 font-medium' : '',
              date.isSelected ? 'bg-blue-100 text-blue-800' : ''
            ]"
            @click="selectDate(date)"
          >
            {{ date.day }}
            
            <!-- Appointment Indicator -->
            <div 
              v-if="date.hasAppointment && !date.isToday"
              class="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full"
            ></div>
          </div>
        </div>

        <!-- Current Month Appointments Summary -->
        <div v-if="currentMonthAppointments.length > 0" class="mt-4 pt-4 border-t border-gray-200">
          <h4 class="text-sm font-medium text-gray-800 mb-3">This Month's Appointments</h4>
          <div class="space-y-2">
            <div 
              v-for="appointment in currentMonthAppointments"
              :key="appointment.id"
              class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-xs"
            >
              <div :class="appointment.type === 'doctor' ? 'w-2 h-2 bg-blue-500 rounded-full' : 'w-2 h-2 bg-green-500 rounded-full'"></div>
              <div class="flex-1">
                <p class="font-medium text-gray-800">{{ appointment.doctor || appointment.service }}</p>
                <p class="text-gray-500">{{ formatAppointmentDate(appointment.date) }} at {{ appointment.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Selected Date Appointments -->
    <div v-if="selectedDateAppointments.length > 0" class="mt-4 pt-4 border-t border-gray-200">
      <h4 class="text-sm font-medium text-gray-800 mb-2">
        Appointments on {{ formatSelectedDate }}
      </h4>
      <div class="space-y-2">
        <div 
          v-for="appointment in selectedDateAppointments"
          :key="appointment.id"
          class="flex items-center gap-2 p-2 bg-blue-50 rounded-lg"
        >
          <div :class="appointment.type === 'doctor' ? 'w-2 h-2 bg-blue-500 rounded-full' : 'w-2 h-2 bg-green-500 rounded-full'"></div>
          <div class="flex-1">
            <p class="text-sm font-medium text-blue-900">{{ appointment.doctor || appointment.service }}</p>
            <p class="text-xs text-blue-600">{{ appointment.time }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Today's Appointments -->
    <div v-if="todayAppointments.length > 0" class="mt-4 pt-4 border-t border-gray-200">
      <h4 class="text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
        Today's Appointments
      </h4>
      <div class="space-y-2">
        <div 
          v-for="appointment in todayAppointments"
          :key="appointment.id"
          class="flex items-center gap-2 p-2 bg-green-50 rounded-lg"
        >
          <div :class="appointment.type === 'doctor' ? 'w-2 h-2 bg-blue-500 rounded-full' : 'w-2 h-2 bg-green-500 rounded-full'"></div>
          <div class="flex-1">
            <p class="text-sm font-medium text-green-900">{{ appointment.doctor || appointment.service }}</p>
            <p class="text-xs text-green-600">{{ appointment.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import Card from './base/Card.vue'

// Icon Components
const ChevronLeftIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>
  `
}

const ChevronRightIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>
  `
}

export default {
  name: 'AppointmentCalendar',
  components: {
    Card,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  props: {
    appointments: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const today = new Date()
    const currentMonth = ref(today.getMonth())
    const currentYear = ref(today.getFullYear())
    const selectedDate = ref(null)
    
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
    const currentMonthName = computed(() => {
      return new Date(currentYear.value, currentMonth.value, 1).toLocaleDateString('en-US', { month: 'long' })
    })
    
    const formatSelectedDate = computed(() => {
      if (!selectedDate.value) return ''
      return selectedDate.value.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      })
    })

    // Sample appointments with dates
    const sampleAppointments = [
      {
        id: 'apt-1',
        doctor: 'Dr. Sarah Wilson',
        specialty: 'Cardiology',
        time: '2:00 PM',
        date: new Date(2024, 11, 20), // December 20, 2024
        status: 'Confirmed',
        type: 'doctor'
      },
      {
        id: 'apt-2',
        service: 'Lab Test - Blood Work',
        time: '9:00 AM',
        date: new Date(2024, 11, 22), // December 22, 2024
        status: 'Scheduled',
        type: 'lab'
      },
      {
        id: 'apt-3',
        doctor: 'Dr. Michael Chen',
        specialty: 'General Medicine',
        time: '11:30 AM',
        date: new Date(), // Today
        status: 'Confirmed',
        type: 'doctor'
      }
    ]

    const allAppointments = computed(() => {
      return props.appointments.length > 0 ? props.appointments : sampleAppointments
    })

    const currentMonthDays = computed(() => {
      const year = currentYear.value
      const month = currentMonth.value
      const today = new Date()
      
      // First day of the month
      const firstDay = new Date(year, month, 1)
      
      // Start from the first Sunday of the calendar
      const startDate = new Date(firstDay)
      startDate.setDate(startDate.getDate() - firstDay.getDay())
      
      const days = []
      
      // Generate 42 days (6 weeks) for this month
      for (let i = 0; i < 42; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)
        
        const isCurrentMonth = date.getMonth() === month
        const isToday = date.toDateString() === today.toDateString()
        const hasAppointment = allAppointments.value.some(apt => 
          apt.date && apt.date.toDateString() === date.toDateString()
        )
        
        days.push({
          key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
          day: date.getDate(),
          date: new Date(date),
          isCurrentMonth,
          isToday,
          hasAppointment,
          isSelected: selectedDate.value && selectedDate.value.toDateString() === date.toDateString()
        })
      }
      
      return days
    })

    const currentMonthAppointments = computed(() => {
      return allAppointments.value.filter(apt => 
        apt.date && 
        apt.date.getFullYear() === currentYear.value && 
        apt.date.getMonth() === currentMonth.value
      )
    })

    const selectedDateAppointments = computed(() => {
      if (!selectedDate.value) return []
      return allAppointments.value.filter(apt => 
        apt.date && apt.date.toDateString() === selectedDate.value.toDateString()
      )
    })

    const todayAppointments = computed(() => {
      const today = new Date()
      return allAppointments.value.filter(apt => 
        apt.date && apt.date.toDateString() === today.toDateString()
      )
    })

    const previousMonth = () => {
      if (currentMonth.value === 0) {
        currentMonth.value = 11
        currentYear.value -= 1
      } else {
        currentMonth.value -= 1
      }
    }

    const nextMonth = () => {
      if (currentMonth.value === 11) {
        currentMonth.value = 0
        currentYear.value += 1
      } else {
        currentMonth.value += 1
      }
    }

    const formatAppointmentDate = (date) => {
      if (!date) return 'Date not set'
      
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      
      if (date.toDateString() === today.toDateString()) {
        return 'Today'
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow'
      } else {
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric'
        })
      }
    }

    const selectDate = (dateObj) => {
      if (dateObj.isCurrentMonth) {
        selectedDate.value = dateObj.date
      }
    }

    // Set today as selected date on mount
    onMounted(() => {
      selectedDate.value = new Date()
    })

    return {
      currentMonth,
      currentYear,
      currentMonthName,
      selectedDate,
      dayHeaders,
      formatSelectedDate,
      currentMonthDays,
      currentMonthAppointments,
      selectedDateAppointments,
      todayAppointments,
      previousMonth,
      nextMonth,
      selectDate,
      formatAppointmentDate
    }
  }
}
</script>

<style scoped>
/* Calendar specific styles */
.grid {
  display: grid;
}

.grid-cols-7 {
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

/* Hover effects */
.hover\:bg-gray-100:hover {
  background-color: rgb(243 244 246);
}

.hover\:bg-blue-50:hover {
  background-color: rgb(239 246 255);
}

/* Transition effects */
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>