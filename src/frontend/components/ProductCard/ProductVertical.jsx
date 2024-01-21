import { Link } from "react-router-dom";
import ProductRating from "../../global/ProductRating";
import { charecterLimit } from "../../../services/charecterLimit";
import { PiStackSimpleBold } from "react-icons/pi";
import PropTypes from "prop-types"


const ProductVertical = ({product, category}) => {
    const { media, slug,rating,price,name} = product || {};
    return (
        <>
            <li className='py-2'>
                <div className='flex gap-2'>
                    <div className='w-22 h-22'>
                        <img className='w-24 h-24' src={media?.images[0] || ''} alt="" />
                    </div>
                    <div>
                        <p><Link to={`/${category?.slug}/${slug}`} className='font-medium text-gray-600'>{ charecterLimit(name,30,true) }</Link></p>
                        <div className=' gap-4 items-center'> 
                        <span className='text-sm flex items-center gap-2 cursor-pointer font-medium text-gray-500 hover:text-secondary transition-all'><PiStackSimpleBold /> Add to compare </span>
                            <div className='flex items-center gap-3'>
                                <span className='font-semibold text-gray-600'>${price?.sellingPrice}</span> 
                                <ProductRating rating={`${rating}`} />
                            </div> 
                        </div>
                    </div>
                </div>
            </li> 
        </>
    );
};

ProductVertical.propTypes = {
    product: PropTypes.object,
    category: PropTypes.object,
}

export default ProductVertical;