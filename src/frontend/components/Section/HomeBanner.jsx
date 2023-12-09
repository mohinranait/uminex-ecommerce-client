
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import HomeSliderItem from '../Slider/HomeSliderItem';
import { Link } from 'react-router-dom';
import CategorysLists from '../../global/Categorys/CategorysLists';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';



const HomeBanner = () => {
    const axiosPublic = useAxiosPublic();
    const [sliders, setSliders] = useState([]);

    useEffect(() => {
        const getSliders = async () => {
            const {data} = await axiosPublic.get(`/all-banners?request=user`);
            setSliders(data?.banners)
        }
        getSliders();
    },[axiosPublic])

    const bannerProducts = [
        {_id: 1, title : "Tablets/lapt", image : "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_1.png?v=1681548716&width=1500"},
        {_id: 2, title : "Tablets/Ipad", image : "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_2.png?v=1681548716&width=1500"},
        {_id: 3, title : "Camera/phone", image : "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_3.png?v=1681548716&width=1500"},
        {_id: 4, title : "Gamepade", image : "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_4.png?v=1681548715&width=1500"},
        {_id: 5, title : "Tablets/Ipad", image : "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_5.png?v=1681548716&width=1500"},
    ]
   
    return (
        <section className='lg:my-5'>
            <div className='lg:box'>
                <div className="grid grid-cols-4 gap-5">
                    <div className='hidden lg:block bg-white rounded-md py-2'>
                        <div>
                            <CategorysLists />
                        </div>
                    </div>
                    <div className='col-span-4 lg:col-span-3'>
                        <div className="grid grid-cols-3  gap-3">
                            <div className=' order-1 md:order-1 bg-white col-span-3 md:col-span-2 row-span-2'>
                                <Swiper
                                    spaceBetween={30}
                                    effect={'fade'}
                                    navigation={true}
                                    pagination={{
                                    clickable: true,
                                    }}
                                    modules={[EffectFade, Navigation, Pagination]}
                                    className="mySwiper"
                                >
                                  
                                    {
                                        sliders?.map(slider =>   <SwiperSlide key={slider._id}>
                                            <HomeSliderItem slider={slider} />
                                        </SwiperSlide> )
                                    }
                                </Swiper>
                            </div>

                            <div className='px-3 lg:px-0 order-3 md:order-2 md:bg-white col-span-3 md:col-span-1 flex items-center overflow-hidden ' >
                                <div className='relative group w-full'>
                                    <div className='absolute w-full h-full flex items-center  pl-6 top-2/4 left-0 -translate-y-2/4'>
                                        <div className='relative '>
                                            <p className='text-xl z-30 text-text-color mb-1 font-semibold'>Over-Ear headphone</p>
                                            <p className='text-sm z-30 text-gray-600 font-medium mb-2'>20 Days Return Products</p>
                                            <div><Link className='text-primary text-sm font-semibold'>Details new</Link></div>
                                        </div>
                                    </div>
                                    <img className='w-full' src="https://demo-uminex.myshopify.com/cdn/shop/files/3_1.jpg?v=1681466981&width=1500" alt="" />
                                </div>
                            </div>
                         
                            <div className='px-3 lg:px-0 order-3 md:order-2 md:bg-white col-span-3 md:col-span-1 flex items-center ' >
                                <div className='relative group w-full'>
                                    <div className='absolute w-full h-full flex items-center  pl-6 top-2/4 left-0 -translate-y-2/4'>
                                        <div className='relative '>
                                            <p className='text-xl z-30 text-text-color mb-1 font-semibold'>AirPods</p>
                                            <p className='text-sm z-30 text-gray-600 font-medium mb-2'>Save 20% discounts</p>
                                            <div><Link className='text-primary text-sm font-semibold'>Details new</Link></div>
                                        </div>
                                    </div>
                                    <img className='w-full' src="https://demo-uminex.myshopify.com/cdn/shop/files/3_2.jpg?v=1681466999&width=1500" alt="" />
                                </div>
                            </div>
                         
                            <div className='px-3 lg:bg-white md:pl-3 md:pr-0 lg:px-0 order-2 md:order-4  col-span-3 md:col-span-2'>
                                <Swiper
                                        spaceBetween={10}
                                        navigation={true}
                                        pagination={{
                                        clickable: true,
                                        slidesPerView: 5,
                                        }}
                                        breakpoints={{
                                            300: {
                                                slidesPerView: 2,
                                                spaceBetween: 10,
                                            },
                                            400: {
                                                slidesPerView: 3,
                                                spaceBetween: 10,
                                            },
                                            540: {
                                                slidesPerView: 4,
                                                spaceBetween: 10,
                                            },
                                            640: {
                                                slidesPerView: 5,
                                                spaceBetween: 10,
                                            },
                                            768: {
                                                slidesPerView: 4,
                                                spaceBetween: 10,
                                            },
                                            1024: {
                                                slidesPerView: 5,
                                                spaceBetween: 10,
                                            },
                                        }}
                                        modules={[ Navigation, Pagination]}
                                        className="mySwiper"
                                    >
                                        {
                                            bannerProducts?.map(product => <SwiperSlide key={product._id}>
                                                
                                                <div className='flex min-h-full flex-col py-2 px-1 rounded-md bg-white'>
                                                    <Link className=''><img className='mx-auto' src={product?.image} alt="" /></Link>
                                                    <Link className='text-center'>{product?.title}</Link>
                                                </div>
                                            </SwiperSlide>  )
                                        }
                                </Swiper>
                            </div>
                            <div className='px-3 lg:px-0 order-3 md:order-5 md:bg-white col-span-3 md:col-span-1 flex items-center'>
                                <div className='relative group w-full'>
                                    <div className='absolute w-full h-full flex items-center  pl-6 top-2/4 left-0 -translate-y-2/4'>
                                        <div className='relative '>
                                            <p className='text-xl z-30 text-text-color mb-1 font-semibold'>Gamepad</p>
                                            <p className='text-sm z-30 text-gray-600 font-medium mb-2'>Optionals Skins</p>
                                            <div><Link className='text-primary text-sm font-semibold'>Details new</Link></div>
                                        </div>
                                    </div>
                                    <img className='w-full' src="https://demo-uminex.myshopify.com/cdn/shop/files/3_3.jpg?v=1681467017&width=1500" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeBanner;