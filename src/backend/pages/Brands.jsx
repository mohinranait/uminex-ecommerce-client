import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import useBrands from "../../hooks/useBrands";
import Modal from "../global/modal/Modal";
import BrandRows from "../components/TableRows/BrandRows";
import { IoAddOutline } from "react-icons/io5";
import BrandForm from "../components/form/BrandForm";


const Brands = () => {
    const axios = useAxios();
    const [ isOpenModal, setIsOpenModal] = useState(false);
    const [brand, setBrand] = useState(null);
    const [brands,refetch] = useBrands();



    const closeModal = () => {
        setIsOpenModal(false)
    }

    const openModal = () => {
        setIsOpenModal(true)
    }


    // Get brand information using ID for edit brand
    const handleGetBrandId = async (id) => {
        const {data} = await axios.get(`/single-brand/${id}`);
        // console.log(data);
        setBrand(data.brand);
        setIsOpenModal(true)
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
                    <button onClick={openModal} className="flex gap-1 items-center py-2 px-3 bg-primary text-white rounded text-sm"><IoAddOutline />Add Brand</button>
                </div>
                <hr />
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="text-left text-gray-600 py-3">ID</th>
                                <th className="text-left text-gray-600 py-3">Name</th>
                                <th className="text-left text-gray-600 py-3">Image</th>
                                <th className="text-left text-gray-600 py-3">Visibility</th>
                                <th className=" text-gray-600 py-3 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                brands?.map((brand, index) => <BrandRows key={brand?._id} index={index} refetch={refetch} handleGetBrandId={handleGetBrandId} brand={brand}  /> )
                            }
                        </tbody>
                    </table>

                    {
                        brands?.length == 0 && <div className="py-3 px-5 bg-blue-50 text-blue-600 rounded mt-5 text-center">
                            <p>Brand is not found</p>
                        </div>
                    }
                </div>
            </div>

            <Modal isOpenModal={isOpenModal} width={'30'} closeModal={closeModal} >
                <div className="w-[95vw] lg:w-[40vw]">
                   <BrandForm brand={brand} refetch={refetch} closeModal={closeModal} />
                </div>
            </Modal>
        </>
    );
};

export default Brands;