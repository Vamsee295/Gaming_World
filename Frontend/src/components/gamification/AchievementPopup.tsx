import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Sparkles, X } from 'lucide-react';
import Confetti from 'react-confetti';

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    points: number;
}

interface AchievementPopupProps {
    achievement: Achievement | null;
    onClose: () => void;
}

const AchievementPopup: React.FC<AchievementPopupProps> = ({ achievement, onClose }) => {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (achievement) {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 3000);

            const autoClose = setTimeout(() => {
                onClose();
            }, 5000);

            return () => {
                clearTimeout(timer);
                clearTimeout(autoClose);
            };
        }
    }, [achievement, onClose]);

    const getRarityColor = (rarity: Achievement['rarity']) => {
        switch (rarity) {
            case 'common':
                return 'from-gray-500 to-gray-600';
            case 'rare':
                return 'from-blue-500 to-blue-600';
            case 'epic':
                return 'from-purple-500 to-purple-600';
            case 'legendary':
                return 'from-yellow-500 to-orange-600';
        }
    };

    const getRarityGlow = (rarity: Achievement['rarity']) => {
        switch (rarity) {
            case 'common':
                return 'shadow-gray-500/50';
            case 'rare':
                return 'shadow-blue-500/50';
            case 'epic':
                return 'shadow-purple-500/50';
            case 'legendary':
                return 'shadow-yellow-500/50';
        }
    };

    return (
        <AnimatePresence>
            {achievement && (
                <>
                    {showConfetti && achievement.rarity !== 'common' && (
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                            recycle={false}
                            numberOfPieces={achievement.rarity === 'legendary' ? 500 : 200}
                            gravity={0.3}
                        />
                    )}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -100 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[200]"
                    >
                        <div className={`relative bg-gradient-to-br ${getRarityColor(achievement.rarity)} p-1 rounded-2xl shadow-2xl ${getRarityGlow(achievement.rarity)} shadow-lg`}>
                            <div className="bg-background rounded-xl p-8 min-w-[400px]">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>

                                <div className="text-center">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 5, -5, 0],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                        className="inline-block mb-4"
                                    >
                                        <div className={`relative bg-gradient-to-br ${getRarityColor(achievement.rarity)} p-4 rounded-full`}>
                                            <Trophy className="h-16 w-16 text-white" />
                                            {achievement.rarity !== 'common' && (
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                    className="absolute -top-2 -right-2"
                                                >
                                                    <Sparkles className="h-6 w-6 text-yellow-400" />
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-2xl font-bold text-foreground mb-2"
                                    >
                                        Achievement Unlocked!
                                    </motion.h2>

                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-xl font-semibold text-foreground mb-2"
                                    >
                                        {achievement.title}
                                    </motion.h3>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-muted-foreground mb-4"
                                    >
                                        {achievement.description}
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full">
                                            <Star className="h-4 w-4 text-primary fill-primary" />
                                            <span className="text-sm font-semibold text-primary">+{achievement.points} XP</span>
                                        </div>
                                        <div className="px-3 py-1 bg-secondary rounded-full">
                                            <span className="text-xs font-medium capitalize">{achievement.rarity}</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[199]"
                        onClick={onClose}
                    />
                </>
            )}
        </AnimatePresence>
    );
};

export default AchievementPopup;
