import { Helmet } from 'react-helmet-async';

import useAuth from "../../../hooks/useAuth"
import useAxios from '../../../hooks/useAxios';
import { useState } from 'react';
import { uploadImage } from '../../../services/UploadImage';
import toast from 'react-hot-toast';
const UserProfile = () => {
    const [imgText, setImgText] = useState("Profile image")
    const {user, setUser} = useAuth()
    const axios = useAxios();


    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        const form = e.target;
        // user form value
        const name = form?.name.value;
        const mobile = form?.mobile.value;
        const company = form?.company.value;
        const profile = form.image.files[0];
        if(name?.length == 0){
            toast("Name filed is require", {icon: '❌'})
            return 
        }
       
        try {
            let avater = user?.avater;
            if( profile){
                avater = await uploadImage(profile)
            }
            
            const userObj = {name,mobile,company,avater} 
            const {data} = await axios.patch(`/user/${user?.email}`, userObj)
            if(data.success){
                setUser(data.user)
                toast.success("Update successfull")
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <>
            <Helmet>
                <title> Update profile information | Store MI</title>
            </Helmet>
            <div>
                <form onSubmit={handleProfileUpdate}>
                    <div className='flex flex-col md:flex-row gap-5 mb-5'>
                        <div className='w-full'>
                            <label htmlFor="" className='text-sm font-medium mb-1 inline-block text-gray-500 '>First name</label>
                            <input type="text" name='name' defaultValue={user?.name || ''} className='py-2 px-3 w-full bg-gray-50 rounded-md border outline-primary' placeholder='First name' />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="" className='text-sm font-medium mb-1 inline-block text-gray-500 '>Phone</label>
                            <input type="text" name='mobile' defaultValue={user?.mobile || ''} className='py-2 px-3 w-full bg-gray-50 rounded-md border outline-primary' placeholder='Phone' />
                        </div>
                    </div>
                    <div className='flex gap-5 mb-5 flex-col md:flex-row'>
                        <div className='w-full'>
                            <label htmlFor="" className='text-sm font-medium mb-1 inline-block text-gray-500 '>Company</label>
                            <input type="text" name='company' defaultValue={user?.company || ''} className='py-2 px-3 w-full bg-gray-50 rounded-md border outline-primary' placeholder='Company' />
                        </div>
                    </div>
                    <div className='mb-5'>
                        <label className='file_upload px-5 py-5 h-[200px] cursor-pointer flex items-center justify-center relative border-4 border-dotted border-gray-300 rounded-lg'>
                            <div className='flex flex-col w-max  mx-auto text-center'>
                                <div>
                                    <input
                                    className='text-sm cursor-pointer w-36 hidden'
                                    type='file'
                                    name='image'
                                    id='image'
                                    accept='image/*'
                                    hidden
                                    onChange={(e) => setImgText(e.target.files[0].name)}
                                    />
                                    <div className='bg-[#999] py-2 overflow-x-auto max-w-[250px] overflow-hidden text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-primary'>
                                        <span>{imgText}</span>
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>
                  
                    <div className='flex gap-5 mb-5 flex-col md:flex-row'>
                        <div>
                            <button type='submit' className='px-5 py-2 inline-block bg-secondary text-white font-medium rounded-md'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UserProfile;