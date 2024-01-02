'use client';

import { format } from 'date-fns';
import { SizesClient } from './_components/client';
import { SizeColumn } from './_components/columns';
import { useSizesApi } from '@/api/use-sizes-api';
import { useQuery } from '@tanstack/react-query';

const SizesPage = () => {
    const { getSizes } = useSizesApi();

    const { data } = useQuery({
        initialData: [],
        queryKey: ['get-sizes'],
        queryFn: getSizes,
    });
    const formattedSizes: SizeColumn[] = data.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(new Date(item.createdAt), 'dd/MM/yyyy'),
    }));

    return (
        <div className='flex-col'>
            <div className='flex-1 gap-y-4 p-8 pt-6'>
                <SizesClient data={formattedSizes} />
            </div>
        </div>
    );
};

export default SizesPage;
