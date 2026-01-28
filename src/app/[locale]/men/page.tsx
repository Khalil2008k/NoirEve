'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCatalog } from '@/hooks/useCatalog';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CollectionHero } from '@/components/catalog/CollectionHero';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { SortDropdown } from '@/components/catalog/SortDropdown';
import { WatchCard } from '@/components/catalog/WatchCard';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/store/settings';
import type { Dictionary } from '@/core/types/dictionary';
import type { Watch } from '@/core/types/catalog';

const filterGroups = [
    {
        id: 'brand',
        label: 'Brand',
        options: [
            { id: 'casio', label: 'Casio' },
            { id: 'citizen', label: 'Citizen' },
            { id: 'police', label: 'Police' },
            { id: 'leecooper', label: 'Lee Cooper' },
        ],
    },
    {
        id: 'price',
        label: 'Price Range',
        options: [
            { id: '0-500', label: 'Under $500' },
            { id: '500-1000', label: '$500 - $1,000' },
            { id: '1000-2000', label: '$1,000 - $2,000' },
            { id: '2000+', label: '$2,000+' },
        ],
    },
    {
        id: 'style',
        label: 'Style',
        options: [
            { id: 'classic', label: 'Classic' },
            { id: 'sport', label: 'Sport' },
            { id: 'luxury', label: 'Luxury' },
            { id: 'casual', label: 'Casual' },
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
                if (range === '1000-2000') return price >= 1000 && price < 2000;
                if (range === '2000+') return price >= 2000;
                return true;
            });
        });
    }

    // Apply sorting
    const sortedWatches = [...filteredWatches].sort((a, b) => {
        switch (activeSort) {
            case 'price-low':
                return a.price.amount - b.price.amount;
            case 'price-high':
                return b.price.amount - a.price.amount;
            case 'name-az':
                return a.model.localeCompare(b.model);
            case 'name-za':
                return b.model.localeCompare(a.model);
            default:
                return 0;
        }
    });

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
    };

    const clearAllFilters = () => {
        setActiveFilters({});
    };

    const totalActiveFilters = Object.values(activeFilters).reduce(
        (acc, arr) => acc + arr.length,
        0
    );

    return (
        <>
            <Header dict={dict} locale={locale} />

            {/* Hero Banner */}
            <CollectionHero
                title="Men's Collection"
                subtitle="Curated for Him"
                backgroundImage="/images/lifestyle-men.jpg"
                itemCount={sortedWatches.length}
            />

            <main className="min-h-screen pb-24 bg-background">
                <div className="container-sovereign">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between py-6 border-b border-white/10">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="lg:hidden flex items-center gap-2 text-sm text-white/70 hover:text-white"
                            >
                                Filters
                                {totalActiveFilters > 0 && (
                                    <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                                        {totalActiveFilters}
                                    </span>
                                )}
                            </button>
                            <p className="text-sm text-white/50 hidden md:block">
                                Showing {sortedWatches.length} of {menWatches.length} timepieces
                            </p>
                        </div>
                        <SortDropdown
                            options={sortOptions}
                            activeSort={activeSort}
                            onSortChange={setActiveSort}
                        />
                    </div>

                    {/* Active Filters */}
                    {totalActiveFilters > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="flex flex-wrap gap-2 py-4"
                        >
                            {Object.entries(activeFilters).map(([groupId, optionIds]) =>
                                optionIds.map((optionId) => {
                                    const group = filterGroups.find((g) => g.id === groupId);
                                    const option = group?.options.find((o) => o.id === optionId);
                                    return (
                                        <button
                                            key={`${groupId}-${optionId}`}
                                            onClick={() => handleFilterChange(groupId, optionId)}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-primary/20 text-primary text-sm rounded-full hover:bg-primary/30 transition-colors"
                                        >
                                            {option?.label}
                                            <span className="text-xs">×</span>
                                        </button>
                                    );
                                })
                            )}
                            <button
                                onClick={clearAllFilters}
                                className="text-sm text-white/50 hover:text-white underline underline-offset-2"
                            >
                                Clear all
                            </button>
                        </motion.div>
                    )}

                    {/* Content Grid */}
                    <div className="flex gap-8 pt-8">
                        {/* Sidebar - Desktop */}
                        <div className="hidden lg:block w-64 flex-shrink-0">
                            <FilterSidebar
                                filters={filterGroups}
                                activeFilters={activeFilters}
                                onFilterChange={handleFilterChange}
                                onClearAll={clearAllFilters}
                                isOpen={isFilterOpen}
                                onToggle={() => setIsFilterOpen(!isFilterOpen)}
                            />
                        </div>

                        {/* Product Grid */}
                        <div className="flex-1">
                            {sortedWatches.length > 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {sortedWatches.map((watch, index) => (
                                        <WatchCard key={watch.id} watch={watch} index={index} />
                                    ))}
                                </motion.div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-24 text-center">
                                    <p className="text-xl text-white/50 mb-4">No watches match your filters</p>
                                    <button
                                        onClick={clearAllFilters}
                                        className="px-6 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Sidebar */}
                <FilterSidebar
                    filters={filterGroups}
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                    onClearAll={clearAllFilters}
                    isOpen={isFilterOpen}
                    onToggle={() => setIsFilterOpen(!isFilterOpen)}
                />
            </main>

            <Footer locale={locale} />
        </>
    );
}
