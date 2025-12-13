import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './button';
import { useSound } from '@/context/SoundContext';
import { motion } from 'framer-motion';

export const SoundToggle: React.FC = () => {
    const { enabled, toggleSound } = useSound();

    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleSound}
                className="relative group"
                aria-label={enabled ? 'Mute sounds' : 'Enable sounds'}
            >
                {enabled ? (
                    <Volume2 className="h-5 w-5 text-primary" />
                ) : (
                    <VolumeX className="h-5 w-5 text-muted-foreground" />
                )}
                {/* Tooltip */}
                <span className="absolute bottom-full mb-2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {enabled ? 'Sounds On' : 'Sounds Off'}
                </span>
            </Button>
        </motion.div>
    );
};

export default SoundToggle;
