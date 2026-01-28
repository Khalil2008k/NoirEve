'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';
import { useCatalog } from '@/hooks/useCatalog';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SortDropdown } from '@/components/catalog/SortDropdown';
import { WatchCard } from '@/components/catalog/WatchCard';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/store/settings';
import type { Dictionary } from '@/core/types/dictionary';
import type { Watch } from '@/core/types/catalog';

const ITEMS_PER_PAGE = 8;

const filterGroups = [
    {
        id: 'brand',
        label: 'Brand',
        options: [
            { id: 'casio', label: 'Casio' },
            { id: 'citizen', label: 'Citizen' },
            { id: 'police', label: 'Police' },
            { id: 'leecooper', label: 'Lee Cooper' },
            { id: 'omega', label: 'Omega' },
            { id: 'rolex', label: 'Rolex' },
        ],
    },
    {
        id: 'price',
        label: 'Price Range',
        options: [
            { id: '0-500', label: 'Under $500' },
            { id: '500-1000', label: '$500 - $1,000' },
            { id: '1000-5000', label: '$1,000 - $5,000' },
            { id: '5000+', label: '$5,000+' },
        ],
    },
    {
        id: 'movement',
        label: 'Movement',
        options: [
            { id: 'automatic', label: 'Automatic' },
            { id: 'quartz', label: 'Quartz' },
            { id: 'manual', label: 'Manual' },
        ],
    },
];

const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'newest', label: 'Newest' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
];

export default function MenPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = React.use(params);
    const { data: watches } = useCatalog();
    const [dict, setDict] = React.useState<Dictionary | null>(null);
    const [activeFilters, setActiveFilters] = React.useState<Record<string, string[]>>({});
    const [activeSort, setActiveSort] = React.useState('featured');
    const [currentPage, setCurrentPage] = React.useState(1);
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    React.useEffect(() => {
        getDictionary(locale).then(setDict);
    }, [locale]);

    if (!dict) return null;

    // Filter watches
    const menWatches = watches?.filter((w) => w.category === 'Men') || [];

    // Apply filters
    let filteredWatches = [...menWatches];

    if (activeFilters.brand?.length) {
        filteredWatches = filteredWatches.filter((w) =>
            activeFilters.brand.some((b) => w.brand.toLowerCase().includes(b))
        );
    }

    if (activeFilters.price?.length) {
        filteredWatches = filteredWatches.filter((w) => {
            const price = w.price.amount;
            return activeFilters.price.some((range) => {
                if (range === '0-500') return price < 500;
                if (range === '500-1000') return price >= 500 && price < 1000;
                if (range === '1000-5000') return price >= 1000 && price < 5000;
                if (range === '5000+') return price >= 5000;
                return true;
            });
        });
    }

    if (activeFilters.movement?.length) {
        filteredWatches = filteredWatches.filter((w) =>
            activeFilters.movement.some((m) => w.movement?.toLowerCase() === m)
        );
    }

    // Apply sorting
    const sortedWatches = [...filteredWatches].sort((a, b) => {
        switch (activeSort) {
            case 'price-low':
                return a.price.amount - b.price.amount;
            case 'price-high':
                return b.price.amount - a.price.amount;
            default:
                return 0;
        }
    });

    // Pagination
    const totalPages = Math.ceil(sortedWatches.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedWatches = sortedWatches.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleFilterChange = (groupId: string, optionId: string) => {
        setActiveFilters((prev) => {
            const current = prev[groupId] || [];
            const isActive = current.includes(optionId);
            return {
                ...prev,
                [groupId]: isActive
                    ? current.filter((id) => id !== optionId)
                    : [...current, optionId],
            };
        });
        setCurrentPage(1); // Reset to page 1 on filter change
    };

    const clearAllFilters = () => {
        setActiveFilters({});
        setCurrentPage(1);
    };

    const totalActiveFilters = Object.values(activeFilters).reduce(
        (acc, arr) => acc + arr.length,
        0
    );

    return (
        <>
            <Header dict={dict} locale={locale} />

            {/* Compact Hero Banner */}
            <section className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="container-sovereign relative z-10 h-full flex flex-col justify-end pb-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-1">
                            Curated for Him
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight">
                            Men&apos;s Collection
                        </h1>
                        <p className="text-sm text-white/50 mt-1">
                            {sortedWatches.length} timepieces available
                        </p>
                    </motion.div>
                </div>
            </section>

            <main className="min-h-screen pb-24 bg-background">
                <div className="container-sovereign">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between py-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <Filter className="h-4 w-4" />
                                Filters
                                {totalActiveFilters > 0 && (
                                    <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                                        {totalActiveFilters}
                                    </span>
                                )}
                            </button>
                            <span className="text-xs text-white/40 hidden sm:inline">
                                Page {currentPage} of {totalPages}
                            </span>
                        </div>
                        <SortDropdown
                            options={sortOptions}
                            activeSort={activeSort}
                            onSortChange={setActiveSort}
                        />
                    </div>

                    {/* Active Filters Tags */}
                    {totalActiveFilters > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="flex flex-wrap gap-2 py-3"
                        >
                            {Object.entries(activeFilters).map(([groupId, optionIds]) =>
                                optionIds.map((optionId) => {
                                    const group = filterGroups.find((g) => g.id === groupId);
                                    const option = group?.options.find((o) => o.id === optionId);
                                    return (
                                        <button
                                            key={`${groupId}-${optionId}`}
                                            onClick={() => handleFilterChange(groupId, optionId)}
                                            className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/20 text-primary text-xs rounded-full hover:bg-primary/30 transition-colors"
                                        >
                                            {option?.label}
                                            <X className="h-3 w-3" />
                                        </button>
                                    );
                                })
                            )}
                            <button
                                onClick={clearAllFilters}
                                className="text-xs text-white/50 hover:text-white underline underline-offset-2"
                            >
                                Clear all
                            </button>
                        </motion.div>
                    )}

                    {/* Product Grid */}
                    <div className="py-6">
                        {paginatedWatches.length > 0 ? (
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
                            >
                                {paginatedWatches.map((watch, index) => (
                                    <WatchCard key={watch.id} watch={watch} index={index} />
                                ))}
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <p className="text-lg text-white/50 mb-4">No watches match your filters</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest rounded-lg hover:scale-105 transition-transform"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 py-8 border-t border-white/10">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="flex items-center gap-1 px-3 py-2 text-sm text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-white/60 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-1 px-3 py-2 text-sm text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Filter Drawer */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsFilterOpen(false)}
                                className="fixed inset-0 bg-black/60 z-40"
                            />
                            {/* Drawer */}
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r border-white/10 z-50 overflow-y-auto"
                            >
                                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                                    <h2 className="text-lg font-bold uppercase tracking-wider">Filters</h2>
                                    <button
                                        onClick={() => setIsFilterOpen(false)}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="p-4 space-y-6">
                                    {filterGroups.map((group) => (
                                        <div key={group.id}>
                                            <h3 className="text-xs uppercase tracking-widest text-white/50 mb-3">
                                                {group.label}
                                            </h3>
                                            <div className="space-y-2">
                                                {group.options.map((option) => {
                                                    const isActive = activeFilters[group.id]?.includes(option.id);
                                                    return (
                                                        <label
                                                            key={option.id}
                                                            className="flex items-center gap-3 cursor-pointer group"
                                                        >
                                                            <div
                                                                className={`w-4 h-4 rounded border transition-colors ${isActive
                                                                        ? 'bg-primary border-primary'
                                                                        : 'border-white/30 group-hover:border-white/50'
                                                                    }`}
                                                            >
                                                                {isActive && (
                                                                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24">
                                                                        <path
                                                                            fill="currentColor"
                                                                            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                                                                        />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                            <span
                                                                className={`text-sm ${isActive ? 'text-white' : 'text-white/60'
                                                                    }`}
                                                                onClick={() => handleFilterChange(group.id, option.id)}
                                                            >
                                                                {option.label}
                                                            </span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t border-white/10">
                                    <button
                                        onClick={() => {
                                            clearAllFilters();
                                            setIsFilterOpen(false);
                                        }}
                                        className="w-full py-2.5 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </main>

            <Footer locale={locale} />
        </>
    );
}
