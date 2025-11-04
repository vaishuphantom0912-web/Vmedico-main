# VMedico Frontend-Backend Integration

## 🚀 Quick Start

### 1. Install Dependencies
Run the installation script:
```bash
# Windows
install-dependencies.bat

# Or manually:
cd Vmedico-Frontend/vmedico
npm install
```

### 2. Start Backend
```bash
cd back-end/vmmedico
./mvnw spring-boot:run
```

### 3. Start Frontend
```bash
cd Vmedico-Frontend/vmedico
npm run dev
```

## 🔧 What's Been Integrated

### ✅ Login System
- **File**: `src/pages/Login/Login.vue`
- **API Endpoint**: `POST /api/login`
- **Features**:
  - JWT token authentication
  - Role-based login (Patient, Doctor, Lab, Hospital)
  - Loading states and error handling
  - Demo credentials fallback

### ✅ Registration System
- **File**: `src/pages/Register/Register.vue`
- **API Endpoints**:
  - `POST /api/register/patient`
  - `POST /api/register/lab`
  - `POST /api/register/hospital-admin`
- **Features**:
  - Form validation
  - Role-specific fields
  - Backend integration with proper error handling

### ✅ API Service
- **File**: `src/services/api.js`
- **Features**:
  - Axios HTTP client
  - JWT token management
  - Request/response interceptors
  - Error handling

## 🧪 Testing

### Browser Console Testing
Open browser console and run:
```javascript
window.testVMedicoAPI()
```

This will test:
- Backend connection
- Login functionality
- Registration functionality

### Manual Testing

#### Login Test:
1. Go to `/login`
2. Try these demo credentials:
   - **Patient**: username=`patient`, password=`12345678`
   - **Doctor**: username=`doctor`, password=`12345678`
   - **Lab**: username=`lab`, password=`12345678`
   - **Hospital**: username=`hospital`, password=`12345678`

#### Registration Test:
1. Go to `/register`
2. Select role (Patient/Lab/Corporate)
3. Fill required fields:
   - Use `@gmail.com` email (backend requirement)
   - Password must have: capital letter, 8+ chars, special character
   - Phone must be 10 digits
4. Submit and check for success

## 📋 Backend Requirements

Your Spring Boot backend must have:

### Required Endpoints:
- `POST /api/login`
- `POST /api/register/patient`
- `POST /api/register/lab`
- `POST /api/register/hospital-admin`
- `POST /api/forgot-password`

### CORS Configuration:
```java
@CrossOrigin(origins = "http://localhost:5173")
```

### Expected Request/Response Format:

#### Login Request:
```json
{
  "usernameOrEmail": "user@gmail.com",
  "password": "password123",
  "role": "PATIENT"
}
```

#### Login Response:
```json
{
  "message": "Login successful",
  "data": {
    "username": "user123",
    "role": "PATIENT",
    "token": "jwt-token-here"
  }
}
```

#### Registration Request (Patient):
```json
{
  "username": "patient123",
  "password": "Password123@",
  "email": "patient@gmail.com",
  "phoneNumber": "9876543210",
  "name": "John Doe",
  "gender": "MALE",
  "dob": "1990-01-01",
  "address": "123 Main St",
  "bloodGroup": "O+",
  "emergencyContact": "9876543210"
}
```

## 🔍 Troubleshooting

### Common Issues:

1. **"Network Error" or CORS issues**
   - Ensure backend is running on port 8080
   - Check CORS configuration in backend
   - Verify `@CrossOrigin(origins = "http://localhost:5173")` is added

2. **"Registration failed" errors**
   - Check email format (must be @gmail.com)
   - Verify password meets requirements
   - Ensure phone number is exactly 10 digits
   - Check backend logs for validation errors

3. **Login not working**
   - Verify user exists in database
   - Check password encoding matches
   - Ensure role mapping is correct

4. **JWT token issues**
   - Check JWT configuration in backend
   - Verify token generation and validation

### Debug Steps:

1. **Check browser console** for JavaScript errors
2. **Check Network tab** in browser dev tools for API calls
3. **Check backend logs** for request details and errors
4. **Test API directly** using Postman or curl
5. **Run test function** in browser console: `window.testVMedicoAPI()`

## 📁 File Structure

```
Vmedico-Frontend/vmedico/src/
├── services/
│   └── api.js                 # API service with axios
├── pages/
│   ├── Login/
│   │   └── Login.vue         # Updated login component
│   └── Register/
│       └── Register.vue      # Updated register component
├── utils/
│   └── testApi.js           # API testing utilities
└── main.js                  # Updated with test functions
```

## 🔄 Data Flow

### Login Flow:
1. User enters credentials in frontend
2. Frontend sends POST to `/api/login`
3. Backend validates and returns JWT token
4. Frontend stores token and redirects to dashboard

### Registration Flow:
1. User fills registration form
2. Frontend validates form data
3. Frontend sends POST to appropriate register endpoint
4. Backend validates and creates user
5. Frontend shows success and redirects to login

## 🛡️ Security Features

- JWT token authentication
- Password strength validation
- Email format validation
- Phone number validation
- Role-based access control
- CORS protection

## 📈 Next Steps

After successful integration:

1. **Enhanced Error Handling**: Add more specific error messages
2. **Loading States**: Improve UX with better loading indicators
3. **Form Validation**: Add real-time validation feedback
4. **Password Reset**: Implement forgot password functionality
5. **Profile Management**: Add user profile editing
6. **Route Guards**: Implement authentication guards for protected routes
7. **Token Refresh**: Add automatic token refresh logic

## 🆘 Support

If you encounter issues:

1. Check this README first
2. Run the test function: `window.testVMedicoAPI()`
3. Check browser console and network tab
4. Verify backend is running and accessible
5. Check backend logs for detailed error information

The integration provides a solid foundation for your VMedico application with proper authentication, registration, and API communication between your Vue.js frontend and Spring Boot backend.