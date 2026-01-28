'use client';

import React from 'react';
import { motion } from 'framer-motion';

const brands = [
    { name: 'Rolex', logo: 'ROLEX' },
    { name: 'Patek Philippe', logo: 'PATEK PHILIPPE' },
    { name: 'Audemars Piguet', logo: 'AUDEMARS PIGUET' },
    { name: 'Omega', logo: 'OMEGA' },
    { name: 'Cartier', logo: 'CARTIER' },
    { name: 'Jaeger-LeCoultre', logo: 'JAEGER-LECOULTRE' },
    { name: 'Bvlgari', logo: 'BVLGARI' },
    { name: 'IWC', logo: 'IWC' },
];

/**
 * BrandsCarousel: Horizontal scrolling brand logos.
 * Auto-scrolling with infinite loop effect.
 */
export function BrandsCarousel() {
    return (
        <section className="py-16 bg-card border-y border-white/5 overflow-hidden">
            <div className="container-sovereign mb-8">
                <h3 className="text-sm uppercase tracking-[0.3em] text-white/50 text-center">
                    Featured Brands
                </h3>
            </div>

            {/* Infinite Scroll Container */}
            <div className="relative">
                <motion.div
                    className="flex gap-16 items-center"
                    animate={{ x: [0, -1200] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 20,
                            ease: 'linear',
                        },
                    }}
                >
                    {/* Double the brands for seamless loop */}
                    {[...brands, ...brands].map((brand, index) => (
                        <div
                            key={`${brand.name}-${index}`}
                            className="flex-shrink-0 px-8 py-4 text-xl md:text-2xl font-bold tracking-widest text-white/30 hover:text-white/70 transition-colors cursor-pointer"
                        >
                            {brand.logo}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
