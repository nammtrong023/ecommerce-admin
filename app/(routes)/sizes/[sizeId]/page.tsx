'use client';

import React from 'react';
import { SizeForm } from '@/app/(routes)/sizes/_components/size-form';
import { useProcess } from '@/hooks/use-process';
import { useSizesApi } from '@/api/use-sizes-api';
import { useQuery } from '@tanstack/react-query';

const SizePage = ({ params }: { params: { sizeId: string } }) => {
    const { isNew } = useProcess();
    const { getSizeById } = useSizesApi();

    const { data } = useQuery({
        queryKey: ['get-color-by-id'],
        queryFn: () => getSizeById(params.sizeId),
    });

    if (!isNew && !data) return null;

    return (
        <div className='p-5'>
            {isNew ? <SizeForm /> : <SizeForm initialData={data} />}
        </div>
    );
};

export default SizePage;
