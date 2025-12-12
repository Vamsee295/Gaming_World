import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, Clock, RefreshCw, Package } from "lucide-react";
import { useUser } from "@/context/UserContext";

// Import game images with descriptive names
import cyberpunk2077 from "@/components/Images/Store Images/cyberpunk-2077.jpg";
import spiderman from "@/components/Images/Store Images/spiderman.jpg";
import gta6 from "@/components/Images/Store Images/gta-6.webp";
import needForSpeed from "@/components/Images/Store Images/need-for-speed.jpg";
import lastOfUs from "@/components/Images/Store Images/last-of-us.webp";
import detroit from "@/components/Images/Store Images/detroit-become-human.webp";
import aWayOut from "@/components/Images/Store Images/a-way-out.webp";
import blackMythWukong from "@/components/Images/Store Images/black-myth-wukong.webp";

const gameImages: { [key: number]: any } = {
    1: cyberpunk2077,
    2: spiderman,
    3: gta6,
    4: needForSpeed,
    5: lastOfUs,
    6: detroit,
    7: aWayOut,
    8: blackMythWukong,
};

interface Purchase {
    id: number;
    gameId: number;
    gameName: string;
    purchaseDate: string;
    amount: number;
    eligible: boolean;
    playTime: number; // in hours
    refundRequested?: boolean;
    refundStatus?: "pending" | "approved" | "rejected";
}

export default function PurchaseHistory() {
    const { user, isAuthenticated } = useUser();
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
    const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
    const [refundReason, setRefundReason] = useState("");
    const [refundComments, setRefundComments] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Simulate fetching purchase history
    useEffect(() => {
        if (user) {
            // Mock data - in real app, fetch from backend
            const mockPurchases: Purchase[] = [
                {
                    id: 1001,
                    gameId: 1,
                    gameName: "Cyberpunk 2077",
                    purchaseDate: "2025-12-01",
                    amount: 47.99,
                    eligible: true,
                    playTime: 1.5
                },
                {
                    id: 1002,
                    gameId: 2,
                    gameName: "Marvel's Spider-Man",
                    purchaseDate: "2025-11-20",
                    amount: 42.49,
                    eligible: false,
                    playTime: 15.2
                },
                {
                    id: 1003,
                    gameId: 4,
                    gameName: "Need For Speed",
                    purchaseDate: "2025-12-05",
                    amount: 41.99,
                    eligible: true,
                    playTime: 0.8
                },
                {
                    id: 1004,
                    gameId: 6,
                    gameName: "Detroit: Become Human",
                    purchaseDate: "2025-10-15",
                    amount: 33.74,
                    eligible: false,
                    playTime: 25.5,
                    refundRequested: true,
                    refundStatus: "rejected"
                },
                {
                    id: 1005,
                    gameId: 7,
                    gameName: "A Way Out",
                    purchaseDate: "2025-12-06",
                    amount: 29.99,
                    eligible: true,
                    playTime: 0.3,
                    refundRequested: true,
                    refundStatus: "pending"
                }
            ];
            setPurchases(mockPurchases);
        }
    }, [user]);

    const handleRequestRefund = (purchase: Purchase) => {
        setSelectedPurchase(purchase);
        setRefundReason("");
        setRefundComments("");
        setIsRefundDialogOpen(true);
    };

    const handleSubmitRefund = () => {
        if (!selectedPurchase || !refundReason) return;

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            // Update the purchase with refund request
            setPurchases(purchases.map(p =>
                p.id === selectedPurchase.id
                    ? { ...p, refundRequested: true, refundStatus: "pending" as const }
                    : p
            ));

            setIsSubmitting(false);
            setIsRefundDialogOpen(false);
            setIsSuccessDialogOpen(true);
        }, 1500);
    };

    const getEligibilityInfo = (purchase: Purchase) => {
        if (purchase.refundRequested) {
            if (purchase.refundStatus === "pending") {
                return {
                    icon: <Clock className="h-5 w-5" />,
                    text: "Refund Pending",
                    color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                };
            } else if (purchase.refundStatus === "approved") {
                return {
                    icon: <CheckCircle2 className="h-5 w-5" />,
                    text: "Refund Approved",
                    color: "bg-green-500/10 text-green-500 border-green-500/20"
                };
            } else {
                return {
                    icon: <XCircle className="h-5 w-5" />,
                    text: "Refund Rejected",
                    color: "bg-red-500/10 text-red-500 border-red-500/20"
                };
            }
        }

        if (purchase.eligible) {
            return {
                icon: <CheckCircle2 className="h-5 w-5" />,
                text: "Eligible for Refund",
                color: "bg-green-500/10 text-green-500 border-green-500/20"
            };
        }

        return {
            icon: <XCircle className="h-5 w-5" />,
            text: "Not Eligible",
            color: "bg-red-500/10 text-red-500 border-red-500/20"
        };
    };

    const getIneligibilityReason = (purchase: Purchase) => {
        const daysSincePurchase = Math.floor(
            (new Date().getTime() - new Date(purchase.purchaseDate).getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysSincePurchase > 14) {
            return "Purchase older than 14 days";
        }
        if (purchase.playTime > 2) {
            return `Playtime (${purchase.playTime.toFixed(1)}h) exceeds 2 hour limit`;
        }
        return "";
    };

    if (!isAuthenticated) {
        return (
            <>
                <Head>
                    <title>Purchase History - GameVerse</title>
                </Head>
                <div className="min-h-screen bg-background flex items-center justify-center">
                    <Card className="max-w-md w-full">
                        <CardHeader>
                            <CardTitle>Sign In Required</CardTitle>
                            <CardDescription>
                                You need to be signed in to view your purchase history.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/">
                                <Button className="w-full">Go to Home</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Purchase History - GameVerse</title>
            </Head>

            <div className="min-h-screen bg-background">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary/20 to-accent/20 border-b border-border">
                    <div className="container mx-auto px-4 py-8">
                        <Link href="/">
                            <Button variant="ghost" className="gap-2 mb-4">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Home
                            </Button>
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-4xl font-bold mb-4 text-foreground">Purchase History</h1>
                            <p className="text-xl text-muted-foreground">
                                View your orders and request refunds for eligible purchases
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Purchase List */}
                <div className="container mx-auto px-4 py-12">
                    {purchases.length === 0 ? (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                                <h3 className="text-xl font-semibold mb-2 text-foreground">No Purchases Yet</h3>
                                <p className="text-muted-foreground mb-6">
                                    You haven't made any purchases yet. Browse our store to get started!
                                </p>
                                <Link href="/">
                                    <Button>Browse Games</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            {purchases.map((purchase, index) => {
                                const eligibility = getEligibilityInfo(purchase);
                                const ineligibilityReason = getIneligibilityReason(purchase);

                                return (
                                    <motion.div
                                        key={purchase.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card>
                                            <CardContent className="p-6">
                                                <div className="flex flex-col md:flex-row gap-6">
                                                    {/* Game Image */}
                                                    <div className="relative w-full md:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={gameImages[purchase.gameId]}
                                                            alt={purchase.gameName}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>

                                                    {/* Purchase Details */}
                                                    <div className="flex-1 space-y-4">
                                                        <div>
                                                            <h3 className="text-2xl font-bold text-foreground mb-2">
                                                                {purchase.gameName}
                                                            </h3>
                                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                                <div>
                                                                    <span className="font-semibold">Order ID:</span> #{purchase.id}
                                                                </div>
                                                                <div>
                                                                    <span className="font-semibold">Purchase Date:</span>{" "}
                                                                    {new Date(purchase.purchaseDate).toLocaleDateString()}
                                                                </div>
                                                                <div>
                                                                    <span className="font-semibold">Amount Paid:</span> ${purchase.amount.toFixed(2)}
                                                                </div>
                                                                <div>
                                                                    <span className="font-semibold">Playtime:</span> {purchase.playTime.toFixed(1)}h
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Eligibility Status */}
                                                        <div className="flex items-center gap-3">
                                                            <Badge
                                                                variant="outline"
                                                                className={`px-3 py-1 flex items-center gap-2 ${eligibility.color}`}
                                                            >
                                                                {eligibility.icon}
                                                                {eligibility.text}
                                                            </Badge>
                                                            {!purchase.eligible && !purchase.refundRequested && (
                                                                <span className="text-sm text-muted-foreground">
                                                                    ({ineligibilityReason})
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Action Button */}
                                                        <div>
                                                            {purchase.refundRequested ? (
                                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                    <Clock className="h-4 w-4" />
                                                                    {purchase.refundStatus === "pending" && "Refund request is being reviewed"}
                                                                    {purchase.refundStatus === "approved" && "Refund has been processed"}
                                                                    {purchase.refundStatus === "rejected" && "Refund request was rejected"}
                                                                </div>
                                                            ) : purchase.eligible ? (
                                                                <Button
                                                                    onClick={() => handleRequestRefund(purchase)}
                                                                    className="gap-2"
                                                                >
                                                                    <RefreshCw className="h-4 w-4" />
                                                                    Request Refund
                                                                </Button>
                                                            ) : (
                                                                <Button variant="outline" disabled>
                                                                    Refund Not Available
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}

                    {/* Info Card */}
                    {purchases.length > 0 && (
                        <Card className="mt-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-lg">Refund Policy Reminder</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-2">
                                <p>• Refunds must be requested within <strong>14 days</strong> of purchase</p>
                                <p>• Playtime must be less than <strong>2 hours</strong></p>
                                <p>• Approved refunds take <strong>5-10 business days</strong> to process</p>
                                <Link href="/support/refund-policy" className="inline-block mt-2">
                                    <Button variant="link" className="p-0 h-auto">
                                        View Full Refund Policy →
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Refund Request Dialog */}
            <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Request Refund</DialogTitle>
                        <DialogDescription>
                            {selectedPurchase && (
                                <>
                                    Order #{selectedPurchase.id} - {selectedPurchase.gameName}
                                </>
                            )}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="reason">Reason for Refund *</Label>
                            <Select value={refundReason} onValueChange={setRefundReason}>
                                <SelectTrigger id="reason">
                                    <SelectValue placeholder="Select a reason" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="not-working">Game not working on my PC</SelectItem>
                                    <SelectItem value="performance">Poor performance/fps issues</SelectItem>
                                    <SelectItem value="not-expected">Not what I expected</SelectItem>
                                    <SelectItem value="technical">Technical issues</SelectItem>
                                    <SelectItem value="accidental">Accidental purchase</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="comments">Additional Comments (Optional)</Label>
                            <Textarea
                                id="comments"
                                value={refundComments}
                                onChange={(e) => setRefundComments(e.target.value)}
                                placeholder="Please provide any additional details..."
                                className="min-h-[100px]"
                            />
                        </div>

                        <div className="p-3 rounded-lg bg-muted text-sm text-muted-foreground">
                            <p className="font-semibold mb-1">Note:</p>
                            <p>Your refund request will be reviewed within 24-48 hours. If approved, the refund will be processed to your original payment method within 5-10 business days.</p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsRefundDialogOpen(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmitRefund}
                            disabled={!refundReason || isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Request"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Success Dialog */}
            <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
                <DialogContent className="sm:max-w-[450px]">
                    <div className="flex flex-col items-center text-center py-6">
                        <div className="mb-6 h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
                            <CheckCircle2 className="h-12 w-12 text-green-500" />
                        </div>
                        <DialogHeader className="space-y-3">
                            <DialogTitle className="text-2xl">Refund request submitted successfully!</DialogTitle>
                        </DialogHeader>
                        <div className="mt-6 w-full space-y-4">
                            <div className="p-4 rounded-lg bg-muted text-left">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Order #</span>
                                        <span className="font-semibold text-foreground">{selectedPurchase?.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Game:</span>
                                        <span className="font-semibold text-foreground">{selectedPurchase?.gameName}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Your request is being reviewed. You'll receive an email within 24-48 hours.
                            </p>
                        </div>
                        <DialogFooter className="mt-6 w-full">
                            <Button onClick={() => setIsSuccessDialogOpen(false)} className="w-full">
                                OK
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
