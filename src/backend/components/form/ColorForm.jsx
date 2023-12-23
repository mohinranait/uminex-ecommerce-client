import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";

const ColorForm = ({color,refetch}) => {

    const axios = useAxios();
    const handleColor = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const colorCode = form.colorCode.value;
        const status = form.status.value;
        const slug = name.toLowerCase().split(' ').join("-")
        const obj = {name,colorCode,status,slug}
        try {
            if(!color){
                const {data} = await axios.post(`/color`, obj )
                if(data.success){
                    toast.success("Created");
                    form.reset();
                    refetch()
                }
            }else{
                const {data} = await axios.patch(`/color/${color?._id}`, obj )
                if(data.success){
                    toast.success("Updated");
                    form.reset();
                    refetch()
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <>
            <form onSubmit={handleColor}>
                <div className="mb-4">
                    <label htmlFor="" className="text-sm text-gray-500">Color name</label>
                    <input type="text" required defaultValue={color?.name ? color?.name : ''}  name="name" className="py-2 px-3 w-full border outline-primary focus:pl-5 rounded-md transition-all border-gray-200" placeholder="Color name" />
                </div>
                <div className="mb-4 flex items-center gap-3">
                    <label htmlFor="" className="text-sm text-gray-500">Color Code</label>
                    <input type="color" required defaultValue={ color?.colorCode ? color?.colorCode : ''}  name="colorCode" className=" border outline-primary  rounded-md border-gray-200" />
                </div>
                <div className="mb-10">
                    <label htmlFor="" className="text-sm text-gray-500">Color Status</label>
                    <select name="status" required  defaultValue={'default' } className="py-2 px-3 w-full border outline-primary  border-gray-100" id="">
                        <option value="DEFAULT"> Select Status</option>
                        <option value="true" selected={ color?.status ? true : false } >Active</option>
                        <option value="false" selected={ !color?.status ? true : false } >In-active </option>
                    </select>
                </div>
                <div className="mb-4">
                    <button type="submit" className="w-full py-3 bg-primary rounded-md text-white"> {color ? 'Update color':'Save color'} </button>
                </div>
            </form>   
        </>
    );
};

export default ColorForm;