/* eslint-disable react/prop-types */

import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const UsersRows = ({user, index,refetch , handleGetUserByEmail}) => {
    const {name, email, mobile, role, profile, avater} = user || {};
    const axios = useAxios();
    const handleDeleteUser = async () => {
        try {
           
            Swal.fire({
                title: "Are you sure?",
                text: "You won't to delete this user",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then( async (result) => {
                if (result.isConfirmed) {
                    const {data} = await axios.delete(`/user/${email}`)
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
                <td className="text-gray-400 py-2 flex gap-2 items-center">
                    <img src={avater} className="w-10" alt="" />
                    <p className="text-gray-700">{name}</p>
                </td>
               
                <td className="text-gray-400 py-2">
                    <p className="text-gray-700">{email}</p>
                </td>
                <td className="text-gray-400 py-2">
                    <p className="text-gray-700">{mobile}</p>
                </td>
                <td className="text-gray-400 py-2">
                    <p className="text-gray-700 capitalize">{role}</p>
                </td>
                <td className="text-gray-400 py-2">
                    <span className='capitalize'>{profile}</span>
                </td>
                <td className="text-gray-400 py-2 w-[200px]">
                    <div className="flex justify-end gap-3">
                        <button onClick={() => handleGetUserByEmail(email)} className="px-3 py-1 inline-block bg-green-50 text-green-700">Edit</button>
                        <button onClick={handleDeleteUser} className="px-3 py-1 inline-block bg-red-50 text-red-700">Delete</button>
                    </div>
                </td>
            </tr>   
        </>
    );
};

export default UsersRows;