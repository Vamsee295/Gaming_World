import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Home,
    ArrowLeft,
    Gift,
    CheckCircle2,
    AlertCircle,
    Sparkles,
    Clock,
    Tag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RedemptionHistory {
    id: string;
    code: string;
    reward: string;
    date: string;
    value: string;
}

// Mock redemption history
const mockHistory: RedemptionHistory[] = [
    {
        id: "1",
        code: "WINTER2024",
        reward: "Free Game - Horizon Zero Dawn",
        date: "2024-12-15",
        value: "₹2,999"
    },
    {
        id: "2",
        code: "BONUS500",
        reward: "₹500 Wallet Credit",
        date: "2024-11-28",
        value: "₹500"
    },
];

// Mock valid codes database
const validCodes: Record<string, { reward: string; value: string; type: "game" | "credit" | "dlc" }> = {
    "WELCOME2025": { reward: "₹1,000 Wallet Credit", value: "₹1,000", type: "credit" },
    "FREEGAME": { reward: "Random Free Game", value: "₹1,500", type: "game" },
    "DLCPASS": { reward: "Season Pass DLC", value: "₹899", type: "dlc" },
    "NEWYEAR": { reward: "₹2,000 Store Credit", value: "₹2,000", type: "credit" },
};

export default function RedeemCodePage() {
    const [code, setCode] = useState("");
    const [isValidating, setIsValidating] = useState(false);
    const [validationError, setValidationError] = useState("");
    const [previewReward, setPreviewReward] = useState<typeof validCodes[string] | null>(null);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [redeemedReward, setRedeemedReward] = useState<typeof validCodes[string] | null>(null);
    const [history, setHistory] = useState<RedemptionHistory[]>(mockHistory);

    const validateCode = () => {
        setIsValidating(true);
        setValidationError("");
        setPreviewReward(null);

        // Simulate API validation
        setTimeout(() => {
            const upperCode = code.toUpperCase().trim();

            if (upperCode.length < 6) {
                setValidationError("Code must be at least 6 characters");
                setIsValidating(false);
                return;
            }

            if (validCodes[upperCode]) {
                setPreviewReward(validCodes[upperCode]);
                setValidationError("");
            } else {
                setValidationError("Invalid code. Please check and try again.");
            }

            setIsValidating(false);
        }, 800);
    };

    const handleRedeem = () => {
        if (!previewReward) return;

        const upperCode = code.toUpperCase().trim();

        // Add to history
        const newHistoryItem: RedemptionHistory = {
            id: Date.now().toString(),
            code: upperCode,
            reward: previewReward.reward,
            date: new Date().toISOString().split("T")[0],
            value: previewReward.value,
        };

        setHistory([newHistoryItem, ...history]);
        setRedeemedReward(previewReward);
        setIsSuccessModalOpen(true);

        // Reset form
        setCode("");
        setPreviewReward(null);
        setValidationError("");
    };

    const getRewardTypeIcon = (type: string) => {
        switch (type) {
            case "game":
                return "🎮";
            case "credit":
                return "💰";
            case "dlc":
                return "🎁";
            default:
                return "✨";
        }
    };

    return (
        <>
            <Head>
                <title>Redeem Code - GameVerse</title>
            </Head>

            <div className="min-h-screen p-4 md:p-8 bg-background">
                <div className="max-w-5xl mx-auto">
                    {/* Navigation */}
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
                    <header className="mb-10 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Gift className="h-12 w-12 text-primary" />
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                Redeem Your Code
                            </h1>
                        </div>
                        <p className="text-xl text-muted-foreground">
                            Enter your code below to unlock rewards, games, or credits
                        </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Redemption Card */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-2 border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Tag className="h-5 w-5" />
                                        Enter Redemption Code
                                    </CardTitle>
                                    <CardDescription>
                                        Codes are case-insensitive and can contain letters and numbers
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Code Input */}
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="Enter code (e.g., WELCOME2025)"
                                            value={code}
                                            onChange={(e) => {
                                                setCode(e.target.value.toUpperCase());
                                                setValidationError("");
                                                setPreviewReward(null);
                                            }}
                                            onKeyDown={(e) => e.key === "Enter" && validateCode()}
                                            className="text-lg font-mono tracking-wider"
                                            maxLength={20}
                                        />
                                        {validationError && (
                                            <div className="flex items-center gap-2 text-sm text-destructive">
                                                <AlertCircle className="h-4 w-4" />
                                                {validationError}
                                            </div>
                                        )}
                                    </div>

                                    {/* Validate Button */}
                                    <Button
                                        onClick={validateCode}
                                        disabled={code.length < 6 || isValidating}
                                        className="w-full"
                                        size="lg"
                                    >
                                        {isValidating ? "Validating..." : "Validate Code"}
                                    </Button>

                                    <Separator />

                                    {/* Preview Section */}
                                    <AnimatePresence>
                                        {previewReward && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="space-y-4"
                                            >
                                                <div className="flex items-center gap-2 text-emerald-600">
                                                    <CheckCircle2 className="h-5 w-5" />
                                                    <span className="font-semibold">Valid Code!</span>
                                                </div>

                                                <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary">
                                                    <CardContent className="p-6">
                                                        <div className="flex items-start gap-4">
                                                            <div className="text-5xl">{getRewardTypeIcon(previewReward.type)}</div>
                                                            <div className="flex-1">
                                                                <h3 className="text-xl font-bold mb-1">Your Reward</h3>
                                                                <p className="text-lg text-muted-foreground mb-2">
                                                                    {previewReward.reward}
                                                                </p>
                                                                <Badge className="text-sm">
                                                                    Value: {previewReward.value}
                                                                </Badge>
                                                            </div>
                                                        </div>

                                                        <Button
                                                            onClick={handleRedeem}
                                                            className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                                                            size="lg"
                                                        >
                                                            <Sparkles className="h-4 w-4 mr-2" />
                                                            Redeem Now
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </CardContent>
                            </Card>

                            {/* Redemption History */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        Redemption History
                                    </CardTitle>
                                    <CardDescription>
                                        Your previously redeemed codes
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {history.length === 0 ? (
                                        <p className="text-center text-muted-foreground py-8">
                                            No redemptions yet. Enter a code to get started!
                                        </p>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Code</TableHead>
                                                        <TableHead>Reward</TableHead>
                                                        <TableHead>Date</TableHead>
                                                        <TableHead className="text-right">Value</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {history.map((item) => (
                                                        <TableRow key={item.id}>
                                                            <TableCell className="font-mono">{item.code}</TableCell>
                                                            <TableCell>{item.reward}</TableCell>
                                                            <TableCell className="text-muted-foreground">{item.date}</TableCell>
                                                            <TableCell className="text-right font-semibold text-emerald-600">
                                                                {item.value}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar - Code Examples */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-4">
                                <CardHeader>
                                    <CardTitle className="text-lg">Try These Codes</CardTitle>
                                    <CardDescription className="text-xs">
                                        Test codes for demo purposes
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {Object.entries(validCodes).map(([codeText, details]) => (
                                        <Card
                                            key={codeText}
                                            className="cursor-pointer hover:border-primary transition-colors"
                                            onClick={() => setCode(codeText)}
                                        >
                                            <CardContent className="p-3">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-2xl">{getRewardTypeIcon(details.type)}</span>
                                                    <code className="text-sm font-mono font-bold">{codeText}</code>
                                                </div>
                                                <p className="text-xs text-muted-foreground">{details.reward}</p>
                                            </CardContent>
                                        </Card>
                                    ))}

                                    <Separator className="my-4" />

                                    <div className="text-xs text-muted-foreground space-y-2">
                                        <p className="font-semibold">Where to find codes:</p>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Email newsletters</li>
                                            <li>Social media promotions</li>
                                            <li>Partner websites</li>
                                            <li>In-game achievements</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal with Animation */}
            <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <div className="flex justify-center mb-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.5 }}
                            >
                                <CheckCircle2 className="h-20 w-20 text-emerald-500" />
                            </motion.div>
                        </div>
                        <DialogTitle className="text-2xl font-bold text-center">
                            🎉 Success!
                        </DialogTitle>
                        {redeemedReward && (
                            <DialogDescription className="text-center space-y-3">
                                <p className="text-lg">
                                    You've redeemed:{" "}
                                    <span className="font-bold text-foreground">
                                        {redeemedReward.reward}
                                    </span>
                                </p>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full"
                                >
                                    <Sparkles className="h-4 w-4 text-emerald-500" />
                                    <span className="text-sm font-medium">
                                        Value: {redeemedReward.value}
                                    </span>
                                </motion.div>
                            </DialogDescription>
                        )}
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={() => setIsSuccessModalOpen(false)}
                            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                        >
                            Awesome!
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
