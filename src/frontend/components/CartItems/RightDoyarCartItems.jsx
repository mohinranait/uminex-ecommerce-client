import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types"

const RightDoyarCartItems = ({cart}) => {
    const {name, img, quantity} =cart || {};
    const [cartQuantity, setCartQuantity] = useState(quantity);
    const handleCartIncrement = () => {

        setCartQuantity(cartQuantity + 1);
        
    }
    const handleCartDecrement = () => {

        if( cartQuantity > 1 ){
            setCartQuantity(cartQuantity - 1)
        }
    }
    return (
        <>
            <li className="bg-white border border-gray-100 gap-2 rounded pl-2 py-3 flex relative ">
                <div className="flex items-center">
                    
                    <div className="flex flex-col justify-center items-center gap-1">
                        <button onClick={handleCartIncrement} className="w-5 h-5 lg:h-6 lg:w-6 rounded-full border flex items-center justify-center text-lg">+</button>
                        <span className='w-[16px] text-center'>{cartQuantity}</span>
                        <button onClick={handleCartDecrement} className="w-5 h-5 lg:h-6 lg:w-6 rounded-full border flex items-center justify-center text-lg">-</button>
                    </div>
                    
                </div>
                <div className="w-20">
                    <div className="w-20">
                        <img src={img} className="w-20  rounded-md " alt="" />
                    </div>
                </div>
                <div className="">
                    <p className=" text-gray-700"><Link>{name}aklsld aslkdfja  falsfj asf </Link></p>
                    <p className="font-semibold text-gray-600 mt-1">$120</p>
                </div>
                    <span className="cart-right-royar group absolute -top-2 shadow-md bg-white -right-2"><IoClose className="group-hover:rotate-90 transition-all text-gray-700 group-hover:text-secondary" /></span>
            </li>
        </>
    );
};

RightDoyarCartItems.propTypes = {
    cart : PropTypes.object.isRequired,
}

export default RightDoyarCartItems;