'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/store/settings';
import type { Dictionary } from '@/core/types/dictionary';

const faqs = [
    {
        question: 'Are all watches authentic?',
        answer: 'Yes, every watch sold at NoirEve is 100% authentic. We are authorized retailers for all the brands we carry, and each timepiece comes with official manufacturer warranty.',
    },
    {
        question: 'What is your return policy?',
        answer: 'We offer a 14-day return policy for unworn watches in their original packaging. Simply contact our customer service team to initiate a return.',
    },
    {
        question: 'How long does shipping take?',
        answer: 'Within Qatar, delivery typically takes 1-3 business days. We offer free shipping on orders over QAR 200.',
    },
    {
        question: 'Do you offer warranty on watches?',
        answer: 'All watches come with the official manufacturer warranty, typically 2 years. Additionally, we offer our own NoirEve satisfaction guarantee.',
    },
    {
        question: 'Can I have my watch serviced?',
        answer: 'Yes! We provide watch servicing and maintenance through our authorized service partners. Contact us for more details.',
    },
    {
        question: 'Do you offer gift wrapping?',
        answer: 'Absolutely! We offer complimentary luxury gift wrapping for all orders. Just select the gift wrap option at checkout.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept Visa, MasterCard, American Express, Apple Pay, and cash on delivery within Qatar.',
    },
    {
        question: 'Can I track my order?',
        answer: 'Yes, once your order is shipped, you will receive a tracking number via email and SMS to monitor your delivery.',
    },
];

export default function FAQPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = React.use(params);
    const [dict, setDict] = React.useState<Dictionary | null>(null);
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    React.useEffect(() => {
        getDictionary(locale).then(setDict);
    }, [locale]);

    if (!dict) return null;

    return (
        <>
            <Header dict={dict} locale={locale} />
            <main className="min-h-screen pt-20 pb-24">
                <div className="container-sovereign max-w-3xl">
                    <h1 className="text-4xl font-bold tracking-tight uppercase mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-white/60 mb-12">
                        Find answers to common questions about shopping at NoirEve.
                    </p>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border border-white/10 rounded-lg overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-medium">{faq.question}</span>
                                    <ChevronDown
                                        className={`h-5 w-5 transition-transform ${openIndex === index ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 pb-4 text-white/60">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center p-8 bg-card rounded-lg border border-white/10">
                        <h2 className="text-xl font-bold mb-2">Still have questions?</h2>
                        <p className="text-white/60 mb-4">
                            Our team is here to help you.
                        </p>
                        <a
                            href={`/${locale}/contact`}
                            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </main>
            <Footer locale={locale} />
        </>
    );
}
