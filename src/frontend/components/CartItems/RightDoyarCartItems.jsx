import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types"
import toast from 'react-hot-toast';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { charecterLimit } from '../../../services/charecterLimit';

const RightDoyarCartItems = ({cart,refetch}) => {
    const queryClient = useQueryClient()
    const axios = useAxios();
    const {user} = useAuth();
    const {quantity,product,_id} =cart || {};
    const [cartQuantity, setCartQuantity] = useState(quantity);

    const {mutate:updateShoppingCart} = useMutation({
        mutationFn : async (reciveData) => {
            const {updateData, id} = reciveData;
            await axios.patch(`/shopping_update/${id}?email=${user?.email}`,updateData) 
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['carts'])
        }
    })

    const handleCartIncrement = () => {
        setCartQuantity(cartQuantity + 1); 
        const sendObject = {
            updateData : {
                quantity : quantity+1,
            },
            id : _id,
        }
        updateShoppingCart(sendObject)
    }
    const handleCartDecrement = () => {
        if( cartQuantity > 1 ){
            setCartQuantity(cartQuantity - 1)
            const sendObject = {
                updateData : {
                    quantity : quantity-1,
                },
                id : _id,
            }
            updateShoppingCart(sendObject)
        }
    }


    // Shopping cart delete
    const handleShoppingCartDelete = async () => {
        try {
            const {data} = await axios.delete(`/remove-shopping-cart/${_id}?request=user&email=${user?.email}`)
            if(data.success){
                refetch();
                toast.success("Cart removed");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        setCartQuantity(cart?.quantity)
    },[cart?.quantity])
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
                    <Link to={`/${product?.category?.slug}/${product?.slug}`} className="w-20 inline-block">
                        <img src={product?.media?.images[0]} className="w-20  rounded-md " alt="" />
                    </Link>
                </div>
                <div className="">
                    <p className=" text-gray-700"><Link to={`/${product?.category?.slug}/${product?.slug}`}>{ charecterLimit(product?.name,30,true) }</Link></p>
                    <p className="font-semibold text-gray-600 mt-1">${product?.price?.sellingPrice}</p>
                </div>
                    <span onClick={handleShoppingCartDelete} className="cart-right-royar group absolute -top-2 shadow-md bg-white -right-2"><IoClose className="group-hover:rotate-90 transition-all text-gray-700 group-hover:text-secondary" /></span>
            </li>
        </>
    );
};

RightDoyarCartItems.propTypes = {
    cart : PropTypes.object.isRequired,
    refetch: PropTypes.func
}

export default RightDoyarCartItems;