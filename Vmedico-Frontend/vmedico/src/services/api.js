// API service for VMedico backend integration
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

class ApiService {
    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // Add request interceptor to include auth token
        this.client.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('authToken')
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        // Add response interceptor to handle errors
        this.client.interceptors.response.use(
            (response) => {
                return response.data
            },
            (error) => {
                // Handle different error response formats
                let message = 'An error occurred'

                if (error.response?.data) {
                    // Check for different error response formats
                    if (typeof error.response.data === 'string') {
                        message = error.response.data
                    } else if (error.response.data.message) {
                        message = error.response.data.message
                    } else if (error.response.data.error) {
                        message = error.response.data.error
                    }
                } else if (error.message) {
                    message = error.message
                }

                console.error('API request failed:', message)
                throw new Error(message)
            }
        )
    }

    // Authentication methods
    async login(credentials) {
        // POST /api/login - Logs in user and returns JWT token
        return this.client.post('/login', {
            usernameOrEmail: credentials.usernameOrEmail,
            password: credentials.password,
            role: credentials.role
        })
    }

    async forgotPassword(email) {
        return this.client.post('/forgot-password', { email })
    }

    async changePassword(passwordData) {
        return this.client.post('/change-password', passwordData)
    }

    // Registration methods
    async registerPatient(patientData) {
        // POST /api/register/patient - Registers a new patient into the system
        return this.client.post('/register/patient', {
            username: patientData.username,
            password: patientData.password,
            email: patientData.email,
            phoneNumber: patientData.phoneNumber,
            name: patientData.name,
            gender: patientData.gender,
            dob: patientData.dob,
            address: patientData.address,
            bloodGroup: patientData.bloodGroup,
            emergencyContact: patientData.emergencyContact
        })
    }

    async registerDoctor(doctorData) {
        return this.client.post('/register/doctor', doctorData)
    }

    async registerLab(labData) {
        // POST /api/register/lab - Registers a new lab partner
        return this.client.post('/register/lab', {
            labName: labData.labName,
            registrationNumber: labData.registrationNumber,
            licenseNumber: labData.licenseNumber,
            address: labData.address,
            phoneNumber: labData.phoneNumber,
            username: labData.username,
            email: labData.email,
            password: labData.password
        })
    }

    async registerHospitalAdmin(hospitalData) {
        // POST /api/register/hospital-admin - Registers a new hospital admin
        return this.client.post('/register/hospital-admin', {
            hospitalName: hospitalData.hospitalName,
            registrationNumber: hospitalData.registrationNumber,
            licenseNumber: hospitalData.licenseNumber,
            address: hospitalData.address,
            phoneNumber: hospitalData.phoneNumber,
            username: hospitalData.username,
            email: hospitalData.email,
            password: hospitalData.password
        })
    }

    // Hospital Admin methods
    async addDoctor(doctorData) {
        // POST /api/hospital/add-doctor - Add Doctor (Hospital Admin)
        return this.client.post('/hospital/add-doctor', doctorData)
    }

    // Profile methods
    async getProfile() {
        return this.client.get('/profile')
    }

    async updateProfile(profileData) {
        return this.client.put('/profile', profileData)
    }

    // Lab-specific methods
    async getLabProfile() {
        // GET /api/profile - Gets lab profile data for authenticated lab user
        return this.client.get('/profile')
    }

    // Lab Tests Management
    async getLabTests() {
        // GET /api/lab/test/all - Gets all tests for authenticated lab
        return this.client.get('/lab/test/all')
    }

    async createLabTest(testData) {
        // POST /api/lab/add-tests - Creates a new lab test
        return this.client.post('/lab/add-tests', testData)
    }

    async updateLabTest(testId, testData) {
        // PUT /api/lab/test/{id} - Updates an existing lab test
        return this.client.put(`/lab/test/${testId}`, testData)
    }

    // Lab Bookings Management
    async getLabBookings() {
        // GET /api/lab/bookings/all - Gets all bookings for authenticated lab
        return this.client.get('/lab/bookings/all')
    }

    async searchLabBookings(searchParams) {
        // GET /api/lab/bookings/search - Searches bookings by email, phone, or name
        const params = new URLSearchParams()
        if (searchParams.email) params.append('email', searchParams.email)
        if (searchParams.phone) params.append('phone', searchParams.phone)
        if (searchParams.name) params.append('name', searchParams.name)
        
        return this.client.get(`/lab/bookings/search?${params.toString()}`)
    }

    async markBookingCompleted(bookingId) {
        // POST /api/lab/bookings/{bookingId}/complete - Marks booking as completed
        return this.client.post(`/lab/bookings/${bookingId}/complete`)
    }

    // Lab Reports Management
    async uploadLabReport(bookingId, file) {
        // POST /api/lab/bookings/{bookingId}/upload - Uploads report file for booking
        const formData = new FormData()
        formData.append('file', file)
        
        return this.client.post(`/lab/bookings/${bookingId}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    async getMyReports() {
        // GET /api/reports/my - Gets all reports for authenticated user (patient side)
        return this.client.get('/reports/my')
    }

    async downloadReport(bookingId) {
        // GET /api/reports/download/{bookingId} - Downloads report file
        return this.client.get(`/reports/download/${bookingId}`, {
            responseType: 'blob'
        })
    }
}

export default new ApiService()