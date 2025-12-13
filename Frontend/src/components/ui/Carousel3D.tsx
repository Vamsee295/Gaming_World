import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarouselItem {
    id: number;
    image: any;
    title: string;
    description?: string;
}

interface Carousel3DProps {
    items: CarouselItem[];
    onItemClick?: (item: CarouselItem) => void;
}

export const Carousel3D: React.FC<Carousel3DProps> = ({ items, onItemClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = (direction: 'next' | 'prev') => {
        if (direction === 'next') {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        } else {
            setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
        }
    };

    const getItemStyle = (index: number) => {
        const diff = (index - currentIndex + items.length) % items.length;

        if (diff === 0) {
            // Center item
            return {
                transform: 'translateX(0) translateZ(0) rotateY(0deg) scale(1)',
                opacity: 1,
                zIndex: 3,
                filter: 'blur(0px)',
            };
        } else if (diff === 1 || diff === -items.length + 1) {
            // Right item
            return {
                transform: 'translateX(60%) translateZ(-200px) rotateY(-35deg) scale(0.8)',
                opacity: 0.7,
                zIndex: 2,
                filter: 'blur(2px)',
            };
        } else if (diff === -1 || diff === items.length - 1) {
            // Left item
            return {
                transform: 'translateX(-60%) translateZ(-200px) rotateY(35deg) scale(0.8)',
                opacity: 0.7,
                zIndex: 2,
                filter: 'blur(2px)',
            };
        } else {
            // Hidden items
            return {
                transform: 'translateX(0) translateZ(-400px) scale(0.5)',
                opacity: 0,
                zIndex: 1,
                filter: 'blur(4px)',
            };
        }
    };

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
            {/* 3D Stage */}
            <div
                className="relative w-full h-full"
                style={{
                    perspective: '1500px',
                    perspectiveOrigin: '50% 50%',
                }}
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    <AnimatePresence mode="sync">
                        {items.map((item, index) => {
                            const style = getItemStyle(index);
                            const isCenter = (index - currentIndex + items.length) % items.length === 0;

                            return (
                                <motion.div
                                    key={item.id}
                                    className="absolute w-[500px] h-[350px] rounded-xl overflow-hidden cursor-pointer shadow-2xl"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                    }}
                                    animate={style}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.32, 0.72, 0, 1],
                                    }}
                                    onClick={() => isCenter && onItemClick?.(item)}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                    {isCenter && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6"
                                        >
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                                {item.description && (
                                                    <p className="text-gray-200 text-sm">{item.description}</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Buttons */}
            <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 border-white/20 backdrop-blur"
                onClick={() => navigate('prev')}
            >
                <ChevronLeft className="h-6 w-6 text-white" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 border-white/20 backdrop-blur"
                onClick={() => navigate('next')}
            >
                <ChevronRight className="h-6 w-6 text-white" />
            </Button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all ${index === currentIndex
                                ? 'w-8 bg-white'
                                : 'w-2 bg-white/50 hover:bg-white/75'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel3D;
