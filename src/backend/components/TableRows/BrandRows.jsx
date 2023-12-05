/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";


const BrandRows = ({index, refetch, handleGetBrandId, brand}) => {
    const  {name, slug, logo,status, _id} = brand || {};
    const axios = useAxios();
    const handleDeleteBrand = async () => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't to delete this brand",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then( async (result) => {
                if (result.isConfirmed) {
                    const {data} = await axios.delete(`/delete-brand/${_id}`);
                    if(data.success){
                        toast.success("Deleted")
                        refetch();
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
                    <p className="text-gray-700">{name}</p>
                    <p className="text-xs text-gray-400">{slug}</p>
                </td>
                <td className="text-gray-400 py-2">
                    <img src={logo} className="w-16" alt="" />
                </td>
                <td className="text-gray-400 py-2">{status ? "Public" : "Unpublic" }</td>
                <td className="text-gray-400 py-2 w-[200px]">
                    <div className="flex justify-end gap-3">
                        <button onClick={() => handleGetBrandId(_id)} className="px-3 py-1 inline-block bg-green-50 text-green-700">Edit</button>
                        <button onClick={handleDeleteBrand} className="px-3 py-1 inline-block bg-red-50 text-red-700">Delete</button>
                    </div>
                </td>
            </tr>   
        </>
    );
};

export default BrandRows;