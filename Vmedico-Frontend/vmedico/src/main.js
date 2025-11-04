import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { runAllTests } from './utils/testApi.js'

const app = createApp(App)
app.use(router)
app.mount('#app')

// Make test functions available in development
if (import.meta.env.DEV) {
  window.testVMedicoAPI = runAllTests
  console.log('🧪 VMedico API tests available! Run window.testVMedicoAPI() in console to test backend integration.')
}
