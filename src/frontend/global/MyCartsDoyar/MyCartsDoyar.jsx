import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import RightDoyarCartItems from "../../components/CartItems/RightDoyarCartItems";
import useCarts from "../../../hooks/useCarts";
import cartImgae from "../../../../public/img/empty-cart.jpg"

const MyCartsDoyar = ({toggleCartDoyarHandler,cartDoyar}) => {
    const [carts, refetch] = useCarts();


    
    const handleRedirectCartPage = () => {
        toggleCartDoyarHandler()
    }

    const handlePropagration = (e) => {
        e.stopPropagation()
    }



    return (
        <>
            <div onClick={handlePropagration} className="">
                <div className={` w-full sm:w-[350px]  pb-11 lg:pb-0 bg-white shadow z-20 top-0  h-screen fixed flex flex-col transition-all duration-500 ${cartDoyar ? "right-0":'-right-[100vw] sm:-right-[352px]'} `}>
                    <div className='px-4 py-3 border-b '>
                        <div className="flex justify-between items-center">
                            <span onClick={toggleCartDoyarHandler} className="cart-right-royar group"><IoClose className="group-hover:rotate-90 transition-all " /></span>
                            <span>Carts({ carts?.totalCarts > 0 ? carts?.totalCarts : 0 })</span>
                        </div>
                    </div>
                    <div className='px-4 flex-grow overflow-y-auto'>
                        <ul className=" h-full  py-3 space-y-4">
                            {
                                carts?.totalCarts == 0 && (
                                <div className="flex h-[90%] items-center justify-center">
                                    <span>
                                        <p className="mb-3">Your Shopping cart is empty</p>
                                        <img className="w-[120px] mx-auto" src="https://media.istockphoto.com/id/1201115991/vector/shopping-cart.jpg?s=612x612&w=0&k=20&c=5GyX3yP_D8bDmUDEjR06osSzPjVtVfsdU1_zeohpOxk=" alt="" />
                                    </span>
                                </div> )
                            }
                            {
                                carts?.items?.map(cart => <RightDoyarCartItems key={cart?._id} refetch={refetch} cart={cart} /> )
                            }
                        </ul>
                    </div>
                    <div className='px-4'>
                        <div className="py-4 border-t">
                            <div className="pb-3 space-y-1">
                                <p className="flex items-center justify-between">
                                    <span className="text-gray-500 font-medium text-lg">Sub total</span>
                                    <span className="text-gray-600 text-lg font-semibold">${carts?.totalPrice}</span>
                                </p>
                                <p className="flex items-center justify-between">
                                    <span className="text-gray-500 font-medium text-lg">Vat & taxt</span>
                                    <span className="text-gray-600 text-lg font-semibold">$0</span>
                                </p>
                                <p className="flex items-center justify-between">
                                    <span className="text-gray-900 font-semibold text-lg">Total Amount</span>
                                    <span className="text-gray-900 text-lg font-semibold">${carts?.totalPrice}</span>
                                </p>
                            </div>
                            <div className="flex gap-3 items-center justify-between">
                                <Link onClick={handleRedirectCartPage} to={'/carts'} className="btn btn-primary w-full">Cart</Link>
                                <Link onClick={handleRedirectCartPage} to={'/checkout'} className="btn w-full btn-secondary">Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        </>
    );
};


MyCartsDoyar.propTypes = {
    toggleCartDoyarHandler: PropTypes.func.isRequired,
    cartDoyar : PropTypes.bool
}

export default MyCartsDoyar;