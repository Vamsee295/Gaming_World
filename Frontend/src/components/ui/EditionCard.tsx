import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
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
    description?: string;
    tier?: 'essential' | 'elite' | 'ultimate';
}

export const EditionCard: React.FC<EditionCardProps> = ({
    name,
    price,
    originalPrice,
    features,
    isPopular = false,
    gameId,
    description,
    tier = 'essential',
}) => {
    // Determine styling based on tier
    const getTierStyles = () => {
        switch (tier) {
            case 'elite':
                return {
                    cardClass: 'bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 border-blue-600',
                    nameClass: 'text-blue-100',
                    priceClass: 'text-white',
                    descClass: 'text-blue-200',
                    featureClass: 'text-blue-200',
                    buttonClass: 'bg-yellow-400 hover:bg-yellow-500 text-black font-bold',
                    gridPattern: 'bg-[linear-gradient(rgba(0,100,200,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,100,200,0.1)_1px,transparent_1px)] bg-[size:20px_20px]'
                };
            case 'ultimate':
                return {
                    cardClass: 'bg-gradient-to-br from-red-950 via-red-900 to-red-950 border-red-600 relative',
                    nameClass: 'text-red-100',
                    priceClass: 'text-white',
                    descClass: 'text-red-200',
                    featureClass: 'text-red-200',
                    buttonClass: 'bg-yellow-400 hover:bg-yellow-500 text-black font-bold',
                    gridPattern: '',
                    tornEdge: true
                };
            default: // essential
                return {
                    cardClass: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700',
                    nameClass: 'text-gray-100',
                    priceClass: 'text-white',
                    descClass: 'text-gray-300',
                    featureClass: 'text-gray-300',
                    buttonClass: 'bg-yellow-400 hover:bg-yellow-500 text-black font-bold',
                    gridPattern: ''
                };
        }
    };

    const styles = getTierStyles();

    return (
        <Card className={`relative overflow-hidden ${styles.cardClass} shadow-xl transition-all duration-300 hover:scale-105`}>
            {/* Grid pattern background for elite tier */}
            {styles.gridPattern && (
                <div className={`absolute inset-0 ${styles.gridPattern} opacity-30`} />
            )}

            {/* Torn edge effect for ultimate tier */}
            {styles.tornEdge && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L100,0 L100,3 Q95,5 90,3 T80,3 T70,3 T60,3 T50,3 T40,3 T30,3 T20,3 T10,3 T0,3 Z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E")`,
                        backgroundSize: '100% 10px',
                        backgroundRepeat: 'repeat-x',
                        backgroundPosition: 'top'
                    }}
                />
            )}

            {/* Most Popular Badge */}
            {isPopular && (
                <div className="absolute top-4 right-4 z-10">
                    <Badge className="rounded-full bg-white text-red-600 px-4 py-1 font-semibold border-2 border-red-600 shadow-lg">
                        🔥 MOST POPULAR
                    </Badge>
                </div>
            )}

            <CardContent className="p-8 space-y-6 relative z-10">
                {/* Header */}
                <div className="space-y-3">
                    <h3 className={`text-2xl font-bold uppercase tracking-wide ${styles.nameClass}`}>
                        {name}
                    </h3>

                    {/* Price */}
                    <div className="space-y-1">
                        {originalPrice && (
                            <div className={`text-lg line-through opacity-60 ${styles.priceClass}`}>
                                {originalPrice}
                            </div>
                        )}
                        <div className={`text-5xl font-bold ${styles.priceClass}`}>
                            {price}
                            <span className="text-sm font-normal ml-1">+GST</span>
                        </div>
                    </div>

                    {/* Description */}
                    {description && (
                        <p className={`text-sm leading-relaxed ${styles.descClass}`}>
                            {description}
                        </p>
                    )}
                </div>

                {/* CTA Button */}
                <Link href={`/store/transaction?gameId=${gameId}`} className="block">
                    <Button
                        className={`w-full py-6 text-lg ${styles.buttonClass}`}
                        size="lg"
                    >
                        Join Now
                    </Button>
                </Link>

                {/* What's Included Section */}
                <div className="space-y-4 pt-4">
                    <h4 className={`text-sm font-bold uppercase tracking-wide ${styles.nameClass}`}>
                        WHAT'S INCLUDED:
                    </h4>

                    {/* Features List */}
                    <ul className="space-y-3">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <Plus className={`w-5 h-5 flex-shrink-0 mt-0.5 ${styles.featureClass}`} />
                                <span className={`text-sm ${styles.featureClass}`}>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};
