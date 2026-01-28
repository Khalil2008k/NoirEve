import type { CatalogState } from './types/catalog';

/**
 * GENESIS_CATALOG: The immutable foundation of the NoirEve catalog.
 * (Pass 7 Apex Defense).
 */
export const GENESIS_CATALOG: CatalogState = {
    items: [
        {
            id: 'submariner-001',
            brand: 'Rolex',
            model: 'Submariner Date',
            price: { amount: 14500, currency: 'USD', formatted: '$14,500' },
            category: 'Men',
            movement: 'Automatic',
            images: [{ url: '/images/watches/submariner.jpg', alt: 'Rolex Submariner', isPrimary: true }],
            description: 'The iconic divers watch, a benchmark in its category.'
        },
        {
            id: 'daytona-002',
            brand: 'Rolex',
            model: 'Cosmograph Daytona',
            price: { amount: 32000, currency: 'USD', formatted: '$32,000' },
            category: 'Men',
            movement: 'Automatic',
            images: [{ url: '/images/watches/daytona.jpg', alt: 'Rolex Daytona', isPrimary: true }],
            description: 'A watch born to race, designed for professional drivers.'
        },
        {
            id: 'nautilus-003',
            brand: 'Patek Philippe',
            model: 'Nautilus 5711/1A',
            price: { amount: 120000, currency: 'USD', formatted: '$120,000' },
            category: 'Men',
            movement: 'Automatic',
            images: [{ url: '/images/watches/nautilus.jpg', alt: 'Patek Philippe Nautilus', isPrimary: true }],
            description: 'The pinnacle of luxury sports watches.'
        },
        {
            id: 'royal-oak-004',
            brand: 'Audemars Piguet',
            model: 'Royal Oak "Jumbo"',
            price: { amount: 85000, currency: 'USD', formatted: '$85,000' },
            category: 'Men',
            movement: 'Automatic',
            images: [{ url: '/images/watches/royaloak.jpg', alt: 'Audemars Piguet Royal Oak', isPrimary: true }],
            description: 'Decidedly avant-garde and legendary.'
        },
        {
            id: 'speedmaster-005',
            brand: 'Omega',
            model: 'Speedmaster Moonwatch',
            price: { amount: 7200, currency: 'USD', formatted: '$7,200' },
            category: 'Men',
            movement: 'Manual',
            images: [{ url: '/images/watches/speedmaster.jpg', alt: 'Omega Speedmaster', isPrimary: true }],
            description: 'The first watch worn on the moon.'
        },
        {
            id: 'tank-006',
            brand: 'Cartier',
            model: 'Tank Louis Cartier',
            price: { amount: 12800, currency: 'USD', formatted: '$12,800' },
            category: 'Women',
            movement: 'Manual',
            images: [{ url: '/images/watches/tank.jpg', alt: 'Cartier Tank', isPrimary: true }],
            description: 'The definitive elegance of Cartier jewelry watches.'
        },
        {
            id: 'reverso-007',
            brand: 'Jaeger-LeCoultre',
            model: 'Reverso Duoface',
            price: { amount: 11500, currency: 'USD', formatted: '$11,500' },
            category: 'Men',
            movement: 'Manual',
            images: [{ url: '/images/watches/reverso.jpg', alt: 'JLC Reverso', isPrimary: true }],
            description: 'A classic art deco masterpiece with two faces.'
        },
        {
            id: 'serpenti-008',
            brand: 'Bvlgari',
            model: 'Serpenti Tubogas',
            price: { amount: 18900, currency: 'USD', formatted: '$18,900' },
            category: 'Women',
            movement: 'Quartz',
            images: [{ url: '/images/watches/serpenti.jpg', alt: 'Bvlgari Serpenti', isPrimary: true }],
            description: 'The ultimate symbol of seduction and glamor.'
        }
    ],
    version: '1.1.0',
    lastUpdated: new Date().toISOString()
};
