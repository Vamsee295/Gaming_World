import { useEffect, useState } from 'react';

interface DynamicColorResult {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
}

export const useDynamicColors = (imageUrl: string): DynamicColorResult => {
    const [colors, setColors] = useState<DynamicColorResult>({
        primary: '#4a9eff',
        secondary: '#2563eb',
        accent: '#3b82f6',
        glow: 'rgba(74, 158, 255, 0.5)',
    });

    useEffect(() => {
        // Create a simple color extraction without external library for now
        const extractColors = async () => {
            try {
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.src = imageUrl;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return;

                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    // Sample colors from different areas
                    const samples = [
                        ctx.getImageData(img.width * 0.25, img.height * 0.25, 1, 1).data,
                        ctx.getImageData(img.width * 0.75, img.height * 0.25, 1, 1).data,
                        ctx.getImageData(img.width * 0.5, img.height * 0.5, 1, 1).data,
                    ];

                    // Calculate average vibrant color
                    let r = 0, g = 0, b = 0;
                    samples.forEach(sample => {
                        r += sample[0];
                        g += sample[1];
                        b += sample[2];
                    });
                    r = Math.floor(r / samples.length);
                    g = Math.floor(g / samples.length);
                    b = Math.floor(b / samples.length);

                    // Increase saturation for more vibrant colors
                    const max = Math.max(r, g, b);
                    if (max > 0) {
                        const factor = 1.3;
                        r = Math.min(255, Math.floor(r * factor));
                        g = Math.min(255, Math.floor(g * factor));
                        b = Math.min(255, Math.floor(b * factor));
                    }

                    const primary = `rgb(${r}, ${g}, ${b})`;
                    const secondary = `rgb(${Math.floor(r * 0.8)}, ${Math.floor(g * 0.8)}, ${Math.floor(b * 0.8)})`;
                    const accent = `rgb(${Math.min(255, r + 30)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 30)})`;
                    const glow = `rgba(${r}, ${g}, ${b}, 0.4)`;

                    setColors({ primary, secondary, accent, glow });
                };
            } catch (error) {
                console.error('Error extracting colors:', error);
            }
        };

        extractColors();
    }, [imageUrl]);

    return colors;
};

export default useDynamicColors;
