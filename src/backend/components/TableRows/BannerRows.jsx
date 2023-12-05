/* eslint-disable react/prop-types */

import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";


const BannerRows = ({banner,index,handleGetBannerId, refetch}) => {
    const {_id, image, title, subtitle, status} = banner || {};
    const axios = useAxios();

    const handleDeleteBanner = async () => {
       
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't to delete this slider",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then( async (result) => {
                if (result.isConfirmed) {
                    const toastId = toast.loading("Loading...")
                    const respnse = await axios.delete(`/delete-banners/${_id}`);
                    if(respnse.data.success){
                        toast.success("Deleted", {id:toastId})
                        refetch();
                    }else{
                        toast.error("Somthing wrong", {id:toastId})
                    }
                }
            });

           
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <>
            <tr>
                <td className="text-gray-400 py-2">{index+1}</td>
                <td className="text-gray-400 py-2">
                    <p className="text-gray-700">{title}</p>
                    <p className="text-xs text-gray-400">{subtitle}</p>
                </td>
                <td className="text-gray-400 py-2">
                    <img src={image} className="w-16" alt="" />
                </td>
                <td className="text-gray-400 py-2">{status ? "Public" : "Unpublic" }</td>
                <td className="text-gray-400 py-2 w-[200px]">
                    <div className="flex justify-end gap-3">
                        <button onClick={() => handleGetBannerId(_id)} className="px-3 py-1 inline-block bg-green-50 text-green-700">Edit</button>
                        <button onClick={handleDeleteBanner} className="px-3 py-1 inline-block bg-red-50 text-red-700">Delete</button>
                    </div>
                </td>
            </tr>   
        </>
    );
};

export default BannerRows;