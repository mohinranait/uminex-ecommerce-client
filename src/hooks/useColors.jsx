import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useColors = () => {
    const axiosPublic = useAxiosPublic();
    const {data:colors=[],refetch} = useQuery({
        queryKey: ['colors'],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/colors`);
            return data.colors;
        }
    })
    return [colors,refetch]
};

export default useColors;