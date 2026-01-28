'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/store/settings';
import type { Dictionary } from '@/core/types/dictionary';

export default function LoginPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = React.use(params);
    const [dict, setDict] = React.useState<Dictionary | null>(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        getDictionary(locale).then(setDict);
    }, [locale]);

    if (!dict) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual login
        alert('Login functionality coming soon!');
    };

    return (
        <>
            <Header dict={dict} locale={locale} />
            <main className="min-h-screen pt-20 pb-24 flex items-center justify-center">
                <div className="w-full max-w-md p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-white/50">Sign in to your NoirEve account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-white/20" />
                                <span className="text-white/70">Remember me</span>
                            </label>
                            <Link href={`/${locale}/forgot-password`} className="text-primary hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="text-center mt-8 text-sm text-white/50">
                        Don&apos;t have an account?{' '}
                        <Link href={`/${locale}/register`} className="text-primary hover:underline">
                            Create one
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
