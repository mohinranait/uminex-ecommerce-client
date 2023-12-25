import useAuth from './useAuth';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useCarts = () => {
    const {user,loading} = useAuth();
    const axios = useAxios();
    const {data:carts={},refetch,isPending} = useQuery({
        queryKey: ['carts'],
        enabled: !loading,
        queryFn: async () => {
            if(user?.email){
                const {data} = await axios.get(`/shopping_carts?user_id=${user?._id}`);
                // console.log(data);
                return data;
            }
        }
    })

    return [carts,refetch,isPending]
};

export default useCarts;