import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShoppingCart, Play, Heart, Share2, Download, Users, Calendar, Gamepad2, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import img1 from "@/components/Images/Store Images/image 1.webp";
import img2 from "@/components/Images/Store Images/image 2.webp";
import img3 from "@/components/Images/Store Images/image 3.webp";
import img4 from "@/components/Images/Store Images/image 4.webp";
import img5 from "@/components/Images/Store Images/image 5.webp";
import img6 from "@/components/Images/Store Images/image 6.webp";
import img7 from "@/components/Images/Store Images/image 7.webp";
import img8 from "@/components/Images/Store Images/image 8.webp";

const gameImages: Record<number, any> = {
  1: img1, 2: img2, 3: img3, 4: img4, 5: img5, 6: img6, 7: img7, 8: img8
};

const gamesData: Record<number, any> = {
  1: {
    id: 1,
    title: "Cyberpunk 2077",
    price: "$59.99",
    discount: 20,
    rating: 4.8,
    genre: "RPG",
    description: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.",
    longDescription: "Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City, where you play as V—a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. Customize your cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.",
    releaseDate: "December 10, 2020",
    developer: "CD Projekt RED",
    publisher: "CD Projekt",
    tags: ["RPG", "Open World", "Sci-Fi", "Action", "Adventure"],
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        processor: "Intel Core i5-3570K / AMD FX-8310",
        memory: "8 GB RAM",
        graphics: "NVIDIA GTX 780 / AMD Radeon RX 470",
        storage: "70 GB"
      },
      recommended: {
        os: "Windows 10",
        processor: "Intel Core i7-4790 / AMD Ryzen 3 3200G",
        memory: "12 GB RAM",
        graphics: "NVIDIA GTX 1060 / AMD Radeon RX 580",
        storage: "70 GB SSD"
      }
    },
    screenshots: [img1, img2, img3],
    featured: true,
    reviews: [
      { user: "NightRider92", rating: 5, date: "Dec 1, 2024", comment: "Absolutely phenomenal! The story gripped me from start to finish. Night City feels alive and vibrant." },
      { user: "CyberPunkFan", rating: 5, date: "Nov 28, 2024", comment: "Best RPG I've played in years. The character customization and choices actually matter!" },
      { user: "V_Merc2077", rating: 5, date: "Nov 25, 2024", comment: "Mind-blowing visuals and engaging gameplay. Every quest feels meaningful and well-crafted." },
      { user: "EdgerunnerPro", rating: 5, date: "Nov 20, 2024", comment: "The attention to detail is insane. You can lose yourself in this world for hundreds of hours." },
      { user: "NetRunner_X", rating: 5, date: "Nov 15, 2024", comment: "Stellar voice acting and soundtrack. The emotional depth of the story caught me off guard!" },
      { user: "TechnoSamurai", rating: 4.5, date: "Nov 10, 2024", comment: "Amazing game with a few minor bugs. The main storyline is incredibly well written and emotional." },
      { user: "NeonDreamer", rating: 4.5, date: "Nov 5, 2024", comment: "Great immersive experience. Combat system is fun and the skill tree offers real variety." },
      { user: "StreetKid_V", rating: 4.5, date: "Oct 30, 2024", comment: "Fantastic world-building and atmosphere. Minor performance issues but totally worth it." },
      { user: "CorpoLife", rating: 4.5, date: "Oct 25, 2024", comment: "The side quests are just as good as the main story. Very impressive level of polish now." },
      { user: "JohnnySilver", rating: 4.5, date: "Oct 20, 2024", comment: "Visually stunning and narratively complex. A few rough edges here and there but overall excellent." },
      { user: "NomadGamer", rating: 4, date: "Oct 15, 2024", comment: "Solid game with engaging story. Could use more variety in enemy types but still fun." },
      { user: "ValentinosFan", rating: 4, date: "Oct 10, 2024", comment: "Good RPG elements and character progression. The world feels a bit empty at times though." },
      { user: "Relic_Hunter", rating: 4, date: "Oct 5, 2024", comment: "Enjoyable gameplay and interesting characters. Some missions feel repetitive after a while." },
      { user: "ArasakaSpy", rating: 4, date: "Sep 30, 2024", comment: "Pretty good overall. The hacking mechanics are cool but could be more intuitive." },
      { user: "FixerGaming", rating: 4, date: "Sep 25, 2024", comment: "Decent experience with memorable moments. Wish there was more customization for apartments." }
    ]
  },
  2: {
    id: 2,
    title: "Marvel's Spiderman",
    price: "$49.99",
    discount: 15,
    rating: 4.6,
    genre: "Strategy",
    description: "Swing through the streets of New York City as the iconic web-slinger in this action-packed adventure.",
    longDescription: "Experience the complete story of Marvel's Spider-Man, from the beginning of Peter Parker's journey as a fledgling hero to his evolution into the masterful Spider-Man. Swing through vibrant neighborhoods and fight crime with mastery.",
    releaseDate: "August 10, 2022",
    developer: "Insomniac Games",
    publisher: "Sony Interactive Entertainment",
    tags: ["Action", "Adventure", "Superhero", "Open World"],
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        processor: "Intel Core i3-4160",
        memory: "8 GB RAM",
        graphics: "NVIDIA GTX 950",
        storage: "75 GB"
      },
      recommended: {
        os: "Windows 10",
        processor: "Intel Core i5-4670",
        memory: "16 GB RAM",
        graphics: "NVIDIA GTX 1060",
        storage: "75 GB SSD"
      }
    },
    screenshots: [img2, img3, img4],
    reviews: [
      { user: "WebHead2023", rating: 5, date: "Dec 2, 2024", comment: "Swinging through New York has never felt this good! The movement mechanics are perfection." },
      { user: "SpideySupreme", rating: 5, date: "Nov 29, 2024", comment: "Every superhero fan needs to play this. The story made me cry and the action is incredible!" },
      { user: "MarvelFanatic", rating: 5, date: "Nov 26, 2024", comment: "Insomniac knocked it out of the park. Best Spider-Man game ever made, hands down." },
      { user: "NewYorkHero", rating: 5, date: "Nov 21, 2024", comment: "The attention to detail in recreating NYC is mind-blowing. I recognized my own neighborhood!" },
      { user: "PeterParker_Alt", rating: 5, date: "Nov 16, 2024", comment: "Combat is smooth, story is emotional, and web-swinging is addictive. 10/10 would recommend!" },
      { user: "DailyCaller", rating: 4.5, date: "Nov 11, 2024", comment: "Amazing game with great graphics. The boss fights are epic and challenging in the best way." },
      { user: "AvengerGamer", rating: 4.5, date: "Nov 6, 2024", comment: "Fantastic experience overall. Side missions are engaging and the DLC content is worth it." },
      { user: "WebSlinger99", rating: 4.5, date: "Oct 31, 2024", comment: "Love the suit variety and upgrade system. Minor frame drops during busy sequences though." },
      { user: "MJfan", rating: 4.5, date: "Oct 26, 2024", comment: "Great story with memorable characters. Photo mode is awesome for capturing epic moments!" },
      { user: "OswaldFan", rating: 4.5, date: "Oct 21, 2024", comment: "Superb voice acting and music. The emotional moments really hit hard. Few bugs here and there." },
      { user: "FiskTower", rating: 4, date: "Oct 16, 2024", comment: "Good adaptation with fun gameplay. Would like to see more iconic villains in future updates." },
      { user: "SinisterSixFan", rating: 4, date: "Oct 11, 2024", comment: "Solid superhero game. Combat can get repetitive but swinging never gets old." },
      { user: "NYPDgamer", rating: 4, date: "Oct 6, 2024", comment: "Enjoyable open-world experience. Collecting all the backpacks is a nice nostalgic touch." },
      { user: "VultureWatch", rating: 4, date: "Oct 1, 2024", comment: "Pretty fun overall. Stealth sections could be better but web combat makes up for it." },
      { user: "SpideyFan2077", rating: 4, date: "Sep 26, 2024", comment: "Decent game with good replay value. Wish there were more interior locations to explore." }
    ]
  },
  3: {
    id: 3,
    title: "Grand Theft Auto 6",
    price: "$39.99",
    rating: 4.7,
    genre: "Racing",
    description: "The latest installment in the iconic GTA series, featuring an expansive open world and thrilling gameplay.",
    longDescription: "Return to the streets of Vice City in the most ambitious Grand Theft Auto game yet. Experience a story-driven adventure with multiple playable characters and a living, breathing world.",
    releaseDate: "2025",
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    tags: ["Action", "Open World", "Crime", "Adventure"],
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        processor: "Intel Core i5-8400",
        memory: "8 GB RAM",
        graphics: "NVIDIA GTX 1060",
        storage: "150 GB"
      },
      recommended: {
        os: "Windows 11",
        processor: "Intel Core i7-8700K",
        memory: "16 GB RAM",
        graphics: "NVIDIA RTX 2070",
        storage: "150 GB SSD"
      }
    },
    screenshots: [img3, img4, img5],
    reviews: [
      { user: "ViceCityKing", rating: 5, date: "Dec 3, 2024", comment: "This is what we've been waiting for! The scale and detail of the world is unprecedented." },
      { user: "RockstarFan", rating: 5, date: "Nov 30, 2024", comment: "Absolutely incredible! The dual protagonist system works perfectly and the story is gripping." },
      { user: "CrimeLife6", rating: 5, date: "Nov 27, 2024", comment: "Best GTA yet. The graphics are stunning and the gameplay mechanics feel so refined." },
      { user: "LosVentos", rating: 5, date: "Nov 22, 2024", comment: "The attention to detail is insane. Every building, every NPC, everything feels alive and real." },
      { user: "GTAfanatic", rating: 5, date: "Nov 17, 2024", comment: "Worth the wait! The heist missions are complex and thrilling. Online mode is a blast too!" },
      { user: "MiamiNights", rating: 4.5, date: "Nov 12, 2024", comment: "Fantastic open world with tons to do. Minor bugs at launch but patches are coming regularly." },
      { user: "TrevorFanClub", rating: 4.5, date: "Nov 7, 2024", comment: "Great storyline with memorable characters. The radio stations have amazing music selection." },
      { user: "HowardGamer", rating: 4.5, date: "Nov 1, 2024", comment: "Impressive world-building and mission variety. Vehicle handling feels much improved." },
      { user: "BeachBumGTA", rating: 4.5, date: "Oct 27, 2024", comment: "Love the customization options for cars and properties. Just wish loading times were faster." },
      { user: "GroveStreet", rating: 4.5, date: "Oct 22, 2024", comment: "Phenomenal graphics and engaging gameplay. Some missions can feel a bit long though." },
      { user: "LesterPlans", rating: 4, date: "Oct 17, 2024", comment: "Solid entry in the series. Could use more indoor locations but still very fun overall." },
      { user: "SanAnd_Pro", rating: 4, date: "Oct 12, 2024", comment: "Good game with lots of content. Traffic AI could be smarter but it's still enjoyable." },
      { user: "ViceSquad", rating: 4, date: "Oct 7, 2024", comment: "Enjoyable experience with friends online. Single-player is good but could be longer." },
      { user: "CayoPerico", rating: 4, date: "Oct 2, 2024", comment: "Pretty entertaining. The wanted system is improved but still has some quirks." },
      { user: "DiamondHeist", rating: 4, date: "Sep 27, 2024", comment: "Decent gameplay and good graphics. Would like to see more variety in side activities." }
    ]
  },
  4: {
    id: 4,
    title: "Need For Speed",
    price: "$41.99",
    rating: 4.5,
    genre: "Racing",
    description: "An adrenaline-fueled racing game with stunning graphics and intense police chases through city streets.",
    longDescription: "Experience the thrill of illegal street racing in this high-octane racing game. Customize your rides, evade the police, and dominate the streets with style. Race through stunning urban environments and build your reputation as the ultimate street racer.",
    releaseDate: "November 2023",
    developer: "Ghost Games",
    publisher: "Electronic Arts",
    tags: ["Racing", "Open World", "Multiplayer", "Action"],
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        processor: "Intel Core i5-6600K",
        memory: "8 GB RAM",
        graphics: "NVIDIA GTX 1050 Ti",
        storage: "50 GB"
      },
      recommended: {
        os: "Windows 10",
        processor: "Intel Core i7-8700",
        memory: "16 GB RAM",
        graphics: "NVIDIA RTX 2060",
        storage: "50 GB SSD"
      }
    },
    screenshots: [img4, img5, img6],
    reviews: [
      { user: "SpeedDemon420", rating: 5, date: "Dec 4, 2024", comment: "Pure adrenaline rush! The police chases are intense and the customization is incredible." },
      { user: "NitroKing", rating: 5, date: "Dec 1, 2024", comment: "Best racing game I've played! The graphics blow me away and the soundtrack is fire!" },
      { user: "StreetRacerX", rating: 5, date: "Nov 28, 2024", comment: "Living the street racing dream! Car handling is perfect and the night races are epic." },
      { user: "TurboCharged", rating: 5, date: "Nov 23, 2024", comment: "Absolutely love everything about this game. The drift mechanics are so satisfying!" },
      { user: "NeonRacer", rating: 5, date: "Nov 18, 2024", comment: "Can't stop playing! The progression system keeps you hooked and races never feel the same." },
      { user: "DriftMaster88", rating: 4.5, date: "Nov 13, 2024", comment: "Amazing racing experience. Huge selection of cars and upgrades. Minor rubberbanding issues." },
      { user: "PursuitKing", rating: 4.5, date: "Nov 8, 2024", comment: "Fantastic game with beautiful cityscapes. Police AI is challenging and keeps you on edge." },
      { user: "BurnoutFan", rating: 4.5, date: "Nov 2, 2024", comment: "Love the risk vs reward system. Customization is deep and multiplayer is super fun." },
      { user: "Underglow_Pro", rating: 4.5, date: "Oct 28, 2024", comment: "Great visuals and exciting races. The day/night cycle adds nice variety to the gameplay." },
      { user: "HeatLevel5", rating: 4.5, date: "Oct 23, 2024", comment: "Solid racing game with tons of replay value. Could use more variety in race types though." },
      { user: "CarbonCopy", rating: 4, date: "Oct 18, 2024", comment: "Good fun with friends. The story mode is a bit short but the racing is solid." },
      { user: "MostWanted23", rating: 4, date: "Oct 13, 2024", comment: "Enjoyable arcade racer. Some tracks feel repetitive but car collection is impressive." },
      { user: "ProStreetFan", rating: 4, date: "Oct 8, 2024", comment: "Decent racing game overall. Traffic can be annoying during races but still entertaining." },
      { user: "HighStakes", rating: 4, date: "Oct 3, 2024", comment: "Pretty good racer with nice graphics. Would like to see more licensed cars in future updates." },
      { user: "UndergroundLegend", rating: 4, date: "Sep 28, 2024", comment: "Solid entry in the series. Handling takes some getting used to but it's rewarding once mastered." }
    ]
  },
  5: {
    id: 5,
    title: "The Last Of Us",
    price: "$0.00",
    rating: 4.9,
    genre: "Action",
    description: "Experience the emotional journey through a post-apocalyptic America ravaged by a deadly fungal infection.",
    longDescription: "The Last of Us is a genre-defining experience blending survival and action elements to tell a character-driven story about two survivors on a journey across a post-pandemic America. Guide Joel and Ellie through breathtaking environments as they struggle to survive in a world devastated by infection and hostile survivors.",
    releaseDate: "March 28, 2023",
    developer: "Naughty Dog",
    publisher: "Sony Interactive Entertainment",
    tags: ["Action", "Adventure", "Story Rich", "Survival"],
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        processor: "Intel Core i7-4770K",
        memory: "16 GB RAM",
        graphics: "NVIDIA GTX 1050 Ti",
        storage: "100 GB"
      },
      recommended: {
        os: "Windows 10",
        processor: "Intel Core i7-8700",
        memory: "16 GB RAM",
        graphics: "NVIDIA RTX 3070",
        storage: "100 GB SSD"
      }
    },
    screenshots: [img5, img6, img7],
    reviews: [
      { user: "EllieFanForever", rating: 5, date: "Dec 5, 2024", comment: "A masterpiece of storytelling. Had me in tears multiple times. Joel and Ellie are unforgettable." },
      { user: "SurvivorGamer", rating: 5, date: "Dec 2, 2024", comment: "The best narrative-driven game ever made. Every moment is carefully crafted and meaningful." },
      { user: "NaughtyDogFan", rating: 5, date: "Nov 29, 2024", comment: "Absolutely perfect. The graphics, story, gameplay - everything comes together beautifully." },
      { user: "PostApoc_King", rating: 5, date: "Nov 24, 2024", comment: "This game changed my perspective on what video games can achieve as an art form. Incredible!" },
      { user: "JoelMiller77", rating: 5, date: "Nov 19, 2024", comment: "The emotional journey this takes you on is unmatched. Combat is tense and satisfying too!" },
      { user: "FireflyRebel", rating: 4.5, date: "Nov 14, 2024", comment: "Phenomenal game with amazing atmosphere. Stealth mechanics work great. Minor pacing issues." },
      { user: "ClickerHunter", rating: 4.5, date: "Nov 9, 2024", comment: "Great story and character development. The infected are genuinely terrifying. Loved every minute!" },
      { user: "QuarantineZone", rating: 4.5, date: "Nov 3, 2024", comment: "Beautiful visuals and incredible voice acting. Combat can feel repetitive at times though." },
      { user: "SporezInfected", rating: 4.5, date: "Oct 29, 2024", comment: "Fantastic narrative experience. The relationship between Joel and Ellie is so well written." },
      { user: "BostonQZ", rating: 4.5, date: "Oct 24, 2024", comment: "Amazing game overall. Some puzzles feel a bit simple but the story more than makes up for it." },
      { user: "TessWasRight", rating: 4, date: "Oct 19, 2024", comment: "Solid survival game with good story. Could use more enemy variety but still entertaining." },
      { user: "SaltLakeCity", rating: 4, date: "Oct 14, 2024", comment: "Enjoyable experience with great graphics. Gameplay can get a bit repetitive in places." },
      { user: "LeftBehindDLC", rating: 4, date: "Oct 9, 2024", comment: "Good game with emotional moments. Crafting system is nice but could be more complex." },
      { user: "BillAndFrank", rating: 4, date: "Oct 4, 2024", comment: "Pretty solid overall. The story is the real star here. Combat is decent but not revolutionary." },
      { user: "TommysBrother", rating: 4, date: "Sep 29, 2024", comment: "Decent survival game. Wish there were more exploration and less linear segments." }
    ]
  },
  6: {
    id: 6,
    title: "Detroit: Become Human",
    price: "$33.74",
    discount: 25,
    rating: 4.7,
    genre: "Adventure",
    description: "Shape the future of Detroit in this narrative-driven game about three androids struggling to find their place in society.",
    longDescription: "Detroit: Become Human is a neo-noir thriller where your choices shape a branching narrative. Playing as three different androids, you'll witness firsthand what it means to be alive from their perspectives. Each decision you make will impact the story's outcome in unprecedented ways.",
    releaseDate: "December 12, 2019",
    developer: "Quantic Dream",
    publisher: "Quantic Dream",
    tags: ["Story Rich", "Choices Matter", "Adventure", "Sci-Fi"],
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        processor: "Intel Core i5-2300",
        memory: "8 GB RAM",
        graphics: "NVIDIA GTX 780",
        storage: "55 GB"
      },
      recommended: {
        os: "Windows 10",
        processor: "Intel Core i5-6600",
        memory: "12 GB RAM",
        graphics: "NVIDIA GTX 1080",
        storage: "55 GB SSD"
      }
    },
    screenshots: [img6, img7, img8],
    reviews: [
      { user: "ConnorRK800", rating: 5, date: "Dec 6, 2024", comment: "The choice system is revolutionary! Every decision genuinely impacts the story in meaningful ways." },
      { user: "MarkusFreedom", rating: 5, date: "Dec 3, 2024", comment: "One of the most thought-provoking games I've ever played. The android revolution story is powerful!" },
      { user: "KaraAndAlice", rating: 5, date: "Nov 30, 2024", comment: "Emotionally devastating and beautiful. The three character perspectives work perfectly together." },
      { user: "DeviantHunter", rating: 5, date: "Nov 25, 2024", comment: "Quantic Dream's best work! The branching story has insane replay value. A true masterpiece." },
      { user: "CyberlifeGamer", rating: 5, date: "Nov 20, 2024", comment: "The graphics are photorealistic and the performances are Oscar-worthy. Can't recommend enough!" },
      { user: "JerichoRising", rating: 4.5, date: "Nov 15, 2024", comment: "Fantastic narrative experience with stunning visuals. Some QTEs can be frustrating but overall amazing." },
      { user: "RaHankAnderson", rating: 4.5, date: "Nov 10, 2024", comment: "Great branching storyline and moral dilemmas. Voice acting is top-notch throughout." },
      { user: "NorthStar_Path", rating: 4.5, date: "Nov 4, 2024", comment: "Loved exploring different choices. The flowchart system is brilliant for tracking decisions." },
      { user: "AndroidRights", rating: 4.5, date: "Oct 30, 2024", comment: "Beautiful game with deep themes about consciousness and humanity. Minor technical glitches." },
      { user: "ZlatkoLab", rating: 4.5, date: "Oct 25, 2024", comment: "Compelling story with multiple endings. Some pacing issues but the payoff is worth it." },
      { user: "AmandaStern", rating: 4, date: "Oct 20, 2024", comment: "Good interactive drama. Would like more gameplay elements but the story carries it well." },
      { user: "RoseChapel", rating: 4, date: "Oct 15, 2024", comment: "Enjoyable narrative game. Some choices feel superficial but the main story beats are strong." },
      { user: "EdenClubVIP", rating: 4, date: "Oct 10, 2024", comment: "Solid story-driven experience. Graphics are impressive but gameplay is very limited." },
      { user: "StratfordTower", rating: 4, date: "Oct 5, 2024", comment: "Pretty good overall. The moral questions are interesting but answers feel a bit binary at times." },
      { user: "ToddWilliams", rating: 4, date: "Sep 30, 2024", comment: "Decent interactive movie. Wish there was more actual gameplay between story segments." }
    ]
  },
  7: {
    id: 7,
    title: "A Way Out",
    price: "$29.99",
    rating: 4.4,
    genre: "Co-op",
    description: "Experience exclusively two-player cooperative gameplay in this cinematic adventure about two prisoners escaping together.",
    longDescription: "A Way Out is an exclusively co-op adventure where you play the role of one of two prisoners making their daring escape from prison. What begins as a thrilling breakout quickly turns into an emotional adventure unlike anything seen or played before. Only playable in either online or local split-screen co-op.",
    releaseDate: "March 23, 2018",
    developer: "Hazelight Studios",
    publisher: "Electronic Arts",
    tags: ["Co-op", "Adventure", "Story Rich", "Action"],
    systemRequirements: {
      minimum: {
        os: "Windows 7",
        processor: "Intel Core i3-2100T",
        memory: "8 GB RAM",
        graphics: "NVIDIA GTX 650",
        storage: "25 GB"
      },
      recommended: {
        os: "Windows 10",
        processor: "Intel Core i5-6600K",
        memory: "16 GB RAM",
        graphics: "NVIDIA GTX 960",
        storage: "25 GB SSD"
      }
    },
    screenshots: [img7, img8, img1],
    reviews: [
      { user: "VincentTeam", rating: 5, date: "Dec 7, 2024", comment: "The best co-op experience I've ever had! Playing with my best friend was an unforgettable journey." },
      { user: "LeosBrother", rating: 5, date: "Dec 4, 2024", comment: "Incredible storytelling and unique split-screen mechanics. The ending blew my mind!" },
      { user: "HazelightFan", rating: 5, date: "Dec 1, 2024", comment: "Josef Fares is a genius! This game proves co-op games can tell amazing stories." },
      { user: "PrisonBreakPro", rating: 5, date: "Nov 26, 2024", comment: "From the prologue to the finale, I was completely hooked. The twist is masterfully done!" },
      { user: "BrotherhoodGamer", rating: 5, date: "Nov 21, 2024", comment: "The emotional bond that forms while playing is real. Cried at the end. 11/10 experience!" },
      { user: "EscapeArtist", rating: 4.5, date: "Nov 16, 2024", comment: "Fantastic co-op adventure with creative gameplay. The only game my friend and I played non-stop!" },
      { user: "HarveyWarden", rating: 4.5, date: "Nov 11, 2024", comment: "Great buddy movie feel with excellent pacing. The variety in gameplay keeps it fresh throughout." },
      { user: "CarolSide", rating: 4.5, date: "Nov 5, 2024", comment: "Loved the asymmetric gameplay sections. Working together with a friend felt so rewarding." },
      { user: "AlexTheKid", rating: 4.5, date: "Oct 31, 2024", comment: "Amazing experience that really tests your friendship. The baseball scene is pure gold!" },
      { user: "MexicoDream", rating: 4.5, date: "Oct 26, 2024", comment: "Brilliant co-op mechanics and touching story. Some sections drag a bit but overall superb." },
      { user: "HospitalEscape", rating: 4, date: "Oct 21, 2024", comment: "Good co-op game with interesting story. Would like to see more action sequences though." },
      { user: "TrailerParkLife", rating: 4, date: "Oct 16, 2024", comment: "Enjoyable gameplay with a friend. Some puzzles are too simple but the story keeps you going." },
      { user: "HeistGoneWrong", rating: 4, date: "Oct 11, 2024", comment: "Solid co-op experience. The character development is good but gameplay can feel repetitive." },
      { user: "JuvenileCenter", rating: 4, date: "Oct 6, 2024", comment: "Pretty fun overall. Wish there was more variety in gameplay mechanics between chapters." },
      { user: "Emily_Returns", rating: 4, date: "Oct 1, 2024", comment: "Decent story-driven co-op. The narrative is engaging but sometimes felt too linear for my taste." }
    ]
  },
  8: {
    id: 8,
    title: "Black Myth Wukong",
    price: "$0.00",
    rating: 4.8,
    genre: "Action RPG",
    description: "An action RPG rooted in Chinese mythology featuring the legendary Monkey King on an epic adventure.",
    longDescription: "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past. Experience stunning visuals powered by Unreal Engine 5 and engage in fluid, challenging combat inspired by souls-like games.",
    releaseDate: "August 20, 2024",
    developer: "Game Science",
    publisher: "Game Science",
    tags: ["Action RPG", "Mythology", "Souls-like", "Adventure"],
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        processor: "Intel Core i5-8400",
        memory: "16 GB RAM",
        graphics: "NVIDIA GTX 1060",
        storage: "130 GB"
      },
      recommended: {
        os: "Windows 10",
        processor: "Intel Core i7-9700",
        memory: "16 GB RAM",
        graphics: "NVIDIA RTX 3060",
        storage: "130 GB SSD"
      }
    },
    screenshots: [img8, img1, img2],
    reviews: [
      { user: "MonkeyKingFan", rating: 5, date: "Dec 8, 2024", comment: "A stunning achievement in game design! The Chinese mythology is beautifully represented." },
      { user: "JourneyWestGamer", rating: 5, date: "Dec 5, 2024", comment: "Best action combat I've experienced! Every boss fight is a work of art. Game Science crushed it!" },
      { user: "DestinedOne88", rating: 5, date: "Dec 2, 2024", comment: "The graphics powered by UE5 are jaw-dropping. Combat is challenging but incredibly satisfying!" },
      { user: "StaffMaster", rating: 5, date: "Nov 27, 2024", comment: "Absolutely phenomenal! The transformation abilities and combat depth are next level!" },
      { user: "HeavenlyPalace", rating: 5, date: "Nov 22, 2024", comment: "This is how you adapt a legend! The attention to cultural detail is remarkable and respectful." },
      { user: "CelestialMonk", rating: 4.5, date: "Nov 17, 2024", comment: "Amazing visuals and epic boss fights. Some performance issues on lower-end PCs but worth it." },
      { user: "72Transform", rating: 4.5, date: "Nov 12, 2024", comment: "Fantastic souls-like with unique Chinese flavor. The skill tree customization is very deep." },
      { user: "MountHuaguo", rating: 4.5, date: "Nov 6, 2024", comment: "Loved the mythology weaved into gameplay. Some areas feel a bit linear but combat shines through." },
      { user: "BuddhaBlessing", rating: 4.5, date: "Nov 1, 2024", comment: "Great character design and enemy variety. The transformation system adds wonderful tactical depth." },
      { user: "PeachOrchard", rating: 4.5, date: "Oct 27, 2024", comment: "Beautiful environments and challenging combat. Could use better optimization in some areas." },
      { user: "IronFanDemon", rating: 4, date: "Oct 22, 2024", comment: "Solid action RPG with stunning visuals. Camera can be problematic in tight spaces though." },
      { user: "TripitakaQuest", rating: 4, date: "Oct 17, 2024", comment: "Good game with impressive boss design. Story could be more accessible to Western audiences." },
      { user: "RedBoyFighter", rating: 4, date: "Oct 12, 2024", comment: "Enjoyable souls-like experience. Some mechanics need more explanation for newcomers to the genre." },
      { user: "SpiderCave", rating: 4, date: "Oct 7, 2024", comment: "Pretty challenging and rewarding. Would benefit from a more detailed tutorial system." },
      { user: "YellowWindKing", rating: 4, date: "Oct 2, 2024", comment: "Decent mythological adventure. Combat is fun but difficulty spikes can be frustrating." }
    ]
  }
};

export default function GameDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const gameId = id ? parseInt(id as string) : null;
  const game = gameId ? gamesData[gameId] : null;
  const { addItem } = useCart();
  const { addItem: addWishlistItem, items: wishlistItems } = useWishlist();
  const isInWishlist = gameId ? wishlistItems.some(item => item.id === gameId) : false;

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Game not found</h1>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const effectivePrice = game.discount
    ? parseFloat(game.price.slice(1)) * (1 - game.discount / 100)
    : parseFloat(game.price.slice(1));

  const handleAddToCart = () => {
    addItem({
      id: game.id,
      title: game.title,
      price: effectivePrice,
      image: gameImages[game.id]
    });
  };

  return (
    <>
      <Head>
        <title>{game.title} - GameVerse</title>
        <meta name="description" content={game.description} />
      </Head>

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/" className="hover:text-foreground">Store</Link>
            <span>/</span>
            <span className="text-foreground">{game.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={gameImages[game.id]}
              alt={game.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-2">
                {game.tags.slice(0, 3).map((tag: string) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <h1 className="text-5xl font-bold mb-4 text-foreground">{game.title}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="text-foreground font-semibold">{game.rating}</span>
                </div>
                <Badge variant="secondary">{game.genre}</Badge>
                {game.discount && (
                  <Badge className="bg-green-600 text-white">-{game.discount}% OFF</Badge>
                )}
              </div>
              <div className="flex items-center gap-4">
                <Button size="lg" className="gap-2">
                  <Play className="h-5 w-5" />
                  Play Now
                </Button>
                <Button size="lg" variant="outline" className="gap-2" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5" />
                  {game.discount ? (
                    <>
                      <span className="line-through text-muted-foreground">{game.price}</span>
                      <span className="text-green-500">${effectivePrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span>{game.price}</span>
                  )}
                </Button>
                <Button size="lg" variant="outline" onClick={() => addWishlistItem({
                  id: game.id,
                  title: game.title,
                  price: effectivePrice,
                  image: gameImages[game.id]
                })}>
                  <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="about" className="w-full">
                <TabsList>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="requirements">System Requirements</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">About This Game</h2>
                    <p className="text-muted-foreground leading-relaxed">{game.longDescription || game.description}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Screenshots</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {game.screenshots?.map((screenshot: any, index: number) => (
                        <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                          <Image src={screenshot} alt={`${game.title} screenshot ${index + 1}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="requirements">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-foreground">Minimum Requirements</h3>
                      <Card>
                        <CardContent className="p-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">OS:</span>
                            <span className="text-foreground">{game.systemRequirements.minimum.os}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Processor:</span>
                            <span className="text-foreground">{game.systemRequirements.minimum.processor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Memory:</span>
                            <span className="text-foreground">{game.systemRequirements.minimum.memory}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Graphics:</span>
                            <span className="text-foreground">{game.systemRequirements.minimum.graphics}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Storage:</span>
                            <span className="text-foreground">{game.systemRequirements.minimum.storage}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-foreground">Recommended Requirements</h3>
                      <Card>
                        <CardContent className="p-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">OS:</span>
                            <span className="text-foreground">{game.systemRequirements.recommended.os}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Processor:</span>
                            <span className="text-foreground">{game.systemRequirements.recommended.processor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Memory:</span>
                            <span className="text-foreground">{game.systemRequirements.recommended.memory}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Graphics:</span>
                            <span className="text-foreground">{game.systemRequirements.recommended.graphics}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Storage:</span>
                            <span className="text-foreground">{game.systemRequirements.recommended.storage}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews">
                  <div className="space-y-4">
                    {game.reviews && game.reviews.length > 0 ? game.reviews.map((review: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-foreground">{review.user}</h4>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'fill-primary text-primary' : i < review.rating ? 'fill-primary/50 text-primary' : 'text-muted'}`} />
                              ))}
                              <span className="ml-2 text-sm font-semibold text-foreground">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </CardContent>
                      </Card>
                    )) : (
                      <div className="text-center py-12 border border-border rounded-lg bg-secondary">
                        <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Developer</h3>
                    <p className="text-foreground">{game.developer}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Publisher</h3>
                    <p className="text-foreground">{game.publisher}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Release Date</h3>
                    <p className="text-foreground">{game.releaseDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {game.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



