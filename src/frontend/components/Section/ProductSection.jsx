import PropTypes from "prop-types"
import { Swiper, SwiperSlide, } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { HiMiniChevronDown } from "react-icons/hi2";
// import required modules
import { Navigation } from 'swiper/modules';
import ProductCard from '../ProductCard/ProductCard';
import { useContext, useState } from "react";
import { OnclickContext } from "../../Providers/OnclickProvider";



const ProductSection = ({products}) => {
    const {isMobileTab,setIsMobileTab} = useContext(OnclickContext)

    const [selectCategory, setSelectCategory] = useState('Top Sell')
    const handleCategory = (category) => {
        setSelectCategory(category)
        setIsMobileTab(!isMobileTab)
    }

    return (
        <section className='py-7 bg-[#dcdcdc1a]'>
            <div className="box  relative">
                <div className='flex justify-between bg-white px-4 items-center py-3 mb-3 border-b-2 border-gray-100 '>
                    <div className='text-lg font-semibold text-text-color '><span className='text-primary'>Features</span> Products</div>
                    <div className="relative">
                        <div onClick={() => setIsMobileTab(!isMobileTab)} className="lg:hidden flex items-center cursor-pointer gap-1">
                            <span className=" text-base text-primary font-semibold">{selectCategory}</span>
                            <span><HiMiniChevronDown /></span>
                        </div>
                        <ul className={`w-[150px] lg:w-auto  top-full right-0 z-10 bg-gray-50 lg:bg-transparent px-2 py-2 rounded-md lg:flex items-center gap-4 ${isMobileTab ? 'block absolute lg:static': 'hidden '}`}>
                            <li><button onClick={() => handleCategory('Top Sell')} className={`text-base font-semibold ${selectCategory == 'Top Sell' ? 'text-primary':'text-text-color'} `}>Top Sell</button></li>
                            <li><button onClick={() => handleCategory('Feature')} className={`text-base font-semibold ${selectCategory == 'Feature' ? 'text-primary':'text-text-color'} `}>Feature</button></li>
                            <li><button onClick={() => handleCategory('Active')} className={`text-base font-semibold ${selectCategory == 'Active' ? 'text-primary':'text-text-color'} `}>Active</button></li>
                        </ul>
                    </div>
                </div>
                <div className=''>
                    <Swiper
                        spaceBetween={10}
                        loop={true}
                        navigation={true} 
                        breakpoints={{
                            500: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            540: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 10,
                            },
                            1100: {
                                slidesPerView: 4,
                                spaceBetween: 10,
                            },
                            1200: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {
                            products?.map(product =>  <SwiperSlide key={product._id}  >
                                <ProductCard product={product} />
                            </SwiperSlide>  )
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

ProductSection.propTypes = {
    products : PropTypes.array
}

export default ProductSection;