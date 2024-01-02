'use client';
import { useRouter } from 'next/navigation';
import { columns, CategoryColumn } from './columns';
import { Divider } from '@mui/material';
import { Plus, Trash } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { DataTable } from '@/components/ui/data-table';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { useProcess } from '@/hooks/use-process';

interface CategoriesClientProps {
    data: CategoryColumn[];
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
    const router = useRouter();
    const { setIsNew } = useProcess();

    return (
        <>
            <div className='flex items-center justify-between pb-3'>
                <Heading title={`Danh mục (${data.length})`} />
                <div className='flex items-center gap-x-2'>
                    <Button
                        onClick={() => {
                            router.push(`/categories/${uuidv4()}`);
                            setIsNew(true);
                        }}
                    >
                        <Plus className='mr-2 h-4 w-4' /> Thêm mới
                    </Button>
                </div>
            </div>
            <Divider />
            <div className='w-[60vw] ml-[50%] -translate-x-1/2'>
                <DataTable searchKey='name' columns={columns} data={data} />
            </div>
        </>
    );
};
