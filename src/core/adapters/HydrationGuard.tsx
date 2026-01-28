'use client';

import React, { useEffect, useState } from 'react';

/**
 * HydrationGuard: Prevents "Hydration Mismatch" hallucinations (Pass 3 Defense).
 * Ensures that high-fidelity UI elements only render after client-side hydration is complete.
 */
export function HydrationGuard({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Or a low-fidelity static skeleton if needed
    }

    return <>{children}</>;
}
