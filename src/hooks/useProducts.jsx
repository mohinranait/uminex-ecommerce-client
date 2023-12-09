import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useProducts = () => {
    const axiosPublic = useAxiosPublic();
    const {data:products=[],refetch} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/products`);
            return data;
        }
    })
    return [products,refetch]
};

export default useProducts;