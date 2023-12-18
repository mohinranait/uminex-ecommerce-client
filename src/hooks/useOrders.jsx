import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useOrders = (request) => {
    const axios = useAxios();
    const {data:orders=[],refetch} = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const {data} = await axios.get(`/get-all-orders?request=${request}`);
            return data.orders
        }
    })
    return [orders,refetch]
};

export default useOrders;