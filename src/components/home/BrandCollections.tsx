'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/store/settings';

interface BrandCollectionsProps {
    locale: Locale;
}

const brands = [
    {
        id: 'police',
        name: 'POLICE',
        tagline: 'Unapologetically Bold',
        description: 'Defying conventions since 1983. Italian craftsmanship meets edgy design.'
    },
    {
        id: 'ecstacy',
        name: 'ECSTACY',
        tagline: 'Where Elegance Speaks',
        description: 'Timeless sophistication for those who appreciate the finer things.'
    },
    {
        id: 'astro',
        name: 'ASTRO',
        tagline: 'Adventure Awaits',
        description: 'Fun, colorful timepieces that inspire young explorers to dream big.'
    },
    {
        id: 'leecooper',
        name: 'LEE COOPER',
        subtitle: 'LONDON ACCESSORIES',
        tagline: 'British Heritage',
        description: 'Classic British style reimagined for the modern trendsetter.'
    },
];

/**
 * BrandCollections: Hero lifestyle image with elegant text-only brand cards.
 * No product images - just beautiful typography and brand copy.
 */
export function BrandCollections({ locale }: BrandCollectionsProps) {
    return (
        <section className="py-16">
            <div className="container-sovereign">
                {/* Hero Section with Lifestyle Image */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[300px] md:h-[400px] mb-6 overflow-hidden rounded-lg"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('/images/collections-hero.png')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

                    <div className="relative z-10 h-full flex items-center p-8 md:p-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white italic underline underline-offset-8 decoration-1">
                            Collections
                        </h2>
                    </div>
                </motion.div>

                {/* Brand Cards - Text Only */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {brands.map((brand, index) => (
                        <motion.div
                            key={brand.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Link
                                href={`/${locale}/brands/${brand.id}`}
                                className="group block bg-white rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-full"
                            >
                                <div className="p-6 md:p-8 flex flex-col h-full min-h-[200px] md:min-h-[240px]">
                                    {/* Brand Name - 50% larger */}
                                    <div className="mb-4">
                                        <h3 className="text-2xl md:text-3xl font-black text-black tracking-wider group-hover:text-primary transition-colors">
                                            {brand.name}
                                        </h3>
                                        {brand.subtitle && (
                                            <p className="text-[10px] md:text-xs text-primary tracking-widest mt-1 font-medium">
                                                {brand.subtitle}
                                            </p>
                                        )}
                                    </div>

                                    {/* Tagline */}
                                    <p className="text-sm md:text-base font-semibold text-neutral-800 italic mb-2">
                                        {brand.tagline}
                                    </p>

                                    {/* Description */}
                                    <p className="text-xs md:text-sm text-neutral-500 leading-relaxed flex-grow">
                                        {brand.description}
                                    </p>

                                    {/* Explore Link */}
                                    <div className="mt-4 pt-4 border-t border-neutral-100">
                                        <span className="text-xs font-semibold text-primary uppercase tracking-widest group-hover:translate-x-1 inline-block transition-transform">
                                            Explore →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
