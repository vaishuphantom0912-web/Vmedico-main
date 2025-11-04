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
            <h1 class="text-xl font-bold text-gray-800">Select Lab</h1>
            <p class="text-sm text-gray-600">Choose a trusted lab partner for your tests</p>
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
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search Bar Section -->
      <div class="w-full md:w-2/3 lg:w-1/2 mx-auto mb-8">
        <div class="flex items-center bg-white shadow-md rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
          <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by lab name or location..."
            class="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <!-- Filter by Location -->
      <div class="flex flex-wrap justify-center gap-3 mb-8">
        <button
          v-for="location in locations"
          :key="location"
          @click="toggleLocationFilter(location)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            selectedLocations.includes(location)
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm border border-gray-200'
          ]"
        >
          {{ location }}
        </button>
        <button
          v-if="selectedLocations.length > 0"
          @click="clearFilters"
          class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
        >
          Clear All
        </button>
      </div>

      <!-- Labs Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="lab in filteredLabs"
          :key="lab.id"
          class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ease-in-out p-6 border border-gray-100"
        >
          <!-- Lab Logo/Icon -->
          <div class="flex items-center mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mr-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ lab.name }}</h3>
              <p class="text-sm text-gray-600">{{ lab.type }}</p>
            </div>
          </div>

          <!-- Lab Details -->
          <div class="space-y-2 mb-6">
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {{ lab.location }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ lab.timing }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Rating: {{ lab.rating }}/5 ({{ lab.reviews }} reviews)
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              {{ lab.reportTime }} report delivery
            </div>
          </div>

          <!-- Services -->
          <div class="mb-6">
            <p class="text-xs text-gray-500 mb-2">Popular services:</p>
            <div class="flex flex-wrap gap-1">
              <span
                v-for="service in lab.services.slice(0, 3)"
                :key="service"
                class="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
              >
                {{ service }}
              </span>
              <span
                v-if="lab.services.length > 3"
                class="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full"
              >
                +{{ lab.services.length - 3 }} more
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <button
              @click="selectLab(lab)"
              class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg shadow-md transition-all duration-200 ease-in-out font-medium"
            >
              Select Lab & Browse Tests
            </button>
            <button
              @click="viewLabDetails(lab)"
              class="w-full text-green-600 hover:text-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              View Lab Details
            </button>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredLabs.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No labs found</h3>
        <p class="text-gray-600">Try adjusting your search or filter criteria.</p>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LabSelection',
  setup() {
    const router = useRouter()
    const searchQuery = ref('')
    const selectedLocations = ref([])

    const labs = ref([
      {
        id: 1,
        name: "PathLab Diagnostics",
        type: "Full Service Lab",
        location: "Koramangala, Bangalore",
        timing: "6:00 AM - 10:00 PM",
        rating: 4.8,
        reviews: 2450,
        reportTime: "Same day",
        services: ["Blood Tests", "Radiology", "Pathology", "Cardiology", "Neurology"]
      },
      {
        id: 2,
        name: "Dr. Lal PathLabs",
        type: "Diagnostic Center",
        location: "Indiranagar, Bangalore",
        timing: "7:00 AM - 9:00 PM",
        rating: 4.7,
        reviews: 1890,
        reportTime: "24 hours",
        services: ["Clinical Pathology", "Biochemistry", "Microbiology", "Immunology"]
      },
      {
        id: 3,
        name: "SRL Diagnostics",
        type: "Multi-Specialty Lab",
        location: "Whitefield, Bangalore",
        timing: "6:30 AM - 9:30 PM",
        rating: 4.6,
        reviews: 3200,
        reportTime: "Same day",
        services: ["Molecular Diagnostics", "Genetics", "Oncology", "Infectious Disease"]
      },
      {
        id: 4,
        name: "Metropolis Healthcare",
        type: "Advanced Diagnostics",
        location: "HSR Layout, Bangalore",
        timing: "7:00 AM - 8:00 PM",
        rating: 4.9,
        reviews: 1650,
        reportTime: "6-8 hours",
        services: ["Preventive Health", "Women's Health", "Diabetes Care", "Cardiac Care"]
      },
      {
        id: 5,
        name: "Thyrocare Technologies",
        type: "Specialized Lab",
        location: "Electronic City, Bangalore",
        timing: "8:00 AM - 6:00 PM",
        rating: 4.5,
        reviews: 980,
        reportTime: "24 hours",
        services: ["Thyroid Tests", "Diabetes Panel", "Lipid Profile", "Liver Function"]
      },
      {
        id: 6,
        name: "Quest Diagnostics",
        type: "International Lab",
        location: "MG Road, Bangalore",
        timing: "6:00 AM - 11:00 PM",
        rating: 4.8,
        reviews: 2100,
        reportTime: "Same day",
        services: ["Advanced Imaging", "Genetic Testing", "Allergy Testing", "Cancer Screening"]
      },
      {
        id: 7,
        name: "Vijaya Diagnostic Centre",
        type: "Regional Lab Chain",
        location: "Jayanagar, Bangalore",
        timing: "7:30 AM - 9:00 PM",
        rating: 4.4,
        reviews: 1320,
        reportTime: "12-24 hours",
        services: ["Routine Tests", "Health Packages", "Corporate Health", "Home Collection"]
      },
      {
        id: 8,
        name: "Narayana Diagnostics",
        type: "Hospital Lab",
        location: "Bommanahalli, Bangalore",
        timing: "24/7 Available",
        rating: 4.7,
        reviews: 1750,
        reportTime: "4-6 hours",
        services: ["Emergency Tests", "Critical Care", "Pediatric Tests", "Geriatric Care"]
      }
    ])

    const locations = computed(() => {
      return [...new Set(labs.value.map(lab => lab.location.split(', ')[0]))]
    })

    const filteredLabs = computed(() => {
      let filtered = labs.value

      // Filter by search query
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()
        filtered = filtered.filter(lab => {
          const nameMatch = lab.name.toLowerCase().includes(query)
          const locationMatch = lab.location.toLowerCase().includes(query)
          const typeMatch = lab.type.toLowerCase().includes(query)
          const serviceMatch = lab.services.some(service => 
            service.toLowerCase().includes(query)
          )
          return nameMatch || locationMatch || typeMatch || serviceMatch
        })
      }

      // Filter by selected locations
      if (selectedLocations.value.length > 0) {
        filtered = filtered.filter(lab => 
          selectedLocations.value.some(location => 
            lab.location.includes(location)
          )
        )
      }

      return filtered
    })

    const toggleLocationFilter = (location) => {
      const index = selectedLocations.value.indexOf(location)
      if (index > -1) {
        selectedLocations.value.splice(index, 1)
      } else {
        selectedLocations.value.push(location)
      }
    }

    const clearFilters = () => {
      selectedLocations.value = []
      searchQuery.value = ''
    }

    const selectLab = (lab) => {
      // Store selected lab in localStorage for the BookLabTests page
      localStorage.setItem('selectedLab', JSON.stringify(lab))
      
      // Navigate to BookLabTests page
      router.push('/patient/book-lab-tests')
    }

    const viewLabDetails = (lab) => {
      const details = `
Lab Details:
${lab.name}
${lab.type}

Location: ${lab.location}
Timing: ${lab.timing}
Rating: ${lab.rating}/5 (${lab.reviews} reviews)
Report Delivery: ${lab.reportTime}

Services: ${lab.services.join(', ')}
      `
      alert(details)
    }

    const goBackToDashboard = () => {
      router.push('/patient-dashboard')
    }

    const handleLogout = () => {
      // Clear any stored user data/tokens
      localStorage.removeItem('userToken')
      localStorage.removeItem('patientData')
      localStorage.removeItem('userSession')
      localStorage.removeItem('selectedLab')
      
      // Redirect to login page
      router.push('/login')
    }

    return {
      searchQuery,
      selectedLocations,
      labs,
      locations,
      filteredLabs,
      toggleLocationFilter,
      clearFilters,
      selectLab,
      viewLabDetails,
      goBackToDashboard,
      handleLogout
    }
  }
}
</script>

<style scoped>
/* Smooth transitions for all interactive elements */
.transition-colors {
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
}

.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}

/* Material Design elevation on hover */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>