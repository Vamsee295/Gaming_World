import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Card3D from "@/components/ui/Card3D";
import dynamic from "next/dynamic";

// Dynamically import particle component to avoid SSR issues
// TODO: Uncomment after npm install completes
// const AmbientParticles = dynamic(() => import("@/components/effects/AmbientParticles"), {
//   ssr: false,
// });
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Gamepad2, Star, ShoppingCart, TrendingUp, Zap, Clock, Search, X, Heart, Sun, Moon, Bell, Users, ChevronLeft, ChevronRight, ArrowUp, Play, ExternalLink, SlidersHorizontal, Monitor, Youtube, Twitter, Shield, Eye } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import SignIn from "@/components/SignIn";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useWishlist } from "@/context/WishlistContext";
import { useFriends } from "@/context/FriendsContext";
import { useNotifications } from "@/context/NotificationsContext";
import NotificationPanel from "@/components/notifications/NotificationPanel";
import FriendsSidebar from "@/components/friends/FriendsSidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import ChangePhotoDialog from "@/components/profile/ChangePhotoDialog";
import NewsletterSignup from "@/components/NewsletterSignup";
import cyberpunk2077 from "@/components/Images/Store Images/cyberpunk-2077.jpg";
import spiderman from "@/components/Images/Store Images/spiderman.jpg";
import gta6 from "@/components/Images/Store Images/gta-6.webp";
import needForSpeed from "@/components/Images/Store Images/need-for-speed.jpg";
import lastOfUs from "@/components/Images/Store Images/last-of-us.webp";
import detroit from "@/components/Images/Store Images/detroit-become-human.webp";
import aWayOut from "@/components/Images/Store Images/a-way-out.webp";
import blackMythWukong from "@/components/Images/Store Images/black-myth-wukong.webp";
import recommendationApi, { GameDTO } from "@/util/recommendationApi";

interface Game {
  id: number;
  title: string;
  price: string;
  discount?: number;
  image: any;
  rating: number;
  genre: string;
  featured?: boolean;
  trailerVideoId?: string;
  reviewCount?: number;
  releaseYear?: string;
  platforms?: string[];
}

const games: Game[] = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    price: "$59.99",
    discount: 20,
    image: cyberpunk2077,
    rating: 4.8,
    genre: "RPG",
    featured: true,
    trailerVideoId: "8X2kIfS6fb8",
    reviewCount: 23400,
    releaseYear: "2020",
    platforms: ["PC", "PlayStation", "Xbox"]
  },
  {
    id: 2,
    title: "Marvel's Spiderman",
    price: "$49.99",
    discount: 15,
    image: spiderman,
    rating: 4.6,
    genre: "Strategy",
    trailerVideoId: "R2Ebc_OFeug",
    reviewCount: 18700,
    releaseYear: "2018",
    platforms: ["PC", "PlayStation"]
  },
  {
    id: 3,
    title: "Grand Theft Auto 6",
    price: "$39.99",
    image: gta6,
    rating: 4.7,
    genre: "Racing",
    trailerVideoId: "QdBZY2fkU-0",
    reviewCount: 45200,
    releaseYear: "2024",
    platforms: ["PC", "PlayStation", "Xbox"]
  },
  {
    id: 4,
    title: "Need For Speed",
    price: "$59.99",
    discount: 30,
    image: needForSpeed,
    rating: 4.9,
    genre: "Action",
    trailerVideoId: "_ODYfDWxVJI",
    reviewCount: 31500,
    releaseYear: "2023",
    platforms: ["PC", "PlayStation", "Xbox"]
  },
  {
    id: 5,
    title: "The Last Of Us",
    price: "$0.00",
    image: lastOfUs,
    rating: 4.5,
    genre: "FPS",
    trailerVideoId: "R2Ebc_OFeug",
    reviewCount: 52800,
    releaseYear: "2013",
    platforms: ["PC", "PlayStation"]
  },
  {
    id: 6,
    title: "Detroit : Become Human",
    price: "$44.99",
    discount: 25,
    image: detroit,
    rating: 4.8,
    genre: "MMORPG",
    trailerVideoId: "QD1pbWCJcKQ",
    reviewCount: 15900,
    releaseYear: "2018",
    platforms: ["PC", "PlayStation"]
  },
  {
    id: 7,
    title: "A Way Out",
    price: "$29.99",
    image: aWayOut,
    rating: 4.4,
    genre: "Horror",
    trailerVideoId: "yGZGSdgJVPM",
    reviewCount: 8700,
    releaseYear: "2018",
    platforms: ["PC", "PlayStation", "Xbox"]
  },
  {
    id: 8,
    title: "Black Myth Wukong",
    price: "$0.00",
    image: blackMythWukong,
    rating: 4.6,
    genre: "Battle Royale",
    trailerVideoId: "O2nNljv0MOw",
    reviewCount: 12300,
    releaseYear: "2024",
    platforms: ["PC", "PlayStation"]
  }
];

const categories = [
  { name: "Action", icon: Zap, count: 342, description: "Fast-paced adventures" },
  { name: "RPG", icon: Gamepad2, count: 215, description: "Epic story-driven games" },
  { name: "Strategy", icon: TrendingUp, count: 128, description: "Tactical challenges" },
  { name: "Racing", icon: Clock, count: 97, description: "High-speed thrills" }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [filteredGames, setFilteredGames] = useState(games);
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [countdownTime, setCountdownTime] = useState("");
  const gamesPerPage = 8;
  const featuredGames = games.filter(g => g.featured || g.discount).slice(0, 3);
  const featuredGame = featuredGames[currentCarouselIndex] || games[0];
  const { totalItems, addItem } = useCart();
  const { user, isAuthenticated, signOut, updateAvatar } = useUser();
  const { totalItems: wishlistCount, addItem: addWishlistItem } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const fileInputId = "avatar-file-input";
  const { pendingRequestsCount } = useFriends();
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [clearSessionData, setClearSessionData] = useState(false);
  const [signOutStatus, setSignOutStatus] = useState("");
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isFriendsSidebarOpen, setIsFriendsSidebarOpen] = useState(false);
  const { unreadCount } = useNotifications();

  // Personalized recommendation sections state
  const [continuePlayingGames, setContinuePlayingGames] = useState<GameDTO[]>([]);
  const [recommendedGames, setRecommendedGames] = useState<GameDTO[]>([]);
  const [trendingGames, setTrendingGames] = useState<GameDTO[]>([]);
  const [personalizedDeals, setPersonalizedDeals] = useState<GameDTO[]>([]);
  const [editorChoiceGames, setEditorChoiceGames] = useState<GameDTO[]>([]);
  const [recentlyReleasedGames, setRecentlyReleasedGames] = useState<GameDTO[]>([]);
  const [budgetGames, setBudgetGames] = useState<GameDTO[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);

  // Helper function to format review counts
  const formatReviewCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // Helper function to get platform icon
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "PC":
        return <Monitor className="h-3 w-3" />;
      case "PlayStation":
      case "Xbox":
        return <Gamepad2 className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const handleSignOut = () => {
    // Clear session data if toggle is checked
    if (clearSessionData) {
      // Clear localStorage, cookies, etc.
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (error) {
        console.error("Error clearing storage:", error);
      }
    }

    // Show success message
    setSignOutStatus("Successfully signed out. Redirecting to login...");

    // Sign out after a short delay
    setTimeout(() => {
      signOut();
      setIsSignOutOpen(false);
      setClearSessionData(false);
      setSignOutStatus("");
    }, 2000);
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSignOutOpen) {
        setIsSignOutOpen(false);
        setClearSessionData(false);
        setSignOutStatus("");
      }
    };

    if (isSignOutOpen) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [isSignOutOpen]);

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search and filter functionality
  useEffect(() => {
    let filtered = [...games];

    // Search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(query) ||
        game.genre.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(game => game.genre === selectedCategory);
    }

    // Price filter
    if (priceFilter !== "all") {
      filtered = filtered.filter(game => {
        const price = parseFloat(game.price.slice(1));
        switch (priceFilter) {
          case "free":
            return price === 0;
          case "under10":
            return price > 0 && price < 10;
          case "10-30":
            return price >= 10 && price <= 30;
          case "30-50":
            return price > 30 && price <= 50;
          case "over50":
            return price > 50;
          default:
            return true;
        }
      });
    }

    // Rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(game => game.rating >= ratingFilter);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.slice(1));
          const priceB = parseFloat(b.price.slice(1));
          return priceA - priceB;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.slice(1));
          const priceB = parseFloat(b.price.slice(1));
          return priceB - priceA;
        });
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => {
          const yearA = parseInt(a.releaseYear || "0");
          const yearB = parseInt(b.releaseYear || "0");
          return yearB - yearA;
        });
        break;
      case "popular":
      default:
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
    }

    setFilteredGames(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, priceFilter, ratingFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch all personalized recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoadingRecommendations(true);

      try {
        // Fetch all sections in parallel for better performance
        const [
          continueData,
          recommendedData,
          trendingData,
          dealsData,
          editorData,
          recentData,
          budgetData
        ] = await Promise.all([
          isAuthenticated ? recommendationApi.getContinuePlaying() : Promise.resolve([]),
          isAuthenticated ? recommendationApi.getRecommendedGames() : Promise.resolve([]),
          recommendationApi.getTrendingGames(),
          isAuthenticated ? recommendationApi.getPersonalizedDeals() : Promise.resolve([]),
          recommendationApi.getEditorChoice(),
          recommendationApi.getRecentlyReleased(),
          recommendationApi.getBudgetGames()
        ]);

        setContinuePlayingGames(continueData);
        setRecommendedGames(recommendedData);
        setTrendingGames(trendingData);
        setPersonalizedDeals(dealsData);
        setEditorChoiceGames(editorData);
        setRecentlyReleasedGames(recentData);
        setBudgetGames(budgetData);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setIsLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, [isAuthenticated]);

  // Track game view (called when user clicks on a game)
  const handleGameClick = (gameId: number) => {
    if (isAuthenticated) {
      recommendationApi.trackActivity(gameId, 'CLICK');
    }
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (featuredGames.length > 1) {
      const interval = setInterval(() => {
        setCurrentCarouselIndex((prev) => (prev + 1) % featuredGames.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredGames.length]);

  // Countdown timer for Weekend Sale
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentHour = now.getHours();

      // Calculate next Sunday 11:59 PM
      let daysUntilSunday = 7 - currentDay;
      if (daysUntilSunday === 0 && currentHour >= 23) {
        daysUntilSunday = 7;
      } else if (daysUntilSunday === 0) {
        daysUntilSunday = 0;
      }

      const endOfWeekend = new Date(now);
      endOfWeekend.setDate(now.getDate() + daysUntilSunday);
      endOfWeekend.setHours(23, 59, 59, 999);

      const diff = endOfWeekend.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdownTime("Offer ended");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      let timeString = "";
      if (days > 0) timeString += `${days}d `;
      if (hours > 0 || days > 0) timeString += `${hours}h `;
      timeString += `${minutes}m ${seconds}s`;

      setCountdownTime(timeString.trim());
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <Head>
        <title>GameVerse - Your Ultimate PC Gaming Platform</title>
        <meta name="description" content="Discover and play the best PC games" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-background relative">
        {/* Ambient Particles Background */}
        {/* TODO: Uncomment after npm install completes */}
        {/* <AmbientParticles /> */}
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="sticky top-0 z-50 border-b border-border glass-dark"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  <Gamepad2 className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold text-foreground">GameVerse</span>
                </motion.div>
                <div className="hidden md:flex items-center gap-6">
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Store</Link>
                  <Link href="/library" className="text-muted-foreground hover:text-foreground transition-colors">Library</Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                      Community
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href="/community">Community Home</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/community/forums">Forums & Discussions</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/community/groups">Groups & Communities</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/community/activity">Activity Feed</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/community/events">Events & Tournaments</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/community/friends">Find Friends</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search games..."
                    className="pl-10 pr-8 w-64 bg-secondary border-border"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <Link href="/store/wishlist" className="relative hidden md:block text-muted-foreground hover:text-foreground">
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="ml-2 rounded-full bg-primary text-primary-foreground text-xs px-1.5 py-0.5">{wishlistCount}</span>
                  )}
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Link href="/store/cart" className="relative" title="Secure Checkout with SSL Encryption">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
                      {totalItems}
                    </span>
                  )}
                </Link>
                {isAuthenticated && (
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsNotificationPanelOpen(!isNotificationPanelOpen)}
                    >
                      <Bell className="h-5 w-5" />
                    </Button>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                )}
                {!isAuthenticated ? (
                  <Button onClick={() => setIsSignInOpen(true)}>Sign In</Button>
                ) : (
                  <>
                    <input id={fileInputId} type="file" accept="image/*" className="hidden" onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (f) await updateAvatar(f);
                    }} />
                    {/* Friends icon - placed left of profile */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative"
                      onClick={() => setIsFriendsSidebarOpen(!isFriendsSidebarOpen)}
                    >
                      <Users className="h-5 w-5" />
                      {pendingRequestsCount > 0 && (
                        <span className="absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">{pendingRequestsCount}</span>
                      )}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-full focus:outline-none">
                        <div className="relative h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-foreground">
                          <Users className="h-5 w-5" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-64">
                        <DropdownMenuLabel className="text-foreground">Friends</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setIsFriendsSidebarOpen(true)}>
                          Open Friends Panel
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/profile/friends">View Friends</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/community/friends?tab=add">Add Friend</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/community/friends?tab=requests">
                            Friend Requests
                            {pendingRequestsCount > 0 && (
                              <Badge className="ml-2 bg-primary text-primary-foreground">{pendingRequestsCount}</Badge>
                            )}
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-full focus:outline-none">
                        <div className="relative h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-foreground">
                          {user?.avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={user.avatarUrl} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                          ) : (
                            <span className="font-semibold">{user?.name?.charAt(0).toUpperCase()}</span>
                          )}
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-64">
                        <DropdownMenuLabel className="text-foreground">{user?.name}</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setIsPhotoDialogOpen(true)}>Change Photo</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/profile/achievements">My Achievements</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/profile/rewards">GameVerse Rewards <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/profile/balance">Account Balance <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/profile/coupons">Coupons</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/settings/account">Account <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/redeem">Redeem Code</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/redeem/fortnite">Redeem Fortnite Gift Card <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/support/terms">Terms of Service <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/settings/privacy">Privacy Policy <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/support/refund-policy">Store Refund Policy <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/store/publishers">Publisher Index <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setIsSignOutOpen(true)}>Sign Out</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Carousel Section - Hidden when searching */}
        {!searchQuery && featuredGames.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] overflow-hidden"
            style={{ perspective: '1000px' }}
          >
            <div className="absolute inset-0">
              <Image
                src={featuredGame.image as any}
                alt={featuredGame.title}
                fill
                className="object-cover transition-opacity duration-500"
                priority
                key={currentCarouselIndex}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>

            {/* Carousel Navigation */}
            {featuredGames.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentCarouselIndex((prev) => (prev - 1 + featuredGames.length) % featuredGames.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/80 hover:bg-background border border-border flex items-center justify-center transition-all"
                  aria-label="Previous game"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setCurrentCarouselIndex((prev) => (prev + 1) % featuredGames.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/80 hover:bg-background border border-border flex items-center justify-center transition-all"
                  aria-label="Next game"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
                  {featuredGames.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCarouselIndex(index)}
                      className={`rounded-full transition-all hover:scale-110 ${index === currentCarouselIndex
                        ? 'h-3 w-10 bg-primary shadow-lg shadow-primary/50'
                        : 'h-3 w-3 bg-muted-foreground/50 hover:bg-muted-foreground'
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="relative container mx-auto px-4 h-full flex items-end pb-20">
              <motion.div
                key={currentCarouselIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <Badge className="mb-4 bg-primary text-primary-foreground">Featured Game</Badge>
                <h1 className="text-6xl font-bold mb-4 text-foreground">{featuredGame.title}</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Experience the next generation of gaming with stunning visuals and immersive gameplay.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="text-foreground font-semibold">{featuredGame.rating}</span>
                  </div>
                  <Badge variant="secondary">{featuredGame.genre}</Badge>
                  {featuredGame.discount && (
                    <Badge className="bg-green-600 text-white">-{featuredGame.discount}% OFF</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <Link href={`/game/${featuredGame.id}`}>
                    <Button size="lg" className="gap-2 glow-gradient">
                      <Play className="h-5 w-5" />
                      Purchase
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 btn-ripple"
                    onClick={() => {
                      const basePrice = parseFloat(featuredGame.price.slice(1));
                      const effective = featuredGame.discount ? basePrice * (1 - featuredGame.discount / 100) : basePrice;
                      addItem({ id: featuredGame.id, title: featuredGame.title, price: Number(effective.toFixed(2)), image: featuredGame.image });
                    }}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {featuredGame.discount ? (
                      <>
                        <span className="line-through text-muted-foreground">{featuredGame.price}</span>
                        <span className="text-green-500">
                          ${(parseFloat(featuredGame.price.slice(1)) * (1 - featuredGame.discount / 100)).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span>{featuredGame.price}</span>
                    )}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 btn-ripple"
                    onClick={() => {
                      const basePrice = parseFloat(featuredGame.price.slice(1));
                      const effective = featuredGame.discount ? basePrice * (1 - featuredGame.discount / 100) : basePrice;
                      addWishlistItem({ id: featuredGame.id, title: featuredGame.title, price: Number(effective.toFixed(2)), image: featuredGame.image as any });
                    }}
                    aria-label="Add to wishlist"
                  >
                    <Heart className="h-5 w-5" />
                    Wishlist
                  </Button>
                </div>
              </motion.div>
            </div>

          </motion.section>
        )}

        {/* Loading State for Recommendations */}
        {isLoadingRecommendations && (
          <section className="container mx-auto px-4 py-8">
            <div className="space-y-8">
              <div className="skeleton h-8 w-64 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="skeleton h-64 rounded-lg"></div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Personalized Recommendation Sections */}

        {/* 1. Continue Where You Left Off (Only show if user has history) */}
        {isAuthenticated && continuePlayingGames.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-foreground">Continue Where You Left Off</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {continuePlayingGames.map((game) => (
                  <Card3D key={game.id} className="group cursor-pointer" intensity={10}>
                    <Link href={`/game/${game.id}`} onClick={() => handleGameClick(game.id)}>
                      <div className="relative overflow-hidden rounded-lg border border-border bg-secondary">
                        <div className="aspect-[16/9] overflow-hidden relative">
                          <img
                            src={game.imageUrl || '/placeholder-game.jpg'}
                            alt={game.title}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                            {game.title}
                          </h3>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="secondary">{game.genre}</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="text-sm text-foreground">{game.rating?.toFixed(1)}</span>
                            </div>
                          </div>
                          {game.lastPlayedTime && (
                            <p className="text-xs text-muted-foreground mb-2">{game.lastPlayedTime}</p>
                          )}
                          <Button size="sm" className="w-full gap-2">
                            <Play className="h-4 w-4" />
                            Continue Playing
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </Card3D>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* 2. Recommended For You ⭐ (MOST IMPORTANT) */}
        {isAuthenticated && recommendedGames.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-3xl font-bold text-foreground">Recommended For You</h2>
                <Badge className="bg-primary">Personalized</Badge>
              </div>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-6" style={{ width: 'max-content' }}>
                  {recommendedGames.map((game) => (
                    <Card3D key={game.id} className="group cursor-pointer w-64 flex-shrink-0" intensity={10}>
                      <Link href={`/game/${game.id}`} onClick={() => handleGameClick(game.id)}>
                        <div className="relative overflow-hidden rounded-lg border border-border bg-secondary">
                          <div className="aspect-[16/9] overflow-hidden relative">
                            <img
                              src={game.imageUrl || '/placeholder-game.jpg'}
                              alt={game.title}
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                            {game.discount && game.discount > 0 && (
                              <div className="absolute top-3 right-3">
                                <Badge className="bg-green-600 text-white">-{game.discount}%</Badge>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                              {game.title}
                            </h3>
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="secondary">{game.genre}</Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                <span className="text-sm text-foreground">{game.rating?.toFixed(1)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {game.discount && game.discount > 0 ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm line-through text-muted-foreground">${game.price}</span>
                                  <span className="text-lg font-bold text-green-500">${game.effectivePrice?.toFixed(2)}</span>
                                </div>
                              ) : (
                                <span className="text-lg font-bold text-foreground">
                                  {game.isFreeToPlay ? 'Free' : `$${game.price}`}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Card3D>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* 3. Trending This Week */}
        {trendingGames.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-3xl font-bold text-foreground">Trending This Week</h2>
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-6" style={{ width: 'max-content' }}>
                  {trendingGames.slice(0, 10).map((game) => (
                    <Card3D key={game.id} className="group cursor-pointer w-56 flex-shrink-0" intensity={8}>
                      <Link href={`/game/${game.id}`} onClick={() => handleGameClick(game.id)}>
                        <div className="relative overflow-hidden rounded-lg border border-border bg-secondary">
                          <div className="aspect-[3/4] overflow-hidden relative">
                            <img
                              src={game.imageUrl || '/placeholder-game.jpg'}
                              alt={game.title}
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="text-md font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                              {game.title}
                            </h3>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-primary text-primary" />
                              <span className="text-sm text-foreground">{game.rating?.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Card3D>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* 4. Deals Just For You */}
        {isAuthenticated && personalizedDeals.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-foreground">Deals Just For You 🔥</h2>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-6" style={{ width: 'max-content' }}>
                  {personalizedDeals.map((game) => (
                    <Card3D key={game.id} className="group cursor-pointer w-64 flex-shrink-0" intensity={10}>
                      <Link href={`/game/${game.id}`} onClick={() => handleGameClick(game.id)}>
                        <div className="relative overflow-hidden rounded-lg border border-border bg-secondary">
                          <div className="aspect-[16/9] overflow-hidden relative">
                            <img
                              src={game.imageUrl || '/placeholder-game.jpg'}
                              alt={game.title}
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-red-600 text-white animate-pulse">-{game.discount}% OFF</Badge>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                              {game.title}
                            </h3>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-sm line-through text-muted-foreground">${game.price}</span>
                                <span className="text-xl font-bold text-green-500">${game.effectivePrice?.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Card3D>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* 5. Editor's Choice */}
        {editorChoiceGames.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-3xl font-bold text-foreground">Editor's Choice</h2>
                <Badge variant="outline">Curated</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {editorChoiceGames.slice(0, 6).map((game) => (
                  <Card3D key={game.id} className="group cursor-pointer" intensity={10}>
                    <Link href={`/game/${game.id}`} onClick={() => handleGameClick(game.id)}>
                      <div className="relative overflow-hidden rounded-lg border border-border bg-secondary">
                        <div className="aspect-[16/9] overflow-hidden relative">
                          <img
                            src={game.imageUrl || '/placeholder-game.jpg'}
                            alt={game.title}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-purple-600 text-white">Editor's Pick</Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                            {game.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{game.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary">{game.genre}</Badge>
                            <span className="text-lg font-bold text-foreground">
                              {game.isFreeToPlay ? 'Free' : `$${game.price}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card3D>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* 6. Recently Released */}
        {recentlyReleasedGames.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-3xl font-bold text-foreground">Recently Released</h2>
                <Badge className="bg-blue-600">New</Badge>
              </div>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-6" style={{ width: 'max-content' }}>
                  {recentlyReleasedGames.map((game) => (
                    <Card3D key={game.id} className="group cursor-pointer w-64 flex-shrink-0" intensity={10}>
                      <Link href={`/game/${game.id}`} onClick={() => handleGameClick(game.id)}>
                        <div className="relative overflow-hidden rounded-lg border border-border bg-secondary">
                          <div className="aspect-[16/9] overflow-hidden relative">
                            <img
                              src={game.imageUrl || '/placeholder-game.jpg'}
                              alt={game.title}
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-blue-600 text-white">NEW</Badge>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                              {game.title}
                            </h3>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="secondary">{game.genre}</Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                <span className="text-sm text-foreground">{game.rating?.toFixed(1)}</span>
                              </div>
                            </div>
                            <span className="text-lg font-bold text-foreground">
                              {game.isFreeToPlay ? 'Free' : `$${game.price}`}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </Card3D>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* 7. Free to Play / Under $20 */}
        {budgetGames.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-foreground">Free to Play & Under $20</h2>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-6" style={{ width: 'max-content' }}>
                  {budgetGames.map((game) => (
                    <Card3D key={game.id} className="group cursor-pointer w-64 flex-shrink-0" intensity={10}>
                      <Link href={`/game/${game.id}`} onClick={() => handleGameClick(game.id)}>
                        <div className="relative overflow-hidden rounded-lg border border-border bg-secondary">
                          <div className="aspect-[16/9] overflow-hidden relative">
                            <img
                              src={game.imageUrl || '/placeholder-game.jpg'}
                              alt={game.title}
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                            {game.isFreeToPlay && (
                              <div className="absolute top-3 left-3">
                                <Badge className="bg-green-600 text-white">FREE</Badge>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                              {game.title}
                            </h3>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="secondary">{game.genre}</Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                <span className="text-sm text-foreground">{game.rating?.toFixed(1)}</span>
                              </div>
                            </div>
                            <span className="text-xl font-bold text-green-600">
                              {game.isFreeToPlay ? 'Free to Play' : `$${game.price}`}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </Card3D>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Categories */}
        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-foreground">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Link href="/store/deals" key={category.name}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="h-full bg-card rounded-xl border border-border/50 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer overflow-hidden group">
                        <CardContent className="p-8 flex flex-col items-center text-center relative">
                          {/* Animated background gradient on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <div className="relative z-10 w-full">
                            <div className="w-20 h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-5 mx-auto transition-all duration-300 group-hover:scale-110">
                              <Icon className="h-10 w-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                              {category.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {(category as any).description}
                            </p>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-medium">
                              <span className="text-primary font-bold">{(category as any).count}</span>
                              <span className="text-muted-foreground">games</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Games Grid */}
        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <h2 className="text-3xl font-bold text-foreground">Trending Games</h2>
              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newly Released</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
                <Tabs defaultValue="all" className="w-auto">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="new">New</TabsTrigger>
                    <TabsTrigger value="sale">On Sale</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-6 border border-border rounded-lg bg-secondary space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">Price Range</label>
                    <Select value={priceFilter} onValueChange={setPriceFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Prices" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="under10">Under $10</SelectItem>
                        <SelectItem value="10-30">$10 - $30</SelectItem>
                        <SelectItem value="30-50">$30 - $50</SelectItem>
                        <SelectItem value="over50">Over $50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">Minimum Rating</label>
                    <div className="space-y-2">
                      <Slider
                        value={[ratingFilter]}
                        onValueChange={(value) => setRatingFilter(value[0])}
                        max={5}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0</span>
                        <span className="font-medium">{ratingFilter.toFixed(1)}</span>
                        <span>5.0</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPriceFilter("all");
                        setRatingFilter(0);
                      }}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {paginatedGames.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground text-lg">No games found matching your filters</p>
                </div>
              ) : (
                paginatedGames.map((game) => (
                  <Card3D key={game.id} className="group cursor-pointer" intensity={10}>
                    <Link href={`/game/${game.id}`}>
                      <motion.div
                        variants={itemVariants}
                        className="relative overflow-hidden rounded-lg border border-border bg-secondary card-3d-content"
                      >
                        <div className="aspect-[16/9] overflow-hidden relative">
                          <Image
                            src={game.image as any}
                            alt={game.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        {game.discount && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-green-600 text-white badge-glow">-{game.discount}%</Badge>
                          </div>
                        )}
                        {/* Active Players Badge for Popular Games */}
                        {game.reviewCount && game.reviewCount > 30000 && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-blue-600/90 text-white flex items-center gap-1 backdrop-blur-sm">
                              <Users className="h-3 w-3" />
                              Popular
                            </Badge>
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                            {game.title}
                          </h3>
                          {/* Platform Icons & Release Year */}
                          <div className="flex items-center gap-2 mb-2">
                            {game.platforms && game.platforms.length > 0 && (
                              <div className="flex items-center gap-1">
                                {game.platforms.slice(0, 3).map((platform, idx) => (
                                  <div key={idx} className="text-muted-foreground" title={platform}>
                                    {getPlatformIcon(platform)}
                                  </div>
                                ))}
                              </div>
                            )}
                            {game.releaseYear && (
                              <>
                                <span className="text-muted-foreground text-xs">•</span>
                                <span className="text-muted-foreground text-xs">{game.releaseYear}</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="secondary" className="smooth-hover">{game.genre}</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="text-sm text-foreground">{game.rating}</span>
                              {game.reviewCount && (
                                <span className="text-xs text-muted-foreground ml-1">
                                  ({formatReviewCount(game.reviewCount)})
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            {game.discount ? (
                              <div className="flex items-center gap-2">
                                <span className="text-sm line-through text-muted-foreground price-shake">{game.price}</span>
                                <span className="text-lg font-bold text-green-500 price-slide-in price-glow">
                                  ${(parseFloat(game.price.slice(1)) * (1 - game.discount / 100)).toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-foreground">
                                {game.price === "$0.00" ? "Free" : game.price}
                              </span>
                            )}
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="btn-ripple glow-gradient-hover"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const basePrice = parseFloat(game.price.slice(1));
                                  const effective = game.discount ? basePrice * (1 - game.discount / 100) : basePrice;
                                  addItem({ id: game.id, title: game.title, price: Number(effective.toFixed(2)), image: game.image });
                                }}
                              >
                                <ShoppingCart className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="btn-ripple"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const basePrice = parseFloat(game.price.slice(1));
                                  const effective = game.discount ? basePrice * (1 - game.discount / 100) : basePrice;
                                  addWishlistItem({ id: game.id, title: game.title, price: Number(effective.toFixed(2)), image: game.image as any });

                                  // Store SVG reference before setTimeout
                                  const svg = e.currentTarget.querySelector('svg');
                                  if (svg) {
                                    svg.classList.add('animate-heart-pop');
                                    setTimeout(() => {
                                      svg.classList.remove('animate-heart-pop');
                                    }, 300);
                                  }
                                }}
                                aria-label="Add to wishlist"
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </Card3D>
                )))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => setCurrentPage(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </motion.div>
        </section>

        {/* Special Offers */}
        <section className="container mx-auto px-4 py-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 rounded-lg border border-border p-12 text-center backdrop-blur-sm"
            style={{
              boxShadow: '0 0 50px rgba(147, 51, 234, 0.2), inset 0 0 50px rgba(6, 182, 212, 0.1)',
            }}
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />

            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4 text-foreground">Weekend Special Sale</h2>
              {countdownTime && (
                <p className="text-xl text-muted-foreground mb-2">
                  Offer ends in: <span className="font-bold text-primary">{countdownTime}</span>
                </p>
              )}
              <p className="text-xl text-muted-foreground mb-8">
                Save up to 75% on selected titles. Offer ends soon!
              </p>
              <Link href="/store/deals">
                <Button size="lg" className="gap-2 glow-gradient text-lg px-8">
                  <TrendingUp className="h-5 w-5" />
                  View All Deals
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Community Stats - Square Cards */}
        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-foreground text-center">Our Community Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-card rounded-xl border border-border/50 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer overflow-hidden group">
                  <CardContent className="p-8 flex flex-col items-center text-center relative">
                    {/* Animated background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 w-full">
                      <div className="w-20 h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-5 mx-auto transition-all duration-300 group-hover:scale-110">
                        <Users className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        2.5M+
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        Active Players
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-card rounded-xl border border-border/50 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer overflow-hidden group">
                  <CardContent className="p-8 flex flex-col items-center text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 w-full">
                      <div className="w-20 h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-5 mx-auto transition-all duration-300 group-hover:scale-110">
                        <Gamepad2 className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        8,500+
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        Games Available
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-card rounded-xl border border-border/50 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer overflow-hidden group">
                  <CardContent className="p-8 flex flex-col items-center text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 w-full">
                      <div className="w-20 h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-5 mx-auto transition-all duration-300 group-hover:scale-110">
                        <Star className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        1.2M+
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        User Reviews
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-card rounded-xl border border-border/50 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer overflow-hidden group">
                  <CardContent className="p-8 flex flex-col items-center text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 w-full">
                      <div className="w-20 h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-5 mx-auto transition-all duration-300 group-hover:scale-110">
                        <Shield className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        100%
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        Secure Checkout
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              <div>
                <Link href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold text-foreground">GameVerse</span>
                </Link>
                <p className="text-muted-foreground mb-4">
                  Your ultimate destination for PC gaming.
                </p>
                {/* Social Media Links */}
                <div className="flex items-center gap-3">
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Discord">
                    <Gamepad2 className="h-5 w-5" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Store</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/" className="hover:text-foreground transition-colors">Browse Games</Link></li>
                  <li><Link href="/store/deals" className="hover:text-foreground transition-colors">New Releases</Link></li>
                  <li><Link href="/store/deals" className="hover:text-foreground transition-colors">Top Sellers</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Support</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/support/help-center" className="hover:text-foreground transition-colors">Help Center</Link></li>
                  <li><Link href="/support/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
                  <li><Link href="/support/refund-policy" className="hover:text-foreground transition-colors">Refunds</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/settings/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/support/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                  <li><Link href="/settings/privacy" className="hover:text-foreground transition-colors">Cookies</Link></li>
                </ul>
              </div>
              <div>
                <NewsletterSignup />
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
              <p>© 2025 GameVerse Gaming. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Back to Top Button */}
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </div>
      <SignIn isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
      <ChangePhotoDialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen} />
      <Dialog
        open={isSignOutOpen}
        onOpenChange={(open) => {
          setIsSignOutOpen(open);
          if (!open) {
            setClearSessionData(false);
            setSignOutStatus("");
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-destructive">Sign Out</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Signed-in User Info */}
            {user && (
              <div className="text-center bg-secondary p-3 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground font-medium mb-1">Signed in as:</p>
                <p className="text-lg font-semibold truncate">{user.email}</p>
              </div>
            )}

            {/* Confirmation Text */}
            <div className="text-center">
              <p className="text-xl font-semibold">Are you sure you want to sign out?</p>
              <p className="mt-2 text-sm text-muted-foreground">
                You will need to log back in to access your saved progress and stream subscriptions.
              </p>
            </div>

            {/* Clear Session Data Toggle */}
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg border border-border">
              <label htmlFor="clear-session" className="text-sm font-medium cursor-pointer">
                Clear local session data
              </label>
              <Switch
                id="clear-session"
                checked={clearSessionData}
                onCheckedChange={setClearSessionData}
              />
            </div>

            {/* Action Buttons */}
            <DialogFooter className="flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsSignOutOpen(false);
                  setClearSessionData(false);
                }}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleSignOut}
                className="w-full sm:w-auto"
              >
                Sign Out
              </Button>
            </DialogFooter>

            {/* Status Message */}
            {signOutStatus && (
              <div className="text-center text-green-500 font-semibold mt-4">
                {signOutStatus}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification Panel */}
      {isAuthenticated && (
        <NotificationPanel
          isOpen={isNotificationPanelOpen}
          onClose={() => setIsNotificationPanelOpen(false)}
        />
      )}

      {/* Friends Sidebar */}
      {isAuthenticated && (
        <FriendsSidebar
          isOpen={isFriendsSidebarOpen}
          onClose={() => setIsFriendsSidebarOpen(false)}
        />
      )}
    </>
  );
}
