import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { AccordionContent } from '../ui/accordion';

type SubItem = {
    subLabel: string;
    icon: LucideIcon;
    href: string;
    active?: boolean;
    onClick?: () => void;
};

interface SidebarItemProps {
    sub: SubItem[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({ sub }) => {
    return (
        <>
            {sub.map((item) => {
                const Icon = item.icon;
                return (
                    <AccordionContent
                        className='w-full list-none pb-2'
                        key={item.subLabel}
                        onClick={item.onClick}
                    >
                        <Link
                            href={item.href}
                            className={cn(
                                'relative select-none hidden lg:flex gap-x-4 py-3 px-5 w-full rounded-lg hover:bg-opacity-80 cursor-pointer items-center',
                                item.active
                                    ? 'bg-[#ecf0f1]'
                                    : 'hover:bg-[#ecf0f1]',
                            )}
                        >
                            <Icon size={20} className='text-[#4E5D78]' />
                            <p className='hidden lg:block text-[#4E5D78] text-base font-medium'>
                                {item.subLabel}
                            </p>
                        </Link>
                    </AccordionContent>
                );
            })}
        </>
    );
};

export default SidebarItem;
