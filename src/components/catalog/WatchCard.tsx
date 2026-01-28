'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Watch } from '@/core/types/catalog';
import { useCartStore } from '@/store/cart';
import { useToast } from '@/components/ui/Toast';
import { useSettingsStore } from '@/store/settings';

interface WatchCardProps {
    watch: Watch;
    index: number;
}

/**
 * WatchCard: Premium product card with link to detail page.
 * Compact sizing optimized for grid layouts.
 */
export function WatchCard({ watch, index }: WatchCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const { showToast } = useToast();
    const locale = useSettingsStore((state) => state.locale);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation();
        addItem(watch);
        showToast({
            type: 'success',
            message: `${watch.model} added to cart`,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
                duration: 0.5,
                delay: Math.min(index * 0.05, 0.3),
                ease: [0.16, 1, 0.3, 1]
            }}
        >
            <Link
                href={`/${locale}/product/${watch.id}`}
                className={cn("glass-card group overflow-hidden block cursor-pointer")}
            >
                {/* Image Container - Compact aspect ratio */}
                <div className="relative aspect-square overflow-hidden bg-neutral-900/50">
                    <Image
                        src={watch.images[0]?.url || '/images/watches/submariner.jpg'}
                        alt={watch.images[0]?.alt || watch.model}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        priority={index < 4}
                    />

                    {/* Hover Overlay with Actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-4 gap-2">
                        {/* View Details */}
                        <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-xs uppercase tracking-widest rounded-full flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <Eye className="h-3 w-3" />
                            View Details
                        </span>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 hover:bg-primary/90"
                        >
                            <ShoppingBag className="h-3 w-3" />
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Info - Compact padding */}
                <div className="p-3 sm:p-4 space-y-1">
                    <div>
                        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white/60 font-medium">
                            {watch.brand}
                        </p>
                        <h3 className="text-sm sm:text-base font-semibold mt-0.5 tracking-tight text-white/95 line-clamp-1">
                            {watch.model}
                        </h3>
                    </div>

                    <div className="flex justify-between items-end pt-1">
                        <p className="text-base sm:text-lg font-medium text-white/90">
                            {watch.price.formatted}
                        </p>
                        <p className="text-[8px] sm:text-[9px] uppercase text-white/40 tracking-wider">
                            {watch.movement || 'Quartz'}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
