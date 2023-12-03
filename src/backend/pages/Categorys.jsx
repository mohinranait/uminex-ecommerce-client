import { useState } from "react";
import Modal from "../global/modal/Modal";
import CategoryForm from "../components/form/CategoryForm";



const Categorys = () => {
    const [ isOpenModal, setIsOpenModal] = useState(false);
    const closeModal = () => {
        setIsOpenModal(false)
    }

    const openModal = () => {
        setIsOpenModal(true)
    }
    return (
        <>
            <div className="bg-white px-5 py-5">
                <div>
                    <button onClick={openModal} >Add Category</button>
                </div>
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
                            <tr>
                                <td className="text-gray-400 py-2">1</td>
                                <td className="text-gray-400 py-2">Product</td>
                                <td className="text-gray-400 py-2">Image</td>
                                <td className="text-gray-400 py-2">Public</td>
                                <td className="text-gray-400 py-2 w-[200px]">
                                    <div className="flex justify-end gap-3">
                                        <button className="px-3 py-1 inline-block bg-green-50 text-green-700">Edit</button>
                                        <button className="px-3 py-1 inline-block bg-green-50 text-green-700">Edit</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpenModal={isOpenModal} width={'30'} closeModal={closeModal} >
                <div className="w-[95vw] lg:w-[40vw]">
                    <CategoryForm closeModal={closeModal} />
                </div>
            </Modal>
        </>
    );
};

export default Categorys;