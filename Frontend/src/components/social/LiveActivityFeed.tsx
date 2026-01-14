import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, TrendingUp, Users, Award } from 'lucide-react';

interface Activity {
    id: string;
    type: 'purchase' | 'review' | 'wishlist' | 'achievement' | 'friend';
    user: string;
    game?: string;
    timestamp: Date;
    avatar?: string;
}

const LiveActivityFeed: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isVisible, setIsVisible] = useState(true);

    // Simulate live activities
    useEffect(() => {
        const sampleGames = [
            'Cyberpunk 2077',
            'GTA VI',
            'Black Myth Wukong',
            'Need For Speed',
            'The Last Of Us',
            'Detroit: Become Human'
        ];

        const sampleUsers = [
            'Alex_Gaming',
            'Sarah_Pro',
            'Mike_Player',
            'Emma_Gamer',
            'John_Elite',
            'Lisa_Quest'
        ];

        const activityTypes: Activity['type'][] = ['purchase', 'review', 'wishlist', 'achievement', 'friend'];

        const generateActivity = (): Activity => {
            const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
            return {
                id: Math.random().toString(36).substr(2, 9),
                type,
                user: sampleUsers[Math.floor(Math.random() * sampleUsers.length)],
                game: type !== 'friend' ? sampleGames[Math.floor(Math.random() * sampleGames.length)] : undefined,
                timestamp: new Date(),
            };
        };

        const interval = setInterval(() => {
            const newActivity = generateActivity();
            setActivities(prev => [newActivity, ...prev.slice(0, 4)]); // Keep only last 5
        }, 8000); // New activity every 8 seconds

        // Initial activities
        setActivities([
            generateActivity(),
            generateActivity(),
        ]);

        return () => clearInterval(interval);
    }, []);

    const getIcon = (type: Activity['type']) => {
        switch (type) {
            case 'purchase':
                return <ShoppingCart className="h-4 w-4" />;
            case 'wishlist':
                return <Heart className="h-4 w-4" />;
            case 'review':
                return <Star className="h-4 w-4" />;
            case 'achievement':
                return <Award className="h-4 w-4" />;
            case 'friend':
                return <Users className="h-4 w-4" />;
        }
    };

    const getMessage = (activity: Activity) => {
        switch (activity.type) {
            case 'purchase':
                return `${activity.user} just purchased ${activity.game}`;
            case 'wishlist':
                return `${activity.user} added ${activity.game} to wishlist`;
            case 'review':
                return `${activity.user} reviewed ${activity.game}`;
            case 'achievement':
                return `${activity.user} unlocked an achievement in ${activity.game}`;
            case 'friend':
                return `${activity.user} joined the community`;
        }
    };

    const getColor = (type: Activity['type']) => {
        switch (type) {
            case 'purchase':
                return 'text-green-500';
            case 'wishlist':
                return 'text-pink-500';
            case 'review':
                return 'text-yellow-500';
            case 'achievement':
                return 'text-purple-500';
            case 'friend':
                return 'text-blue-500';
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-24 left-6 z-40 w-80 hidden lg:block">
            <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg shadow-xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Live Activity</h3>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-muted-foreground hover:text-foreground transition-colors text-xs"
                    >
                        Hide
                    </button>
                </div>

                <div className="space-y-2">
                    <AnimatePresence mode="popLayout">
                        {activities.map((activity) => (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, x: -50, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: 'auto' }}
                                exit={{ opacity: 0, x: -50, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-start gap-2 p-2 bg-secondary/50 rounded-md"
                            >
                                <div className={`mt-0.5 ${getColor(activity.type)}`}>
                                    {getIcon(activity.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-foreground leading-relaxed">
                                        {getMessage(activity)}
                                    </p>
                                    <span className="text-[10px] text-muted-foreground">Just now</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default LiveActivityFeed;
