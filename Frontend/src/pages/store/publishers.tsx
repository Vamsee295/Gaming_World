import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Star, BadgeCheck, Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Publisher {
  id: number;
  name: string;
  logo: string;
  games: number;
  bio: string;
  verified: boolean;
  trending: number;
  added: string;
}

const publishersData: Publisher[] = [
  {
    id: 1,
    name: "Quantum Realms",
    logo: "https://placehold.co/100x100/1e40af/ffffff?text=QR",
    games: 42,
    bio: "Famous Open World Developer",
    verified: true,
    trending: 85,
    added: "2023-11-01",
  },
  {
    id: 2,
    name: "Mythic Studios",
    logo: "https://placehold.co/100x100/9d174d/ffffff?text=MS",
    games: 15,
    bio: "Narrative-driven RPG experts",
    verified: true,
    trending: 60,
    added: "2024-05-15",
  },
  {
    id: 3,
    name: "Pixel Pioneers",
    logo: "https://placehold.co/100x100/065f46/ffffff?text=PP",
    games: 90,
    bio: "Indie powerhouse for retro fun",
    verified: false,
    trending: 45,
    added: "2022-01-20",
  },
  {
    id: 4,
    name: "StormBreaker Games",
    logo: "https://placehold.co/100x100/3730a3/ffffff?text=SB",
    games: 28,
    bio: "Multiplayer FPS specialists",
    verified: true,
    trending: 95,
    added: "2024-09-01",
  },
  {
    id: 5,
    name: "Aether Engine",
    logo: "https://placehold.co/100x100/ca8a04/ffffff?text=AE",
    games: 5,
    bio: "Innovative VR/AR content creators",
    verified: false,
    trending: 20,
    added: "2024-10-10",
  },
  {
    id: 6,
    name: "Ironclad Forge",
    logo: "https://placehold.co/100x100/be123c/ffffff?text=IF",
    games: 63,
    bio: "Strategy and Simulation masters",
    verified: true,
    trending: 70,
    added: "2023-04-22",
  },
  {
    id: 7,
    name: "Galactic Drift",
    logo: "https://placehold.co/100x100/4c0519/ffffff?text=GD",
    games: 12,
    bio: "Space combat and exploration games",
    verified: false,
    trending: 30,
    added: "2024-08-01",
  },
  {
    id: 8,
    name: "Terra Nova Dev",
    logo: "https://placehold.co/100x100/166534/ffffff?text=TN",
    games: 78,
    bio: "Pioneers of sandbox survival",
    verified: true,
    trending: 80,
    added: "2023-01-01",
  },
  {
    id: 9,
    name: "Echo Stream",
    logo: "https://placehold.co/100x100/581c87/ffffff?text=ES",
    games: 33,
    bio: "Adept at puzzle and rhythm games",
    verified: false,
    trending: 55,
    added: "2023-07-10",
  },
  {
    id: 10,
    name: "Neon Dynamics",
    logo: "https://placehold.co/100x100/8b5cf6/ffffff?text=ND",
    games: 19,
    bio: "Cyberpunk adventure specialists",
    verified: true,
    trending: 90,
    added: "2024-02-28",
  },
  {
    id: 11,
    name: "Frozen Peaks",
    logo: "https://placehold.co/100x100/6b7280/ffffff?text=FP",
    games: 10,
    bio: "Tense horror and survival games",
    verified: true,
    trending: 40,
    added: "2024-06-01",
  },
  {
    id: 12,
    name: "Rising Sun Games",
    logo: "https://placehold.co/100x100/ef4444/ffffff?text=RS",
    games: 51,
    bio: "Japanese-style RPGs and action",
    verified: false,
    trending: 75,
    added: "2022-10-05",
  },
];

const ITEMS_PER_PAGE = 8;

interface PublisherCardProps {
  publisher: Publisher;
  onFollow: (publisher: Publisher) => void;
}

function PublisherCard({ publisher, onFollow }: PublisherCardProps) {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border">
      <CardContent className="p-6">
        {/* Publisher Logo and Name */}
        <div className="flex items-start mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={publisher.logo}
            alt={`${publisher.name} Logo`}
            className="w-16 h-16 rounded-lg object-cover shadow-lg border-2 border-primary/50"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/64x64/374151/ffffff?text=Logo";
            }}
          />
          <div className="ml-4 flex-1">
            <h3 className="text-xl font-bold flex items-center flex-wrap gap-2">
              {publisher.name}
              {publisher.verified && (
                <Badge className="bg-primary text-primary-foreground text-xs">
                  <BadgeCheck className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{publisher.bio}</p>
          </div>
        </div>

        {/* Game Count */}
        <div className="mb-4">
          <div className="text-sm font-medium text-muted-foreground">Total Games:</div>
          <p className="text-2xl font-extrabold text-primary">{publisher.games}</p>
        </div>

        {/* View Button and Follow Button */}
        <div className="mt-auto flex justify-between items-center space-x-2">
          <Button className="flex-grow" variant="default">
            View Games ({publisher.games})
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onFollow(publisher)}
            title={`Follow ${publisher.name}`}
          >
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PublishersPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name_asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter publishers based on search
  const filteredPublishers = useMemo(() => {
    if (!searchTerm) return publishersData;

    const term = searchTerm.toLowerCase();
    return publishersData.filter(
      (publisher) =>
        publisher.name.toLowerCase().includes(term) ||
        publisher.bio.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Sort publishers
  const sortedPublishers = useMemo(() => {
    const data = [...filteredPublishers];

    data.sort((a, b) => {
      switch (sortCriteria) {
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        case "games_desc":
          return b.games - a.games;
        case "trending":
          return b.trending - a.trending;
        case "recent":
          return new Date(b.added).getTime() - new Date(a.added).getTime();
        default:
          return 0;
      }
    });

    return data;
  }, [filteredPublishers, sortCriteria]);

  // Featured publishers (trending > 70)
  const featuredPublishers = useMemo(
    () => sortedPublishers.filter((p) => p.trending > 70).slice(0, 4),
    [sortedPublishers]
  );

  // Pagination
  const totalPages = Math.ceil(sortedPublishers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPublishers = sortedPublishers.slice(startIndex, endIndex);

  // Reset to page 1 when search or sort changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortCriteria]);

  const handleFollow = (publisher: Publisher) => {
    toast({
      title: "Following Publisher",
      description: `You are now following ${publisher.name}. You'll receive notifications about their new games.`,
    });
  };

  const handleSortChange = (value: string) => {
    setSortCriteria(value);
  };

  const handlePageChange = (direction: number) => {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight">
            Publisher Index
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore the creators behind your favorite gaming experiences.
          </p>
        </header>

        {/* Featured Publishers */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Star className="w-6 h-6 text-yellow-500 mr-2" />
            Featured Developers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featuredPublishers.map((publisher) => (
              <Card key={publisher.id} className="border-primary/50">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={publisher.logo}
                    alt={`${publisher.name} Logo`}
                    className="w-12 h-12 rounded-full object-cover mb-2 border border-border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/48x48/374151/ffffff?text=F";
                    }}
                  />
                  <h4 className="text-sm font-semibold truncate w-full">{publisher.name}</h4>
                  <span className="text-xs text-primary">{publisher.games} Games</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Search, Filter, and Sort Controls */}
        <Card className="mb-8 border-border">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="flex-grow md:w-1/3 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search publisher by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {/* Recently Added Button */}
                <Button
                  variant={sortCriteria === "recent" ? "default" : "outline"}
                  onClick={() => handleSortChange("recent")}
                  size="sm"
                >
                  Recently Added
                </Button>

                {/* Sort Dropdown */}
                <Select value={sortCriteria} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                    <SelectItem value="games_desc">Game Count (High-Low)</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Publisher Cards Grid */}
        <section className="mb-10">
          {paginatedPublishers.length === 0 ? (
            <Card>
              <CardContent className="p-10 text-center">
                <p className="text-xl text-muted-foreground">
                  No publishers match your current search and filter criteria.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedPublishers.map((publisher) => (
                <PublisherCard
                  key={publisher.id}
                  publisher={publisher}
                  onFollow={handleFollow}
                />
              ))}
            </div>
          )}
        </section>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => handlePageChange(-1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-muted-foreground">
              Page {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePageChange(1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
