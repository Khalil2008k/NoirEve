'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/store/settings';

const collections = [
    {
        id: 'dress',
        name: 'Dress',
        subtitle: 'Elegance Defined',
        href: '/brands?style=dress',
    },
    {
        id: 'sport',
        name: 'Sport',
        subtitle: 'Built to Perform',
        href: '/brands?style=sport',
    },
    {
        id: 'vintage',
        name: 'Vintage',
        subtitle: 'Timeless Heritage',
        href: '/brands?style=vintage',
    },
    {
        id: 'limited',
        name: 'Limited',
        subtitle: 'Rare & Exclusive',
        href: '/brands?style=limited',
    },
];

interface CollectionsGridProps {
    locale: Locale;
}

/**
 * CollectionsGrid: Noir-themed collection cards.
 * Elegant dark design with red accent hover states.
 */
export function CollectionsGrid({ locale }: CollectionsGridProps) {
    return (
        <section className="py-20 bg-black/30">
            <div className="container-sovereign">
                <div className="text-center mb-12">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-3">
                        Curated Selection
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">
                        Collections
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {collections.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            <Link
                                href={`/${locale}${collection.href}`}
                                className="group block relative overflow-hidden"
                            >
                                <div className="relative border border-white/10 bg-white/[0.02] rounded-sm aspect-[4/5] flex flex-col justify-end p-6 transition-all duration-700 group-hover:border-primary/40 group-hover:bg-white/[0.04]">
                                    {/* Large Background Letter */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-black text-white/[0.03] uppercase select-none pointer-events-none group-hover:text-white/[0.06] transition-colors duration-700">
                                        {collection.name.charAt(0)}
                                    </div>

                                    {/* Corner accent */}
                                    <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/10 group-hover:border-primary/50 transition-colors duration-500" />
                                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/10 group-hover:border-primary/50 transition-colors duration-500" />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold uppercase tracking-wider text-white mb-1 group-hover:text-primary transition-colors duration-500">
                                            {collection.name}
                                        </h3>
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/40 group-hover:text-white/60 transition-colors duration-500">
                                            {collection.subtitle}
                                        </p>
                                    </div>

                                    {/* Bottom line accent */}
                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
