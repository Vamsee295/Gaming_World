import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize } from "lucide-react";

interface EnhancedYouTubePlayerProps {
    videoId: string;
    title: string;
    className?: string;
}

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

export const EnhancedYouTubePlayer: React.FC<EnhancedYouTubePlayerProps> = ({
    videoId,
    title,
    className = "",
}) => {
    const [player, setPlayer] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const playerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Load YouTube IFrame API
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            if (playerRef.current) {
                const ytPlayer = new window.YT.Player(playerRef.current, {
                    videoId: videoId,
                    playerVars: {
                        autoplay: 0,
                        controls: 0, // Hide default controls
                        modestbranding: 1,
                        rel: 0,
                    },
                    events: {
                        onReady: (event: any) => {
                            setPlayer(event.target);
                            setDuration(event.target.getDuration());
                        },
                        onStateChange: (event: any) => {
                            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
                        },
                    },
                });
            }
        };

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [videoId]);

    useEffect(() => {
        if (player && isPlaying) {
            intervalRef.current = setInterval(() => {
                setCurrentTime(player.getCurrentTime());
            }, 100);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [player, isPlaying]);

    const handlePlayPause = () => {
        if (!player) return;
        if (isPlaying) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    };

    const handleSkipForward = () => {
        if (!player) return;
        const newTime = Math.min(currentTime + 10, duration);
        player.seekTo(newTime, true);
    };

    const handleSkipBack = () => {
        if (!player) return;
        const newTime = Math.max(currentTime - 10, 0);
        player.seekTo(newTime, true);
    };

    const handleMuteToggle = () => {
        if (!player) return;
        if (isMuted) {
            player.unMute();
        } else {
            player.mute();
        }
        setIsMuted(!isMuted);
    };

    const handleFullscreen = () => {
        const iframe = playerRef.current?.querySelector('iframe');
        if (iframe?.requestFullscreen) {
            iframe.requestFullscreen();
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!player) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        player.seekTo(pos * duration, true);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div
            className={`relative w-full h-full overflow-hidden group ${className}`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            {/* YouTube Player */}
            <div ref={playerRef} className="w-full h-full" />

            {/* Custom Controls Overlay */}
            <div
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"
                    }`}
            >
                {/* Progress Bar */}
                <div
                    className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-4 hover:h-2 transition-all"
                    onClick={handleProgressClick}
                >
                    <div
                        className="h-full bg-red-600 rounded-full transition-all"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                    {/* Left Controls */}
                    <div className="flex items-center gap-4">
                        {/* Play/Pause */}
                        <button
                            onClick={handlePlayPause}
                            className="text-white hover:text-red-500 transition-colors"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? (
                                <Pause className="w-8 h-8" fill="white" />
                            ) : (
                                <Play className="w-8 h-8" fill="white" />
                            )}
                        </button>

                        {/* Skip Back */}
                        <button
                            onClick={handleSkipBack}
                            className="text-white hover:text-red-500 transition-colors"
                            aria-label="Skip back 10 seconds"
                        >
                            <SkipBack className="w-6 h-6" />
                        </button>

                        {/* Skip Forward */}
                        <button
                            onClick={handleSkipForward}
                            className="text-white hover:text-red-500 transition-colors"
                            aria-label="Skip forward 10 seconds"
                        >
                            <SkipForward className="w-6 h-6" />
                        </button>

                        {/* Mute */}
                        <button
                            onClick={handleMuteToggle}
                            className="text-white hover:text-red-500 transition-colors"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? (
                                <VolumeX className="w-6 h-6" />
                            ) : (
                                <Volume2 className="w-6 h-6" />
                            )}
                        </button>

                        {/* Time Display */}
                        <span className="text-white text-sm font-medium">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-4">
                        {/* Fullscreen */}
                        <button
                            onClick={handleFullscreen}
                            className="text-white hover:text-red-500 transition-colors"
                            aria-label="Fullscreen"
                        >
                            <Maximize className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
