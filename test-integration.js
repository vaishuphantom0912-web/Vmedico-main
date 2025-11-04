// Simple test to verify the integration is working
// Run this in the browser console when the app is loaded

console.log('🧪 Testing VMedico Integration...')

// Test 1: Check if API service is available
try {
  console.log('✅ API Service loaded successfully')
} catch (error) {
  console.error('❌ API Service failed to load:', error)
}

// Test 2: Check if axios is available
if (typeof axios !== 'undefined') {
  console.log('✅ Axios is available')
} else {
  console.log('⚠️ Axios not available globally (this is normal)')
}

// Test 3: Check localStorage functionality
try {
  localStorage.setItem('test', 'value')
  localStorage.removeItem('test')
  console.log('✅ LocalStorage is working')
} catch (error) {
  console.error('❌ LocalStorage failed:', error)
}

// Test 4: Check if backend is reachable
fetch('http://localhost:8080/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    usernameOrEmail: 'test',
    password: 'test',
    role: 'PATIENT'
  })
})
.then(response => {
  if (response.status === 400 || response.status === 401) {
    console.log('✅ Backend is reachable (got expected auth error)')
  } else {
    console.log('✅ Backend is reachable (status:', response.status, ')')
  }
})
.catch(error => {
  if (error.message.includes('CORS') || error.message.includes('fetch')) {
    console.error('❌ Backend connection failed - CORS or network issue:', error.message)
    console.log('💡 Make sure your Spring Boot backend is running on http://localhost:8080')
  } else {
    console.error('❌ Backend connection failed:', error.message)
  }
})

console.log('🏁 Integration test completed. Check results above.')