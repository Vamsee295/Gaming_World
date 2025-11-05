import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export interface WishlistItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface WishlistContextValue {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: number) => void;
  clear: () => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export const useWishlist = (): WishlistContextValue => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const addItem = useCallback((item: WishlistItem) => {
    setItems(prev => (prev.some(i => i.id === item.id) ? prev : [...prev, item]));
  }, []);

  const removeItem = useCallback((id: number) => setItems(prev => prev.filter(i => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const totalItems = useMemo(() => items.length, [items]);

  const value = useMemo<WishlistContextValue>(() => ({ items, addItem, removeItem, clear, totalItems }), [items, addItem, removeItem, clear, totalItems]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};




