'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUpDown } from 'lucide-react';

interface SortOption {
    id: string;
    label: string;
}

interface SortDropdownProps {
    options: SortOption[];
    activeSort: string;
    onSortChange: (sortId: string) => void;
}

const defaultOptions: SortOption[] = [
    { id: 'featured', label: 'Featured' },
    { id: 'newest', label: 'Newest' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'name-az', label: 'Name: A-Z' },
    { id: 'name-za', label: 'Name: Z-A' },
];

export function SortDropdown({
    options = defaultOptions,
    activeSort,
    onSortChange,
}: SortDropdownProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const activeLabel = options.find((o) => o.id === activeSort)?.label || 'Sort By';

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            >
                <ArrowUpDown className="h-4 w-4 text-white/60" />
                <span className="text-sm">{activeLabel}</span>
                <ChevronDown
                    className={`h-4 w-4 text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-card border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50"
                    >
                        {options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => {
                                    onSortChange(option.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-3 text-left text-sm hover:bg-white/10 transition-colors flex items-center justify-between ${activeSort === option.id ? 'text-primary bg-primary/10' : 'text-white/80'
                                    }`}
                            >
                                {option.label}
                                {activeSort === option.id && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-2 h-2 rounded-full bg-primary"
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
