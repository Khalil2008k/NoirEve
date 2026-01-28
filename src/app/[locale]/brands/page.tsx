'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { useCatalog } from '@/hooks/useCatalog';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/store/settings';
import type { Dictionary } from '@/core/types/dictionary';

const brandList = [
    {
        id: 'casio',
        name: 'Casio',
        tagline: 'Innovation from Japan',
        description: 'From iconic G-Shock durability to elegant Edifice sophistication, Casio continues to push the boundaries of watchmaking technology.',
        gradient: 'from-blue-600/30 to-cyan-600/20',
        accent: '#3B82F6',
    },
    {
        id: 'citizen',
        name: 'Citizen',
        tagline: 'Powered by Light',
        description: 'Pioneering Eco-Drive technology, Citizen creates timepieces that harness the power of light.',
        gradient: 'from-emerald-600/30 to-teal-600/20',
        accent: '#10B981',
    },
    {
        id: 'police',
        name: 'Police',
        tagline: 'Unapologetically Bold',
        description: 'Italian design meets rebellious spirit. Police watches are for those who dare to stand out.',
        gradient: 'from-orange-600/30 to-red-600/20',
        accent: '#F97316',
    },
    {
        id: 'leecooper',
        name: 'Lee Cooper',
        tagline: 'British Heritage',
        description: 'Born in London in 1908, Lee Cooper brings classic British style to contemporary accessories.',
        gradient: 'from-indigo-600/30 to-purple-600/20',
        accent: '#6366F1',
    },
    {
        id: 'ecstacy',
        name: 'Ecstacy',
        tagline: 'Where Elegance Speaks',
        description: 'Timeless sophistication for those who appreciate the finer things in life.',
        gradient: 'from-rose-600/30 to-pink-600/20',
        accent: '#F43F5E',
    },
    {
        id: 'astro',
        name: 'Astro',
        tagline: 'Adventure Awaits',
        description: 'Fun, colorful timepieces that inspire young explorers to dream big and reach for the stars.',
        gradient: 'from-amber-600/30 to-yellow-600/20',
        accent: '#F59E0B',
    },
];

export default function BrandsPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = React.use(params);
    const { data: watches } = useCatalog();
    const [dict, setDict] = React.useState<Dictionary | null>(null);

    React.useEffect(() => {
        getDictionary(locale).then(setDict);
    }, [locale]);

    if (!dict) return null;

    // Calculate product counts per brand
    const brandCounts = brandList.map((brand) => ({
        ...brand,
        productCount: watches?.filter(
            (w) => w.brand.toLowerCase().replace(/\s+/g, '') === brand.id
        ).length || 0,
    }));

    return (
        <>
            <Header dict={dict} locale={locale} />

            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
                <div className="container-sovereign relative z-10 h-full flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
                            Curated Excellence
                        </p>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight uppercase mb-4">
                            {dict.nav.brands}
                        </h1>
                        <p className="text-xl text-white/50 max-w-2xl">
                            Discover our handpicked collection of world-renowned watch brands.
                            Each brand represents the pinnacle of craftsmanship and design.
                        </p>
                    </motion.div>
                </div>
            </section>

            <main className="min-h-screen pb-24 bg-background">
                <div className="container-sovereign -mt-6">
                    {/* Brand Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                        {brandCounts.map((brand, index) => (
                            <motion.div
                                key={brand.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={`/${locale}/brands/${brand.id}`}
                                    className="group block relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500"
                                >
                                    {/* Gradient Background */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                    />

                                    {/* Content */}
                                    <div className="relative p-8 min-h-[240px] flex flex-col justify-between bg-white/5 group-hover:bg-transparent transition-colors">
                                        {/* Brand Info */}
                                        <div>
                                            <div
                                                className="w-12 h-1 rounded-full mb-4 transition-all duration-500 group-hover:w-20"
                                                style={{ backgroundColor: brand.accent }}
                                            />
                                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-1 group-hover:text-white transition-colors">
                                                {brand.name}
                                            </h2>
                                            <p
                                                className="text-sm font-medium italic mb-3"
                                                style={{ color: brand.accent }}
                                            >
                                                {brand.tagline}
                                            </p>
                                            <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors line-clamp-2">
                                                {brand.description}
                                            </p>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between mt-6">
                                            <span className="text-xs uppercase tracking-widest text-white/40">
                                                {brand.productCount} Timepieces
                                            </span>
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                                style={{ backgroundColor: `${brand.accent}20` }}
                                            >
                                                <ArrowRight
                                                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                                                    style={{ color: brand.accent }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* All Products */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-1 bg-primary rounded-full" />
                            <h2 className="text-2xl font-bold uppercase tracking-tight">All Watches</h2>
                        </div>
                        <ProductGrid title="Complete Collection" watches={watches || []} />
                    </motion.div>
                </div>
            </main>
            <Footer locale={locale} />
        </>
    );
}
