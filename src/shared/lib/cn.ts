import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Joins class names, dropping falsy values and resolving Tailwind conflicts.
 *
 * @param classes - Class names, arrays or conditional objects.
 * @returns The merged class string.
 */
export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));
