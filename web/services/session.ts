import { AxiosError } from "axios";
import api from "./api";


export const getSession = async (year: number, gp: string) => {
    try {
        const response = await api.get(`/session?year=${year}&gp=${gp}`);
        console.log("desde el front", response.data);
        return response.data
    } catch (error) {
        console.error('An error occurred while calling the Node API:', error.message);
    }
};

