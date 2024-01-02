'use client';

import { format } from 'date-fns';
import { CategoriesClient } from './_components/client';
import { CategoryColumn } from './_components/columns';
import { useCategoriesApi } from '@/api/use-categories-api';
import { useQuery } from '@tanstack/react-query';

const CategoriesPage = () => {
    const { getCategories } = useCategoriesApi();

    const { data } = useQuery({
        initialData: [],
        queryKey: ['get-categories'],
        queryFn: getCategories,
    });

    const formattedCategories: CategoryColumn[] = data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        createdAt: format(new Date(item.createdAt), 'dd/MM/yyyy'),
    }));

    return (
        <div className='flex-col'>
            <div className='flex-1 gap-y-4 p-8 pt-6'>
                <CategoriesClient data={formattedCategories} />
            </div>
        </div>
    );
};

export default CategoriesPage;
