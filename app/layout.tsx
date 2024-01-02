import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import TanstackProvider from '@/components/provider/tanstack-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Admin',
    description: 'E-commerce admin',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body className={inter.className}>
                    <TanstackProvider>
                        <Toaster />
                        {children}
                    </TanstackProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
