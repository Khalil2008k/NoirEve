'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/store/settings';
import type { Dictionary } from '@/core/types/dictionary';

export default function AboutPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = React.use(params);
    const [dict, setDict] = React.useState<Dictionary | null>(null);

    React.useEffect(() => {
        getDictionary(locale).then(setDict);
    }, [locale]);

    if (!dict) return null;

    return (
        <>
            <Header dict={dict} locale={locale} />
            <main className="min-h-screen pt-20 pb-24">
                <div className="container-sovereign max-w-4xl">
                    <h1 className="text-4xl font-bold tracking-tight uppercase mb-8">About NoirEve</h1>

                    <div className="prose prose-invert max-w-none space-y-6">
                        <p className="text-xl text-white/70 leading-relaxed">
                            Founded in 2020, NoirEve has established itself as Qatar&apos;s premier destination
                            for luxury timepieces. We curate the world&apos;s finest watches from prestigious
                            brands, bringing unparalleled elegance to discerning collectors.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 py-12">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                                <p className="text-white/50">Premium Brands</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                                <p className="text-white/50">Happy Customers</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                                <p className="text-white/50">Authentic Guaranteed</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-12 mb-4">Our Philosophy</h2>
                        <p className="text-white/70 leading-relaxed">
                            At NoirEve, we believe that a watch is more than a timekeeper—it&apos;s a statement
                            of personal style, a milestone celebration, and a legacy to pass on. Every piece
                            in our collection is carefully selected for its craftsmanship, heritage, and timeless appeal.
                        </p>

                        <h2 className="text-2xl font-bold mt-12 mb-4">Why Choose Us</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2">
                            <li>100% Authentic Products with Official Warranty</li>
                            <li>Free Shipping Across Qatar</li>
                            <li>Expert Customer Support</li>
                            <li>Secure Payment Options</li>
                            <li>Easy Returns & Exchanges</li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer locale={locale} />
        </>
    );
}
