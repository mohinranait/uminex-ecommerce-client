import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBanners = () => {
    const axiosPublic = useAxiosPublic()
    const {data:banners=[],refetch} = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/all-banners`);
            return data.banners;
        }
    })
    return [banners,refetch]
};

export default useBanners;