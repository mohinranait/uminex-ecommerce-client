import axios from "axios";

export const instance = axios.create({
    baseURL: import.meta.env.VITE_DEVELOPMENT_ENV,
    withCredentials: true,
})

const useAxios = () => {
    return instance
};

export default useAxios;