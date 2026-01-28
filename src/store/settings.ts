import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Locale = 'en' | 'ar';

interface SettingsState {
    locale: Locale;
    theme: 'light' | 'dark';
    setLocale: (locale: Locale) => void;
    setTheme: (theme: 'light' | 'dark') => void;
    toggleLocale: () => void;
}

/**
 * useSettingsStore: Centralized truth for user preferences.
 * Implements Pass 3 Persistence Nexus (Zustand + LocalStorage).
 */
export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            locale: 'en',
            theme: 'dark',
            setLocale: (locale) => set({ locale }),
            setTheme: (theme) => set({ theme }),
            toggleLocale: () => set((state) => ({
                locale: state.locale === 'en' ? 'ar' : 'en'
            })),
        }),
        {
            name: 'timehouse-settings',
        }
    )
);
