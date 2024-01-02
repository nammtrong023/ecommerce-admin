'use client';

import { format } from 'date-fns';
import { ColorsClient } from './components/client';
import { ColorColumn } from './components/columns';
import { useColorsApi } from '@/api/use-colors-api';
import { useQuery } from '@tanstack/react-query';

const ColorsPage = () => {
    const { getColors } = useColorsApi();

    const { data } = useQuery({
        initialData: [],
        queryKey: ['get-colors'],
        queryFn: getColors,
    });

    const formattedSizes: ColorColumn[] = data.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(new Date(item.createdAt), 'dd/MM/yyyy'),
    }));

    return (
        <div className='flex-col'>
            <div className='flex-1 gap-y-4 p-8 pt-6'>
                <ColorsClient data={formattedSizes} />
            </div>
        </div>
    );
};

export default ColorsPage;
