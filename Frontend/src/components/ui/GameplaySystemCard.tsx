import React from "react";
import Image from "next/image";
import { Card, CardContent } from "./card";

interface GameplaySystemCardProps {
    name: string;
    description: string;
    bullets: string[];
    image?: any;
}

export const GameplaySystemCard: React.FC<GameplaySystemCardProps> = ({
    name,
    description,
    bullets,
    image,
}) => {
    return (
        <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    {image && (
                        <div className="relative h-64 md:h-full">
                            <Image
                                src={image}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50 md:to-background" />
                        </div>
                    )}

                    {/* Content Section */}
                    <div className={`p-6 ${!image ? 'md:col-span-2' : ''}`}>
                        <h3 className="text-2xl font-bold text-foreground mb-3">{name}</h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            {description}
                        </p>

                        {/* Feature Bullets */}
                        <ul className="space-y-2">
                            {bullets.map((bullet, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
