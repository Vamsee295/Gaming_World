"use client";

import React from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
    className?: string;
    variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
    fallbackUrl?: string;
}

export function BackButton({
    className = "",
    variant = "outline",
    fallbackUrl = "/"
}: BackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        // Check if there's history to go back to
        if (window.history.length > 1) {
            router.back();
        } else {
            // Fallback to home or specified URL if no history
            router.push(fallbackUrl);
        }
    };

    return (
        <Button
            variant={variant}
            className={`gap-2 ${className}`}
            onClick={handleBack}
        >
            <ArrowLeft className="h-4 w-4" />
            Back
        </Button>
    );
}
