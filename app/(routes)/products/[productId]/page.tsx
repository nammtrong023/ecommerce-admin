'use client';

import React, { useEffect, useState } from 'react';
import { ProductForm } from '@/app/(routes)/products/_components/product-form';
import { useProductsApi } from '@/api/use-products-api';
import { useColorsApi } from '@/api/use-colors-api';
import { useCategoriesApi } from '@/api/use-categories-api';
import { useSizesApi } from '@/api/use-sizes-api';
import { useQueries } from '@tanstack/react-query';
import { useProcess } from '@/hooks/use-process';

const ProductPage = ({ params }: { params: { productId: string } }) => {
    const { getProductById } = useProductsApi();
    const { getCategories } = useCategoriesApi();

    const { getColors } = useColorsApi();
    const { getSizes } = useSizesApi();

    const [mounted, setMounted] = useState(false);
    const { isNew } = useProcess();

    useEffect(() => {
        setMounted(true);
    }, []);

    const data = useQueries({
        queries: [
            {
                queryKey: ['get-product-by-id'],
                queryFn: () => getProductById(params.productId),
                enabled: !isNew,
            },
            {
                initialData: [],
                queryKey: ['get-categories'],
                queryFn: getCategories,
            },
            {
                initialData: [],
                queryKey: ['get-colors'],
                queryFn: getColors,
            },
            {
                initialData: [],
                queryKey: ['get-sizes'],
                queryFn: getSizes,
            },
        ],
    });

    const product = data[0].data;
    const categories = data[1].data;
    const colors = data[2].data;
    const sizes = data[3].data;

    if (!mounted) return null;

    if (!categories || !colors || !sizes) return null;

    if (!isNew && !product) return null;

    return (
        <div className='p-5'>
            {isNew ? (
                <ProductForm
                    categories={categories}
                    colors={colors}
                    sizes={sizes}
                />
            ) : (
                <ProductForm
                    initialData={product}
                    categories={categories}
                    colors={colors}
                    sizes={sizes}
                />
            )}
        </div>
    );
};

export default ProductPage;
