import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingActionButtonProps {
    onCartClick?: () => void;
    onWishlistClick?: () => void;
    cartCount?: number;
    wishlistCount?: number;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
    onCartClick,
    onWishlistClick,
    cartCount = 0,
    wishlistCount = 0,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3">
            <AnimatePresence>
                {isExpanded && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button
                                onClick={onWishlistClick}
                                size="lg"
                                className="relative rounded-full h-14 w-14 shadow-lg bg-pink-600 hover:bg-pink-700 text-white"
                            >
                                <Heart className="h-6 w-6" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            transition={{ duration: 0.2, delay: 0.05 }}
                        >
                            <Button
                                onClick={onCartClick}
                                size="lg"
                                className="relative rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 text-white"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Button
                    onClick={() => setIsExpanded(!isExpanded)}
                    size="lg"
                    className={`rounded-full h-16 w-16 shadow-xl transition-all duration-300 ${isExpanded ? 'bg-red-600 hover:bg-red-700' : 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90'
                        }`}
                >
                    <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Plus className="h-8 w-8 text-white" />
                    </motion.div>
                </Button>
            </motion.div>
        </div>
    );
};

export default FloatingActionButton;
