<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <button 
            @click="goBack"
            class="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back
          </button>
          <div class="text-center">
            <h1 class="text-2xl font-bold text-gray-900">{{ isLabTest ? 'Book Lab Appointment' : 'Book Appointment' }}</h1>
            <p class="text-sm text-gray-600 mt-1">{{ selectedDoctor?.name }} - {{ selectedDoctor?.specialization }}</p>
          </div>
          <div class="w-16"></div> <!-- Spacer for centering -->
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Select Date Section -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div class="flex items-center mb-6">
          <svg class="w-6 h-6 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <h2 class="text-xl font-semibold text-gray-900">Select Date</h2>
        </div>

        <!-- Calendar -->
        <div class="bg-gray-50 rounded-lg p-6">
          <!-- Calendar Header -->
          <div class="flex items-center justify-between mb-6">
            <button 
              @click="previousMonth"
              class="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h3 class="text-lg font-semibold text-gray-900">{{ currentMonthYear }}</h3>
            <button 
              @click="nextMonth"
              class="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-2 mb-4">
            <!-- Day Headers -->
            <div v-for="day in dayHeaders" :key="day" class="text-center text-sm font-medium text-gray-500 py-2">
              {{ day }}
            </div>
            
            <!-- Calendar Days -->
            <button
              v-for="date in calendarDays"
              :key="date.key"
              @click="selectDate(date)"
              :disabled="!date.isCurrentMonth || date.isPast"
              :class="[
                'h-12 w-12 rounded-lg text-sm font-medium transition-all duration-200',
                date.isSelected 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : date.isCurrentMonth && !date.isPast
                    ? 'text-gray-900 hover:bg-blue-50 hover:text-blue-600'
                    : 'text-gray-300 cursor-not-allowed',
                date.isToday && !date.isSelected ? 'bg-gray-200' : ''
              ]"
            >
              {{ date.day }}
            </button>
          </div>
        </div>
      </div>

      <!-- Select Time Slot Section -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div class="flex items-center mb-6">
          <svg class="w-6 h-6 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 class="text-xl font-semibold text-gray-900">Select Time Slot</h2>
        </div>

        <div v-if="selectedDate" class="space-y-4">
          <p class="text-sm text-gray-600 mb-4">Available slots for {{ formatSelectedDate }}</p>
          
          <!-- Time Slots Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <button
              v-for="slot in availableTimeSlots"
              :key="slot.id"
              @click="selectTimeSlot(slot)"
              :disabled="!slot.available"
              :class="[
                'p-3 rounded-lg text-sm font-medium transition-all duration-200 border',
                slot.id === selectedTimeSlot?.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : slot.available
                    ? 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              ]"
            >
              {{ slot.time }}
            </button>
          </div>
        </div>
        
        <div v-else class="text-center py-8">
          <p class="text-gray-500">Please select a date first</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4">
        <button
          @click="cancelBooking"
          class="flex-1 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="confirmBooking"
          :disabled="!selectedDate || !selectedTimeSlot"
          :class="[
            'flex-1 px-6 py-3 rounded-lg font-medium transition-colors',
            selectedDate && selectedTimeSlot
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'BookingSlots',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const selectedDoctor = ref(null)
    const currentDate = ref(new Date())
    const selectedDate = ref(null)
    const selectedTimeSlot = ref(null)
    const isLabTest = ref(false)

    const dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    // Sample time slots
    const timeSlots = [
      { id: 1, time: '09:00 AM - 10:00 AM', available: true },
      { id: 2, time: '10:00 AM - 11:00 AM', available: true },
      { id: 3, time: '11:00 AM - 12:00 PM', available: true },
      { id: 4, time: '12:00 PM - 01:00 PM', available: true },
      { id: 5, time: '02:00 PM - 03:00 PM', available: true },
      { id: 6, time: '03:00 PM - 04:00 PM', available: true },
      { id: 7, time: '04:00 PM - 05:00 PM', available: true },
      { id: 8, time: '05:00 PM - 06:00 PM', available: true }
    ]

    const currentMonthYear = computed(() => {
      return currentDate.value.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      })
    })

    const formatSelectedDate = computed(() => {
      if (!selectedDate.value) return ''
      return selectedDate.value.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    })

    const calendarDays = computed(() => {
      const year = currentDate.value.getFullYear()
      const month = currentDate.value.getMonth()
      const today = new Date()
      
      // First day of the month
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      
      // Days from previous month to fill the grid
      const startDate = new Date(firstDay)
      startDate.setDate(startDate.getDate() - firstDay.getDay())
      
      const days = []
      const current = new Date(startDate)
      
      // Generate 42 days (6 weeks)
      for (let i = 0; i < 42; i++) {
        const date = new Date(current)
        const isCurrentMonth = date.getMonth() === month
        const isPast = date < today.setHours(0, 0, 0, 0)
        const isToday = date.toDateString() === today.toDateString()
        const isSelected = selectedDate.value && date.toDateString() === selectedDate.value.toDateString()
        
        days.push({
          key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
          day: date.getDate(),
          date: new Date(date),
          isCurrentMonth,
          isPast,
          isToday,
          isSelected
        })
        
        current.setDate(current.getDate() + 1)
      }
      
      return days
    })

    const availableTimeSlots = computed(() => {
      // In a real app, this would filter based on selected date and doctor availability
      return timeSlots
    })

    const previousMonth = () => {
      currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
    }

    const nextMonth = () => {
      currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
    }

    const selectDate = (dateObj) => {
      if (!dateObj.isCurrentMonth || dateObj.isPast) return
      selectedDate.value = dateObj.date
      selectedTimeSlot.value = null // Reset time slot when date changes
    }

    const selectTimeSlot = (slot) => {
      if (!slot.available) return
      selectedTimeSlot.value = slot
    }

    const goBack = () => {
      if (isLabTest.value) {
        router.push('/patient/book-lab-tests')
      } else {
        router.push('/patient/book-appointments')
      }
    }

    const cancelBooking = () => {
      if (isLabTest.value) {
        router.push('/patient/book-lab-tests')
      } else {
        router.push('/patient/book-appointments')
      }
    }

    const confirmBooking = () => {
      if (!selectedDate.value || !selectedTimeSlot.value) return
      
      // Create appointment object
      const appointmentData = {
        doctor: isLabTest.value ? null : selectedDoctor.value?.name,
        service: isLabTest.value ? selectedDoctor.value?.name : null,
        specialty: selectedDoctor.value?.specialization,
        time: selectedTimeSlot.value.time,
        date: selectedDate.value,
        status: 'Confirmed',
        type: isLabTest.value ? 'lab' : 'doctor'
      }
      
      // Save to localStorage for the dashboard to pick up
      localStorage.setItem('newAppointment', JSON.stringify(appointmentData))
      
      // Show confirmation
      alert(`Appointment booked with ${selectedDoctor.value?.name} on ${formatSelectedDate.value} at ${selectedTimeSlot.value.time}`)
      
      // Navigate back to dashboard
      router.push('/patient-dashboard')
    }

    onMounted(() => {
      // Get doctor or lab test data from route params
      const data = route.params.doctor ? JSON.parse(decodeURIComponent(route.params.doctor)) : null
      if (data) {
        if (data.type === 'lab-test') {
          // It's a lab test booking
          isLabTest.value = true
          selectedDoctor.value = {
            name: data.name,
            specialization: data.category
          }
        } else {
          // It's a doctor appointment
          isLabTest.value = false
          selectedDoctor.value = data
        }
      } else {
        // Fallback if no data
        isLabTest.value = false
        selectedDoctor.value = {
          name: 'Dr. Sarah Wilson',
          specialization: 'Cardiology'
        }
      }
    })

    return {
      selectedDoctor,
      currentDate,
      selectedDate,
      selectedTimeSlot,
      isLabTest,
      dayHeaders,
      currentMonthYear,
      formatSelectedDate,
      calendarDays,
      availableTimeSlots,
      previousMonth,
      nextMonth,
      selectDate,
      selectTimeSlot,
      goBack,
      cancelBooking,
      confirmBooking
    }
  }
}
</script>