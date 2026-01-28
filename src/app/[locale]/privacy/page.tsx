'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/store/settings';
import type { Dictionary } from '@/core/types/dictionary';

export default function PrivacyPage({
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
                    <h1 className="text-4xl font-bold tracking-tight uppercase mb-4">Privacy Policy</h1>
                    <p className="text-white/50 mb-8">Last updated: January 2026</p>

                    <div className="prose prose-invert max-w-none space-y-8 text-white/70">
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
                            <p>We collect information you provide directly, including name, email, shipping address, and payment information when you make a purchase.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
                            <p>We use your information to process orders, communicate with you, improve our services, and comply with legal obligations.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">3. Information Sharing</h2>
                            <p>We do not sell your personal information. We may share information with service providers who help us operate our business.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">4. Data Security</h2>
                            <p>We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">5. Your Rights</h2>
                            <p>You have the right to access, correct, or delete your personal information. Contact us at privacy@noireve.com for any requests.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">6. Contact Us</h2>
                            <p>For questions about this Privacy Policy, please contact us at hello@noireve.com.</p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer locale={locale} />
        </>
    );
}
