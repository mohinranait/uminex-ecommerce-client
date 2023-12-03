import React from 'react';

const UserProfile = () => {
    return (
        <>
            <div>
                <form action="">
                    <div className='flex flex-col md:flex-row gap-5 mb-5'>
                        <div className='w-full'>
                            <label htmlFor="" className='text-sm font-medium mb-1 inline-block text-gray-500 '>First name</label>
                            <input type="text" name='name' className='py-2 px-3 w-full bg-gray-50 rounded-md border outline-primary' placeholder='First name' />
                        </div>
                        <div className='w-full'>
                        <label htmlFor="" className='text-sm font-medium mb-1 inline-block text-gray-500 '>Last name</label>
                            <input type="text" name='name' className='py-2 px-3 w-full bg-gray-50 rounded-md border outline-primary' placeholder='Last name' />
                        </div>
                    </div>
                    <div className='flex gap-5 mb-5 flex-col md:flex-row'>
                        <div className='w-full'>
                            <label htmlFor="" className='text-sm font-medium mb-1 inline-block text-gray-500 '>Email</label>
                            <input type="text" name='email' className='py-2 px-3 w-full bg-gray-50 rounded-md border outline-primary' placeholder='Email' />
                        </div>
                        <div className='w-full'>
                        <label htmlFor="" className='text-sm font-medium mb-1 inline-block text-gray-500 '>Phone</label>
                            <input type="text" name='phone' className='py-2 px-3 w-full bg-gray-50 rounded-md border outline-primary' placeholder='Phone' />
                        </div>
                    </div>
                    <div className='flex gap-5 mb-5 flex-col md:flex-row'>
                        <div className='w-full'>
                            <label htmlFor="" className='text-sm font-medium mb-1 inline-block text-gray-500 '>Company</label>
                            <input type="text" name='company' className='py-2 px-3 w-full bg-gray-50 rounded-md border outline-primary' placeholder='Company' />
                        </div>
                        <div className='w-full'>
                        <label htmlFor="" className='text-sm font-medium mb-1 inline-block text-gray-500 '>City</label>
                            <input type="text" name='city' className='py-2 px-3 w-full bg-gray-50 rounded-md border outline-primary' placeholder='City' />
                        </div>
                    </div>
                    <div className='flex gap-5 mb-5 flex-col md:flex-row'>
                        <div className='w-full'>
                            <label htmlFor="" className='text-sm font-medium mb-1 inline-block text-gray-500 '>Address</label>
                            <input type="text" name='address' className='py-2 px-3 w-full bg-gray-50 rounded-md border outline-primary' placeholder='Address' />
                        </div>
                        <div className='w-full'>
                        <label htmlFor="" className='text-sm font-medium mb-1 inline-block text-gray-500 '>Zip</label>
                            <input type="text" name='zip' className='py-2 px-3 w-full bg-gray-50 rounded-md border outline-primary' placeholder='Zip' />
                        </div>
                    </div>
                    <div className='flex gap-5 mb-5 flex-col md:flex-row'>
                        <div>
                            <button className='px-5 py-2 inline-block bg-secondary text-white font-medium rounded-md'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UserProfile;