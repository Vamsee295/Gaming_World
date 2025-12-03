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

type Review = {
  id: string;
  user: string;
  rating: number; // 1-5, includes 4.5
  title: string;
  content: string;
  date: string; // e.g., "Jan 2025"
};

function generateReviews(gameTitle: string): Review[] {
  const monthYear = [
    "Jan 2025","Feb 2025","Mar 2025","Apr 2025","May 2025","Jun 2025",
    "Jul 2025","Aug 2025","Sep 2025","Oct 2025","Nov 2025","Dec 2025"
  ];
  const names = [
    "Alex","Riley","Jordan","Taylor","Casey","Morgan","Avery","Cameron","Quinn","Skyler",
    "Jamie","Sam","Devon","Rowan","Harper","Logan","Phoenix","Drew","Kai","Eden"
  ];

  let i = 0;
  const takeName = () => names[i++ % names.length] + " " + (100 + i);
  const takeDate = (idx: number) => monthYear[idx % monthYear.length];

  const awesome: Review[] = Array.from({ length: 5 }).map((_, idx) => ({
    id: `awesome-${idx}`,
    user: takeName(),
    rating: 5,
    title: "Amazing! A must-play",
    content: `Absolutely loved ${gameTitle}. Stunning visuals and tight gameplay. Worth every minute!`,
    date: takeDate(idx)
  }));

  const neutral: Review[] = Array.from({ length: 5 }).map((_, idx) => ({
    id: `neutral-${idx}`,
    user: takeName(),
    rating: 4,
    title: "Solid experience",
    content: `${gameTitle} delivers a good time. Minor issues, but overall enjoyable.`,
    date: takeDate(idx + 5)
  }));

  const negative: Review[] = Array.from({ length: 2 }).map((_, idx) => ({
    id: `negative-${idx}`,
    user: takeName(),
    rating: 3,
    title: "Not for me",
    content: `${gameTitle} looks great but the mechanics didn’t click for me.`,
    date: takeDate(idx + 10)
  }));

  const goodGame: Review[] = Array.from({ length: 3 }).map((_, idx) => ({
    id: `good-${idx}`,
    user: takeName(),
    rating: 4.5,
    title: "Great game!",
    content: `${gameTitle} is fantastic overall. A few rough edges, but highly recommended.`,
    date: takeDate(idx + 12)
  }));

  return [...awesome, ...neutral, ...negative, ...goodGame];
}

function StarIcons({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-primary text-primary" />
      ))}
      {half === 1 && (
        <span className="relative inline-block h-4 w-4">
          <Star className="h-4 w-4 text-muted-foreground" />
          <Star className="h-4 w-4 text-primary absolute inset-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}
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
    featured: true
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
    screenshots: [img2, img3, img4]
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
    screenshots: [img3, img4, img5]
  },
  4: {
    id: 4,
    title: "Need For Speed",
    price: "$59.99",
    discount: 30,
    rating: 4.9,
    genre: "Action",
    description: "High-octane street racing with stunning visuals and customization.",
    longDescription: "Jump into exhilarating street races, build your dream cars, and outrun the competition in intense nighttime races. Experience dynamic handling and a vibrant urban scene.",
    releaseDate: "November 2019",
    developer: "Ghost Games",
    publisher: "Electronic Arts",
    tags: ["Racing", "Action", "Multiplayer", "Cars"],
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        processor: "Intel Core i5-3570 / AMD FX-6350",
        memory: "8 GB RAM",
        graphics: "NVIDIA GTX 760 / AMD Radeon R9 270",
        storage: "40 GB"
      },
      recommended: {
        os: "Windows 10",
        processor: "Intel Core i7-4790 / AMD Ryzen 3 1300X",
        memory: "16 GB RAM",
        graphics: "NVIDIA GTX 1060 / AMD Radeon RX 480",
        storage: "40 GB SSD"
      }
    },
    screenshots: [img4, img5, img6]
  },
  5: {
    id: 5,
    title: "The Last Of Us",
    price: "$0.00",
    rating: 4.5,
    genre: "FPS",
    description: "An emotional, post-apocalyptic journey of survival and hope.",
    longDescription: "Survive in a harsh world ravaged by a pandemic. Craft, fight, and forge bonds across a gripping story with unforgettable characters and breathtaking environments.",
    releaseDate: "March 2023",
    developer: "Naughty Dog",
    publisher: "PlayStation Studios",
    tags: ["Story Rich", "Survival", "Action", "Adventure"],
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        processor: "Intel Core i5-8400 / AMD Ryzen 5 2600",
        memory: "12 GB RAM",
        graphics: "NVIDIA GTX 1060 / AMD Radeon RX 580",
        storage: "100 GB"
      },
      recommended: {
        os: "Windows 11",
        processor: "Intel Core i7-8700K / AMD Ryzen 5 3600",
        memory: "16 GB RAM",
        graphics: "NVIDIA RTX 2060 / AMD Radeon RX 5700",
        storage: "100 GB SSD"
      }
    },
    screenshots: [img5, img6, img7]
  },
  6: {
    id: 6,
    title: "Detroit : Become Human",
    price: "$44.99",
    discount: 25,
    rating: 4.8,
    genre: "MMORPG",
    description: "An interactive drama where your choices shape the story.",
    longDescription: "Experience a branching narrative in a near-future Detroit. Guide androids through moral dilemmas and consequential decisions across multiple intertwined storylines.",
    releaseDate: "May 2018",
    developer: "Quantic Dream",
    publisher: "Quantic Dream",
    tags: ["Narrative", "Choices Matter", "Adventure", "Sci-Fi"],
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        processor: "Intel Core i5-2400 / AMD FX-6300",
        memory: "8 GB RAM",
        graphics: "NVIDIA GTX 780 / AMD Radeon HD 7950",
        storage: "55 GB"
      },
      recommended: {
        os: "Windows 10",
        processor: "Intel Core i7-2700K / AMD Ryzen 7 3700X",
        memory: "16 GB RAM",
        graphics: "NVIDIA GTX 1060 / AMD Radeon RX 580",
        storage: "55 GB SSD"
      }
    },
    screenshots: [img6, img7, img8]
  },
  7: {
    id: 7,
    title: "A Way Out",
    price: "$29.99",
    rating: 4.4,
    genre: "Horror",
    description: "A co-op adventure about trust, teamwork, and escape.",
    longDescription: "Team up with a friend and work together to escape prison and survive on the run. Split-screen co-op narrative with unique collaborative gameplay.",
    releaseDate: "March 2018",
    developer: "Hazelight Studios",
    publisher: "Electronic Arts",
    tags: ["Co-op", "Adventure", "Story Rich", "Split-screen"],
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        processor: "Intel Core i3-2100 / AMD FX-6300",
        memory: "8 GB RAM",
        graphics: "NVIDIA GTX 650 / AMD Radeon HD 7750",
        storage: "25 GB"
      },
      recommended: {
        os: "Windows 10",
        processor: "Intel Core i5-3570K / AMD Ryzen 5 1600",
        memory: "16 GB RAM",
        graphics: "NVIDIA GTX 960 / AMD Radeon R9 280",
        storage: "25 GB SSD"
      }
    },
    screenshots: [img7, img8, img1]
  },
  8: {
    id: 8,
    title: "Black Myth Wukong",
    price: "$0.00",
    rating: 4.6,
    genre: "Battle Royale",
    description: "An epic action RPG inspired by Journey to the West.",
    longDescription: "Take on mythic foes with fluid combat and striking visuals. Explore ancient landscapes and master powerful abilities of the Destined One.",
    releaseDate: "2024",
    developer: "Game Science",
    publisher: "Game Science",
    tags: ["Action", "RPG", "Mythology", "Adventure"],
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        processor: "Intel Core i5-6600 / AMD Ryzen 5 1600",
        memory: "8 GB RAM",
        graphics: "NVIDIA GTX 1060 / AMD Radeon RX 580",
        storage: "80 GB"
      },
      recommended: {
        os: "Windows 11",
        processor: "Intel Core i7-10700 / AMD Ryzen 7 3700X",
        memory: "16 GB RAM",
        graphics: "NVIDIA RTX 2060 / AMD Radeon RX 5700 XT",
        storage: "80 GB SSD"
      }
    },
    screenshots: [img8, img1, img2]
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
  const reviews: Review[] = game ? generateReviews(game.title) : [];

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
                        <div key={index} className="relative aspect-video overflow-hidden rounded-lg bg-secondary">
                          <Image 
                            src={screenshot} 
                            alt={`${game.title} screenshot ${index + 1}`} 
                            fill 
                            className="object-contain"
                            sizes="(min-width: 1024px) 33vw, 100vw"
                          />
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
                    <h3 className="text-xl font-semibold text-foreground">Customer Reviews</h3>
                    <div className="space-y-3">
                      {reviews.map((rev) => (
                        <Card key={rev.id}>
                          <CardContent className="p-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-foreground">{rev.user}</span>
                                <StarIcons rating={rev.rating} />
                              </div>
                              <span className="text-xs text-muted-foreground">{rev.date}</span>
                            </div>
                            <p className="text-sm font-medium text-foreground">{rev.title}</p>
                            <p className="text-sm text-muted-foreground">{rev.content}</p>
                          </CardContent>
                        </Card>
                      ))}
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
      </div>
    </>
  );
}



