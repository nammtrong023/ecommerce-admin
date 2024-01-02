import axios from 'axios';
import { SizeType } from '@/types';
import { SizeFormValues } from '@/utils/validation/form-validation';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/sizes`;

export const useSizesApi = () => {
    const getSizes = async () => {
        const reponse = await axios.get(baseUrl);

        return reponse.data as SizeType[];
    };

    const getSizeById = async (sizeId: string) => {
        const reponse = await axios.get(`${baseUrl}/${sizeId}`);

        return reponse.data as SizeType;
    };

    const createSize = async (data: SizeFormValues) => {
        await axios.post(baseUrl, data);
    };

    const updateSize = async (sizeId: string, data: SizeFormValues) => {
        await axios.patch(baseUrl + '/' + sizeId, data);
    };

    const destroySize = async (sizeId: string) => {
        await axios.delete(baseUrl + '/' + sizeId);
    };

    return {
        getSizes,
        getSizeById,
        createSize,
        updateSize,
        destroySize,
    };
};
