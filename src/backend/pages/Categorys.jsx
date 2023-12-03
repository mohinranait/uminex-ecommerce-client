import { useState } from "react";
import Modal from "../global/modal/Modal";
import CategoryForm from "../components/form/CategoryForm";
import useCategorys from "../../hooks/useCategorys";
import CategoryRows from "../components/TableRows/CategoryRows";
import { IoAddOutline } from "react-icons/io5";
import useAxios from "../../hooks/useAxios";



const Categorys = () => {
    const axios = useAxios();
    const [isStatus, setIsStatus] = useState('')
    const [search, setSearch] = useState('')
    const [ isOpenModal, setIsOpenModal] = useState(false);
    const [category, setCategory] = useState(null);
    const [categorys,refetch] = useCategorys({search,status:isStatus});


    const closeModal = () => {
        setIsOpenModal(false)
        setCategory(null)
    }

    const openModal = () => {
        setIsOpenModal(true)
    }

    // get single category for edit by ID
    const getSingleCategory = async (id) => {
        const {data} = await axios.get(`/category/${id}`);
        setCategory(data.category);
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
                            <select name="" onChange={(e) => setIsStatus(e.target.value)} className="py-2 border rounded w-full lg:w-[300px] text-sm px-3 outline-blue-500" id="">
                                <option value="">Status</option>
                                <option value="true">Public</option>
                                <option value="false">Unpublic</option>
                            </select>
                        </div>
                        <div>
                            <input type="search" onChange={(e) => setSearch(e.target.value) } className="py-2 border rounded w-full lg:w-[300px] text-sm px-3 outline-blue-500" placeholder="Search by name" />
                        </div>
                    </div>
                    <button onClick={openModal} className="flex gap-1 items-center py-2 px-3 bg-primary text-white rounded text-sm"><IoAddOutline />Add Category</button>
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
                                categorys?.map((category, index) => <CategoryRows key={index} refetch={refetch} index={index} category={category} getSingleCategory={getSingleCategory} /> )
                            }
                            
                        </tbody>
                    </table>

                    {
                        categorys.length == 0 && <div className="py-3 px-5 bg-blue-50 text-blue-600 rounded mt-5 text-center">
                            <p>Category is not found</p>
                        </div>
                    }
                </div>
            </div>

            <Modal isOpenModal={isOpenModal} width={'30'} closeModal={closeModal} >
                <div className="w-[95vw] lg:w-[40vw]">
                    <CategoryForm closeModal={closeModal} refetch={refetch} category={category} />
                </div>
            </Modal>
        </>
    );
};

export default Categorys;