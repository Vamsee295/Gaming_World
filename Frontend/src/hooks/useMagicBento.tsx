import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface UseMagicBentoOptions {
    enableTilt?: boolean;
    enableMagnetism?: boolean;
    enableBorderGlow?: boolean;
    clickEffect?: boolean;
    glowColor?: string;
    disableAnimations?: boolean;
}

const DEFAULT_GLOW_COLOR = '132, 0, 255';

/**
 * Hook to add Magic Bento hover effects to any card element
 */
export const useMagicBentoCard = <T extends HTMLElement = HTMLDivElement>(
    options: UseMagicBentoOptions = {}
) => {
    const {
        enableTilt = true,
        enableMagnetism = true,
        enableBorderGlow = true,
        clickEffect = true,
        glowColor = DEFAULT_GLOW_COLOR,
        disableAnimations = false
    } = options;

    const elementRef = useRef<T>(null);
    const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        if (disableAnimations || !elementRef.current) return;

        const element = elementRef.current;

        // Add the magic-bento-card and spotlight classes for CSS effects
        element.classList.add('card-spotlight');
        if (enableBorderGlow) {
            element.classList.add('magic-bento-card--border-glow');
        }

        // Set CSS custom properties for glow and spotlight
        element.style.setProperty('--glow-x', '50%');
        element.style.setProperty('--glow-y', '50%');
        element.style.setProperty('--glow-intensity', '0');
        element.style.setProperty('--glow-radius', '300px');
        element.style.setProperty('--glow-color', glowColor);
        element.style.setProperty('--mouse-x', '50%');
        element.style.setProperty('--mouse-y', '50%');
        element.style.setProperty('--spotlight-color', `rgba(${glowColor}, 0.15)`);

        const handleMouseEnter = () => {
            if (enableTilt) {
                gsap.to(element, {
                    rotateX: 5,
                    rotateY: 5,
                    duration: 0.3,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            }
        };

        const handleMouseLeave = () => {
            if (enableTilt) {
                gsap.to(element, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            if (enableMagnetism) {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            // Reset glow
            if (enableBorderGlow) {
                element.style.setProperty('--glow-intensity', '0');
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!enableTilt && !enableMagnetism && !enableBorderGlow) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Update spotlight position
            element.style.setProperty('--mouse-x', `${x}px`);
            element.style.setProperty('--mouse-y', `${y}px`);

            if (enableTilt) {
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                gsap.to(element, {
                    rotateX,
                    rotateY,
                    duration: 0.1,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            }

            if (enableMagnetism) {
                const magnetX = (x - centerX) * 0.05;
                const magnetY = (y - centerY) * 0.05;

                magnetismAnimationRef.current = gsap.to(element, {
                    x: magnetX,
                    y: magnetY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            if (enableBorderGlow) {
                const relativeX = (x / rect.width) * 100;
                const relativeY = (y / rect.height) * 100;

                element.style.setProperty('--glow-x', `${relativeX}%`);
                element.style.setProperty('--glow-y', `${relativeY}%`);
                element.style.setProperty('--glow-intensity', '1');
            }
        };

        const handleClick = (e: MouseEvent) => {
            if (!clickEffect) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const maxDistance = Math.max(
                Math.hypot(x, y),
                Math.hypot(x - rect.width, y),
                Math.hypot(x, y - rect.height),
                Math.hypot(x - rect.width, y - rect.height)
            );

            const ripple = document.createElement('div');
            ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

            element.appendChild(ripple);

            gsap.fromTo(
                ripple,
                {
                    scale: 0,
                    opacity: 1
                },
                {
                    scale: 1,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    onComplete: () => ripple.remove()
                }
            );
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('click', handleClick);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('click', handleClick);
            magnetismAnimationRef.current?.kill();

            element.classList.remove('card-spotlight');
            if (enableBorderGlow) {
                element.classList.remove('magic-bento-card--border-glow');
            }
        };
    }, [enableTilt, enableMagnetism, enableBorderGlow, clickEffect, glowColor, disableAnimations]);

    return elementRef;
};
