import { NextResponse, type NextRequest } from 'next/server';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next) and static assets
        '/((?!_next|api|images|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.webp$).*)',
    ],
};
