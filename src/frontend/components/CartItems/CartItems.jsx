import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types"

const CartItems = ({cart,handleCartDeletes}) => {
    const {_id,quantity:pQuantity, img, name,color} = cart || {};
    const [quantity,setQuantity]  = useState(pQuantity);
    const quantityIncrement = () => {
        setQuantity(quantity+1)
    }
    const quantityDecrement = () => {
        if( quantity > 1 ){
            setQuantity(quantity-1)
        }
    }
    return (
        <>
            <div className="grid grid-cols-4 px-5 py-3 lg:py-1 relative items-center ">
                <div className="col-span-3 row-span-2 lg:row-span-1 lg:col-span-2 flex  py-2  md:lg:flex-row lg:items-center gap-3">
                    <span>
                        <img className="w-16 h-16 sm:w-24 sm:h-24 " src={img} alt="" />
                    </span>
                    <div>
                        <Link to={'/products'} className="block font-semibold text-sm sm:text-base md:text-lg text-gray-800">{name}</Link>
                        <p className="text-sm md:text-base text-gray-500"><span className="font-semibold">Color</span> <span className="text-gray-400">{color}</span></p>
                    </div>
                </div>
                <div>
                    <p className="flex text-sm justify-end items-center gap-3"><span className="text-gray-800 sm:text-lg lg:text-lg font-semibold">$100</span> <span className="text-gray-600 text-sm font-medium hidden lg:block">$120</span> </p>
                </div>
                <div className=" flex justify-end gap-10">
                    <div className="flex items-center gap-2">
                        <button onClick={quantityDecrement} className="w-6 h-6 lg:h-8 lg:w-8 rounded-full border flex items-center justify-center text-lg">-</button>
                        <span className='w-[16px]'>{quantity}</span>
                        <button onClick={quantityIncrement} className="w-6 h-6 lg:h-8 lg:w-8 rounded-full border flex items-center justify-center text-lg">+</button>
                    </div>
                    <div className='absolute left-1 top-2/4 -translate-y-2/4 lg:static lg:translate-y-0 '>
                        <span onClick={() => handleCartDeletes(_id)} className="lg:h-9 lg:w-9 rounded-full border cursor-pointer flex items-center justify-center bg-white"><IoCloseSharp /></span>
                    </div>
                </div>
            </div>
        </>
    );
};

CartItems.propTypes = {
    cart: PropTypes.object,
    handleCartDeletes: PropTypes.func,
}

export default CartItems;