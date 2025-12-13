import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { YouTubePlayer } from "./YouTubePlayer";

interface MediaItem {
    type: "video" | "image";
    url: string;
    title: string;
    category?: string;
}

interface HeroMediaCarouselProps {
    media: MediaItem[];
    gameName: string;
}

export const HeroMediaCarousel: React.FC<HeroMediaCarouselProps> = ({
    media,
    gameName,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    if (!media || media.length === 0) {
        return null;
    }

    const currentMedia = media[currentIndex];

    return (
        <div className="relative w-full h-full group">
            {/* Media Display */}
            <div className="w-full h-full">
                {currentMedia.type === "video" ? (
                    <YouTubePlayer
                        videoId={currentMedia.url}
                        title={currentMedia.title}
                        autoPlay={false}
                        className="w-full h-full"
                    />
                ) : (
                    <div className="relative w-full h-full">
                        <Image
                            src={currentMedia.url}
                            alt={currentMedia.title}
                            fill
                            className="object-cover"
                            priority={currentIndex === 0}
                        />
                    </div>
                )}
            </div>

            {/* Navigation Arrows - Only show if more than 1 item */}
            {media.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm z-10"
                        aria-label="Previous media"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm z-10"
                        aria-label="Next media"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {media.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-1.5 rounded-full transition-all ${index === currentIndex
                                        ? "w-8 bg-white"
                                        : "w-1.5 bg-white/50 hover:bg-white/75"
                                    }`}
                                aria-label={`Go to ${item.category || "media"} ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Media Category Label */}
                    {currentMedia.category && (
                        <div className="absolute top-6 left-6 z-10">
                            <span className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm text-white text-sm font-medium">
                                {currentMedia.category}
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
