// Test script to verify backend is working
console.log('🧪 Testing Backend Connection...')

// Test 1: Check if backend is reachable
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
  console.log('✅ Backend is reachable! Status:', response.status)
  if (response.status === 400) {
    console.log('✅ Login endpoint is working (expected validation error)')
  }
  return response.text()
})
.then(data => {
  console.log('Response:', data)
})
.catch(error => {
  console.error('❌ Backend connection failed:', error.message)
})

console.log('🏁 Backend test completed.')