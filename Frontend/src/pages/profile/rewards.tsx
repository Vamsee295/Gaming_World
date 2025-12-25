import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRewards } from "@/context/RewardsContext";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, CheckCircle2, XCircle, Home, ArrowLeft } from "lucide-react";

interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  image: string;
  alt: string;
}

const rewards: Reward[] = [
  {
    id: "aura",
    name: "Rare In-Game Aura",
    description: "A limited-time cosmetic item to show off your loyalty and dedication.",
    cost: 5000,
    image: "https://placehold.co/400x200/1E1E2D/E5E7EB?text=Rare+Aura",
    alt: "Rare Aura Item",
  },
  {
    id: "emote",
    name: "Exclusive Stream Emote",
    description: "Unlock a unique animated emote for all chat channels.",
    cost: 2500,
    image: "https://placehold.co/400x200/1E1E2D/E5E7EB?text=Exclusive+Emote",
    alt: "Exclusive Emote",
  },
  {
    id: "merch",
    name: "Signed Physical Merch",
    description: "A collector's item signed by the Epic Streamer.",
    cost: 20000,
    image: "https://placehold.co/400x200/1E1E2D/E5E7EB?text=Physical+Merch",
    alt: "Physical Merch",
  },
  {
    id: "vip",
    name: "Stream VIP Pass (1 Month)",
    description: "Gain priority chat access and special badges for a month.",
    cost: 10000,
    image: "https://placehold.co/400x200/1E1E2D/E5E7EB?text=VIP+Pass",
    alt: "VIP Pass",
  },
];

type ModalState = "confirm" | "success" | "error";

export default function RewardsPage() {
  const { user } = useUser();
  const { points, claimHistory, isLoading, claimReward } = useRewards();
  const { toast } = useToast();
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState<ModalState>("confirm");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sortedHistory = useMemo(() => {
    return [...claimHistory].sort((a, b) => b.claimedAt.getTime() - a.claimedAt.getTime());
  }, [claimHistory]);

  const openModal = (reward: Reward) => {
    if (!user) {
      toast({
        title: "Please sign in to claim rewards",
        variant: "destructive",
      });
      return;
    }

    setSelectedReward(reward);
    setModalState("confirm");
    setErrorMessage("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReward(null);
    setIsProcessing(false);
    setModalState("confirm");
    setErrorMessage("");
  };

  const handleClaim = async () => {
    if (!selectedReward) return;

    setIsProcessing(true);
    setModalState("confirm");

    try {
      await claimReward(selectedReward.name, selectedReward.cost);
      setModalState("success");
      toast({
        title: "Reward claimed successfully!",
        description: `You've claimed ${selectedReward.name}`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      setErrorMessage(
        message.includes("Insufficient")
          ? "You do not have enough points to claim this reward!"
          : message.includes("authenticated")
            ? "Please sign in to claim rewards"
            : "An unexpected error occurred. Please try again."
      );
      setModalState("error");
      toast({
        title: "Claim failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const canAfford = (cost: number) => points >= cost;
  const getButtonText = (reward: Reward) => {
    if (!canAfford(reward.cost)) {
      if (reward.id === "merch") {
        return `Need ${(reward.cost - points).toLocaleString()} Pts`;
      }
      return "Insufficient Pts";
    }
    return "Claim";
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Header */}
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight">
            Epic Rewards Center
          </h1>
        </header>

        {/* User ID Display */}
        {user && (
          <div className="mb-6 bg-secondary/40 p-3 rounded-lg text-sm text-muted-foreground">
            User ID: <span className="font-mono text-primary">{user.id}</span>
          </div>
        )}

        {/* Points Balance Display */}
        <div className="bg-primary/10 p-6 rounded-xl shadow-lg mb-12 border-l-4 border-primary">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-lg font-medium mb-2 sm:mb-0">Your Current Balance:</p>
            <div className="text-5xl font-extrabold text-primary flex items-center">
              <div>{points.toLocaleString()}</div>
              <span className="text-2xl font-semibold ml-2">Points</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Points earned through stream viewing and community engagement.
          </p>
        </div>

        {/* Rewards Catalog */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Rewards Catalog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rewards.map((reward) => {
              const affordable = canAfford(reward.cost);
              return (
                <Card
                  key={reward.id}
                  className={`transition-all duration-300 hover:border-primary ${!affordable ? "opacity-70" : ""
                    }`}
                >
                  <div className="relative w-full h-32 mb-4 rounded-t-lg overflow-hidden bg-secondary">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={reward.image}
                      alt={reward.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{reward.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-2xl font-bold ${affordable ? "text-teal-400" : "text-destructive"
                          }`}
                      >
                        {reward.cost.toLocaleString()} Pts
                      </span>
                      <Button
                        onClick={() => openModal(reward)}
                        disabled={!affordable || !user || isProcessing}
                        variant={affordable ? "default" : "outline"}
                        className={affordable ? "" : "cursor-not-allowed"}
                      >
                        {getButtonText(reward)}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Claim History */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Claim History</h2>
          <Card>
            <CardContent className="p-6">
              {sortedHistory.length === 0 ? (
                <p className="text-center text-muted-foreground">No claims recorded yet.</p>
              ) : (
                <ul className="space-y-4">
                  {sortedHistory.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center py-2 border-b border-border last:border-b-0"
                    >
                      <div>
                        <p className="font-semibold">{item.rewardName}</p>
                        <p className="text-xs text-muted-foreground">
                          Claimed on {item.claimedAt.toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-destructive">
                        - {item.cost.toLocaleString()} Pts
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Claim Confirmation Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            {modalState === "confirm" && selectedReward && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-extrabold">Confirm Claim</DialogTitle>
                  <DialogDescription>
                    You are about to claim:{" "}
                    <span className="font-bold text-primary">{selectedReward.name}</span>.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-lg font-medium mb-2">
                    This will cost{" "}
                    <span className="font-extrabold text-3xl text-destructive">
                      {selectedReward.cost.toLocaleString()}
                    </span>{" "}
                    Points.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={closeModal} disabled={isProcessing}>
                    Cancel
                  </Button>
                  <Button onClick={handleClaim} disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Confirm & Claim"
                    )}
                  </Button>
                </DialogFooter>
              </>
            )}

            {modalState === "success" && selectedReward && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-extrabold text-green-600 flex items-center gap-2">
                    <CheckCircle2 className="h-8 w-8" />
                    Claim Successful!
                  </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-lg mb-2">
                    You successfully claimed the{" "}
                    <span className="font-bold text-primary">{selectedReward.name}</span>.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your points have been updated!
                  </p>
                </div>
                <DialogFooter>
                  <Button onClick={closeModal}>Got It</Button>
                </DialogFooter>
              </>
            )}

            {modalState === "error" && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-extrabold text-destructive flex items-center gap-2">
                    <XCircle className="h-8 w-8" />
                    Claim Failed!
                  </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-lg">{errorMessage}</p>
                </div>
                <DialogFooter>
                  <Button onClick={closeModal}>Close</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
