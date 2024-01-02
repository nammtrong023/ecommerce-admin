'use client';
import { formatMoney } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export type OrderColumn = {
    id: number;
    total: number;
    timestamp: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: 'total',
        header: () => <div className='text-center'>Tổng tiền</div>,
        cell: ({ row }) => <span>{formatMoney(row.original.total)}</span>,
    },
    {
        accessorKey: 'timestamp',
        header: () => <div className='text-center'>Ngày tạo</div>,
    },
    {
        id: 'actions',
        header: () => <div className='text-center'>Thao tác</div>,
        cell: ({ row }) => (
            <Link
                href={`/orders/${row.original.id}`}
                className='hover:underline text-blue-400'
            >
                Xem chi tiết
            </Link>
        ),
    },
];
