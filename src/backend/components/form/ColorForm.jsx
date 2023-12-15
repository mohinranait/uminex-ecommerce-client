
const ColorForm = ({color}) => {
    return (
        <>
            <form action="">
                <div className="mb-4">
                    <label htmlFor="" className="text-sm text-gray-500">Color name</label>
                    <input type="text" required defaultValue={color?.name ? color?.name : ''}  name="name" className="py-2 px-3 w-full border outline-primary focus:pl-5 rounded-md transition-all border-gray-200" placeholder="Color name" />
                </div>
                <div className="mb-4 flex items-center gap-3">
                    <label htmlFor="" className="text-sm text-gray-500">Color Code</label>
                    <input type="color" required defaultValue={color?.colorCode ? color?.colorCode : ''}  name="colorCode" className=" border outline-primary  rounded-md border-gray-200" />
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