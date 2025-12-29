-- =====================================================
-- Gaming World - User Authentication Database Schema
-- =====================================================
-- Database: gaming_world
-- Purpose: Store user accounts with secure authentication
-- =====================================================

-- Create Database (if not exists)
CREATE DATABASE IF NOT EXISTS gaming_world;
USE gaming_world;

-- =====================================================
-- USERS TABLE - Main user accounts table
-- =====================================================
-- This table stores all user account information
-- Passwords are hashed with BCrypt (NOT plain text!)
-- =====================================================

CREATE TABLE IF NOT EXISTS users (
    -- Primary Key
    id BIGINT NOT NULL AUTO_INCREMENT,
    
    -- Login Credentials
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- BCrypt hashed password
    
    -- User Information
    country VARCHAR(100) DEFAULT NULL,
    profile_photo_url VARCHAR(255) DEFAULT NULL,
    
    -- Account Status & Role
    role VARCHAR(50) NOT NULL DEFAULT 'USER',  -- USER or ADMIN
    active BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Timestamps
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME DEFAULT NULL,
    
    -- Primary Key Constraint
    PRIMARY KEY (id),
    
    -- Indexes for faster queries
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- USER_SETTINGS TABLE - User preferences
-- =====================================================

CREATE TABLE IF NOT EXISTS user_settings (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    
    -- Privacy Settings
    profile_visibility VARCHAR(50) DEFAULT 'PUBLIC',
    show_online_status BOOLEAN DEFAULT TRUE,
    
    -- Notification Settings
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    
    -- Gaming Preferences
    preferred_genres VARCHAR(255) DEFAULT NULL,
    language_preference VARCHAR(10) DEFAULT 'en',
    
    -- Timestamps
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_settings (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- WALLET TABLE - User wallet for purchases
-- =====================================================

CREATE TABLE IF NOT EXISTS wallet (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    balance DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'USD',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_wallet (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- REWARD_WALLET TABLE - Reward points
-- =====================================================

CREATE TABLE IF NOT EXISTS reward_wallet (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    reward_points INT NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_reward_wallet (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- SAMPLE DATA - For Testing
-- =====================================================

-- Insert a test user (password is 'password123' hashed with BCrypt)
-- NOTE: In real application, passwords are hashed by the backend!
INSERT INTO users (username, email, password, country, role, active) VALUES
('Vamsee05', 'vamseek505@gmail.com', '$2a$10$8EqpMhDXJRx.X8L9kY3p7eZQxQxQxQxQxQxQxQxQxQxQxQxQxQx', 'India', 'USER', TRUE),
('admin', 'admin@gameverse.com', '$2a$10$8EqpMhDXJRx.X8L9kY3p7eZQxQxQxQxQxQxQxQxQxQxQxQxQx', 'USA', 'ADMIN', TRUE)
ON DUPLICATE KEY UPDATE username=username;

-- Create wallet for test user
INSERT INTO wallet (user_id, balance, currency)
SELECT id, 0.00, 'USD' FROM users WHERE username = 'Vamsee05'
ON DUPLICATE KEY UPDATE balance=balance;

-- Create reward wallet for test user
INSERT INTO reward_wallet (user_id, reward_points)
SELECT id, 0 FROM users WHERE username = 'Vamsee05'
ON DUPLICATE KEY UPDATE reward_points=reward_points;

-- =====================================================
-- USEFUL QUERIES
-- =====================================================

-- View all users (without passwords)
-- SELECT id, username, email, country, role, created_at, last_login FROM users;

-- Find user by username
-- SELECT * FROM users WHERE username = 'Vamsee05';

-- Find user by email
-- SELECT * FROM users WHERE email = 'vamseek505@gmail.com';

-- Count total active users
-- SELECT COUNT(*) as total_users FROM users WHERE active = TRUE;

-- View user with wallet balance
-- SELECT u.username, u.email, w.balance, w.currency 
-- FROM users u 
-- LEFT JOIN wallet w ON u.id = w.user_id
-- WHERE u.username = 'Vamsee05';

-- View user with reward points
-- SELECT u.username, u.email, r.reward_points 
-- FROM users u 
-- LEFT JOIN reward_wallet r ON u.id = r.user_id
-- WHERE u.username = 'Vamsee05';

-- =====================================================
-- HOW SIGN UP WORKS (Backend Process)
-- =====================================================
/*
1. User fills signup form with:
   - username: "Vamsee05"
   - email: "vamseek505@gmail.com"  
   - password: "mypassword123"
   - country: "India"

2. Backend receives the request

3. Password is hashed with BCrypt:
   Plain: "mypassword123"
   Hashed: "$2a$10$XgJX8h7kY3p7eZQ..." (60 characters)

4. User inserted into database:
   INSERT INTO users (username, email, password, country, role, active, created_at)
   VALUES ('Vamsee05', 'vamseek505@gmail.com', '$2a$10$...', 'India', 'USER', TRUE, NOW());

5. Wallet and Reward Wallet created automatically

6. JWT Token generated and returned to user
*/

-- =====================================================
-- HOW SIGN IN WORKS (Backend Process)
-- =====================================================
/*
1. User enters credentials:
   - username/email: "Vamsee05"
   - password: "mypassword123"

2. Backend finds user in database:
   SELECT * FROM users WHERE username = 'Vamsee05' OR email = 'Vamsee05';

3. Backend compares passwords using BCrypt:
   - Takes user input: "mypassword123"
   - Compares with stored hash: "$2a$10$..."
   - BCrypt can verify without storing plain password!

4. If match:
   - Update last_login: UPDATE users SET last_login = NOW() WHERE id = ?
   - Generate JWT token
   - Return user data + token

5. If no match:
   - Return error: "Invalid credentials"
*/

-- =====================================================
-- SECURITY NOTES
-- =====================================================
/*
✅ Passwords are NEVER stored in plain text
✅ BCrypt uses salt + hashing (very secure)
✅ Each password hash is unique even for same password
✅ JWT tokens used for authentication (not sessions)
✅ Unique constraints on username and email
✅ Foreign key constraints maintain data integrity
✅ Indexes for fast queries

⚠️  NEVER DO THIS:
   - Store passwords as plain text
   - Use MD5 or SHA1 for passwords (they're broken)
   - Share database credentials
   - Expose user passwords in logs or API responses
*/

-- =====================================================
-- END OF SCHEMA
-- =====================================================
