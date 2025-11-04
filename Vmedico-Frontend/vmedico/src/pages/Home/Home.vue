<template>
  <Layout>
    <!-- Hero -->
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
      <!-- Floating Plus Symbols Animation -->
      <div class="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 14px; top: 15%; left: 12%; animation-delay: 0s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 12px; top: 25%; left: 35%; animation-delay: 1.5s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 16px; top: 45%; left: 8%; animation-delay: 3s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 13px; top: 55%; left: 45%; animation-delay: 4.5s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 11px; top: 65%; left: 22%; animation-delay: 2s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 15px; top: 75%; left: 38%; animation-delay: 5s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 14px; top: 35%; right: 25%; animation-delay: 2.5s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 12px; top: 50%; right: 18%; animation-delay: 1s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 13px; top: 60%; right: 32%; animation-delay: 3.5s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 11px; top: 20%; right: 42%; animation-delay: 4s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 16px; top: 80%; right: 15%; animation-delay: 1.5s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 14px; top: 30%; left: 28%; animation-delay: 5.5s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 12px; top: 70%; left: 55%; animation-delay: 2.8s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 13px; top: 40%; right: 8%; animation-delay: 4.2s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 15px; top: 85%; left: 42%; animation-delay: 3.2s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 13px; top: 10%; left: 50%; animation-delay: 6s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 11px; top: 90%; left: 25%; animation-delay: 0.5s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 14px; top: 5%; right: 30%; animation-delay: 6.5s;">+</span>
        <span class="plus-symbol absolute text-blue-400 animate-plus-float" style="font-size: 12px; bottom: 10%; left: 15%; animation-delay: 7s;">+</span>
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid md:grid-cols-2 gap-10 items-center">
          <div class="fade-in">
            <h1 class="text-4xl sm:text-5xl font-bold text-blue-900 leading-tight">Your Health,<br />Connected</h1>
            <p class="mt-5 text-base sm:text-lg text-slate-700 max-w-xl">
              VMedico bridges the gap between patients, doctors, and healthcare providers through innovative telemedicine solutions and integrated health monitoring.
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <router-link to="/login" class="btn-primary">Get Started</router-link>
              <router-link to="/about" class="btn-outline">Learn More</router-link>
            </div>
          </div>
          
          <!-- Medical Professional Image -->
          <div class="fade-in stagger-1 flex justify-center items-center">
            <div 
              class="w-full max-w-lg rounded-2xl shadow-2xl bg-cover bg-center bg-no-repeat overflow-hidden"
              style="background-image: url('/Pictures/medical-professional.jpg'); height: 600px; min-height: 500px; background-position: center top;"
            ></div>
          </div>
        </div>
        <!-- Inline stats under hero -->
        <div class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center fade-in stagger-1">
            <div class="text-xl font-medium text-blue-900">500+</div>
            <div class="text-slate-600 mt-1">Healthcare Providers</div>
          </div>
          <div class="text-center fade-in stagger-2">
            <div class="text-xl font-medium text-blue-900">10,000+</div>
            <div class="text-slate-600 mt-1">Patients Served</div>
          </div>
          <div class="text-center fade-in stagger-3">
            <div class="text-xl font-medium text-blue-900">25,000+</div>
            <div class="text-slate-600 mt-1">Consultations</div>
          </div>
          <div class="text-center fade-in stagger-4">
            <div class="text-xl font-medium text-blue-900">100+</div>
            <div class="text-slate-600 mt-1">Lab Partners</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section id="services" class="py-20 relative" style="background: linear-gradient(135deg, #ffffff 0%, #e8f4f8 50%, #ffffff 100%);">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-blue-900 text-center fade-in">Comprehensive Healthcare Solutions</h2>
        <p class="mt-3 text-slate-700 max-w-3xl mx-auto text-center fade-in stagger-1">Our platform integrates multiple healthcare services to provide seamless care coordination between patients, doctors, and medical facilities.</p>

        <div class="mt-10 grid md:grid-cols-3 gap-6">
          <FeatureCard icon="video_call" title="Tele-Consulting" desc="Connect with specialized medical practitioners from anywhere" class="fade-in stagger-1" />
          <FeatureCard icon="event" title="Appointment Management" desc="Schedule appointments and receive automated reminders" class="fade-in stagger-2" />
          <FeatureCard icon="science" title="Lab Integration" desc="Track laboratory results and monitor health details" class="fade-in stagger-3" />
          <FeatureCard icon="prescriptions" title="Digital Prescriptions" desc="Manage prescriptions and medication reminders" class="fade-in stagger-4" />
          <FeatureCard icon="notifications_active" title="Smart Notifications" desc="Automated email notifications for doctors and patients" class="fade-in stagger-5" />
          <FeatureCard icon="encrypted" title="Secure Platform" desc="HIPAA compliant with enterprise-grade security" class="fade-in stagger-5" />
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-20 relative" style="background: linear-gradient(135deg, #e0f2fe 0%, #ffffff 50%, #e8f4f8 100%);">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-blue-900 text-center fade-in">How VMedico Works</h2>
        <p class="mt-3 text-slate-700 text-center fade-in stagger-1">Simple steps to better healthcare</p>
        <div class="mt-10 grid md:grid-cols-3 gap-6">
          <StepCard number="1" title="Register & Verify" desc="Create your account and verify your identity for secure access" class="fade-in stagger-1" />
          <StepCard number="2" title="Find Your Doctor" desc="Browse specialists and book appointments that fit your schedule" class="fade-in stagger-2" />
          <StepCard number="3" title="Consult & Monitor" desc="Have video consultations, receive prescriptions, and track your health" class="fade-in stagger-3" />
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import Layout from '../../components/Layout/Layout.vue'
import FeatureCard from '../../components/UI/FeatureCard.vue'
import StepCard from '../../components/UI/StepCard.vue'

export default {
  name: 'HomePage',
  components: {
    Layout,
    FeatureCard,
    StepCard
  }
}
</script>
