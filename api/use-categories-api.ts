import axios from 'axios';
import { CategoryType } from '@/types';
import { CategoryFormValues } from '@/utils/validation/form-validation';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/categories`;

export const useCategoriesApi = () => {
    const getCategories = async () => {
        const reponse = await axios.get(baseUrl);

        return reponse.data as CategoryType[];
    };

    const getCategoryById = async (categoryId: string) => {
        const reponse = await axios.get(`${baseUrl}/${categoryId}`);

        return reponse.data as CategoryType;
    };

    const createCategory = async (data: CategoryFormValues) => {
        await axios.post(baseUrl, data);
    };

    const updateCategory = async (
        categoryId: string,
        data: CategoryFormValues,
    ) => {
        await axios.patch(baseUrl + '/' + categoryId, data);
    };

    const destroyCategory = async (categoryId: string | undefined) => {
        await axios.delete(baseUrl + '/' + categoryId);
    };

    return {
        getCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        destroyCategory,
    };
};
