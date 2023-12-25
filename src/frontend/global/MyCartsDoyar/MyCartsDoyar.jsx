import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import RightDoyarCartItems from "../../components/CartItems/RightDoyarCartItems";
import useCarts from "../../../hooks/useCarts";


const MyCartsDoyar = ({toggleCartDoyarHandler,cartDoyar}) => {
    const [carts, refetch] = useCarts();
    // console.log(carts);
    const navigate = useNavigate();
    
    const handleRedirectCartPage = () => {
        toggleCartDoyarHandler()
        navigate('/carts');
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
                                <button onClick={handleRedirectCartPage} className="btn btn-primary w-full">Cart</button>
                                <Link to={'/checkout'} className="btn w-full btn-secondary">Checkout</Link>
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