import React, { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, UserPlus, Search, MessageSquare, Gamepad2, X, Check, XCircle, 
  MoreVertical, UserMinus, Shield, Clock, Play, Circle, AlertCircle
} from "lucide-react";
import { useFriends } from "@/context/FriendsContext";
import { useUser } from "@/context/UserContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

// Mock users for searching
const mockUsers = [
  { id: "user-1", name: "GamerPro123", email: "gamer@example.com", avatar: null },
  { id: "user-2", name: "SpeedRunner99", email: "speed@example.com", avatar: null },
  { id: "user-3", name: "StrategyMaster", email: "strategy@example.com", avatar: null },
  { id: "user-4", name: "NewGamer2024", email: "new@example.com", avatar: null },
  { id: "user-5", name: "ProGamer2024", email: "pro@example.com", avatar: null },
];

export default function FriendsPage() {
  const router = useRouter();
  const { 
    friends, 
    friendRequests, 
    addFriend, 
    removeFriend, 
    sendFriendRequest, 
    acceptFriendRequest, 
    declineFriendRequest, 
    cancelFriendRequest,
    blockUser,
    pendingRequestsCount 
  } = useFriends();
  const { user } = useUser();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [addFriendQuery, setAddFriendQuery] = useState("");
  const [addFriendMessage, setAddFriendMessage] = useState("");
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "online" | "offline" | "playing">("all");
  const [activeTab, setActiveTab] = useState("friends");

  // Handle URL query parameters for tab navigation
  useEffect(() => {
    if (router.query.tab) {
      setActiveTab(router.query.tab as string);
    }
  }, [router.query.tab]);

  // Filter friends
  const filteredFriends = useMemo(() => {
    let filtered = friends;
    
    if (filter !== "all") {
      filtered = filtered.filter(f => f.status === filter);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(query) ||
        f.email.toLowerCase().includes(query)
      );
    }
    
    // Sort: online/playing first, then offline
    return filtered.sort((a, b) => {
      const statusOrder = { playing: 0, online: 1, away: 2, offline: 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    });
  }, [friends, filter, searchQuery]);

  // Search results for adding friends
  const searchResults = useMemo(() => {
    if (!addFriendQuery.trim()) return [];
    const query = addFriendQuery.toLowerCase();
    return mockUsers.filter(u => 
      (u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)) &&
      !friends.some(f => f.id === u.id) &&
      !friendRequests.some(r => r.fromUserId === u.id || r.toUserId === u.id)
    ).slice(0, 5);
  }, [addFriendQuery, friends, friendRequests]);

  const handleSendRequest = (userId: string, userName: string) => {
    sendFriendRequest(userId, userName, undefined, addFriendMessage);
    setAddFriendQuery("");
    setAddFriendMessage("");
    setIsAddFriendOpen(false);
    toast({
      title: "Friend request sent",
      description: `Friend request sent to ${userName}`,
    });
  };

  const handleAcceptRequest = (requestId: string) => {
    acceptFriendRequest(requestId);
    toast({
      title: "Friend request accepted",
      description: "You are now friends!",
    });
  };

  const handleDeclineRequest = (requestId: string) => {
    declineFriendRequest(requestId);
    toast({
      title: "Friend request declined",
    });
  };

  const handleRemoveFriend = (friendId: string, friendName: string) => {
    removeFriend(friendId);
    toast({
      title: "Friend removed",
      description: `${friendName} has been removed from your friends list`,
    });
  };

  const handleBlockUser = (userId: string, userName: string) => {
    blockUser(userId);
    toast({
      title: "User blocked",
      description: `${userName} has been blocked`,
      variant: "destructive",
    });
  };

  const selectedFriendData = friends.find(f => f.id === selectedFriend);
  const incomingRequests = friendRequests.filter(r => r.type === "incoming");
  const outgoingRequests = friendRequests.filter(r => r.type === "outgoing");

  const formatLastSeen = (lastSeen?: string) => {
    if (!lastSeen) return "Never";
    const date = new Date(lastSeen);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <Head>
        <title>Friends - GameVerse</title>
      </Head>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Friends</h1>
              <p className="text-muted-foreground">Manage your friends, send requests, and stay connected</p>
            </div>
            <Button onClick={() => setIsAddFriendOpen(true)} className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Friend
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-foreground">{friends.length}</div>
                <div className="text-sm text-muted-foreground">Total Friends</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-500">
                  {friends.filter(f => f.status === "online" || f.status === "playing").length}
                </div>
                <div className="text-sm text-muted-foreground">Online Now</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{pendingRequestsCount}</div>
                <div className="text-sm text-muted-foreground">Pending Requests</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-foreground">
                  {friends.filter(f => f.status === "playing").length}
                </div>
                <div className="text-sm text-muted-foreground">In-Game</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="friends" className="gap-2">
                <Users className="h-4 w-4" />
                Friends ({friends.length})
              </TabsTrigger>
              <TabsTrigger value="requests" className="gap-2 relative">
                <AlertCircle className="h-4 w-4" />
                Requests
                {pendingRequestsCount > 0 && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">{pendingRequestsCount}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="add" className="gap-2">
                <UserPlus className="h-4 w-4" />
                Add Friend
              </TabsTrigger>
            </TabsList>

            {/* Friends List Tab */}
            <TabsContent value="friends" className="mt-6">
              <div className="flex gap-4 mb-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search friends..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={filter === "online" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("online")}
                  >
                    Online
                  </Button>
                  <Button
                    variant={filter === "playing" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("playing")}
                  >
                    In-Game
                  </Button>
                  <Button
                    variant={filter === "offline" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("offline")}
                  >
                    Offline
                  </Button>
                </div>
              </div>

              {filteredFriends.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">
                      {searchQuery ? "No friends found matching your search" : "No friends yet. Add some friends to get started!"}
                    </p>
                    <Button onClick={() => setIsAddFriendOpen(true)}>Add Friend</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {filteredFriends.map((friend) => (
                      <motion.div
                        key={friend.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="hover:border-primary transition-all cursor-pointer" onClick={() => setSelectedFriend(friend.id)}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="relative">
                                {friend.avatarUrl ? (
                                  <img src={friend.avatarUrl} alt={friend.name} className="h-12 w-12 rounded-full" />
                                ) : (
                                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-semibold">
                                    {friend.name.charAt(0)}
                                  </div>
                                )}
                                <div className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background ${
                                  friend.status === "online" || friend.status === "playing" 
                                    ? "bg-green-500" 
                                    : friend.status === "away"
                                    ? "bg-yellow-500"
                                    : "bg-gray-500"
                                }`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-foreground truncate">{friend.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {friend.status === "playing" && friend.currentGame ? (
                                    <div className="flex items-center gap-1">
                                      <Play className="h-3 w-3 text-primary" />
                                      <span className="truncate">{friend.currentGame.title}</span>
                                    </div>
                                  ) : friend.status === "online" ? (
                                    "Online"
                                  ) : friend.status === "away" ? (
                                    "Away"
                                  ) : (
                                    `Last seen ${formatLastSeen(friend.lastSeen)}`
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 gap-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Open chat - placeholder
                                  toast({
                                    title: "Chat",
                                    description: `Opening chat with ${friend.name}`,
                                  });
                                }}
                              >
                                <MessageSquare className="h-4 w-4" />
                                Message
                              </Button>
                              {friend.status === "playing" && friend.currentGame && (
                                <Button
                                  size="sm"
                                  className="flex-1 gap-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast({
                                      title: "Game Invite",
                                      description: `Inviting ${friend.name} to play`,
                                    });
                                  }}
                                >
                                  <Gamepad2 className="h-4 w-4" />
                                  Invite
                                </Button>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => setSelectedFriend(friend.id)}>
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleRemoveFriend(friend.id, friend.name)}
                                    className="text-destructive"
                                  >
                                    <UserMinus className="h-4 w-4 mr-2" />
                                    Remove Friend
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleBlockUser(friend.id, friend.name)}
                                    className="text-destructive"
                                  >
                                    <Shield className="h-4 w-4 mr-2" />
                                    Block User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </TabsContent>

            {/* Friend Requests Tab */}
            <TabsContent value="requests" className="mt-6">
              <div className="space-y-6">
                {/* Incoming Requests */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">Incoming Requests</h2>
                  {incomingRequests.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No incoming friend requests</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {incomingRequests.map((request) => (
                        <motion.div
                          key={request.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  {request.fromUserAvatar ? (
                                    <img src={request.fromUserAvatar} alt={request.fromUserName} className="h-12 w-12 rounded-full" />
                                  ) : (
                                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-semibold">
                                      {request.fromUserName.charAt(0)}
                                    </div>
                                  )}
                                  <div>
                                    <div className="font-semibold text-foreground">{request.fromUserName}</div>
                                    {request.message && (
                                      <div className="text-sm text-muted-foreground mt-1">{request.message}</div>
                                    )}
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {formatLastSeen(request.createdAt)}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleAcceptRequest(request.id)}
                                    className="gap-2"
                                  >
                                    <Check className="h-4 w-4" />
                                    Accept
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDeclineRequest(request.id)}
                                    className="gap-2"
                                  >
                                    <XCircle className="h-4 w-4" />
                                    Decline
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Outgoing Requests */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-foreground">Outgoing Requests</h2>
                  {outgoingRequests.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <p className="text-muted-foreground">No pending outgoing requests</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {outgoingRequests.map((request) => (
                        <motion.div
                          key={request.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-semibold">
                                    {request.toUserId.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-foreground">User ID: {request.toUserId}</div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                      Sent {formatLastSeen(request.createdAt)}
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => cancelFriendRequest(request.id)}
                                  className="gap-2"
                                >
                                  <X className="h-4 w-4" />
                                  Cancel
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Add Friend Tab */}
            <TabsContent value="add" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Friend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Search by username or email</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter username or email..."
                        value={addFriendQuery}
                        onChange={(e) => setAddFriendQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {searchResults.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Search Results</div>
                      {searchResults.map((user) => (
                        <Card key={user.id} className="bg-secondary">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {user.avatar ? (
                                  <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                    {user.name.charAt(0)}
                                  </div>
                                )}
                                <div>
                                  <div className="font-semibold">{user.name}</div>
                                  <div className="text-sm text-muted-foreground">{user.email}</div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleSendRequest(user.id, user.name)}
                              >
                                <UserPlus className="h-4 w-4 mr-2" />
                                Send Request
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {addFriendQuery && searchResults.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No users found matching "{addFriendQuery}"</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Add Friend Dialog */}
        <Dialog open={isAddFriendOpen} onOpenChange={setIsAddFriendOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Friend</DialogTitle>
              <DialogDescription>
                Search for users by username or email to send a friend request
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Username or Email</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter username or email..."
                    value={addFriendQuery}
                    onChange={(e) => setAddFriendQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message (Optional)</label>
                <Input
                  placeholder="Add a personal message..."
                  value={addFriendMessage}
                  onChange={(e) => setAddFriendMessage(e.target.value)}
                />
              </div>
              {searchResults.length > 0 && (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {searchResults.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                            {user.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleSendRequest(user.id, user.name)}
                      >
                        Send Request
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddFriendOpen(false)}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Friend Profile Dialog */}
        <Dialog open={!!selectedFriend} onOpenChange={(open) => !open && setSelectedFriend(null)}>
          <DialogContent className="max-w-md">
            {selectedFriendData && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4">
                    {selectedFriendData.avatarUrl ? (
                      <img src={selectedFriendData.avatarUrl} alt={selectedFriendData.name} className="h-16 w-16 rounded-full" />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-semibold">
                        {selectedFriendData.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <DialogTitle>{selectedFriendData.name}</DialogTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`h-2 w-2 rounded-full ${
                          selectedFriendData.status === "online" || selectedFriendData.status === "playing"
                            ? "bg-green-500"
                            : selectedFriendData.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }`} />
                        <span className="text-sm text-muted-foreground capitalize">{selectedFriendData.status}</span>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  {selectedFriendData.currentGame && (
                    <div className="p-3 bg-secondary rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Currently Playing</div>
                      <div className="font-semibold">{selectedFriendData.currentGame.title}</div>
                      {selectedFriendData.currentGame.playtime && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {selectedFriendData.currentGame.playtime} in this session
                        </div>
                      )}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Email</div>
                      <div className="font-medium">{selectedFriendData.email}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Friends Since</div>
                      <div className="font-medium">
                        {new Date(selectedFriendData.friendshipDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4 border-t">
                    <Button className="flex-1 gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </Button>
                    {selectedFriendData.status === "playing" && selectedFriendData.currentGame && (
                      <Button variant="outline" className="flex-1 gap-2">
                        <Gamepad2 className="h-4 w-4" />
                        Invite to Game
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        handleRemoveFriend(selectedFriendData.id, selectedFriendData.name);
                        setSelectedFriend(null);
                      }}
                    >
                      <UserMinus className="h-4 w-4 mr-2" />
                      Remove Friend
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        handleBlockUser(selectedFriendData.id, selectedFriendData.name);
                        setSelectedFriend(null);
                      }}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Block
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

