/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { uploadImage } from "../../../services/UploadImage";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const CategoryForm = ({closeModal,refetch, category}) => {

    const [isSlug, setIsSlug] = useState('');
    const [uploadImageText, setUploadImageText] = useState("Upload image")
    const axios = useAxios();

    useEffect(() => {
        setIsSlug(category?.slug)
    },[])

    const handleCategory = async (e) => {
        e.preventDefault();

        const form = e.target;
        const file = form.image.files[0];
        const name = form.name.value;
        const status = form.status.value || category?.status;
        if(name.length == 0){
            toast.error("Name is required");
            return;
        }
        if(name.status === ''){
            toast.error("Status is required");
            return;
        }
       
        try {
            let assignImg;
            if(file?.name){
                assignImg =  await uploadImage(file)               
            }
            const categoryObj = {
                name, 
                status,
                slug:isSlug, 
                image:assignImg
            }
            if(!category){
                // Create new category
                const response = await axios.post(`/create-categorys`, categoryObj);
                if(response.data.success){
                    toast.success("Category has been created");
                    form.reset();
                    closeModal()
                    refetch()
                }
            }else{
                // update category by ID 
                const response = await axios.patch(`/update-category/${category?._id}`, categoryObj);
                if(response.data.success){
                    toast.success("Category has been Updated");
                    form.reset();
                    closeModal()
                    refetch()
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
       
    }
    return (
        <div className="bg-white relative">
            <form  onSubmit={handleCategory} >
                {category && category?.image}
                <div className="mb-4">
                    <label htmlFor="" className="text-sm text-gray-500">Title</label>
                    <input type="text" defaultValue={category?.name ? category?.name : ''} onChange={(e) => setIsSlug(e.target.value.split(' ').join('-').toLocaleLowerCase())} name="name" className="py-2 px-3 w-full border outline-primary focus:pl-5 rounded-md border-gray-200" placeholder="Product title" />
                    {isSlug && <p className="text-xs font-normal text-gray-400">Slug: {isSlug}</p>}
                  
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="text-sm text-gray-500">Status</label>
                    <select name="status" className="py-2 px-3 w-full border outline-primary  border-gray-100" id="">
                        <option value=""> Select Status</option>
                        <option value="true" selected={ category?.status ? 'true' :'' } >Active</option>
                        <option value="false" selected={ !category?.status ? 'false' :'' } >In-active </option>
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
                    <button className="w-full py-3 bg-primary rounded-md text-white"> {category ? 'Update category':'Save category'} </button>
                </div>
            </form> 
        </div>
    );
};

export default CategoryForm;