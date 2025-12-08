import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Mail, Clock, CheckCircle2, Send } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function ContactUs() {
    const { user, isAuthenticated } = useUser();
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        subject: "",
        game: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [ticketId, setTicketId] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate submission
        setTimeout(() => {
            const generatedTicketId = `TKT-${Date.now().toString().slice(-8)}`;
            setTicketId(generatedTicketId);
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    const resetForm = () => {
        setIsSubmitted(false);
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            subject: "",
            game: "",
            message: ""
        });
    };

    if (isSubmitted) {
        return (
            <>
                <Head>
                    <title>Contact Us - GameVerse</title>
                </Head>

                <div className="min-h-screen bg-background flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="max-w-md w-full text-center">
                            <CardHeader>
                                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                                </div>
                                <CardTitle>Message Sent Successfully!</CardTitle>
                                <CardDescription>
                                    Your support request has been submitted
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="p-4 rounded-lg bg-muted">
                                    <p className="text-sm text-muted-foreground mb-2">Ticket ID</p>
                                    <p className="text-2xl font-bold text-foreground font-mono">{ticketId}</p>
                                </div>

                                <div className="text-left space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        We'll contact you at: <span className="font-semibold text-foreground">{formData.email}</span>
                                    </p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        Expected response time: <span className="font-semibold text-foreground">24-48 hours</span>
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <Link href="/" className="flex-1">
                                        <Button variant="outline" className="w-full">
                                            Back to Home
                                        </Button>
                                    </Link>
                                    <Button onClick={resetForm} className="flex-1">
                                        Submit Another
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Contact Us - GameVerse</title>
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
                            <h1 className="text-4xl font-bold mb-4 text-foreground">Contact Us</h1>
                            <p className="text-xl text-muted-foreground">
                                Need help? Send us a message and our team will get back to you.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Mail className="h-5 w-5" />
                                        Email Support
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        You can also reach us directly at:
                                    </p>
                                    <a href="mailto:support@gameverse.com" className="text-primary font-semibold hover:underline">
                                        support@gameverse.com
                                    </a>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        Response Time
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        We typically respond within <span className="font-semibold text-foreground">24-48 hours</span> during business days.
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        For urgent issues, please include "URGENT" in your subject line.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                                <CardHeader>
                                    <CardTitle className="text-sm">Quick Links</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Link href="/help-center">
                                        <Button variant="ghost" className="w-full justify-start" size="sm">
                                            → Visit Help Center
                                        </Button>
                                    </Link>
                                    <Link href="/refund-policy">
                                        <Button variant="ghost" className="w-full justify-start" size="sm">
                                            → Refund Policy
                                        </Button>
                                    </Link>
                                    <Link href="/community/forums">
                                        <Button variant="ghost" className="w-full justify-start" size="sm">
                                            → Community Forums
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Submit a Support Request</CardTitle>
                                        <CardDescription>
                                            Fill out the form below and we'll get back to you as soon as possible
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="name">Name *</Label>
                                                    <Input
                                                        id="name"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        placeholder="Your name"
                                                        required
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="email">Email *</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        placeholder="your.email@example.com"
                                                        required
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="subject">Subject *</Label>
                                                <Select
                                                    value={formData.subject}
                                                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                                                    required
                                                >
                                                    <SelectTrigger className="mt-1">
                                                        <SelectValue placeholder="Select a subject" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="account">Account Problem</SelectItem>
                                                        <SelectItem value="purchase">Purchase/Payment Issue</SelectItem>
                                                        <SelectItem value="game">Game Not Working</SelectItem>
                                                        <SelectItem value="bug">Bug Report</SelectItem>
                                                        <SelectItem value="feature">Feature Request</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label htmlFor="game">Related Game (Optional)</Label>
                                                <Select
                                                    value={formData.game}
                                                    onValueChange={(value) => setFormData({ ...formData, game: value })}
                                                >
                                                    <SelectTrigger className="mt-1">
                                                        <SelectValue placeholder="Select a game" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="cyberpunk">Cyberpunk 2077</SelectItem>
                                                        <SelectItem value="spiderman">Marvel's Spider-Man</SelectItem>
                                                        <SelectItem value="gta6">Grand Theft Auto 6</SelectItem>
                                                        <SelectItem value="nfs">Need For Speed</SelectItem>
                                                        <SelectItem value="tlou">The Last Of Us</SelectItem>
                                                        <SelectItem value="detroit">Detroit: Become Human</SelectItem>
                                                        <SelectItem value="awayout">A Way Out</SelectItem>
                                                        <SelectItem value="wukong">Black Myth Wukong</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label htmlFor="message">Message *</Label>
                                                <Textarea
                                                    id="message"
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    placeholder="Please describe your issue in detail..."
                                                    required
                                                    className="mt-1 min-h-[200px]"
                                                />
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    Tip: Include any error messages, screenshots, or steps to reproduce the issue
                                                </p>
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
                                                className="w-full md:w-auto gap-2"
                                                size="lg"
                                            >
                                                {isSubmitting ? (
                                                    <>Processing...</>
                                                ) : (
                                                    <>
                                                        <Send className="h-4 w-4" />
                                                        Send Message
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
