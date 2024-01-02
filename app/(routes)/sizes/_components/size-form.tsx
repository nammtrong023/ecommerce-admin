'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Heading } from '@/components/ui/heading';
import { Divider } from '@mui/material';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertModal } from '@/components/ui/alert-modal';
import { Button } from '@/components/ui/button';
import { SizeFormValues, sizeSchema } from '@/utils/validation/form-validation';
import { SizeType } from '@/types';
import { useSizesApi } from '@/api/use-sizes-api';
import { useProcess } from '@/hooks/use-process';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface SizeFormProps {
    initialData?: SizeType | null;
}

export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
    const params = useParams();
    const sizeId = params.sizeId as string;
    const [mounted, setMounted] = useState(false);

    const router = useRouter();
    const { isNew } = useProcess();
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const { createSize, updateSize, destroySize } = useSizesApi();

    const title = initialData ? 'Chỉnh sửa kích thước' : 'Tạo Kích Thước';
    const action = initialData ? 'Lưu thay đổi' : 'Thêm mới';

    useEffect(() => {
        setMounted(true);
    }, []);

    const form = useForm<SizeFormValues>({
        resolver: zodResolver(sizeSchema),
        defaultValues: initialData || {
            value: '',
            name: '',
        },
    });

    const mutation = useMutation({
        mutationFn: (data: SizeFormValues) => {
            if (initialData) {
                return updateSize(sizeId, data);
            }

            return createSize(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-sizes'] });
            router.push('/sizes');
            toast.success('Thành công');
        },
        onError: (error: any) => {
            const errorMessage = error.response.data.message;
            toast.error(errorMessage);
        },
    });

    const handleDelete = useMutation({
        mutationFn: () => destroySize(sizeId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-sizes'] });
            router.push(`/sizes`);
            toast.success('Đã xoá.');
            setOpen(false);
        },
        onError: (error) => {
            toast.error('Có sản phẩm đang sử dụng');
            setOpen(false);
        },
    });

    const onSubmit = (data: SizeFormValues) => {
        mutation.mutate(data);
    };

    if (!mounted) return null;

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDelete.mutate}
                loading={handleDelete.isPending}
            />
            <div className='flex items-center justify-between pb-3'>
                <Heading title={title} />
                {!isNew && (
                    <Button variant='destructive' onClick={() => setOpen(true)}>
                        <Trash className='w-5 h-5' />
                    </Button>
                )}
            </div>
            <Divider />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='gap-y-8-8 w-full mt-5'
                >
                    <div className='md:grid md:grid-cols-3 gap-8'>
                        <FormField
                            control={form.control}
                            name='value'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kích thước</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={handleDelete.isPending}
                                            placeholder='Kích thước'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={handleDelete.isPending}
                                            placeholder='Tên'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={handleDelete.isPending}
                        className='ml-auto mt-4'
                        type='submit'
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
