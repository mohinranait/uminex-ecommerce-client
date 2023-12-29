import { FaCheck } from "react-icons/fa6";
import { Link,  useSearchParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import useCarts from "../../../hooks/useCarts";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";

const PaymentSuccess = () => {
    const [carts, refetch] = useCarts();
    const getShoppingCarts = carts?.items || [];
    const {user} = useAuth();
    const axios = useAxios();
    const [params, setParams] = useSearchParams();
    const session_id =  params.get('session_id');
    const payMethod =  params.get('method');



    const createOrders = async () => {
        const shopHistory = getShoppingCarts?.map(cart => {
            return {
                product : {...cart?.product},   
                price: cart?.product?.price?.sellingPrice, 
                quantity:cart?.quantity,
                totalPrice: cart?.product?.price?.sellingPrice * cart?.quantity, 
                varient : cart?.varient ,
            }
        })
        const obj = {
            userInfo : user?._id,
            deliveryAddress : "65871fc52ab62ff94b6a912d",
            paymentMethod : payMethod == 'stripe' ? 'stripe':'cod',
            totalItems: getShoppingCarts?.reduce((total,current) => total + current?.quantity ,0),
            orderHistory: shopHistory,
            cartItems : getShoppingCarts?.map(item => item?._id ),
        }
        if(getShoppingCarts.length > 0){
            if(payMethod == 'stripe' ){
                const res = await axios.post(`/success?session_id=${session_id}`, {...obj,paymentStatus:'paid'} )
                console.log(res.data);
                refetch()
            }
        }
    }

    const mutation = useMutation({
        mutationFn: createOrders(),
    })

    return (
        <div>
            <div className="container flex items-center justify-center py-10">
                <div className="bg-white min-w-[300px] px-5 py-10">
                    <div className="flex items-center justify-center mb-8">
                        <span className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="w-28 h-28 rounded-full bg-green-300 flex items-center justify-center">
                                <span className="w-20 h-20 rounded-full bg-green-400 flex items-center justify-center">
                                    <span className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center"> <FaCheck className="text-white" size={30} /> </span>
                                </span>
                            </span>
                        </span>
                    </div>
                    <p className="text-center text-xl font-medium text-gray-600">Payment Successfull</p>
                    <div className="text-center mt-4"><Link to={'/'} className="text-green-500 border border-green-300 rounded-3xl text-center inline-block px-5 py-1 ">Done</Link></div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;