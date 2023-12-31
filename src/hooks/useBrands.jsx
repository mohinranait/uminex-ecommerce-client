import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useBrands = () => {
    const axiosPublic = useAxiosPublic();
    const {data:brands=[],refetch,isPending:brandPending} = useQuery({
        queryKey: ['brands'],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/all-brands`);
            return data.brands;
        }
    })
    return [brands,refetch,brandPending]
};

export default useBrands;