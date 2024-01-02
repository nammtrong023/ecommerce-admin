import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatMoney = (price?: string | number): string => {
    if (price === undefined) {
        return '';
    }

    const multipliedPrice = Number(price);

    const formattedPrice = multipliedPrice.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const finalFormattedPrice = formattedPrice.replace(/\s/g, '');

    return finalFormattedPrice;
};
