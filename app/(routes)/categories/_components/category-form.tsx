'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProcess } from '@/hooks/use-process';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertModal } from '@/components/ui/alert-modal';
import { Trash } from 'lucide-react';
import { Divider } from '@mui/material';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { CategoryType } from '@/types';
import {
    CategoryFormValues,
    categorySchema,
} from '@/utils/validation/form-validation';
import { useCategoriesApi } from '@/api/use-categories-api';
import { ImageUploadSingle } from '@/components/image-upload';

interface CategoryFormProps {
    initialData?: CategoryType;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
    const router = useRouter();
    const { isNew } = useProcess();

    const queryClient = useQueryClient();
    const [mounted, setMounted] = useState(false);

    const [open, setOpen] = useState(false);
    const { createCategory, updateCategory, destroyCategory } =
        useCategoriesApi();

    const title = initialData ? 'Sửa Danh mục' : 'Thêm Danh mục';
    const action = initialData ? 'Lưu thay đổi' : 'Tạo danh mục';

    useEffect(() => {
        setMounted(true);
    }, []);

    const defaultValues = initialData
        ? initialData
        : {
              name: '',
              image: '',
          };

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues,
    });

    const mutation = useMutation({
        mutationFn: (data: CategoryFormValues) => {
            if (initialData && !isNew) {
                return updateCategory(initialData.id, data);
            }

            return createCategory(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-categories'] });
            router.push('/categories');
            toast.success('Thành công');
        },
        onError: () => toast.error('Thất bại.'),
    });

    const handleDelete = useMutation({
        mutationFn: () => destroyCategory(initialData?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-categories'] });
            router.push(`/categories`);
            toast.success('Đã xoá.');
            setOpen(false);
        },
        onError: () => {
            toast.error('Thất bại.');
            setOpen(false);
        },
    });

    const onSubmit = (values: CategoryFormValues) => {
        mutation.mutate(values);
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
            <div className='pb-10'>
                <div className='flex items-center justify-between pb-3'>
                    <Heading title={title} />
                    {!isNew && (
                        <Button
                            variant='destructive'
                            onClick={() => setOpen(true)}
                        >
                            <Trash className='w-5 h-5' />
                        </Button>
                    )}
                </div>
                <Divider />
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='my-8 w-full'
                    >
                        <FormField
                            name='image'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <ImageUploadSingle
                                            onRemove={() => field.onChange('')}
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className='gap-8 lg:flex lg:flex-col w-[30vw] mx-auto'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tên danh mục</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={mutation.isPending}
                                                placeholder='Danh mục'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            className='relative left-1/2 top-10 -translate-x-1/2'
                            type='submit'
                            disabled={mutation.isPending}
                        >
                            {action}
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
};
