'use client';

import { format } from 'date-fns';
import { ProductsClient } from './_components/client';
import { ProductColumn } from './_components/columns';
import { formatMoney } from '@/lib/utils';
import { useProductsApi } from '@/api/use-products-api';
import { useQuery } from '@tanstack/react-query';

const ProductsPage = () => {
    const { getProducts } = useProductsApi();

    const { data } = useQuery({
        initialData: [],
        queryKey: ['get-products'],
        queryFn: getProducts,
    });

    const formattedProducts: ProductColumn[] = data.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category.name,
        image: item.images[0]?.url,
        sizes: item.sizes.map((entry) => entry.size.value),
        colors: item.colors.map((entry) => entry.color.value),
        price: formatMoney(item.price),
        createdAt: format(new Date(item.createdAt), 'dd/MM/yyyy'),
    }));

    return (
        <div className='flex-col'>
            <div className='flex-1 gap-y-4 p-8 pt-6'>
                <ProductsClient data={formattedProducts} />
            </div>
        </div>
    );
};

export default ProductsPage;
