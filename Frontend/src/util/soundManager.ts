class SoundManager {
    private sounds: Map<string, HTMLAudioElement> = new Map();
    private enabled: boolean = true;
    private volume: number = 0.3;

    constructor() {
        // Initialize sound effects
        this.loadSound('hover', '/sounds/hover.mp3');
        this.loadSound('click', '/sounds/click.mp3');
        this.loadSound('success', '/sounds/success.mp3');
        this.loadSound('error', '/sounds/error.mp3');
        this.loadSound('notification', '/sounds/notification.mp3');
        this.loadSound('purchase', '/sounds/purchase.mp3');
        this.loadSound('achievement', '/sounds/achievement.mp3');
    }

    private loadSound(name: string, path: string): void {
        try {
            const audio = new Audio(path);
            audio.volume = this.volume;
            audio.preload = 'auto';
            this.sounds.set(name, audio);
        } catch (error) {
            console.warn(`Failed to load sound: ${name}`, error);
        }
    }

    play(soundName: string): void {
        if (!this.enabled) return;

        const sound = this.sounds.get(soundName);
        if (sound) {
            // Clone the audio to allow multiple simultaneous plays
            const clone = sound.cloneNode() as HTMLAudioElement;
            clone.volume = this.volume;
            clone.play().catch(err => console.warn('Sound play failed:', err));
        }
    }

    setVolume(volume: number): void {
        this.volume = Math.max(0, Math.min(1, volume));
        this.sounds.forEach(sound => {
            sound.volume = this.volume;
        });
    }

    toggle(): void {
        this.enabled = !this.enabled;
    }

    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    isEnabled(): boolean {
        return this.enabled;
    }
}

// Create singleton instance
const soundManager = new SoundManager();

export default soundManager;

// React hook for easy usage
export const useSoundEffects = () => {
    return {
        playHover: () => soundManager.play('hover'),
        playClick: () => soundManager.play('click'),
        playSuccess: () => soundManager.play('success'),
        playError: () => soundManager.play('error'),
        playNotification: () => soundManager.play('notification'),
        playPurchase: () => soundManager.play('purchase'),
        playAchievement: () => soundManager.play('achievement'),
        setVolume: (volume: number) => soundManager.setVolume(volume),
        toggleSound: () => soundManager.toggle(),
        setEnabled: (enabled: boolean) => soundManager.setEnabled(enabled),
        isEnabled: () => soundManager.isEnabled(),
    };
};
