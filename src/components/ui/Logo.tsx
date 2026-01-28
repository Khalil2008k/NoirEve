'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
    locale?: string;
    size?: 'sm' | 'md' | 'lg';
    showLink?: boolean;
}

const sizeClasses = {
    sm: {
        image: 'h-10',
        text: 'text-xl',
        margin: '-ml-1'
    },
    md: {
        image: 'h-14',
        text: 'text-2xl',
        margin: '-ml-1.5'
    },
    lg: {
        image: 'h-20',
        text: 'text-3xl',
        margin: '-ml-2'
    }
};

/**
 * Logo: NoirEve brand logo with image and styled text.
 * "Noir" - Serif italic, white
 * "Eve" - Sans-serif bold, primary/red
 */
export function Logo({ locale = 'en', size = 'lg', showLink = true }: LogoProps) {
    const classes = sizeClasses[size];

    const LogoContent = (
        <div className="flex items-center transition-opacity hover:opacity-80">
            {/* Logo Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/logo.png"
                alt="NoirEve"
                className={`${classes.image} w-auto object-contain`}
            />
            {/* Brand Text */}
            <span className={`${classes.text} tracking-tight flex items-baseline ${classes.margin}`}>
                <span
                    className="font-light text-white italic"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                    Noir
                </span>
                <span className="font-bold text-primary">Eve</span>
            </span>
        </div>
    );

    if (showLink) {
        return (
            <Link href={`/${locale}`}>
                {LogoContent}
            </Link>
        );
    }

    return LogoContent;
}
