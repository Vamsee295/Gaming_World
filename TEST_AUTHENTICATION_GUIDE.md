# 🎮 Gaming World - Authentication Testing Guide

## Prerequisites Checklist

### 1. MySQL Database Setup
- [ ] MySQL Server is running (Check in Task Manager or Services)
- [ ] Database: `gaming_world` exists
- [ ] Connection Details (from `application.properties`):
  - Host: `localhost`
  - Port: `3306`
  - Database: `Gaming_World` or `gaming_world`
  - Username: `root`
  - Password: `Vamsee_29`

### 2. Verify Database Schema

Open MySQL Workbench and run:

```sql
USE gaming_world;

-- Check if users table exists
SHOW TABLES;

-- View users table structure
DESCRIBE users;

-- View existing users
SELECT id, username, email, country, role, created_at FROM users;
```

### 3. Start the Backend

**Option A: Using Command Prompt (Recommended)**
```cmd
cd "X:\HTML , CSS & JAVA SCRIPT\Gaming_World\Backend"
mvnw.cmd spring-boot:run
```

**Option B: Using the start script**
```cmd
cd "X:\HTML , CSS & JAVA SCRIPT\Gaming_World\Backend"
start-backend.bat
```

**Wait for this message:**
```
Started BackendApplication in X.XXX seconds
```

The backend should be running on: `http://localhost:8081`

### 4. Test Authentication

**Option A: Using the Test HTML Page**
1. Open `Backend\test-auth.html` in your browser
2. Click "Test Signup" to create a new account
3. Click "Test Login" to login with existing credentials

**Option B: Using curl**
```bash
# Test Signup
curl -X POST http://localhost:8081/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"TestUser123\",\"email\":\"test@example.com\",\"password\":\"password123\",\"country\":\"India\"}"

# Test Login
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"usernameOrEmail\":\"TestUser123\",\"password\":\"password123\"}"
```

**Option C: Using the Frontend**
1. Ensure Frontend is running: `npm run dev` (in Frontend directory)
2. Visit: `http://localhost:3000/auth/signup`
3. Fill the form and submit
4. Visit: `http://localhost:3000/auth/login`

## How Authentication Works

### Signup Flow:
1. User enters: username, email, password, country
2. Backend checks if username/email already exists
3. Password is hashed using BCrypt
4. User is saved to MySQL `users` table
5. User settings, wallet, and reward wallet are automatically created
6. JWT token is generated and returned
7. Frontend stores token in localStorage

### Login Flow:
1. User enters: username or email, and password
2. Backend verifies credentials against MySQL database
3. If valid, JWT token is generated
4. Token is returned to frontend
5. Frontend stores token and redirects to dashboard

### Database Tables Involved:
- `users` - Main user accounts
- `user_settings` - User preferences
- `wallet` - User's monetary wallet
- `reward_wallet` - Reward points system

## Troubleshooting

### Backend won't start
1. Check if port 8081 is already in use:
   ```cmd
   netstat -ano | findstr :8081
   ```
2. Check if Java is installed:
   ```cmd
   java -version
   ```

### Database Connection Error
1. Verify MySQL is running
2. Check credentials in `Backend\src\main\resources\application.properties`
3. Try connecting via MySQL Workbench with same credentials

### Authentication Fails
1. Check backend logs for errors
2. Verify the user exists in database:
   ```sql
   SELECT * FROM users WHERE username = 'YourUsername';
   ```
3. Check if password was hashed correctly (should start with `$2a$`)

## Testing Checklist

- [ ] Backend starts successfully on port 8081
- [ ] Can connect to MySQL database
- [ ] Can create new user (signup)
- [ ] User appears in MySQL `users` table
- [ ] Can login with created user
- [ ] JWT token is returned
- [ ] Duplicate username/email is rejected
- [ ] Invalid credentials are rejected
- [ ] Frontend can communicate with backend

## API Endpoints

### Signup
- **URL**: `POST http://localhost:8081/api/auth/signup`
- **Body**:
  ```json
  {
    "username": "string (min 3 chars)",
    "email": "valid email",
    "password": "string (min 6 chars)",
    "country": "string (optional)"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "token": "eyJhbGc...",
    "userId": 1,
    "username": "TestUser",
    "email": "test@example.com",
    "role": "USER"
  }
  ```

### Login
- **URL**: `POST http://localhost:8081/api/auth/login`
- **Body**:
  ```json
  {
    "usernameOrEmail": "username or email",
    "password": "password"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "token": "eyJhbGc...",
    "userId": 1,
    "username": "TestUser",
    "email": "test@example.com",
    "role": "USER"
  }
  ```

## Sample Test Data

Use these credentials to test (if sample data was loaded):

- **Username**: `Vamsee05`
- **Email**: `vamseek505@gmail.com`
- **Password**: `password123`

Or create a new test user:
- **Username**: `TestGamer`
- **Email**: `testgamer@example.com`
- **Password**: `test12345`
- **Country**: `India`

## Next Steps After Successful Testing

1. ✅ Authentication working
2. Test game browsing and purchasing
3. Test wallet transactions
4. Test achievement system
5. Test friend system
6. Deploy to production

## Support

If you encounter any issues:
1. Check the backend console for error messages
2. Check MySQL logs
3. Verify all prerequisites are met
4. Review the application.properties configuration

