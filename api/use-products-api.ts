import axios from 'axios';
import { ProductType } from '@/types';
import { NewProductFormValues } from '@/app/(routes)/products/_components/product-form';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;

export const useProductsApi = () => {
    const getProducts = async () => {
        const reponse = await axios.get(baseUrl);

        return reponse.data.data as ProductType[];
    };

    const getProductById = async (productId: string) => {
        const reponse = await axios.get(`${baseUrl}/${productId}`);

        return reponse.data as ProductType;
    };

    const createProduct = async (data: NewProductFormValues) => {
        await axios.post(baseUrl, data);
    };

    const updateProduct = async (
        productId: string,
        data: NewProductFormValues,
    ) => {
        await axios.patch(baseUrl + '/' + productId, data);
    };

    const destroyProduct = async (productId: string) => {
        await axios.delete(baseUrl + '/' + productId);
    };

    return {
        getProducts,
        getProductById,
        createProduct,
        updateProduct,
        destroyProduct,
    };
};
