-- =====================================================
-- GAMING WORLD - COMPLETE DATABASE SCHEMA
-- =====================================================
-- Run this entire file in MySQL to create all databases
-- Author: Gaming World Team
-- Date: 2025-12-29
-- =====================================================

-- Create and use database
DROP DATABASE IF EXISTS gaming_world;
CREATE DATABASE gaming_world CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gaming_world;

-- =====================================================
-- 1. USER ACCOUNT & AUTHENTICATION
-- =====================================================

-- Users table - Main user accounts
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- BCrypt hashed
    country VARCHAR(100),
    profile_photo_url VARCHAR(500),
    role ENUM('USER', 'ADMIN', 'DEVELOPER', 'PUBLISHER') DEFAULT 'USER',
    active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_active (active)
) ENGINE=InnoDB;

-- User settings
CREATE TABLE user_settings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    profile_visibility ENUM('PUBLIC', 'FRIENDS_ONLY', 'PRIVATE') DEFAULT 'PUBLIC',
    show_online_status BOOLEAN DEFAULT TRUE,
    show_game_activity BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    marketing_emails BOOLEAN DEFAULT FALSE,
    preferred_language VARCHAR(10) DEFAULT 'en',
    theme ENUM('LIGHT', 'DARK', 'AUTO') DEFAULT 'DARK',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_settings (user_id)
) ENGINE=InnoDB;

-- Login tokens (for session management)
CREATE TABLE login_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    token VARCHAR(500) NOT NULL,
    token_type ENUM('ACCESS', 'REFRESH') DEFAULT 'ACCESS',
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    revoked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token(255)),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB;

-- Security logs
CREATE TABLE security_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    event_type ENUM('LOGIN', 'LOGOUT', 'PASSWORD_CHANGE', 'FAILED_LOGIN', 'ACCOUNT_LOCKED') NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    location VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_security (user_id, created_at)
) ENGINE=InnoDB;

-- =====================================================
-- 2. GAME LIBRARY / CATALOG
-- =====================================================

-- Publishers
CREATE TABLE publishers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    website VARCHAR(500),
    description TEXT,
    logo_url VARCHAR(500),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_publisher_name (name)
) ENGINE=InnoDB;

-- Developers
CREATE TABLE developers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    website VARCHAR(500),
    description TEXT,
    logo_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_developer_name (name)
) ENGINE=InnoDB;

-- Game genres
CREATE TABLE genres (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_genre_slug (slug)
) ENGINE=InnoDB;

-- Games (main catalog)
CREATE TABLE games (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(300) NOT NULL,
    description TEXT,
    long_description LONGTEXT,
    publisher_id BIGINT,
    developer_id BIGINT,
    release_date DATE,
    price DECIMAL(10,2) DEFAULT 0.00,
    discount_percentage INT DEFAULT 0,
    final_price DECIMAL(10,2) GENERATED ALWAYS AS (price * (1 - discount_percentage / 100)) STORED,
    thumbnail_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    trailer_url VARCHAR(500),
    system_requirements JSON,
    age_rating VARCHAR(20),
    file_size_gb DECIMAL(8,2),
    status ENUM('COMING_SOON', 'AVAILABLE', 'EARLY_ACCESS', 'DELISTED') DEFAULT 'AVAILABLE',
    featured BOOLEAN DEFAULT FALSE,
    downloads_count INT DEFAULT 0,
    rating_average DECIMAL(3,2) DEFAULT 0.00,
    rating_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (publisher_id) REFERENCES publishers(id) ON DELETE SET NULL,
    FOREIGN KEY (developer_id) REFERENCES developers(id) ON DELETE SET NULL,
    UNIQUE KEY uk_game_slug (slug),
    INDEX idx_price (price),
    INDEX idx_rating (rating_average),
    INDEX idx_status (status),
    FULLTEXT KEY ft_search (title, description)
) ENGINE=InnoDB;

-- Game genres mapping
CREATE TABLE game_genres (
    game_id BIGINT NOT NULL,
    genre_id BIGINT NOT NULL,
    PRIMARY KEY (game_id, genre_id),
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Game images (screenshots, etc.)
CREATE TABLE game_images (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    game_id BIGINT NOT NULL,
    url VARCHAR(500) NOT NULL,
    type ENUM('SCREENSHOT', 'BANNER', 'LOGO', 'ICON') DEFAULT 'SCREENSHOT',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    INDEX idx_game_type (game_id, type)
) ENGINE=InnoDB;

-- DLC / Downloadable Content
CREATE TABLE dlc (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    game_id BIGINT NOT NULL,
    name VARCHAR(300) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) DEFAULT 0.00,
    discount_percentage INT DEFAULT 0,
    release_date DATE,
    thumbnail_url VARCHAR(500),
    file_size_gb DECIMAL(8,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    INDEX idx_game_dlc (game_id)
) ENGINE=InnoDB;

-- Game tags (for better search)
CREATE TABLE tags (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    UNIQUE KEY uk_tag_slug (slug)
) ENGINE=InnoDB;

CREATE TABLE game_tags (
    game_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    PRIMARY KEY (game_id, tag_id),
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================
-- 3. TRANSACTIONS & PURCHASES
-- =====================================================

-- User wallet
CREATE TABLE wallet (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    balance DECIMAL(10,2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_wallet (user_id)
) ENGINE=InnoDB;

-- Wallet transactions
CREATE TABLE wallet_transactions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    wallet_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    type ENUM('CREDIT', 'DEBIT', 'PURCHASE', 'REFUND', 'REWARD') NOT NULL,
    description VARCHAR(500),
    reference_id VARCHAR(200),
    balance_after DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallet(id) ON DELETE CASCADE,
    INDEX idx_wallet_date (wallet_id, created_at)
) ENGINE=InnoDB;

-- Orders
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    total_amount DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    final_amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('WALLET', 'CREDIT_CARD', 'PAYPAL', 'CRYPTO') NOT NULL,
    payment_status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_orders (user_id),
    INDEX idx_order_status (payment_status)
) ENGINE=InnoDB;

-- Order items
CREATE TABLE order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    game_id BIGINT,
    dlc_id BIGINT,
    item_name VARCHAR(300) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    discount_percentage INT DEFAULT 0,
    final_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE SET NULL,
    FOREIGN KEY (dlc_id) REFERENCES dlc(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Payment methods
CREATE TABLE payment_methods (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    type ENUM('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'BANK_ACCOUNT') NOT NULL,
    last_four VARCHAR(4),
    card_brand VARCHAR(50),
    expiry_month INT,
    expiry_year INT,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_payments (user_id)
) ENGINE=InnoDB;

-- Coupons
CREATE TABLE coupons (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount_type ENUM('PERCENTAGE', 'FIXED_AMOUNT') NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    min_purchase_amount DECIMAL(10,2) DEFAULT 0.00,
    max_uses INT,
    used_count INT DEFAULT 0,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    INDEX idx_code (code)
) ENGINE=InnoDB;

-- Coupon usage
CREATE TABLE coupon_usage (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    coupon_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    order_id BIGINT,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
    UNIQUE KEY uk_user_coupon_order (user_id, coupon_id, order_id)
) ENGINE=InnoDB;

-- =====================================================
-- 4. USER LIBRARY (Owned Games)
-- =====================================================

CREATE TABLE user_library (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    game_id BIGINT NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_played TIMESTAMP NULL,
    playtime_minutes INT DEFAULT 0,
    installed BOOLEAN DEFAULT FALSE,
    favorite BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_game (user_id, game_id),
    INDEX idx_user_library (user_id)
) ENGINE=InnoDB;

-- User game preferences
CREATE TABLE user_game_preferences (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    game_id BIGINT NOT NULL,
    settings JSON,  -- Custom game settings
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_game_pref (user_id, game_id)
) ENGINE=InnoDB;

-- =====================================================
-- 5. CLOUD SAVES
-- =====================================================

CREATE TABLE cloud_saves (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    game_id BIGINT NOT NULL,
    save_name VARCHAR(200),
    save_data LONGBLOB,  -- Or reference to S3/cloud storage
    file_path VARCHAR(500),  -- If using cloud storage
    file_size_kb INT,
    checksum VARCHAR(64),  -- For integrity verification
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    INDEX idx_user_game_saves (user_id, game_id)
) ENGINE=InnoDB;

-- =====================================================
-- 6. FRIENDS & SOCIAL
-- =====================================================

-- Friends
CREATE TABLE friendships (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    friend_id BIGINT NOT NULL,
    status ENUM('PENDING', 'ACCEPTED', 'BLOCKED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_friendship (user_id, friend_id),
    INDEX idx_user_friends (user_id, status)
) ENGINE=InnoDB;

-- Groups/Communities
CREATE TABLE communities (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    owner_id BIGINT NOT NULL,
    member_count INT DEFAULT 0,
    privacy ENUM('PUBLIC', 'PRIVATE', 'INVITE_ONLY') DEFAULT 'PUBLIC',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_community_name (name)
) ENGINE=InnoDB;

-- Community members
CREATE TABLE community_members (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    community_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    role ENUM('OWNER', 'ADMIN', 'MEMBER') DEFAULT 'MEMBER',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_community_user (community_id, user_id)
) ENGINE=InnoDB;

-- Messages/Chat
CREATE TABLE messages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sender_id BIGINT NOT NULL,
    recipient_id BIGINT,
    community_id BIGINT,
    message TEXT NOT NULL,
    read_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE,
    INDEX idx_recipient_read (recipient_id, read_status),
    INDEX idx_community_messages (community_id, created_at)
) ENGINE=InnoDB;

-- Activity feed
CREATE TABLE activity_feed (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    activity_type ENUM('GAME_PURCHASED', 'ACHIEVEMENT_UNLOCKED', 'LEVEL_UP', 'REVIEW_POSTED', 'FRIEND_ADDED') NOT NULL,
    content TEXT,
    game_id BIGINT,
    visibility ENUM('PUBLIC', 'FRIENDS_ONLY', 'PRIVATE') DEFAULT 'PUBLIC',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE SET NULL,
    INDEX idx_user_activity (user_id, created_at)
) ENGINE=InnoDB;

-- =====================================================
-- 7. ACHIEVEMENTS & LEADERBOARDS
-- =====================================================

-- Achievements
CREATE TABLE achievements (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    game_id BIGINT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    icon_url VARCHAR(500),
    points INT DEFAULT 0,
    rarity ENUM('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY') DEFAULT 'COMMON',
    unlock_criteria JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    INDEX idx_game_achievements (game_id)
) ENGINE=InnoDB;

-- User achievements
CREATE TABLE user_achievements (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    achievement_id BIGINT NOT NULL,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress INT DEFAULT 100,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_achievement (user_id, achievement_id),
    INDEX idx_user_unlocks (user_id)
) ENGINE=InnoDB;

-- Leaderboards
CREATE TABLE leaderboards (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    game_id BIGINT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    type ENUM('GLOBAL', 'DAILY', 'WEEKLY', 'MONTHLY', 'SEASONAL') DEFAULT 'GLOBAL',
    metric VARCHAR(100),  -- e.g., 'score', 'time', 'kills'
    sort_order ENUM('ASC', 'DESC') DEFAULT 'DESC',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Leaderboard entries
CREATE TABLE leaderboard_entries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    leaderboard_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    score BIGINT NOT NULL,
    rank_position INT,
    metadata JSON,  -- Additional data like play session, difficulty, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (leaderboard_id) REFERENCES leaderboards(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_leaderboard_rank (leaderboard_id, score DESC),
    INDEX idx_user_scores (user_id, leaderboard_id)
) ENGINE=InnoDB;

-- Reward wallet (points, badges)
CREATE TABLE reward_wallet (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    reward_points INT DEFAULT 0,
    level INT DEFAULT 1,
    experience_points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_reward (user_id)
) ENGINE=InnoDB;

-- Reward history
CREATE TABLE reward_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    points_earned INT NOT NULL,
    reason VARCHAR(500),
    source ENUM('ACHIEVEMENT', 'PURCHASE', 'REFERRAL', 'EVENT', 'DAILY_LOGIN') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_rewards (user_id, created_at)
) ENGINE=InnoDB;

-- =====================================================
-- 8. REVIEWS & RATINGS
-- =====================================================

CREATE TABLE reviews (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    game_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    recommended BOOLEAN DEFAULT TRUE,
    playtime_minutes INT,
    helpful_count INT DEFAULT 0,
    unhelpful_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_game_review (user_id, game_id),
    INDEX idx_game_reviews (game_id, rating)
) ENGINE=InnoDB;

-- Review helpfulness votes
CREATE TABLE review_votes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    review_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    vote_type ENUM('HELPFUL', 'UNHELPFUL') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_review_vote (user_id, review_id)
) ENGINE=InnoDB;

-- =====================================================
-- 9. NOTIFICATIONS
-- =====================================================

CREATE TABLE notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    type ENUM('GAME_UPDATE', 'FRIEND_REQUEST', 'MESSAGE', 'ACHIEVEMENT', 'SALE', 'SYSTEM') NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT,
    link_url VARCHAR(500),
    read_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_notifications (user_id, read_status, created_at)
) ENGINE=InnoDB;

-- =====================================================
-- 10. SUPPORT TICKETS
-- =====================================================

CREATE TABLE support_tickets (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    ticket_number VARCHAR(50) NOT NULL UNIQUE,
    subject VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('TECHNICAL', 'BILLING', 'ACCOUNT', 'GAME_ISSUE', 'REFUND', 'OTHER') NOT NULL,
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') DEFAULT 'MEDIUM',
    status ENUM('OPEN', 'IN_PROGRESS', 'WAITING_USER', 'RESOLVED', 'CLOSED') DEFAULT 'OPEN',
    assigned_to BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_tickets (user_id, status)
) ENGINE=InnoDB;

-- Ticket replies
CREATE TABLE ticket_replies (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    ticket_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    message TEXT NOT NULL,
    is_staff_reply BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_ticket_replies (ticket_id, created_at)
) ENGINE=InnoDB;

-- =====================================================
-- 11. ANALYTICS & LOGS
-- =====================================================

-- User session logs
CREATE TABLE session_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    session_id VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP NULL,
    duration_minutes INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_session (session_id),
    INDEX idx_user_sessions (user_id, started_at)
) ENGINE=InnoDB;

-- Game activity logs
CREATE TABLE game_activity_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    game_id BIGINT,
    activity_type ENUM('STARTED', 'STOPPED', 'ACHIEVEMENT', 'PURCHASE_DLC') NOT NULL,
    duration_minutes INT,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE SET NULL,
    INDEX idx_user_game_activity (user_id, game_id, created_at)
) ENGINE=InnoDB;

-- Download tracking
CREATE TABLE download_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    game_id BIGINT,
    download_started TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    download_completed TIMESTAMP NULL,
    file_size_mb DECIMAL(10,2),
    download_speed_mbps DECIMAL(10,2),
    server_location VARCHAR(100),
    status ENUM('IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELLED') DEFAULT 'IN_PROGRESS',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE SET NULL,
    INDEX idx_download_status (status, download_started)
) ENGINE=InnoDB;

-- =====================================================
-- 12. WISHLISTS
-- =====================================================

CREATE TABLE wishlists (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    game_id BIGINT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notify_on_sale BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_game_wish (user_id, game_id),
    INDEX idx_user_wishlist (user_id)
) ENGINE=InnoDB;

-- =====================================================
-- 13. SHOPPING CART
-- =====================================================

CREATE TABLE cart_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    game_id BIGINT,
    dlc_id BIGINT,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (dlc_id) REFERENCES dlc(id) ON DELETE CASCADE,
    INDEX idx_user_cart (user_id)
) ENGINE=InnoDB;

-- =====================================================
-- 14. REDEEM CODES
-- =====================================================

CREATE TABLE redeem_codes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(100) NOT NULL UNIQUE,
    game_id BIGINT,
    dlc_id BIGINT,
    max_redemptions INT DEFAULT 1,
    redemption_count INT DEFAULT 0,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE SET NULL,
    FOREIGN KEY (dlc_id) REFERENCES dlc(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_code (code)
) ENGINE=InnoDB;

-- Redeemed codes tracking
CREATE TABLE redeemed_codes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (code_id) REFERENCES redeem_codes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_code (user_id, code_id)
) ENGINE=InnoDB;

-- =====================================================
-- DATABASE COMPLETE!
-- =====================================================
-- Total: 40+ tables covering all aspects of a gaming platform
-- =====================================================
