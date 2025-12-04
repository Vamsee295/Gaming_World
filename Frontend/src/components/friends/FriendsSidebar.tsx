import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, X, MessageSquare, Gamepad2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useFriends } from "@/context/FriendsContext";
import FriendsChat from "./FriendsChat";

interface FriendsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FriendsSidebar({ isOpen, onClose }: FriendsSidebarProps) {
  const { friends, pendingRequestsCount } = useFriends();
  const [searchQuery, setSearchQuery] = useState("");
  const [chatFriendId, setChatFriendId] = useState<string | null>(null);

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineFriends = filteredFriends.filter(f => f.status === "online" || f.status === "playing");
  const offlineFriends = filteredFriends.filter(f => f.status === "offline" || f.status === "away");

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-80 bg-background border-l border-border shadow-2xl z-40 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Friends</h2>
            {pendingRequestsCount > 0 && (
              <Badge className="bg-primary text-primary-foreground">{pendingRequestsCount}</Badge>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
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

        {/* Friends List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Online Friends */}
            {onlineFriends.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                  Online ({onlineFriends.length})
                </h3>
                <div className="space-y-2">
                  {onlineFriends.map((friend) => (
                    <motion.div
                      key={friend.id}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary cursor-pointer group"
                      onClick={() => setChatFriendId(friend.id)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={friend.avatarUrl} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                          friend.status === "playing" ? "bg-green-500" : "bg-green-400"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{friend.name}</p>
                        {friend.status === "playing" && friend.currentGame ? (
                          <p className="text-xs text-muted-foreground truncate">
                            {friend.currentGame.title}
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground">Online</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          setChatFriendId(friend.id);
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Offline Friends */}
            {offlineFriends.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                  Offline ({offlineFriends.length})
                </h3>
                <div className="space-y-2">
                  {offlineFriends.map((friend) => (
                    <motion.div
                      key={friend.id}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary cursor-pointer opacity-60"
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={friend.avatarUrl} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{friend.name}</p>
                        <p className="text-xs text-muted-foreground">Offline</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {filteredFriends.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">No friends found</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </motion.div>

      {/* Chat Window */}
      {chatFriendId && (
        <FriendsChat
          friendId={chatFriendId}
          isOpen={!!chatFriendId}
          onClose={() => setChatFriendId(null)}
        />
      )}
    </>
  );
}







