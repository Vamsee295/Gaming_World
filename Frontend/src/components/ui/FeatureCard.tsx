import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "./card";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
    icon: Icon,
    title,
    description,
}) => {
    return (
        <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
            <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-primary" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground">{title}</h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-sm">
                        {description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
