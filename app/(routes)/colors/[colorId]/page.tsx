'use client';

import React, { useEffect, useState } from 'react';
import { ColorForm } from '@/app/(routes)/colors/components/color-form';
import { useColorsApi } from '@/api/use-colors-api';
import { useProcess } from '@/hooks/use-process';
import { useQuery } from '@tanstack/react-query';

const ColorPage = ({ params }: { params: { colorId: string } }) => {
    const { isNew } = useProcess();
    const { getColorById } = useColorsApi();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data } = useQuery({
        queryKey: ['get-color-by-id'],
        queryFn: () => getColorById(params.colorId),
        enabled: !isNew,
    });

    if (!isNew && !data) return null;

    if (!mounted) return null;

    return (
        <div className='p-5'>
            {isNew ? <ColorForm /> : <ColorForm initialData={data} />}
        </div>
    );
};

export default ColorPage;
