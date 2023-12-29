
import PropTypes from 'prop-types';
import { BsThreeDotsVertical } from "react-icons/bs";
import { dateFormater } from '../../../services/DateFormater';
import { useState } from 'react';
import Modal from '../../global/modal/Modal';
import { Link } from 'react-router-dom';
import Select from "react-select"
import toast from "react-hot-toast"
import useAxios from '../../../hooks/useAxios';
import useOrders from '../../../hooks/useOrders';

const orderStatusLists = [
    { value: 'pending', label: 'Pending' },
    { value: 'shift', label: 'Shift' },
    { value: 'delivery', label: 'Delivery' },
    { value: 'proccessing', label: 'Proccessing' },
    { value: 'return', label: 'Return' },
    { value: 'cancel', label: 'Cancel' },
]


const OrdersRows = ({order,index}) => {
    const axios = useAxios();
    const [,refetch] = useOrders();
    const [ isOpenModal, setIsOpenModal] = useState(false);
    const [action, setAction] = useState(false)
    const {_id,userInfo ,totalItems,createdAt,transactionId ,orderStatus,orderHistory,paymentStatus,paymentMethod   } = order || {};
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

    const handleOrderStatus = async e => {
        
        const obj = {
            orderStatus : e.value, 
        }
        try {
            const {data} = await axios.patch(`/udpate-order/${_id}`, obj);
            if(data.success){
                refetch()
                toast.success("Successed")
            }
        } catch (error) {
            toast.error(error.message)
        }
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
                    <p className="text-gray-700 text-sm">{orderStatus =='pending' ? "Pending" : orderStatus == 'delivery' ? 'Delivery' : orderStatus == 'cancal' ? 'Cancal' : orderStatus == 'shift' ? "Shift" : orderStatus == 'return' ? "Return" :  'Processing' }</p>
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
                            <div><a onClick={handleCloseAction} className='px-4 hover:bg-gray-100 py-1 text-sm w-full inline-block text-gray-500' href="#">Edit</a></div>
                            <div><a onClick={handleDeleteOrder} className='px-4 hover:bg-gray-100 py-1 text-sm w-full inline-block text-gray-500' href="#">Delete</a></div>
                            <div><a onClick={handleCloseAction} className='px-4 hover:bg-gray-100 py-1 text-sm w-full inline-block text-gray-500' href="#">View</a></div>
                        </div>
                       
                    </div>
                </td>
            </tr>   
            <Modal isOpenModal={isOpenModal} width={'30'} closeModal={closeModal} >
                <div className="w-[95vw] lg:w-[70vw]">
                    <div className='grid lg:grid-cols-3 gap-5'>
                        <div className='border border-gray-100 rounded p-5 py-4'>
                            <p className='text-sm text-gray-600'>Mohin</p>
                            <p className='text-sm text-gray-600'>Email@gmail.com</p>
                            <p className='text-sm text-gray-600'>01728068200</p>
                        </div>
                        <div className='border border-gray-100 rounded p-5 py-4'>
                            <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>Price</span> : ${orderHistory?.reduce((total, current) => total + current?.totalPrice,0)}</p>
                            <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>Method</span> : Stripe</p>
                            <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>TransID</span> : askdfjas5a4s5f5a</p>
                            <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>Payment</span> : Paid</p>
                            <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>Order Status</span> : 
                                {
                                    orderStatus == 'proccessing'? 
                                    <span className='text-xs px-2 py-1 leading-[9px] bg-green-50 text-green-600'>Proccessing</span>
                                    : orderStatus === 'cancel'? 
                                    <span className='text-xs px-2 py-1 leading-[9px] bg-green-50 text-green-600'>Cancel</span>
                                    : orderStatus == 'pending' ? 
                                    <span className='text-xs px-2 py-1 leading-[9px] bg-green-50 text-green-600'>Pending</span>
                                    :   <span className='text-xs px-2 py-1 leading-[9px] bg-green-50 text-green-600'>Delivery</span>
                                }
                              
                            </p>
                            <div className='text-sm text-gray-600 mt-5 flex '> <span className='w-[100px] inline-block'>Select Status</span> : 
                                <div className='relative w-[150px] ml-1'>
                                    <Select 
                                    options={orderStatusLists} 
                                    onChange={(e) => handleOrderStatus(e)}
                                    className='w-full' />
                                </div>
                            </div>
                        </div>
                        <div className='border border-gray-100 rounded p-5 py-4'>
                            <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>Address</span> : <span className='text-pink-600 font-medium'>Chatagong, Bangladesh, Dahaka</span></p>
                            <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>Delivery</span> : Home</p>
                            <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>Phone</span> : 01647760872</p>
                        </div>
                    </div>
                    <div>
                        <div className="overflow-x-auto mt-10 mb-8">
                            <table className="w-full border border-gray-200 border-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-left text-gray-600 pl-4 py-3">Products</th>
                                        <th className="text-left text-gray-600  py-3">Unique Code</th>
                                        <th className="text-left text-gray-600  py-3">Product Price</th>
                                        <th className="text-left text-gray-600  py-3">Quantity</th>
                                        <th className="text-left text-gray-600  py-3">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderHistory?.map((item,index) =>  <tr key={index} className=''>
                                      
                                    
                                            <td className="text-gray-400 py-2">
                                                <div className='flex gpa-1 items-center'>
                                                    <img src={ item?.product?.media?.images[0]} className='w-16 rounded-full' alt="" />
                                                    <div>
                                                        <p className='text-sm text-gray-700 font-medium'>{item?.product?.name}</p>
                                                        {
                                                            item?.varient?.map((d,i) =>  <p key={i} className='text-xs'>{d?.label}: {d?.value}</p> )
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-gray-400 py-2">
                                                <p className="text-gray-700 text-sm">SKU: {item?.product?.skuCode} </p>
                                            </td>
                                            <td className="text-gray-400 py-2">
                                                <p className="text-gray-700 text-sm">${item?.price} </p>
                                            </td>
                                            <td className="text-gray-400 py-2">
                                                <p className="text-gray-700 text-sm">{item?.quantity} items </p>
                                            </td>
                                            
                                            <td className="text-gray-400 py-2">
                                                <p className="text-gray-700 text-sm">${item?.quantity * item?.price} </p>
                                            </td>
                                            
                                        </tr>     )
                                       
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Link  className="flex justify-center gap-1 items-center w-full py-3 px-3 bg-primary text-white rounded text-sm">Preview and update order</Link>
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