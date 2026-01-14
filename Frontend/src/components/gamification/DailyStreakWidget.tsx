import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Calendar } from 'lucide-react';

interface DailyStreakWidgetProps {
    currentStreak: number;
    longestStreak: number;
    lastActive?: Date;
}

const DailyStreakWidget: React.FC<DailyStreakWidgetProps> = ({
    currentStreak,
    longestStreak,
    lastActive,
}) => {
    const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const today = new Date().getDay();

    // Calculate which days are part of the current streak
    const getStreakDays = () => {
        const days = new Array(7).fill(false);
        for (let i = 0; i < Math.min(currentStreak, 7); i++) {
            const dayIndex = (today - i + 7) % 7;
            days[dayIndex] = true;
        }
        return days;
    };

    const streakDays = getStreakDays();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <Flame className="h-6 w-6 text-orange-500" />
                    </motion.div>
                    <h3 className="font-semibold text-foreground">Daily Streak</h3>
                </div>
                <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="flex items-end gap-1 mb-4">
                <motion.span
                    key={currentStreak}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-bold text-foreground"
                >
                    {currentStreak}
                </motion.span>
                <span className="text-muted-foreground mb-2 ml-1">days</span>
            </div>

            {/* Week view */}
            <div className="flex items-center justify-between mb-4">
                {daysOfWeek.map((day, index) => {
                    const isActive = streakDays[index];
                    const isToday = index === today;

                    return (
                        <motion.div
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex flex-col items-center gap-1"
                        >
                            <span className="text-xs text-muted-foreground">{day}</span>
                            <motion.div
                                animate={isActive && isToday ? {
                                    scale: [1, 1.1, 1],
                                    boxShadow: [
                                        '0 0 0 0 rgba(249, 115, 22, 0.4)',
                                        '0 0 0 8px rgba(249, 115, 22, 0)',
                                    ],
                                } : {}}
                                transition={isActive && isToday ? {
                                    duration: 2,
                                    repeat: Infinity,
                                } : {}}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isActive
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-secondary text-muted-foreground'
                                    } ${isToday ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-background' : ''}`}
                            >
                                {isActive && (
                                    <Flame className="h-4 w-4" />
                                )}
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Best streak:</span>
                <span className="font-semibold text-foreground flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    {longestStreak} days
                </span>
            </div>

            {currentStreak > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20"
                >
                    <p className="text-xs text-center text-foreground">
                        🎉 You're on fire! Come back tomorrow to continue your streak!
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
};

export default DailyStreakWidget;
