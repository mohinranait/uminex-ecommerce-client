/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "../../../services/UploadImage";
import useAxios from "../../../hooks/useAxios";

const UserForm = ({user,closeModal,refetch}) => {
    const axios = useAxios();
    const [uploadImageText, setUploadImageText] = useState("Upload image");

    const handleUser = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const mobile = form.mobile.value;
        const profile = form.profile.value;
        const role = form.role.value;
        const file = form.image.files[0];
        const toastId = toast.loading("Loading...")
        try {
            let assignImg;
            if(file?.name){
                assignImg =  await uploadImage(file)               
            }
            const userObj = {
                name,
                mobile,
                profile,
                role,
                avater: assignImg
            }
            if(!user){
                // Create new user
                const response = await axios.post(`/users`, userObj);
                if(response.data.success){
                    form.reset();
                    closeModal()
                    toast.success("User created", {id:toastId})
                    setUploadImageText("Upload Image")
                    refetch()
                }
            }else{
                // update user by email
                const response = await axios.patch(`/user/${user?.email}?request=admin`, userObj);
                console.log(response.data);
                if(response.data.success){
                    form.reset();
                    closeModal()
                    toast.success("User updated", {id:toastId})
                    setUploadImageText("Update image")
                    refetch()
                }
            }
        } catch (error) {
            toast.error(error.message, {id:toastId})
        }
    }
    return (
        <div className="bg-white relative">
            <form  onSubmit={handleUser} >
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="mb-4">
                        <label htmlFor="" className="text-sm text-gray-500">Name</label>
                        <input type="text" defaultValue={user?.name ? user?.name : ''} name="name" className="py-2 px-3 w-full border outline-primary focus:pl-5 rounded-md border-gray-200" placeholder="User name" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className="text-sm text-gray-500">Mobile</label>
                        <input type="text" defaultValue={user?.mobile ? user?.mobile : ''} name="mobile" className="py-2 px-3 w-full border outline-primary focus:pl-5 rounded-md border-gray-200" placeholder="Mobile" />
                    </div>
                </div>
                
                <div className="mb-5 grid md:grid-cols-2 gap-5">
                   <div>
                        <label htmlFor="" className="text-sm text-gray-500">Profile status</label>
                        <select name="profile" required  defaultValue={'default'} className="py-2 px-3 w-full border outline-primary  border-gray-100" id="">
                            <option value="DEFAULT"> Profile status</option>
                            <option value="active" selected={ user?.profile == 'active' ? true : false } >Active</option>
                            <option value="pending" selected={ !user?.profile == 'pending' ? true : false } >Pending </option>
                            <option value="blocked" selected={ !user?.profile == 'blocked' ? true : false } >Blocked </option>
                        </select>
                   </div>
                   <div>
                        <label htmlFor="" className="text-sm text-gray-500">User Role</label>
                        <select name="role" required  defaultValue={'default'} className="py-2 px-3 w-full border outline-primary  border-gray-100" id="">
                            <option value="DEFAULT"> Select Role</option>
                            <option value="user" selected={ user?.role == 'user' ? true : false } >User</option>
                            <option value="admin" selected={ user?.role == 'admin' ? true : false } >Admin </option>
                        </select>
                   </div>
                </div>
                <div className="mb-4">
                    <div className='file_upload px-5 py-5 relative border-4 border-dotted border-gray-300 rounded-lg'>
                        <div className='flex flex-col w-max  mx-auto text-center'>
                            <label>
                                <input
                                className='text-sm cursor-pointer w-36 hidden'
                                type='file'
                                name='image'
                                id='image'
                                accept='image/*'
                                hidden
                                onChange={(e) => setUploadImageText(e.target.files[0].name) }
                                />
                                <div className='bg-primary py-2 overflow-x-auto max-w-[250px] overflow-hidden text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-primary'>
                                    <span>{uploadImageText}</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <button type="submit" className="w-full py-3 bg-primary rounded-md text-white"> {user ? 'Update user':'Save user'} </button>
                </div>
            </form> 
        </div>
    );
};

export default UserForm;