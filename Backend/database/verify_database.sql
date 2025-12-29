-- =====================================================
-- VERIFY YOUR DATABASE SETUP
-- Run these queries to check everything is working!
-- =====================================================

USE gaming_world;

-- 1. Check if users table exists
SHOW TABLES LIKE 'users';

-- 2. View table structure
DESCRIBE users;

-- 3. View all registered users (safe - no passwords shown)
SELECT 
    id,
    username,
    email,
    country,
    role,
    active,
    created_at,
    last_login
FROM users
ORDER BY created_at DESC;

-- 4. Count total users
SELECT COUNT(*) as total_users FROM users;

-- 5. Count users registered today
SELECT COUNT(*) as users_today 
FROM users 
WHERE DATE(created_at) = CURDATE();

-- 6. View a specific user (by username)
SELECT 
    id,
    username,
    email,
    country,
    role,
    created_at,
    last_login
FROM users 
WHERE username = 'Vamsee05';

-- 7. Check user's wallet balance
SELECT 
    u.username,
    u.email,
    w.balance as wallet_balance,
    w.currency,
    r.reward_points
FROM users u
LEFT JOIN wallet w ON u.id = w.user_id
LEFT JOIN reward_wallet r ON u.id = r.user_id
WHERE u.username = 'Vamsee05';

-- 8. View latest 10 registered users
SELECT 
    username,
    email,
    country,
    created_at
FROM users
ORDER BY created_at DESC
LIMIT 10;

-- 9. Check if a username is available
SELECT 
    CASE 
        WHEN COUNT(*) > 0 THEN 'Username already taken'
        ELSE 'Username available'
    END as status
FROM users
WHERE username = 'TestUser123';

-- 10. Check if an email is registered
SELECT 
    CASE 
        WHEN COUNT(*) > 0 THEN 'Email already registered'
        ELSE 'Email available'
    END as status
FROM users
WHERE email = 'test@example.com';

-- =====================================================
-- MANUALLY TEST SIGNUP (For Learning)
-- =====================================================
-- NOTE: This is just for understanding!
-- Real signups go through the backend API which hashes the password!

-- Example: Create a test user manually
/*
INSERT INTO users (username, email, password, country, role, active, created_at)
VALUES (
    'TestUser',
    'testuser@example.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- This is 'password' hashed
    'India',
    'USER',
    TRUE,
    NOW()
);

-- Create wallet for new user
INSERT INTO wallet (user_id, balance, currency)
SELECT id, 0.00, 'USD' FROM users WHERE username = 'TestUser';

-- Create reward wallet for new user
INSERT INTO reward_wallet (user_id, reward_points)
SELECT id, 0 FROM users WHERE username = 'TestUser';
*/

-- =====================================================
-- DELETE TEST DATA (Use with caution!)
-- =====================================================

-- Delete a specific test user (and all related data via CASCADE)
-- DELETE FROM users WHERE username = 'TestUser';

-- Delete all users (⚠️ DANGER - This removes ALL accounts!)
-- DELETE FROM users;

-- Reset auto-increment counter
-- ALTER TABLE users AUTO_INCREMENT = 1;

-- =====================================================
-- BACKUP YOUR DATA
-- =====================================================

-- To backup your database, run this in terminal:
-- mysqldump -u root -p gaming_world > gaming_world_backup.sql

-- To restore from backup:
-- mysql -u root -p gaming_world < gaming_world_backup.sql
