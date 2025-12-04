package com.Gaming.Backend.data;

import com.Gaming.Backend.entity.*;
import com.Gaming.Backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final UserSettingsRepository userSettingsRepository;
    private final WalletRepository walletRepository;
    private final RewardWalletRepository rewardWalletRepository;
    private final PublisherRepository publisherRepository;
    private final GameRepository gameRepository;
    private final AchievementRepository achievementRepository;
    private final CouponRepository couponRepository;
    private final RedeemCodeRepository redeemCodeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        log.info("Initializing database with sample data...");

        // Create admin user
        if (!userRepository.existsByUsername("admin")) {
            createAdminUser();
        }

        // Create sample user
        if (!userRepository.existsByUsername("demo")) {
            createDemoUser();
        }

        // Create publishers
        Publisher epicGames = createPublisher("Epic Games", "Epic Games, Inc.", "https://www.epicgames.com");
        Publisher rockstar = createPublisher("Rockstar Games", "Rockstar Games, Inc.", "https://www.rockstargames.com");
        Publisher ubisoft = createPublisher("Ubisoft", "Ubisoft Entertainment SA", "https://www.ubisoft.com");
        Publisher cdProjekt = createPublisher("CD PROJEKT RED", "CD PROJEKT RED S.A.", "https://www.cdprojektred.com");

        // Create games
        createGames(epicGames, rockstar, ubisoft, cdProjekt);

        // Create coupons
        createCoupons();

        // Create redeem codes
        createRedeemCodes();

        log.info("Database initialization completed!");
    }

    private void createAdminUser() {
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@gamingworld.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(User.Role.ADMIN);
        admin.setCountry("USA");
        admin.setActive(true);
        userRepository.save(admin);

        createUserDefaults(admin);
        log.info("Admin user created");
    }

    private void createDemoUser() {
        User demo = new User();
        demo.setUsername("demo");
        demo.setEmail("demo@gamingworld.com");
        demo.setPassword(passwordEncoder.encode("demo123"));
        demo.setRole(User.Role.USER);
        demo.setCountry("USA");
        demo.setActive(true);
        userRepository.save(demo);

        createUserDefaults(demo);

        // Give demo user some initial balance
        Wallet wallet = walletRepository.findByUser(demo).orElse(null);
        if (wallet != null) {
            wallet.setBalance(100.0);
            walletRepository.save(wallet);
        }

        // Give demo user some reward points
        RewardWallet rewardWallet = rewardWalletRepository.findByUser(demo).orElse(null);
        if (rewardWallet != null) {
            rewardWallet.setRewardPoints(500);
            rewardWallet.setTotalEarned(500);
            rewardWalletRepository.save(rewardWallet);
        }

        log.info("Demo user created with initial balance");
    }

    private void createUserDefaults(User user) {
        UserSettings settings = new UserSettings();
        settings.setUser(user);
        userSettingsRepository.save(settings);

        Wallet wallet = new Wallet();
        wallet.setUser(user);
        walletRepository.save(wallet);

        RewardWallet rewardWallet = new RewardWallet();
        rewardWallet.setUser(user);
        rewardWalletRepository.save(rewardWallet);
    }

    private Publisher createPublisher(String name, String fullName, String website) {
        return publisherRepository.findByName(name).orElseGet(() -> {
            Publisher publisher = new Publisher();
            publisher.setName(name);
            publisher.setDescription(fullName);
            publisher.setWebsite(website);
            publisher.setActive(true);
            return publisherRepository.save(publisher);
        });
    }

    private void createGames(Publisher epicGames, Publisher rockstar, Publisher ubisoft, Publisher cdProjekt) {
        createGame("Fortnite", "Battle Royale game with building mechanics", 0.0, 0.0,
                "Battle Royale", new String[]{"Free-to-Play", "Multiplayer", "Shooter"}, epicGames, LocalDate.of(2017, 7, 25));

        createGame("Grand Theft Auto V", "Open-world action-adventure game", 29.99, 50.0,
           "Action", new String[]{"Open World", "Crime", "Multiplayer"}, rockstar, LocalDate.of(2013, 9, 17));

        createGame("Red Dead Redemption 2", "Epic tale of life in America's unforgiving heartland", 59.99, 30.0,
                "Action", new String[]{"Open World", "Western", "Story Rich"}, rockstar, LocalDate.of(2019, 11, 5));

        createGame("Assassin's Creed Valhalla", "Lead epic raids and become a legendary Viking warrior", 59.99, 40.0,
                "Action", new String[]{"RPG", "Open World", "Vikings"}, ubisoft, LocalDate.of(2020, 11, 10));

        createGame("Cyberpunk 2077", "Open-world action-adventure story set in Night City", 49.99, 25.0,
                "RPG", new String[]{"Open World", "Sci-fi", "Story Rich"}, cdProjekt, LocalDate.of(2020, 12, 10));

        createGame("The Witcher 3: Wild Hunt", "Story-driven, open world RPG of the future", 39.99, 60.0,
                "RPG", new String[]{"Open World", "Fantasy", "Story Rich"}, cdProjekt, LocalDate.of(2015, 5, 19));

        createGame("Far Cry 6", "Welcome to Yara, a tropical paradise frozen in time", 59.99, 35.0,
                "Shooter", new String[]{"FPS", "Open World", "Action"}, ubisoft, LocalDate.of(2021, 10, 7));

        createGame("Watch Dogs Legion", "Build a resistance from virtually anyone you see", 59.99, 50.0,
                "Action", new String[]{"Open World", "Hacking", "Stealth"}, ubisoft, LocalDate.of(2020, 10, 29));

        log.info("Sample games created");
    }

    private void createGame(String title, String description, Double price, Double discount,
                            String genre, String[] tags, Publisher publisher, LocalDate releaseDate) {
        if (gameRepository.findByActiveTrue(org.springframework.data.domain.PageRequest.of(0, 1))
                .stream().anyMatch(g -> g.getTitle().equals(title))) {
            return; // Game already exists
        }

        Game game = new Game();
        game.setTitle(title);
        game.setDescription(description);
        game.setPrice(price);
        game.setDiscount(discount);
        game.setGenre(genre);
        game.setTags(new HashSet<>(Arrays.asList(tags)));
        game.setPublisher(publisher);
        game.setReleaseDate(releaseDate);
        game.setActive(true);
        game.setDownloads((int) (Math.random() * 10000));
        game.setAverageRating(3.5 + Math.random() * 1.5); // Random rating 3.5-5.0
        game.setReviewCount((int) (Math.random() * 1000));
        game.setSystemRequirements("OS: Windows 10 64-bit | Processor: Intel Core i5 | Memory: 8 GB RAM | Graphics: NVIDIA GeForce GTX 1060");

        Game savedGame = gameRepository.save(game);

        // Create sample achievements for this game
        createAchievements(savedGame);
    }

    private void createAchievements(Game game) {
        Achievement ach1 = new Achievement();
        ach1.setGame(game);
        ach1.setName("First Steps");
        ach1.setDescription("Complete the tutorial");
        ach1.setPoints(10);
        achievementRepository.save(ach1);

        Achievement ach2 = new Achievement();
        ach2.setGame(game);
        ach2.setName("Legendary");
        ach2.setDescription("Reach maximum level");
        ach2.setPoints(100);
        achievementRepository.save(ach2);

        Achievement ach3 = new Achievement();
        ach3.setGame(game);
        ach3.setName("Completionist");
        ach3.setDescription("Complete all missions");
        ach3.setPoints(50);
        achievementRepository.save(ach3);
    }

    private void createCoupons() {
        if (couponRepository.findByCode("WELCOME10").isEmpty()) {
            Coupon welcome = new Coupon();
            welcome.setCode("WELCOME10");
            welcome.setDiscountType(Coupon.DiscountType.PERCENTAGE);
            welcome.setValue(10.0);
            welcome.setMaxUsage(0); // Unlimited
            welcome.setIsActive(true);
            welcome.setDescription("10% off for new users");
            couponRepository.save(welcome);
        }

        if (couponRepository.findByCode("SUMMER25").isEmpty()) {
            Coupon summer = new Coupon();
            summer.setCode("SUMMER25");
            summer.setDiscountType(Coupon.DiscountType.PERCENTAGE);
            summer.setValue(25.0);
            summer.setMinPurchase(50.0);
            summer.setMaxUsage(1000);
            summer.setIsActive(true);
            summer.setExpiryDate(java.time.LocalDateTime.now().plusMonths(2));
            summer.setDescription("25% off on orders above $50");
            couponRepository.save(summer);
        }

        log.info("Sample coupons created");
    }

    private void createRedeemCodes() {
        if (!redeemCodeRepository.existsByCode("FREE100")) {
            RedeemCode code = new RedeemCode();
            code.setCode("FREE100");
            code.setType(RedeemCode.CodeType.WALLET);
            code.setValue(100.0);
            code.setDescription("$100 wallet credit");
            redeemCodeRepository.save(code);
        }

        if (!redeemCodeRepository.existsByCode("POINTS500")) {
            RedeemCode code = new RedeemCode();
            code.setCode("POINTS500");
            code.setType(RedeemCode.CodeType.REWARD_POINTS);
            code.setValue(500.0);
            code.setDescription("500 reward points");
            redeemCodeRepository.save(code);
        }

        log.info("Sample redeem codes created");
    }
}
