import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn: Robust utility for merging Tailwind classes. 
 * Prevents logic collisions in complex component states.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
