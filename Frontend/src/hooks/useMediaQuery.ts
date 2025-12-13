import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
};

export const usePrefersReducedMotion = (): boolean => {
    return useMediaQuery('(prefers-reduced-motion: reduce)');
};

export const useIsMobile = (): boolean => {
    return useMediaQuery('(max-width: 768px)');
};

export const useIsLowEndDevice = (): boolean => {
    const [isLowEnd, setIsLowEnd] = useState(false);

    useEffect(() => {
        // Check for hardware concurrency (CPU cores)
        const cores = navigator.hardwareConcurrency || 1;

        // Check for device memory (if available)
        const memory = (navigator as any).deviceMemory || 4;

        // Consider low-end if < 4 cores or < 2GB RAM
        setIsLowEnd(cores < 4 || memory < 2);
    }, []);

    return isLowEnd;
};

export default useMediaQuery;
