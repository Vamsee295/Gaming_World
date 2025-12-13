import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface SoundContextValue {
    playSound: (soundName: string) => void;
    enabled: boolean;
    toggleSound: () => void;
}

const SoundContext = createContext<SoundContextValue | undefined>(undefined);

// Simple sound files as data URLs (very small beep sounds)
const sounds: Record<string, string> = {
    hover: 'data:audio/wav;base64,UklGRhwAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
    click: 'data:audio/wav;base64,UklGRhwAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
    wishlist: 'data:audio/wav;base64,UklGRhwAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
    cart: 'data:audio/wav;base64,UklGRhwAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
};

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [enabled, setEnabled] = useState(false);
    const [audioElements, setAudioElements] = useState<Record<string, HTMLAudioElement>>({});

    useEffect(() => {
        // Load user preference from localStorage
        const stored = localStorage.getItem('soundEnabled');
        if (stored !== null) {
            setEnabled(JSON.parse(stored));
        }

        // Preload audio elements
        const elements: Record<string, HTMLAudioElement> = {};
        Object.entries(sounds).forEach(([name, src]) => {
            const audio = new Audio(src);
            audio.volume = 0.3; // Subtle volume
            elements[name] = audio;
        });
        setAudioElements(elements);
    }, []);

    const toggleSound = useCallback(() => {
        setEnabled(prev => {
            const newValue = !prev;
            localStorage.setItem('soundEnabled', JSON.stringify(newValue));
            return newValue;
        });
    }, []);

    const playSound = useCallback((soundName: string) => {
        if (!enabled) return;

        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const audio = audioElements[soundName];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(() => {
                // Ignore errors (autoplay blocked, etc.)
            });
        }
    }, [enabled, audioElements]);

    return (
        <SoundContext.Provider value={{ playSound, enabled, toggleSound }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = (): SoundContextValue => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within SoundProvider');
    }
    return context;
};

export default SoundProvider;
