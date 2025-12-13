import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";

interface RelatedGameCardProps {
    id: number;
    title: string;
    price: string;
    discount?: number;
    rating: number;
    image: any;
    genre: string;
}

export const RelatedGameCard: React.FC<RelatedGameCardProps> = ({
    id,
    title,
    price,
    discount,
    rating,
    image,
    genre,
}) => {
    const effectivePrice = discount
        ? parseFloat(price.slice(1)) * (1 - discount / 100)
        : parseFloat(price.slice(1));

    return (
        <Link href={`/game/${id}`}>
            <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group cursor-pointer">
                <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {discount && (
                            <Badge className="absolute top-2 right-2 bg-green-600">
                                -{discount}%
                            </Badge>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                        <div>
                            <h3 className="font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                {title}
                            </h3>
                            <Badge variant="secondary" className="text-xs mt-1">
                                {genre}
                            </Badge>
                        </div>

                        {/* Rating & Price */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-primary text-primary" />
                                <span className="text-sm font-semibold text-foreground">
                                    {rating}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {discount ? (
                                    <>
                                        <span className="text-xs text-muted-foreground line-through">
                                            {price}
                                        </span>
                                        <span className="text-sm font-bold text-green-500">
                                            ${effectivePrice.toFixed(2)}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-sm font-bold text-foreground">
                                        {price}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};
