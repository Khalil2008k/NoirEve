'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface PromoBannerProps {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
}

/**
 * PromoBanner: Full-width promotional banner with lifestyle image.
 * Features centered text with side image.
 */
export function PromoBanner({ title, subtitle, ctaText, ctaHref }: PromoBannerProps) {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative py-20 overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/30 to-primary/20" />

            {/* Lifestyle image on right side */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: `url('/images/promo-lifestyle.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            </div>

            {/* Animated glows */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Content */}
            <div className="container-sovereign relative z-10 text-center lg:text-left lg:max-w-2xl">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-sm uppercase tracking-[0.4em] text-white/70 mb-4"
                >
                    {subtitle}
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-8 italic"
                >
                    {title}
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <Link
                        href={ctaHref}
                        className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                        {ctaText}
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}
