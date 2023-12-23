import { useState } from "react";
import useColors from "../../hooks/useColors";
import ColorRows from "../components/TableRows/ColorRows";
import { IoAddOutline } from "react-icons/io5";
import ColorForm from "../components/form/ColorForm";
import useAxios from "../../hooks/useAxios";

const Colors = () => {
    const axios = useAxios();
    const [colors,refetch] = useColors();
    const [color, setColor] = useState(null)

    const handleGetColorId = async (id) => {
        try {
            const {data} = await axios.get(`/color/${id}`)
            setColor(data.color);
        } catch (error) {
            
        }
    }
    return (
        <>
           <div className="grid grid-cols-12 gap-5">
                <div className="col-span-4">
                    <ColorForm refetch={refetch} color={color} />
                </div>
                <div className="col-span-8">
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
                                    <select name="" className="py-2 border rounded w-full  text-sm px-3 outline-blue-500" id="">
                                        <option key={'1'} value="">Status</option>
                                        <option key={'2'} value="true">Public</option>
                                        <option key={'3'} value="false">Unpublic</option>
                                    </select>
                                </div>
                                <div className="ml-auto">
                                    <input type="search" className="py-2 ml-auto border rounded w-full  text-sm px-3 outline-blue-500" placeholder="Search by name" />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-left text-gray-600 py-3">ID</th>
                                        <th className="text-left text-gray-600 py-3">Name</th>
                                        <th className="text-left text-gray-600 py-3">Color</th>
                                        <th className="text-left text-gray-600 py-3">Visibility</th>
                                        <th className=" text-gray-600 py-3 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        colors?.map((color, index) => <ColorRows key={color?._id} index={index} refetch={refetch} handleGetColorId={handleGetColorId} color={color}  /> )
                                    }
                                </tbody>
                            </table>

                            {
                                colors?.length == 0 && <div className="py-3 px-5 bg-blue-50 text-blue-600 rounded mt-5 text-center">
                                    <p>Color is not found</p>
                                </div>
                            }
                        </div>
                    </div> 
                </div>
            </div>  
        </>
    );
};

export default Colors;