import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface HoverVideoPreviewProps {
    image: any;
    videoSrc?: string;
    alt: string;
    className?: string;
}

export const HoverVideoPreview: React.FC<HoverVideoPreviewProps> = ({
    image,
    videoSrc,
    alt,
    className = '',
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (isHovering && videoSrc) {
            // Delay video appearance by 500ms to avoid triggering on quick hovers
            hoverTimeoutRef.current = setTimeout(() => {
                setShowVideo(true);
                if (videoRef.current) {
                    videoRef.current.play().catch(() => {
                        // Autoplay failed, that's okay
                    });
                }
            }, 500);
        } else {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
            setShowVideo(false);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }

        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, [isHovering, videoSrc]);

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Static Image */}
            <Image
                src={image}
                alt={alt}
                fill
                className={`object-cover transition-opacity duration-300 ${showVideo && videoSrc ? 'opacity-0' : 'opacity-100'
                    }`}
            />

            {/* Video Preview */}
            {videoSrc && (
                <video
                    ref={videoRef}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${showVideo ? 'opacity-100' : 'opacity-0'
                        }`}
                    loop
                    muted
                    playsInline
                >
                    <source src={videoSrc} type="video/mp4" />
                    <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
                </video>
            )}
        </div>
    );
};

export default HoverVideoPreview;
