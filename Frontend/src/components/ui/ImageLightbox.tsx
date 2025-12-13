import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "./dialog";

interface ImageLightboxProps {
    images: any[];
    initialIndex?: number;
    isOpen: boolean;
    onClose: () => void;
    gameTitle: string;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
    images,
    initialIndex = 0,
    isOpen,
    onClose,
    gameTitle,
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    React.useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-0">
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all z-50 backdrop-blur-sm"
                        aria-label="Close lightbox"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    {/* Image */}
                    <div className="relative w-full h-full flex items-center justify-center p-12">
                        <div className="relative w-full h-full">
                            <Image
                                src={images[currentIndex]}
                                alt={`${gameTitle} screenshot ${currentIndex + 1}`}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Navigation - Only show if more than 1 image */}
                    {images.length > 1 && (
                        <>
                            {/* Previous Button */}
                            <button
                                onClick={goToPrevious}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all backdrop-blur-sm z-10"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>

                            {/* Next Button */}
                            <button
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all backdrop-blur-sm z-10"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>

                            {/* Counter */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm z-10">
                                <span className="text-white text-sm font-medium">
                                    {currentIndex + 1} / {images.length}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
