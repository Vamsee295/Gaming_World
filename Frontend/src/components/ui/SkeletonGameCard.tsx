import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonGameCardProps {
    className?: string;
}

export const SkeletonGameCard: React.FC<SkeletonGameCardProps> = ({ className = '' }) => {
    return (
        <div className={`group cursor-wait ${className}`}>
            <div className="relative overflow-hidden rounded-lg border border-border bg-secondary">
                {/* Image skeleton */}
                <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent"
                        animate={{
                            x: ['-100%', '100%'],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                </div>

                {/* Content skeleton */}
                <div className="p-4 space-y-3">
                    {/* Title */}
                    <div className="h-6 bg-muted rounded w-3/4 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent"
                            animate={{
                                x: ['-100%', '100%'],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    </div>

                    {/* Platform and year */}
                    <div className="flex items-center gap-2">
                        <div className="h-4 bg-muted rounded w-16 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent"
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    delay: 0.1,
                                }}
                            />
                        </div>
                        <div className="h-4 bg-muted rounded w-12 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent"
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    delay: 0.2,
                                }}
                            />
                        </div>
                    </div>

                    {/* Genre and rating */}
                    <div className="flex items-center justify-between">
                        <div className="h-5 bg-muted rounded w-20 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent"
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    delay: 0.3,
                                }}
                            />
                        </div>
                        <div className="h-5 bg-muted rounded w-16 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent"
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    delay: 0.4,
                                }}
                            />
                        </div>
                    </div>

                    {/* Price and buttons */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="h-6 bg-muted rounded w-20 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent"
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    delay: 0.5,
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-muted rounded relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent"
                                    animate={{
                                        x: ['-100%', '100%'],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: 'linear',
                                        delay: 0.6,
                                    }}
                                />
                            </div>
                            <div className="h-8 w-8 bg-muted rounded relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent"
                                    animate={{
                                        x: ['-100%', '100%'],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: 'linear',
                                        delay: 0.7,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonGameCard;
