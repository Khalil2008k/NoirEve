'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Heart,
    ShoppingBag,
    Shield,
    Truck,
    RotateCcw,
    ChevronRight,
    Star,
    Share2,
    Check,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WatchCard } from '@/components/catalog/WatchCard';
import { useCatalog } from '@/hooks/useCatalog';
import { useCartStore } from '@/store/cart';
import { useToast } from '@/components/ui/Toast';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/store/settings';
import type { Dictionary } from '@/core/types/dictionary';

export default function ProductPage({
    params,
}: {
    params: Promise<{ locale: Locale; id: string }>;
}) {
    const { locale, id } = React.use(params);
    const { data: watches } = useCatalog();
    const { addItem } = useCartStore();
    const { showToast } = useToast();
    const [dict, setDict] = React.useState<Dictionary | null>(null);
    const [selectedImage, setSelectedImage] = React.useState(0);
    const [isWishlisted, setIsWishlisted] = React.useState(false);
    const [isZoomed, setIsZoomed] = React.useState(false);
    const [zoomPosition, setZoomPosition] = React.useState({ x: 50, y: 50 });

    React.useEffect(() => {
        getDictionary(locale).then(setDict);
    }, [locale]);

    if (!dict) return null;

    const product = watches?.find((w) => w.id === id);

    // Get related products (same brand or category)
    const relatedProducts = watches
        ?.filter((w) => w.id !== id && (w.brand === product?.brand || w.category === product?.category))
        .slice(0, 4) || [];

    if (!product) {
        return (
            <>
                <Header dict={dict} locale={locale} />
                <main className="min-h-screen pt-20 pb-24 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                        <p className="text-white/50 mb-8">The timepiece you're looking for doesn't exist.</p>
                        <Link
                            href={`/${locale}`}
                            className="px-8 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:scale-105 transition-all inline-block"
                        >
                            Return to Home
                        </Link>
                    </motion.div>
                </main>
            </>
        );
    }

    const handleAddToCart = () => {
        addItem(product);
        showToast({
            type: 'success',
            message: `${product.model} added to your cart`,
        });
    };

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        showToast({
            type: 'info',
            message: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
        });
    };

    const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
    };


    return (
        <>
            <Header dict={dict} locale={locale} />
            <main className="min-h-screen pt-20 pb-24">
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
                        <Link href={`/${locale}/${product.category?.toLowerCase()}`} className="hover:text-white transition-colors">
                            {product.category}
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-white">{product.model}</span>
                    </motion.nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Product Images */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            {/* Main Image with Zoom */}
                            <div
                                className="relative bg-neutral-900 rounded-2xl aspect-square flex items-center justify-center mb-4 overflow-hidden cursor-zoom-in group"
                                onMouseEnter={() => setIsZoomed(true)}
                                onMouseLeave={() => setIsZoomed(false)}
                                onMouseMove={handleImageMouseMove}
                            >
                                {/* Stock Badge */}
                                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
                                    <Check className="h-3 w-3" />
                                    In Stock
                                </div>

                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={product.images?.[selectedImage]?.url || '/images/hero-1.png'}
                                    alt={product.model}
                                    className={`max-w-[80%] max-h-[80%] object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : ''
                                        }`}
                                    style={
                                        isZoomed
                                            ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                                            : undefined
                                    }
                                />

                                {/* Zoom hint */}
                                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 text-white/70 text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    Hover to zoom
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            {product.images && product.images.length > 1 && (
                                <div className="flex gap-3">
                                    {product.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`w-20 h-20 bg-neutral-900 rounded-lg overflow-hidden transition-all ${selectedImage === idx
                                                ? 'ring-2 ring-primary scale-105'
                                                : 'opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={img.url} alt="" className="w-full h-full object-contain" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Brand & Title */}
                            <Link
                                href={`/${locale}/brands/${product.brand.toLowerCase().replace(/\s+/g, '')}`}
                                className="text-sm uppercase tracking-[0.3em] text-primary hover:underline mb-2 inline-block"
                            >
                                {product.brand}
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.model}</h1>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-white/50">(4.0) • 12 reviews</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-4xl font-bold text-primary">
                                    {product.price.formatted}
                                </span>
                                <span className="text-lg text-white/40 line-through">
                                    ${Math.round(product.price.amount * 1.2).toLocaleString()}
                                </span>
                                <span className="px-2 py-1 bg-primary/20 text-primary text-sm font-bold rounded">
                                    SAVE 20%
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-white/60 mb-8 leading-relaxed text-lg">
                                Experience exceptional craftsmanship with the {product.brand} {product.model}.
                                This timepiece combines precision engineering with elegant design,
                                perfect for those who appreciate the finer things in life.
                            </p>

                            {/* Specs */}
                            {/* Specs */}
                            <div className="bg-white/5 rounded-xl p-6 mb-8">
                                <h3 className="text-sm uppercase tracking-widest text-white/50 mb-4">Specifications</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex justify-between py-2 border-b border-white/10">
                                        <span className="text-white/50">Movement</span>
                                        <span className="font-medium">{product.movement || 'Quartz'}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-white/10">
                                        <span className="text-white/50">Case Size</span>
                                        <span className="font-medium">{product.specifications?.caseSize || '42mm'}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-white/10">
                                        <span className="text-white/50">Water Resistance</span>
                                        <span className="font-medium">{product.specifications?.waterResistance || '50m'}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-white/10">
                                        <span className="text-white/50">Warranty</span>
                                        <span className="font-medium">2 Years</span>
                                    </div>
                                </div>
                            </div>


                            {/* Actions */}
                            <div className="flex gap-4 mb-8">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    className="flex-1 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest flex items-center justify-center gap-3 rounded-lg shadow-lg shadow-primary/20"
                                >
                                    <ShoppingBag className="h-5 w-5" />
                                    Add to Cart
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleWishlist}
                                    className={`p-4 border-2 rounded-lg transition-colors ${isWishlisted
                                        ? 'bg-primary/20 border-primary text-primary'
                                        : 'border-white/20 hover:border-primary hover:text-primary'
                                        }`}
                                >
                                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-4 border-2 border-white/20 hover:border-white/40 rounded-lg transition-colors"
                                >
                                    <Share2 className="h-5 w-5" />
                                </motion.button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 p-6 bg-white/5 rounded-xl">
                                <div className="text-center">
                                    <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
                                    <p className="text-xs text-white/70 font-medium">Free Shipping</p>
                                    <p className="text-xs text-white/40">Orders over $200</p>
                                </div>
                                <div className="text-center">
                                    <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                                    <p className="text-xs text-white/70 font-medium">2-Year Warranty</p>
                                    <p className="text-xs text-white/40">Official guarantee</p>
                                </div>
                                <div className="text-center">
                                    <RotateCcw className="h-8 w-8 mx-auto mb-2 text-primary" />
                                    <p className="text-xs text-white/70 font-medium">Easy Returns</p>
                                    <p className="text-xs text-white/40">14-day policy</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-24"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold uppercase tracking-tight">You May Also Like</h2>
                                <Link
                                    href={`/${locale}/${product.category?.toLowerCase()}`}
                                    className="text-sm text-primary hover:underline flex items-center gap-1"
                                >
                                    View All <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {relatedProducts.map((watch, index) => (
                                    <WatchCard key={watch.id} watch={watch} index={index} />
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>
            </main>
            <Footer locale={locale} />
        </>
    );
}
