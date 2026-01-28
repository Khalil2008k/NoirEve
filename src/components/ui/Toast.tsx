'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, ShoppingBag, AlertCircle } from 'lucide-react';

interface Toast {
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
    duration?: number;
}

interface ToastContextType {
    showToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

export function useToast() {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    const showToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { ...toast, id }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, toast.duration || 4000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {typeof window !== 'undefined' &&
                createPortal(
                    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
                        <AnimatePresence>
                            {toasts.map((toast) => (
                                <motion.div
                                    key={toast.id}
                                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 100, scale: 0.9 }}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl border backdrop-blur-lg min-w-[300px] ${toast.type === 'success'
                                            ? 'bg-green-900/90 border-green-500/30 text-green-100'
                                            : toast.type === 'error'
                                                ? 'bg-red-900/90 border-red-500/30 text-red-100'
                                                : 'bg-card border-white/10 text-white'
                                        }`}
                                >
                                    {toast.type === 'success' && (
                                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                                    )}
                                    {toast.type === 'error' && (
                                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                                    )}
                                    {toast.type === 'info' && (
                                        <ShoppingBag className="h-5 w-5 text-primary flex-shrink-0" />
                                    )}
                                    <span className="flex-1 text-sm">{toast.message}</span>
                                    <button
                                        onClick={() => removeToast(toast.id)}
                                        className="p-1 hover:bg-white/10 rounded transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>,
                    document.body
                )}
        </ToastContext.Provider>
    );
}
