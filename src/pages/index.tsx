import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Play, ShoppingCart, Star, TrendingUp, Gamepad2, Zap, Clock, Users, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import SignIn from "@/components/SignIn";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useWishlist } from "@/context/WishlistContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ChangePhotoDialog from "@/components/profile/ChangePhotoDialog";
import img1 from "@/components/Images/Store Images/image 1.webp";
import img2 from "@/components/Images/Store Images/image 2.webp";
import img3 from "@/components/Images/Store Images/image 3.webp";
import img4 from "@/components/Images/Store Images/image 4.webp";
import img5 from "@/components/Images/Store Images/image 5.webp";
import img6 from "@/components/Images/Store Images/image 6.webp";
import img7 from "@/components/Images/Store Images/image 7.webp";
import img8 from "@/components/Images/Store Images/image 8.webp";

interface Game {
  id: number;
  title: string;
  price: string;
  discount?: number;
  image: string;
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
    image: img1,
    rating: 4.8,
    genre: "RPG",
    featured: true
  },
  {
    id: 2,
    title: "Marvel's Spiderman",
    price: "$49.99",
    discount: 15,
    image: img2,
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
    image: img4,
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
  const featuredGame = games.find(g => g.featured);
  const { totalItems, addItem } = useCart();
  const { user, isAuthenticated, signOut, updateAvatar } = useUser();
  const { totalItems: wishlistCount, addItem: addWishlistItem } = useWishlist();
  const fileInputId = "avatar-file-input";
  const pendingFriends = 1; // demo count
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);

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
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Library</a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Community</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search games..." 
                    className="pl-10 w-64 bg-secondary border-border"
                  />
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
                    <span className="absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
                      {totalItems}
                    </span>
                  )}
                </Link>
                {!isAuthenticated ? (
                  <Button onClick={() => setIsSignInOpen(true)}>Sign In</Button>
                ) : (
                  <>
                    <input id={fileInputId} type="file" accept="image/*" className="hidden" onChange={async (e)=>{
                      const f = e.target.files?.[0];
                      if (f) await updateAvatar(f);
                    }} />
                    {/* Friends icon - placed left of profile */}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-full focus:outline-none">
                        <div className="relative h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-foreground">
                          <Users className="h-5 w-5" />
                          {pendingFriends > 0 && (
                            <span className="absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">{pendingFriends}</span>
                          )}
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-64">
                        <DropdownMenuLabel className="text-foreground">Friends</DropdownMenuLabel>
                        <DropdownMenuItem>Add Friend</DropdownMenuItem>
                        <DropdownMenuItem>Friend Requests ({pendingFriends})</DropdownMenuItem>
                        <DropdownMenuItem>Friends List</DropdownMenuItem>
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
                        <DropdownMenuItem onClick={()=>setIsPhotoDialogOpen(true)}>Change Photo</DropdownMenuItem>
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
                        <DropdownMenuItem onClick={()=>setIsSignOutOpen(true)}>Sign Out</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        {featuredGame && (
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
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>
            <div className="relative container mx-auto px-4 h-full flex items-end pb-20">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
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
                  <Button size="lg" className="gap-2">
                    <Play className="h-5 w-5" />
                    Play Now
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-6 bg-secondary rounded-lg border border-border hover:border-primary transition-all"
                  >
                    <Icon className="h-8 w-8 text-primary mb-3 mx-auto" />
                    <span className="text-foreground font-semibold">{category.name}</span>
                  </motion.button>
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
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Trending Games</h2>
              <Tabs defaultValue="all" className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="sale">On Sale</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {games.map((game) => (
                <motion.div
                  key={game.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
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
                </motion.div>
              ))}
            </motion.div>
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
            <Button size="lg" className="gap-2">
              <TrendingUp className="h-5 w-5" />
              View All Deals
            </Button>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold text-foreground">STEAM</span>
                </div>
                <p className="text-muted-foreground">
                  Your ultimate destination for PC gaming.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Store</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Browse Games</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">New Releases</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Top Sellers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Support</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Refunds</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
              <p>© 2025 Steam Gaming. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
      <SignIn isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
      <ChangePhotoDialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen} />
      <Dialog open={isSignOutOpen} onOpenChange={setIsSignOutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Out</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">Are you sure you want to sign out?</p>
          <DialogFooter>
            <Button variant="outline" onClick={()=>setIsSignOutOpen(false)}>Cancel</Button>
            <Button onClick={()=>{ setIsSignOutOpen(false); signOut(); }}>Sign Out</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}