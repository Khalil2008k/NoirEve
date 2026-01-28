'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/store/settings';
import type { Dictionary } from '@/core/types/dictionary';

export default function TermsPage({
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
                    <h1 className="text-4xl font-bold tracking-tight uppercase mb-4">Terms of Service</h1>
                    <p className="text-white/50 mb-8">Last updated: January 2026</p>

                    <div className="prose prose-invert max-w-none space-y-8 text-white/70">
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">1. Agreement to Terms</h2>
                            <p>By accessing our website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">2. Products and Pricing</h2>
                            <p>All products are subject to availability. Prices are in Qatari Riyal (QAR) unless otherwise stated. We reserve the right to modify prices at any time.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">3. Orders and Payments</h2>
                            <p>All orders are subject to acceptance and availability. Payment must be received before orders are processed.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">4. Authenticity Guarantee</h2>
                            <p>All products sold on NoirEve are 100% authentic and come with official manufacturer warranty.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">5. Limitation of Liability</h2>
                            <p>NoirEve shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">6. Governing Law</h2>
                            <p>These terms are governed by the laws of the State of Qatar.</p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer locale={locale} />
        </>
    );
}
