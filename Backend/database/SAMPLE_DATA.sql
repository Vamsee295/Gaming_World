-- =====================================================
-- SAMPLE DATA FOR TESTING
-- Run this AFTER creating the database schema
-- =====================================================

USE gaming_world;

-- =====================================================
-- 1. INSERT SAMPLE PUBLISHERS & DEVELOPERS
-- =====================================================

INSERT INTO publishers (name, website, description, verified) VALUES
('Epic Games', 'https://epicgames.com', 'Major game publisher and platform', TRUE),
('Ubisoft', 'https://ubisoft.com', 'Global video game publisher', TRUE),
('EA (Electronic Arts)', 'https://ea.com', 'Leading game developer and publisher', TRUE),
('Activision', 'https://activision.com', 'Premier interactive entertainment company', TRUE),
('Valve', 'https://valvesoftware.com', 'Developer and digital distribution company', TRUE);

INSERT INTO developers (name, website, description) VALUES
('Epic Games', 'https://epicgames.com', 'Creator of Unreal Engine and Fortnite'),
('Ubisoft Montreal', 'https://ubisoft.com', 'Major game development studio'),
('DICE', 'https://dice.se', 'Battlefield developers'),
('Rockstar Games', 'https://rockstargames.com', 'GTA and Red Dead developers'),
('CD Projekt Red', 'https://cdprojektred.com', 'The Witcher and Cyberpunk developers');

-- =====================================================
-- 2. INSERT GENRES & TAGS
-- =====================================================

INSERT INTO genres (name, slug, description) VALUES
('Action', 'action', 'Fast-paced combat and gameplay'),
('Adventure', 'adventure', 'Story-driven exploration games'),
('RPG', 'rpg', 'Role-playing games with character progression'),
('Strategy', 'strategy', 'Tactical and strategic thinking games'),
('Simulation', 'simulation', 'Real-world or fictional simulations'),
('Sports', 'sports', 'Athletic and competitive sports games'),
('Racing', 'racing', 'High-speed racing games'),
('Horror', 'horror', 'Scary and suspenseful games'),
('Puzzle', 'puzzle', 'Brain-teasing puzzle games'),
('MMORPG', 'mmorpg', 'Massively multiplayer online RPGs');

INSERT INTO tags (name, slug) VALUES
('Multiplayer', 'multiplayer'),
('Singleplayer', 'singleplayer'),
('Co-op', 'coop'),
('Open World', 'open-world'),
('First-Person', 'first-person'),
('Third-Person', 'third-person'),
('Battle Royale', 'battle-royale'),
('Survival', 'survival'),
('Story Rich', 'story-rich'),
('Competitive', 'competitive');

-- =====================================================
-- 3. INSERT SAMPLE GAMES
-- =====================================================

INSERT INTO games (title, slug, description, long_description, publisher_id, developer_id, 
                   release_date, price, discount_percentage, thumbnail_url, cover_image_url,
                   age_rating, file_size_gb, status, featured, rating_average) VALUES

('Fortnite', 'fortnite', 'Battle Royale phenomenon', 
 'Epic Games\' free-to-play battle royale where 100 players fight to be the last one standing.',
 1, 1, '2017-07-25', 0.00, 0, 'https://example.com/fortnite-thumb.jpg', 'https://example.com/fortnite-cover.jpg',
 'T', 35.5, 'AVAILABLE', TRUE, 4.5),

('Grand Theft Auto V', 'gta-v', 'Open-world action-adventure masterpiece',
 'Experience the sprawling open world of Los Santos and Blaine County in this critically acclaimed game.',
 5, 4, '2013-09-17', 29.99, 50, 'https://example.com/gta5-thumb.jpg', 'https://example.com/gta5-cover.jpg',
 'M', 72.0, 'AVAILABLE', TRUE, 4.8),

('Cyberpunk 2077', 'cyberpunk-2077', 'Futuristic open-world RPG',
 'Become a cyberpunk mercenary in Night City, a vibrant futuristic metropolis.',
 5, 5, '2020-12-10', 59.99, 20, 'https://example.com/cyberpunk-thumb.jpg', 'https://example.com/cyberpunk-cover.jpg',
 'M', 70.0, 'AVAILABLE', TRUE, 4.2),

('The Witcher 3', 'witcher-3', 'Fantasy RPG epic',
 'Play as Geralt of Rivia, a monster hunter in a stunning open world.',
 5, 5, '2015-05-19', 39.99, 75, 'https://example.com/witcher-thumb.jpg', 'https://example.com/witcher-cover.jpg',
 'M', 50.0, 'AVAILABLE', TRUE, 4.9),

('Minecraft', 'minecraft', 'Sandbox building game',
 'Build, explore, and survive in procedurally generated worlds.',
 1, 1, '2011-11-18', 26.95, 0, 'https://example.com/minecraft-thumb.jpg', 'https://example.com/minecraft-cover.jpg',
 'E10+', 1.0, 'AVAILABLE', TRUE, 4.7);

-- Link games to genres
INSERT INTO game_genres (game_id, genre_id) VALUES
(1, 1), (1, 7),  -- Fortnite: Action, Battle Royale
(2, 1), (2, 2),  -- GTA V: Action, Adventure
(3, 1), (3, 3),  -- Cyberpunk: Action, RPG
(4, 3), (4, 2),  -- Witcher: RPG, Adventure
(5, 5), (5, 9);  -- Minecraft: Simulation, Sandbox

-- Link games to tags
INSERT INTO game_tags (game_id, tag_id) VALUES
(1, 1), (1, 7),  -- Fortnite: Multiplayer, Battle Royale
(2, 2), (2, 4),  -- GTA V: Singleplayer, Open World
(3, 2), (3, 4), (3, 9),  -- Cyberpunk: Singleplayer, Open World, Story Rich
(4, 2), (4, 4), (4, 9),  -- Witcher: Singleplayer, Open World, Story Rich
(5, 1), (5, 3), (5, 8);  -- Minecraft: Multiplayer, Co-op, Survival

-- =====================================================
-- 4. INSERT SAMPLE USERS (For Testing)
-- =====================================================
-- Password for all test users is 'password123' hashed with BCrypt

INSERT INTO users (username, email, password, country, role, active, email_verified) VALUES
('Vamsee05', 'vamseek505@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'India', 'USER', TRUE, TRUE),
('TestUser1', 'test1@gameverse.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USA', 'USER', TRUE, TRUE),
('TestUser2', 'test2@gameverse.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'UK', 'USER', TRUE, TRUE),
('AdminUser', 'admin@gameverse.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USA', 'ADMIN', TRUE, TRUE);

-- Create user settings
INSERT INTO user_settings (user_id, profile_visibility, show_online_status, theme) 
SELECT id, 'PUBLIC', TRUE, 'DARK' FROM users;

-- Create wallets
INSERT INTO wallet (user_id, balance, currency) 
SELECT id, 100.00, 'USD' FROM users;

-- Create reward wallets
INSERT INTO reward_wallet (user_id, reward_points, level, experience_points) 
SELECT id, 500, 5, 1250 FROM users;

-- =====================================================
-- 5. INSERT SAMPLE PURCHASES & LIBRARY
-- =====================================================

-- User 1 owns Fortnite and GTA V
INSERT INTO user_library (user_id, game_id, playtime_minutes, favorite) VALUES
(1, 1, 350, TRUE),
(1, 2, 1200, TRUE),
(1, 5, 450, FALSE);

-- User 2 owns Cyberpunk and Witcher 3
INSERT INTO user_library (user_id, game_id, playtime_minutes, favorite) VALUES
(2, 3, 800, TRUE),
(2, 4, 1500, TRUE);

-- =====================================================
-- 6. INSERT SAMPLE ACHIEVEMENTS
-- =====================================================

INSERT INTO achievements (game_id, name, description, points, rarity) VALUES
(1, 'First Victory', 'Win your first Battle Royale match', 50, 'UNCOMMON'),
(1, 'Master Builder', 'Build 1000 structures', 100, 'RARE'),
(2, 'Welcome to Los Santos', 'Complete the first mission', 20, 'COMMON'),
(2, 'Master Criminal', 'Complete all heists', 200, 'EPIC'),
(3, 'Night City Resident', 'Arrive in Night City', 10, 'COMMON'),
(3, 'Cyberpunk Legend', 'Reach maximum level', 300, 'LEGENDARY');

-- User achievements
INSERT INTO user_achievements (user_id, achievement_id) VALUES
(1, 1), (1, 2), (1, 3),
(2, 5);

-- =====================================================
-- 7. INSERT SAMPLE REVIEWS
-- =====================================================

INSERT INTO reviews (game_id, user_id, rating, review_text, recommended, playtime_minutes) VALUES
(1, 1, 5, 'Amazing game! Love the building mechanics and constant updates.', TRUE, 350),
(2, 1, 5, 'Best open-world game ever! Story is incredible.', TRUE, 1200),
(3, 2, 4, 'Great game but had some bugs at launch. Much better now!', TRUE, 800),
(4, 2, 5, 'Masterpiece of RPG gaming. The story is unforgettable.', TRUE, 1500);

-- =====================================================
-- 8. INSERT SAMPLE WISHLISTS
-- =====================================================

INSERT INTO wishlists (user_id, game_id, notify_on_sale) VALUES
(1, 3, TRUE),  -- User 1 wants Cyberpunk
(1, 4, TRUE),  -- User 1 wants Witcher 3
(2, 1, FALSE), -- User 2 wants Fortnite
(2, 2, TRUE);  -- User 2 wants GTA V

-- =====================================================
-- 9. INSERT SAMPLE FRIENDSHIPS
-- =====================================================

INSERT INTO friendships (user_id, friend_id, status, accepted_at) VALUES
(1, 2, 'ACCEPTED', NOW()),
(2, 1, 'ACCEPTED', NOW()),
(1, 3, 'PENDING', NULL);

-- =====================================================
-- 10. INSERT SAMPLE COUPONS
-- =====================================================

INSERT INTO coupons (code, discount_type, discount_value, max_uses, valid_until, active) VALUES
('WELCOME25', 'PERCENTAGE', 25, 1000, '2026-12-31 23:59:59', TRUE),
('SUMMER50', 'PERCENTAGE', 50, 500, '2025-08-31 23:59:59', TRUE),
('NEWUSER20', 'PERCENTAGE', 20, 5000, '2025-12-31 23:59:59', TRUE);

-- =====================================================
-- DATA INSERTION COMPLETE!
-- =====================================================

-- Verify the data
SELECT 'Users created:' as Info, COUNT(*) as Count FROM users
UNION ALL
SELECT 'Games available:', COUNT(*) FROM games
UNION ALL
SELECT 'Publishers:', COUNT(*) FROM publishers
UNION ALL
SELECT 'Genres:', COUNT(*) FROM genres
UNION ALL
SELECT 'Achievements:', COUNT(*) FROM achievements
UNION ALL
SELECT 'Reviews:', COUNT(*) FROM reviews;
