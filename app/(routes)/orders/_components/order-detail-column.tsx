'use client';
import { ColumnDef } from '@tanstack/react-table';

export type OrderDetailColumn = {
    id: number;
    productName: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
    timestamp: string;
};

export const columns: ColumnDef<OrderDetailColumn>[] = [
    {
        accessorKey: 'id',
        header: () => <div className='text-center'>ID</div>,
    },
    {
        accessorKey: 'productName',
        header: () => <div className='text-center'>Tên sản phẩm</div>,
    },
    {
        accessorKey: 'size',
        header: () => <div className='text-center'>Kích thước</div>,
    },
    {
        accessorKey: 'color',
        header: () => <div className='text-center'>Màu sắc</div>,
        cell: ({ row }) => (
            <div className='flex items-center justify-center gap-x-2'>
                <span
                    className='h-6 w-6 rounded-full border'
                    style={{
                        background: row.original.color,
                    }}
                />
            </div>
        ),
    },
    {
        accessorKey: 'quantity',
        header: () => <div className='text-center'>Số lượng</div>,
    },
    {
        accessorKey: 'price',
        header: () => <div className='text-center'>Tổng tiền</div>,
    },
    {
        accessorKey: 'timestamp',
        header: () => <div className='text-center'>Ngày tạo</div>,
    },
];
