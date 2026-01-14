import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Heart, Play, Star, Gamepad2, Monitor, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface Game {
    id: number;
    title: string;
    price: string;
    discount?: number;
    image: any;
    rating: number;
    genre: string;
    trailerVideoId?: string;
    reviewCount?: number;
    releaseYear?: string;
    platforms?: string[];
    description?: string;
}

interface QuickViewModalProps {
    game: Game | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart?: (game: Game) => void;
    onAddToWishlist?: (game: Game) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
    game,
    isOpen,
    onClose,
    onAddToCart,
    onAddToWishlist,
}) => {
    const [showTrailer, setShowTrailer] = useState(false);

    if (!game) return null;

    const effectivePrice = game.discount
        ? (parseFloat(game.price.slice(1)) * (1 - game.discount / 100)).toFixed(2)
        : game.price.slice(1);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90]"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[900px] md:max-h-[80vh] bg-background border border-border rounded-2xl shadow-2xl z-[91] overflow-hidden"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="grid md:grid-cols-2 max-h-[80vh] overflow-y-auto">
                            {/* Left: Image/Trailer */}
                            <div className="relative aspect-[4/5] md:aspect-auto">
                                {showTrailer && game.trailerVideoId ? (
                                    <div className="absolute inset-0">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${game.trailerVideoId}?autoplay=1`}
                                            title={game.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <Image
                                            src={game.image}
                                            alt={game.title}
                                            fill
                                            className="object-cover"
                                        />
                                        {game.trailerVideoId && (
                                            <button
                                                onClick={() => setShowTrailer(true)}
                                                className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-colors flex items-center justify-center group"
                                            >
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    className="bg-primary rounded-full p-6 group-hover:bg-primary/90"
                                                >
                                                    <Play className="h-12 w-12 text-white fill-white" />
                                                </motion.div>
                                            </button>
                                        )}
                                    </>
                                )}

                                {game.discount && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <Badge className="bg-green-600 text-white text-lg px-3 py-1">
                                            -{game.discount}% OFF
                                        </Badge>
                                    </div>
                                )}
                            </div>

                            {/* Right: Details */}
                            <div className="p-6 md:p-8 flex flex-col">
                                <div className="flex-1">
                                    <Badge variant="secondary" className="mb-3">
                                        {game.genre}
                                    </Badge>

                                    <h2 className="text-3xl font-bold text-foreground mb-3">
                                        {game.title}
                                    </h2>

                                    {/* Rating and platforms */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-5 w-5 fill-primary text-primary" />
                                            <span className="font-semibold text-lg">{game.rating}</span>
                                            {game.reviewCount && (
                                                <span className="text-sm text-muted-foreground ml-1">
                                                    ({game.reviewCount.toLocaleString()} reviews)
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Platforms */}
                                    {game.platforms && game.platforms.length > 0 && (
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-sm text-muted-foreground">Available on:</span>
                                            <div className="flex items-center gap-2">
                                                {game.platforms.map((platform, i) => (
                                                    <div key={i} className="flex items-center gap-1 text-sm">
                                                        {platform === 'PC' ? (
                                                            <Monitor className="h-4 w-4" />
                                                        ) : (
                                                            <Gamepad2 className="h-4 w-4" />
                                                        )}
                                                        <span>{platform}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Release year */}
                                    {game.releaseYear && (
                                        <div className="mb-4">
                                            <span className="text-sm text-muted-foreground">
                                                Release: {game.releaseYear}
                                            </span>
                                        </div>
                                    )}

                                    {/* Description */}
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        {game.description || 'Experience an epic adventure in this critically acclaimed game. Immerse yourself in stunning graphics, engaging gameplay, and an unforgettable story.'}
                                    </p>

                                    {/* Features badges */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <Badge variant="outline">Single Player</Badge>
                                        <Badge variant="outline">Great Soundtrack</Badge>
                                        <Badge variant="outline">Story Rich</Badge>
                                        <Badge variant="outline">Atmospheric</Badge>
                                    </div>
                                </div>

                                {/* Price and actions */}
                                <div className="border-t border-border pt-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            {game.discount ? (
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-sm line-through text-muted-foreground">
                                                        {game.price}
                                                    </span>
                                                    <span className="text-3xl font-bold text-green-500">
                                                        ${effectivePrice}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-3xl font-bold text-foreground">
                                                    {game.price === '$0.00' ? 'Free' : game.price}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            size="lg"
                                            className="flex-1"
                                            onClick={() => {
                                                onAddToCart?.(game);
                                                onClose();
                                            }}
                                        >
                                            <ShoppingCart className="h-5 w-5 mr-2" />
                                            Add to Cart
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            onClick={() => {
                                                onAddToWishlist?.(game);
                                            }}
                                        >
                                            <Heart className="h-5 w-5" />
                                        </Button>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        className="w-full"
                                        onClick={() => window.location.href = `/game/${game.id}`}
                                    >
                                        View Full Details
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default QuickViewModal;
