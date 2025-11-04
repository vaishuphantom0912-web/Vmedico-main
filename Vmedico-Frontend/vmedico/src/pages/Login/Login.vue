<template>
  <Layout>
    <section class="min-h-screen py-12 relative overflow-hidden" style="background: linear-gradient(135deg, #e0f2fe 0%, #ffffff 50%, #e8f4f8 100%);">
      <!-- Medical Items Background Image -->
      <div 
        class="absolute inset-0 z-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style="background-image: url('/vintage-pharmacy-bottles.png'); background-position: left top;"
      ></div>
      <!-- Animated Medical Icons Background -->
      <div class="absolute inset-0 z-0 overflow-hidden">
        <!-- Floating medical icons with animations -->
        <span class="material-symbols-rounded absolute text-blue-200 opacity-20 animate-float" style="font-size: 70px; top: 10%; left: 5%; animation-delay: 0s;">stethoscope</span>
        <span class="material-symbols-rounded absolute text-blue-300 opacity-15 animate-float-reverse" style="font-size: 55px; top: 20%; right: 10%; animation-delay: 1s;">medical_services</span>
        <span class="material-symbols-rounded absolute text-blue-200 opacity-20 animate-float" style="font-size: 65px; top: 35%; left: 12%; animation-delay: 2s;">local_hospital</span>
        <span class="material-symbols-rounded absolute text-blue-300 opacity-15 animate-float-reverse" style="font-size: 60px; top: 45%; right: 18%; animation-delay: 0.5s;">health_and_safety</span>
        <span class="material-symbols-rounded absolute text-blue-200 opacity-20 animate-float" style="font-size: 50px; bottom: 30%; left: 8%; animation-delay: 1.5s;">medication</span>
        <span class="material-symbols-rounded absolute text-blue-300 opacity-15 animate-float-reverse" style="font-size: 70px; bottom: 20%; right: 12%; animation-delay: 2.5s;">emergency</span>
        <span class="material-symbols-rounded absolute text-blue-200 opacity-20 animate-float" style="font-size: 45px; top: 60%; left: 22%; animation-delay: 3s;">monitoring</span>
        <span class="material-symbols-rounded absolute text-blue-300 opacity-15 animate-float-reverse" style="font-size: 55px; top: 70%; right: 7%; animation-delay: 1.2s;">vaccines</span>
        <span class="material-symbols-rounded absolute text-blue-200 opacity-20 animate-float" style="font-size: 65px; bottom: 40%; left: 28%; animation-delay: 0.8s;">bloodtype</span>
        <span class="material-symbols-rounded absolute text-blue-300 opacity-15 animate-float-reverse" style="font-size: 60px; top: 80%; right: 22%; animation-delay: 2.2s;">heart_plus</span>
        <span class="material-symbols-rounded absolute text-blue-200 opacity-20 animate-float" style="font-size: 50px; bottom: 15%; left: 18%; animation-delay: 1.8s;">science</span>
        <span class="material-symbols-rounded absolute text-blue-300 opacity-15 animate-float-reverse" style="font-size: 65px; top: 28%; right: 5%; animation-delay: 0.3s;">medical_information</span>
      </div>
      <div class="relative z-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
        <div class="max-w-xl fade-in">
          <h1 class="text-4xl sm:text-5xl font-bold text-blue-900 inline-flex items-center gap-3 tracking-tight">
            <span class="material-symbols-rounded text-blue-700 text-3xl" style="font-variation-settings:'OPSZ' 28, 'wght' 700" aria-hidden="true">medical_services</span>
            <span>Welcome to VMedico</span>
          </h1>
          <p class="text-slate-700 mt-2 text-lg">Your trusted partner in digital healthcare solutions</p>
          
          <!-- Vintage Pharmacy Bottles Image -->
          <div 
            class="mt-8 mb-6 fade-in w-full max-w-md rounded-lg shadow-xl bg-cover bg-center bg-no-repeat"
            style="background-image: url('/Pictures/vintage-pharmacy-bottles.png'); height: 450px; min-height: 400px;"
          ></div>
          
          <ul class="mt-6 space-y-3 text-slate-800">
            <li class="flex items-center gap-4 leading-7 text-lg fade-in stagger-1">
              <span class="material-symbols-rounded text-green-600 text-2xl" style="font-variation-settings:'OPSZ' 28, 'wght' 700" aria-hidden="true">verified</span>
              <span class="font-semibold">Secure & HIPAA Compliant</span>
            </li>
            <li class="flex items-center gap-4 leading-7 text-lg fade-in stagger-2">
              <span class="material-symbols-rounded text-green-600 text-2xl" style="font-variation-settings:'OPSZ' 28, 'wght' 700" aria-hidden="true">schedule</span>
              <span class="font-semibold">24/7 Healthcare Access</span>
            </li>
            <li class="flex items-center gap-4 leading-7 text-lg fade-in stagger-3">
              <span class="material-symbols-rounded text-green-600 text-2xl" style="font-variation-settings:'OPSZ' 28, 'wght' 700" aria-hidden="true">science</span>
              <span class="font-semibold">Integrated Lab Results</span>
            </li>
          </ul>
        </div>

      <div class="bg-white border border-slate-200 rounded-xl p-6 shadow md:mt-0 fade-in">
        <h2 class="text-lg font-semibold text-slate-900 inline-flex items-center gap-2">
          <span class="material-symbols-rounded text-blue-700" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">lock</span>
          <span>Access Your Account</span>
        </h2>
        <p class="text-slate-600 mt-1">Login to your VMedico account</p>

        <div class="mt-4 space-y-2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <button type="button" @click="role = 'patient'" :aria-pressed="role==='patient'"
              class="w-full rounded-lg border px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              :class="role==='patient' ? 'bg-blue-50 border-blue-600 scale-105' : 'hover:bg-slate-50 hover:scale-105'">
              <div class="font-medium inline-flex items-center gap-2"><span class="material-symbols-rounded text-blue-700" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">person</span> <span>Patient</span></div>
              <div class="text-slate-500 text-sm">Access healthcare services</div>
            </button>
            <button type="button" @click="role = 'lab'" :aria-pressed="role==='lab'"
              class="w-full rounded-lg border px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              :class="role==='lab' ? 'bg-blue-50 border-blue-600 scale-105' : 'hover:bg-slate-50 hover:scale-105'">
              <div class="font-medium inline-flex items-center gap-2"><span class="material-symbols-rounded text-blue-700" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">science</span> <span>Lab</span></div>
              <div class="text-slate-500 text-sm">Manage laboratory services</div>
            </button>
            <button type="button" @click="role = 'hospital'" :aria-pressed="role==='hospital'"
              class="w-full rounded-lg border px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              :class="role==='hospital' ? 'bg-blue-50 border-blue-600 scale-105' : 'hover:bg-slate-50 hover:scale-105'">
              <div class="font-medium inline-flex items-center gap-2"><span class="material-symbols-rounded text-blue-700" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">local_hospital</span> <span>Hospital</span></div>
              <div class="text-slate-500 text-sm">Manage hospital operations</div>
            </button>
            <button type="button" @click="role = 'doctor'" :aria-pressed="role==='doctor'"
              class="w-full rounded-lg border px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              :class="role==='doctor' ? 'bg-blue-50 border-blue-600 scale-105' : 'hover:bg-slate-50 hover:scale-105'">
              <div class="font-medium inline-flex items-center gap-2"><span class="material-symbols-rounded text-blue-700" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">medical_services</span> <span>Doctors</span></div>
              <div class="text-slate-500 text-sm">Access doctor portal</div>
            </button>
          </div>
        </div>

        <!-- Dynamic Messages -->
        <div v-if="errorMessage" class="mt-4">
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex items-center">
              <span class="material-symbols-rounded text-red-600 mr-2">error</span>
              <p class="text-red-800">{{ errorMessage }}</p>
            </div>
          </div>
        </div>

        <div v-if="successMessage" class="mt-4">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <div class="flex items-center">
              <span class="material-symbols-rounded text-green-600 mr-2">check_circle</span>
              <p class="text-green-800">{{ successMessage }}</p>
            </div>
          </div>
        </div>

        <form class="mt-6 space-y-4" @submit.prevent="submit">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">
              <span class="inline-flex items-center gap-1">
                <span class="material-symbols-rounded text-blue-700 align-middle" style="font-variation-settings:'OPSZ' 20, 'wght' 600" aria-hidden="true">account_circle</span>
                <span>Username or Email</span>
              </span>
            </label>
            <input v-model="username" required type="text" placeholder="Enter your username or email" class="form-input h-12 leading-6" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">
              <span class="inline-flex items-center gap-1">
                <span class="material-symbols-rounded text-blue-700 align-middle" style="font-variation-settings:'OPSZ' 20, 'wght' 600" aria-hidden="true">lock</span>
                <span>Password</span>
              </span>
            </label>
            <input v-model="password" required type="password" placeholder="Enter your password" class="form-input h-12 leading-6" />
          </div>
          <div class="flex items-center justify-between text-sm">
            <label class="inline-flex items-center gap-2 text-slate-600">
              <input type="checkbox" class="rounded border-slate-300" />
              Remember me
            </label>
            <a href="#" class="text-blue-700 hover:underline">Forgot password?</a>
          </div>
          <button 
            type="submit" 
            :disabled="isLoading"
            class="btn-primary w-full inline-flex items-center justify-center gap-2"
            :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
          >
            <span v-if="isLoading" class="material-symbols-rounded animate-spin" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">progress_activity</span>
            <span v-else class="material-symbols-rounded" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">login</span>
            <span>{{ isLoading ? 'Logging in...' : 'Login' }}</span>
          </button>
          <p class="text-sm text-slate-700 text-center">Don't have an account? <router-link to="/register" class="text-blue-700 font-medium">Register here</router-link></p>
          <div class="text-xs text-center text-slate-500 space-y-1">
            <p>Need help? Contact our support team at Supportvmedico@vmedico.com</p>
            <p class="text-blue-600 font-medium">Demo Logins:</p>
            <p class="text-blue-600 font-medium">• Patient: Username: patient, Password: 12345678</p>
            <p class="text-blue-600 font-medium">• Hospital: Username: hospital, Password: 12345678</p>
            <p class="text-blue-600 font-medium">• Doctor: Username: doctor, Password: 12345678</p>
          </div>
        </form>
      </div>
    </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '../../components/Layout/Layout.vue'
import ApiService from '../../services/api.js'

export default {
  name: 'LoginPage',
  components: {
    Layout
  },
  setup() {
    const router = useRouter()
    const role = ref('patient')
    const username = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const errorMessage = ref('')
    const successMessage = ref('')

    const submit = async () => {
      if (isLoading.value) return
      
      // Clear previous messages
      errorMessage.value = ''
      successMessage.value = ''
      
      if (!username.value.trim() || !password.value.trim()) {
        errorMessage.value = 'Please enter both username and password'
        return
      }

      isLoading.value = true

      try {
        // Map frontend role to backend role
        const roleMapping = {
          'patient': 'PATIENT',
          'doctor': 'DOCTOR', 
          'lab': 'LAB',
          'hospital': 'HOSPITAL_ADMIN'
        }

        const loginData = {
          usernameOrEmail: username.value.trim(),
          password: password.value,
          role: roleMapping[role.value]
        }

        console.log('Attempting login with:', { ...loginData, password: '***' })

        const response = await ApiService.login(loginData)
        console.log('Login response:', response)

        if (response.data && response.data.token) {
          // Store authentication data
          localStorage.setItem('authToken', response.data.token)
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('userRole', role.value)
          localStorage.setItem('username', response.data.username)

          // Create user session data
          const userSession = {
            id: response.data.userId,
            username: response.data.username,
            role: response.data.role,
            token: response.data.token
          }
          localStorage.setItem('userSession', JSON.stringify(userSession))

          successMessage.value = `Login successful! Welcome ${response.data.username}`

          // Redirect based on role
          const routeMapping = {
            'patient': '/patient-dashboard',
            'doctor': '/doctor-dashboard',
            'lab': '/lab-dashboard',
            'hospital': '/dashboard'
          }

          const targetRoute = routeMapping[role.value] || '/dashboard'
          console.log('Redirecting to:', targetRoute)

          setTimeout(() => {
            router.push(targetRoute).catch((error) => {
              console.error('Navigation failed:', error)
              window.location.href = targetRoute
            })
          }, 1500)

        } else {
          throw new Error('Invalid response format from server')
        }

      } catch (error) {
        console.error('Login failed:', error)
        
        // Check if it's a network error and try demo credentials as fallback
        if (error.message.includes('Network Error') || error.message.includes('fetch')) {
          if (await tryDemoLogin()) {
            return
          }
        }
        
        errorMessage.value = `Login failed: ${error.message}`
      } finally {
        isLoading.value = false
      }
    }

    const tryDemoLogin = async () => {
      console.log('Trying demo credentials...')
      
      const demoCredentials = {
        'patient': { username: 'patient', password: '12345678' },
        'doctor': { username: 'doctor', password: '12345678' },
        'lab': { username: 'lab', password: '12345678' },
        'hospital': { username: 'hospital', password: '12345678' }
      }

      const demo = demoCredentials[role.value]
      if (demo && username.value === demo.username && password.value === demo.password) {
        console.log(`Demo ${role.value} login successful`)
        alert(`Demo ${role.value} login successful! Redirecting...`)

        // Create demo session data
        const demoSessions = {
          'patient': {
            id: 'demo-patient',
            role: 'patient',
            name: 'Demo Patient',
            username: 'patient',
            email: 'patient@demo.com'
          },
          'doctor': {
            id: 'demo-doctor',
            role: 'doctor',
            name: 'Dr. Demo',
            username: 'doctor',
            email: 'doctor@demo.com',
            specialization: 'General Medicine'
          },
          'lab': {
            id: 'demo-lab',
            role: 'lab',
            labName: 'Demo Lab',
            username: 'lab',
            email: 'lab@demo.com'
          },
          'hospital': {
            id: 'demo-hospital',
            role: 'hospital',
            hospitalName: 'Demo Hospital',
            username: 'hospital',
            email: 'hospital@demo.com'
          }
        }

        localStorage.setItem('userSession', JSON.stringify(demoSessions[role.value]))
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userRole', role.value)

        const routeMapping = {
          'patient': '/patient-dashboard',
          'doctor': '/doctor-dashboard', 
          'lab': '/lab-dashboard',
          'hospital': '/dashboard'
        }

        setTimeout(() => {
          router.push(routeMapping[role.value]).catch((error) => {
            console.error('Navigation failed:', error)
            window.location.href = routeMapping[role.value]
          })
        }, 1000)

        return true
      }
      
      return false
    }
    
    return { role, username, password, submit, isLoading, errorMessage, successMessage }
  }
}
</script>
