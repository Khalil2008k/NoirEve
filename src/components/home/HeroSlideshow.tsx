'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Dictionary } from '@/core/types/dictionary';
import type { Locale } from '@/store/settings';

interface HeroSlideshowProps {
    dict: Dictionary;
    locale: Locale;
}

const heroImages = [
    '/images/hero-1.png',
    '/images/hero-2.png',
    '/images/hero-3.png',
    '/images/hero-4.png',
];

/**
 * HeroSlideshow: Full-screen hero with rotating background images.
 * Changes every 3 seconds with smooth crossfade transitions.
 */
export function HeroSlideshow({ dict, locale }: HeroSlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-[80vh] w-full overflow-hidden">
            {/* Background Images with Crossfade */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${heroImages[currentIndex]}')` }}
                    />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="container-sovereign relative z-10 h-full flex flex-col justify-center items-start">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-2xl space-y-6"
                >
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none text-white uppercase italic">
                        {dict.hero.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed">
                        {dict.hero.subtitle}
                    </p>
                    <Link
                        href={`/${locale}/brands`}
                        className="mt-8 inline-block px-12 py-5 bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                        {dict.hero.cta}
                    </Link>
                </motion.div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'bg-primary w-8'
                            : 'bg-white/40 hover:bg-white/60'
                            }`}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
