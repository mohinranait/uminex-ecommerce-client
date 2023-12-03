import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useCategorys = ({search,status}) => {
    const visibility = status;
    const searchValue = search;
    const axiosPublic = useAxiosPublic();
    const {data:categorys=[],refetch} = useQuery({
        queryKey: ['categorys',visibility,searchValue],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/all-categorys?search=${searchValue}&status=${visibility}`);
            return data.categorys;
        }
    })
    return [categorys,refetch]
};

export default useCategorys;