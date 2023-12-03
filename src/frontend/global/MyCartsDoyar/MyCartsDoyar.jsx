import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import RightDoyarCartItems from "../../components/CartItems/RightDoyarCartItems";


const MyCartsDoyar = ({toggleCartDoyarHandler,cartDoyar}) => {
    const navigate = useNavigate();
    const carts = [
        {_id: 1, name: "Camera mobile", img:'https://demo-uminex.myshopify.com/cdn/shop/files/col_3_3.png?v=1681548716&width=1500', quantity:1,color:'Red'},
        {_id: 2, name: "Game controllers", img:'https://demo-uminex.myshopify.com/cdn/shop/files/col_3_4.png?v=1681548715&width=1500', quantity:2,color:'White'},
        {_id: 3, name: "Table ipads", img:'https://demo-uminex.myshopify.com/cdn/shop/files/col_3_5.png?v=1681548716&width=1500', quantity:1,color:'Blue'},
        {_id: 4, name: "Table ipads", img:'https://demo-uminex.myshopify.com/cdn/shop/files/col_3_5.png?v=1681548716&width=1500', quantity:1,color:'Blue'},
        {_id: 7, name: "Table ipads", img:'https://demo-uminex.myshopify.com/cdn/shop/files/col_3_5.png?v=1681548716&width=1500', quantity:1,color:'Blue'},
    ]





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
                            <span>Carts({carts?.length})</span>
                        </div>
                    </div>
                    <div className='px-4 flex-grow overflow-y-auto'>
                        <ul className=" h-full  py-3 space-y-4">
                            {/* {
                                myCarts?.map(cart =>   <li key={cart?._id} className="bg-white border gap-2 rounded px-2 py-3 flex ">
                                    <div>
                                        <img src={cart?.img} className="w-20 rounded-md border" alt="" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="flex-grow"><Link>{cart?.name}</Link></p>
                                        <div className=" flex justify-between pb-1 gap-10">
                                            <div className="flex items-center gap-2">
                                                <button  className="w-5 h-5 lg:h-6 lg:w-6 rounded-full border flex items-center justify-center text-lg">-</button>
                                                <span className='w-[16px]'>2</span>
                                                <button  className="w-5 h-5 lg:h-6 lg:w-6 rounded-full border flex items-center justify-center text-lg">+</button>
                                            </div>
                                            <p>$245</p>
                                            <div className=''>
                                                <span  className="lg:h-6 lg:w-6 rounded-full border cursor-pointer flex items-center justify-center bg-white"><IoCloseSharp /></span>
                                            </div>
                                        </div>
                                    </div>
                                </li> )
                            } */}
                            {
                                carts?.map(cart => <RightDoyarCartItems key={cart?._id} cart={cart} /> )}
                        </ul>
                    </div>
                    <div className='px-4'>
                        <div className="py-4 border-t">
                            <div className="pb-3 space-y-1">
                                <p className="flex items-center justify-between">
                                    <span className="text-gray-500 font-medium text-lg">Sub total</span>
                                    <span className="text-gray-600 text-lg font-semibold">$100</span>
                                </p>
                                <p className="flex items-center justify-between">
                                    <span className="text-gray-500 font-medium text-lg">Vat & taxt</span>
                                    <span className="text-gray-600 text-lg font-semibold">$100</span>
                                </p>
                                <p className="flex items-center justify-between">
                                    <span className="text-gray-900 font-semibold text-lg">Total Amount</span>
                                    <span className="text-gray-900 text-lg font-semibold">$150</span>
                                </p>
                            </div>
                            <div className="flex gap-3 items-center justify-between">
                                <button onClick={handleRedirectCartPage} className="btn btn-primary w-full">Cart</button>
                                <button className="btn w-full btn-secondary">Checkout</button>
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