<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Left: Back to Lab Selection -->
          <div class="flex items-center">
            <button 
              @click="goBackToLabSelection"
              class="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <span class="material-symbols-rounded" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">arrow_back</span>
              <span class="font-semibold text-lg">Back to Lab Selection</span>
            </button>
          </div>
          
          <!-- Center: Page Title -->
          <div class="text-center">
            <h1 class="text-xl font-bold text-gray-800">Book Lab Tests</h1>
            <p class="text-sm text-gray-600">Popular tests & scans with transparent pricing</p>
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

    <!-- Selected Lab Info -->
    <div v-if="selectedLab" class="bg-green-50 border-b border-green-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-green-800">{{ selectedLab.name }}</h3>
              <p class="text-sm text-green-600">{{ selectedLab.location }} • {{ selectedLab.reportTime }} report delivery</p>
            </div>
          </div>
          <button 
            @click="changeLabSelection"
            class="text-green-600 hover:text-green-700 text-sm font-medium transition-colors duration-200"
          >
            Change Lab
          </button>
        </div>
      </div>
    </div>

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
            placeholder="Search by test name or health category..."
            class="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <!-- Category Filter -->
      <div class="w-full md:w-1/3 mx-auto mb-8">
        <select
          v-model="selectedCategory"
          class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <!-- Lab Tests Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="test in filteredTests"
          :key="test.id"
          :class="[
            'bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ease-in-out p-6 border border-gray-100 relative',
            test.featured ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : '',
            selectedTests.includes(test.id) ? 'ring-2 ring-green-500 border-green-500' : ''
          ]"
        >
          <!-- Checkbox -->
          <div class="absolute top-4 right-4">
            <input
              type="checkbox"
              :id="`test-${test.id}`"
              :value="test.id"
              v-model="selectedTests"
              class="w-5 h-5 text-green-600 bg-white border-gray-300 rounded focus:ring-green-500 focus:ring-2"
            />
          </div>

          <!-- Test Icon -->
          <div class="flex justify-center mb-4">
            <div :class="[
              'w-16 h-16 rounded-full flex items-center justify-center',
              test.featured ? 'bg-white bg-opacity-20' : 'bg-gradient-to-br from-blue-100 to-blue-200'
            ]">
              <component :is="getTestIcon(test.icon)" :class="[
                'w-8 h-8',
                test.featured ? 'text-white' : 'text-blue-600'
              ]" />
            </div>
          </div>

          <!-- Test Info -->
          <div class="text-center mb-4">
            <h3 :class="[
              'text-lg font-semibold mb-2',
              test.featured ? 'text-white' : 'text-gray-900'
            ]">
              {{ test.name }}
            </h3>
            <p :class="[
              'text-sm mb-4',
              test.featured ? 'text-blue-100' : 'text-gray-600'
            ]">
              {{ test.description }}
            </p>
            <div :class="[
              'text-2xl font-bold mb-4',
              test.featured ? 'text-white' : 'text-green-600'
            ]">
              ₹{{ test.price }}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <button
              @click="toggleTestSelection(test.id)"
              :class="[
                'w-full px-4 py-3 rounded-lg font-medium transition-all duration-200',
                selectedTests.includes(test.id)
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : test.featured 
                    ? 'bg-white text-blue-600 hover:bg-gray-100' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
              ]"
            >
              {{ selectedTests.includes(test.id) ? 'Selected' : 'Select Test' }}
            </button>
            <button
              @click="viewDetails(test)"
              :class="[
                'w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                test.featured 
                  ? 'text-white hover:text-blue-100' 
                  : 'text-blue-600 hover:text-blue-700'
              ]"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredTests.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h8a2 2 0 012 2z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No tests found</h3>
        <p class="text-gray-600">Try adjusting your search or filter criteria.</p>
      </div>
    </div>

    <!-- Selected Tests Summary (Fixed Bottom) -->
    <div v-if="selectedTests.length > 0" class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <span class="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {{ selectedTests.length }} test{{ selectedTests.length > 1 ? 's' : '' }} selected
              </span>
              <span class="text-lg font-bold text-green-600">
                ₹{{ totalPrice }}
              </span>
            </div>
            <button
              @click="clearSelection"
              class="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-200"
            >
              Clear All
            </button>
          </div>
          <div class="flex items-center gap-3">
            <button
              @click="viewSelectedTests"
              class="px-4 py-2 text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
            >
              View Selected
            </button>
            <button
              @click="bookSelectedTests"
              class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Book Selected Tests
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, h } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'BookLabTests',
  setup() {
    const router = useRouter()
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const selectedLab = ref(null)
    const selectedTests = ref([])

    // Load selected lab from localStorage
    const loadSelectedLab = () => {
      const labData = localStorage.getItem('selectedLab')
      if (labData) {
        selectedLab.value = JSON.parse(labData)
      }
    }

    // Initialize selected lab
    loadSelectedLab()

    const labTests = ref([
      {
        id: 1,
        name: "Diabetes Screening",
        description: "Checks blood glucose and HbA1c levels.",
        price: 599,
        category: "Blood Tests",
        icon: "droplet",
        featured: false
      },
      {
        id: 2,
        name: "Thyroid Profile",
        description: "Measures T3, T4, and TSH hormone levels.",
        price: 850,
        category: "Hormone Tests",
        icon: "syringe",
        featured: false
      },
      {
        id: 3,
        name: "CT Scan",
        description: "High-resolution imaging scan for detailed diagnostics.",
        price: 2500,
        category: "Imaging",
        icon: "monitor",
        featured: false
      },
      {
        id: 4,
        name: "MRI Brain Scan",
        description: "Magnetic imaging for brain and nervous system.",
        price: 4500,
        category: "Imaging",
        icon: "brain",
        featured: false
      },
      {
        id: 5,
        name: "Fever Panel",
        description: "Identifies viral and bacterial fever sources.",
        price: 999,
        category: "Blood Tests",
        icon: "thermometer",
        featured: false
      },
      {
        id: 6,
        name: "Covid-19 RT-PCR",
        description: "Confirms COVID-19 infection with high accuracy.",
        price: 499,
        category: "Infectious Disease",
        icon: "virus",
        featured: false
      },
      {
        id: 7,
        name: "Blood Test",
        description: "Comprehensive blood profile for overall health check.",
        price: 699,
        category: "Blood Tests",
        icon: "droplet",
        featured: false
      },
      {
        id: 8,
        name: "Liver Function Test",
        description: "Analyzes liver enzymes and protein levels.",
        price: 899,
        category: "Blood Tests",
        icon: "liver",
        featured: false
      },
      {
        id: 9,
        name: "Kidney Function Test",
        description: "Evaluates kidney efficiency and waste filtration.",
        price: 999,
        category: "Blood Tests",
        icon: "kidney",
        featured: false
      },
      {
        id: 10,
        name: "Lipid Profile",
        description: "Measures cholesterol and triglyceride levels.",
        price: 750,
        category: "Blood Tests",
        icon: "heart",
        featured: false
      },
      {
        id: 11,
        name: "Complete Blood Count (CBC)",
        description: "Analyzes blood cells and detects disorders.",
        price: 450,
        category: "Blood Tests",
        icon: "droplet",
        featured: false
      },
      {
        id: 12,
        name: "Vitamin D Test",
        description: "Measures vitamin D levels in blood.",
        price: 800,
        category: "Vitamin Tests",
        icon: "sun",
        featured: false
      },
      {
        id: 13,
        name: "Vitamin B12 Test",
        description: "Checks B12 deficiency and nerve health.",
        price: 650,
        category: "Vitamin Tests",
        icon: "pill",
        featured: false
      },
      {
        id: 14,
        name: "X-Ray Chest",
        description: "Imaging for lung and chest conditions.",
        price: 350,
        category: "Imaging",
        icon: "lungs",
        featured: false
      },
      {
        id: 15,
        name: "Ultrasound Abdomen",
        description: "Abdominal organ imaging and assessment.",
        price: 1200,
        category: "Imaging",
        icon: "scan",
        featured: false
      },
      {
        id: 16,
        name: "ECG Test",
        description: "Heart rhythm and electrical activity analysis.",
        price: 300,
        category: "Cardiac Tests",
        icon: "heart-pulse",
        featured: false
      },
      {
        id: 17,
        name: "Echocardiogram",
        description: "Heart structure and function imaging.",
        price: 1800,
        category: "Cardiac Tests",
        icon: "heart",
        featured: false
      },
      {
        id: 18,
        name: "Allergy Panel",
        description: "Tests for common allergens and sensitivities.",
        price: 2200,
        category: "Allergy Tests",
        icon: "allergen",
        featured: false
      }
    ])

    const categories = computed(() => {
      return [...new Set(labTests.value.map(test => test.category))]
    })

    const filteredTests = computed(() => {
      let filtered = labTests.value

      // Filter by search query
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()
        filtered = filtered.filter(test => {
          const nameMatch = test.name.toLowerCase().includes(query)
          const descriptionMatch = test.description.toLowerCase().includes(query)
          const categoryMatch = test.category.toLowerCase().includes(query)
          return nameMatch || descriptionMatch || categoryMatch
        })
      }

      // Filter by selected category
      if (selectedCategory.value) {
        filtered = filtered.filter(test => test.category === selectedCategory.value)
      }

      return filtered
    })

    const totalPrice = computed(() => {
      return selectedTests.value.reduce((total, testId) => {
        const test = labTests.value.find(t => t.id === testId)
        return total + (test ? test.price : 0)
      }, 0)
    })

    const getTestIcon = (iconName) => {
      const iconMap = {
        droplet: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { d: 'M12 2c-4.97 0-9 4.03-9 9 0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11c0-4.97-4.03-9-9-9z' })
        ]),
        syringe: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3V1M13 7h8m0 0l-2-2m2 2l-2 2' })
        ]),
        monitor: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
        ]),
        brain: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { d: 'M21.33 12.91c-.09-.66-.78-1.17-1.48-1.17-.22 0-.44.05-.65.13-.05-.2-.12-.39-.21-.58.53-.29.87-.85.87-1.48 0-.94-.76-1.7-1.7-1.7-.39 0-.75.13-1.04.36-.17-.38-.38-.73-.63-1.06.3-.35.48-.8.48-1.29 0-.99-.8-1.79-1.79-1.79-.53 0-1.01.23-1.34.59-.24-.16-.5-.3-.77-.43.15-.3.23-.63.23-.98 0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5c0 .35.08.68.23.98-.27.13-.53.27-.77.43-.33-.36-.81-.59-1.34-.59-.99 0-1.79.8-1.79 1.79 0 .49.18.94.48 1.29-.25.33-.46.68-.63 1.06-.29-.23-.65-.36-1.04-.36-.94 0-1.7.76-1.7 1.7 0 .63.34 1.19.87 1.48-.09.19-.16.38-.21.58-.21-.08-.43-.13-.65-.13-.7 0-1.39.51-1.48 1.17-.1.7.45 1.32 1.15 1.32.08 0 .16 0 .24-.02.06.2.14.4.23.59-.18.14-.3.36-.3.61 0 .43.35.78.78.78.18 0 .35-.06.49-.17.21.25.44.48.69.69-.11.14-.17.31-.17.49 0 .43.35.78.78.78.25 0 .47-.12.61-.3.19.09.39.17.59.23-.02.08-.02.16-.02.24 0 .7.62 1.25 1.32 1.15.66-.09 1.17-.78 1.17-1.48 0-.22-.05-.44-.13-.65.2-.05.39-.12.58-.21.14.18.36.3.61.3.43 0 .78-.35.78-.78 0-.18-.06-.35-.17-.49.25-.21.48-.44.69-.69.14.11.31.17.49.17.43 0 .78-.35.78-.78 0-.25-.12-.47-.3-.61.09-.19.17-.39.23-.59.08.02.16.02.24.02.7 0 1.25-.62 1.15-1.32z' })
        ]),
        thermometer: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' })
        ]),
        virus: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { d: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z' })
        ]),
        liver: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { d: 'M12.5,2C13.5,2 14.39,2.44 15,3.17C15.61,2.44 16.5,2 17.5,2C19.43,2 21,3.57 21,5.5C21,6.5 20.56,7.39 19.83,8C20.56,8.61 21,9.5 21,10.5C21,12.43 19.43,14 17.5,14C16.5,14 15.61,13.56 15,12.83C14.39,13.56 13.5,14 12.5,14C10.57,14 9,12.43 9,10.5C9,9.5 9.44,8.61 10.17,8C9.44,7.39 9,6.5 9,5.5C9,3.57 10.57,2 12.5,2M12.5,4C11.67,4 11,4.67 11,5.5C11,6.33 11.67,7 12.5,7C13.33,7 14,6.33 14,5.5C14,4.67 13.33,4 12.5,4M17.5,4C16.67,4 16,4.67 16,5.5C16,6.33 16.67,7 17.5,7C18.33,7 19,6.33 19,5.5C19,4.67 18.33,4 17.5,4M12.5,9C11.67,9 11,9.67 11,10.5C11,11.33 11.67,12 12.5,12C13.33,12 14,11.33 14,10.5C14,9.67 13.33,9 12.5,9M17.5,9C16.67,9 16,9.67 16,10.5C16,11.33 16.67,12 17.5,12C18.33,12 19,11.33 19,10.5C19,9.67 18.33,9 17.5,9Z' })
        ]),
        kidney: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { d: 'M12,2C13.11,2 14,2.9 14,4C14,5.11 13.11,6 12,6C10.89,6 10,5.11 10,4C10,2.9 10.89,2 12,2M21,9V7L15,13L13.5,7H9.5L8,13L2,7V9L7.5,15L9,9.5H11L12.5,15L18,9H21Z' })
        ]),
        heart: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { d: 'M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z' })
        ]),
        sun: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' })
        ]),
        pill: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' })
        ]),
        lungs: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { d: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4Z' })
        ]),
        scan: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' })
        ]),
        'heart-pulse': () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' })
        ]),
        allergen: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' })
        ])
      }
      return iconMap[iconName] || iconMap.droplet
    }

    // Test selection functions
    const toggleTestSelection = (testId) => {
      const index = selectedTests.value.indexOf(testId)
      if (index > -1) {
        selectedTests.value.splice(index, 1)
      } else {
        selectedTests.value.push(testId)
      }
    }

    const clearSelection = () => {
      selectedTests.value = []
    }

    const viewSelectedTests = () => {
      const selected = labTests.value.filter(test => selectedTests.value.includes(test.id))
      const testList = selected.map(test => `${test.name} - ₹${test.price}`).join('\n')
      alert(`Selected Tests:\n\n${testList}\n\nTotal: ₹${totalPrice.value}`)
    }

    const bookSelectedTests = () => {
      if (selectedTests.value.length === 0) {
        alert('Please select at least one test to book.')
        return
      }

      const selected = labTests.value.filter(test => selectedTests.value.includes(test.id))
      const bookingData = {
        lab: selectedLab.value,
        tests: selected,
        totalPrice: totalPrice.value,
        type: 'multiple-lab-tests'
      }

      // Store booking data and navigate to booking slots
      const bookingParam = encodeURIComponent(JSON.stringify(bookingData))
      router.push(`/patient/booking-slots/${bookingParam}`)
    }

    const bookTest = (test) => {
      // Navigate to booking slots page with test data
      const testParam = encodeURIComponent(JSON.stringify({
        ...test,
        type: 'lab-test'
      }))
      router.push(`/patient/booking-slots/${testParam}`)
    }

    const viewDetails = (test) => {
      console.log('Viewing details for:', test)
      alert(`Details for ${test.name}:\n\n${test.description}\n\nPrice: ₹${test.price}\nCategory: ${test.category}`)
    }

    const goBackToLabSelection = () => {
      router.push('/patient/lab-selection')
    }

    const changeLabSelection = () => {
      router.push('/patient/lab-selection')
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
      selectedCategory,
      selectedLab,
      selectedTests,
      totalPrice,
      labTests,
      categories,
      filteredTests,
      getTestIcon,
      toggleTestSelection,
      clearSelection,
      viewSelectedTests,
      bookSelectedTests,
      bookTest,
      viewDetails,
      goBackToLabSelection,
      changeLabSelection,
      handleLogout
    }
  }
}
</script>