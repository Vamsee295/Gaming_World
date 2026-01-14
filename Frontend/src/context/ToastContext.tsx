import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Toast from '@/components/ui/Toast';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    duration?: number;
}

interface ToastContextType {
    showToast: (type: ToastType, title: string, description?: string, duration?: number) => void;
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    warning: (title: string, description?: string) => void;
    info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback((
        type: ToastType,
        title: string,
        description?: string,
        duration: number = 3000
    ) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast: ToastMessage = { id, type, title, description, duration };

        setToasts((prev) => [...prev, newToast]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, [removeToast]);

    const success = useCallback((title: string, description?: string) => {
        showToast('success', title, description);
    }, [showToast]);

    const error = useCallback((title: string, description?: string) => {
        showToast('error', title, description);
    }, [showToast]);

    const warning = useCallback((title: string, description?: string) => {
        showToast('warning', title, description);
    }, [showToast]);

    const info = useCallback((title: string, description?: string) => {
        showToast('info', title, description);
    }, [showToast]);

    return (
        <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
            {children}
            <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            toast={toast}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};
