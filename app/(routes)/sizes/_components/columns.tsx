'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type SizeColumn = {
    id: string;
    name: string;
    value: string;
    createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
    {
        accessorKey: 'name',
        header: () => <div className='text-center'>Tên</div>,
    },
    {
        accessorKey: 'value',
        header: () => <div className='text-center'>Kích thước</div>,
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
