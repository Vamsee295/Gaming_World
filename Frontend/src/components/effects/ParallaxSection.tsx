import React, { ReactNode } from 'react';

interface ParallaxSectionProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
    children,
    speed = 0.5,
    className = ''
}) => {
    const [offset, setOffset] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            setOffset(window.pageYOffset);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const transform = `translateY(${offset * speed}px)`;

    return (
        <div
            className={className}
            style={{
                transform,
                transition: 'transform 0.1s ease-out',
            }}
        >
            {children}
        </div>
    );
};

export default ParallaxSection;
