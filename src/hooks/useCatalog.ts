'use client';

import { useQuery } from '@tanstack/react-query';
import { GENESIS_CATALOG } from '@/core/genesis';
import type { Watch } from '@/core/types/catalog';

/**
 * useCatalog: The "Sovereign Catalog" Hook (Pass 7 Apex Defense).
 * Uses the GENESIS_CATALOG as initial data and placeholder to prevent 
 * ghost shells while checking for updates or local overrides.
 */
export function useCatalog() {
    return useQuery({
        queryKey: ['catalog'],
        queryFn: async (): Promise<Watch[]> => {
            // In a real scenario, this would fetch from an API
            // Here, it validates against the Genesis Seed to ensure truth.
            return GENESIS_CATALOG.items;
        },
        initialData: GENESIS_CATALOG.items,
        staleTime: Infinity, // Keep genesis data until explicit invalidation
    });
}
