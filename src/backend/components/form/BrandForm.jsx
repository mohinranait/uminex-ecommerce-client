import { useState } from 'react';
import { uploadImage } from '../../../services/UploadImage';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';

const BrandForm = ({brand, refetch, closeModal}) => {
    const axios = useAxios();
    const [uploadImageText, setUploadImageText] = useState("Upload logo");
    const [isSlug, setIsSlug] = useState('')

    const handleBrand = async e => {
        e.preventDefault();
        const toastId = toast.loading("Loading...")

        const form = e.target;
        const name = form.name.value;
        const status = form.status.value;
        const file = form.image.files[0];

       

        try {
            let assignImg;
            if(file?.name){
                assignImg =  await uploadImage(file)               
            }
            const brandObject = {
                name,
                status,
                slug:isSlug,
                logo: assignImg
            }
            if(!brand){
                // Create new brand
                const response = await axios.post(`/create-brand`, brandObject);
                if(response.data.success){
                    form.reset();
                    closeModal()
                    toast.success("Brand created", {id:toastId})
                    setUploadImageText("Upload Image")
                    refetch()
                }
            }else{
                // update brand by ID 
                const response = await axios.patch(`/update-brand/${brand?._id}`, brandObject);
                if(response.data.success){
                    form.reset();
                    closeModal()
                    toast.success("Brand updated", {id:toastId})
                    setUploadImageText("Update image")
                    refetch()
                }
            }
        } catch (error) {
            toast.error(error.message, {id:toastId})
        }
    }

    console.log(brand?.status);
    return (
        <div className="bg-white relative">
            <form  onSubmit={handleBrand} >
                <div className="mb-4">
                    <label htmlFor="" className="text-sm text-gray-500">Name</label>
                    <input type="text" defaultValue={brand?.name ? brand?.name : ''} onChange={(e) => setIsSlug(e.target.value.split(' ').join('-').toLocaleLowerCase())} name="name" className="py-2 px-3 w-full border outline-primary focus:pl-5 rounded-md border-gray-200" placeholder="Product title" />
                    {isSlug && <p className="text-xs font-normal text-gray-400">Slug: {isSlug}</p>}
                  
                </div>
                
                <div className="mb-5 ">
                    <label htmlFor="" className="text-sm text-gray-500">Brand Status</label>
                    <select name="status" required  defaultValue={'default' } className="py-2 px-3 w-full border outline-primary  border-gray-100" id="">
                        <option value="DEFAULT"> Select Status</option>
                        <option value="true" selected={ brand?.status ? true : false } >Active</option>
                        <option value="false" selected={ !brand?.status ? true : false } >In-active </option>
                    </select>
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
                    <button type="submit" className="w-full py-3 bg-primary rounded-md text-white"> {brand ? 'Update brand':'Save brand'} </button>
                </div>
            </form> 
        </div>
    );
};

export default BrandForm;