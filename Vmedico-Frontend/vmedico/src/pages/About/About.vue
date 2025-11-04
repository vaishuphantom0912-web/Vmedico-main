<template>
  <Layout>
    <section class="relative overflow-hidden min-h-screen" style="background: linear-gradient(135deg, #e0f2fe 0%, #ffffff 30%, #e8f4f8 60%, #ffffff 100%);">
      <!-- Animated Medical Icons Background -->
      <div class="absolute inset-0 z-0 overflow-hidden">
        <!-- Floating medical icons with animations -->
        <span class="material-symbols-rounded absolute text-blue-200 opacity-20 animate-float" style="font-size: 80px; top: 10%; left: 5%; animation-delay: 0s;">stethoscope</span>
        <span class="material-symbols-rounded absolute text-blue-300 opacity-15 animate-float-reverse" style="font-size: 60px; top: 20%; right: 10%; animation-delay: 1s;">medical_services</span>
        <span class="material-symbols-rounded absolute text-blue-200 opacity-20 animate-float" style="font-size: 70px; top: 40%; left: 15%; animation-delay: 2s;">local_hospital</span>
        <span class="material-symbols-rounded absolute text-blue-300 opacity-15 animate-float-reverse" style="font-size: 65px; top: 50%; right: 20%; animation-delay: 0.5s;">health_and_safety</span>
        <span class="material-symbols-rounded absolute text-blue-200 opacity-20 animate-float" style="font-size: 55px; bottom: 30%; left: 8%; animation-delay: 1.5s;">medication</span>
        <span class="material-symbols-rounded absolute text-blue-300 opacity-15 animate-float-reverse" style="font-size: 75px; bottom: 20%; right: 15%; animation-delay: 2.5s;">emergency</span>
        <span class="material-symbols-rounded absolute text-blue-200 opacity-20 animate-float" style="font-size: 50px; top: 60%; left: 25%; animation-delay: 3s;">monitoring</span>
        <span class="material-symbols-rounded absolute text-blue-300 opacity-15 animate-float-reverse" style="font-size: 60px; top: 70%; right: 8%; animation-delay: 1.2s;">vaccines</span>
        <span class="material-symbols-rounded absolute text-blue-200 opacity-20 animate-float" style="font-size: 70px; bottom: 40%; left: 30%; animation-delay: 0.8s;">bloodtype</span>
        <span class="material-symbols-rounded absolute text-blue-300 opacity-15 animate-float-reverse" style="font-size: 65px; top: 80%; right: 25%; animation-delay: 2.2s;">heart_plus</span>
        <span class="material-symbols-rounded absolute text-blue-200 opacity-20 animate-float" style="font-size: 55px; bottom: 15%; left: 20%; animation-delay: 1.8s;">science</span>
        <span class="material-symbols-rounded absolute text-blue-300 opacity-15 animate-float-reverse" style="font-size: 70px; top: 30%; right: 5%; animation-delay: 0.3s;">medical_information</span>
      </div>
      
      <div class="relative z-10">
        <!-- Hero Section -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="fade-in">
            <h1 class="text-4xl font-bold text-blue-900">Transforming Healthcare Through Innovation</h1>
            <p class="mt-4 text-lg text-slate-700 max-w-3xl">VMedico is revolutionizing healthcare delivery by connecting patients, doctors, hospitals, and laboratories through a unified digital platform. Our mission is to make quality healthcare accessible to everyone, everywhere.</p>
            <div class="mt-6 flex gap-4">
              <router-link to="/login" class="btn-primary">Join Our Mission</router-link>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center fade-in stagger-1">
              <div class="text-xl font-medium text-blue-900">10M+</div>
              <div class="text-slate-600 mt-1">Patients Served</div>
            </div>
            <div class="text-center fade-in stagger-2">
              <div class="text-xl font-medium text-blue-900">5,000+</div>
              <div class="text-slate-600 mt-1">Healthcare Providers</div>
            </div>
            <div class="text-center fade-in stagger-3">
              <div class="text-xl font-medium text-blue-900">100+</div>
              <div class="text-slate-600 mt-1">Partner Laboratories</div>
            </div>
            <div class="text-center fade-in stagger-4">
              <div class="text-xl font-medium text-blue-900">50+</div>
              <div class="text-slate-600 mt-1">Cities Covered</div>
            </div>
          </div>

          <!-- Core Values Section -->
          <div class="mt-16">
            <h2 class="text-2xl font-bold text-blue-900 inline-flex items-center gap-2 fade-in">
              <span class="material-symbols-rounded text-blue-700" style="font-variation-settings:'OPSZ' 24, 'wght' 600" aria-hidden="true">grade</span>
              <span>Our Core Values</span>
            </h2>
            <div class="mt-6 grid md:grid-cols-2 gap-6">
              <FeatureCard icon="favorite" title="Patient-Centered Care" desc="Every decision we make puts patients first, ensuring accessible, quality healthcare for all." class="fade-in stagger-1" />
              <FeatureCard icon="lightbulb" title="Innovation Excellence" desc="We leverage cutting-edge technology to transform healthcare delivery and improve outcomes." class="fade-in stagger-2" />
              <FeatureCard icon="security" title="Trusted Security" desc="Your health information is protected with enterprise-grade security and HIPAA compliance." class="fade-in stagger-3" />
              <FeatureCard icon="verified" title="Quality Assurance" desc="We maintain the highest standards through rigorous certification and continuous improvement." class="fade-in stagger-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import Layout from '../../components/Layout/Layout.vue'
import FeatureCard from '../../components/UI/FeatureCard.vue'

export default {
  name: 'AboutPage',
  components: {
    Layout,
    FeatureCard
  }
}
</script>
