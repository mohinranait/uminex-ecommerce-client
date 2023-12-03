import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProductRating from '../../global/ProductRating';
import { LuPlusSquare } from 'react-icons/lu';

const ProductCard = ({product}) => {
    const { image, price, title} = product || {};

    return (
        <>


            <div className='rounded-md group bg-white  min-h-[350px] flex flex-col pb-2 '>
                <div className='block  p-1   pb-7'>
                    <Link to={'/products'} >
                        <img src={image} className='h-44 mx-auto' alt="" />
                    </Link>
                
                </div>
                <div className=' flex-grow bg-opacity-80  transition-all duration-500'>
                    <div className=' px-3 '>
                        {/* <p className=' pt-4 text-sm text-gray-500 hover:text-gray-700 flex justify-between items-center'><Link  >Apple</Link>  </p> */}
                        <p className=' '><Link to={'/products'} className='text-sx font-medium text-text-color'>{title}</Link></p>
                        <div className=' flex items-center gap-2'>
                            <ProductRating rating={'3'}  /> <span className='text-xs text-gray-500'>(3 Reviews)</span>
                        </div>
                      
                        <p className='text-xs '>Stock 5 left product</p>
                    </div>
                   
                </div>
                <div className='px-4 flex justify-between items-center'>
                    <div ><span className='text-primary font-bold text-lg'>${price}.00</span> <del className='text-xs text-gray-400'>$150</del> </div>
                    <button className='py-2 rounded-3xl text-gray-700'> <LuPlusSquare className='text-2xl' /> </button>
                </div>
                
            </div>


            {/* <div className='rounded-md group max-h-[390px]  hover:shadow-[0_-2px_30px_#487bb726] pb-2 '>
                <div className='block  p-1   pb-7'>
                    <Link  >
                        <img src={image} className='h-44 mx-auto' alt="" />
                    </Link>
                   
                </div>
                <div className=' bg-opacity-80  group-hover:-translate-y-14 transition-all duration-500'>
                    <div className='h-[190px] px-3 pb-10 '>
                        <p className=' pt-4 text-sm text-gray-500 hover:text-gray-700 flex justify-between items-center'><Link  >Apple</Link>  </p>
                        <p className=' '><Link className='text-sx font-medium text-text-color'>{title}</Link></p>
                        <div className=' flex items-center gap-2'>
                            <ProductRating rating={3}  /> <span className='text-xs text-gray-500'>(3 Reviews)</span>
                        </div>
                        <div ><span className='text-primary font-bold text-lg'>$120</span> <del className='text-xs text-gray-400'>$150</del> </div>
                        <p className='text-xs '>Stock 5 left product</p>
                    </div>
                    <div className='px-4'>
                        <button className='w-full py-2 bg-primary text-white rounded-3xl'>add to card</button>
                    </div>
                </div>
                
            </div>    */}





        </>
    );
};


ProductCard.propTypes = {
    product : PropTypes.object.isRequired,
}

export default ProductCard;