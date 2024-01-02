'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import Image from 'next/image';

export type ProductColumn = {
    id: string;
    name: string;
    category: string;
    sizes: string[];
    image: string;
    colors: string[];
    price: string;
    createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
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
        accessorKey: 'category',
        header: () => <div className='text-center'>Danh mục</div>,
    },
    {
        accessorKey: 'size',
        header: () => <div className='text-center'>Kích thước</div>,
        cell: ({ row }) => (
            <div className='flex items-center justify-center gap-x-2'>
                {row.original.sizes.map((size) => (
                    <p key={size} className='rounded-xl bg-slate-200 p-1'>
                        {size}
                    </p>
                ))}
            </div>
        ),
    },
    {
        accessorKey: 'color',
        header: () => <div className='text-center'>Màu</div>,
        cell: ({ row }) => (
            <div className='flex items-center justify-center gap-x-2'>
                {row.original.colors.map((color) => (
                    <span
                        key={color}
                        className='h-6 w-6 rounded-full border'
                        style={{
                            background: color,
                        }}
                    />
                ))}
            </div>
        ),
    },
    {
        accessorKey: 'price',
        header: () => <div className='text-center'>Giá</div>,
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
