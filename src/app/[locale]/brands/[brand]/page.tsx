'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Clock, Shield, Star } from 'lucide-react';
import { WatchCard } from '@/components/catalog/WatchCard';
import { useCatalog } from '@/hooks/useCatalog';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/store/settings';
import type { Dictionary } from '@/core/types/dictionary';


const brandInfo: Record<string, {
    name: string;
    tagline: string;
    description: string;
    story: string;
    heritage: string;
    values: { icon: React.ReactNode; title: string; description: string }[];
    gradient: string;
    accent: string;
}> = {
    casio: {
        name: 'Casio',
        tagline: 'Innovation from Japan',
        description: 'From iconic G-Shock durability to elegant Edifice sophistication, Casio continues to push the boundaries of watchmaking technology.',
        story: 'Founded in 1946 in Tokyo, Casio has been at the forefront of watchmaking innovation for over 75 years. The revolutionary G-Shock, born from a single engineer\'s dream to create an unbreakable watch, has become a cultural icon worn by millions worldwide.',
        heritage: 'Japanese Excellence',
        values: [
            { icon: <Shield className="h-6 w-6" />, title: 'Durability', description: 'Built to withstand extreme conditions' },
            { icon: <Clock className="h-6 w-6" />, title: 'Precision', description: 'Atomic timekeeping technology' },
            { icon: <Award className="h-6 w-6" />, title: 'Innovation', description: 'Over 1,000 patents in watchmaking' },
        ],
        gradient: 'from-blue-600/40 to-cyan-600/20',
        accent: '#3B82F6',
    },
    citizen: {
        name: 'Citizen',
        tagline: 'Powered by Light',
        description: 'Pioneering Eco-Drive technology, Citizen creates timepieces that harness the power of light, combining sustainability with precision.',
        story: 'Since 1918, Citizen has been committed to creating watches that serve people. The revolutionary Eco-Drive technology, introduced in 1976, eliminates the need for battery replacements by converting any light source into energy.',
        heritage: 'Japanese Craftsmanship',
        values: [
            { icon: <Star className="h-6 w-6" />, title: 'Sustainability', description: 'Light-powered technology' },
            { icon: <Clock className="h-6 w-6" />, title: 'Reliability', description: 'Never needs a battery replacement' },
            { icon: <Award className="h-6 w-6" />, title: 'Quality', description: 'In-house movements since 1930' },
        ],
        gradient: 'from-emerald-600/40 to-teal-600/20',
        accent: '#10B981',
    },
    police: {
        name: 'Police',
        tagline: 'Unapologetically Bold',
        description: 'Italian design meets rebellious spirit. Police watches are for those who dare to stand out from the crowd.',
        story: 'Born in Italy in 1983, Police has always been synonymous with bold, unconventional style. Worn by celebrities and fashion icons, Police represents those who refuse to conform.',
        heritage: 'Italian Design',
        values: [
            { icon: <Star className="h-6 w-6" />, title: 'Bold Design', description: 'Statement-making aesthetics' },
            { icon: <Award className="h-6 w-6" />, title: 'Fashion-Forward', description: 'Trendsetting collections' },
            { icon: <Shield className="h-6 w-6" />, title: 'Quality Build', description: 'Premium materials & finish' },
        ],
        gradient: 'from-orange-600/40 to-red-600/20',
        accent: '#F97316',
    },
    leecooper: {
        name: 'Lee Cooper',
        tagline: 'British Heritage',
        description: 'Born in London in 1908, Lee Cooper brings classic British style to contemporary accessories.',
        story: 'With over a century of British heritage, Lee Cooper has evolved from workwear pioneers to lifestyle brand. Their watches combine timeless elegance with modern functionality.',
        heritage: 'British Legacy',
        values: [
            { icon: <Clock className="h-6 w-6" />, title: 'Timeless Style', description: 'Classic British aesthetics' },
            { icon: <Award className="h-6 w-6" />, title: 'Heritage', description: 'Over 100 years of excellence' },
            { icon: <Star className="h-6 w-6" />, title: 'Versatility', description: 'Perfect for any occasion' },
        ],
        gradient: 'from-indigo-600/40 to-purple-600/20',
        accent: '#6366F1',
    },
    ecstacy: {
        name: 'Ecstacy',
        tagline: 'Where Elegance Speaks',
        description: 'Timeless sophistication for those who appreciate the finer things in life. Ecstacy embodies luxury and refinement.',
        story: 'Ecstacy represents the pursuit of elegance and sophistication. Each timepiece is designed to make a statement of refined taste and appreciation for beauty.',
        heritage: 'Refined Luxury',
        values: [
            { icon: <Star className="h-6 w-6" />, title: 'Elegance', description: 'Sophisticated design language' },
            { icon: <Award className="h-6 w-6" />, title: 'Luxury', description: 'Premium materials & finishes' },
            { icon: <Shield className="h-6 w-6" />, title: 'Exclusivity', description: 'Limited edition collections' },
        ],
        gradient: 'from-rose-600/40 to-pink-600/20',
        accent: '#F43F5E',
    },
    astro: {
        name: 'Astro',
        tagline: 'Adventure Awaits',
        description: 'Fun, colorful timepieces that inspire young explorers to dream big and reach for the stars.',
        story: 'Astro was created to inspire the next generation of dreamers. With vibrant colors and playful designs, Astro watches encourage children to explore, imagine, and reach for the stars.',
        heritage: 'Youthful Spirit',
        values: [
            { icon: <Star className="h-6 w-6" />, title: 'Fun Design', description: 'Colorful and playful styles' },
            { icon: <Shield className="h-6 w-6" />, title: 'Durability', description: 'Built for active lifestyles' },
            { icon: <Award className="h-6 w-6" />, title: 'Affordability', description: 'Quality at great value' },
        ],
        gradient: 'from-amber-600/40 to-yellow-600/20',
        accent: '#F59E0B',
    },
};

export default function BrandPage({
    params,
}: {
    params: Promise<{ locale: Locale; brand: string }>;
}) {
    const { locale, brand } = React.use(params);
    const { data: watches } = useCatalog();
    const [dict, setDict] = React.useState<Dictionary | null>(null);

    React.useEffect(() => {
        getDictionary(locale).then(setDict);
    }, [locale]);

    if (!dict) return null;

    const info = brandInfo[brand] || {
        name: brand.charAt(0).toUpperCase() + brand.slice(1),
        tagline: 'Premium Timepieces',
        description: 'Discover our collection of authentic luxury watches.',
        story: 'A brand committed to excellence in watchmaking.',
        heritage: 'Quality Craftsmanship',
        values: [],
        gradient: 'from-gray-600/40 to-gray-600/20',
        accent: '#9CA3AF',
    };

    const brandWatches = watches?.filter((w) =>
        w.brand.toLowerCase().replace(/\s+/g, '') === brand.toLowerCase()
    ) || [];

    return (
        <>
            <Header dict={dict} locale={locale} />

            {/* Hero Section */}
            <section className="relative min-h-[50vh] overflow-hidden">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                <div className="container-sovereign relative z-10 pt-32 pb-16">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link
                            href={`/${locale}/brands`}
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            All Brands
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-3xl"
                    >
                        <p
                            className="text-sm uppercase tracking-[0.3em] mb-3 font-medium"
                            style={{ color: info.accent }}
                        >
                            {info.heritage}
                        </p>
                        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tight mb-4">
                            {info.name}
                        </h1>
                        <p
                            className="text-2xl italic font-light mb-6"
                            style={{ color: info.accent }}
                        >
                            {info.tagline}
                        </p>
                        <p className="text-lg text-white/60 leading-relaxed">
                            {info.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            <main className="min-h-screen pb-24 bg-background">
                <div className="container-sovereign">
                    {/* Brand Story */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="py-16 border-b border-white/10"
                    >
                        <div className="max-w-3xl">
                            <h2 className="text-sm uppercase tracking-[0.3em] text-white/50 mb-4">Our Story</h2>
                            <p className="text-xl text-white/70 leading-relaxed">
                                {info.story}
                            </p>
                        </div>
                    </motion.section>

                    {/* Brand Values */}
                    {info.values.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="py-16 border-b border-white/10"
                        >
                            <h2 className="text-sm uppercase tracking-[0.3em] text-white/50 mb-8">What We Stand For</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {info.values.map((value, index) => (
                                    <motion.div
                                        key={value.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="p-6 bg-white/5 rounded-xl border border-white/10"
                                    >
                                        <div
                                            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                                            style={{ backgroundColor: `${info.accent}20`, color: info.accent }}
                                        >
                                            {value.icon}
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                                        <p className="text-sm text-white/50">{value.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    {/* Products */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="pt-16"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold uppercase tracking-tight">{info.name} Collection</h2>
                                <p className="text-white/50 mt-1">
                                    {brandWatches.length} Timepieces
                                </p>
                            </div>
                        </div>

                        {brandWatches.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {brandWatches.map((watch, index) => (
                                    <WatchCard key={watch.id} watch={watch} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-xl text-white/50 mb-6">No products available for this brand yet.</p>
                                <Link
                                    href={`/${locale}/brands`}
                                    className="inline-block px-8 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:scale-105 transition-all rounded-lg"
                                >
                                    Browse Other Brands
                                </Link>
                            </div>
                        )}
                    </motion.section>
                </div>
            </main>
            <Footer locale={locale} />
        </>
    );
}
