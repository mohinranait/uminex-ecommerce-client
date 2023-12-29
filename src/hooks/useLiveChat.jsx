import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useLiveChat = (reciver_id) => {
    const axios = useAxios();
    const {user, loading} = useAuth();  
    console.log("user", user?._id, 'rev', reciver_id);

    const {data:messages=[]} = useQuery({
        queryKey : ['messages'],
        enabled : !loading,
        queryFn : async () => {
            // if(user?._id){
            //     const {data} = await axios.get(`/message?author_id=${user?._id}&reciver_id=${reciver_id}`);
            //     console.log(data?.messages);
            //     return data?.messages
            // }
        }
    })

    
    return [messages]
};

export default useLiveChat;