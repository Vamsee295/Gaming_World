import React from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "./card";

interface RatingBreakdownProps {
    ratings: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
    totalReviews: number;
    averageRating: number;
}

export const RatingBreakdown: React.FC<RatingBreakdownProps> = ({
    ratings,
    totalReviews,
    averageRating,
}) => {
    const getPercentage = (count: number) => {
        return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    };

    return (
        <Card className="border-border/50">
            <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Overall Rating */}
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="text-6xl font-bold text-foreground">
                            {averageRating.toFixed(1)}
                        </div>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-6 h-6 ${i < Math.floor(averageRating)
                                            ? "fill-primary text-primary"
                                            : i < averageRating
                                                ? "fill-primary/50 text-primary"
                                                : "text-muted"
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Based on {totalReviews} reviews
                        </p>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = ratings[star as keyof typeof ratings] || 0;
                            const percentage = getPercentage(count);

                            return (
                                <div key={star} className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-16">
                                        <span className="text-sm font-medium text-foreground">
                                            {star}
                                        </span>
                                        <Star className="w-3 h-3 fill-primary text-primary" />
                                    </div>
                                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-muted-foreground w-12 text-right">
                                        {count}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
