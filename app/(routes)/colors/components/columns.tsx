'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type ColorColumn = {
    id: string;
    name: string;
    value: string;
    createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
    {
        accessorKey: 'name',
        header: () => <div className='text-center'>Tên màu</div>,
    },
    {
        accessorKey: 'value',
        header: () => <div className='text-center'>Mã màu</div>,
        cell: ({ row }) => (
            <div className='flex items-center justify-center gap-x-2'>
                <span
                    className='h-6 w-6 rounded-full border'
                    style={{
                        background: row.original.value,
                    }}
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
