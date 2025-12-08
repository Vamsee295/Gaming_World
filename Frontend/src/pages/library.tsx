import React, { useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, ShoppingCart, Gamepad2, Users, ExternalLink, Star, Grid2x2, List, Download, Play, ArrowUpDown, MessageSquarePlus, Heart, Settings, ChevronDown, ChevronRight, Cloud, CloudOff, Trophy, Clock, Package, Trash, FolderOpen, CheckCircle2, X, Pause, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUser } from "@/context/UserContext";
import { useFriends } from "@/context/FriendsContext";
import ChangePhotoDialog from "@/components/profile/ChangePhotoDialog";

// Store images (same as index.tsx)
import img1 from "@/components/Images/Store Images/image 1.webp";
import img2 from "@/components/Images/Store Images/image 2.webp";
import homeImg from "@/components/Images/Store Images/HOME SCREEN.jpg";
import spidermanHome from "@/components/Images/Store Images/SPIDERMAN HOMEPAGE.jpg";
import img3 from "@/components/Images/Store Images/image 3.webp";
import img4 from "@/components/Images/Store Images/image 4.webp";
import nfsHome from "@/components/Images/Store Images/NFS HOMESCREEN.jpg";
import img5 from "@/components/Images/Store Images/image 5.webp";
import img6 from "@/components/Images/Store Images/image 6.webp";
import img7 from "@/components/Images/Store Images/image 7.webp";
import img8 from "@/components/Images/Store Images/image 8.webp";

type Tag = "installed" | "favorites" | "action" | "cars" | "rpg" | "all";

interface LibraryGame {
  id: number;
  title: string;
  desc: string;
  image: any;
  playtime: string;
  lastPlayed: string;
  size: string;
  tags: Tag[];
  rating: number;
  genre: string;
  version: string;
  hasUpdate: boolean;
  isNew: boolean;
  cloudSyncStatus: 'synced' | 'syncing' | 'error' | 'disabled';
  achievements: { unlocked: number; total: number };
  isFavorite: boolean;
  isInstalling: boolean;
  installProgress?: number;
  releaseDate: string;
}

const baseGames: LibraryGame[] = [
  { id: 1, title: "Cyberpunk 2077", desc: "A futuristic open-world RPG set in Night City.", image: homeImg, playtime: "14 hours", lastPlayed: "Today", size: "45.8 GB", tags: ["installed", "favorites", "rpg"], rating: 4.8, genre: "RPG", version: "2.1", hasUpdate: false, isNew: false, cloudSyncStatus: 'synced', achievements: { unlocked: 24, total: 52 }, isFavorite: true, isInstalling: false, releaseDate: "2020-12-10" },
  { id: 2, title: "Marvel's Spiderman", desc: "Swing through NYC and fight iconic villains.", image: spidermanHome, playtime: "32 hours", lastPlayed: "Yesterday", size: "30.2 GB", tags: ["installed", "action"], rating: 4.6, genre: "Action", version: "1.8", hasUpdate: true, isNew: false, cloudSyncStatus: 'synced', achievements: { unlocked: 45, total: 50 }, isFavorite: false, isInstalling: false, releaseDate: "2022-08-12" },
  { id: 3, title: "Grand Theft Auto 6", desc: "Open-world crime saga.", image: img3, playtime: "5 hours", lastPlayed: "3 days ago", size: "70.0 GB", tags: ["action"], rating: 4.7, genre: "RPG", version: "1.0", hasUpdate: false, isNew: true, cloudSyncStatus: 'disabled', achievements: { unlocked: 8, total: 75 }, isFavorite: false, isInstalling: false, releaseDate: "2024-11-15" },
  { id: 4, title: "Need For Speed", desc: "High-octane street racing.", image: nfsHome, playtime: "18 hours", lastPlayed: "1 week ago", size: "50.0 GB", tags: ["cars"], rating: 4.9, genre: "Racing", version: "3.2", hasUpdate: false, isNew: false, cloudSyncStatus: 'syncing', achievements: { unlocked: 30, total: 40 }, isFavorite: true, isInstalling: false, releaseDate: "2023-11-10" },
  { id: 5, title: "The Last Of Us", desc: "Emotional story of survival.", image: img5, playtime: "0 hours", lastPlayed: "Never", size: "82.0 GB", tags: ["action"], rating: 4.5, genre: "Action", version: "1.5", hasUpdate: true, isNew: false, cloudSyncStatus: 'disabled', achievements: { unlocked: 0, total: 60 }, isFavorite: false, isInstalling: false, releaseDate: "2023-03-28" },
  { id: 6, title: "Detroit : Become Human", desc: "Choices matter in this android thriller.", image: img6, playtime: "12 hours", lastPlayed: "2 weeks ago", size: "44.0 GB", tags: ["installed", "rpg"], rating: 4.8, genre: "RPG", version: "1.2", hasUpdate: false, isNew: false, cloudSyncStatus: 'synced', achievements: { unlocked: 15, total: 48 }, isFavorite: false, isInstalling: false, releaseDate: "2019-12-12" },
  { id: 7, title: "A Way Out", desc: "Cinematic co-op prison break.", image: img7, playtime: "7 hours", lastPlayed: "4 days ago", size: "29.0 GB", tags: ["favorites", "action"], rating: 4.4, genre: "Co-op", version: "1.0", hasUpdate: false, isNew: false, cloudSyncStatus: 'error', achievements: { unlocked: 12, total: 20 }, isFavorite: true, isInstalling: false, releaseDate: "2018-03-23" },
  { id: 8, title: "Black Myth Wukong", desc: "Mythic action adventure.", image: img8, playtime: "0 hours", lastPlayed: "Never", size: "96.0 GB", tags: ["rpg"], rating: 4.6, genre: "Action", version: "1.1", hasUpdate: true, isNew: true, cloudSyncStatus: 'disabled', achievements: { unlocked: 0, total: 81 }, isFavorite: false, isInstalling: false, releaseDate: "2024-08-20" },
];

export default function LibraryPage() {
  const { totalItems, addItem } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { user, isAuthenticated, signOut, updateAvatar } = useUser();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Tag>("all");
  const [listView, setListView] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "playtime" | "lastPlayed" | "rating" | "recent" | "releaseDate">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [selected, setSelected] = useState<LibraryGame | null>(null);
  const { pendingRequestsCount } = useFriends();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState("All");
  const [reviewDialog, setReviewDialog] = useState(false);
  const [reviewGame, setReviewGame] = useState<LibraryGame | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  // New state for enhanced features
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);
  const [manageGameDialog, setManageGameDialog] = useState(false);
  const [manageGame, setManageGame] = useState<LibraryGame | null>(null);
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);
  const [categoriesCollapsed, setCategoriesCollapsed] = useState(false);
  const [favoriteGames, setFavoriteGames] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favoriteGames');
      return saved ? JSON.parse(saved) : baseGames.filter(g => g.isFavorite).map(g => g.id);
    }
    return baseGames.filter(g => g.isFavorite).map(g => g.id);
  });

  const fileInputId = "avatar-file-input-lib";

  const games = useMemo(() => {
    // Map favorites to games
    let gamesWithFavorites = baseGames.map(g => ({
      ...g,
      isFavorite: favoriteGames.includes(g.id)
    }));

    let filtered = filter === "all" ? gamesWithFavorites : gamesWithFavorites.filter(g => {
      if (filter === "favorites") return g.isFavorite;
      return g.tags.includes(filter);
    });
    filtered = query.trim() ? filtered.filter(g => g.title.toLowerCase().includes(query.toLowerCase())) : filtered;

    // Sort games
    const sorted = [...filtered].sort((a, b) => {
      let result = 0;
      switch (sortBy) {
        case "name":
          result = a.title.localeCompare(b.title);
          break;
        case "playtime":
          const aHours = parseFloat(a.playtime) || 0;
          const bHours = parseFloat(b.playtime) || 0;
          result = bHours - aHours;
          break;
        case "lastPlayed":
          const aDate = a.lastPlayed === "Never" ? new Date(0) : new Date();
          const bDate = b.lastPlayed === "Never" ? new Date(0) : new Date();
          result = bDate.getTime() - aDate.getTime();
          break;
        case "rating":
          result = b.rating - a.rating;
          break;
        case "recent":
          // Sort by last played
          const aRecent = a.lastPlayed === "Never" ? new Date(0) : new Date();
          const bRecent = b.lastPlayed === "Never" ? new Date(0) : new Date();
          result = bRecent.getTime() - aRecent.getTime();
          break;
        case "releaseDate":
          result = new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
          break;
        default:
          return 0;
      }
      return sortDirection === "asc" ? -result : result;
    });

    return sorted;
  }, [filter, query, sortBy, sortDirection, favoriteGames]);

  const openDetails = (g: LibraryGame) => setSelected(g);
  const closeDetails = () => setSelected(null);

  const toggleFavorite = (gameId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavoriteGames(prev => {
      const newFavorites = prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId];
      if (typeof window !== 'undefined') {
        localStorage.setItem('favoriteGames', JSON.stringify(newFavorites));
      }
      return newFavorites;
    });
  };

  const openManageGame = (game: LibraryGame, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setManageGame(game);
    setManageGameDialog(true);
  };

  const openReviewDialog = (game: LibraryGame) => {
    setReviewGame(game);
    setReviewRating(5);
    setReviewComment("");
    setReviewDialog(true);
  };

  const handleSubmitReview = () => {
    if (!reviewGame || !reviewComment.trim()) {
      alert("Please enter a review comment");
      return;
    }

    // In a real app, this would send to backend
    alert(`Review submitted for ${reviewGame.title}!\nRating: ${reviewRating} stars\nComment: ${reviewComment}`);

    // Reset and close
    setReviewDialog(false);
    setReviewGame(null);
    setReviewRating(5);
    setReviewComment("");
  };


  return (
    <>
      <Head>
        <title>GameVerse Library</title>
      </Head>
      <div className="min-h-screen bg-background">
        {/* Top Navigation (keep profile access) */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2">
                  <Gamepad2 className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold text-foreground">GameVerse</span>
                </Link>
                <div className="hidden md:flex items-center gap-6">
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Store</Link>
                  <Link href="/library" className="text-foreground font-semibold">Library</Link>
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
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search library..." className="pl-10 w-64 bg-secondary border-border" />
                </div>
                <Link href="/wishlist" className="relative hidden md:block text-muted-foreground hover:text-foreground">
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="ml-2 rounded-full bg-primary text-primary-foreground text-xs px-1.5 py-0.5">{wishlistCount}</span>
                  )}
                </Link>
                <Link href="/cart" className="relative">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground text-xs px-1.5 py-0.5">{totalItems}</span>
                  )}
                </Link>
                {!isAuthenticated ? (
                  <Link href="/"><Button>Sign In</Button></Link>
                ) : (
                  <>
                    <input id={fileInputId} type="file" accept="image/*" className="hidden" onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (f) await updateAvatar(f);
                    }} />
                    {/* Friends */}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-full focus:outline-none">
                        <div className="relative h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-foreground">
                          <Users className="h-5 w-5" />
                          {pendingRequestsCount > 0 && (
                            <span className="absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">{pendingRequestsCount}</span>
                          )}
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-64">
                        <DropdownMenuLabel className="text-foreground">Friends</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href="/friends">View Friends</Link>
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
                    {/* Profile */}
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
                        <DropdownMenuItem asChild><Link href="/achievements">My Achievements</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/rewards">Epic Rewards <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/balance">Account Balance <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/coupons">Coupons</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/account">Account <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/redeem">Redeem Code</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/redeem-fortnite">Redeem Fortnite Gift Card <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/terms">Terms of Service <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/privacy">Privacy Policy <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/refund-policy">Store Refund Policy <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/publishers">Publisher Index <ExternalLink className="ml-auto h-3.5 w-3.5" /></Link></DropdownMenuItem>
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

        {/* Layout: Sidebar + Content */}
        <div className="container mx-auto px-4 py-6 grid grid-cols-12 gap-6">
          {/* Enhanced Sidebar */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-2">
            <div className="rounded-lg border border-border bg-secondary/95 backdrop-blur-sm p-4 sticky top-24 shadow-lg">
              <Input
                placeholder="Search library..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mb-4"
              />

              {/* Filters Section */}
              <div className="mb-4">
                <button
                  onClick={() => setFiltersCollapsed(!filtersCollapsed)}
                  className="flex items-center justify-between w-full text-xs text-muted-foreground uppercase tracking-wide mb-2 hover:text-foreground transition-colors"
                >
                  <span>Filters</span>
                  {filtersCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
                {!filtersCollapsed && (
                  <div className="flex flex-col gap-1">
                    {(["all", "installed", "favorites"] as const).map(f => {
                      let count = 0;
                      if (f === "all") {
                        count = baseGames.length;
                      } else if (f === "favorites") {
                        count = favoriteGames.length;
                      } else {
                        count = baseGames.filter(g => g.tags.includes(f)).length;
                      }

                      return (
                        <button
                          key={f}
                          onClick={() => setFilter(f as Tag)}
                          className={`text-left rounded px-2 py-1.5 text-sm flex items-center justify-between transition-colors ${filter === f ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            }`}
                        >
                          <span>{f.charAt(0).toUpperCase() + f.slice(1)}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">{count}</Badge>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Categories Section */}
              <div className="mb-4">
                <button
                  onClick={() => setCategoriesCollapsed(!categoriesCollapsed)}
                  className="flex items-center justify-between w-full text-xs text-muted-foreground uppercase tracking-wide mb-2 hover:text-foreground transition-colors"
                >
                  <span>Categories</span>
                  {categoriesCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
                {!categoriesCollapsed && (
                  <div className="flex flex-col gap-1">
                    {(["action", "cars", "rpg"] as Tag[]).map(f => {
                      const count = baseGames.filter(g => g.tags.includes(f)).length;
                      return (
                        <button
                          key={f}
                          onClick={() => setFilter(f)}
                          className={`text-left rounded px-2 py-1.5 text-sm flex items-center justify-between transition-colors ${filter === f ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            }`}
                        >
                          <span>{f.toUpperCase()}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">{count}</Badge>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Quick Links */}
              <div className="pt-4 border-t border-border space-y-1">
                <button
                  onClick={() => setSortBy("recent")}
                  className="text-left rounded px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 w-full flex items-center gap-2 transition-colors"
                >
                  <Clock className="h-4 w-4" />
                  Recently Played
                </button>
                <button className="text-left rounded px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 w-full flex items-center gap-2 transition-colors">
                  <Package className="h-4 w-4" />
                  <span>Updates Available</span>
                  <Badge variant="destructive" className="ml-auto text-xs">
                    {baseGames.filter(g => g.hasUpdate).length}
                  </Badge>
                </button>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="col-span-12 md:col-span-9 lg:col-span-9 xl:col-span-10">
            <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-foreground">
                  {filter === "all" ? "All Games" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </h1>
                <Badge variant="secondary" className="text-sm">
                  {games.length} {games.length === 1 ? 'game' : 'games'}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                  <SelectTrigger className="w-[200px]">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="recent">Recently Played</SelectItem>
                    <SelectItem value="playtime">Playtime (High-Low)</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="releaseDate">Release Date</SelectItem>
                  </SelectContent>
                </Select>
                <div className="inline-flex rounded-md border border-border bg-secondary p-1">
                  <button className={`px-2 py-1 rounded ${!listView ? "bg-muted text-foreground" : "text-muted-foreground"}`} onClick={() => setListView(false)} title="Grid">
                    <Grid2x2 className="h-4 w-4" />
                  </button>
                  <button className={`px-2 py-1 rounded ${listView ? "bg-muted text-foreground" : "text-muted-foreground"}`} onClick={() => setListView(true)} title="List">
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Chips */}
            {(query.trim() || filter !== "all") && (
              <div className="mb-4 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {query.trim() && (
                  <Badge variant="outline" className="gap-1.5 pr-1">
                    <span>Search: "{query}"</span>
                    <button
                      onClick={() => setQuery("")}
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filter !== "all" && (
                  <Badge variant="outline" className="gap-1.5 pr-1">
                    <span>{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
                    <button
                      onClick={() => setFilter("all")}
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}


            <div className={`grid ${listView ? "grid-cols-1 gap-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"}`}>
              {games.map(g => (
                <motion.div
                  key={g.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: listView ? 1 : 1.03 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoveredGame(g.id)}
                  onMouseLeave={() => setHoveredGame(null)}
                  className={listView ? "" : "relative"}
                >
                  <Link href={`/game/${g.id}`}>
                    <div className={`rounded-lg border border-border bg-secondary overflow-hidden cursor-pointer transition-all duration-300 ${hoveredGame === g.id ? "shadow-2xl shadow-primary/20 border-primary" : "hover:border-primary/50"
                      } ${listView ? "flex items-center h-24" : "relative"}`}>

                      {/* Status Badges - Top Right */}
                      {!listView && (
                        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                          {g.isNew && (
                            <Badge className="bg-blue-500 text-white text-xs">NEW</Badge>
                          )}
                          {g.hasUpdate && (
                            <Badge className="bg-orange-500 text-white text-xs">UPDATE</Badge>
                          )}
                          {g.tags.includes("installed") && (
                            <Badge className="bg-green-500 text-white text-xs">INSTALLED</Badge>
                          )}
                        </div>
                      )}

                      {/* Favorite Heart - Top Left */}
                      {!listView && (
                        <button
                          onClick={(e) => toggleFavorite(g.id, e)}
                          className="absolute top-2 left-2 z-10 p-1.5 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
                        >
                          <Heart
                            className={`h-4 w-4 transition-all ${g.isFavorite ? "fill-red-500 text-red-500" : "text-white"
                              }`}
                          />
                        </button>
                      )}

                      {/* Image */}
                      <div className={`${listView ? "relative h-16 w-16 m-4 flex-shrink-0" : "relative aspect-[16/9]"}`}>
                        <Image src={g.image as any} alt={g.title} fill className="object-cover" />

                        {/* Hover Overlay with Quick Info */}
                        {!listView && hoveredGame === g.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-3 text-white text-xs"
                          >
                            <div className="flex items-center gap-1 mb-1">
                              <Clock className="h-3 w-3" />
                              <span>Last played: {g.lastPlayed}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Gamepad2 className="h-3 w-3" />
                              <span>Playtime: {g.playtime}</span>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Content */}
                      <div className={`${listView ? "flex-1 pr-4" : "p-4"}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="min-w-0 flex-1">
                            <div className="text-foreground font-semibold truncate">{g.title}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                              <span>v{g.version}</span>
                              {/* Cloud Sync Status */}
                              {g.cloudSyncStatus === 'synced' && <div title="Cloud Synced"><Cloud className="h-3 w-3 text-green-500" /></div>}
                              {g.cloudSyncStatus === 'syncing' && <div title="Syncing..."><Loader2 className="h-3 w-3 text-blue-500 animate-spin" /></div>}
                              {g.cloudSyncStatus === 'error' && <div title="Sync Error"><CloudOff className="h-3 w-3 text-red-500" /></div>}
                            </div>
                          </div>
                          {!listView && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="text-sm text-foreground">{g.rating}</span>
                            </div>
                          )}
                        </div>

                        {/* Achievements & Genre */}
                        {!listView && (
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary">{g.genre}</Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Trophy className="h-3 w-3" />
                              <span>{g.achievements.unlocked}/{g.achievements.total}</span>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        {!listView && (hoveredGame === g.id || true) && (
                          <div className="flex items-center gap-2 mt-3" onClick={(e) => e.preventDefault()}>
                            {g.tags.includes("installed") ? (
                              <>
                                <Button size="sm" variant="default" onClick={(e) => { e.preventDefault(); openDetails(g); }} className="flex-1">
                                  <Play className="h-3 w-3 mr-1" /> Play
                                </Button>
                                <Button size="sm" variant="outline" onClick={(e) => openManageGame(g, e)} title="Manage">
                                  <Settings className="h-3 w-3" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Link href={`/transaction?gameId=${g.id}`} onClick={(e) => e.stopPropagation()} className="flex-1">
                                  <Button size="sm" variant="default" className="w-full">
                                    <ShoppingCart className="h-3 w-3 mr-1" /> Buy
                                  </Button>
                                </Link>
                                <Button size="sm" variant="outline" title="Wishlist">
                                  <Heart className="h-3 w-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {/* List View Actions */}
                      {listView && (
                        <div className="px-4 flex gap-2" onClick={(e) => e.preventDefault()}>
                          {g.tags.includes("installed") ? (
                            <>
                              <Button size="sm" variant="default" onClick={(e) => { e.preventDefault(); openDetails(g); }}>
                                <Play className="h-3 w-3 mr-1" /> Play
                              </Button>
                              <Button size="sm" variant="outline" onClick={(e) => openManageGame(g, e)}>
                                <Settings className="h-3 w-3" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Link href={`/transaction?gameId=${g.id}`} onClick={(e) => e.stopPropagation()}>
                                <Button size="sm" variant="default">Purchase</Button>
                              </Link>
                              <Button size="sm" variant="outline" onClick={(e) => toggleFavorite(g.id, e)}>
                                <Heart className={`h-3 w-3 ${g.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </main>
        </div >

        {/* Details Modal */}
        < Dialog open={!!selected
        } onOpenChange={(o) => !o && closeDetails()}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-foreground">{selected?.title}</DialogTitle>
            </DialogHeader>
            {selected && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative aspect-[16/9] md:col-span-1 rounded overflow-hidden border border-border">
                  <Image src={selected.image as any} alt={selected.title} fill className="object-cover" />
                </div>
                <div className="md:col-span-2">
                  <p className="text-muted-foreground mb-3">{selected.desc}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-foreground">
                    <div><span className="text-muted-foreground">Playtime:</span> {selected.playtime}</div>
                    <div><span className="text-muted-foreground">Last Played:</span> {selected.lastPlayed}</div>
                    <div><span className="text-muted-foreground">Install Size:</span> {selected.size}</div>
                    <div><span className="text-muted-foreground">Genre:</span> {selected.genre}</div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={closeDetails}>Close</Button>
              <Button variant="outline" onClick={() => { closeDetails(); openReviewDialog(selected!); }}>
                <MessageSquarePlus className="h-4 w-4 mr-2" /> Add Review
              </Button>
              {selected?.tags.includes("installed") ? (
                <Button><Play className="h-4 w-4 mr-2" /> Play</Button>
              ) : (
                <Link href={`/transaction?gameId=${selected?.id}`}>
                  <Button><ShoppingCart className="h-4 w-4 mr-2" /> Purchase</Button>
                </Link>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog >

        {/* Photo dialog + Sign out confirm */}
        < ChangePhotoDialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen} />
        <Dialog open={isSignOutOpen} onOpenChange={setIsSignOutOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign Out</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground">Are you sure you want to sign out?</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSignOutOpen(false)}>Cancel</Button>
              <Button onClick={() => { setIsSignOutOpen(false); signOut(); }}>Sign Out</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Review Submission Dialog */}
        <Dialog open={reviewDialog} onOpenChange={setReviewDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-foreground">Write a Review for {reviewGame?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Star Rating */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-8 w-8 cursor-pointer transition-colors ${star <= reviewRating ? 'fill-primary text-primary' : 'text-muted hover:text-primary/50'
                        }`}
                      onClick={() => setReviewRating(star)}
                    />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-foreground">{reviewRating} / 5</span>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Your Review</label>
                <Textarea
                  placeholder="Share your experience with this game..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {reviewComment.length} / 500 characters
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setReviewDialog(false)}>Cancel</Button>
              <Button onClick={handleSubmitReview} disabled={!reviewComment.trim()}>
                <MessageSquarePlus className="h-4 w-4 mr-2" />
                Submit Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Manage Game Dialog */}
        <Dialog open={manageGameDialog} onOpenChange={setManageGameDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Manage {manageGame?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2 py-4">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                onClick={() => {
                  alert(`Opening details for ${manageGame?.title}`);
                  setManageGameDialog(false);
                }}
              >
                <ExternalLink className="h-4 w-4" />
                <span>Show Game Details</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                onClick={() => {
                  alert(`Verifying files for ${manageGame?.title}...`);
                  setManageGameDialog(false);
                }}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Verify Game Files</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                onClick={() => {
                  alert(`Opening folder selection for ${manageGame?.title}`);
                  setManageGameDialog(false);
                }}
              >
                <FolderOpen className="h-4 w-4" />
                <span>Move Install Folder</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                onClick={() => {
                  alert(`Opening cloud saves settings for ${manageGame?.title}`);
                  setManageGameDialog(false);
                }}
              >
                <Cloud className="h-4 w-4" />
                <span>Cloud Saves</span>
              </Button>

              <div className="pt-2 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    if (confirm(`Are you sure you want to uninstall ${manageGame?.title}?`)) {
                      alert(`Uninstalling ${manageGame?.title}...`);
                      setManageGameDialog(false);
                    }
                  }}
                >
                  <Trash className="h-4 w-4" />
                  <span>Uninstall Game</span>
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setManageGameDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div >
    </>
  );
}


