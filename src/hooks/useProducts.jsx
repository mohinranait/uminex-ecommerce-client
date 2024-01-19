import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useProducts = (props) => {
    // console.log(props);
    const {limit,sort,request,page,sortFiled,search,status,access} = props || {};
    const axiosPublic = useAxiosPublic();
    const {data:products=[],refetch,isPending} = useQuery({
        queryKey: ['products', limit, sort, request,search,status,access,page],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/products?limit=${limit}&page=${page}&sort=${sort}&sortFiled=${sortFiled}&request=${request}&search=${search||null}&status=${status}&access=${access||'user'}`);
            return data;
        }
    })
    return [products,refetch,isPending]
};

export default useProducts;