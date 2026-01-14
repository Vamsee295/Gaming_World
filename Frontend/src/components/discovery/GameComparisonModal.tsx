import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeftRight, Star, ShoppingCart, Calendar, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Game {
    id: number;
    title: string;
    price: string;
    image: any;
    rating: number;
    genre: string;
    releaseYear?: string;
    platforms?: string[];
    description?: string;
}

interface GameComparisonModalProps {
    isOpen: boolean;
    onClose: () => void;
    games: Game[];
}

const GameComparisonModal: React.FC<GameComparisonModalProps> = ({
    isOpen,
    onClose,
    games: availableGames,
}) => {
    const [selectedGames, setSelectedGames] = useState<Game[]>([]);

    const toggleGame = (game: Game) => {
        if (selectedGames.find(g => g.id === game.id)) {
            setSelectedGames(selectedGames.filter(g => g.id !== game.id));
        } else if (selectedGames.length < 3) {
            setSelectedGames([...selectedGames, game]);
        }
    };

    const ComparisonRow = ({ label, getValue }: { label: string; getValue: (game: Game) => React.ReactNode }) => (
        <div className="grid grid-cols-4 gap-4 py-3 border-b border-border">
            <div className="font-medium text-muted-foreground flex items-center gap-2">
                {label}
            </div>
            {selectedGames.map((game, index) => (
                <div key={index} className="text-foreground">
                    {getValue(game)}
                </div>
            ))}
            {Array.from({ length: 3 - selectedGames.length }).map((_, i) => (
                <div key={`empty-${i}`} className="text-muted-foreground italic">-</div>
            ))}
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-4 md:inset-10 bg-background border border-border rounded-2xl shadow-2xl z-[101] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/30">
                            <div className="flex items-center gap-3">
                                <ArrowLeftRight className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-bold text-foreground">Compare Games</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto p-6">
                            {/* Game Selection */}
                            {selectedGames.length < 3 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-3">Select up to 3 games to compare</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                        {availableGames.slice(0, 12).map((game) => {
                                            const isSelected = selectedGames.find(g => g.id === game.id);
                                            return (
                                                <motion.button
                                                    key={game.id}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => toggleGame(game)}
                                                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${isSelected
                                                            ? 'border-primary shadow-lg shadow-primary/20'
                                                            : 'border-transparent hover:border-border'
                                                        }`}
                                                >
                                                    <div className="aspect-[3/4] relative">
                                                        <Image
                                                            src={game.image}
                                                            alt={game.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                                        <div className="absolute bottom-0 left-0 right-0 p-2">
                                                            <p className="text-white text-xs font-semibold line-clamp-2">
                                                                {game.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Comparison Table */}
                            {selectedGames.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-secondary/20 rounded-xl p-6"
                                >
                                    <div className="grid grid-cols-4 gap-4 mb-6">
                                        <div /> {/* Empty corner */}
                                        {selectedGames.map((game, index) => (
                                            <div key={index} className="relative">
                                                <button
                                                    onClick={() => toggleGame(game)}
                                                    className="absolute -top-2 -right-2 z-10 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                                <div className="aspect-[16/9] relative rounded-lg overflow-hidden mb-2">
                                                    <Image src={game.image} alt={game.title} fill className="object-cover" />
                                                </div>
                                                <h3 className="font-semibold text-foreground text-sm line-clamp-2">
                                                    {game.title}
                                                </h3>
                                            </div>
                                        ))}
                                    </div>

                                    <ComparisonRow
                                        label="Price"
                                        getValue={(game) => (
                                            <span className="font-bold text-primary">{game.price}</span>
                                        )}
                                    />

                                    <ComparisonRow
                                        label="Rating"
                                        getValue={(game) => (
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-primary text-primary" />
                                                <span className="font-semibold">{game.rating}</span>
                                            </div>
                                        )}
                                    />

                                    <ComparisonRow
                                        label="Genre"
                                        getValue={(game) => (
                                            <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                                                {game.genre}
                                            </span>
                                        )}
                                    />

                                    <ComparisonRow
                                        label="Release Year"
                                        getValue={(game) => game.releaseYear || 'N/A'}
                                    />

                                    <ComparisonRow
                                        label="Platforms"
                                        getValue={(game) => (
                                            <div className="flex flex-wrap gap-1">
                                                {game.platforms?.map((platform, i) => (
                                                    <span key={i} className="text-xs bg-secondary px-2 py-0.5 rounded">
                                                        {platform}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    />
                                </motion.div>
                            )}

                            {selectedGames.length === 0 && (
                                <div className="text-center py-20 text-muted-foreground">
                                    <ArrowLeftRight className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                    <p>Select games to start comparing</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default GameComparisonModal;
