import Sidebar from '@/components/sidebar/sidebar';
import Header from '@/components/ui/header';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <div className='flex items-start justify-between min-h-screen mt-16'>
                <Sidebar />
                <div className='flex-1 bg-[#f9fafb] min-h-screen'>
                    {children}
                </div>
            </div>
        </>
    );
};

export default MainLayout;
