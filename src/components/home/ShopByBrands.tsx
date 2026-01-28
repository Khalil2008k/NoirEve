'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/store/settings';

interface Brand {
    id: string;
    name: string;
    imageSrc: string;
    discount: string;
}

const brands: Brand[] = [
    { id: 'casio', name: 'CASIO', imageSrc: '/images/brand-casio.jpg', discount: 'Upto 20% off' },
    { id: 'police', name: 'POLICE', imageSrc: '/images/brand-police.jpg', discount: 'Upto 20% off' },
    { id: 'omega', name: 'OMEGA', imageSrc: '/images/lifestyle-men.jpg', discount: 'Upto 15% off' },
    { id: 'rolex', name: 'ROLEX', imageSrc: '/images/lifestyle-women.jpg', discount: 'Upto 10% off' },
    { id: 'cartier', name: 'CARTIER', imageSrc: '/images/brand-casio.jpg', discount: 'Upto 20% off' },
];

interface ShopByBrandsProps {
    locale: Locale;
}

/**
 * ShopByBrands: Brand cards with lifestyle images and discount labels.
 * Features hover animations and brand name overlays.
 */
export function ShopByBrands({ locale }: ShopByBrandsProps) {
    return (
        <section className="py-16 bg-card">
            <div className="container-sovereign">
                <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">
                    Shop by Brands
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {brands.map((brand, index) => (
                        <motion.div
                            key={brand.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={`/${locale}/brands?brand=${brand.id}`}
                                className="block relative group overflow-hidden rounded-lg aspect-[3/4]"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${brand.imageSrc})` }}
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

                                {/* Brand Name Label */}
                                <div className="absolute top-0 left-0 right-0 px-4 py-3 bg-[#B8A988]">
                                    <p className="text-sm font-bold uppercase tracking-widest text-white">
                                        {brand.name}
                                    </p>
                                </div>

                                {/* Discount Label */}
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-sm font-bold text-primary">
                                        {brand.discount}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
