import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';
import ProductPlaceholder from '../Loding/ProductPlaceholder';


const DisplayProducts = ({products,isPending}) => {
    return (
        <>
            <section className='py-7 bg-[#dcdcdc1a]'>
                <div className="box relative">
                    <div className='flex justify-between bg-white px-4 items-center py-3 mb-3 border-b-2 border-gray-100 '>
                        <div className='text-lg font-semibold text-text-color '><span className='text-primary'>Just  </span>For You</div>
                        <ul className='flex items-center gap-4'>
                            <li><a href="#" className='text-base text-primary border border-primary py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-all font-semibold '>Shop More</a></li>
                        </ul>
                    </div>
                </div>
                <div className="box">
                    <div className='grid grid-cols-2 sm:gird-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
                        {
                            isPending && [1,2,3,4,5,6,7,8,7,8,9,0].map(item =>   <ProductPlaceholder key={item} />  )
                        }
                        {
                            products?.map( product => <ProductCard key={product?._id} product={product} /> )
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

DisplayProducts.propTypes = {
    products : PropTypes.array,
    isPending : PropTypes.func
}
export default DisplayProducts;