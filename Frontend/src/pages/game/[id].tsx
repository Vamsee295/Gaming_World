import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Star, ShoppingCart, Play, Heart, Share2, Download, Users, Calendar, Gamepad2, ArrowLeft, Copy, Check, Globe, Zap, Target, Sparkles, Trophy, Map, Swords, Cpu, Car, Shield, ChevronDown, MessageSquarePlus, ThumbsUp, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { useWishlist } from "@/context/WishlistContext";
import { EnhancedYouTubePlayer } from "@/components/ui/EnhancedYouTubePlayer";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { GameplaySystemCard } from "@/components/ui/GameplaySystemCard";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { RatingBreakdown } from "@/components/ui/RatingBreakdown";
import { EditionCard } from "@/components/ui/EditionCard";
import { RelatedGameCard } from "@/components/ui/RelatedGameCard";
// Store Images (for main game cards)
import cyberpunk2077 from "@/components/Images/Store Images/cyberpunk-2077.jpg";
import spiderman from "@/components/Images/Store Images/spiderman.jpg";
import gta6 from "@/components/Images/Store Images/gta-6.webp";
import needForSpeed from "@/components/Images/Store Images/need-for-speed.jpg";
import lastOfUs from "@/components/Images/Store Images/last-of-us.webp";
import detroit from "@/components/Images/Store Images/detroit-become-human.webp";
import aWayOut from "@/components/Images/Store Images/a-way-out.webp";
import blackMythWukong from "@/components/Images/Store Images/black-myth-wukong.webp";

// Cyberpunk 2077 Screenshots
import cyberpunk1 from "@/components/Images/Cyberpunk/cyberpunk 1.jpg";
import cyberpunk2 from "@/components/Images/Cyberpunk/cyberpunk 2.jpg";
import cyberpunk3 from "@/components/Images/Cyberpunk/cyberpunk 3.jpg";
import cyberpunk4 from "@/components/Images/Cyberpunk/cyberpunk 4.jpg";
import cyberpunk5 from "@/components/Images/Cyberpunk/cyberpunk 5.jpg";

// SpiderMan Screenshots
import spiderman1 from "@/components/Images/SpiderMan/Spiderman 1.jpg";
import spiderman2 from "@/components/Images/SpiderMan/Spiderman 2 (2).jpg";
import spiderman3 from "@/components/Images/SpiderMan/Spiderman 3.png";
import spiderman4 from "@/components/Images/SpiderMan/Spiderman 4.png";
import spiderman1alt from "@/components/Images/SpiderMan/Spiderman 1.jpeg";

// GTA 6 Screenshots
import gta1 from "@/components/Images/Gta 6/grand theft auto 6 1.jpg";
import gta2 from "@/components/Images/Gta 6/grand theft auto 6 2.jpg";
import gta3 from "@/components/Images/Gta 6/grand theft auto 6 3.jpg";
import gta4 from "@/components/Images/Gta 6/grand theft auto 6 4.jpg";
import gta5 from "@/components/Images/Gta 6/grand theft auto 6 5.jpg";

// Need for Speed Screenshots
import nfs1 from "@/components/Images/Need for space/need for speed 1.jpg";
import nfs2 from "@/components/Images/Need for space/need for speed 2.jpg";
import nfs3 from "@/components/Images/Need for space/need for speed 3.jpg";
import nfs4 from "@/components/Images/Need for space/need for speed 4.jpg";
import nfs5 from "@/components/Images/Need for space/need for speed 5.jpg";

// The Last of Us Screenshots
import lastofus1 from "@/components/Images/The Last of us/last of us 1.jpeg";
import lastofus2 from "@/components/Images/The Last of us/last of us 2.jpeg";
import lastofus3 from "@/components/Images/The Last of us/last of us 3.jpeg";
import lastofus4 from "@/components/Images/The Last of us/last of us 4.jpeg";
import lastofus5 from "@/components/Images/The Last of us/last of us 5.jpeg";

// Detroit: Become Human Screenshots
import detroit1 from "@/components/Images/Detroit/detroit become human 1.jpg";
import detroit2 from "@/components/Images/Detroit/detroit become human 2.jpg";
import detroit3 from "@/components/Images/Detroit/detroit become human 3.jpg";
import detroit4 from "@/components/Images/Detroit/detroit become human 4.jpg";
import detroit5 from "@/components/Images/Detroit/detroit become human 5.png";

// A Way Out Screenshots
import awayout1 from "@/components/Images/A way out/a way out 1.jpg";
import awayout2 from "@/components/Images/A way out/a way out 2.png";

// Black Myth Wukong Screenshots
import wukong1 from "@/components/Images/Black Myth Wukong/black myth wukong 1.jpeg";
import wukong2 from "@/components/Images/Black Myth Wukong/black myth wukong 2.jpg";
import wukong3 from "@/components/Images/Black Myth Wukong/black myth wukong 3.jpg";
import wukong4 from "@/components/Images/Black Myth Wukong/black myth wukong 4.jpg";
import wukong5 from "@/components/Images/Black Myth Wukong/black myth wukong 5.jpg";

const gameImages: Record<number, any> = {
  1: cyberpunk2077, 2: spiderman, 3: gta6, 4: needForSpeed, 5: lastOfUs, 6: detroit, 7: aWayOut, 8: blackMythWukong
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
    screenshots: [cyberpunk1, cyberpunk2, cyberpunk3, cyberpunk4, cyberpunk5],
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
    screenshots: [spiderman1, spiderman2, spiderman3, spiderman4, spiderman1alt],
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
    screenshots: [gta1, gta2, gta3, gta4, gta5],
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
    screenshots: [nfs1, nfs2, nfs3, nfs4, nfs5],
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
    screenshots: [lastofus1, lastofus2, lastofus3, lastofus4, lastofus5],
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
    screenshots: [detroit1, detroit2, detroit3, detroit4, detroit5],
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
    screenshots: [awayout1, awayout2, awayout1, awayout2, awayout1],
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
    screenshots: [wukong1, wukong2, wukong3, wukong4, wukong5],
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

// Extended Game Data - Features, Videos, Editions, etc.
const extendedGameData: Record<number, any> = {
  1: { // Cyberpunk 2077
    tagline: "A next-gen open-world RPG set in Night City",
    trailerVideoId: "8X2kIfS6fb8",
    features: [
      { icon: Globe, title: "Open World Freedom", description: "Explore Night City with no loading screens and immersive verticality" },
      { icon: Zap, title: "Deep RPG Systems", description: "Builds, perks, cyberware, and choices that truly matter" },
      { icon: Target, title: "Story & Choices", description: "Decisions shape endings, relationships, and the world around you" },
      { icon: Sparkles, title: "Visual Fidelity", description: "Ray tracing, next-gen lighting, and photorealistic graphics" },
      { icon: Trophy, title: "Replayability", description: "Multiple lifepaths, endings, and playstyles to discover" },
    ],
    aboutTabs: {
      overview: "Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City. As V, a mercenary outlaw, you'll navigate a world obsessed with power, glamour and body modification in your quest for a one-of-a-kind implant—the key to immortality.",
      story: "After a heist goes wrong, V is left with a biochip containing the digital ghost of legendary rocker Johnny Silverhand. Together, they must find a way to separate before V's mind is overwritten. Navigate corporate warfare, gang conflicts, and personal relationships in a story about identity, mortality, and what it means to be alive.",
      gameplay: "Choose your playstyle: run and gun, stealth hacking, or pure melee combat. Upgrade your cyberware with mantis blades, gorilla arms, and neural implants. Hack into systems, manipulate enemies, and take control of the environment. Every approach is viable.",
      world: "Night City is divided into six distinct districts, each with its own culture, gangs, and stories. From the corporate towers of City Center to the gang-ruled streets of Pacifica, every corner hides secrets, gigs, and unforgettable characters.",
      customization: "Modify V's appearance, skills, and abilities. Install cyberware to gain superhuman abilities. Customize weapons and vehicles. Choose your backstory as Nomad, Street Kid, or Corpo—each offering unique dialogue options and story moments.",
    },
    gameplaySystems: [
      { name: "Combat & Cyberware", description: "Engage in visceral gunfights or brutal melee combat enhanced by cyberware implants", bullets: ["Mantis Blades, Gorilla Arms & more", "Weapon customization & mods", "Slow-motion Sandevistan implant"], image: cyberpunk1 },
      { name: "Hacking & Netrunning", description: "Infiltrate systems, control enemies, and turn the environment into a weapon", bullets: ["Breach Protocol mini-games", "Quickhack abilities", "Disable security systems"], image: cyberpunk2 },
      { name: "Character Builds", description: "Deep progression system with perks across five skill trees", bullets: ["Body, Reflexes, Technical, Intelligence, Cool", "Respec your character anytime", "100+ perks to unlock"], image: cyberpunk3 },
    ],
    ratingBreakdown: { 5: 9, 4: 5, 3: 1, 2: 0, 1: 0 },
    editions: [
      { name: "Standard Edition", price: "$59.99", features: ["Base game", "All updates & patches", "Photo mode"], isPopular: false },
      { name: "Deluxe Edition", price: "$79.99", features: ["Base game", "Phantom Liberty expansion", "Bonus items & weapons", "Digital artbook"], isPopular: true },
      { name: "Ultimate Edition", price: "$99.99", features: ["Everything from Deluxe", "Season Pass", "Exclusive cosmetics", "Soundtrack"], isPopular: false },
    ],
    relatedGames: [2, 3, 5],
  },
  2: { // Spider-Man
    tagline: "Swing through Marvel's New York as the iconic web-slinger",
    trailerVideoId: "R2Ebc_OFeug",
    features: [
      { icon: Globe, title: "Iconic New York", description: "Swing through a beautifully recreated Manhattan" },
      { icon: Zap, title: "Fluid Combat", description: "Master acrobatic combat and web-based abilities" },
      { icon: Target, title: "Gripping Story", description: "Experience Peter Parker's greatest challenge yet" },
      { icon: Sparkles, title: "Suit Collection", description: "Unlock and customize dozens of iconic suits" },
      { icon: Trophy, title: "Hero Activities", description: "Stop crimes, solve puzzles, and protect the city" },
    ],
    aboutTabs: {
      overview: "Experience the complete story of Marvel's Spider-Man. Swing through vibrant neighborhoods and fight crime with mastery in this action-packed adventure.",
      story: "Peter Parker has been protecting New York for eight years. When a new threat emerges, he must balance his personal life with his responsibility as Spider-Man. Face iconic villains and forge new alliances in Marvel's New York.",
      gameplay: "Web-swing with unprecedented fluidity and freedom. Combat combines acrobatics, web abilities, and gadgets. Use stealth or go in guns blazing—the choice is yours.",
      world: "Explore all of Manhattan, from Harlem to Chinatown. Each neighborhood is living and breathing with crimes to stop, collectibles to find, and side missions that matter.",
      customization: "Unlock suits from Spider-Man's rich history—each with unique powers. Craft gadgets and upgrade abilities to match your playstyle.",
    },
    gameplaySystems: [
      { name: "Web-Swinging", description: "Physics-based traversal that makes every swing feel authentic and exhilarating", bullets: ["Point Launch and swing", "Wall-run and parkour", "Air tricks and combos"], image: spiderman1 },
      { name: "Combat System", description: "Dynamic combat blending acrobatics with devastating web attacks", bullets: ["Web shooters & gadgets", "Environmental takedowns", "Signature moves"], image: spiderman2 },
      { name: "Suit Powers", description: "Each suit grants unique abilities to enhance your playstyle", bullets: ["40+ suits to unlock", "Unique suit powers", "Mix and match abilities"], image: spiderman3 },
    ],
    ratingBreakdown: { 5: 10, 4: 4, 3: 1, 2: 0, 1: 0 },
    editions: [
      { name: "Standard Edition", price: "$49.99", features: ["Base game", "All post-launch updates", "Photo mode"], isPopular: false },
      { name: "Complete Edition", price: "$69.99", features: ["Base game", "The City That Never Sleeps DLC", "3 story chapters", "New suits & abilities"], isPopular: true },
    ],
    relatedGames: [1, 4, 5],
  },
  3: { // GTA 6
    tagline: "Return to Vice City in the most ambitious GTA yet",
    trailerVideoId: "QdBZY2fkU-0",
    features: [
      { icon: Globe, title: "Massive Open World", description: "Explore the largest and most detailed map in GTA history" },
      { icon: Zap, title: "Dual Protagonists", description: "Play as two characters with intertwining stories" },
      { icon: Target, title: "Next-Gen Heists", description: "Plan and execute elaborate criminal operations" },
      { icon: Sparkles, title: "Living World", description: "Dynamic NPCs, weather, and living ecosystems" },
      { icon: Trophy, title: "Online Evolution", description: "GTA Online taken to unprecedented heights" },
    ],
    aboutTabs: {
      overview: "Return to Vice City in the most ambitious and immersive Grand Theft Auto game ever made. Experience a living, breathing world like never before.",
      story: "Follow two protagonists—Jason and Lucia—as they navigate the criminal underworld of Vice City. From small-time robberies to elaborate heists, build your empire.",
      gameplay: "Experience refined driving, shooting, and stealth mechanics. Plan heists with multiple approaches. Customize vehicles and properties.",
      world: "Vice City and surrounding areas offer unprecedented variety—from neon-lit beaches to dangerous swamps. Every inch is packed with activities.",
      customization: "Customize characters, vehicles, and properties. Build your criminal empire with businesses and safe houses across the map.",
    },
    gameplaySystems: [
      { name: "Heist Planning", description: "Scout locations, recruit crew members, and choose your approach", bullets: ["Multiple approach options", "Recruit specialists", "Risk vs reward systems"], image: gta1 },
      { name: "Vehicle Mastery", description: "Drive, fly, and sail across Vice City with realistic physics", bullets: ["Cars, bikes, boats, aircraft", "Deep customization", "Realistic handling"], image: gta2 },
      { name: "Empire Building", description: "Establish and manage criminal enterprises across the city", bullets: ["Properties and businesses", "Passive income streams", "Territory control"], image: gta3 },
    ],
    ratingBreakdown: { 5: 10, 4: 4, 3: 1, 2: 0, 1: 0 },
    editions: [
      { name: "Standard Edition", price: "$69.99", features: ["Base game", "GTA Online access", "Bonus cash"], isPopular: false },
      { name: "Premium Edition", price: "$99.99", features: ["Base game", "Premium Online content", "$2M bonus cash", "Exclusive vehicles"], isPopular: true },
    ],
    relatedGames: [1, 4, 7],
  },
  4: { // Need For Speed
    tagline: "Own the streets in the ultimate illegal race experience",
    trailerVideoId: "_ODYfDWxVJI",
    features: [
      { icon: Car, title: "Intense Racing", description: "Adrenaline-fueled street races and pursuits" },
      { icon: Zap, title: "Deep Customization", description: "Modify every aspect of your dream car" },
      { icon: Shield, title: "Police Chases", description: "High-stakes pursuits with dynamic AI" },
      { icon: Sparkles, title: "Night City", description: "Race through stunning urban environments" },
      { icon: Trophy, title: "Risk & Reward", description: "Push your limits for bigger payouts" },
    ],
    aboutTabs: {
      overview: "Experience illegal street racing at its finest. Customize your ride, evade the police, and dominate the underground racing scene.",
      story: "Build your reputation from unknown racer to street legend. Navigate rival crews, law enforcement, and high-stakes races.",
      gameplay: "Master drift mechanics, nitrous boosts, and aggressive takedowns. Every race is a battle for supremacy and cash.",
      world: "Race through detailed cityscapes with dynamic weather and time of day. Discover hidden routes and shortcuts.",
      customization: "Modify performance, visuals, and handling. Thousands of parts and paint options to create your perfect ride.",
    },
    gameplaySystems: [
      { name: "Racing Mechanics", description: "Arcade-style racing with drift, nitrous, and aggressive driving", bullets: ["Drift to earn nitrous", "Takedown rivals", "Perfect launch timing"], image: nfs1 },
      { name: "Car Customization", description: "Deep modification system for performance and visual upgrades", bullets: ["Engine swaps", "Visual customization", "Tuning & handling"], image: nfs2 },
      { name: "Heat System", description: "Push your luck to earn more cash but risk losing it all", bullets: ["Heat levels increase rewards", "Escape to bank cash", "High risk, high reward"], image: nfs3 },
    ],
    ratingBreakdown: { 5: 10, 4: 4, 3: 1, 2: 0, 1: 0 },
    editions: [
      { name: "Standard Edition", price: "$59.99", features: ["Base game", "Starter car pack"], isPopular: false },
      { name: "Deluxe Edition", price: "$79.99", features: ["Base game", "Deluxe car pack", "Exclusive customization", "Bonus REP"], isPopular: true },
    ],
    relatedGames: [2, 3, 6],
  },
  5: { // The Last Of Us
    tagline: "A story of survival, loss, and redemption in a pandemic world",
    trailerVideoId: "R2Ebc_OFeug",
    features: [
      { icon: Target, title: "Emotional Storytelling", description: "Experience one of gaming's greatest narratives" },
      { icon: Swords, title: "Tense Combat", description: "Survival-focused combat with limited resources" },
      { icon: Map, title: "Post-Pandemic World", description: "Journey across a beautifully desolate America" },
      { icon: Sparkles, title: "Visual Masterpiece", description: "Stunning graphics and art direction" },
      { icon: Trophy, title: "Character Chemistry", description: "Unforgettable relationship between Joel and Ellie" },
    ],
    aboutTabs: {
      overview: "The Last of Us is a genre-defining experience blending survival and action to tell an emotional story of two survivors in post-pandemic America.",
      story: "Twenty years after a fungal outbreak, Joel must smuggle 14-year-old Ellie across the country. What starts as a job becomes a journey that will change both of them forever. Experience hope, loss, and sacrifice.",
      gameplay: "Scavenge for resources, craft weapons and items, and use stealth or combat to survive. Every bullet counts. Choose when to fight and when to hide.",
      world: "Travel through abandoned cities reclaimed by nature. From Boston's quarantine zone to Salt Lake City, witness humanity's fall and nature's return.",
      customization: "Upgrade Joel's abilities through pills and training. Improve weapons at workbenches. Manage limited resources carefully.",
    },
    gameplaySystems: [
      { name: "Stealth & Survival", description: "Use stealth to avoid or eliminate threats with limited resources", bullets: ["Listen mode to track enemies", "Stealth kills & distractions", "Environmental awareness"], image: lastofus1 },
      { name: "Crafting System", description: "Scavenge materials to craft essential survival items", bullets: ["Health kits & Molotovs", "Upgraded melee weapons", "Resource management"], image: lastofus2 },
      { name: "Infected Combat", description: "Face terrifying infected in various stages of mutation", bullets: ["Runners, Clickers, Bloaters", "Unique behaviors", "Terrifying encounters"], image: lastofus3 },
    ],
    ratingBreakdown: { 5: 12, 4: 2, 3: 1, 2: 0, 1: 0 },
    editions: [
      { name: "Standard Edition", price: "$59.99", features: ["Base game", "Left Behind DLC", "Enhanced graphics"], isPopular: true },
    ],
    relatedGames: [1, 6, 7],
  },
  6: { // Detroit: Become Human
    tagline: "Shape the future through choices in this android revolution",
    trailerVideoId: "QD1pbWCJcKQ",
    features: [
      { icon: Target, title: "Branching Narrative", description: "Every choice shapes the story in meaningful ways" },
      { icon: Swords, title: "Three Perspectives", description: "Play as three unique androids with different stories" },
      { icon: Sparkles, title: "Photorealistic Graphics", description: "Motion-captured performances bring characters to life" },
      { icon: Trophy, title: "Multiple Endings", description: "Dozens of possible outcomes based on your decisions" },
      { icon: Map, title: "Moral Dilemmas", description: "Face difficult choices about consciousness and humanity" },
    ],
    aboutTabs: {
      overview: "Detroit: Become Human is a neo-noir thriller where your choices shape a branching narrative about three androids discovering what it means to be alive.",
      story: "In 2038 Detroit, androids serve humanity. Play as Connor, Kara, and Markus—three androids who must choose between obedience and freedom. Your decisions determine their fate and the fate of their people.",
      gameplay: "Make split-second decisions in tense scenarios. Investigate crime scenes, engage in quick-time events, and shape relationships through dialogue choices.",
      world: "Explore a near-future Detroit where androids are commonplace. Every location is meticulously detailed and every character reacts to your choices.",
      customization: "Your choices customize the story. Relationships, character survival, and the android revolution's outcome all depend on you.",
    },
    gameplaySystems: [
      { name: "Choice & Consequence", description: "Every decision creates ripples that affect the entire narrative", bullets: ["Branching story paths", "Character relationships", "Life or death choices"], image: detroit1 },
      { name: "Investigation", description: "Analyze crime scenes and reconstruct events as Connor", bullets: ["Evidence scanning", "Event reconstruction", "Deduction challenges"], image: detroit2 },
      { name: "Revolution Path", description: "Lead the android revolution as Markus or protect Kara's family", bullets: ["Peaceful or violent", "Multiple endings", "Moral dilemmas"], image: detroit3 },
    ],
    ratingBreakdown: { 5: 10, 4: 4, 3: 1, 2: 0, 1: 0 },
    editions: [
      { name: "Standard Edition", price: "$33.74", features: ["Base game", "Digital art book"], isPopular: true },
    ],
    relatedGames: [5, 7, 8],
  },
  7: { // A Way Out
    tagline: "Two prisoners, one escape—exclusively co-op adventure",
    trailerVideoId: "yGZGSdgJVPM",
    features: [
      { icon: Users, title: "Exclusive Co-op", description: "Designed from the ground up for two players" },
      { icon: Target, title: "Cinematic Story", description: "Emotional narrative with unforgettable twists" },
      { icon: Gamepad2, title: "Split-Screen Action", description: "Asymmetric gameplay and unique perspectives" },
      { icon: Trophy, title: "Varied Gameplay", description: "Action, stealth, driving, and more" },
      { icon: Sparkles, title: "Friend Pass", description: "Invite a friend for free with Friend Pass" },
    ],
    aboutTabs: {
      overview: "A Way Out is an exclusively co-op adventure about two prisoners escaping together. Experience a cinematic story unlike anything else—only in co-op.",
      story: "Leo and Vincent are imprisoned for different crimes. To escape and achieve their goals, they must work together. What begins as a breakout becomes an epic journey across the country.",
      gameplay: "Play online or local split-screen. Work together to solve puzzles, fight enemies, and make critical decisions. Each player has unique moments and perspectives.",
      world: "From prison to Mexico, experience varied locations. Each chapter brings new challenges and gameplay mechanics.",
      customization: "Choices affect character relationships and some story beats. Work together to decide the best approach.",
    },
    gameplaySystems: [
      { name: "Co-op Mechanics", description: "Unique gameplay requiring constant cooperation and communication", bullets: ["Asymmetric tasks", "Synchronized actions", "Split-screen dynamics"], image: awayout1 },
      { name: "Varied Gameplay", description: "Experience action, stealth, driving, and mini-games", bullets: ["Prison escape sequences", "Car chases", "Stealth infiltration"], image: awayout2 },
      { name: "Emotional Journey", description: "Build a bond with your co-op partner through the story", bullets: ["Character development", "Relationship building", "Shocking twists"], image: awayout1 },
    ],
    ratingBreakdown: { 5: 10, 4: 4, 3: 1, 2: 0, 1: 0 },
    editions: [
      { name: "Standard Edition", price: "$29.99", features: ["Base game", "Friend Pass included"], isPopular: true },
    ],
    relatedGames: [5, 6, 8],
  },
  8: { // Black Myth Wukong
    tagline: "Embark on an epic journey as the Destined One",
    trailerVideoId: "O2nNljv0MOw",
    features: [
      { icon: Swords, title: "Souls-like Combat", description: "Challenging and rewarding action combat" },
      { icon: Sparkles, title: "Unreal Engine 5", description: "Stunning visuals powered by next-gen tech" },
      { icon: Trophy, title: "72 Transformations", description: "Transform into various creatures and enemies" },
      { icon: Map, title: "Chinese Mythology", description: "Rich lore from Journey to the West" },
      { icon: Cpu, title: "Deep Customization", description: "Extensive skill trees and staff upgrades" },
    ],
    aboutTabs: {
      overview: "Black Myth: Wukong is an action RPG rooted in Chinese mythology. Become the Destined One and uncover the truth beneath the legend of the Monkey King.",
      story: "Based on Journey to the West, experience a dark reimagining of the legendary tale. Uncover secrets, battle gods and demons, and discover your destiny.",
      gameplay: "Master the staff and transformation abilities. Engage in challenging boss battles that test your skills. Learn enemy patterns and adapt your strategy.",
      world: "Journey through beautifully realized locations from Chinese mythology—from celestial palaces to demon-infested forests.",
      customization: "Unlock abilities across multiple skill trees. Upgrade your staff with different forms. Master transformation powers.",
    },
    gameplaySystems: [
      { name: "Staff Combat", description: "Master various staff techniques and combos", bullets: ["Light & heavy attacks", "Staff stance changes", "Combo mastery"], image: wukong1 },
      { name: "Transformation", description: "Transform into defeated enemies to gain their powers", bullets: ["72 transformation forms", "Unique abilities", "Tactical advantages"], image: wukong2 },
      { name: "Boss Battles", description: "Face legendary creatures from Chinese mythology", bullets: ["Epic encounters", "Pattern recognition", "Challenging difficulty"], image: wukong3 },
    ],
    ratingBreakdown: { 5: 10, 4: 4, 3: 1, 2: 0, 1: 0 },
    editions: [
      { name: "Standard Edition", price: "$59.99", features: ["Base game", "Digital artbook"], isPopular: false },
      { name: "Deluxe Edition", price: "$79.99", features: ["Base game", "Season Pass", "Exclusive armor sets", "Soundtrack"], isPopular: true },
    ],
    relatedGames: [1, 2, 6],
  },
};

export default function GameDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const gameId = id ? parseInt(id as string) : null;
  const baseGame = gameId ? gamesData[gameId] : null;
  const gameExtensions = gameId ? extendedGameData[gameId] : null;
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const game = baseGame && gameExtensions ? { ...baseGame, ...gameExtensions } : baseGame;
  const { addItem } = useCart();
  const { toast } = useToast();
  const { addItem: addWishlistItem, removeItem: removeWishlistItem, items: wishlistItems } = useWishlist();
  const isInWishlist = gameId ? wishlistItems.some(item => item.id === gameId) : false;
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isSystemRequirementsOpen, setIsSystemRequirementsOpen] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Review system state
  const [userReviews, setUserReviews] = useState<any[]>([]);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewLikes, setReviewLikes] = useState<Record<number, number>>({});
  const [reviewComments, setReviewComments] = useState<Record<number, any[]>>({});
  const [activeCommentBox, setActiveCommentBox] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());

  // Fix for scroll bug: Wait until router is ready and game data is loaded
  if (!router.isReady || !game) {
    if (!router.isReady) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

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

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeWishlistItem(game.id);
    } else {
      addWishlistItem({
        id: game.id,
        title: game.title,
        price: effectivePrice,
        image: gameImages[game.id]
      });
    }
  };

  const handleCopyLink = () => {
    const gameUrl = `${window.location.origin}/game/${game.id}`;
    navigator.clipboard.writeText(gameUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShare = (platform: string) => {
    const gameUrl = `${window.location.origin}/game/${game.id}`;
    const gameTitle = game.title;
    const text = `Check out ${gameTitle}!`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + gameUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(gameUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(gameUrl)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(gameTitle)}&body=${encodeURIComponent(text + '\n\n' + gameUrl)}`;
        break;
    }
  };

  const handleSubmitReview = () => {
    if (!reviewComment.trim()) {
      alert("Please write a review comment");
      return;
    }

    const newReview = {
      user: "You",
      rating: reviewRating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      comment: reviewComment
    };

    setUserReviews([newReview, ...userReviews]);
    setReviewComment("");
    setReviewRating(5);
    setIsReviewDialogOpen(false);
  };

  const handleLikeReview = (reviewIndex: number) => {
    if (likedReviews.has(reviewIndex)) {
      // Unlike
      setLikedReviews(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewIndex);
        return newSet;
      });
      setReviewLikes(prev => ({
        ...prev,
        [reviewIndex]: (prev[reviewIndex] || 0) - 1
      }));
    } else {
      // Like
      setLikedReviews(prev => new Set([...Array.from(prev), reviewIndex]));
      setReviewLikes(prev => ({
        ...prev,
        [reviewIndex]: (prev[reviewIndex] || 0) + 1
      }));
    }
  };

  const handleAddComment = (reviewIndex: number) => {
    if (!commentText.trim()) return;

    const newComment = {
      user: "You",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      text: commentText
    };

    setReviewComments(prev => ({
      ...prev,
      [reviewIndex]: [...(prev[reviewIndex] || []), newComment]
    }));

    setCommentText("");
    setActiveCommentBox(null);
  };

  // Combine user reviews with game reviews
  const allReviews = [...userReviews, ...(game?.reviews || [])];

  return (
    <>
      <Head>
        <title>{game.title} - GameVerse</title>
        <meta name="description" content={game.description} />
      </Head>

      <div className="min-h-screen bg-background">
        <Header />
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
        <div className="relative h-[600px] overflow-hidden">
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
              <h1 className="text-5xl font-bold mb-2 text-foreground">{game.title}</h1>
              {game.tagline && (
                <p className="text-xl text-muted-foreground mb-6 italic">
                  "{game.tagline}"
                </p>
              )}
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
              <div className="flex items-center gap-4 flex-wrap">
                <Link href={`/store/transaction?gameId=${game.id}`}>
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                    <Play className="h-5 w-5" />
                    Buy Now
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    handleAddToCart();
                    toast({
                      title: "Added to Cart",
                      description: `${game.title} has been added to your cart.`,
                    });
                  }}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                  <span className="ml-2 text-muted-foreground opacity-60">|</span>
                  {game.discount ? (
                    <>
                      <span className="line-through text-muted-foreground ml-2 text-xs">{game.price}</span>
                      <span className="text-green-500 ml-1">${effectivePrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="ml-2">{game.price}</span>
                  )}
                </Button>
                <Button size="lg" variant="outline" onClick={handleWishlistToggle}>
                  <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                {game.trailerVideoId && (
                  <Button size="lg" variant="outline" className="gap-2" onClick={() => setIsTrailerOpen(true)}>
                    <Play className="h-5 w-5" />
                    Watch Trailer
                  </Button>
                )}
                <Button size="lg" variant="outline" onClick={() => setIsShareDialogOpen(true)}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Why Play This Game - Features */}
        {game.features && game.features.length > 0 && (
          <div className="container mx-auto px-4 py-16 bg-secondary/10">
            <h2 className="text-4xl font-bold text-center mb-12">Why Play This Game?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {game.features.map((feature: any, index: number) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="about" className="w-full">
                <TabsList>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="requirements">System Requirements</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="space-y-6">
                  {game.aboutTabs ? (
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="story">Story</TabsTrigger>
                        <TabsTrigger value="gameplay">Gameplay</TabsTrigger>
                        <TabsTrigger value="world">World</TabsTrigger>
                        <TabsTrigger value="customization">Customization</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview" className="mt-6">
                        <p className="text-muted-foreground leading-relaxed text-lg">{game.aboutTabs.overview}</p>
                      </TabsContent>
                      <TabsContent value="story" className="mt-6">
                        <h3 className="text-2xl font-bold mb-4">Story</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">{game.aboutTabs.story}</p>
                      </TabsContent>
                      <TabsContent value="gameplay" className="mt-6">
                        <h3 className="text-2xl font-bold mb-4">Gameplay</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">{game.aboutTabs.gameplay}</p>
                      </TabsContent>
                      <TabsContent value="world" className="mt-6">
                        <h3 className="text-2xl font-bold mb-4">World</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">{game.aboutTabs.world}</p>
                      </TabsContent>
                      <TabsContent value="customization" className="mt-6">
                        <h3 className="text-2xl font-bold mb-4">Customization</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">{game.aboutTabs.customization}</p>
                      </TabsContent>
                    </Tabs>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-foreground">About This Game</h2>
                      <p className="text-muted-foreground leading-relaxed">{game.longDescription || game.description}</p>
                    </div>
                  )}

                  {/* Gameplay Systems */}
                  {game.gameplaySystems && game.gameplaySystems.length > 0 && (
                    <div className="mt-12 space-y-6">
                      <h2 className="text-3xl font-bold">Gameplay Systems</h2>
                      <div className="space-y-6">
                        {game.gameplaySystems.map((system: any, index: number) => (
                          <GameplaySystemCard
                            key={index}
                            name={system.name}
                            description={system.description}
                            bullets={system.bullets}
                            image={system.image}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Screenshots with Lightbox */}
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold mb-6 text-foreground">Screenshots</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {game.screenshots?.map((screenshot: any, index: number) => (
                        <div
                          key={index}
                          className="relative aspect-video overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity group"
                          onClick={() => {
                            setLightboxIndex(index);
                            setLightboxOpen(true);
                          }}
                        >
                          <Image src={screenshot} alt={`${game.title} screenshot ${index + 1}`} fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
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

        {/* Game Editions */}
        {game.editions && game.editions.length > 0 && (
          <div className="container mx-auto px-4 py-16 bg-secondary/10">
            <h2 className="text-4xl font-bold text-center mb-12">Choose Your Edition</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {game.editions.map((edition: any, index: number) => (
                <EditionCard
                  key={index}
                  name={edition.name}
                  price={edition.price}
                  features={edition.features}
                  isPopular={edition.isPopular}
                  gameId={game.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="container mx-auto px-4 py-16 bg-secondary/5">
          <div className="max-w-7xl mx-auto">
            {/* Reviews Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold">Reviews</h2>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                Based on {game.reviews ? game.reviews.length : 0} reviews
              </Badge>
            </div>

            {/* Rating Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Overall Rating */}
              <Card className="lg:col-span-1">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl font-bold text-foreground mb-2">{game.rating}</div>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-6 w-6 ${i < Math.floor(game.rating) ? 'fill-primary text-primary' : i < game.rating ? 'fill-primary/50 text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <p className="text-muted-foreground">Based on {game.reviews ? game.reviews.length : 0} reviews</p>
                </CardContent>
              </Card>

              {/* Rating Breakdown */}
              {game.ratingBreakdown && (
                <Card className="lg:col-span-2">
                  <CardContent className="p-8">
                    <h3 className="font-semibold text-lg mb-4">Rating Distribution</h3>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = game.ratingBreakdown[rating] || 0;
                        const total = game.reviews ? game.reviews.length : 1;
                        const percentage = (count / total) * 100;
                        return (
                          <div key={rating} className="flex items-center gap-4">
                            <div className="flex items-center gap-1 w-16">
                              <span className="text-sm font-medium">{rating}</span>
                              <Star className="h-4 w-4 fill-primary text-primary" />
                            </div>
                            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Community Reviews</h3>
                <Button onClick={() => setIsReviewDialogOpen(true)} className="bg-primary hover:bg-primary/90">
                  <MessageSquarePlus className="h-4 w-4 mr-2" />
                  Write a Review
                </Button>
              </div>
              {allReviews && allReviews.length > 0 ? allReviews.map((review: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-lg font-bold text-primary">
                              {review.user.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-lg">{review.user}</h4>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < Math.floor(review.rating) ? 'fill-primary text-primary' : i < review.rating ? 'fill-primary/50 text-primary' : 'text-muted'}`}
                              />
                            ))}
                          </div>
                          <span className="text-lg font-bold text-foreground">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4">{review.comment}</p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-4 pt-3 border-t border-border">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikeReview(index)}
                          className={likedReviews.has(index) ? "text-primary" : "text-muted-foreground"}
                        >
                          <ThumbsUp className={`h-4 w-4 mr-1 ${likedReviews.has(index) ? "fill-primary" : ""}`} />
                          Helpful ({reviewLikes[index] || 0})
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveCommentBox(activeCommentBox === index ? null : index)}
                          className="text-muted-foreground"
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Comment ({reviewComments[index]?.length || 0})
                        </Button>
                      </div>

                      {/* Comment Input */}
                      {activeCommentBox === index && (
                        <div className="mt-4 space-y-3">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Write a comment..."
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleAddComment(index)}
                              className="flex-1"
                            />
                            <Button onClick={() => handleAddComment(index)} size="sm">
                              Post
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Comments Thread */}
                      {reviewComments[index] && reviewComments[index].length > 0 && (
                        <div className="mt-4 space-y-3 pl-4 border-left-2 border-l-2 border-primary/20">
                          {reviewComments[index].map((comment: any, commentIdx: number) => (
                            <div key={commentIdx} className="bg-secondary/30 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm text-foreground">{comment.user}</span>
                                <span className="text-xs text-muted-foreground">{comment.date}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{comment.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                      <Star className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                    <p className="text-muted-foreground">Be the first to review this game!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>


        {/* Related Games */}
        {game.relatedGames && game.relatedGames.length > 0 && (
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold mb-12">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {game.relatedGames.map((relatedId: number) => {
                const relatedGame = gamesData[relatedId];
                if (!relatedGame) return null;
                return (
                  <RelatedGameCard
                    key={relatedId}
                    id={relatedGame.id}
                    title={relatedGame.title}
                    price={relatedGame.price}
                    discount={relatedGame.discount}
                    rating={relatedGame.rating}
                    image={gameImages[relatedGame.id]}
                    genre={relatedGame.genre}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {/* Share buttons */}
            <div className="grid grid-cols-5 gap-4">
              {/* WhatsApp */}
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <span className="text-xs font-medium">WhatsApp</span>
              </button>

              {/* X (Twitter) */}
              <button
                onClick={() => handleShare('twitter')}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <span className="text-xs font-medium">X</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleShare('facebook')}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-[#1877F2] flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="text-xs font-medium">Facebook</span>
              </button>

              {/* Email */}
              <button
                onClick={() => handleShare('email')}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-gray-600 flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-medium">Email</span>
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
                  {copiedLink ? (
                    <Check className="w-7 h-7 text-white" />
                  ) : (
                    <Copy className="w-7 h-7 text-white" />
                  )}
                </div>
                <span className="text-xs font-medium">Copy</span>
              </button>
            </div>

            {/* Link display */}
            <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
              <input
                type="text"
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/game/${game.id}`}
                readOnly
                className="flex-1 bg-transparent border-none outline-none text-sm"
              />
              <Button
                size="sm"
                onClick={handleCopyLink}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {copiedLink ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Trailer Dialog */}
      <Dialog open={isTrailerOpen} onOpenChange={setIsTrailerOpen}>
        <DialogContent className="max-w-[95vw] w-[95vw] h-[95vh] p-0 bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            {isTrailerOpen && game.trailerVideoId && (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${game.trailerVideoId}?autoplay=1&mute=0&loop=1&playlist=${game.trailerVideoId}&rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1`}
                title={`${game.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Lightbox */}
      <ImageLightbox
        images={game.screenshots || []}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        gameTitle={game.title}
      />

      {/* Review Submission Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Write a Review for {game.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 cursor-pointer ${star <= reviewRating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-lg font-semibold">{reviewRating}/5</span>
              </div>
            </div>
            <div>
              <label htmlFor="review-comment" className="text-sm font-medium mb-2 block">
                Your Review
              </label>
              <Textarea
                id="review-comment"
                placeholder="Share your thoughts about this game..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={5}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitReview} className="bg-primary">
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}



