import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFriends } from "@/context/FriendsContext";
import { useUser } from "@/context/UserContext";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  fromUserId: string;
  toUserId: string;
  content: string;
  timestamp: string;
}

interface FriendsChatProps {
  friendId: string;
  isOpen: boolean;
  onClose: () => void;
}

// Mock messages - in real app, this would come from a context or API
const mockMessages: Record<string, Message[]> = {
  "friend-1": [
    {
      id: "msg-1",
      fromUserId: "friend-1",
      toUserId: "current-user",
      content: "Hey! Want to play Cyberpunk 2077 together?",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "msg-2",
      fromUserId: "current-user",
      toUserId: "friend-1",
      content: "Sure! Let me finish this mission first.",
      timestamp: new Date(Date.now() - 3300000).toISOString(),
    },
  ],
};

export default function FriendsChat({ friendId, isOpen, onClose }: FriendsChatProps) {
  const { friends } = useFriends();
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(mockMessages[friendId] || []);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const friend = friends.find(f => f.id === friendId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!message.trim() || !user || !friend) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      fromUserId: user.id || "current-user",
      toUserId: friendId,
      content: message,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
  };

  if (!isOpen || !friend) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className={`fixed bottom-0 right-4 z-50 ${
          isMinimized ? "w-64" : "w-80"
        } bg-background border border-border rounded-t-lg shadow-2xl flex flex-col ${
          isMinimized ? "h-12" : "h-[500px]"
        } transition-all`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border bg-secondary/50">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src={friend.avatarUrl} />
              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {!isMinimized && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{friend.name}</p>
                <p className="text-xs text-muted-foreground">
                  {friend.status === "online" || friend.status === "playing" ? "Online" : "Offline"}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <p className="text-sm">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isOwn = msg.fromUserId === (user?.id || "current-user");
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg px-3 py-2 ${
                            isOwn
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button onClick={handleSend} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}




