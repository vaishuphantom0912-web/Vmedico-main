<template>
  <div id="app">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" v-if="route.name !== 'dashboard'" />
      <HospitalLanding v-else />
    </router-view>
  </div>
</template>

<script>
import HospitalLanding from './pages/Dashboard/HospitalLanding.vue'
import 'animate.css'

export default {
  name: "App",
  components: { HospitalLanding }
}
</script>
