'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import type { Watch } from '@/core/types/catalog';
import type { Locale } from '@/store/settings';

interface ProductCarouselProps {
    title: string;
    products: Watch[];
    locale: Locale;
    viewAllHref?: string;
    autoScroll?: boolean;
    autoScrollInterval?: number; // in ms
    scrollOneByOne?: boolean;
}

/**
 * ProductCarousel: Horizontal scrolling product carousel with auto-scroll.
 * Features wishlist hearts, prices, and "Limited Stock" badges.
 * Now supports auto-scrolling with configurable timing.
 */
export function ProductCarousel({
    title,
    products,
    locale,
    viewAllHref,
    autoScroll = true,
    autoScrollInterval = 5000,
    scrollOneByOne = false
}: ProductCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll effect
    useEffect(() => {
        if (!autoScroll || products.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const nextIndex = (prev + 1) % products.length;
                if (scrollRef.current) {
                    const scrollAmount = scrollOneByOne ? 296 : 592; // 280px card + 16px gap, or 2 cards
                    scrollRef.current.scrollTo({
                        left: nextIndex * scrollAmount,
                        behavior: 'smooth',
                    });
                }
                return nextIndex;
            });
        }, autoScrollInterval);

        return () => clearInterval(interval);
    }, [autoScroll, autoScrollInterval, products.length, scrollOneByOne]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollOneByOne ? 296 : 592;
            const newIndex = direction === 'left'
                ? Math.max(0, currentIndex - 1)
                : Math.min(products.length - 1, currentIndex + 1);

            setCurrentIndex(newIndex);
            scrollRef.current.scrollTo({
                left: newIndex * scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="py-12 bg-background">
            <div className="container-sovereign">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold uppercase tracking-tight">
                        {title}
                    </h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="p-2 rounded-full border border-white/20 hover:border-primary hover:text-primary transition-colors"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-2 rounded-full border border-white/20 hover:border-primary hover:text-primary transition-colors"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Products Carousel */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-hidden pb-4"
                >
                    <AnimatePresence>
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex-shrink-0 w-[280px] group"
                            >
                                <Link href={`/${locale}/product/${product.id}`} className="block">
                                    {/* Product Image */}
                                    <div className="relative bg-card rounded-lg overflow-hidden aspect-square mb-3">
                                        {/* Wishlist Button */}
                                        <button
                                            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 hover:bg-primary transition-colors"
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
                                        >
                                            <Heart className="h-4 w-4 text-white" />
                                        </button>

                                        {/* Product Image */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={product.images?.[0]?.url || '/images/hero-1.png'}
                                                alt={product.model}
                                                className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-widest text-white/50">{product.brand}</p>
                                        <h3 className="text-sm font-medium text-white line-clamp-2 min-h-[2.5rem]">
                                            {product.model}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-white">
                                                {product.price.formatted}
                                            </span>
                                            {product.price.amount > 500 && (
                                                <span className="text-sm text-white/40 line-through">
                                                    ${Math.round(product.price.amount * 1.2).toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                        {index % 3 === 0 && (
                                            <p className="text-xs text-primary font-medium">Limited Stock</p>
                                        )}
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* View All Button */}
                {viewAllHref && (
                    <div className="text-center mt-6">
                        <Link
                            href={viewAllHref}
                            className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 hover:border-primary hover:text-primary transition-colors rounded-full text-sm uppercase tracking-widest"
                        >
                            View All
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
