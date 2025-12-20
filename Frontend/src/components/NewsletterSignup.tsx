import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            setStatus("error");
            setMessage("Please enter your email address");
            return;
        }

        if (!validateEmail(email)) {
            setStatus("error");
            setMessage("Please enter a valid email address");
            return;
        }

        setStatus("loading");

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setMessage("Thanks for subscribing! Check your inbox for confirmation.");
            setEmail("");

            // Reset after 5 seconds
            setTimeout(() => {
                setStatus("idle");
                setMessage("");
            }, 5000);
        }, 1000);
    };

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
                Subscribe to our newsletter for the latest game releases, exclusive deals, and gaming news.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-secondary border-border"
                        disabled={status === "loading" || status === "success"}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={status === "loading" || status === "success"}
                >
                    {status === "loading" ? (
                        <>
                            <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            Subscribing...
                        </>
                    ) : status === "success" ? (
                        <>
                            <Check className="h-4 w-4" />
                            Subscribed!
                        </>
                    ) : (
                        <>
                            <Mail className="h-4 w-4" />
                            Subscribe
                        </>
                    )}
                </Button>

                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`flex items-start gap-2 text-sm p-3 rounded-lg ${status === "success"
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-red-500/10 text-red-500"
                                }`}
                        >
                            {status === "success" ? (
                                <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            )}
                            <span>{message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>

            <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from GameVerse.
            </p>
        </div>
    );
}
