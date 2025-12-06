import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, CreditCard, Lock, Wallet, Gift } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";

// Import game images
import homeImg from "@/components/Images/Store Images/HOME SCREEN.jpg";
import spidermanHome from "@/components/Images/Store Images/SPIDERMAN HOMEPAGE.jpg";
import img3 from "@/components/Images/Store Images/image 3.webp";
import nfsHome from "@/components/Images/Store Images/NFS HOMESCREEN.jpg";
import img5 from "@/components/Images/Store Images/image 5.webp";
import img6 from "@/components/Images/Store Images/image 6.webp";
import img7 from "@/components/Images/Store Images/image 7.webp";
import img8 from "@/components/Images/Store Images/image 8.webp";

interface Game {
    id: number;
    title: string;
    price: number;
    image: any;
}

const gameImages: { [key: number]: any } = {
    1: homeImg,
    2: spidermanHome,
    3: img3,
    4: nfsHome,
    5: img5,
    6: img6,
    7: img7,
    8: img8,
};

const gameTitles: { [key: number]: string } = {
    1: "Cyberpunk 2077",
    2: "Marvel's Spiderman",
    3: "Grand Theft Auto 6",
    4: "Need For Speed",
    5: "The Last Of Us",
    6: "Detroit: Become Human",
    7: "A Way Out",
    8: "Black Myth Wukong",
};

const gamePrices: { [key: number]: number } = {
    1: 47.99,
    2: 42.49,
    3: 39.99,
    4: 41.99,
    5: 0.00,
    6: 33.74,
    7: 29.99,
    8: 0.00,
};

export default function TransactionPage() {
    const router = useRouter();
    const { gameId, mode, amount } = router.query;
    const { user, isAuthenticated } = useUser();
    const { items, clear } = useCart();

    // Check if wallet funding mode
    const isWalletMode = mode === "wallet";
    const fundingAmount = isWalletMode && amount ? parseFloat(amount as string) : 0;

    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [redeemCode, setRedeemCode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"card" | "redeem">("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Determine what to purchase: single game or cart items
    const [purchaseItems, setPurchaseItems] = useState<Game[]>([]);

    useEffect(() => {
        // Skip if wallet mode
        if (isWalletMode) return;

        if (gameId && typeof gameId === "string") {
            const gId = parseInt(gameId);
            if (gameImages[gId]) {
                setPurchaseItems([{
                    id: gId,
                    title: gameTitles[gId],
                    price: gamePrices[gId],
                    image: gameImages[gId],
                }]);
            }
        } else if (items && items.length > 0) {
            // Use cart items
            setPurchaseItems(items);
        }
    }, [gameId, items, isWalletMode]);

    // Calculate totals
    const subtotal = isWalletMode ? fundingAmount : purchaseItems.reduce((sum, item) => sum + item.price, 0);
    const tax = isWalletMode ? 0 : subtotal * 0.08; // No tax on wallet funding
    const total = subtotal + tax;

    // Format card number
    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\s/g, "");
        const chunks = cleaned.match(/.{1,4}/g);
        return chunks ? chunks.join(" ") : cleaned;
    };

    // Format expiry date
    const formatExpiryDate = (value: string) => {
        const cleaned = value.replace(/\D/g, "");
        if (cleaned.length >= 2) {
            return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
        }
        return cleaned;
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s/g, "");
        if (value.length <= 16 && /^\d*$/.test(value)) {
            setCardNumber(formatCardNumber(value));
            setErrors({ ...errors, cardNumber: "" });
        }
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 4) {
            setExpiryDate(formatExpiryDate(value));
            setErrors({ ...errors, expiryDate: "" });
        }
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 3 && /^\d*$/.test(value)) {
            setCvv(value);
            setErrors({ ...errors, cvv: "" });
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (paymentMethod === "card") {
            if (!cardHolder.trim()) {
                newErrors.cardHolder = "Cardholder name is required";
            }

            const cleanedCardNumber = cardNumber.replace(/\s/g, "");
            if (cleanedCardNumber.length !== 16) {
                newErrors.cardNumber = "Card number must be 16 digits";
            }

            if (expiryDate.length !== 5) {
                newErrors.expiryDate = "Expiry date must be MM/YY format";
            } else {
                const [month, year] = expiryDate.split("/");
                const monthNum = parseInt(month);
                if (monthNum < 1 || monthNum > 12) {
                    newErrors.expiryDate = "Invalid month";
                }
            }

            if (cvv.length !== 3) {
                newErrors.cvv = "CVV must be 3 digits";
            }
        } else if (paymentMethod === "redeem") {
            const cleanedCode = redeemCode.replace(/\s/g, "");
            if (cleanedCode.length !== 16) {
                newErrors.redeemCode = "Redeem code must be 16 characters";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePurchase = async () => {
        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);

            if (isWalletMode) {
                // Wallet funding success
                alert(`Successfully added $${fundingAmount.toFixed(2)} to your wallet!`);
                router.push("/balance");
            } else {
                // Game purchase success
                alert("Purchase successful! Thank you for your order.");

                // Clear cart if purchasing from cart
                if (!gameId && items.length > 0) {
                    clear();
                }

                // Redirect to library
                router.push("/library");
            }
        }, 2000);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6">
                        <h2 className="text-2xl font-bold mb-4 text-center text-foreground">Please Sign In</h2>
                        <p className="text-muted-foreground text-center mb-6">You need to be signed in to make a purchase.</p>
                        <Link href="/">
                            <Button className="w-full">Go to Home</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (purchaseItems.length === 0 && !isWalletMode) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6">
                        <h2 className="text-2xl font-bold mb-4 text-center text-foreground">No Items to Purchase</h2>
                        <p className="text-muted-foreground text-center mb-6">Your cart is empty or the game was not found.</p>
                        <Link href="/">
                            <Button className="w-full">Browse Games</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Checkout - GameVerse</title>
            </Head>

            <div className="min-h-screen bg-black py-8 px-4">
                {/* Back Button */}
                <div className="container mx-auto max-w-6xl mb-4">
                    <Link href="/">
                        <Button variant="ghost" className="gap-2">
                            <ChevronLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                </div>

                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl font-bold mb-8 text-foreground">{isWalletMode ? "Add Funds to Wallet" : "Checkout"}</h1>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Payment Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Card className="backdrop-blur-sm bg-gray-900/60 border border-gray-700/50 shadow-2xl">
                                    <CardContent className="p-8">
                                        <div className="mb-6">
                                            <h2 className="text-xl font-semibold mb-4 text-foreground">Payment Details</h2>

                                            {/* Payment Method Selection */}
                                            {isWalletMode && (
                                                <div className="mb-6">
                                                    <Label className="text-foreground mb-3 block">Payment Method</Label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => setPaymentMethod("card")}
                                                            className={`p-4 rounded-lg border-2 transition-all ${paymentMethod === "card"
                                                                ? "border-blue-500 bg-blue-500/10"
                                                                : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
                                                                }`}
                                                        >
                                                            <CreditCard className="h-6 w-6 mx-auto mb-2 text-foreground" />
                                                            <div className="text-sm font-medium text-foreground">Card</div>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setPaymentMethod("redeem")}
                                                            className={`p-4 rounded-lg border-2 transition-all ${paymentMethod === "redeem"
                                                                ? "border-blue-500 bg-blue-500/10"
                                                                : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
                                                                }`}
                                                        >
                                                            <Gift className="h-6 w-6 mx-auto mb-2 text-foreground" />
                                                            <div className="text-sm font-medium text-foreground">Redeem Code</div>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Conditional rendering based on payment method */}
                                            {paymentMethod === "card" ? (
                                                <>
                                                    {/* Credit Card Visual */}
                                                    <div className="relative h-48 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-6 mb-6 shadow-lg">
                                                        <div className="flex justify-between items-start mb-8">
                                                            <CreditCard className="h-10 w-10 text-white/90" />
                                                            <div className="flex gap-2">
                                                                <div className="h-8 w-8 rounded-full bg-white/30 backdrop-blur-sm" />
                                                                <div className="h-8 w-8 rounded-full bg-white/30 backdrop-blur-sm" />
                                                            </div>
                                                        </div>
                                                        <div className="text-white text-lg tracking-wider font-mono mb-4">
                                                            {cardNumber || "•••• •••• •••• ••••"}
                                                        </div>
                                                        <div className="flex justify-between items-end">
                                                            <div>
                                                                <div className="text-white/70 text-xs mb-1">Card Holder</div>
                                                                <div className="text-white font-medium">{cardHolder || "JOHN DOE"}</div>
                                                            </div>
                                                            <div>
                                                                <div className="text-white/70 text-xs mb-1">Expires</div>
                                                                <div className="text-white font-medium">{expiryDate || "MM/YY"}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    {/* Redeem Code Visual */}
                                                    <div className="relative h-48 rounded-2xl bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 p-6 mb-6 shadow-lg flex flex-col justify-center items-center">
                                                        <Gift className="h-16 w-16 text-white/90 mb-4" />
                                                        <div className="text-white text-lg tracking-wider font-mono">
                                                            {redeemCode || "XXXX-XXXX-XXXX-XXXX"}
                                                        </div>
                                                        <div className="text-white/70 text-xs mt-2">Enter your gift card or redeem code</div>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Form Fields */}
                                        <div className="space-y-4">
                                            {paymentMethod === "card" ? (
                                                <>
                                                    <div>
                                                        <Label htmlFor="cardHolder" className="text-foreground">Cardholder Name</Label>
                                                        <Input
                                                            id="cardHolder"
                                                            placeholder="John Doe"
                                                            value={cardHolder}
                                                            onChange={(e) => {
                                                                setCardHolder(e.target.value);
                                                                setErrors({ ...errors, cardHolder: "" });
                                                            }}
                                                            className={`mt-1 ${errors.cardHolder ? "border-red-500" : ""}`}
                                                        />
                                                        {errors.cardHolder && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="cardNumber" className="text-foreground">Card Number</Label>
                                                        <Input
                                                            id="cardNumber"
                                                            placeholder="1234 5678 9012 3456"
                                                            value={cardNumber}
                                                            onChange={handleCardNumberChange}
                                                            className={`mt-1 ${errors.cardNumber ? "border-red-500" : ""}`}
                                                            maxLength={19}
                                                        />
                                                        {errors.cardNumber && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <Label htmlFor="expiryDate" className="text-foreground">Exp Date</Label>
                                                            <Input
                                                                id="expiryDate"
                                                                placeholder="MM/YY"
                                                                value={expiryDate}
                                                                onChange={handleExpiryChange}
                                                                className={`mt-1 ${errors.expiryDate ? "border-red-500" : ""}`}
                                                                maxLength={5}
                                                            />
                                                            {errors.expiryDate && (
                                                                <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="cvv" className="text-foreground">CVV</Label>
                                                            <Input
                                                                id="cvv"
                                                                placeholder="123"
                                                                type="password"
                                                                value={cvv}
                                                                onChange={handleCvvChange}
                                                                className={`mt-1 ${errors.cvv ? "border-red-500" : ""}`}
                                                                maxLength={3}
                                                            />
                                                            {errors.cvv && (
                                                                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <Label htmlFor="redeemCode" className="text-foreground">Redeem Code</Label>
                                                        <Input
                                                            id="redeemCode"
                                                            placeholder="XXXX-XXXX-XXXX-XXXX"
                                                            value={redeemCode}
                                                            onChange={(e) => {
                                                                const value = e.target.value.replace(/[^A-Z0-9]/g, "").toUpperCase();
                                                                if (value.length <= 16) {
                                                                    const formatted = value.match(/.{1,4}/g)?.join("-") || value;
                                                                    setRedeemCode(formatted);
                                                                    setErrors({ ...errors, redeemCode: "" });
                                                                }
                                                            }}
                                                            className={`mt-1 ${errors.redeemCode ? "border-red-500" : ""}`}
                                                            maxLength={19}
                                                        />
                                                        {errors.redeemCode && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.redeemCode}</p>
                                                        )}
                                                        <p className="text-xs text-muted-foreground mt-2">
                                                            Enter the 16-character code from your gift card
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Order Summary */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <Card className="backdrop-blur-sm bg-gray-900/60 border border-gray-700/50 shadow-2xl">
                                    <CardContent className="p-8">
                                        <h2 className="text-xl font-semibold mb-4 text-foreground">{isWalletMode ? "Funding Summary" : "Order Summary"}</h2>

                                        {isWalletMode ? (
                                            <div className="space-y-4 mb-6">
                                                <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                                                    <Wallet className="h-12 w-12 text-blue-400" />
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-foreground">Add Funds to Wallet</h3>
                                                        <p className="text-sm text-muted-foreground">Instant wallet top-up</p>
                                                        <p className="text-xl font-bold text-foreground mt-2">
                                                            ${fundingAmount.toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-4 mb-6">
                                                {purchaseItems.map((item) => (
                                                    <div key={item.id} className="flex gap-4">
                                                        <div className="relative h-20 w-32 rounded-lg overflow-hidden flex-shrink-0">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-foreground">{item.title}</h3>
                                                            <p className="text-sm text-muted-foreground">Digital Download</p>
                                                            <p className="text-sm font-semibold text-foreground mt-1">
                                                                ${item.price.toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="border-t border-border pt-4 space-y-2">
                                            <div className="flex justify-between text-muted-foreground">
                                                <span>{isWalletMode ? "Amount" : "Subtotal"}</span>
                                                <span>${subtotal.toFixed(2)}</span>
                                            </div>
                                            {!isWalletMode && (
                                                <div className="flex justify-between text-muted-foreground">
                                                    <span>Tax (8%)</span>
                                                    <span>${tax.toFixed(2)}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between text-xl font-bold text-foreground pt-2 border-t border-border">
                                                <span>Total</span>
                                                <span>${total.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handlePurchase}
                                            disabled={isProcessing}
                                            className="w-full mt-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-semibold py-6 text-lg shadow-lg"
                                        >
                                            {isProcessing ? (
                                                <span className="flex items-center gap-2">
                                                    Processing...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <Lock className="h-5 w-5" />
                                                    {isWalletMode ? `Add $${total.toFixed(2)} to Wallet` : "Complete Purchase"}
                                                </span>
                                            )}
                                        </Button>

                                        <p className="text-xs text-muted-foreground text-center mt-4">
                                            Your payment information is secure and encrypted
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
