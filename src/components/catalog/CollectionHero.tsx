'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CollectionHeroProps {
    title: string;
    subtitle: string;
    backgroundImage: string;
    itemCount?: number;
}

export function CollectionHero({
    title,
    subtitle,
    backgroundImage,
    itemCount,
}: CollectionHeroProps) {
    return (
        <section className="relative h-[40vh] min-h-[300px] max-h-[400px] w-full overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-black/30" />

            {/* Content */}
            <div className="container-sovereign relative z-10 h-full flex flex-col justify-end pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">
                        {subtitle}
                    </p>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight uppercase text-white mb-4">
                        {title}
                    </h1>
                    {itemCount !== undefined && (
                        <p className="text-white/50 text-sm uppercase tracking-widest">
                            {itemCount} Timepieces
                        </p>
                    )}
                </motion.div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
}
