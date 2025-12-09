import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserSearch, Search, UserPlus, Trophy, Gamepad2, MapPin, CheckCircle2, Check } from "lucide-react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import CommunityNav from "@/components/community/CommunityNav";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  favoriteGames: string[];
  achievements: number;
  gamesOwned: number;
  playtime: string;
  badges: string[];
}

const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "GamerPro123",
    bio: "Hardcore RPG enthusiast. Love exploring open worlds!",
    location: "New York, USA",
    favoriteGames: ["Cyberpunk 2077", "The Witcher 3", "Elden Ring"],
    achievements: 487,
    gamesOwned: 156,
    playtime: "2,341 hours",
    badges: ["Perfectionist", "The Grinder", "Narrative Master"],
  },
  {
    id: "2",
    name: "SpeedRunner99",
    bio: "Speedrunning is life. Always looking for new challenges!",
    location: "Los Angeles, USA",
    favoriteGames: ["Need For Speed", "Mario Kart", "Forza"],
    achievements: 234,
    gamesOwned: 89,
    playtime: "1,567 hours",
    badges: ["Speed Demon", "Racing King"],
  },
  {
    id: "3",
    name: "StrategyMaster",
    bio: "Turn-based strategy games are my passion.",
    location: "London, UK",
    favoriteGames: ["Civilization VI", "XCOM 2", "Total War"],
    achievements: 312,
    gamesOwned: 67,
    playtime: "3,124 hours",
    badges: ["Strategic Mind", "Tactician"],
  },
];

export default function FindFriendsPage() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [gameFilter, setGameFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [addedFriends, setAddedFriends] = useState<string[]>([]);
  const [successDialog, setSuccessDialog] = useState(false);
  const [friendName, setFriendName] = useState("");

  const allGames = Array.from(new Set(mockUsers.flatMap(u => u.favoriteGames)));
  const allLocations = Array.from(new Set(mockUsers.map(u => u.location).filter(Boolean)));

  const filteredUsers = mockUsers.filter(profile => {
    const matchesSearch = searchQuery === "" ||
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.bio?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = gameFilter === "all" || profile.favoriteGames.includes(gameFilter);
    const matchesLocation = locationFilter === "all" || profile.location === locationFilter;
    return matchesSearch && matchesGame && matchesLocation;
  });

  const handleAddFriend = (profile: UserProfile) => {
    setAddedFriends(prev => [...prev, profile.id]);
    setFriendName(profile.name);
    setSuccessDialog(true);
    // Auto-close after 2 seconds
    setTimeout(() => {
      setSuccessDialog(false);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Find Friends - GameVerse Community</title>
      </Head>

      <div className="min-h-screen bg-background">
        <CommunityNav />
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Find Friends</h1>
            <p className="text-muted-foreground">Connect with gamers who share your interests and favorite games</p>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or bio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={gameFilter} onValueChange={setGameFilter}>
              <SelectTrigger className="w-[180px]">
                <Gamepad2 className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Favorite Game" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Games</SelectItem>
                {allGames.map(game => (
                  <SelectItem key={game} value={game}>{game}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[180px]">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {allLocations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="p-12 text-center">
                    <UserSearch className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No users found matching your criteria</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              filteredUsers.map((profile) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:border-primary transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        {profile.avatar ? (
                          <img src={profile.avatar} alt={profile.name} className="h-16 w-16 rounded-full" />
                        ) : (
                          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold">
                            {profile.name.charAt(0)}
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{profile.name}</h3>
                          {profile.location && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                              <MapPin className="h-3 w-3" />
                              {profile.location}
                            </div>
                          )}
                          {profile.bio && (
                            <p className="text-sm text-muted-foreground line-clamp-2">{profile.bio}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Achievements</span>
                          <div className="flex items-center gap-1">
                            <Trophy className="h-4 w-4 text-primary" />
                            <span className="font-semibold">{profile.achievements}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Games Owned</span>
                          <span className="font-semibold">{profile.gamesOwned}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Total Playtime</span>
                          <span className="font-semibold">{profile.playtime}</span>
                        </div>

                        <div>
                          <div className="text-xs text-muted-foreground mb-2">Favorite Games</div>
                          <div className="flex flex-wrap gap-1">
                            {profile.favoriteGames.slice(0, 3).map(game => (
                              <Badge key={game} variant="secondary" className="text-xs">{game}</Badge>
                            ))}
                          </div>
                        </div>

                        {profile.badges.length > 0 && (
                          <div>
                            <div className="text-xs text-muted-foreground mb-2">Badges</div>
                            <div className="flex flex-wrap gap-1">
                              {profile.badges.map(badge => (
                                <Badge key={badge} variant="outline" className="text-xs">{badge}</Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <Button
                          className="w-full mt-4 gap-2"
                          onClick={() => handleAddFriend(profile)}
                          disabled={addedFriends.includes(profile.id)}
                          variant={addedFriends.includes(profile.id) ? "outline" : "default"}
                        >
                          {addedFriends.includes(profile.id) ? (
                            <>
                              <Check className="h-4 w-4" />
                              Friend Request Sent
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-4 w-4" />
                              Add Friend
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Friend Request Success Dialog */}
        <Dialog open={successDialog} onOpenChange={setSuccessDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                Friend Request Sent!
              </DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center">
              <p className="text-lg text-muted-foreground">
                Your friend request has been sent to <span className="font-semibold text-foreground">{friendName}</span>!
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                They'll receive a notification and can accept your request.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => setSuccessDialog(false)} className="w-full">
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

