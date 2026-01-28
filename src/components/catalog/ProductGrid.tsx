'use client';

import React from 'react';
import { WatchCard } from './WatchCard';
import type { Watch } from '@/core/types/catalog';

interface ProductGridProps {
    title: string;
    watches: Watch[];
}

export function ProductGrid({ title, watches }: ProductGridProps) {
    return (
        <section className="py-24 bg-background min-h-screen">
            <div className="container-sovereign">
                <div className="flex justify-between items-end mb-12">
                    <h1 className="text-4xl font-bold tracking-tight uppercase text-foreground">
                        {title}
                    </h1>
                    <p className="text-muted-foreground uppercase tracking-widest text-sm">
                        {watches.length} ITEMS
                    </p>
                </div>

                {watches.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {watches.map((watch, index) => (
                            <WatchCard key={watch.id} watch={watch} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-muted-foreground/50">
                        <p className="text-xl uppercase tracking-widest">No Timepieces Found</p>
                    </div>
                )}
            </div>
        </section>
    );
}
