import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";


const useWishlists = () => {
    const {user,loading} = useAuth();
    const axios = useAxios();
    const {data:wishlists=[],refetch,isPending} = useQuery({
        queryKey: ['wishlists'],
        enabled: !loading,
        queryFn: async () => {
            if(user?.email){
                const {data} = await axios.get(`/all-wishlists/${user?._id}`);
                return data;
            }
        }
    })

    return [wishlists,refetch,isPending]
};

export default useWishlists;