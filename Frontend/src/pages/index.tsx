import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Play, ShoppingCart, Star, TrendingUp, Gamepad2, Zap, Clock, Users, ExternalLink, ArrowUp, X, Filter, SlidersHorizontal, ChevronLeft, ChevronRight, Sun, Moon, Bell } from "lucide-react";
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
import img1 from "@/components/Images/Store Images/image 1.webp";
import img2 from "@/components/Images/Store Images/image 2.webp";
import spidermanHome from "@/components/Images/Store Images/SPIDERMAN HOMEPAGE.jpg";
import img3 from "@/components/Images/Store Images/image 3.webp";
import img4 from "@/components/Images/Store Images/image 4.webp";
import nfsHome from "@/components/Images/Store Images/NFS HOMESCREEN.jpg";
import img5 from "@/components/Images/Store Images/image 5.webp";
import img6 from "@/components/Images/Store Images/image 6.webp";
import img7 from "@/components/Images/Store Images/image 7.webp";
import img8 from "@/components/Images/Store Images/image 8.webp";
import homeImg from "@/components/Images/Store Images/HOME SCREEN.jpg";

interface Game {
  id: number;
  title: string;
  price: string;
  discount?: number;
  image: any;
  rating: number;
  genre: string;
  featured?: boolean;
}

const games: Game[] = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    price: "$59.99",
    discount: 20,
    image: homeImg,
    rating: 4.8,
    genre: "RPG",
    featured: true
  },
  {
    id: 2,
    title: "Marvel's Spiderman",
    price: "$49.99",
    discount: 15,
    image: spidermanHome,
    rating: 4.6,
    genre: "Strategy"
  },
  {
    id: 3,
    title: "Grand Theft Auto 6",
    price: "$39.99",
    image: img3,
    rating: 4.7,
    genre: "Racing"
  },
  {
    id: 4,
    title: "Need For Speed",
    price: "$59.99",
    discount: 30,
    image: nfsHome,
    rating: 4.9,
    genre: "Action"
  },
  {
    id: 5,
    title: "The Last Of Us",
    price: "$0.00",
    image: img5,
    rating: 4.5,
    genre: "FPS"
  },
  {
    id: 6,
    title: "Detroit : Become Human",
    price: "$44.99",
    discount: 25,
    image: img6,
    rating: 4.8,
    genre: "MMORPG"
  },
  {
    id: 7,
    title: "A Way Out",
    price: "$29.99",
    image: img7,
    rating: 4.4,
    genre: "Horror"
  },
  {
    id: 8,
    title: "Black Myth Wukong",
    price: "$0.00",
    image: img8,
    rating: 4.6,
    genre: "Battle Royale"
  }
];

const categories = [
  { name: "Action", icon: Zap },
  { name: "RPG", icon: Gamepad2 },
  { name: "Strategy", icon: TrendingUp },
  { name: "Racing", icon: Clock }
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

    setFilteredGames(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, priceFilter, ratingFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
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
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Store</a>
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
                <Link href="/store/cart" className="relative">
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
                          <Link href="/friends?tab=add">Add Friend</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/friends?tab=requests">
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
                        <DropdownMenuItem asChild><Link href="/profile/rewards">Epic Rewards <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
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

        {/* Hero Carousel Section */}
        {featuredGames.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] overflow-hidden"
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
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                  {featuredGames.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCarouselIndex(index)}
                      className={`h-2 rounded-full transition-all ${index === currentCarouselIndex
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-muted-foreground/50 hover:bg-muted-foreground'
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
                  <Link href={`/store/transaction?gameId=${featuredGame.id}`}>
                    <Button size="lg" className="gap-2">
                      <Play className="h-5 w-5" />
                      Purchase
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2"
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
                </div>
              </motion.div>
            </div>

          </motion.section>
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
                      <Card className="h-full bg-card rounded-xl border border-border/50 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <CardContent className="p-8 flex flex-col items-center text-center">
                          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                            <Icon className="h-10 w-10 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground">
                            {category.name}
                          </h3>
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
                  <motion.div
                    key={game.id}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="group cursor-pointer"
                  >
                    <Link href={`/game/${game.id}`}>
                      <div className="relative overflow-hidden rounded-lg border border-border bg-secondary">
                        <div className="aspect-[16/9] overflow-hidden relative">
                          <Image
                            src={game.image as any}
                            alt={game.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        {game.discount && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-green-600 text-white">-{game.discount}%</Badge>
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                            {game.title}
                          </h3>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="secondary">{game.genre}</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="text-sm text-foreground">{game.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            {game.discount ? (
                              <div className="flex items-center gap-2">
                                <span className="text-sm line-through text-muted-foreground">{game.price}</span>
                                <span className="text-lg font-bold text-green-500">
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
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const basePrice = parseFloat(game.price.slice(1));
                                  const effective = game.discount ? basePrice * (1 - game.discount / 100) : basePrice;
                                  addItem({ id: game.id, title: game.title, price: Number(effective.toFixed(2)), image: game.image });
                                }}
                              >
                                Add to Cart
                              </Button>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const basePrice = parseFloat(game.price.slice(1));
                                  const effective = game.discount ? basePrice * (1 - game.discount / 100) : basePrice;
                                  addWishlistItem({ id: game.id, title: game.title, price: Number(effective.toFixed(2)), image: game.image as any });
                                }}
                              >
                                Wishlist
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
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
        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border border-border p-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Weekend Special Sale</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Save up to 75% on selected titles. Offer ends soon!
            </p>
            <Link href="/store/deals">
              <Button size="lg" className="gap-2">
                <TrendingUp className="h-5 w-5" />
                View All Deals
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <Link href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold text-foreground">GameVerse</span>
                </Link>
                <p className="text-muted-foreground">
                  Your ultimate destination for PC gaming.
                </p>
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
