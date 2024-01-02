export type CategoryType = {
    id: string;
    name: string;
    image: string;
    products: ProductType[];
    createdAt: Date;
};

export type ProductType = {
    id: string;
    price: number;
    name: string;
    isFeatured: boolean;
    images: Image[];
    category: CategoryType;
    description: string;
    sizes: SizesOnProducts[];
    colors: ColorsOnProducts[];
    createdAt: Date;
};

export type Image = {
    id: string;
    url: string;
};

export type SizeType = {
    id: string;
    name: string;
    value: string;
    createdAt: Date;
};

export type SizesOnProducts = {
    id: string;
    size: SizeType;
};

export type ColorType = {
    id: string;
    name: string;
    value: string;
    createdAt: Date;
};

export type UserType = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    address: string;
    phone: string;
    orders: OrderType[];
};

type ColorsOnProducts = {
    id: string;
    color: ColorType;
};

export type OrderType = {
    id: string;
    total: number;
    user: UserType;
    orderDetails: OrderDetailType[];
    createdAt: Date;
};

export type OrderDetailType = {
    id: string;
    product: ProductType;
    price: number;
    size: string;
    color: string;
    quantity: number;
    createdAt: Date;
};
