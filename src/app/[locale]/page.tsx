'use client';

import React, { useEffect, useState } from 'react';
import { getDictionary } from '@/lib/dictionary';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  CategoryBanner,
  PromoBanner,
  BrandsCarousel,
  CollectionsGrid,
  ShopByPrice,
  ProductCarousel,
  ShopByBrands,
  FeatureStrip,
  Spotlight,
  BrandCollections,
  BrandPromo,
  HeroSlideshow
} from '@/components/home';
import { useCatalog } from '@/hooks/useCatalog';
import type { Locale } from '@/store/settings';
import type { Dictionary } from '@/core/types/dictionary';

/**
 * HomePage: The NoirEve Landing Page.
 * Sections ordered for optimal psychological flow - discovery first, recommendations later.
 */
export default function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = React.use(params);
  const { data: watches } = useCatalog();
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    getDictionary(locale).then(setDict);
  }, [locale]);

  if (!dict) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Split watches for different carousels
  const newestArrivals = watches?.slice(0, 6) || [];
  const recommendedProducts = watches?.slice(2, 8) || [];

  return (
    <>
      <Header dict={dict} locale={locale} />

      <main className="flex-1">
        {/* Hero Slideshow - 4 rotating backgrounds */}
        <HeroSlideshow dict={dict} locale={locale} />

        {/* Category Banners - Just For Him / Just For Her */}
        <section className="grid grid-cols-1 md:grid-cols-2">
          <CategoryBanner
            locale={locale}
            title="Just For Him"
            subtitle="Men's Collection"
            imageSrc="/images/lifestyle-men.jpg"
            href={`/${locale}/men`}
          />
          <CategoryBanner
            locale={locale}
            title="Just For Her"
            subtitle="Women's Collection"
            imageSrc="/images/lifestyle-women.jpg"
            href={`/${locale}/women`}
          />
        </section>

        {/* Brands Carousel */}
        <BrandsCarousel />

        {/* New Arrivals - Auto-scroll one by one, 5 seconds per product */}
        <ProductCarousel
          title="New Arrivals"
          products={newestArrivals}
          locale={locale}
          viewAllHref={`/${locale}/brands`}
          autoScroll={true}
          autoScrollInterval={5000}
          scrollOneByOne={true}
        />

        {/* The Spotlight - Brand highlights */}
        <Spotlight locale={locale} />

        {/* Shop by Brands - Discovery section */}
        <ShopByBrands locale={locale} />

        {/* Shop by Price - Helps users filter by budget */}
        <ShopByPrice locale={locale} />

        {/* Collections Grid - Browse by style */}
        <CollectionsGrid locale={locale} />

        {/* Brand Collections - Hero with brand cards */}
        <BrandCollections locale={locale} />

        {/* Promotional Banner with Lifestyle Image */}
        <PromoBanner
          title="Elegance Redefined"
          subtitle="Winter Collection 2026"
          ctaText="Explore Now"
          ctaHref={`/${locale}/brands`}
        />

        {/* Lee Cooper Brand Promo */}
        <BrandPromo locale={locale} />

        {/* Recommended Products - Placed after user has browsed, feels natural */}
        <ProductCarousel
          title="You May Also Like"
          products={recommendedProducts}
          locale={locale}
          viewAllHref={`/${locale}/brands`}
          autoScroll={true}
          autoScrollInterval={4000}
          scrollOneByOne={false}
        />
      </main>

      {/* Footer (includes Feature Strip) */}
      <Footer locale={locale} />
    </>
  );
}
