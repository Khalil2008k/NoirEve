'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Watch, Truck, CreditCard, Gift } from 'lucide-react';

const features = [
    { icon: Watch, label: '5000+ Models' },
    { icon: Truck, label: 'Free Shipping & Easy Return' },
    { icon: CreditCard, label: 'Card & COD Payments' },
    { icon: Gift, label: 'Gift Wrapping' },
];

/**
 * FeatureStrip: Horizontal feature highlights strip.
 * Displays key selling points with icons.
 */
export function FeatureStrip() {
    return (
        <section className="py-8 bg-card border-y border-white/5">
            <div className="container-sovereign">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.label}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 justify-center p-4 rounded-lg border border-white/10 hover:border-primary/30 transition-colors"
                        >
                            <feature.icon className="h-8 w-8 text-primary" />
                            <span className="text-sm font-medium text-white/80">
                                {feature.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
