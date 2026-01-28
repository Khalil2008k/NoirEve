import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Watch } from '@/core/types/catalog';

interface CartItem extends Watch {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (watch: Watch) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    _lastValidState: CartItem[] | null;
}

/**
 * useCartStore: The Sovereign Cart (Pass 5 & 7 Defense).
 * Implements Transactional Rollbacks and (implicitly) Checksum-ready structures.
 */
export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            _lastValidState: null,

            addItem: (watch) => {
                const currentItems = get().items;
                // Save current state as transactional "checkpoint"
                set({ _lastValidState: [...currentItems] });

                try {
                    const existing = currentItems.find((item) => item.id === watch.id);
                    if (existing) {
                        set({
                            items: currentItems.map((item) =>
                                item.id === watch.id ? { ...item, quantity: item.quantity + 1 } : item
                            ),
                        });
                    } else {
                        set({ items: [...currentItems, { ...watch, quantity: 1 }] });
                    }

                    // Transaction Succeeded
                    set({ _lastValidState: null });
                } catch (error) {
                    // Transaction Failed -> Roleback (Pass 7 Defense)
                    console.error('Cart Transaction Failed, rolling back...', error);
                    set({ items: get()._lastValidState || [] });
                }
            },

            removeItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.id !== id)
            })),

            updateQuantity: (id, quantity) => set((state) => ({
                items: state.items.map((item) =>
                    item.id === id ? { ...item, quantity: Math.max(1, Math.min(10, quantity)) } : item
                )
            })),

            clearCart: () => set({ items: [] }),
        }),

        {
            name: 'timehouse-cart',
        }
    )
);
