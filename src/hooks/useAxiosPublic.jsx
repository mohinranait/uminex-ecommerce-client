import axios from "axios";

export const instancePublic = axios.create({
    baseURL: import.meta.env.VITE_DEVELOPMENT_ENV,
})

const useAxiosPublic = () => {
    return instancePublic
};

export default useAxiosPublic;