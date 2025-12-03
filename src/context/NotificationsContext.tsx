import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export type NotificationType = "friend_request" | "message" | "achievement" | "purchase" | "event" | "forum_reply" | "group_invite";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  relatedId?: string;
}

interface NotificationsContextValue {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string) => void;
  clearAll: () => void;
}

const NotificationsContext = createContext<NotificationsContextValue | undefined>(undefined);

export const useNotifications = (): NotificationsContextValue => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
};

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif-1",
      type: "friend_request",
      title: "New Friend Request",
      message: "GamerPro123 sent you a friend request",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      actionUrl: "/friends?tab=requests",
      relatedId: "req-1",
    },
    {
      id: "notif-2",
      type: "achievement",
      title: "Achievement Unlocked!",
      message: "You unlocked 'First Steps' in Cyberpunk 2077",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: false,
      actionUrl: "/achievements",
    },
    {
      id: "notif-3",
      type: "forum_reply",
      title: "New Reply",
      message: "Someone replied to your forum post",
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      read: true,
      actionUrl: "/community/forums",
    },
  ]);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notificationId ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const removeNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = useMemo<NotificationsContextValue>(
    () => ({
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAll,
    }),
    [notifications, unreadCount, addNotification, markAsRead, markAllAsRead, removeNotification, clearAll]
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};




