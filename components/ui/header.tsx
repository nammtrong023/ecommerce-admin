import { UserButton } from '@clerk/nextjs';
import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <header className='border-b fixed z-50 top-0 left-0 right-0 bg-white'>
            <div className='flex items-center gap-x-10 h-16 px-4'>
                <Link href='/'>
                    <h3 className='font-semibold text-2xl'>Admin</h3>
                </Link>
                <div className='ml-auto flex items-center gap-x-4'>
                    <UserButton afterSignOutUrl='/' />
                </div>
            </div>
        </header>
    );
};

export default Header;
