'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/store/settings';

interface CategoryBannerProps {
    locale: Locale;
    title: string;
    subtitle: string;
    imageSrc: string;
    href: string;
    reverse?: boolean;
}

/**
 * CategoryBanner: Large lifestyle banner for Him/Her categories.
 * Implements sophisticated noir aesthetic with hover animations.
 */
export function CategoryBanner({ locale, title, subtitle, imageSrc, href, reverse = false }: CategoryBannerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`relative overflow-hidden group ${reverse ? 'md:flex-row-reverse' : ''}`}
        >
            <Link href={href} className="block relative h-[400px] md:h-[500px] w-full overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url(${imageSrc})` }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-2">{subtitle}</p>
                    <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-6">
                        {title}
                    </h2>
                    <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                        <span className="text-sm uppercase tracking-widest font-bold">Shop Now</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
