// Test script to verify API integration
import ApiService from '../services/api.js'

export const testApiConnection = async () => {
  console.log('Testing API connection...')
  
  try {
    // Test a simple endpoint (this might fail if endpoint doesn't exist, but will test connection)
    const response = await fetch('http://localhost:8080/api/test')
    console.log('Backend is reachable')
    return true
  } catch (error) {
    console.error('Backend connection failed:', error.message)
    return false
  }
}

export const testLogin = async () => {
  console.log('Testing login functionality...')
  
  try {
    const testCredentials = {
      usernameOrEmail: 'test@gmail.com',
      password: 'TestPassword123@',
      role: 'PATIENT'
    }
    
    const response = await ApiService.login(testCredentials)
    console.log('Login test successful:', response)
    return true
  } catch (error) {
    console.log('Login test failed (expected for non-existent user):', error.message)
    return false
  }
}

export const testRegistration = async () => {
  console.log('Testing registration functionality...')
  
  try {
    const testPatient = {
      username: 'testuser' + Date.now(),
      password: 'TestPassword123@',
      email: 'test' + Date.now() + '@gmail.com',
      phoneNumber: '9876543210',
      name: 'Test Patient',
      gender: 'MALE',
      dob: '1990-01-01',
      address: 'Test Address',
      bloodGroup: 'O+',
      emergencyContact: '9876543210'
    }
    
    const response = await ApiService.registerPatient(testPatient)
    console.log('Registration test successful:', response)
    return true
  } catch (error) {
    console.log('Registration test result:', error.message)
    return false
  }
}

// Run all tests
export const runAllTests = async () => {
  console.log('=== API Integration Tests ===')
  
  const connectionTest = await testApiConnection()
  const loginTest = await testLogin()
  const registrationTest = await testRegistration()
  
  console.log('=== Test Results ===')
  console.log('Connection:', connectionTest ? '✅ PASS' : '❌ FAIL')
  console.log('Login:', loginTest ? '✅ PASS' : '⚠️ EXPECTED FAIL')
  console.log('Registration:', registrationTest ? '✅ PASS' : '❌ FAIL')
  
  return {
    connection: connectionTest,
    login: loginTest,
    registration: registrationTest
  }
}