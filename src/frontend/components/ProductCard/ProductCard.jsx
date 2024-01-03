import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProductRating from '../../global/ProductRating';
import { LuPlusSquare } from 'react-icons/lu';
import useAuth from '../../../hooks/useAuth';
import useCarts from '../../../hooks/useCarts';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import { IoCloseOutline } from 'react-icons/io5';
import { useState } from 'react';
import { charecterLimit } from '../../../services/charecterLimit';

const ProductCard = ({product,another}) => {
    const navigate = useNavigate();
    const { media, price,category,reviews,rating,isStock, productFeatures , name,slug, _id} = product || {};
    const {user} = useAuth();
    const keyFeature = productFeatures?.keyFeatures;
    const [size, setSize] = useState(keyFeature?.memorys?.length > 0 ? keyFeature?.memorys[0].label:null);
    const [color, setColor] = useState(keyFeature?.colors?.length > 0 ? keyFeature?.colors[0].label:null)

    const [,refetch] = useCarts();
    const axios = useAxios();
    const location = useLocation();


    const handleAddtoCart = async () => {
        try {
            if(!user?._id){
                navigate('/login')
                return;
            }

            let varientArr = [];
            if(color){
                varientArr = [...varientArr, {label:'Color', value: color }]
            }
            if(size){
                varientArr = [...varientArr, {label:'Size', value:size}]
            }
            const cartObject = {
                user : user?._id,
                product : _id,
                quantity : 1,
                varient : varientArr,
            }

            const response = await axios.post("/carts", cartObject);
            if(response.data.success){
                refetch();
                toast.success("Shopping cart added")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleRemoveProduct = (id) => {
        another?.functionName(id)
    } 

    return (
        <>
            <div className='rounded-md group bg-white  sm:min-h-[350px] flex flex-col pb-2 relative'>
                {
                    // for Wishlists page
                    location?.pathname == "/user/wishlists" && <span onClick={() => handleRemoveProduct(_id)} className='productCloseIcon'><IoCloseOutline /></span>
                }
                {/* Offer display */}
                {
                    price?.discountPrice > 0 && <span className='text-white text-[10px] font-medium shadow-sm shadow-secondary bg-secondary inline-block absolute left-3 top-2 py-[2px] px-[6px] rounded-xl'>{ 100 - ((price?.discountPrice * 100) / price?.productPrice) }% off</span>
                }
                
                <div className='block  p-1   pb-7'>
                    <Link to={`/${category?.slug}/${slug}`} >
                        <img src={media?.images[0]} className='sm:h-44 mx-auto' alt="" />
                    </Link>
                </div>
                <div className=' flex-grow bg-opacity-80  transition-all duration-500'>
                    <div className=' px-3 '>
                        {/* <p className=' pt-4 text-sm text-gray-500 hover:text-gray-700 flex justify-between items-center'><Link  >Apple</Link>  </p> */}
                        <p className=' '><Link to={`/${category?.slug}/${slug}`} className='text-sx font-medium text-text-color'>{ charecterLimit(name,35,true)}</Link></p>
                        <div className=' flex items-center flex-wrap md:gap-2'>
                            <ProductRating rating={`${rating}`}  /> <span className='text-xs text-gray-500'>({reviews || 0} Reviews)</span>
                        </div>
                        <p className='text-xs '> {isStock > 0 ? 'Stock available':'Out of Stock'}</p>
                    </div>
                </div>
                <div className='px-4 flex justify-between items-center'>
                    <div className='flex flex-col sm:flex-row justify-start '>
                        <span className='text-primary font-bold text-lg'>${price?.sellingPrice}.00</span> 
                        {price?.discountPrice > 0 && <del className='text-xs text-gray-400'>${price?.productPrice}</del> }  
                    </div>
                    <button onClick={handleAddtoCart} disabled={isStock == 0} className={`py-2 flex items-center justify-center rounded-sm transition-all text-gray-700 w-8 h-8  hover:text-white ${isStock == 0 ? 'hover:bg-secondary':"hover:bg-primary"} `}> <LuPlusSquare className='text-2xl' /> </button>
                </div>
            </div>
        </>
    );
};


ProductCard.propTypes = {
    product : PropTypes.object.isRequired,
    another : PropTypes.object
}

export default ProductCard;