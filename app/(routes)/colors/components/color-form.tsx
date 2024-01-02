'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { Heading } from '@/components/ui/heading';
import { Divider } from '@mui/material';
import { Input } from '@/components/ui/input';
import { AlertModal } from '@/components/ui/alert-modal';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useProcess } from '@/hooks/use-process';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useColorsApi } from '@/api/use-colors-api';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    ColorFormValues,
    colorSchema,
} from '@/utils/validation/form-validation';
import { ColorType } from '@/types';

interface ColorFormProps {
    initialData?: ColorType | null;
}

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
    const params = useParams();
    const colorId = params.colorId as string;

    const router = useRouter();
    const { isNew } = useProcess();
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const { createColor, updateColor, destroyColor } = useColorsApi();

    const title = initialData ? 'Chỉnh sửa màu' : 'Thêm màu mới';
    const action = initialData ? 'Lưu thay đổi' : 'Thêm mới';

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(colorSchema),
        defaultValues: initialData || {
            name: '',
            value: '#',
        },
    });

    const mutation = useMutation({
        mutationFn: (data: ColorFormValues) => {
            if (initialData) {
                return updateColor(colorId, data);
            }

            return createColor(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-colors'] });
            router.push('/colors');
            toast.success('Thành công');
        },
        onError: (error: any) => {
            const errorMessage = error.response.data.message;
            toast.error(errorMessage);
        },
    });

    const handleDelete = useMutation({
        mutationFn: () => destroyColor(colorId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-colors'] });
            router.push(`/colors`);
            toast.success('Đã xoá.');
            setOpen(false);
        },
        onError: () => {
            toast.error('Thất bại.');
            setOpen(false);
        },
    });

    const onSubmit = (values: ColorFormValues) => {
        mutation.mutate(values);
    };

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
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên màu</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={handleDelete.isPending}
                                            placeholder='Trắng'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='value'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mã màu</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={handleDelete.isPending}
                                            placeholder='#FFFFFF'
                                            {...field}
                                            onChange={(e) => {
                                                if (
                                                    !e.target.value.startsWith(
                                                        '#',
                                                    )
                                                ) {
                                                    e.target.value =
                                                        '#' + e.target.value;
                                                }
                                                field.onChange(e);
                                            }}
                                            value={
                                                field.value.startsWith('#')
                                                    ? field.value
                                                    : '#' + field.value
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={handleDelete.isPending}
                        className='ml-auto mt-5'
                        type='submit'
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
