import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export interface Friend {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  status: "online" | "offline" | "playing" | "away";
  currentGame?: {
    id: number;
    title: string;
    playtime?: string;
  };
  lastSeen?: string;
  friendshipDate: string;
}

export interface FriendRequest {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar?: string;
  toUserId: string;
  message?: string;
  createdAt: string;
  type: "incoming" | "outgoing";
}

interface FriendsContextValue {
  friends: Friend[];
  friendRequests: FriendRequest[];
  addFriend: (userId: string, userName: string, userAvatar?: string) => void;
  removeFriend: (friendId: string) => void;
  sendFriendRequest: (userId: string, userName: string, userAvatar?: string, message?: string) => void;
  acceptFriendRequest: (requestId: string) => void;
  declineFriendRequest: (requestId: string) => void;
  cancelFriendRequest: (requestId: string) => void;
  blockUser: (userId: string) => void;
  updateFriendStatus: (friendId: string, status: Friend["status"], game?: Friend["currentGame"]) => void;
  pendingRequestsCount: number;
}

const FriendsContext = createContext<FriendsContextValue | undefined>(undefined);

export const useFriends = (): FriendsContextValue => {
  const ctx = useContext(FriendsContext);
  if (!ctx) throw new Error("useFriends must be used within FriendsProvider");
  return ctx;
};

export const FriendsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "friend-1",
      name: "GamerPro123",
      email: "gamer@example.com",
      status: "playing",
      currentGame: { id: 1, title: "Cyberpunk 2077", playtime: "2.5h" },
      friendshipDate: new Date(Date.now() - 86400000 * 30).toISOString(),
    },
    {
      id: "friend-2",
      name: "SpeedRunner99",
      email: "speed@example.com",
      status: "online",
      lastSeen: new Date().toISOString(),
      friendshipDate: new Date(Date.now() - 86400000 * 15).toISOString(),
    },
    {
      id: "friend-3",
      name: "StrategyMaster",
      email: "strategy@example.com",
      status: "offline",
      lastSeen: new Date(Date.now() - 3600000 * 2).toISOString(),
      friendshipDate: new Date(Date.now() - 86400000 * 7).toISOString(),
    },
  ]);

  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    {
      id: "req-1",
      fromUserId: "user-4",
      fromUserName: "NewGamer2024",
      toUserId: "current-user",
      message: "Hey! Let's play together!",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      type: "incoming",
    },
  ]);

  const addFriend = useCallback((userId: string, userName: string, userAvatar?: string) => {
    const newFriend: Friend = {
      id: userId,
      name: userName,
      email: `${userName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      avatarUrl: userAvatar,
      status: "offline",
      friendshipDate: new Date().toISOString(),
    };
    setFriends(prev => [...prev, newFriend]);
  }, []);

  const removeFriend = useCallback((friendId: string) => {
    setFriends(prev => prev.filter(f => f.id !== friendId));
  }, []);

  const sendFriendRequest = useCallback((userId: string, userName: string, userAvatar?: string, message?: string) => {
    const newRequest: FriendRequest = {
      id: `req-${Date.now()}`,
      fromUserId: "current-user",
      fromUserName: "You",
      toUserId: userId,
      message,
      createdAt: new Date().toISOString(),
      type: "outgoing",
    };
    setFriendRequests(prev => [...prev, newRequest]);
  }, []);

  const acceptFriendRequest = useCallback((requestId: string) => {
    const request = friendRequests.find(r => r.id === requestId);
    if (request && request.type === "incoming") {
      addFriend(request.fromUserId, request.fromUserName, request.fromUserAvatar);
      setFriendRequests(prev => prev.filter(r => r.id !== requestId));
    }
  }, [friendRequests, addFriend]);

  const declineFriendRequest = useCallback((requestId: string) => {
    setFriendRequests(prev => prev.filter(r => r.id !== requestId));
  }, []);

  const cancelFriendRequest = useCallback((requestId: string) => {
    setFriendRequests(prev => prev.filter(r => r.id !== requestId));
  }, []);

  const blockUser = useCallback((userId: string) => {
    setFriends(prev => prev.filter(f => f.id !== userId));
    setFriendRequests(prev => prev.filter(r => r.fromUserId !== userId && r.toUserId !== userId));
  }, []);

  const updateFriendStatus = useCallback((friendId: string, status: Friend["status"], game?: Friend["currentGame"]) => {
    setFriends(prev => prev.map(friend => 
      friend.id === friendId 
        ? { ...friend, status, currentGame: game, lastSeen: status === "offline" ? new Date().toISOString() : friend.lastSeen }
        : friend
    ));
  }, []);

  const pendingRequestsCount = useMemo(() => {
    return friendRequests.filter(r => r.type === "incoming").length;
  }, [friendRequests]);

  const value = useMemo<FriendsContextValue>(() => ({
    friends,
    friendRequests,
    addFriend,
    removeFriend,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    cancelFriendRequest,
    blockUser,
    updateFriendStatus,
    pendingRequestsCount,
  }), [friends, friendRequests, addFriend, removeFriend, sendFriendRequest, acceptFriendRequest, declineFriendRequest, cancelFriendRequest, blockUser, updateFriendStatus, pendingRequestsCount]);

  return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
};

