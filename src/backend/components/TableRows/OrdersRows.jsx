
import PropTypes from 'prop-types';
import { BsThreeDotsVertical } from "react-icons/bs";
import { dateFormater } from '../../../services/DateFormater';
import { useState } from 'react';
import Modal from '../../global/modal/Modal';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast"
import useAxios from '../../../hooks/useAxios';
import useOrders from '../../../hooks/useOrders';
import OrderHistoryRow from './OrderHistoryRow';
import OrderInformation from '../anothers/OrderInformation';



const OrdersRows = ({order,index}) => {
    const axios = useAxios();
    const [,refetch] = useOrders();
    const [ isOpenModal, setIsOpenModal] = useState(false);
    const [action, setAction] = useState(false)
    const {_id,userInfo ,totalItems,createdAt,transactionId ,orderStatus,orderHistory,deliveryAddress,paymentStatus,paymentMethod   } = order || {};
    const closeModal = () => {
        setIsOpenModal(false)
    }

    const openModal = () => {
        setIsOpenModal(true)
    }

    const handleCloseAction = (e) => {
        e.stopPropagation();
        setAction(!action)
    }

   

    // Handle delete order
    const handleDeleteOrder = async (e) =>{
        e.stopPropagation()
        try {
            const {data} = await axios.delete(`/delete-order/${_id}`)
            if(data.success){
                refetch()
                toast.success("Successed")
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <tr onClick={openModal}>
                <td className="text-gray-400 py-2">{index+1}</td>
                <td className="text-gray-400 py-2">
                    <div className='flex gpa-1 items-center'>
                        <img src={'https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg'} className='w-16 rounded-full' alt="" />
                        <div>
                            <p className='text-sm'>{userInfo?.name}</p>
                            <p className='text-sm'>{userInfo?.email}</p>
                        </div>
                    </div>
                </td>
                <td className="text-gray-400 py-2">
                    <p className="text-gray-700 text-sm">${orderHistory?.reduce((total,current) => total + current?.totalPrice,0)} </p>
                </td>
                <td className="text-gray-400 py-2">
                    <p className="text-gray-700 text-sm">{totalItems} Items</p>
                </td>
            
                <td className="text-gray-400 py-2">
                    <p className="text-gray-700 text-sm">{orderStatus =='pending' ? "Pending" : orderStatus == 'delivery' ? 'Delivery' : orderStatus == 'cancal' ? 'Cancal' : orderStatus == 'shift' ? "Shift" : orderStatus == 'return' ? "Return" : orderStatus == 'proccessing'? 'Processing': orderStatus == 'cancel' ? "Cancel" : '' }</p>
                </td>
                <td className="text-gray-400 py-2 text-sm">
                    <p className="text-gray-700 text-sm uppercase">M: {paymentMethod} </p>
                    <p className="text-gray-700 text-sm">P: {paymentStatus == 'paid' ? <span className='bg-green-100 px-1 text-xs capitalize text-green-500 rounded'>Paid</span> : <span className='bg-red-100 px-1 text-xs capitalize text-red-500 rounded'>Unpaid</span> }  </p>
                    {transactionId ? 
                    <p className="text-gray-700 text-sm">T: <span className=' px-1 text-xs capitalize text-green-500 rounded'>{transactionId.slice(-5)}</span> </p>
                    :  ''}
                </td>
                <td className="text-gray-400 py-2">
                    <p className="text-gray-700 text-sm">{ dateFormater(createdAt)} </p>
                </td>
            
                <td className=" py-2 ">
                    <div className="flex justify-end gap-3 relative">
                        <span onClick={handleCloseAction} className='cursor-pointer text-gray-600'><BsThreeDotsVertical size={25} /></span>
                        <div className={`absolute py-2 top-full right-0 z-10 w-[100px] bg-white shadow ${action ? 'block':'hidden'} `}>
                            <div><Link to={`/admin/order/${_id}`} onClick={handleCloseAction} className='px-4 hover:bg-gray-100 py-1 text-sm w-full inline-block text-gray-500'>Edit</Link></div>
                            <div><a onClick={handleDeleteOrder} className='px-4 hover:bg-gray-100 py-1 text-sm w-full inline-block text-gray-500' href="#">Delete</a></div>
                            <div><a onClick={handleCloseAction} className='px-4 hover:bg-gray-100 py-1 text-sm w-full inline-block text-gray-500' href="#">View</a></div>
                        </div>
                       
                    </div>
                </td>
            </tr>   
            <Modal isOpenModal={isOpenModal} width={'30'} closeModal={closeModal} >
                <div className="w-[95vw] lg:w-[70vw] h-vh lg:h-[80vh] overflow-y-auto">
                    <OrderInformation order={order} user={userInfo} address={deliveryAddress} />
                    <div>
                        <OrderHistoryRow data={orderHistory} />
                        <Link to={`/admin/order/${_id}`} className="flex justify-center gap-1 items-center w-full py-3 px-3 bg-primary text-white rounded text-sm">Preview and update order</Link>
                    </div>
                </div>
            </Modal>
        </>
    );
};

OrdersRows.propTypes = {
    order: PropTypes.object.isRequired,
    index : PropTypes.number
};

export default OrdersRows;