import React from 'react';
import { motion } from 'framer-motion';
import Card3D from './Card3D';
import useDynamicColors from '@/hooks/useDynamicColors';

interface DynamicGameCardProps {
    children: React.ReactNode;
    image: any;
    className?: string;
}

export const DynamicGameCard: React.FC<DynamicGameCardProps> = ({
    children,
    image,
    className = '',
}) => {
    const colors = useDynamicColors(image.src || image);

    return (
        <Card3D className={className} intensity={10}>
            <motion.div
                className="relative"
                style={{
                    boxShadow: `0 10px 40px ${colors.glow}, 0 0 20px ${colors.glow}`,
                }}
                whileHover={{
                    boxShadow: `0 15px 60px ${colors.glow}, 0 0 30px ${colors.glow}`,
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Dynamic glow accent border */}
                <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
                        filter: 'blur(20px)',
                        zIndex: -1,
                    }}
                />
                {children}
            </motion.div>
        </Card3D>
    );
};

export default DynamicGameCard;
