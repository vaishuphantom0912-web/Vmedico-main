# VMedico Frontend-Backend Integration Setup

## Prerequisites

1. **Backend Setup**
   - Ensure your Spring Boot backend is running on `http://localhost:8080`
   - MySQL database should be running and configured
   - All backend dependencies should be installed

2. **Frontend Setup**
   - Node.js and npm should be installed
   - Navigate to the frontend directory: `cd Vmedico-Frontend/vmedico`

## Installation Steps

### 1. Install Frontend Dependencies

```bash
cd Vmedico-Frontend/vmedico
npm install
```

This will install the new axios dependency along with existing ones.

### 2. Start the Backend

```bash
cd back-end/vmmedico
./mvnw spring-boot:run
```

Or if you're on Windows:
```bash
mvnw.cmd spring-boot:run
```

### 3. Start the Frontend

```bash
cd Vmedico-Frontend/vmedico
npm run dev
```

The frontend should start on `http://localhost:5173`

## Integration Features

### Login Integration
- **Endpoint**: `POST /api/login`
- **Features**:
  - Real backend authentication with JWT tokens
  - Role-based login (Patient, Doctor, Lab, Hospital Admin)
  - Fallback to demo credentials for development
  - Loading states and error handling

### Registration Integration
- **Endpoints**:
  - `POST /api/register/patient` - Patient registration
  - `POST /api/register/doctor` - Doctor registration  
  - `POST /api/register/lab` - Lab registration
  - `POST /api/register/hospital-admin` - Hospital Admin registration

- **Features**:
  - Form validation (email format, password strength, phone number)
  - Role-specific fields
  - Backend validation and error handling
  - Automatic redirect to login after successful registration

### API Service
- **Location**: `src/services/api.js`
- **Features**:
  - Axios-based HTTP client
  - Automatic JWT token handling
  - Request/response interceptors
  - Error handling and logging

## Testing the Integration

### 1. Test Registration
1. Go to `http://localhost:5173/register`
2. Select a role (Patient, Lab, or Corporate)
3. Fill in the required fields
4. Submit the form
5. Check for success message and automatic redirect

### 2. Test Login
1. Go to `http://localhost:5173/login`
2. Use credentials from a registered user
3. Or use demo credentials:
   - Patient: username=`patient`, password=`12345678`
   - Doctor: username=`doctor`, password=`12345678`
   - Lab: username=`lab`, password=`12345678`
   - Hospital: username=`hospital`, password=`12345678`

## Backend Requirements

Make sure your backend has these endpoints working:

- `POST /api/login` - Login endpoint
- `POST /api/register/patient` - Patient registration
- `POST /api/register/lab` - Lab registration  
- `POST /api/register/hospital-admin` - Hospital admin registration
- `POST /api/forgot-password` - Password recovery

## CORS Configuration

The backend should allow requests from `http://localhost:5173`. The `@CrossOrigin` annotation is already added to the RegisterController.

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure the backend has CORS configured for `http://localhost:5173`

2. **Connection Refused**: Ensure the backend is running on port 8080

3. **Database Errors**: Check MySQL connection and database configuration

4. **Validation Errors**: Check that all required fields are filled and meet validation criteria

5. **JWT Token Issues**: Check that the JWT configuration is working properly

### Debug Steps:

1. Check browser console for error messages
2. Check backend logs for API request details
3. Verify database connections and data
4. Test API endpoints directly using tools like Postman

## Next Steps

After successful integration, you can:

1. Add more sophisticated error handling
2. Implement password reset functionality
3. Add profile management features
4. Enhance form validation
5. Add loading states and better UX
6. Implement role-based routing guards