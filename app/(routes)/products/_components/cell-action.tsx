'use client';
import axios from 'axios';
import { useState } from 'react';
import { Edit, Eye, EyeOff, MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ProductColumn } from './columns';
import { Button } from '@/components/ui/button';
import { AlertModal } from '@/components/ui/alert-modal';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProductsApi } from '@/api/use-products-api';
import { useProcess } from '@/hooks/use-process';

interface CellActionProps {
    data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const { setIsNew } = useProcess();
    const { destroyProduct } = useProductsApi();

    const handleDelete = useMutation({
        mutationFn: () => destroyProduct(data.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-products'] });
            router.push(`/products`);
            toast.success('Đã xoá.');
            setOpen(false);
        },
        onError: () => {
            toast.error('Thất bại.');
            setOpen(false);
        },
    });

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDelete.mutate}
                loading={handleDelete.isPending}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                        <MoreHorizontal className='h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                    <DropdownMenuItem
                        onClick={() => {
                            setIsNew(false);
                            router.push(`/products/${data.id}`);
                        }}
                    >
                        <Edit className='mr-2 h-4 w-4' /> Sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className='mr-2 h-4 w-4' /> Xoá
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
