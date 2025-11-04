<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Left: Logo and Brand Name -->
          <div class="flex items-center gap-3">
            <!-- Circular Logo with Stethoscope Icon -->
            <div class="w-12 h-12 rounded-full border border-blue-700 bg-blue-50 flex items-center justify-center">
              <span class="material-symbols-rounded text-blue-700" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">stethoscope</span>
            </div>
            <!-- Brand Name -->
            <h1 class="text-2xl font-bold text-slate-900">VMedico</h1>
          </div>

          <!-- Right: Navigation Links and Action Buttons -->
          <div class="flex items-center gap-6">
            <!-- Navigation Links -->
            <div class="hidden md:flex items-center gap-6">
              <router-link to="/" class="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                <span class="material-symbols-rounded text-blue-600" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">home</span>
                <span>Home</span>
              </router-link>
              <router-link to="/about" class="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                <span class="material-symbols-rounded text-blue-600" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">info</span>
                <span>About</span>
              </router-link>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-3">
              <router-link to="/login" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <span class="material-symbols-rounded text-white" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">login</span>
                <span>Login</span>
              </router-link>
              <router-link to="/register" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <span class="material-symbols-rounded text-white" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">person_add</span>
                <span>Register</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="text-white">
      <!-- Upper Section -->
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid md:grid-cols-4 gap-8">
          <!-- Left: Company Info -->
          <div class="md:col-span-1">
            <div class="flex items-center gap-3 mb-4">
              <!-- White Square Logo with Stethoscope Icon -->
              <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span class="material-symbols-rounded text-blue-600" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">stethoscope</span>
              </div>
              <h2 class="text-2xl font-bold">VMedico</h2>
            </div>
            <p class="text-sm text-gray-300 leading-relaxed">
              Connecting healthcare providers and patients through innovative technology.
            </p>
          </div>

          <!-- Right: Three Columns -->
          <div class="md:col-span-3 grid md:grid-cols-3 gap-8">
            <!-- Platform Column -->
            <div>
              <h3 class="font-bold text-lg mb-4">Platform</h3>
              <ul class="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" class="hover:text-white transition-colors duration-200">Services</a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition-colors duration-200">Find Doctors</a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition-colors duration-200">Laboratories</a>
                </li>
                <li>
                  <router-link to="/about" class="hover:text-white transition-colors duration-200">About Us</router-link>
                </li>
              </ul>
            </div>

            <!-- Support Column -->
            <div>
              <h3 class="font-bold text-lg mb-4">Support</h3>
              <ul class="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" class="hover:text-white transition-colors duration-200">Help Center</a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition-colors duration-200">Contact Us</a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition-colors duration-200">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition-colors duration-200">Terms of Service</a>
                </li>
              </ul>
            </div>

            <!-- Contact Column -->
            <div>
              <h3 class="font-bold text-lg mb-4">Contact</h3>
              <ul class="space-y-2 text-sm text-gray-300">
                <li>111-001-VMEDICO</li>
                <li>
                  <a href="mailto:Supportvmedico@vmedico.com" class="hover:text-white transition-colors duration-200">
                    Supportvmedico@vmedico.com
                  </a>
                </li>
                <li>24/7 Emergency Line</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Lower Section: Copyright -->
      <div class="border-t border-gray-700">
        <div class="max-w-7xl mx-auto px-6 py-6">
          <p class="text-center text-sm text-gray-400">
            © 2025 VMedico. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style scoped>
/* Additional footer styling if needed */
footer {
  background-color: #101827;
}
</style>
