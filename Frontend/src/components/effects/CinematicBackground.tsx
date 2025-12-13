import React, { useRef, useEffect, useState } from 'react';

interface CinematicBackgroundProps {
    videoSrc?: string;
    fallbackImage?: string;
    overlay?: number; // 0-100, darkness percentage
    className?: string;
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({
    videoSrc,
    fallbackImage,
    overlay = 65,
    className = '',
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play().catch(() => {
                            // Autoplay blocked, that's okay
                        });
                        setIsInView(true);
                    } else {
                        video.pause();
                        setIsInView(false);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {videoSrc ? (
                <>
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={fallbackImage}
                    >
                        <source src={videoSrc} type="video/mp4" />
                        <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
                    </video>
                    <div
                        className="absolute inset-0 bg-black"
                        style={{ opacity: overlay / 100 }}
                    />
                </>
            ) : (
                <>
                    {fallbackImage && (
                        <>
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${fallbackImage})` }}
                            />
                            <div
                                className="absolute inset-0 bg-black"
                                style={{ opacity: overlay / 100 }}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default CinematicBackground;
