import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";


const Convercation = ({chat, currentUser}) => {
    const axios = useAxios();
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const userId = chat?.members?.find(item => item !== currentUser )
        
        const getUserData = async () => {
            try {
                const {data} = await axios.get(`/user-by-id/${userId}`)
                setUserData(data?.user);
            } catch (error) {
                console.log(error)
            }
        };

        getUserData();
    },[])
    return (
        <>
    
            <div className="flex cursor-pointer items-center gap-2 hover:bg-gray-50 rounded ">
                <span className="w-16 h-16 rounded-full "><img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLfBIu29jWkRggduFwRWBxp_wbcnLVzsMpInNKsDBMZA&s" alt="" /></span>
                <div>
                    <p className="text-sm font-medium">{userData?.name}</p>
                    <p className="text-xs font-normal">Last</p>
                </div>
            </div>
        
        </>
    );
};

export default Convercation;