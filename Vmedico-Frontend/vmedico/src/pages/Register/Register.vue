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
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-blue-900 inline-flex items-center gap-2 fade-in">
          <span class="material-symbols-rounded text-blue-700" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">person_add</span>
          <span>Join VMedico</span>
        </h1>
        <p class="text-slate-700 mt-2 fade-in stagger-1">Create your account to access our comprehensive healthcare platform</p>

        <!-- Role Selector -->
        <div class="mt-6">
          <label class="block text-sm font-medium text-slate-700 mb-1">
            <span class="inline-flex items-center gap-1">
              <span class="material-symbols-rounded text-blue-700 align-middle" aria-hidden="true">group</span>
              <span>Select Role</span>
            </span>
          </label>
          <select
            v-model="role"
            @change="resetForm"
            class="mt-1 w-full md:w-80 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="patient">Patient</option>
            <option value="lab">Lab</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>

        <!-- API Status Indicator -->
        <div class="mt-4 text-sm text-slate-600">
          <span class="inline-flex items-center gap-1">
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Connected to VMedico API</span>
          </span>
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="validateForm" class="mt-8 grid md:grid-cols-2 gap-6">
          <!-- Common Fields -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">
              <span class="inline-flex items-center gap-1">
                <span class="material-symbols-rounded text-blue-700 align-middle" aria-hidden="true">badge</span>
                <span>{{ role === 'lab' ? 'Lab Name' : role === 'corporate' ? 'Corporate Name' : 'Patient Name' }}</span>
              </span>
            </label>
            <input
              v-model="name"
              type="text"
              :placeholder="role === 'lab' ? 'Lab name' : role === 'corporate' ? 'Corporate name' : 'Patient name'"
              class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">
              <span class="inline-flex items-center gap-1">
                <span class="material-symbols-rounded text-blue-700 align-middle" aria-hidden="true">account_circle</span>
                <span>Username</span>
              </span>
            </label>
            <input
              v-model="username"
              @input="validateUsername"
              type="text"
              placeholder="Set username"
              class="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2"
              :class="usernameError ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-blue-400'"
            />
            <p v-if="usernameError" class="text-red-600 text-sm mt-1">{{ usernameError }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">
              <span class="inline-flex items-center gap-1">
                <span class="material-symbols-rounded text-blue-700 align-middle" aria-hidden="true">lock</span>
                <span>Password</span>
              </span>
            </label>
            <input
              v-model="password"
              @input="validatePassword"
              type="password"
              placeholder="Set password"
              class="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2"
              :class="passwordError ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-blue-400'"
            />
            <p v-if="passwordError" class="text-red-600 text-sm mt-1">{{ passwordError }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">
              <span class="inline-flex items-center gap-1">
                <span class="material-symbols-rounded text-blue-700 align-middle" aria-hidden="true">mail</span>
                <span>Email</span>
              </span>
            </label>
            <input
              v-model="email"
              @input="validateEmail"
              type="email"
              placeholder="Email ID (must be @gmail.com)"
              class="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2"
              :class="emailError ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-blue-400'"
            />
            <p v-if="emailError" class="text-red-600 text-sm mt-1">{{ emailError }}</p>
          </div>

          <!-- Lab-specific fields -->
          <template v-if="role === 'lab'">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                <span class="inline-flex items-center gap-1">
                  <span class="material-symbols-rounded text-blue-700 align-middle" aria-hidden="true">badge</span>
                  <span>Registration Number</span>
                </span>
              </label>
              <input
                v-model="registrationNumber"
                @input="validateRegistrationNumber"
                type="text"
                placeholder="e.g. LAB1234"
                class="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2"
                :class="registrationNumberError ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-blue-400'"
              />
              <p v-if="registrationNumberError" class="text-red-600 text-sm mt-1">{{ registrationNumberError }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                <span class="inline-flex items-center gap-1">
                  <span class="material-symbols-rounded text-blue-700 align-middle" aria-hidden="true">license</span>
                  <span>License Number</span>
                </span>
              </label>
              <input
                v-model="licenseNumber"
                @input="validateLicenseNumber"
                type="text"
                placeholder="e.g. LIC1234"
                class="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2"
                :class="licenseNumberError ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-blue-400'"
              />
              <p v-if="licenseNumberError" class="text-red-600 text-sm mt-1">{{ licenseNumberError }}</p>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1">
                <span class="inline-flex items-center gap-1">
                  <span class="material-symbols-rounded text-blue-700 align-middle" aria-hidden="true">location_on</span>
                  <span>Lab Address</span>
                </span>
              </label>
              <textarea
                v-model="address"
                rows="3"
                placeholder="Enter complete lab address"
                class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>
          </template>

          <!-- Corporate-specific fields -->
          <template v-if="role === 'corporate'">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                <span class="inline-flex items-center gap-1">
                  <span class="material-symbols-rounded text-blue-700 align-middle" aria-hidden="true">badge</span>
                  <span>Registration Number</span>
                </span>
              </label>
              <input
                v-model="registrationNumber"
                type="text"
                placeholder="e.g. HOSP1234"
                class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                <span class="inline-flex items-center gap-1">
                  <span class="material-symbols-rounded text-blue-700 align-middle" aria-hidden="true">license</span>
                  <span>License Number</span>
                </span>
              </label>
              <input
                v-model="licenseNumber"
                type="text"
                placeholder="e.g. HLIC1234"
                class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1">
                <span class="inline-flex items-center gap-1">
                  <span class="material-symbols-rounded text-blue-700 align-middle" aria-hidden="true">location_on</span>
                  <span>Hospital Address</span>
                </span>
              </label>
              <textarea
                v-model="address"
                rows="3"
                placeholder="Enter complete hospital address"
                class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>
          </template>

          <!-- Phone Validation -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">
              <span class="inline-flex items-center gap-1">
                <span class="material-symbols-rounded text-blue-700 align-middle" aria-hidden="true">call</span>
                <span>Phone Number</span>
              </span>
            </label>
            <input
              type="tel"
              v-model="phone"
              @input="validatePhone"
              placeholder="Phone number"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="10"
              class="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2"
              :class="phoneError ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-blue-400'"
            />
            <p v-if="phoneError" class="text-red-600 text-sm mt-1">{{ phoneError }}</p>
          </div>



          <!-- Patient-only fields -->
          <template v-if="role === 'patient'">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                <span class="inline-flex items-center gap-1">
                  <span class="material-symbols-rounded text-blue-700 align-middle" aria-hidden="true">calendar_month</span>
                  <span>Date of Birth (YYYY-MM-DD)</span>
                </span>
              </label>
              <input
                type="text"
                v-model="dob"
                @input="validateDOB"
                placeholder="e.g. 2004-08-12"
                maxlength="10"
                class="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2"
                :class="dobError ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-blue-400'"
              />
              <p v-if="dobError" class="text-red-600 text-sm mt-1">{{ dobError }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                <span class="inline-flex items-center gap-1">
                  <span class="material-symbols-rounded text-blue-700 align-middle" aria-hidden="true">bloodtype</span>
                  <span>Blood Group</span>
                </span>
              </label>
              <select
                v-model="bloodGroup"
                class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                <span class="inline-flex items-center gap-1">
                  <span class="material-symbols-rounded text-blue-700 align-middle" aria-hidden="true">face_6</span>
                  <span>Gender</span>
                </span>
              </label>
              <select
                v-model="gender"
                class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>Female</option>
                <option>Male</option>
              </select>
            </div>
          </template>

          <!-- Dynamic Messages -->
          <div v-if="errorMessage" class="md:col-span-2">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div class="flex items-center">
                <span class="material-symbols-rounded text-red-600 mr-2">error</span>
                <p class="text-red-800">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <div v-if="successMessage" class="md:col-span-2">
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div class="flex items-center">
                <span class="material-symbols-rounded text-green-600 mr-2">check_circle</span>
                <p class="text-green-800">{{ successMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Submit -->
          <div class="md:col-span-2">
            <button 
              type="submit" 
              :disabled="isLoading"
              class="btn-primary w-full md:w-auto inline-flex items-center gap-2"
              :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
            >
              <span v-if="isLoading" class="material-symbols-rounded animate-spin" aria-hidden="true">progress_activity</span>
              <span v-else class="material-symbols-rounded" aria-hidden="true">how_to_reg</span>
              <span>{{ isLoading ? 'Registering...' : 'Register' }}</span>
            </button>
            <p class="text-sm text-slate-700 text-center mt-4">Already have an account? <router-link to="/login" class="text-blue-700 font-medium hover:underline">Login here</router-link></p>
          </div>
        </form>
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
  name: 'RegisterPage',
  components: { Layout },
  setup() {
    const router = useRouter()
    const role = ref('patient')

    const name = ref('')
    const username = ref('')
    const password = ref('')
    const email = ref('')
    const phone = ref('')
    const qualification = ref('')
    const bloodGroup = ref('')
    const gender = ref('')
    const dob = ref('')
    const registrationNumber = ref('')
    const licenseNumber = ref('')
    const address = ref('')

    const phoneError = ref('')
    const dobError = ref('')
    const emailError = ref('')
    const passwordError = ref('')
    const usernameError = ref('')
    const registrationNumberError = ref('')
    const licenseNumberError = ref('')
    const isLoading = ref(false)
    const successMessage = ref('')
    const errorMessage = ref('')

    // ✅ Real-time email validation
    const validateEmail = () => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
      if (!email.value) {
        emailError.value = ''
        return
      }
      emailError.value = emailRegex.test(email.value) 
        ? '' 
        : 'Email must be a valid @gmail.com address'
    }

    // ✅ Real-time password validation
    const validatePassword = () => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[@_!#$%^&*])[A-Za-z\d@_!#$%^&*]{8,}$/
      if (!password.value) {
        passwordError.value = ''
        return
      }
      passwordError.value = passwordRegex.test(password.value)
        ? ''
        : 'Password must start with capital letter, be 8+ characters, and contain special character'
    }

    // ✅ Real-time username validation
    const validateUsername = async () => {
      if (!username.value || username.value.length < 3) {
        usernameError.value = username.value ? 'Username must be at least 3 characters' : ''
        return
      }
      
      // Check for valid username format
      const usernameRegex = /^[a-zA-Z0-9_]+$/
      if (!usernameRegex.test(username.value)) {
        usernameError.value = 'Username can only contain letters, numbers, and underscores'
        return
      }
      
      usernameError.value = ''
    }

    // ✅ Phone validation
    // - Accept digits only (auto-strip non-digits)
    // - Must be exactly 10 digits
    const validatePhone = () => {
      // Strip all non-digits and clamp to 10
      const digitsOnly = (phone.value || '').replace(/\D+/g, '').slice(0, 10)
      if (digitsOnly !== phone.value) {
        phone.value = digitsOnly
      }
      const regex = /^[0-9]{10}$/
      phoneError.value = regex.test(digitsOnly)
        ? ''
        : 'Phone number must be exactly 10 digits'
    }

    // ✅ DOB validation
    // - Enforce format YYYY-MM-DD
    // - Validate actual calendar date
    // - Require age >= 18 years
    const validateDOB = () => {
      // Basic format check
      const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
      if (!regex.test(dob.value)) {
        dobError.value = 'Enter DOB as YYYY-MM-DD'
        return
      }
      const [yearStr, monthStr, dayStr] = dob.value.split('-')
      const year = Number(yearStr)
      const monthIndex = Number(monthStr) - 1 // JS Date months are 0-based
      const day = Number(dayStr)
      const parsed = new Date(year, monthIndex, day)
      const isValidDate =
        parsed.getFullYear() === year &&
        parsed.getMonth() === monthIndex &&
        parsed.getDate() === day
      if (!isValidDate) {
        dobError.value = 'Invalid calendar date'
        return
      }
      // Age check >= 18
      const today = new Date()
      let age = today.getFullYear() - year
      const hasHadBirthdayThisYear =
        today.getMonth() > monthIndex ||
        (today.getMonth() === monthIndex && today.getDate() >= day)
      if (!hasHadBirthdayThisYear) {
        age -= 1
      }
      dobError.value = age >= 18 ? '' : 'You must be at least 18 years old'
    }

    // ✅ Registration Number validation for Lab
    const validateRegistrationNumber = () => {
      if (!registrationNumber.value) {
        registrationNumberError.value = ''
        return
      }
      const regex = /^LAB\d{4}$/
      registrationNumberError.value = regex.test(registrationNumber.value)
        ? ''
        : 'Registration number must be in format LAB followed by 4 digits (e.g., LAB1234)'
    }

    // ✅ License Number validation for Lab
    const validateLicenseNumber = () => {
      if (!licenseNumber.value) {
        licenseNumberError.value = ''
        return
      }
      const regex = /^LIC\d{4}$/
      licenseNumberError.value = regex.test(licenseNumber.value)
        ? ''
        : 'License number must be in format LIC followed by 4 digits (e.g., LIC1234)'
    }

    // ✅ Reset form function
    // Clears all inputs and validation messages. Invoked on successful submit and role change.
    const resetForm = () => {
      name.value = ''
      username.value = ''
      password.value = ''
      email.value = ''
      phone.value = ''
      qualification.value = ''
      bloodGroup.value = ''
      gender.value = ''
      dob.value = ''
      registrationNumber.value = ''
      licenseNumber.value = ''
      address.value = ''
      phoneError.value = ''
      dobError.value = ''
      emailError.value = ''
      passwordError.value = ''
      usernameError.value = ''
      registrationNumberError.value = ''
      licenseNumberError.value = ''
      successMessage.value = ''
      errorMessage.value = ''
    }

    // ✅ Validate and submit form - Fully Dynamic
    const validateForm = async () => {
      if (isLoading.value) return
      
      // Clear previous messages
      errorMessage.value = ''
      successMessage.value = ''
      
      // Run all validations
      validateEmail()
      validatePassword()
      await validateUsername()
      validatePhone()
      
      if (role.value === 'patient') {
        validateDOB()
      } else {
        dobError.value = ''
      }

      if (role.value === 'lab') {
        validateRegistrationNumber()
        validateLicenseNumber()
      } else {
        registrationNumberError.value = ''
        licenseNumberError.value = ''
      }
      
      // Check for validation errors
      const hasErrors = emailError.value || passwordError.value || usernameError.value || 
                       phoneError.value || dobError.value || registrationNumberError.value || 
                       licenseNumberError.value
      
      if (hasErrors) {
        errorMessage.value = 'Please fix the validation errors above.'
        return
      }

      // Check required fields
      if (!name.value || !username.value || !password.value || !email.value || !phone.value) {
        errorMessage.value = 'Please fill in all required fields.'
        return
      }



      if (role.value === 'patient' && (!bloodGroup.value || !gender.value)) {
        errorMessage.value = 'Please select blood group and gender.'
        return
      }

      // Start loading
      isLoading.value = true

      try {
        let registrationData = {}
        let response = null
        
        if (role.value === 'patient') {
          registrationData = {
            username: username.value,
            password: password.value,
            email: email.value,
            phoneNumber: phone.value,
            name: name.value,
            gender: gender.value.toUpperCase(),
            dob: dob.value,
            address: 'Not provided',
            bloodGroup: bloodGroup.value,
            emergencyContact: phone.value
          }
          
          response = await ApiService.registerPatient(registrationData)
          successMessage.value = '✅ Patient registration successful! Redirecting to login...'
          
        } else if (role.value === 'lab') {
          // Check lab-specific required fields
          if (!registrationNumber.value || !licenseNumber.value || !address.value) {
            errorMessage.value = 'Please fill in all lab-specific fields (Registration Number, License Number, Address).'
            return
          }

          registrationData = {
            labName: name.value,
            registrationNumber: registrationNumber.value,
            licenseNumber: licenseNumber.value,
            address: address.value,
            phoneNumber: phone.value,
            username: username.value,
            email: email.value,
            password: password.value,
            role: 'LAB'
          }
          
          response = await ApiService.registerLab(registrationData)
          successMessage.value = '✅ Lab registration successful! Redirecting to login...'
          
        } else if (role.value === 'corporate') {
          // Check corporate-specific required fields
          if (!registrationNumber.value || !licenseNumber.value || !address.value) {
            errorMessage.value = 'Please fill in all hospital-specific fields (Registration Number, License Number, Address).'
            return
          }

          registrationData = {
            hospitalName: name.value,
            registrationNumber: registrationNumber.value,
            licenseNumber: licenseNumber.value,
            address: address.value,
            phoneNumber: phone.value,
            username: username.value,
            email: email.value,
            password: password.value,
            role: 'HOSPITAL_ADMIN'
          }
          
          response = await ApiService.registerHospitalAdmin(registrationData)
          successMessage.value = '✅ Hospital Admin registration successful! Redirecting to login...'
        }

        console.log('Registration successful:', response)
        
        // Reset form and redirect after success
        setTimeout(() => {
          resetForm()
          router.push('/login')
        }, 2000)
        
      } catch (error) {
        console.error('Registration failed:', error)
        errorMessage.value = `Registration failed: ${error.message}`
      } finally {
        isLoading.value = false
      }
    }

    return {
      role,
      name,
      username,
      password,
      email,
      phone,
      qualification,
      bloodGroup,
      gender,
      dob,
      registrationNumber,
      licenseNumber,
      address,
      phoneError,
      dobError,
      emailError,
      passwordError,
      usernameError,
      registrationNumberError,
      licenseNumberError,
      isLoading,
      successMessage,
      errorMessage,
      validatePhone,
      validateDOB,
      validateEmail,
      validatePassword,
      validateUsername,
      validateRegistrationNumber,
      validateLicenseNumber,
      validateForm,
      resetForm
    }
  }
}
</script>

<style scoped>
.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 0.5rem;
  transition: 0.2s;
}
.btn-primary:hover {
  background-color: #1e40af;
}
</style>
