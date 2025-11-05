import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string; // data URL or remote URL
}

interface UserContextValue {
  user: UserProfile | null;
  isAuthenticated: boolean;
  signIn: (data: { name: string; email: string }) => void;
  signOut: () => void;
  updateAvatar: (file: File) => Promise<void>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useUser = (): UserContextValue => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};

const STORAGE_KEY = "gw_user";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  // restore
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, [user]);

  const signIn = useCallback((data: { name: string; email: string }) => {
    setUser({ id: crypto.randomUUID(), name: data.name, email: data.email });
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const updateAvatar = useCallback(async (file: File) => {
    const toDataUrl = (fileToRead: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(fileToRead);
      });
    const dataUrl = await toDataUrl(file);
    setUser(prev => (prev ? { ...prev, avatarUrl: dataUrl } : prev));
  }, []);

  const value = useMemo<UserContextValue>(
    () => ({ user, isAuthenticated: Boolean(user), signIn, signOut, updateAvatar }),
    [user, signIn, signOut, updateAvatar]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};


