import * as z from 'zod';

// CATEGORY
export const categorySchema = z.object({
    name: z.string().min(2, 'Vui lòng không để trống!'),
    image: z.string().min(1, 'Vui lòng không để trống!'),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

// SIZE
export const sizeSchema = z.object({
    name: z.string().min(1, 'Vui lòng không để trống!'),
    value: z
        .string()
        .min(1, 'Vui lòng không để trống!')
        .max(3, 'Tối đa 3 ký tự'),
});

export type SizeFormValues = z.infer<typeof sizeSchema>;

// COLOR
export const colorSchema = z.object({
    name: z.string().min(1, 'Vui lòng không để trống!'),
    value: z
        .string()
        .min(7, 'Mã màu hex gồm 6 ký tự')
        .max(7, 'Mã màu hex gồm 6 ký tự'),
});

export type ColorFormValues = z.infer<typeof colorSchema>;

// PRODUCT
export const productSchema = z.object({
    name: z.string().min(5, 'Vui lòng không để trống!'),
    desc: z
        .string()
        .min(5, 'Vui lòng không để trống!')
        .max(175, 'Độ dài tối đa'),
    images: z
        .string()
        .array()
        .refine((value) => value.length > 0, 'Vui lòng thêm hình ảnh!'),
    price: z.coerce
        .number()
        .min(100000, 'Giá tối thiểu là 100.000!')
        .max(10000000, 'Giá tối đa là 10.000.000!'),
    categoryId: z.string().min(1, 'Vui lòng chọn danh mục!'),
    isFeatured: z.boolean().default(false).optional(),
    colorIds: z.coerce
        .string()
        .array()
        .min(1)
        .refine((value) => value.length > 0, 'Vui lòng thêm màu!'),
    sizeIds: z.coerce
        .string()
        .array()
        .min(1)
        .refine((value) => value.length > 0, 'Vui lòng chọn kích thước!'),
});

export type ProductFormValues = z.infer<typeof productSchema>;
