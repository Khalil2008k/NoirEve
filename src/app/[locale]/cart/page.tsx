'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trash2,
    ShoppingBag,
    ArrowRight,
    Plus,
    Minus,
    Tag,
    ChevronRight,
    Lock,
    CreditCard,
    Truck,
} from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useToast } from '@/components/ui/Toast';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/store/settings';
import type { Dictionary } from '@/core/types/dictionary';

export default function CartPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = React.use(params);
    const { items, removeItem, updateQuantity } = useCartStore();
    const { showToast } = useToast();
    const [dict, setDict] = React.useState<Dictionary | null>(null);
    const [promoCode, setPromoCode] = React.useState('');
    const [isApplyingPromo, setIsApplyingPromo] = React.useState(false);

    const subtotal = items.reduce((acc, item) => acc + item.price.amount * item.quantity, 0);
    const shipping = subtotal > 200 ? 0 : 15;
    const total = subtotal + shipping;

    React.useEffect(() => {
        getDictionary(locale).then(setDict);
    }, [locale]);

    if (!dict) return null;

    const formatPrice = (amount: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

    const handleQuantityChange = (id: string, delta: number) => {
        const item = items.find((i) => i.id === id);
        if (item) {
            const newQty = Math.max(1, Math.min(10, item.quantity + delta));
            updateQuantity(id, newQty);
        }
    };

    const handleRemoveItem = (id: string, model: string) => {
        removeItem(id);
        showToast({
            type: 'info',
            message: `${model} removed from cart`,
        });
    };

    const handleApplyPromo = () => {
        if (!promoCode.trim()) return;
        setIsApplyingPromo(true);
        setTimeout(() => {
            setIsApplyingPromo(false);
            showToast({
                type: 'error',
                message: 'Invalid promo code',
            });
        }, 1000);
    };

    return (
        <>
            <Header dict={dict} locale={locale} />
            <main className="min-h-screen pt-20 pb-24 bg-background">
                <div className="container-sovereign">
                    {/* Breadcrumb */}
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-sm text-white/50 mb-8"
                    >
                        <Link href={`/${locale}`} className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-white">Shopping Cart</span>
                    </motion.nav>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold tracking-tight uppercase mb-12 flex items-center gap-4"
                    >
                        <ShoppingBag className="h-8 w-8 text-primary" />
                        {dict.nav.cart || 'Shopping Cart'}
                        {items.length > 0 && (
                            <span className="text-lg text-white/40 font-normal">
                                ({items.length} {items.length === 1 ? 'item' : 'items'})
                            </span>
                        )}
                    </motion.h1>

                    {items.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                <AnimatePresence mode="popLayout">
                                    {items.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100, height: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="bg-white/5 rounded-xl p-6 flex gap-6 items-center group relative overflow-hidden border border-white/5 hover:border-white/10 transition-colors"
                                        >
                                            {/* Product Image */}
                                            <Link
                                                href={`/${locale}/product/${item.id}`}
                                                className="relative h-28 w-24 bg-neutral-900 rounded-lg overflow-hidden flex-shrink-0"
                                            >
                                                <Image
                                                    src={item.images[0]?.url || '/images/hero-1.png'}
                                                    alt={item.images[0]?.alt || item.model}
                                                    fill
                                                    className="object-contain hover:scale-110 transition-transform"
                                                />
                                            </Link>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs uppercase tracking-widest text-primary font-bold mb-1">
                                                    {item.brand}
                                                </p>
                                                <Link
                                                    href={`/${locale}/product/${item.id}`}
                                                    className="text-lg font-bold hover:text-primary transition-colors block truncate"
                                                >
                                                    {item.model}
                                                </Link>
                                                <p className="text-xl font-bold text-white mt-2">
                                                    {item.price.formatted}
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    disabled={item.quantity <= 1}
                                                    className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="w-10 text-center font-bold text-lg">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    disabled={item.quantity >= 10}
                                                    className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            {/* Item Total */}
                                            <div className="text-right min-w-[100px]">
                                                <p className="text-sm text-white/50 mb-1">Total</p>
                                                <p className="text-xl font-bold">
                                                    {formatPrice(item.price.amount * item.quantity)}
                                                </p>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => handleRemoveItem(item.id, item.model)}
                                                className="p-3 text-white/30 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {/* Continue Shopping */}
                                <Link
                                    href={`/${locale}`}
                                    className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-primary transition-colors mt-6"
                                >
                                    <ArrowRight className="h-4 w-4 rotate-180" />
                                    Continue Shopping
                                </Link>
                            </div>

                            {/* Order Summary */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="lg:col-span-1"
                            >
                                <div className="bg-white/5 p-8 rounded-2xl border border-white/10 sticky top-24 space-y-6">
                                    <h2 className="text-2xl font-bold uppercase tracking-wide">Order Summary</h2>

                                    {/* Promo Code */}
                                    <div className="pb-6 border-b border-white/10">
                                        <label className="text-sm text-white/50 block mb-2">Promo Code</label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                                <input
                                                    type="text"
                                                    value={promoCode}
                                                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                                    placeholder="Enter code"
                                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors uppercase"
                                                />
                                            </div>
                                            <button
                                                onClick={handleApplyPromo}
                                                disabled={isApplyingPromo}
                                                className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors disabled:opacity-50"
                                            >
                                                {isApplyingPromo ? '...' : 'Apply'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Totals */}
                                    <div className="space-y-4 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-white/60">Subtotal</span>
                                            <span className="font-medium">{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white/60">Shipping</span>
                                            <span className="font-medium">
                                                {shipping === 0 ? (
                                                    <span className="text-green-400">FREE</span>
                                                ) : (
                                                    formatPrice(shipping)
                                                )}
                                            </span>
                                        </div>
                                        {shipping > 0 && (
                                            <p className="text-xs text-white/40 flex items-center gap-1">
                                                <Truck className="h-3 w-3" />
                                                Free shipping on orders over $200
                                            </p>
                                        )}
                                    </div>

                                    <div className="border-t border-white/10 pt-4">
                                        <div className="flex justify-between items-end">
                                            <span className="text-lg font-bold uppercase">Total</span>
                                            <span className="text-3xl font-bold text-white">{formatPrice(total)}</span>
                                        </div>
                                    </div>

                                    {/* Checkout Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-3"
                                    >
                                        <Lock className="h-4 w-4" />
                                        Secure Checkout
                                        <ArrowRight className="h-5 w-5" />
                                    </motion.button>

                                    {/* Payment Methods */}
                                    <div className="text-center">
                                        <p className="text-xs text-white/40 mb-3">We accept</p>
                                        <div className="flex justify-center gap-3">
                                            <div className="px-3 py-2 bg-white/10 rounded text-xs font-bold">VISA</div>
                                            <div className="px-3 py-2 bg-white/10 rounded text-xs font-bold">MC</div>
                                            <div className="px-3 py-2 bg-white/10 rounded text-xs font-bold">AMEX</div>
                                            <div className="px-3 py-2 bg-white/10 rounded text-xs font-bold flex items-center gap-1">
                                                <CreditCard className="h-3 w-3" />
                                                Pay
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-24 text-center space-y-6"
                        >
                            <div className="h-32 w-32 rounded-full bg-white/5 flex items-center justify-center">
                                <ShoppingBag className="h-16 w-16 text-white/20" />
                            </div>
                            <h2 className="text-3xl font-bold uppercase">Your Cart is Empty</h2>
                            <p className="text-white/50 max-w-md">
                                Experience the pinnacle of luxury. Explore our collection of fine timepieces and find your perfect match.
                            </p>
                            <Link
                                href={`/${locale}`}
                                className="px-10 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:scale-105 transition-all rounded-lg"
                            >
                                Browse Collection
                            </Link>
                        </motion.div>
                    )}
                </div>
            </main>
            <Footer locale={locale} />
        </>
    );
}
