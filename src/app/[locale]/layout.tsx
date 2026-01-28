import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { HydrationGuard } from '@/core/adapters/HydrationGuard';
import { QueryProvider } from '@/core/adapters/QueryProvider';
import { ToastProvider } from '@/components/ui/Toast';
import type { Locale } from '@/store/settings';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'NoirEve | Luxury Timepieces',
  description: 'Experience the pinnacle of luxury with NoirEve. Curated watches for the discerning.',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className="dark">
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        <HydrationGuard>
          <QueryProvider>
            <ToastProvider>
              <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/30">
                {children}
              </div>
            </ToastProvider>
          </QueryProvider>
        </HydrationGuard>
      </body>
    </html>
  );
}

