import { useEffect } from 'react';

interface KeyboardShortcut {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    action: () => void;
    description: string;
}

interface UseKeyboardShortcutsProps {
    shortcuts: KeyboardShortcut[];
    enabled?: boolean;
}

export const useKeyboardShortcuts = ({ shortcuts, enabled = true }: UseKeyboardShortcutsProps) => {
    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            for (const shortcut of shortcuts) {
                const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
                const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
                const altMatch = shortcut.alt ? event.altKey : !event.altKey;
                const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

                if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
                    event.preventDefault();
                    shortcut.action();
                    break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shortcuts, enabled]);
};

// Helper component to display available shortcuts
export const KeyboardShortcutsHelper: React.FC<{ shortcuts: KeyboardShortcut[] }> = ({ shortcuts }) => {
    return (
        <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <kbd className="px-2 py-1 bg-secondary rounded text-xs">?</kbd>
                Keyboard Shortcuts
            </h3>
            <div className="space-y-2">
                {shortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{shortcut.description}</span>
                        <div className="flex items-center gap-1">
                            {shortcut.ctrl && (
                                <kbd className="px-2 py-1 bg-secondary rounded text-xs">Ctrl</kbd>
                            )}
                            {shortcut.shift && (
                                <kbd className="px-2 py-1 bg-secondary rounded text-xs">Shift</kbd>
                            )}
                            {shortcut.alt && (
                                <kbd className="px-2 py-1 bg-secondary rounded text-xs">Alt</kbd>
                            )}
                            <kbd className="px-2 py-1 bg-secondary rounded text-xs uppercase">
                                {shortcut.key}
                            </kbd>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
