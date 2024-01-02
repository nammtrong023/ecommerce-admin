'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/ui/heading';
import ImageUpload from '@/components/ui/image-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CategoryType, ColorType, ProductType, SizeType } from '@/types';
import { useProcess } from '@/hooks/use-process';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProductsApi } from '@/api/use-products-api';
import { Trash } from 'lucide-react';
import {
    Divider,
    MenuItem,
    Chip,
    Box,
    Select as SelectMultiple,
} from '@mui/material';
import {
    ProductFormValues,
    productSchema,
} from '@/utils/validation/form-validation';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface Option {
    id: string;
    name?: string;
    value: string;
}

interface ProductFormProps {
    initialData?: ProductType;
    categories: CategoryType[];
    colors: ColorType[];
    sizes: SizeType[];
}

export type NewProductFormValues = {
    images: { url: string }[];
} & Omit<ProductFormValues, 'images'>;

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
    colors,
    sizes,
}) => {
    const router = useRouter();
    const { isNew } = useProcess();

    const queryClient = useQueryClient();
    const [mounted, setMounted] = useState(false);

    const [open, setOpen] = useState(false);
    const { createProduct, updateProduct } = useProductsApi();

    const title = initialData ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm';
    const action = initialData ? 'Lưu thay đổi' : 'Tạo sản phẩm';

    useEffect(() => {
        setMounted(true);
    }, []);

    const sizesEntry = initialData?.sizes?.map((entry) => entry);
    const colorsEntry = initialData?.colors?.map((entry) => entry);

    const defaultValues = initialData
        ? {
              ...initialData,
              sizeIds: sizesEntry?.map((item) => item.id),
              colorIds: colorsEntry?.map((item) => item.id),
              images: initialData.images?.map((image) => image.url),
              price: parseFloat(String(initialData?.price)),
              categoryId: initialData?.category.id.toString(),
          }
        : {
              name: '',
              desc: '',
              category: undefined,
              images: [],
              sizeIds: [],
              colorIds: [],
              price: 0,
              isFeatured: false,
          };

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        //@ts-ignore
        defaultValues,
    });

    const renderSelectedItems = (
        options: Option[] | undefined,
        selected: string[] | undefined,
    ) => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 0.5,
                }}
            >
                {selected?.map((option) => {
                    const foundOption = options?.find((value) => {
                        return value.id === option;
                    });

                    return (
                        <Chip
                            key={option}
                            label={foundOption?.name || foundOption?.value}
                        />
                    );
                })}
            </Box>
        );
    };

    const mutation = useMutation({
        mutationFn: (data: NewProductFormValues) => {
            if (initialData && !isNew) {
                return updateProduct(initialData.id, data);
            }

            return createProduct(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-products'] });
            router.push('/products');
            toast.success('Thành công');
        },
        onError: (error) => {
            console.log(error), toast.error('Thất bại.');
        },
    });

    const onSubmit = (values: ProductFormValues) => {
        const imagesData = values.images.map((url) => ({ url }));

        const data = {
            ...values,
            images: imagesData,
        };

        // @ts-ignore
        mutation.mutate(data);
    };

    if (!mounted) return null;

    return (
        <>
            {/* <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDelete.mutate}
                loading={handleDelete.isPending}
            /> */}
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
                            name='images'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={mutation.isPending}
                                            onRemove={(prevImg) => {
                                                const images =
                                                    field.value.filter(
                                                        (image) =>
                                                            image !== prevImg,
                                                    );
                                                field.onChange(images);
                                            }}
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
                                        <FormLabel>Tên sản phẩm</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={mutation.isPending}
                                                placeholder='Tên sản phẩm'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='desc'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel>Mô tả</FormLabel>
                                        <FormControl>
                                            <textarea
                                                disabled={mutation.isPending}
                                                maxLength={175}
                                                {...field}
                                                className='border rounded-lg p-3 outline-none min-h-[120px] resize-none overflow-hidden'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='categoryId'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Danh mục</FormLabel>
                                        <FormControl>
                                            <SelectMultiple
                                                disabled={mutation.isPending}
                                                style={{ width: '100%' }}
                                                value={field.value || []}
                                                onChange={(event: any) =>
                                                    field.onChange(event)
                                                }
                                            >
                                                {categories.map((category) => (
                                                    <MenuItem
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </MenuItem>
                                                ))}
                                            </SelectMultiple>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='colorIds'
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormControl>
                                                <SelectMultiple
                                                    multiple
                                                    disabled={
                                                        mutation.isPending
                                                    }
                                                    style={{ width: '100%' }}
                                                    value={field.value || []}
                                                    onChange={(event: any) =>
                                                        field.onChange(event)
                                                    }
                                                    renderValue={(selected) =>
                                                        renderSelectedItems(
                                                            colors,
                                                            selected,
                                                        )
                                                    }
                                                >
                                                    {colors.map((color) => (
                                                        <MenuItem
                                                            key={color.id}
                                                            value={color.id}
                                                        >
                                                            {color.name}
                                                        </MenuItem>
                                                    ))}
                                                </SelectMultiple>
                                            </FormControl>
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name='sizeIds'
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormControl>
                                                <SelectMultiple
                                                    multiple
                                                    disabled={
                                                        mutation.isPending
                                                    }
                                                    style={{ width: '100%' }}
                                                    value={field.value || []}
                                                    onChange={(event: any) =>
                                                        field.onChange(event)
                                                    }
                                                    renderValue={(selected) =>
                                                        renderSelectedItems(
                                                            sizes,
                                                            selected,
                                                        )
                                                    }
                                                >
                                                    {sizes.map((size) => (
                                                        <MenuItem
                                                            key={size.id}
                                                            value={size.id}
                                                        >
                                                            {size.value}
                                                        </MenuItem>
                                                    ))}
                                                </SelectMultiple>
                                            </FormControl>
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name='price'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Giá</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={mutation.isPending}
                                                type='number'
                                                placeholder='100'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='isFeatured'
                                render={({ field }) => (
                                    <FormItem className='flex items-center gap-x-3'>
                                        <FormLabel>Nổi bật</FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                className='!mt-0'
                                                checked={field.value}
                                                // @ts-ignore
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
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
