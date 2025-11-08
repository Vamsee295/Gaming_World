import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "./UserContext";

export interface ClaimHistoryItem {
  id: string;
  rewardName: string;
  cost: number;
  claimedAt: Date;
}

interface RewardsContextValue {
  points: number;
  claimHistory: ClaimHistoryItem[];
  isLoading: boolean;
  claimReward: (rewardName: string, cost: number) => Promise<void>;
  addPoints: (amount: number) => void;
}

const RewardsContext = createContext<RewardsContextValue | undefined>(undefined);

export const useRewards = (): RewardsContextValue => {
  const ctx = useContext(RewardsContext);
  if (!ctx) throw new Error("useRewards must be used within RewardsProvider");
  return ctx;
};

const STORAGE_KEY_POINTS = "gw_rewards_points";
const STORAGE_KEY_HISTORY = "gw_rewards_history";
const INITIAL_POINTS = 12500;

export const RewardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [points, setPoints] = useState<number>(INITIAL_POINTS);
  const [claimHistory, setClaimHistory] = useState<ClaimHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    try {
      const storedPoints = typeof window !== "undefined" 
        ? localStorage.getItem(`${STORAGE_KEY_POINTS}_${user.id}`) 
        : null;
      
      const storedHistory = typeof window !== "undefined"
        ? localStorage.getItem(`${STORAGE_KEY_HISTORY}_${user.id}`)
        : null;

      if (storedPoints) {
        setPoints(parseInt(storedPoints, 10));
      } else {
        // Initialize with default points for new user
        setPoints(INITIAL_POINTS);
        if (typeof window !== "undefined") {
          localStorage.setItem(`${STORAGE_KEY_POINTS}_${user.id}`, INITIAL_POINTS.toString());
        }
      }

      if (storedHistory) {
        const parsed = JSON.parse(storedHistory);
        setClaimHistory(
          parsed.map((item: any) => ({
            ...item,
            claimedAt: new Date(item.claimedAt),
          }))
        );
      }
    } catch (error) {
      console.error("Error loading rewards data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Persist points to localStorage
  useEffect(() => {
    if (user?.id && !isLoading) {
      try {
        localStorage.setItem(`${STORAGE_KEY_POINTS}_${user.id}`, points.toString());
      } catch (error) {
        console.error("Error saving points:", error);
      }
    }
  }, [points, user?.id, isLoading]);

  // Persist history to localStorage
  useEffect(() => {
    if (user?.id && !isLoading) {
      try {
        localStorage.setItem(
          `${STORAGE_KEY_HISTORY}_${user.id}`,
          JSON.stringify(claimHistory)
        );
      } catch (error) {
        console.error("Error saving history:", error);
      }
    }
  }, [claimHistory, user?.id, isLoading]);

  const claimReward = useCallback(
    async (rewardName: string, cost: number): Promise<void> => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      if (points < cost) {
        throw new Error("Insufficient Points");
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newPoints = points - cost;
      const newClaim: ClaimHistoryItem = {
        id: crypto.randomUUID(),
        rewardName,
        cost,
        claimedAt: new Date(),
      };

      setPoints(newPoints);
      setClaimHistory((prev) => [newClaim, ...prev]);
    },
    [points, user?.id]
  );

  const addPoints = useCallback((amount: number) => {
    setPoints((prev) => prev + amount);
  }, []);

  const value = useMemo<RewardsContextValue>(
    () => ({
      points,
      claimHistory,
      isLoading,
      claimReward,
      addPoints,
    }),
    [points, claimHistory, isLoading, claimReward, addPoints]
  );

  return <RewardsContext.Provider value={value}>{children}</RewardsContext.Provider>;
};

