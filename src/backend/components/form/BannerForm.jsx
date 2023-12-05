/* eslint-disable react/prop-types */
import { useState } from "react";
import { uploadImage } from "../../../services/UploadImage";
import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";


const BannerForm = ({banner,refetch,closeModal}) => {
    const [uploadImageText, setUploadImageText] = useState("Upload Image")
    const axios = useAxios();
    console.log(banner);
    const handleBanner = async e => {
        e.preventDefault();

        const form = e.target;
        const title = form.title.value;
        const subtitle = form.subtitle.value;
        const status = form.status.value;
        const button_status = form.button_status.value;
        const button_text = form.button_text.value;
        const url = form.url.value;
        const file = form.image.files[0];


        try {
            let assignImg;
            if(file?.name){
                assignImg =  await uploadImage(file)               
            }
            const bannerObj = {
                title, 
                subtitle,
                status,
                button_status,
                button_text,
                url,
                image : assignImg
            }
            if(!banner){
                // Create new banner
                const response = await axios.post(`/create-banners`, bannerObj);
                if(response.data.success){
                    toast.success("Banner has been created");
                    form.reset();
                    closeModal()
                    setUploadImageText("Upload Image")
                    refetch()
                }
            }else{
                // update banner by ID 
                const response = await axios.patch(`/update-banners/${banner?._id}`, bannerObj);
                if(response.data.success){
                    toast.success("Banner has been Updated");
                    form.reset();
                    closeModal()
                    setUploadImageText("Update image")
                    refetch()
                }
            }
        } catch (error) {
            toast.error(error.message)
        }


    }
    return (
    <div className="bg-white relative">
        <form  onSubmit={handleBanner} >
            <div className="mb-4">
                <label htmlFor="" className="text-sm text-gray-500">Title</label>
                <input type="text" required defaultValue={banner?.title ? banner?.title : ''}  name="title" className="py-2 px-3 w-full border outline-primary focus:pl-5 rounded-md border-gray-200" placeholder="Title" />
            </div>
            <div className="mb-4">
                <label htmlFor="" className="text-sm text-gray-500">Subtitle</label>
                <input type="text" required defaultValue={banner?.subtitle ? banner?.subtitle : ''}  name="subtitle" className="py-2 px-3 w-full border outline-primary focus:pl-5 rounded-md border-gray-200" placeholder="Subtitle" />
            </div>
            <div className="mb-5 grid md:grid-cols-2 gap-5 ">
                <div>
                    <label htmlFor="" className="text-sm text-gray-500">Banner Status</label>
                    <select name="status" required  defaultValue={banner?.status } className="py-2 px-3 w-full border outline-primary  border-gray-100" id="">
                        <option value="DEFAULT"> Select Status</option>
                        <option value="true" selected={ banner?.status ? 'selected' :'' } >Active</option>
                        <option value="false" selected={ !banner?.status ? 'selected' :'' } >In-active </option>
                    </select>
                </div>
                <div>
                    <label htmlFor="" className="text-sm text-gray-500">Button Status</label>
                    <select name="button_status" required  defaultValue={banner?.button_status } className="py-2 px-3 w-full border outline-primary  border-gray-100" id="">
                        <option value="DEFAULT"> Button Status</option>
                        <option value="true" selected={ banner?.button_status ? 'selected' :'' } >Active</option>
                        <option value="false" selected={ !banner?.button_status ? 'selected' :'' } >In-active </option>
                    </select>
                </div>
                <div>
                    <label htmlFor="" className="text-sm text-gray-500">Button Text</label>
                    <input type="text" required defaultValue={banner?.button_text ? banner?.button_text : ''}  name="button_text" className="py-2 px-3 w-full border outline-primary focus:pl-5 rounded-md border-gray-200" placeholder="Button text" />
                </div>
                <div>
                    <label htmlFor="" className="text-sm text-gray-500">Banner URL</label>
                    <input type="text" required defaultValue={banner?.url ? banner?.url : ''}  name="url" className="py-2 px-3 w-full border outline-primary focus:pl-5 rounded-md border-gray-200" placeholder="Banner URL" />
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
                <button type="submit" className="w-full py-3 bg-primary rounded-md text-white"> {banner ? 'Update banner':'Save banner'} </button>
            </div>
        </form> 
    </div>
    );
};

export default BannerForm;