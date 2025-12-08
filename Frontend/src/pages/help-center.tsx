import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, HelpCircle, Settings, Gamepad2, CreditCard, Ticket, ArrowLeft, MessageSquare, RefreshCw } from "lucide-react";

const faqCategories = [
    {
        id: "account",
        title: "Account & Login",
        icon: Settings,
        items: [
            {
                question: "Can't log in to my account?",
                answer: "If you're having trouble logging in, try resetting your password using the 'Forgot Password' link on the login page. Make sure you're using the correct email address associated with your account. If the issue persists, clear your browser cache and cookies, then try again."
            },
            {
                question: "How to change email or password?",
                answer: "Go to Settings > Account > Security. Click 'Change Email' or 'Change Password'. For email changes, you'll need to verify both your old and new email addresses. For password changes, you'll need your current password."
            },
            {
                question: "How do I enable two-factor authentication?",
                answer: "Navigate to Settings > Security > Two-Factor Authentication. Click 'Enable 2FA' and follow the setup wizard. You can use an authenticator app or receive codes via email."
            }
        ]
    },
    {
        id: "games",
        title: "Games & Installation",
        icon: Gamepad2,
        items: [
            {
                question: "Game not launching?",
                answer: "First, verify your game files by right-clicking the game in your library and selecting 'Verify Files'. Make sure your graphics drivers are up to date. Check if your system meets the minimum requirements. Try running the game as administrator."
            },
            {
                question: "Download stuck or slow?",
                answer: "Try pausing and resuming the download. Check your internet connection speed. Clear the download cache in Settings > Downloads > Clear Cache. If downloads are consistently slow, try changing your download region in Settings."
            },
            {
                question: "How to check system requirements?",
                answer: "Click on any game to view its detail page. Scroll down to the 'System Requirements' section where you'll find both minimum and recommended specs. You can also use our System Scanner tool in Settings to automatically check compatibility."
            }
        ]
    },
    {
        id: "payments",
        title: "Payments & Purchases",
        icon: CreditCard,
        items: [
            {
                question: "Payment failed but money was deducted?",
                answer: "Don't worry! If your payment failed but money was deducted, it's likely a pending authorization that will be automatically reversed by your bank within 3-7 business days. If the game didn't appear in your library after 24 hours, contact our support team with your transaction ID."
            },
            {
                question: "How to view purchase history?",
                answer: "Go to Account > Purchase History to see all your transactions. You can filter by date, amount, or payment method. Each transaction shows the date, items purchased, amount paid, and payment method used."
            },
            {
                question: "Can I use multiple payment methods?",
                answer: "Yes! You can save multiple credit/debit cards and choose which one to use at checkout. You can also combine wallet balance with a payment method to complete a purchase."
            }
        ]
    },
    {
        id: "codes",
        title: "Codes & Coupons",
        icon: Ticket,
        items: [
            {
                question: "How to redeem a game code?",
                answer: "Click on your profile icon > 'Redeem Code'. Enter the 16-character code (format: XXXX-XXXX-XXXX-XXXX) and click 'Redeem'. The game or credit will be added to your account immediately. Codes are case-insensitive."
            },
            {
                question: "Why is my coupon invalid?",
                answer: "Coupons may be invalid for several reasons: it may have expired, already been used, or doesn't apply to the items in your cart. Some coupons are game-specific or have minimum purchase requirements. Check the coupon details for restrictions."
            },
            {
                question: "Do coupons stack with sales?",
                answer: "This depends on the coupon. Most percentage-off coupons can be combined with sale prices, but some special promotional codes cannot. The coupon details will specify if it can be combined with other offers."
            }
        ]
    }
];

export default function HelpCenter() {
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const filteredCategories = faqCategories.map(category => ({
        ...category,
        items: category.items.filter(item =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.items.length > 0);

    return (
        <>
            <Head>
                <title>Help Center - GameVerse</title>
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
                            <h1 className="text-4xl font-bold mb-4 text-foreground">Help Center</h1>
                            <p className="text-xl text-muted-foreground mb-6">
                                Find answers to common questions and solve issues quickly
                            </p>

                            {/* Search Bar */}
                            <div className="relative max-w-2xl">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search issues: install, download, payments..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-12 text-lg"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* FAQ Categories */}
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {faqCategories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <Card
                                        className={`cursor-pointer transition-all ${expandedCategory === category.id ? "border-primary shadow-lg" : ""
                                            }`}
                                        onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                                    >
                                        <CardHeader>
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 rounded-lg bg-primary/10">
                                                    <Icon className="h-6 w-6 text-primary" />
                                                </div>
                                                <CardTitle className="text-lg">{category.title}</CardTitle>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* FAQ Items */}
                    <div className="max-w-4xl mx-auto">
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => {
                                const Icon = category.icon;
                                return (
                                    <motion.div
                                        key={category.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="mb-8"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <Icon className="h-6 w-6 text-primary" />
                                            <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                                        </div>
                                        <Accordion type="single" collapsible>
                                            {category.items.map((item, index) => (
                                                <AccordionItem key={index} value={`item-${category.id}-${index}`}>
                                                    <AccordionTrigger className="text-left hover:text-primary">
                                                        <div className="flex items-start gap-2">
                                                            <HelpCircle className="h-5 w-5 mt-1 flex-shrink-0 text-primary" />
                                                            <span>{item.question}</span>
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-muted-foreground pl-7">
                                                        {item.answer}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                                    <h3 className="text-xl font-semibold mb-2 text-foreground">No results found</h3>
                                    <p className="text-muted-foreground">
                                        Try different keywords or browse categories above
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Additional Help */}
                    <div className="max-w-4xl mx-auto mt-12">
                        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-6 w-6" />
                                    Still need help?
                                </CardTitle>
                                <CardDescription>
                                    Can't find what you're looking for? Our support team is here to help.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-4">
                                <Link href="/contact">
                                    <Button className="gap-2">
                                        <MessageSquare className="h-4 w-4" />
                                        Contact Us
                                    </Button>
                                </Link>
                                <Link href="/refund-policy">
                                    <Button variant="outline" className="gap-2">
                                        <RefreshCw className="h-4 w-4" />
                                        Refund Policy
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
