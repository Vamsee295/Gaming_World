import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2, Home, ArrowLeft } from "lucide-react";

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
  },
  {
    id: 2,
    code: "STREAMVIP",
    discount: "Free DLC with any New Title",
    expiry: "2026-06-01",
    conditions: "Exclusive for Stream VIP members.",
    status: "Active",
    history: [{ game: "Battlefield 2042", date: "2025-05-10", saved: 999 }],
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
  },
  {
    id: 4,
    code: "PREORDER25",
    discount: "25% Off Upcoming Title X",
    expiry: "2027-10-20",
    conditions: "Available on Q4 2026.",
    status: "Upcoming",
    history: [],
  },
  {
    id: 5,
    code: "NEWMEMBER",
    discount: "Free Trial of Game Pass",
    expiry: "2026-11-20",
    conditions: "First-time users only.",
    status: "Active",
    history: [],
  },
  {
    id: 6,
    code: "LEGACYUSER",
    discount: "₹500 Credit on Next Game",
    expiry: "2025-01-08",
    conditions: "Thanks for being with us for 5+ years!",
    status: "Active",
    history: [],
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

interface CouponCardProps {
  coupon: Coupon;
  onRedeem: (coupon: Coupon) => void;
}

function CouponCard({ coupon, onRedeem }: CouponCardProps) {
  const statusInfo = getStatusInfo(coupon.status);
  const isRedeemable = coupon.status === "Active";

  return (
    <Card className="flex flex-col justify-between hover:shadow-lg transition-all duration-300 border-border">
      <CardContent className="p-6">
        {/* Status Badge */}
        <Badge className={`${statusInfo.className} mb-3 text-xs font-bold`}>
          {statusInfo.icon} {statusInfo.text}
        </Badge>

        {/* Coupon Code */}
        <h2 className="text-3xl font-mono tracking-wider text-primary bg-secondary p-3 rounded-lg mb-4 select-all">
          {coupon.code}
        </h2>

        {/* Discount Details */}
        <p className="text-xl font-bold mb-2">{coupon.discount}</p>

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
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-10 tracking-tight">
          Coupons & Offers
        </h1>

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
                {activeCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} onRedeem={handleRedeem} />
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
