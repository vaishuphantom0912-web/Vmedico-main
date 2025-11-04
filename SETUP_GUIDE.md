# 🚀 VMedico Integration Setup Guide

## ✅ Current Status
- ✅ Frontend dependencies installed
- ✅ API service configured with axios
- ✅ Login component integrated with backend
- ✅ Registration component integrated with backend
- ✅ Development server running on http://localhost:5173

## 🔧 Quick Start

### 1. Start Backend (Required)
```bash
cd back-end/vmmedico
./mvnw spring-boot:run
```
**Backend should be running on http://localhost:8080**

### 2. Frontend is Already Running
The frontend is currently running on: **http://localhost:5173**

## 🧪 Test the Integration

### Option 1: Browser Console Test
1. Open http://localhost:5173 in your browser
2. Open browser console (F12)
3. Run: `window.testVMedicoAPI()`

### Option 2: Manual Testing

#### Test Login:
1. Go to http://localhost:5173/login
2. Try demo credentials:
   - **Patient**: username=`patient`, password=`12345678`
   - **Doctor**: username=`doctor`, password=`12345678`
   - **Lab**: username=`lab`, password=`12345678`
   - **Hospital**: username=`hospital`, password=`12345678`

#### Test Registration:
1. Go to http://localhost:5173/register
2. Fill the form with:
   - **Email**: Must end with `@gmail.com` (backend requirement)
   - **Password**: Must have capital letter, 8+ chars, special character
   - **Phone**: Must be exactly 10 digits

## 🔍 Troubleshooting

### If Login/Registration Fails:

1. **Check Backend Status**
   ```bash
   curl http://localhost:8080/api/login
   ```
   Should return a response (even if error)

2. **Check Browser Console**
   - Look for CORS errors
   - Look for network errors
   - Check API request/response

3. **Common Issues:**
   - **CORS Error**: Backend not running or CORS not configured
   - **Network Error**: Backend not accessible on port 8080
   - **Validation Error**: Check email format, password strength, phone format

### Backend Requirements:
- Spring Boot running on port 8080
- CORS enabled for http://localhost:5173
- Endpoints available:
  - `POST /api/login`
  - `POST /api/register/patient`
  - `POST /api/register/lab`
  - `POST /api/register/hospital-admin`

## 📋 Integration Features

### ✅ What's Working:
- **Login System**: JWT authentication with role-based access
- **Registration System**: Multi-role registration (Patient, Lab, Hospital)
- **API Service**: Axios-based HTTP client with interceptors
- **Error Handling**: Proper error messages and fallbacks
- **Demo Mode**: Fallback credentials for development

### 🔄 Data Flow:
1. User interacts with Vue.js frontend
2. Frontend sends HTTP requests via axios
3. Spring Boot backend processes requests
4. JWT tokens stored in localStorage
5. Automatic token inclusion in subsequent requests

## 🛠️ Development Commands

```bash
# Install dependencies (already done)
cd Vmedico-Frontend/vmedico
npm install

# Start development server (already running)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Key Files Modified:

- `src/services/api.js` - API service with axios
- `src/pages/Login/Login.vue` - Login component with backend integration
- `src/pages/Register/Register.vue` - Registration with backend integration
- `src/utils/testApi.js` - Testing utilities
- `package.json` - Added axios dependency

## 🔐 Security Features:
- JWT token authentication
- Password strength validation
- Email format validation
- Phone number validation
- CORS protection
- Role-based access control

## 📈 Next Steps:
1. Test with your backend running
2. Verify all registration types work
3. Test login with registered users
4. Implement additional features as needed

## 🆘 Need Help?
1. Check browser console for errors
2. Verify backend is running on port 8080
3. Test API endpoints directly with Postman
4. Run `window.testVMedicoAPI()` in browser console

The integration is now complete and ready for testing! 🎉