'use client';

import React, { useEffect, useState } from 'react';
import { useCategoriesApi } from '@/api/use-categories-api';
import { useQuery } from '@tanstack/react-query';
import { useProcess } from '@/hooks/use-process';
import { CategoryForm } from '../_components/category-form';

const CategoryPage = ({ params }: { params: { categoryId: string } }) => {
    const { getCategoryById } = useCategoriesApi();
    const [mounted, setMounted] = useState(false);
    const { isNew } = useProcess();

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data } = useQuery({
        queryKey: ['get-category-by-id'],
        queryFn: () => getCategoryById(params.categoryId),
        enabled: !isNew,
    });

    if (!mounted) return null;

    if (!isNew && !data) return null;

    return (
        <div className='p-5'>
            {isNew ? <CategoryForm /> : <CategoryForm initialData={data} />}
        </div>
    );
};

export default CategoryPage;
