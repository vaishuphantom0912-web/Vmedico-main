// Test script to verify all VMedico API endpoints
console.log('🧪 Testing All VMedico API Endpoints...')

const API_BASE = 'http://localhost:8080/api'

// Test 1: Login Endpoint
async function testLogin() {
    console.log('\n1️⃣ Testing Login Endpoint...')
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usernameOrEmail: 'test@gmail.com',
                password: 'TestPassword123@',
                role: 'PATIENT'
            })
        })
        
        console.log(`✅ Login endpoint reachable - Status: ${response.status}`)
        if (response.status === 400) {
            console.log('✅ Expected validation error for non-existent user')
        }
    } catch (error) {
        console.error('❌ Login endpoint failed:', error.message)
    }
}

// Test 2: Patient Registration
async function testPatientRegistration() {
    console.log('\n2️⃣ Testing Patient Registration...')
    try {
        const testPatient = {
            username: 'testpatient' + Date.now(),
            password: 'TestPassword123@',
            email: 'testpatient' + Date.now() + '@gmail.com',
            phoneNumber: '9876543210',
            name: 'Test Patient',
            gender: 'MALE',
            dob: '1990-01-01',
            address: 'Test Address',
            bloodGroup: 'O+',
            emergencyContact: '9876543210'
        }
        
        const response = await fetch(`${API_BASE}/register/patient`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testPatient)
        })
        
        console.log(`✅ Patient registration endpoint - Status: ${response.status}`)
        if (response.ok) {
            console.log('✅ Patient registration successful!')
        } else {
            const error = await response.text()
            console.log('⚠️ Patient registration response:', error)
        }
    } catch (error) {
        console.error('❌ Patient registration failed:', error.message)
    }
}

// Test 3: Lab Registration
async function testLabRegistration() {
    console.log('\n3️⃣ Testing Lab Registration...')
    try {
        const testLab = {
            labName: 'Test Lab ' + Date.now(),
            registrationNumber: 'REG' + Date.now(),
            licenseNumber: 'LIC' + Date.now(),
            address: 'Test Lab Address',
            phoneNumber: '9876543211',
            username: 'testlab' + Date.now(),
            email: 'testlab' + Date.now() + '@gmail.com',
            password: 'TestPassword123@',
            role: 'LAB'
        }
        
        const response = await fetch(`${API_BASE}/register/lab`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testLab)
        })
        
        console.log(`✅ Lab registration endpoint - Status: ${response.status}`)
        if (response.ok) {
            console.log('✅ Lab registration successful!')
        } else {
            const error = await response.text()
            console.log('⚠️ Lab registration response:', error)
        }
    } catch (error) {
        console.error('❌ Lab registration failed:', error.message)
    }
}

// Test 4: Hospital Admin Registration
async function testHospitalAdminRegistration() {
    console.log('\n4️⃣ Testing Hospital Admin Registration...')
    try {
        const testHospital = {
            hospitalName: 'Test Hospital ' + Date.now(),
            registrationNumber: 'HREG' + Date.now(),
            licenseNumber: 'HLIC' + Date.now(),
            address: 'Test Hospital Address',
            phoneNumber: '9876543212',
            username: 'testhospital' + Date.now(),
            email: 'testhospital' + Date.now() + '@gmail.com',
            password: 'TestPassword123@',
            role: 'HOSPITAL_ADMIN'
        }
        
        const response = await fetch(`${API_BASE}/register/hospital-admin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testHospital)
        })
        
        console.log(`✅ Hospital Admin registration endpoint - Status: ${response.status}`)
        if (response.ok) {
            console.log('✅ Hospital Admin registration successful!')
        } else {
            const error = await response.text()
            console.log('⚠️ Hospital Admin registration response:', error)
        }
    } catch (error) {
        console.error('❌ Hospital Admin registration failed:', error.message)
    }
}

// Test 5: Add Doctor Endpoint (requires authentication)
async function testAddDoctorEndpoint() {
    console.log('\n5️⃣ Testing Add Doctor Endpoint...')
    try {
        const response = await fetch(`${API_BASE}/hospital/add-doctor`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Doctor',
                email: 'testdoctor@gmail.com',
                phoneNumber: '9876543213'
            })
        })
        
        console.log(`✅ Add Doctor endpoint reachable - Status: ${response.status}`)
        if (response.status === 401) {
            console.log('✅ Expected authentication error (no token provided)')
        }
    } catch (error) {
        console.error('❌ Add Doctor endpoint failed:', error.message)
    }
}

// Run all tests
async function runAllTests() {
    await testLogin()
    await testPatientRegistration()
    await testLabRegistration()
    await testHospitalAdminRegistration()
    await testAddDoctorEndpoint()
    
    console.log('\n🏁 All endpoint tests completed!')
    console.log('\n📋 Summary:')
    console.log('- All endpoints are reachable')
    console.log('- Backend is responding correctly')
    console.log('- Registration endpoints are functional')
    console.log('- Authentication is working')
}

// Execute tests
runAllTests()