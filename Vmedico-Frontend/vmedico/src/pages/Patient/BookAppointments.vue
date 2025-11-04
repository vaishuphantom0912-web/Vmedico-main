<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Left: Back to Dashboard -->
          <div class="flex items-center">
            <button 
              @click="goBackToDashboard"
              class="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <span class="material-symbols-rounded" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">arrow_back</span>
              <span class="font-semibold text-lg">Back to Dashboard</span>
            </button>
          </div>
          
          <!-- Center: Page Title -->
          <div class="text-center">
            <h1 class="text-xl font-bold text-gray-800">Book Doctor Appointments</h1>
            <p class="text-sm text-gray-600">Find the right doctor for your needs</p>
          </div>
          
          <!-- Right: Logout Button -->
          <div class="flex items-center gap-2">
            <button 
              @click="handleLogout"
              class="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <span class="material-symbols-rounded" style="font-variation-settings:'OPSZ' 20, 'wght' 600" aria-hidden="true">logout</span>
              <span class="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search Bar Section -->
      <div class="w-full md:w-2/3 lg:w-1/2 mx-auto mb-8">
        <div class="flex items-center bg-white shadow-md rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
          <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by doctor name or symptoms..."
            class="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <!-- Filter Tags (Optional) -->
      <div class="flex flex-wrap justify-center gap-3 mb-8">
        <button
          v-for="specialty in specialties"
          :key="specialty"
          @click="toggleSpecialtyFilter(specialty)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            selectedSpecialties.includes(specialty)
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm border border-gray-200'
          ]"
        >
          {{ specialty }}
        </button>
        <button
          v-if="selectedSpecialties.length > 0"
          @click="clearFilters"
          class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
        >
          Clear All
        </button>
      </div>

      <!-- Doctor List Section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="doctor in filteredDoctors"
          :key="doctor.id"
          class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ease-in-out p-6 border border-gray-100"
        >
          <!-- Doctor Profile -->
          <div class="flex items-center mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ doctor.name }}</h3>
              <p class="text-sm text-gray-600">{{ doctor.specialization }}</p>
            </div>
          </div>

          <!-- Doctor Details -->
          <div class="space-y-2 mb-6">
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              {{ doctor.hospital }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ doctor.experience }} Experience
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Rating: {{ doctor.rating }}/5
            </div>
            <div v-if="doctor.fee" class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
              ₹{{ doctor.fee }}/consultation
            </div>
          </div>

          <!-- Common Symptoms -->
          <div class="mb-6">
            <p class="text-xs text-gray-500 mb-2">Common symptoms:</p>
            <div class="flex flex-wrap gap-1">
              <span
                v-for="symptom in doctor.symptoms.slice(0, 3)"
                :key="symptom"
                class="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
              >
                {{ symptom }}
              </span>
              <span
                v-if="doctor.symptoms.length > 3"
                class="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full"
              >
                +{{ doctor.symptoms.length - 3 }} more
              </span>
            </div>
          </div>

          <!-- Book Appointment Button -->
          <button
            @click="bookAppointment(doctor)"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg shadow-md transition-all duration-200 ease-in-out font-medium"
          >
            Book Appointment
          </button>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredDoctors.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h8a2 2 0 012 2z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
        <p class="text-gray-600">Try adjusting your search or filter criteria.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'BookAppointments',
  setup() {
    const router = useRouter()
    const searchQuery = ref('')
    const selectedSpecialties = ref([])

    const doctors = ref([
      {
        id: 1,
        name: "Dr. Sarah Wilson",
        specialization: "Cardiology",
        hospital: "Apollo Hospital",
        experience: "10 Years",
        rating: 4.8,
        fee: 800,
        symptoms: ["heart pain", "chest discomfort", "palpitations", "shortness of breath"]
      },
      {
        id: 2,
        name: "Dr. Rahul Menon",
        specialization: "Dermatology",
        hospital: "Fortis Healthcare",
        experience: "8 Years",
        rating: 4.6,
        fee: 600,
        symptoms: ["rashes", "acne", "skin allergy", "eczema", "psoriasis"]
      },
      {
        id: 3,
        name: "Dr. Meena Kapoor",
        specialization: "Neurology",
        hospital: "Max Super Speciality Hospital",
        experience: "12 Years",
        rating: 4.9,
        fee: 1000,
        symptoms: ["headache", "dizziness", "memory loss", "seizures", "migraine"]
      },
      {
        id: 4,
        name: "Dr. Karan Shah",
        specialization: "Orthopedics",
        hospital: "Manipal Hospital",
        experience: "9 Years",
        rating: 4.7,
        fee: 750,
        symptoms: ["joint pain", "bone fracture", "back pain", "arthritis"]
      },
      {
        id: 5,
        name: "Dr. Priya Nair",
        specialization: "Gynecology",
        hospital: "Cloudnine Hospital",
        experience: "11 Years",
        rating: 4.8,
        fee: 700,
        symptoms: ["pregnancy", "women health", "menstrual issues", "fertility"]
      },
      {
        id: 6,
        name: "Dr. Amit Kumar",
        specialization: "Pediatrics",
        hospital: "Rainbow Children's Hospital",
        experience: "7 Years",
        rating: 4.5,
        fee: 500,
        symptoms: ["child fever", "vaccination", "growth issues", "child development"]
      },
      {
        id: 7,
        name: "Dr. Ravi Sharma",
        specialization: "General Medicine",
        hospital: "AIIMS Hospital",
        experience: "15 Years",
        rating: 4.6,
        fee: 400,
        symptoms: ["fever", "cough", "cold", "diabetes", "hypertension"]
      },
      {
        id: 8,
        name: "Dr. Anjali Patel",
        specialization: "Ophthalmology",
        hospital: "Sankara Nethralaya",
        experience: "6 Years",
        rating: 4.4,
        fee: 650,
        symptoms: ["eye pain", "vision problems", "cataract", "glaucoma"]
      }
    ])

    const specialties = computed(() => {
      return [...new Set(doctors.value.map(doctor => doctor.specialization))]
    })

    const filteredDoctors = computed(() => {
      let filtered = doctors.value

      // Filter by search query
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()
        filtered = filtered.filter(doctor => {
          const nameMatch = doctor.name.toLowerCase().includes(query)
          const specializationMatch = doctor.specialization.toLowerCase().includes(query)
          const symptomMatch = doctor.symptoms.some(symptom => 
            symptom.toLowerCase().includes(query)
          )
          return nameMatch || specializationMatch || symptomMatch
        })
      }

      // Filter by selected specialties
      if (selectedSpecialties.value.length > 0) {
        filtered = filtered.filter(doctor => 
          selectedSpecialties.value.includes(doctor.specialization)
        )
      }

      return filtered
    })

    const toggleSpecialtyFilter = (specialty) => {
      const index = selectedSpecialties.value.indexOf(specialty)
      if (index > -1) {
        selectedSpecialties.value.splice(index, 1)
      } else {
        selectedSpecialties.value.push(specialty)
      }
    }

    const clearFilters = () => {
      selectedSpecialties.value = []
      searchQuery.value = ''
    }

    const bookAppointment = (doctor) => {
      // Navigate to booking slots page with doctor data
      const doctorParam = encodeURIComponent(JSON.stringify(doctor))
      router.push(`/patient/booking-slots/${doctorParam}`)
    }

    const goBackToDashboard = () => {
      router.push('/patient-dashboard')
    }

    const handleLogout = () => {
      // Clear any stored user data/tokens
      localStorage.removeItem('userToken')
      localStorage.removeItem('patientData')
      localStorage.removeItem('userSession')
      
      // Redirect to login page
      router.push('/login')
    }

    return {
      searchQuery,
      selectedSpecialties,
      doctors,
      specialties,
      filteredDoctors,
      toggleSpecialtyFilter,
      clearFilters,
      bookAppointment,
      goBackToDashboard,
      handleLogout
    }
  }
}
</script>