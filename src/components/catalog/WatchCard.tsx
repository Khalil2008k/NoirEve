'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Watch } from '@/core/types/catalog';
import { useCartStore } from '@/store/cart';

interface WatchCardProps {
    watch: Watch;
    index: number;
}

/**
 * WatchCard: The Final Realization (Pass 4 Realization).
 * Implements high-fidelity glassmorphism, Framer Motion entrance, 
 * and responsive performance guards.
 */
export function WatchCard({ watch, index }: WatchCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1] // Custom luxury ease
            }}
            className={cn("glass-card group overflow-hidden")}
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900/50">
                <Image
                    src={watch.images[0].url}
                    alt={watch.images[0].alt}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    // In a real build, we'd use local placeholders as per Pass 4 Defense
                    priority={index < 4}
                />

                {/* Hover Action (Atomic Interaction Pass 2) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                        onClick={() => addItem(watch)}
                        className="px-6 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center space-x-2"
                    >
                        <ShoppingBag className="h-4 w-4" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold">
                            {watch.brand}
                        </p>
                        <h3 className="text-lg font-bold mt-1 tracking-tight text-white/95">
                            {watch.model}
                        </h3>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <p className="text-2xl font-light tracking-tighter text-white/80">
                        {watch.price.formatted}
                    </p>
                    <p className="text-[10px] uppercase text-white/50 tracking-widest pb-1 border-b border-white/10">
                        {watch.movement}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
