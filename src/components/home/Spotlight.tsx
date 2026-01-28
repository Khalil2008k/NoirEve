'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/store/settings';

interface SpotlightProps {
    locale: Locale;
}

/**
 * Spotlight: Brand spotlight grid with lifestyle images.
 * Noir-themed with dark gradients and red accents.
 * Size increased by 75% for impactful presence.
 */
export function Spotlight({ locale }: SpotlightProps) {
    return (
        <section className="py-20">
            <div className="container-sovereign">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight">
                    The Spotlight
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Casio Block - Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 gap-5 min-h-[420px]"
                    >
                        {/* Casio Text Card */}
                        <Link
                            href={`/${locale}/brands/casio`}
                            className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-white/10 p-8 flex flex-col justify-between group hover:border-primary/50 transition-all duration-500"
                        >
                            <div>
                                <h3 className="text-3xl font-black text-white mb-6 tracking-wider">
                                    CASIO
                                </h3>
                                <p className="text-xl text-white/80 leading-relaxed">
                                    Where <span className="text-primary font-semibold">Precision</span> Meets Style
                                </p>
                            </div>
                            <div className="border-t border-white/10 pt-5 mt-6">
                                <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                                    Iconic digital timepieces trusted by millions worldwide
                                </p>
                            </div>
                        </Link>

                        {/* Casio Image */}
                        <div className="relative overflow-hidden border border-white/10 group">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('/images/spotlight-casio.png')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                    </motion.div>

                    {/* Right Side - Police & Citizen */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-rows-2 gap-5 min-h-[420px]"
                    >
                        {/* Police Block */}
                        <div className="grid grid-cols-2 gap-5">
                            {/* Police Image */}
                            <div className="relative overflow-hidden border border-white/10 group">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url('/images/spotlight-police.png')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>

                            {/* Police Text Card */}
                            <Link
                                href={`/${locale}/brands/police`}
                                className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-white/10 p-6 flex flex-col justify-between group hover:border-primary/50 transition-all duration-500"
                            >
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-4 tracking-wider">
                                        POLICE
                                    </h3>
                                    <p className="text-base text-white/80">
                                        Unapologetically <span className="text-primary font-semibold">Bold</span>
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-4 mt-4">
                                    <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                                        Statement pieces for the fearless
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Citizen Block */}
                        <div className="grid grid-cols-2 gap-5">
                            {/* Citizen Image */}
                            <div className="relative overflow-hidden border border-white/10 group">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url('/images/spotlight-citizen.png')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>

                            {/* Citizen Text Card */}
                            <Link
                                href={`/${locale}/brands/citizen`}
                                className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-white/10 p-6 flex flex-col justify-between group hover:border-primary/50 transition-all duration-500"
                            >
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-4 tracking-wider">
                                        CITIZEN
                                    </h3>
                                    <p className="text-base text-white/80">
                                        Powered by <span className="text-primary font-semibold">Light</span>
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-4 mt-4">
                                    <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                                        Japanese craftsmanship since 1918
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
