import { Link, useNavigate } from "react-router-dom";
import useCarts from "../../../hooks/useCarts";
import { IoCloseSharp } from "react-icons/io5";
import {  useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { BiLoaderCircle } from "react-icons/bi";
import toast from "react-hot-toast";

const Checkout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const axios = useAxios();
    const [paymentOption, setPaymentOption] = useState('stripe');
    const [carts, refetch] = useCarts();
    const getShoppingCarts = carts?.items || [];
    const {user} = useAuth();
    const navigate = useNavigate();
    const domainName = location.origin;

    const handleNewOrders = async () => {
        try {
            const shopHistory = getShoppingCarts?.map(cart => {
                return {
                    product : {...cart?.product},   
                    price: cart?.product?.price?.sellingPrice, 
                    quantity:cart?.quantity,
                    totalPrice: cart?.product?.price?.sellingPrice * cart?.quantity, 
                    varient : cart?.varient ,
                }
            })
            if(paymentOption === 'stripe'){
                const response = await axios.post(`/create-checkout-session`,{shopHistory,domainName})
                window.location.href =  response.data.url
            }else{
                setIsLoading(true)
                const obj = {
                    userInfo : user?._id,
                    deliveryAddress : 'address Id',
                    paymentMethod : paymentOption,
                    totalItems: getShoppingCarts?.reduce((total,current) => total + current?.quantity ,0),
                    orderHistory: shopHistory,
                    cartItems : getShoppingCarts?.map(item => item?._id ),
                }
                if(getShoppingCarts.length > 0){
                    const response = await axios.post(`/checkout-cash-on-delivery`, obj)
                    console.log(response.data);
                    if(response.data.success){
                        setIsLoading(false)
                        navigate('/success?method=cod')
                    }
                }
            }
           
        } catch (error) {
            toast(error.message);
        }
    }





    return (
        <>
            <section className="my-4">
                <div className="box">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
                        <div className="md:col-span-1 lg:col-span-2 space-y-5 ">
                            <div className="grid md:grid-cols-2 gap-5 ">
                                <div onClick={() => setPaymentOption('stripe')} className={`bg-white px-4 py-3 cursor-pointer rounded-sm relative ${paymentOption =='stripe' ? 'ring-2 ring-blue-700' :''} `}>
                                   {paymentOption == 'stripe'?  <span className="text-xl text-green-600 absolute right-3 top-2"><FaRegCircleCheck /></span> : ''}
                                    <img className="h-8 mx-auto" src="https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/9928bafb-558e-4bf3-98be-58b003ab4358.png?auto=format,compress&size=150" alt="" />
                                </div>
                                {/* <div onClick={() => setPaymentOption('paypal')} className="bg-white px-4 py-3 cursor-pointer rounded-sm ">
                                    <img className="h-8 mx-auto" src="https://1000logos.net/wp-content/uploads/2021/04/Paypal-logo.png" alt="" />
                                </div> */}
                                <div onClick={() => setPaymentOption('cod')} className={`bg-white px-4 py-3 text-center cursor-pointer rounded-sm relative ${paymentOption =='cod' ? 'ring-2 ring-blue-700' :''} `}>
                                {paymentOption == 'cod'?  <span className="text-xl text-green-600 absolute right-3 top-2"><FaRegCircleCheck /></span> : ''}
                                    {/* <img className="h-8 mx-auto" src={codImg} alt="" /> */}
                                    <span className="text-xl font-bold text-center text-secondary">Cash On Delevery</span>
                                </div>
                            </div>
                            <div className="bg-white py-8 space-y-2 px-5">
                                <p>Delevery to : Barishal</p>
                                <p className="text-sm"><span className="px-3 py-[2px] bg-green-100 text-green-600 ">Home</span> 01728068200 | Barguna Sadar, Barguna, Barishal, | <span className="text-primary text-xs">Change</span></p>
                                <p className="text-sm"> Billing to the same address | <span className="text-primary text-xs">Edit</span></p>
                            </div>
                         
                            {
                                getShoppingCarts?.map(product =>  <div key={product?._id} className="grid bg-white grid-cols-4 px-5 py-3 lg:py-1 relative items-center ">
                                <div className="col-span-3 row-span-2 lg:row-span-1 lg:col-span-2 flex  py-2  md:lg:flex-row lg:items-center gap-3">
                                    <span>
                                        <img className="w-16 h-16 sm:w-24 sm:h-24 " src={product?.product?.media?.images[0]} alt="" />
                                    </span>
                                    <div>
                                        <Link to={'/products'} className="block font-semibold text-sm sm:text-base  text-gray-700">{product?.product?.name}</Link>
                                     
                                    </div>
                                </div>
                                <div>
                                    <p className="flex text-sm justify-end items-center"><span className="text-gray-500  sm:text-sm  font-semibold">Price: <span className="w-[80px] inline-block text-right">${product?.product?.price?.sellingPrice}</span> </span></p>
                                    <p className="flex text-sm justify-end items-center"><span className="text-gray-500  sm:text-sm  font-semibold">Items: <span className="w-[80px] inline-block text-right">{product?.quantity}</span></span>  </p>
                                    <p className="flex text-sm justify-end items-center"><span className="text-gray-500  sm:text-sm  font-semibold">Total: <span className="w-[80px] inline-block text-right">${product?.quantity * product?.product?.price?.sellingPrice}</span> </span>  </p>
                                </div>
                              
                                <div className=" flex justify-end gap-10">
                                    <div className='absolute left-1 top-2/4 -translate-y-2/4 lg:static lg:translate-y-0 '>
                                        <span  className="lg:h-9 lg:w-9 rounded-full border cursor-pointer flex items-center justify-center bg-white"><IoCloseSharp /></span>
                                    </div>
                                </div>
                            </div>)
                            }
                    
                        </div>
                        <div className="">
                            <div className="bg-white shadow px-5 pb-5 pt-7">
                                <div className="uppercase text-base font-semibold text-center py-2 rounded-md text-text-color bg-[#F8F7FD]">Registerd Account</div>
                                <div className="flex py-5 gap-3 font-semibold">
                                    <p className="text-secondary">Free Delivery for </p>
                                    <p className="">$1000</p>
                                </div>
                                <span className="w-full block border-b"></span>
                                <ul className="space-y-4 my-5">
                                    <li className="flex items-center justify-between">
                                        <span className="text-gray-500 font-medium text-lg">Order Summery  </span>
                                        <span className="text-gray-600 text-lg font-semibold">${carts?.totalPrice}</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-gray-500 font-medium text-lg">Tax</span>
                                        <span className="text-gray-600 text-lg font-semibold">$0</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-gray-500 font-medium text-lg">Additional Service</span>
                                        <span className="text-[#4773ec] text-lg font-semibold">$20</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-gray-800 font-bold text-lg">Total Amount</span>
                                        <span className="text-gray-800 text-lg font-bold">${carts?.totalPrice}</span>
                                    </li>
                                </ul>
                                {/* <button onClick={handlePay} type="button" className="w-full  font-semibold rounded-md text-center py-3 bg-primary text-[#deecff] flex items-center justify-center "> <BiLoaderCircle className="animate-spin" /> pay </button>   */}
                                {
                                    isLoading ?   
                                    <button type="button" className="w-full  font-semibold rounded-md text-center py-3 bg-primary text-[#deecff] flex items-center justify-center "> <BiLoaderCircle className="animate-spin" /> </button>  
                                    :   
                                    <button onClick={handleNewOrders} type="button" className="w-full block font-semibold rounded-md text-center py-3 bg-primary text-[#deecff] ">Place Order now</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Checkout;