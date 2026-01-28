'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    CreditCard,
    Shield,
    Truck
} from 'lucide-react';
import type { Locale } from '@/store/settings';
import { Logo } from '@/components/ui/Logo';

interface FooterProps {
    locale: Locale;
}

const footerLinks = {
    company: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
        { label: 'Blog', href: '/blog' },
    ],
    support: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Shipping & Returns', href: '/shipping' },
        { label: 'Watch Care Guide', href: '/care' },
    ],
    legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Warranty', href: '/warranty' },
        { label: 'Cookie Policy', href: '/cookies' },
    ],
    brands: [
        { label: 'Casio', href: '/brands/casio' },
        { label: 'Citizen', href: '/brands/citizen' },
        { label: 'Police', href: '/brands/police' },
        { label: 'Lee Cooper', href: '/brands/leecooper' },
    ],
};

const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' },
];

/**
 * Footer: Premium noir-themed footer with glass effects and comprehensive links.
 */
export function Footer({ locale }: FooterProps) {
    return (
        <footer className="relative bg-black/90 border-t border-white/10">
            {/* Top Feature Bar */}
            <div className="border-b border-white/5">
                <div className="container-sovereign py-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Truck className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-white">Free Shipping</h4>
                                <p className="text-xs text-white/50">On orders over QAR 200</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-white">2-Year Warranty</h4>
                                <p className="text-xs text-white/50">Official manufacturer warranty</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-white">Secure Payment</h4>
                                <p className="text-xs text-white/50">100% encrypted transactions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container-sovereign py-12">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <div className="mb-6">
                            <Logo locale={locale} size="md" />
                        </div>
                        <p className="text-sm text-white/50 mb-6 leading-relaxed max-w-xs">
                            Curating the world's finest timepieces since 2020.
                            Your destination for luxury watches in Qatar.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a href="tel:+97477320040" className="flex items-center gap-3 text-sm text-white/60 hover:text-primary transition-colors">
                                <Phone className="w-4 h-4" />
                                +974 7732 0040
                            </a>
                            <a href="mailto:hello@noireve.com" className="flex items-center gap-3 text-sm text-white/60 hover:text-primary transition-colors">
                                <Mail className="w-4 h-4" />
                                hello@noireve.com
                            </a>
                            <div className="flex items-start gap-3 text-sm text-white/60">
                                <MapPin className="w-4 h-4 mt-0.5" />
                                <span>Doha, Qatar</span>
                            </div>
                        </div>
                    </div>

                    {/* Link Columns */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={`/${locale}${link.href}`}
                                        className="text-sm text-white/50 hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Support
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={`/${locale}${link.href}`}
                                        className="text-sm text-white/50 hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={`/${locale}${link.href}`}
                                        className="text-sm text-white/50 hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Top Brands
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.brands.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={`/${locale}${link.href}`}
                                        className="text-sm text-white/50 hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="container-sovereign py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <p className="text-xs text-white/40">
                            © 2026 NoirEve. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/50 transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Payment Icons */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-white/40">We accept:</span>
                            <div className="flex items-center gap-2">
                                {['Visa', 'MC', 'Amex', 'Apple'].map((card) => (
                                    <div
                                        key={card}
                                        className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/50"
                                    >
                                        {card}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
