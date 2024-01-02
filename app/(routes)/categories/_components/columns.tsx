'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import Image from 'next/image';

export type CategoryColumn = {
    id: string;
    name: string;
    image: string;
    createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: 'name',
        header: () => <div className='text-center'>Tên</div>,
    },
    {
        accessorKey: 'image',
        header: () => <div className='text-center'>Hình ảnh</div>,
        cell: ({ row }) => (
            <div className='flex items-center justify-center'>
                <Image
                    src={row.original.image || '/female-avatar.png'}
                    alt='Product Image'
                    width={60}
                    height={60}
                    className='rounded-md object-cover'
                />
            </div>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: () => <div className='text-center'>Ngày tạo</div>,
    },
    {
        id: 'actions',
        header: () => <div className='text-center'>Thao tác</div>,
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
