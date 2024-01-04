import PropTypes from "prop-types"
import { Link } from 'react-router-dom';
import ProductRating from '../../global/ProductRating';
import { PiStackSimpleBold } from 'react-icons/pi';
import { IoChevronDown } from 'react-icons/io5';
import { charecterLimit } from "../../../services/charecterLimit";

const SidebarProduct = ({products,category, titleText}) => {
    return (
        <>
            <div className='bg-white'>
                <div className='flex items-center justify-between border-b px-3 py-3'>
                    <p className='text-xl font-medium py-1 pl-3  relative before:h-full before:w-[3px] before:bg-secondary before:left-0 before:top-0 before:absolute'>{titleText}</p>
                    <span className='h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer'><IoChevronDown /></span>
                </div>
                <ul>
                    {
                        products?.map(product =>  <li key={product?._id} className='py-2'>
                        <div className='flex gap-2'>
                            <div className='w-22 h-22'>
                                <img className='w-24 h-24' src={product?.media?.images[0] || ''} alt="" />
                            </div>
                            <div>
                                <p><Link to={`/${category?.slug}/${product?.slug}`} className='font-medium text-gray-600'>{ charecterLimit(product?.name,30,true) }</Link></p>
                                <div className=' gap-4 items-center'> 
                                <span className='text-sm flex items-center gap-2 cursor-pointer font-medium text-gray-500 hover:text-secondary transition-all'><PiStackSimpleBold /> Add to compare </span>
                                    <div className='flex items-center gap-3'>
                                        <span className='font-semibold text-gray-600'>${product?.price?.sellingPrice}</span> 
                                        <ProductRating rating={`${product?.rating}`} />
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </li>  )
                    }
                    
                </ul>
            </div>
        </>
    );
};

SidebarProduct.propTypes = {
    products: PropTypes.array,
    category: PropTypes.object,
    titleText: PropTypes.string
}

export default SidebarProduct;