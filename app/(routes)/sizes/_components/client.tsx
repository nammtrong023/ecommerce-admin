'use client';
import { useRouter } from 'next/navigation';
import { columns, SizeColumn } from './columns';
import { Divider } from '@mui/material';
import { Plus, Trash } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { DataTable } from '@/components/ui/data-table';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { useProcess } from '@/hooks/use-process';

interface SizesClientProps {
    data: SizeColumn[];
}

export const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
    const router = useRouter();
    const { setIsNew } = useProcess();

    return (
        <>
            <div className='flex items-center justify-between pb-3'>
                <Heading title={`Kích Thước (${data.length})`} />
                <div className='flex items-center gap-x-2'>
                    <Button
                        onClick={() => {
                            router.push(`/sizes/${uuidv4()}`);
                            setIsNew(true);
                        }}
                    >
                        <Plus className='mr-2 h-4 w-4' /> Thêm mới
                    </Button>
                </div>
            </div>
            <Divider />
            <div className='w-1/2 ml-[50%] -translate-x-1/2'>
                <DataTable searchKey='value' columns={columns} data={data} />
            </div>
        </>
    );
};
