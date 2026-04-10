import {axiosInstance} from "@/api/axiosInstance";
import {AxiosResponse} from "axios";

export interface CatImage {
    id: string;
    url: string;
    width: number;
    height: number;
}

export const catAPI = {
    getRandomCats: async (limit: number = 15): Promise<CatImage[]> => {
        const response: AxiosResponse<CatImage[]> = await axiosInstance.get<CatImage[]>('images/search', {
            params: {
                limit,
                size: 'med',
            },
        })
        return response.data
    },

    getCatById: async (catId: string): Promise<CatImage> => {
        const response: AxiosResponse<CatImage> = await axiosInstance.get<CatImage>(`/images/${catId}`)
        return response.data
    },
}