import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  replies: ForumReply[];
  views: number;
  likes: number;
  createdAt: string;
  isPinned?: boolean;
  isLocked?: boolean;
}

export interface ForumReply {
  id: string;
  postId: string;
  content: string;
  author: string;
  authorAvatar?: string;
  likes: number;
  createdAt: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  isPublic: boolean;
  members: string[];
  admins: string[];
  gameTags: string[];
  createdAt: string;
  memberCount: number;
}

export interface Activity {
  id: string;
  type: "achievement" | "review" | "purchase" | "group_join" | "forum_post";
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  description: string;
  gameId?: number;
  gameTitle?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image?: string;
  type: "tournament" | "sale" | "stream" | "announcement";
  startDate: string;
  endDate: string;
  participants: string[];
  maxParticipants?: number;
  isRSVPRequired: boolean;
  location?: string;
  gameId?: number;
}

interface CommunityContextValue {
  // Forums
  posts: ForumPost[];
  addPost: (post: Omit<ForumPost, "id" | "replies" | "views" | "likes" | "createdAt">) => void;
  addReply: (postId: string, reply: Omit<ForumReply, "id" | "likes" | "createdAt">) => void;
  likePost: (postId: string) => void;
  likeReply: (postId: string, replyId: string) => void;
  
  // Groups
  groups: Group[];
  addGroup: (group: Omit<Group, "id" | "members" | "admins" | "memberCount" | "createdAt">) => void;
  joinGroup: (groupId: string, userId: string) => void;
  leaveGroup: (groupId: string, userId: string) => void;
  
  // Activities
  activities: Activity[];
  addActivity: (activity: Omit<Activity, "id" | "createdAt">) => void;
  
  // Events
  events: Event[];
  addEvent: (event: Omit<Event, "id" | "participants">) => void;
  rsvpEvent: (eventId: string, userId: string) => void;
  cancelRSVP: (eventId: string, userId: string) => void;
}

const CommunityContext = createContext<CommunityContextValue | undefined>(undefined);

export const useCommunity = (): CommunityContextValue => {
  const ctx = useContext(CommunityContext);
  if (!ctx) throw new Error("useCommunity must be used within CommunityProvider");
  return ctx;
};

export const CommunityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Sample data for demonstration
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: "post-1",
      title: "Best RPG Games of 2024?",
      content: "Looking for recommendations on the best RPG games released this year. What are you all playing?",
      author: "GamerPro123",
      category: "Game Discussions",
      tags: ["RPG", "Recommendations"],
      replies: [
        {
          id: "reply-1",
          postId: "post-1",
          content: "I highly recommend Cyberpunk 2077! The story is amazing.",
          author: "SpeedRunner99",
          likes: 5,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        }
      ],
      views: 234,
      likes: 12,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "post-2",
      title: "Need Help with Game Installation",
      content: "Having trouble installing Cyberpunk 2077. Getting an error message. Any solutions?",
      author: "NewGamer2024",
      category: "Support",
      tags: ["Help", "Troubleshooting"],
      replies: [],
      views: 89,
      likes: 3,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    }
  ]);
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "group-1",
      name: "RPG Enthusiasts",
      description: "A community for RPG lovers. Share your adventures, tips, and favorite games!",
      isPublic: true,
      members: [],
      admins: [],
      gameTags: ["RPG", "Action"],
      createdAt: new Date(Date.now() - 604800000).toISOString(),
      memberCount: 0,
    },
    {
      id: "group-2",
      name: "Speedrunning Community",
      description: "For speedrunners and competitive players. Share strategies and compete!",
      isPublic: true,
      members: [],
      admins: [],
      gameTags: ["Racing", "Action"],
      createdAt: new Date(Date.now() - 2592000000).toISOString(),
      memberCount: 0,
    }
  ]);
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "activity-1",
      type: "achievement",
      userId: "user-1",
      userName: "GamerPro123",
      title: "Unlocked Achievement: Perfectionist",
      description: "Completed 25+ games to 100%",
      gameId: 1,
      gameTitle: "Cyberpunk 2077",
      createdAt: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: "activity-2",
      type: "purchase",
      userId: "user-2",
      userName: "SpeedRunner99",
      title: "Purchased New Game",
      description: "Just bought Marvel's Spiderman",
      gameId: 2,
      gameTitle: "Marvel's Spiderman",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    }
  ]);
  const [events, setEvents] = useState<Event[]>([
    {
      id: "event-1",
      title: "Summer Gaming Tournament 2024",
      description: "Join us for an epic gaming tournament featuring multiple game categories. Prizes for top players!",
      type: "tournament",
      startDate: new Date(Date.now() + 86400000 * 7).toISOString(),
      endDate: new Date(Date.now() + 86400000 * 10).toISOString(),
      participants: [],
      maxParticipants: 100,
      isRSVPRequired: true,
      location: "Online",
    },
    {
      id: "event-2",
      title: "Weekend Flash Sale",
      description: "Massive discounts on selected games. Up to 75% off!",
      type: "sale",
      startDate: new Date(Date.now() + 86400000 * 2).toISOString(),
      endDate: new Date(Date.now() + 86400000 * 4).toISOString(),
      participants: [],
      isRSVPRequired: false,
    }
  ]);

  // Forum functions
  const addPost = useCallback((post: Omit<ForumPost, "id" | "replies" | "views" | "likes" | "createdAt">) => {
    const newPost: ForumPost = {
      ...post,
      id: `post-${Date.now()}`,
      replies: [],
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    setPosts(prev => [newPost, ...prev]);
  }, []);

  const addReply = useCallback((postId: string, reply: Omit<ForumReply, "id" | "likes" | "createdAt">) => {
    const newReply: ForumReply = {
      ...reply,
      id: `reply-${Date.now()}`,
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, replies: [...post.replies, newReply] }
        : post
    ));
  }, []);

  const likePost = useCallback((postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  }, []);

  const likeReply = useCallback((postId: string, replyId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, replies: post.replies.map(reply => 
            reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply
          )}
        : post
    ));
  }, []);

  // Group functions
  const addGroup = useCallback((group: Omit<Group, "id" | "members" | "admins" | "memberCount" | "createdAt">) => {
    const newGroup: Group = {
      ...group,
      id: `group-${Date.now()}`,
      members: [],
      admins: [],
      memberCount: 0,
      createdAt: new Date().toISOString(),
    };
    setGroups(prev => [newGroup, ...prev]);
  }, []);

  const joinGroup = useCallback((groupId: string, userId: string) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId && !group.members.includes(userId)
        ? { ...group, members: [...group.members, userId], memberCount: group.memberCount + 1 }
        : group
    ));
  }, []);

  const leaveGroup = useCallback((groupId: string, userId: string) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId && group.members.includes(userId)
        ? { ...group, members: group.members.filter(id => id !== userId), memberCount: group.memberCount - 1 }
        : group
    ));
  }, []);

  // Activity functions
  const addActivity = useCallback((activity: Omit<Activity, "id" | "createdAt">) => {
    const newActivity: Activity = {
      ...activity,
      id: `activity-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setActivities(prev => [newActivity, ...prev]);
  }, []);

  // Event functions
  const addEvent = useCallback((event: Omit<Event, "id" | "participants">) => {
    const newEvent: Event = {
      ...event,
      id: `event-${Date.now()}`,
      participants: [],
    };
    setEvents(prev => [newEvent, ...prev]);
  }, []);

  const rsvpEvent = useCallback((eventId: string, userId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId && !event.participants.includes(userId)
        ? { ...event, participants: [...event.participants, userId] }
        : event
    ));
  }, []);

  const cancelRSVP = useCallback((eventId: string, userId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId && event.participants.includes(userId)
        ? { ...event, participants: event.participants.filter(id => id !== userId) }
        : event
    ));
  }, []);

  const value = useMemo<CommunityContextValue>(() => ({
    posts,
    addPost,
    addReply,
    likePost,
    likeReply,
    groups,
    addGroup,
    joinGroup,
    leaveGroup,
    activities,
    addActivity,
    events,
    addEvent,
    rsvpEvent,
    cancelRSVP,
  }), [posts, groups, activities, events, addPost, addReply, likePost, likeReply, addGroup, joinGroup, leaveGroup, addActivity, addEvent, rsvpEvent, cancelRSVP]);

  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
};

