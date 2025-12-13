import React, { useState, useRef, useEffect } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

interface YouTubePlayerProps {
    videoId: string;
    title: string;
    autoPlay?: boolean;
    className?: string;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
    videoId,
    title,
    autoPlay = false,
    className = "",
}) => {
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    const handlePlayClick = () => {
        setIsPlaying(true);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div
            className={`relative w-full h-full overflow-hidden rounded-lg group ${className}`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            {!isPlaying ? (
                <>
                    {/* Thumbnail */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={thumbnailUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/50">
                        <button
                            onClick={handlePlayClick}
                            className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all transform hover:scale-110 shadow-2xl"
                            aria-label="Play video"
                        >
                            <Play className="w-10 h-10 text-white ml-1" fill="white" />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* YouTube iframe */}
                    <iframe
                        ref={iframeRef}
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&modestbranding=1&controls=1`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                    {/* Mute/Unmute Button */}
                    <div className={`absolute bottom-4 right-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}>
                        <button
                            onClick={toggleMute}
                            className="w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center transition-all backdrop-blur-sm"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? (
                                <VolumeX className="w-6 h-6 text-white" />
                            ) : (
                                <Volume2 className="w-6 h-6 text-white" />
                            )}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
