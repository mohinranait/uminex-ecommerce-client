import axios from "axios";
import { signOut } from "firebase/auth";
import auth from "../services/firebase";

export const instance = axios.create({
    baseURL: import.meta.env.VITE_DEVELOPMENT_ENV,
    withCredentials: true,
})

const useAxios = () => {
    instance.interceptors.response.use( (response) => {
        return response;
    }, async (error) => {
        console.log(error.response.status);
        if(error.response.status === 401 || error.response.status === 404){
            await signOut(auth);
        }
        return Promise.reject(error);
    })
    return instance
};

export default useAxios;