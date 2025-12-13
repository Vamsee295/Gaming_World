import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";

interface EditionCardProps {
    name: string;
    price: string;
    originalPrice?: string;
    features: string[];
    isPopular?: boolean;
    gameId: number;
}

export const EditionCard: React.FC<EditionCardProps> = ({
    name,
    price,
    originalPrice,
    features,
    isPopular = false,
    gameId,
}) => {
    return (
        <Card className={`relative overflow-hidden ${isPopular ? 'border-primary shadow-lg shadow-primary/20' : 'border-border/50'}`}>
            {isPopular && (
                <div className="absolute top-0 right-0">
                    <Badge className="rounded-none rounded-bl-lg bg-primary">
                        Most Popular
                    </Badge>
                </div>
            )}

            <CardContent className="p-6 space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">{name}</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary">{price}</span>
                        {originalPrice && (
                            <span className="text-lg text-muted-foreground line-through">
                                {originalPrice}
                            </span>
                        )}
                    </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 min-h-[200px]">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Link href={`/store/transaction?gameId=${gameId}`} className="block">
                    <Button
                        className={`w-full ${isPopular ? 'bg-primary hover:bg-primary/90' : ''}`}
                        variant={isPopular ? 'default' : 'outline'}
                    >
                        Buy Now
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};
