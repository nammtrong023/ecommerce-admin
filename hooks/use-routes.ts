'use client';
import { useMemo } from 'react';
import { LayoutGrid, Package, Palette, Ruler } from 'lucide-react';
import { usePathname } from 'next/navigation';

const useRoutes = () => {
    const pathname = usePathname();

    const routes = useMemo(
        () => [
            {
                label: 'Sản Phẩm',
                sub: [
                    {
                        subLabel: 'Sản phẩm',
                        href: '/products',
                        icon: Package,
                        active: pathname === '/products',
                    },
                    {
                        subLabel: 'Danh mục',
                        href: '/categories',
                        icon: LayoutGrid,
                        active: pathname === '/categories',
                    },
                    {
                        subLabel: 'Màu sắc',
                        href: '/colors',
                        icon: Palette,
                        active: pathname === '/colors',
                    },
                    {
                        subLabel: 'Kích thước',
                        href: '/sizes',
                        icon: Ruler,
                        active: pathname === '/sizes',
                    },
                ],
            },
        ],
        [pathname],
    );

    return routes;
};

export default useRoutes;
