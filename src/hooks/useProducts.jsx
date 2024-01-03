import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useProducts = (props) => {
    console.log(props);
    const {limit,sort,request,page,sortFiled} = props || {};
    const axiosPublic = useAxiosPublic();
    const {data:products=[],refetch,isPending} = useQuery({
        queryKey: ['products', limit, sort, request],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/products?limit=${limit}&page=${page}&sort=${sort}&sortFiled=${sortFiled}&request=${request}`);
            return data;
        }
    })
    return [products,refetch,isPending]
};

export default useProducts;