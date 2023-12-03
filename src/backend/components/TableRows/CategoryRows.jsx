/* eslint-disable react/prop-types */

import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";


const CategoryRows = ({category, index, getSingleCategory,refetch}) => {
    const {name,image,status,_id, slug} = category || {};
    const axios = useAxios();

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't to delete this category",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) => {
            if (result.isConfirmed) {
                const {data} = await axios.delete(`/delete-category/${id}`);
                if(data.success){
                    toast.success("Deleted")
                    refetch();
                }
            }
        });
       
    }
    return (
        <>
            <tr>
                <td className="text-gray-400 py-2">{index+1}</td>
                <td className="text-gray-400 py-2">
                    <p className="text-gray-700">{name}</p>
                    <p className="text-xs text-gray-400">{slug}</p>
                </td>
                <td className="text-gray-400 py-2">
                    <img src={image} className="w-16" alt="" />
                </td>
                <td className="text-gray-400 py-2">{status ? "Public" : "Unpublic" }</td>
                <td className="text-gray-400 py-2 w-[200px]">
                    <div className="flex justify-end gap-3">
                        <button onClick={() => getSingleCategory(_id)} className="px-3 py-1 inline-block bg-green-50 text-green-700">Edit</button>
                        <button onClick={() => handleDelete(_id)} className="px-3 py-1 inline-block bg-red-50 text-red-700">Delete</button>
                    </div>
                </td>
            </tr>   
        </>
    );
};

export default CategoryRows;