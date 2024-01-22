import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import Select from "react-select"
import PrimaryButton from "../components/buttons/PrimaryButton";
import OrderHistoryRow from "../components/TableRows/OrderHistoryRow";
import OrderInformation from "../components/anothers/OrderInformation";

const orderStatusLists = [
    { value: 'pending', label: 'Pending' },
    { value: 'shift', label: 'Shift' },
    { value: 'delivery', label: 'Delivery' },
    { value: 'proccessing', label: 'Proccessing' },
    { value: 'return', label: 'Return' },
    { value: 'cancel', label: 'Cancel' },
]

const paymentsStatus = [
    { value: 'paid', label: 'Paid' },
    { value: 'unpaid', label: 'Unpaid' },
]

const paymentsMethods = [
    { value: 'cod', label: 'Cash on Delivery' },
    { value: 'stripe', label: 'Mobile pay (Stripe)' },
]



const OrderEdit = () => {
    const {id} = useParams();
    const axios = useAxios();
    const [order, setOrder] = useState({})
    const [orderStatus, setOrderStatus] = useState({});
    const [paymentStatus,setPaymentStatus] = useState({});
    const [method, setMethod] = useState({})
    const [user, setUser] = useState(order ? order?.userInfo : {})
    const [address, setAddress] = useState(order? order?.deliveryAddress : {})

    useEffect(() => {
        const getSingleOrder = async () => {
            const res  = await axios.get(`/single-order/${id}`);
            const getOrderStatus = orderStatusLists?.find(item => item?.value === res.data?.order?.orderStatus)
            const getPaymentStatus = paymentsStatus?.find(item => item?.value === res.data?.order?.paymentStatus)
            const getPaymentMethod = paymentsMethods?.find(item => item?.value === res.data?.order?.paymentMethod)
            setOrderStatus(getOrderStatus)
            setPaymentStatus(getPaymentStatus)
            setMethod(getPaymentMethod)
            setUser(res.data?.order?.userInfo)
            setAddress(res.data?.order?.deliveryAddress)
            setOrder(res.data?.order);
        };
        getSingleOrder();
    },[])


    const handleOrders = async e => {
        e.preventDefault();

        const totalDiscount = e.target.totalDiscount.value;
        const orderStatus = e.target.orderStatus.value;
        const paymentStatus = e.target.paymentStatus.value;
        const paymentMethod = e.target.paymentMethod.value;
        const updateObj = {
                totalDiscount,
                paymentMethod,
                paymentStatus,
                orderStatus,
        }
        try {
            const res = await axios.patch(`/udpate-order/${order?._id}`,updateObj)
            if(res.data.success){
                setOrder(res.data.order)
            }
        } catch (error) {
            console.log(error);
        }

    }
    

    
    return (
        <>
            <div>
                <div className="">
                  
                    <OrderInformation order={order} user={user} address={address} />

                    <div className="bg-white p-5 mt-5">
                        <form onSubmit={handleOrders}>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                <div>
                                    <label htmlFor="" className="text-sm text-gray-600">Order status</label>
                                    <Select 
                                    name="orderStatus"
                                    options={orderStatusLists} 
                                    onChange={setOrderStatus}
                                    className='w-full'
                                    value={orderStatus} />
                                    
                                </div>
                                <div>
                                    <label htmlFor="" className="text-sm text-gray-600">Payment status</label>
                                    <Select 
                                    name="paymentStatus"
                                    options={  paymentsStatus}
                                    onChange={setPaymentStatus}
                                    className='w-full'
                                    value={  paymentStatus}
                                     />
                                </div>
                                <div>
                                    <label htmlFor="" className="text-sm text-gray-600">Methods</label>
                                    <Select 
                                    name="paymentMethod"
                                    options={paymentsMethods}
                                    onChange={setMethod}
                                    className='w-full' 
                                    value={method}
                                    />
                                </div>
                           </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
                                <div>
                                    <label htmlFor="" className="text-sm text-gray-600">Discount</label>
                                    <input type="text" name="totalDiscount" defaultValue={order ? order?.totalDiscount : 0} className="px-3 w-full py-2 border outline-none" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <PrimaryButton
                                    text={'Update Button'}
                                    bg={'bg-blue-600'}
                                    color={'text-white'}
                                    another={``}
                                />
                            </div>
                        </form>
                    </div>

                    <div className="bg-white px-5 py-1 mt-5">
                        <OrderHistoryRow data={order?.orderHistory} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderEdit;