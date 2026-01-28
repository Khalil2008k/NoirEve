'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/store/settings';

interface BrandPromoProps {
    locale: Locale;
}

/**
 * BrandPromo: Lee Cooper eyewear lifestyle section.
 * Warm tones with editorial photography.
 */
export function BrandPromo({ locale }: BrandPromoProps) {
    return (
        <section className="py-16 bg-[#f5f0eb]">
            <div className="container-sovereign">
                <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Left tagline */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="col-span-12 md:col-span-3"
                    >
                        <p className="text-sm text-gray-600 italic leading-relaxed">
                            For the ones who chase<br />
                            horizons & own the sunshine.
                        </p>
                    </motion.div>

                    {/* Image 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="col-span-6 md:col-span-2"
                    >
                        <div className="aspect-[3/4] overflow-hidden">
                            <img
                                src="/images/leecooper-1.png"
                                alt="Lee Cooper Eyewear"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>

                    {/* Image 2 - larger center */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="col-span-6 md:col-span-2"
                    >
                        <div className="aspect-square overflow-hidden border-4 border-white shadow-lg">
                            <img
                                src="/images/leecooper-2.png"
                                alt="Lee Cooper Glasses"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>

                    {/* Brand Logo & CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="col-span-12 md:col-span-2 text-center py-6"
                    >
                        <h3 className="font-serif text-3xl text-amber-800 italic mb-1">Lee Cooper</h3>
                        <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-4">Since 1908</p>
                        <Link
                            href={`/${locale}/brands/leecooper`}
                            className="inline-block px-6 py-2 bg-neutral-900 text-white text-xs uppercase tracking-widest hover:bg-primary transition-colors"
                        >
                            Shop Now
                        </Link>
                    </motion.div>

                    {/* Image 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="col-span-12 md:col-span-3"
                    >
                        <div className="aspect-[4/3] overflow-hidden">
                            <img
                                src="/images/leecooper-3.png"
                                alt="Lee Cooper Sunglasses"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Bottom tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-center text-gray-600 italic mt-8 max-w-2xl mx-auto"
                >
                    Born for sunlight, built for adventure — crafted for those<br />
                    who refuse to fade into the ordinary.
                </motion.p>
            </div>
        </section>
    );
}
