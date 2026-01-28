'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/store/settings';
import type { Dictionary } from '@/core/types/dictionary';

export default function ShippingPage({
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
                    <h1 className="text-4xl font-bold tracking-tight uppercase mb-8">Shipping & Returns</h1>

                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
                            <div className="space-y-4 text-white/70">
                                <p>We offer fast and reliable shipping across Qatar and the GCC region.</p>

                                <div className="bg-card p-6 rounded-lg border border-white/10">
                                    <h3 className="font-semibold text-white mb-3">Delivery Times</h3>
                                    <ul className="space-y-2">
                                        <li>• Within Doha: 1-2 business days</li>
                                        <li>• Rest of Qatar: 2-3 business days</li>
                                        <li>• GCC Countries: 5-7 business days</li>
                                    </ul>
                                </div>

                                <div className="bg-card p-6 rounded-lg border border-white/10">
                                    <h3 className="font-semibold text-white mb-3">Shipping Costs</h3>
                                    <ul className="space-y-2">
                                        <li>• <span className="text-primary font-semibold">FREE</span> shipping on orders over QAR 200</li>
                                        <li>• Standard shipping: QAR 25</li>
                                        <li>• Express shipping: QAR 50</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Return Policy</h2>
                            <div className="space-y-4 text-white/70">
                                <p>We want you to be completely satisfied with your purchase. If you&apos;re not happy, we&apos;re here to help.</p>

                                <div className="bg-card p-6 rounded-lg border border-white/10">
                                    <h3 className="font-semibold text-white mb-3">Return Conditions</h3>
                                    <ul className="space-y-2">
                                        <li>• Returns accepted within 14 days of delivery</li>
                                        <li>• Items must be unworn and in original packaging</li>
                                        <li>• All tags and protective films must be intact</li>
                                        <li>• Original receipt or proof of purchase required</li>
                                    </ul>
                                </div>

                                <div className="bg-card p-6 rounded-lg border border-white/10">
                                    <h3 className="font-semibold text-white mb-3">How to Return</h3>
                                    <ol className="space-y-2 list-decimal list-inside">
                                        <li>Contact our customer service team</li>
                                        <li>Receive your return authorization number</li>
                                        <li>Pack the item securely in original packaging</li>
                                        <li>Ship the item back to us</li>
                                        <li>Refund processed within 5-7 business days</li>
                                    </ol>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer locale={locale} />
        </>
    );
}
