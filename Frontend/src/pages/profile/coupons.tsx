import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2, Home, ArrowLeft, Clock, Filter, Star } from "lucide-react";

interface CouponHistoryItem {
  game: string;
  date: string;
  saved: number;
}

interface Coupon {
  id: number;
  code: string;
  discount: string;
  expiry: string;
  conditions: string;
  status: "Active" | "Expired" | "Upcoming";
  history: CouponHistoryItem[];
  category?: "Games" | "Store" | "DLC"; // Phase 2 Enhancement
  discountValue?: number; // Phase 2 Enhancement for sorting
}

const initialCoupons: Coupon[] = [
  {
    id: 1,
    code: "EPIC15OFF",
    discount: "15% Off Total Purchase",
    expiry: "2026-12-31",
    conditions: "Valid for orders above ₹500.",
    status: "Active",
    history: [],
    category: "Store",
    discountValue: 15,
  },
  {
    id: 2,
    code: "STREAMVIP",
    discount: "Free DLC with any New Title",
    expiry: "2026-06-01",
    conditions: "Exclusive for Stream VIP members.",
    status: "Active",
    history: [{ game: "Battlefield 2042", date: "2025-05-10", saved: 999 }],
    category: "DLC",
    discountValue: 0,
  },
  {
    id: 3,
    code: "SAVE10AUG",
    discount: "10% Off Cyberpunk 2077",
    expiry: "2024-08-15",
    conditions: "Expired: Limited time offer.",
    status: "Expired",
    history: [
      { game: "The Witcher 3", date: "2024-08-10", saved: 150 },
      { game: "Cyberpunk 2077", date: "2024-08-01", saved: 50 },
    ],
    category: "Games",
    discountValue: 10,
  },
  {
    id: 4,
    code: "PREORDER25",
    discount: "25% Off Upcoming Title X",
    expiry: "2027-10-20",
    conditions: "Available on Q4 2026.",
    status: "Upcoming",
    history: [],
    category: "Games",
    discountValue: 25,
  },
  {
    id: 5,
    code: "NEWMEMBER",
    discount: "Free Trial of Game Pass",
    expiry: "2026-11-20",
    conditions: "First-time users only.",
    status: "Active",
    history: [],
    category: "Store",
    discountValue: 0,
  },
  {
    id: 6,
    code: "LEGACYUSER",
    discount: "₹500 Credit on Next Game",
    expiry: "2025-01-08",
    conditions: "Thanks for being with us for 5+ years!",
    status: "Active",
    history: [],
    category: "Games",
    discountValue: 500,
  },
];

function getStatusInfo(status: Coupon["status"]) {
  switch (status) {
    case "Active":
      return {
        text: "Active",
        icon: "🟢",
        className: "bg-green-500 text-white",
      };
    case "Expired":
      return {
        text: "Expired",
        icon: "🔴",
        className: "bg-destructive text-destructive-foreground",
      };
    case "Upcoming":
      return {
        text: "Upcoming",
        icon: "🕓",
        className: "bg-yellow-500 text-gray-900",
      };
    default:
      return {
        text: "Unknown",
        icon: "⚫",
        className: "bg-muted text-muted-foreground",
      };
  }
}

// Phase 2: Calculate countdown from expiry date
function useCountdown(expiryDate: string) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(expiryDate).getTime();
      const distance = target - now;

      if (distance < 0) {
        setCountdown("Expired");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setCountdown(`${days}d ${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return countdown;
}

interface CouponCardProps {
  coupon: Coupon;
  onRedeem: (coupon: Coupon) => void;
  isBestDeal?: boolean; // Phase 2 Enhancement
}

function CouponCard({ coupon, onRedeem, isBestDeal }: CouponCardProps) {
  const statusInfo = getStatusInfo(coupon.status);
  const isRedeemable = coupon.status === "Active";
  const countdown = useCountdown(coupon.expiry); // Phase 2 Enhancement

  return (
    <Card className="flex flex-col justify-between hover:shadow-lg transition-all duration-300 border-border">
      <CardContent className="p-6">
        {/* Status Badge */}
        <Badge className={`${statusInfo.className} mb-3 text-xs font-bold`}>
          {statusInfo.icon} {statusInfo.text}
        </Badge>

        {/* Phase 2: Best Deal Badge */}
        {isBestDeal && (
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white mb-3 text-xs font-bold ml-2">
            <Star className="h-3 w-3 mr-1" /> BEST DEAL
          </Badge>
        )}

        {/* Coupon Code */}
        <h2 className="text-3xl font-mono tracking-wider text-primary bg-secondary p-3 rounded-lg mb-4 select-all">
          {coupon.code}
        </h2>

        {/* Discount Details */}
        <p className="text-xl font-bold mb-2">{coupon.discount}</p>

        {/* Phase 2: Countdown Timer */}
        {isRedeemable && countdown !== "Expired" && (
          <div className="flex items-center gap-2 mb-2 bg-primary/10 p-2 rounded">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Expires in: {countdown}
            </span>
          </div>
        )}

        {/* Expiry Date */}
        <p className="text-sm text-muted-foreground">
          Expires: <span className="font-medium">{coupon.expiry}</span>
        </p>

        {/* Conditions */}
        <p className="text-sm text-muted-foreground mt-2 italic border-l-2 border-border pl-3">
          {coupon.conditions}
        </p>

        {/* History */}
        {coupon.history.length > 0 ? (
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">Usage History:</p>
            <ul className="space-y-1">
              {coupon.history.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between text-xs text-muted-foreground border-b border-border py-1"
                >
                  <span>
                    Used on <strong>{item.game}</strong>
                  </span>
                  <span>
                    Saved: <strong>₹{item.saved.toLocaleString()}</strong> ({item.date})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic mt-4">
            No usage history found for this coupon.
          </p>
        )}

        {/* Action Button */}
        <div className="mt-6">
          <Button
            onClick={() => onRedeem(coupon)}
            disabled={!isRedeemable}
            className={`w-full ${isRedeemable
              ? "bg-primary hover:bg-primary/90 text-primary-foreground"
              : "cursor-not-allowed"
              }`}
          >
            {isRedeemable ? "Redeem / Apply Now" : statusInfo.text}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    code: string;
    amountSaved: number;
    gameApplied: string;
  } | null>(null);

  // Phase 2: Filter and sort states
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("expiry");

  const activeCoupons = useMemo(
    () => coupons.filter((c) => c.status === "Active"),
    [coupons]
  );
  const expiredCoupons = useMemo(
    () => coupons.filter((c) => c.status === "Expired"),
    [coupons]
  );
  const upcomingCoupons = useMemo(
    () => coupons.filter((c) => c.status === "Upcoming"),
    [coupons]
  );

  // Phase 2: Filter and sort active coupons
  const filteredAndSortedActiveCoupons = useMemo(() => {
    let filtered = activeCoupons;

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(c => c.category?.toLowerCase() === categoryFilter.toLowerCase());
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "expiry") {
        return new Date(a.expiry).getTime() - new Date(b.expiry).getTime();
      } else if (sortBy === "discount") {
        return (b.discountValue || 0) - (a.discountValue || 0);
      }
      return 0;
    });

    return sorted;
  }, [activeCoupons, categoryFilter, sortBy]);

  // Phase 2: Find best deal
  const bestDealId = useMemo(() => {
    if (filteredAndSortedActiveCoupons.length === 0) return null;
    const best = [...filteredAndSortedActiveCoupons].sort(
      (a, b) => (b.discountValue || 0) - (a.discountValue || 0)
    )[0];
    return best?.id;
  }, [filteredAndSortedActiveCoupons]);

  const handleRedeem = (coupon: Coupon) => {
    // Mock successful application
    const gameApplied = "Shadowlands: The Rebirth";
    const amountSaved = Math.floor(Math.random() * 500) + 50;

    // Update coupon history
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === coupon.id
          ? {
            ...c,
            history: [
              ...c.history,
              {
                game: gameApplied,
                date: new Date().toISOString().split("T")[0],
                saved: amountSaved,
              },
            ],
          }
          : c
      )
    );

    setModalData({
      code: coupon.code,
      amountSaved,
      gameApplied,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto border-2 border-border rounded-xl p-4 md:p-10 bg-card">
        {/* Navigation Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Header */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-10 tracking-tight">
          Coupons & Offers
        </h1>

        {/* Phase 2: Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="games">Games Only</SelectItem>
                <SelectItem value="store">Store Offers</SelectItem>
                <SelectItem value="dlc">DLC Deals</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expiry">Expiry Date</SelectItem>
                <SelectItem value="discount">Best Discount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="Active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="Active">Active</TabsTrigger>
            <TabsTrigger value="Expired">Expired</TabsTrigger>
            <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
          </TabsList>

          {/* Active Coupons */}
          <TabsContent value="Active" className="m-0">
            {activeCoupons.length === 0 ? (
              <Card>
                <CardContent className="p-10 text-center">
                  <p className="text-2xl font-semibold text-muted-foreground mb-2">
                    No Active Coupons
                  </p>
                  <p className="text-muted-foreground">
                    Check back later for new offers, or switch to another category.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredAndSortedActiveCoupons.map((coupon) => (
                  <CouponCard
                    key={coupon.id}
                    coupon={coupon}
                    onRedeem={handleRedeem}
                    isBestDeal={coupon.id === bestDealId}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Expired Coupons */}
          <TabsContent value="Expired" className="m-0">
            {expiredCoupons.length === 0 ? (
              <Card>
                <CardContent className="p-10 text-center">
                  <p className="text-2xl font-semibold text-muted-foreground mb-2">
                    No Expired Coupons
                  </p>
                  <p className="text-muted-foreground">
                    Check back later for new offers, or switch to another category.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {expiredCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} onRedeem={handleRedeem} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Upcoming Coupons */}
          <TabsContent value="Upcoming" className="m-0">
            {upcomingCoupons.length === 0 ? (
              <Card>
                <CardContent className="p-10 text-center">
                  <p className="text-2xl font-semibold text-muted-foreground mb-2">
                    No Upcoming Coupons
                  </p>
                  <p className="text-muted-foreground">
                    Check back later for new offers, or switch to another category.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} onRedeem={handleRedeem} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Redemption Confirmation Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-primary" />
              </div>
              <DialogTitle className="text-2xl font-bold text-center">Success!</DialogTitle>
              {modalData && (
                <DialogDescription className="text-center mt-2">
                  <p>
                    Coupon <strong>{modalData.code}</strong> applied successfully!
                  </p>
                  <p className="mt-2">
                    You saved <strong>₹{modalData.amountSaved.toLocaleString()}</strong> on your
                    purchase of <strong>{modalData.gameApplied}</strong>.
                  </p>
                </DialogDescription>
              )}
            </DialogHeader>
            <DialogFooter>
              <Button onClick={closeModal} className="w-full bg-primary hover:bg-primary/90">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
