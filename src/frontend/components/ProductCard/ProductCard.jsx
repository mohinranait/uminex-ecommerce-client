import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import ProductRating from '../../global/ProductRating';
import { LuPlusSquare } from 'react-icons/lu';
import useAuth from '../../../hooks/useAuth';
import useCarts from '../../../hooks/useCarts';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import { IoCloseOutline } from 'react-icons/io5';

const ProductCard = ({product,another}) => {
    const { media, price,category,reviews,rating,isStock, name,slug, _id} = product || {};
    const {user} = useAuth();
    const [,refetch] = useCarts();
    const axios = useAxios();
    const location = useLocation();


    const handleAddtoCart = async () => {
        try {
            if(!user?._id){
                return;
            }
            const cartObject = {
                user : user?._id,
                product : _id,
                quantity:1,
                // varient : varientArr,
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
            <div className='rounded-md group bg-white  min-h-[350px] flex flex-col pb-2 relative'>
                {
                    // for Wishlists page
                    location?.pathname == "/user/wishlists" && <span onClick={() => handleRemoveProduct(_id)} className='productCloseIcon'><IoCloseOutline /></span>
                }
                <div className='block  p-1   pb-7'>
                    <Link to={`/${category?.slug}/${slug}`} >
                        <img src={media?.images[0]} className='h-44 mx-auto' alt="" />
                    </Link>
                </div>
                <div className=' flex-grow bg-opacity-80  transition-all duration-500'>
                    <div className=' px-3 '>
                        {/* <p className=' pt-4 text-sm text-gray-500 hover:text-gray-700 flex justify-between items-center'><Link  >Apple</Link>  </p> */}
                        <p className=' '><Link to={`/${category?.slug}/${slug}`} className='text-sx font-medium text-text-color'>{name}</Link></p>
                        <div className=' flex items-center gap-2'>
                            <ProductRating rating={`${rating}`}  /> <span className='text-xs text-gray-500'>({reviews || 0} Reviews)</span>
                        </div>
                        <p className='text-xs '> {isStock > 0 ? 'Stock available':'Out of Stock'}</p>
                    </div>
                </div>
                <div className='px-4 flex justify-between items-center'>
                    <div ><span className='text-primary font-bold text-lg'>${price?.sellingPrice}.00</span> {price?.discountPrice > 0 && <del className='text-xs text-gray-400'>${price?.productPrice}</del> }  </div>
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