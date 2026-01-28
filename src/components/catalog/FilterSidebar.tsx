'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface FilterOption {
    id: string;
    label: string;
    count?: number;
}

interface FilterGroup {
    id: string;
    label: string;
    options: FilterOption[];
}

interface FilterSidebarProps {
    filters: FilterGroup[];
    activeFilters: Record<string, string[]>;
    onFilterChange: (groupId: string, optionId: string) => void;
    onClearAll: () => void;
    isOpen: boolean;
    onToggle: () => void;
}

export function FilterSidebar({
    filters,
    activeFilters,
    onFilterChange,
    onClearAll,
    isOpen,
    onToggle,
}: FilterSidebarProps) {
    const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>(
        Object.fromEntries(filters.map((f) => [f.id, true]))
    );

    const totalActiveFilters = Object.values(activeFilters).reduce(
        (acc, arr) => acc + arr.length,
        0
    );

    const toggleGroup = (groupId: string) => {
        setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={onToggle}
                className="lg:hidden fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-2xl flex items-center gap-2"
            >
                <SlidersHorizontal className="h-5 w-5" />
                {totalActiveFilters > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {totalActiveFilters}
                    </span>
                )}
            </button>

            {/* Sidebar */}
            <AnimatePresence>
                {(isOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
                    <>
                        {/* Mobile Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onToggle}
                            className="lg:hidden fixed inset-0 bg-black/80 z-40"
                        />

                        {/* Filter Panel */}
                        <motion.aside
                            initial={{ x: -300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed lg:sticky top-0 lg:top-24 left-0 h-full lg:h-auto w-80 lg:w-64 bg-card lg:bg-transparent z-50 lg:z-auto overflow-y-auto lg:overflow-visible p-6 lg:p-0"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold uppercase tracking-wide flex items-center gap-2">
                                    <SlidersHorizontal className="h-5 w-5 text-primary" />
                                    Filters
                                </h3>
                                <div className="flex items-center gap-2">
                                    {totalActiveFilters > 0 && (
                                        <button
                                            onClick={onClearAll}
                                            className="text-xs text-primary hover:underline uppercase tracking-wide"
                                        >
                                            Clear All
                                        </button>
                                    )}
                                    <button
                                        onClick={onToggle}
                                        className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Filter Groups */}
                            <div className="space-y-6">
                                {filters.map((group) => (
                                    <div key={group.id} className="border-b border-white/10 pb-6">
                                        <button
                                            onClick={() => toggleGroup(group.id)}
                                            className="w-full flex items-center justify-between mb-4 group"
                                        >
                                            <span className="text-sm font-medium uppercase tracking-wide">
                                                {group.label}
                                            </span>
                                            <ChevronDown
                                                className={`h-4 w-4 text-white/50 transition-transform ${expandedGroups[group.id] ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </button>

                                        <AnimatePresence>
                                            {expandedGroups[group.id] && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="space-y-2 overflow-hidden"
                                                >
                                                    {group.options.map((option) => {
                                                        const isActive = activeFilters[group.id]?.includes(
                                                            option.id
                                                        );
                                                        return (
                                                            <label
                                                                key={option.id}
                                                                className="flex items-center gap-3 cursor-pointer group/option"
                                                            >
                                                                <div
                                                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${isActive
                                                                            ? 'bg-primary border-primary'
                                                                            : 'border-white/30 group-hover/option:border-white/60'
                                                                        }`}
                                                                >
                                                                    {isActive && (
                                                                        <motion.svg
                                                                            initial={{ scale: 0 }}
                                                                            animate={{ scale: 1 }}
                                                                            className="w-3 h-3 text-primary-foreground"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={3}
                                                                                d="M5 13l4 4L19 7"
                                                                            />
                                                                        </motion.svg>
                                                                    )}
                                                                </div>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isActive}
                                                                    onChange={() =>
                                                                        onFilterChange(group.id, option.id)
                                                                    }
                                                                    className="sr-only"
                                                                />
                                                                <span className="text-sm text-white/70 group-hover/option:text-white transition-colors flex-1">
                                                                    {option.label}
                                                                </span>
                                                                {option.count !== undefined && (
                                                                    <span className="text-xs text-white/40">
                                                                        ({option.count})
                                                                    </span>
                                                                )}
                                                            </label>
                                                        );
                                                    })}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
