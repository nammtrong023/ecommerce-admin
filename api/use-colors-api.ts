import axios from 'axios';
import { ColorType } from '@/types';
import { ColorFormValues } from '@/utils/validation/form-validation';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/colors`;

export const useColorsApi = () => {
    const getColors = async () => {
        const reponse = await axios.get(baseUrl);

        return reponse.data as ColorType[];
    };

    const getColorById = async (colorId: string) => {
        const reponse = await axios.get(`${baseUrl}/${colorId}`);

        return reponse.data as ColorType;
    };

    const createColor = async (data: ColorFormValues) => {
        await axios.post(baseUrl, data);
    };

    const updateColor = async (colorId: string, data: ColorFormValues) => {
        await axios.patch(baseUrl + '/' + colorId, data);
    };

    const destroyColor = async (colorId: string) => {
        await axios.delete(baseUrl + '/' + colorId);
    };

    return {
        getColors,
        getColorById,
        createColor,
        updateColor,
        destroyColor,
    };
};
