'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

/**
 * QueryProvider: The "Persistence Nexus" (Pass 3 & 7 Defense).
 * Configures TanStack Query with LocalStorage/IndexedDB persistence.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => {
        const client = new QueryClient({
            defaultOptions: {
                queries: {
                    gcTime: 1000 * 60 * 60 * 24, // 24 hours
                    staleTime: 1000 * 60 * 5, // 5 minutes
                    retry: 3,
                    refetchOnWindowFocus: false,
                },
            },
        });

        // Initialize persistence if in browser
        if (typeof window !== 'undefined') {
            const persister = createSyncStoragePersister({
                storage: window.localStorage,
            });

            persistQueryClient({
                queryClient: client,
                persister,
                maxAge: 1000 * 60 * 60 * 24, // 24 hours
            });
        }

        return client;
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
