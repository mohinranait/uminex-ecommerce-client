import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";


const UserOrderDetails = () => {
    const {id} = useParams();
    const axios= useAxios();
    const {user} = useAuth();
    const [orderDetails, setOrderDetails] = useState({});


    useEffect(() => {
        const getOrder = async () => {
            const {data} = await axios.get(`/single-order/${id}`)
            setOrderDetails(data.order);
            console.log(data.order);
        }
        getOrder()
    },[])
   
    return (
        <>
           <Helmet>
                <title> Order view | Store MI</title>
            </Helmet>  

            <div>
                <div>
                   
                    <div className="mb-3 lg:grid grid-cols-2">
                        <div>
                            <p className="text-2xl font-bold mb-2 text-gray-600">Order ID : 154785475</p>
                            <div className="text-base text-gray-500">Order Date: 12/12/2024</div>
                        </div>
                        <div>
                            <p className="text-gray-600 text-lg lg:text-right font-semibold ">Shopping addres</p>
                            <p className="text-gray-800 text-sm lg:text-right">Barguna Shdar, Barguna, Barishal</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="py-4">
                    <table className="w-full">
                        <div className="space-y-3">
                            {
                                orderDetails?.orderHistory?.map((product,index) => <tr key={index} className="flex justify-between items-center">
                                <td className="">
                                    <div className="lg:flex gap-4 items-center ">
                                        <span className="bg-gray-100 p-2 rounded inline-block"><img src={product?.product?.media?.images[0]} alt="" className="w-16 rounded" /></span>
                                        <div>
                                            <p className="text-base font-medium text-gray-700 mb-1 pl-2">{product?.product?.name}</p>
                                            <div className="text-xs flex  font-medium text-gray-500 divide-x ">
                                                {
                                                    product?.varient?.map((item,index) => <p key={index} className="px-2">
                                                        <span>{item?.label} : {item?.value}</span>   
                                                    </p> )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className="text-lg font-medium text-gray-900 text-right">${ product?.totalPrice }</p>
                                    <p className="text-xs text-gray-400 font-medium text-right">Qty: { product?.quantity }</p>
                                </td>
                            </tr> )
                            }
                            
                        </div>
                    </table>
                </div>
                <hr />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-5">
                    <div>
                        <p className="font-semibold text-lg mb-3 text-gray-600 ">Information</p>
                        <ul className="space-y-2">
                            <li className="flex items-center justify-start gap-2 text-gray-500"><span>Order Status</span> : <span className="capitalize">{orderDetails?.orderStatus}</span></li>
                            <li className="flex items-center justify-start gap-2 text-gray-500"><span>Payment</span> : <span className="capitalize">{orderDetails?.paymentStatus}</span></li>
                            <li className="flex items-center justify-start gap-2 text-gray-500"><span>Method</span> : <span>{orderDetails?.paymentMethod}</span></li>                          
                        </ul>
                    </div>
                    <div className="hidden lg:block"></div>
                    <div>
                        <p className="font-semibold text-lg mb-3 text-gray-600 ">Order summery</p>
                        <ul className="space-y-2">
                            <li className="flex items-center justify-between text-gray-500"><span>Subtotal</span> <span>${orderDetails?.orderHistory?.reduce((total, current) => total + current?.totalPrice,0)}</span></li>
                            <li className="flex items-center justify-between text-gray-500"><span>Discount</span> <span>0%</span></li>
                            <li className="flex items-center justify-between text-gray-500"><span>Delivery</span> <span>$00</span></li>
                            <li className="flex items-center justify-between text-gray-500"><span>Tax</span> <span>$00</span></li>
                            <hr />
                            <li className="flex items-center justify-between text-gray-600 font-semibold text-lg"><span>Total</span> <span>${orderDetails?.orderHistory?.reduce((total, current) => total + current?.totalPrice,0)}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserOrderDetails;