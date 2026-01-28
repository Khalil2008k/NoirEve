'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/store/settings';

const priceRanges = [
    { max: 99, label: '99' },
    { max: 199, label: '199' },
    { max: 399, label: '399' },
    { max: 599, label: '599' },
    { max: 999, label: '999' },
];

interface ShopByPriceProps {
    locale: Locale;
}

/**
 * ShopByPrice: Noir-themed price range filter.
 * Elegant dark cards with red accent borders.
 */
export function ShopByPrice({ locale }: ShopByPriceProps) {
    return (
        <section className="py-16">
            <div className="container-sovereign">
                <div className="text-center mb-10">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-3">
                        Filter by Budget
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
                        Shop by Price
                    </h2>
                </div>

                <div className="grid grid-cols-5 gap-3 md:gap-5">
                    {priceRanges.map((range, index) => (
                        <motion.div
                            key={range.max}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08, duration: 0.5 }}
                        >
                            <Link
                                href={`/${locale}/brands?maxPrice=${range.max}`}
                                className="group block"
                            >
                                <div className="relative overflow-hidden rounded-sm border border-white/10 bg-white/[0.02] backdrop-blur-sm aspect-[3/4] flex flex-col justify-center items-center transition-all duration-500 group-hover:border-primary/60 group-hover:bg-white/[0.05]">
                                    {/* Top accent line */}
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Content */}
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium mb-2">
                                        Under
                                    </p>
                                    <div className="flex items-start">
                                        <span className="text-sm text-primary font-bold mr-1">$</span>
                                        <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                                            {range.label}
                                        </span>
                                    </div>

                                    {/* Bottom accent */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-primary/50 transition-all duration-500" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
