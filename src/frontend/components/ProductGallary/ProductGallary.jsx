import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from "prop-types"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useState } from 'react';

const ProductGallary = ({media}) => {
    const {images} = media || {};
    const [sliderImage, setSliderImage] = useState(null);

    const handleSliderImage = (image) => {
        setSliderImage(image);
    }

    return (
        <>
            <div className=''>
                <img className='mx-auto' src={sliderImage || images?.length > 0 &&  images[0] } alt="" />
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
                    {
                        images?.map((img,index) =>  <SwiperSlide key={index}>
                        <div onClick={() => handleSliderImage(img)} className=''>
                            <img src={img} alt="" />
                        </div>
                    </SwiperSlide> )
                    }
                </Swiper>
            </div>   
        </>
    );
};

ProductGallary.propTypes = {
    media: PropTypes.object
}

export default ProductGallary;