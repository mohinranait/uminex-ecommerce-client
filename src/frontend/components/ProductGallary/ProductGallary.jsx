import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useState } from 'react';

const ProductGallary = () => {
    const [sliderImage, setSliderImage] = useState();

    const handleSliderImage = (image) => {
        setSliderImage(image);
    }

    return (
        <>
            
                            <div className=''>
                                <img className='mx-auto' src={sliderImage || 'https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-slim-3i/ideapad-slim-3i-0010-500x500.jpg'} alt="" />
                            </div>
                            <div className='my-2'>
                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={8}
                                    navigation={true}
                                    breakpoints={{
                                        640: {
                                          slidesPerView: 5,
                                          spaceBetween: 10,
                                        },
                                        768: {
                                          slidesPerView: 4,
                                          spaceBetween: 10,
                                        },
                                        1024: {
                                          slidesPerView: 4,
                                          spaceBetween: 10,
                                        },
                                    }}
                                    modules={[Navigation]}
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                        <div onClick={() => handleSliderImage("https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-slim-3i/ideapad-slim-3i-0010-500x500.jpg")} className=''>
                                            <img src="https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-slim-3i/ideapad-slim-3i-0010-500x500.jpg" alt="" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div onClick={() => handleSliderImage("https://magento2.magentech.com/themes/sm_clickboom/pub/media/catalog/product/cache/fb43af3fe91eec2409f10ba98e5212f9/2/1/21_8.jpg")} className=''>
                                            <img src="https://magento2.magentech.com/themes/sm_clickboom/pub/media/catalog/product/cache/fb43af3fe91eec2409f10ba98e5212f9/2/1/21_8.jpg" alt="" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div onClick={() => handleSliderImage("https://www.startech.com.bd/image/cache/catalog/mobile/apple/iphone-15-pro/blue-titanium/iphone-15-pro-titanium-blue-01-500x500.webp")} className=''>
                                            <img src="https://www.startech.com.bd/image/cache/catalog/mobile/apple/iphone-15-pro/blue-titanium/iphone-15-pro-titanium-blue-01-500x500.webp" alt="" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div onClick={() => handleSliderImage("https://www.startech.com.bd/image/cache/catalog/laptop/realme/realme-book-prime/realme-book-prime-green-01-500x500.webp")} className=''>
                                            <img src="https://www.startech.com.bd/image/cache/catalog/laptop/realme/realme-book-prime/realme-book-prime-green-01-500x500.webp" alt="" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div onClick={() => handleSliderImage("https://waltonbd.com/image/cache/catalog/Mobile/2022/r10/idr10/r10_id1-364x364.jpg")} className=''>
                                            <img src="https://waltonbd.com/image/cache/catalog/Mobile/2022/r10/idr10/r10_id1-364x364.jpg" alt="" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div onClick={() => handleSliderImage("https://waltonbd.com/image/cache/catalog/mobile/smart-phone/nexg-n70/n70-id/nexg-n70_id3-364x364.jpg")} className=''>
                                            <img src="https://waltonbd.com/image/cache/catalog/mobile/smart-phone/nexg-n70/n70-id/nexg-n70_id3-364x364.jpg" alt="" />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>   
        </>
    );
};

export default ProductGallary;