'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingBag, User, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettingsStore, type Locale } from '@/store/settings';
import { Logo } from '@/components/ui/Logo';
import type { Dictionary } from '@/core/types/dictionary';

interface HeaderProps {
    dict: Dictionary;
    locale: Locale;
}

export function Header({ dict, locale }: HeaderProps) {
    const pathname = usePathname();
    const router = useRouter();
    const toggleLocale = useSettingsStore((state) => state.toggleLocale);

    const handleLocaleChange = () => {
        const newLocale = locale === 'en' ? 'ar' : 'en';
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        toggleLocale();
        router.push(newPath);
    };

    return (
        <header className={cn("sticky top-0 z-50 w-full glass-panel")}>
            <div className="container-sovereign flex h-16 items-center justify-between">
                {/* Logo */}
                <Logo locale={locale} size="lg" />

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse text-sm font-medium uppercase tracking-widest">
                    <Link href={`/${locale}`} className="hover:text-primary transition-colors">{dict.nav.home}</Link>
                    <Link href={`/${locale}/men`} className="hover:text-primary transition-colors">{dict.nav.men}</Link>
                    <Link href={`/${locale}/women`} className="hover:text-primary transition-colors">{dict.nav.women}</Link>
                    <Link href={`/${locale}/brands`} className="hover:text-primary transition-colors">{dict.nav.brands}</Link>
                </nav>

                {/* Global Controls */}
                <div className="flex items-center space-x-5 rtl:space-x-reverse">
                    <button className="p-2 hover:text-primary transition-colors">
                        <Search className="h-5 w-5" />
                    </button>

                    <Link href={`/${locale}/cart`} className="p-2 hover:text-primary transition-colors relative">
                        <ShoppingBag className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full font-bold">
                            0
                        </span>
                    </Link>

                    <Link href={`/${locale}/login`} className="p-2 hover:text-primary transition-colors">
                        <User className="h-5 w-5" />
                    </Link>

                    <button
                        onClick={handleLocaleChange}
                        className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full border border-white/10 hover:border-primary/50 transition-all text-sm font-bold"
                    >
                        <Globe className="h-4 w-4" />
                        <span>{locale.toUpperCase()}</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
