import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import UsersRows from '../components/TableRows/UsersRows';
import { useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import Modal from '../global/modal/Modal';
import UserForm from '../components/form/UserForm';
import toast from "react-hot-toast"

const Users = () => {
    const axios = useAxios();
    const [user, setUser] = useState();
    const [ isOpenModal, setIsOpenModal] = useState(false);

    const {data:users=[], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const {data} = await axios.get(`/users`);
            return data.users;
        }
    })

    const closeModal = () => {
        setIsOpenModal(false)
        setUser(null)
    }

    const openModal = () => {
        setIsOpenModal(true)
    }
    
    
    // get user information by id for edit
    const handleGetUserByEmail = async (email) => {
        try {
            const response = await axios.get(`/user/${email}?request=admin`);
            setUser(response.data.user);
            setIsOpenModal(true)
        } catch (error) {
            toast.error(error.message)
        }
       
    }
    return (
    <>
        <div className="bg-white px-5 py-5">
            <div className="flex justify-between items-center gap-5 mb-5">
                <div className="flex items-center  gap-5">
                    <div className="flex items-center gap-1">
                        Show 
                        <select name="" className="py-2 border rounded w-[60px] text-sm px-1 outline-blue-500" id="">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        items
                    </div>
                    <div>
                        <select name="" className="py-2 border rounded w-full lg:w-[300px] text-sm px-3 outline-blue-500" id="">
                            <option key={'1'} value="">Status</option>
                            <option key={'2'} value="true">Public</option>
                            <option key={'3'} value="false">Unpublic</option>
                        </select>
                    </div>
                    <div>
                        <input type="search" className="py-2 border rounded w-full lg:w-[300px] text-sm px-3 outline-blue-500" placeholder="Search by name" />
                    </div>
                </div>
                <button onClick={openModal} className="flex gap-1 items-center py-2 px-3 bg-primary text-white rounded text-sm"><IoAddOutline />Add User</button>
            </div>
            <hr />
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="text-left text-gray-600 py-3">ID</th>
                            <th className="text-left text-gray-600 py-3">Name</th>
                            <th className="text-left text-gray-600 py-3">email</th>
                            <th className="text-left text-gray-600 py-3">phone</th>
                            <th className="text-left text-gray-600 py-3">Role</th>
                            <th className="text-left text-gray-600 py-3">Visibility</th>
                            <th className=" text-gray-600 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <UsersRows key={user?._id} index={index} refetch={refetch} handleGetUserByEmail={handleGetUserByEmail} user={user}  /> )
                        }
                        
                    </tbody>
                </table>

                {
                    users?.length == 0 && <div className="py-3 px-5 bg-blue-50 text-blue-600 rounded mt-5 text-center">
                        <p>User is not found</p>
                    </div>
                }
            </div>
        </div>

        <Modal isOpenModal={isOpenModal} width={'30'} closeModal={closeModal} >
            <div className="w-[95vw] lg:w-[40vw]">
               <UserForm user={user} refetch={refetch} closeModal={closeModal} />
            </div>
        </Modal>
    </>
    );
};

export default Users;