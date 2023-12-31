/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { Link } from 'react-scroll';
import "./ProductDetailsTabs.css"


import ProductReviewForm from "../form/ProductReviewForm";

import RatingDisplay from "../Ratings/RatingDisplay";
const ProductDetailsTabs = ({product}) => {
    
    const [accourding, setAccording] = useState(true);
    const handleAccording = () => {
        setAccording(!accourding)
    }


    return (
        <>
            <div className='space-y-4 '>
                <div className="sticky  z-10 bg-white top-0">
                    <ul className='flex gap-1 sm:gap-4 flex-wrap  items-center px-2 sm:px-4 tabActive py-2'>
                            <Link
                            to='specification' 
                            smooth={true} 
                            spy={true} 
                            offset={-60} 
                            duration={500} 
                            className={`cursor-pointer px-2 sm:px-5 py-2 inline-block bg-white rounded-md text-base font-medium text-gray-900 `} >Specification</Link>
                  
                            <Link
                            to='overview' 
                            smooth={true} 
                            spy={true} 
                            offset={-60} 
                            duration={500} 
                            className={`cursor-pointer px-2 sm:px-5 py-2 inline-block bg-white rounded-md text-base font-medium text-gray-900 `} >Overview</Link>
                 
                            <Link
                            to='comments' 
                            spy={true} 
                            smooth={true} 
                            offset={-60} 
                            duration={500} 
                            className={`cursor-pointer px-2 sm:px-5 py-2 inline-block bg-white rounded-md text-base font-medium text-gray-900 `} >Reviews</Link>
                 
                    </ul>
                </div>
             
                <div id='specification' className='bg-white rounded-md'>
                    <div className='px-4 py-3 border-b flex items-center justify-between'>
                        <p className='text-lg font-semibold text-gray-700'>Specification</p>
                        <span onClick={handleAccording} className='h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer'><IoChevronDown /></span>
                    </div>
                    <div className={` px-4  transition-all duration-500 overflow-hidden ${accourding ? " target:max-h-[300px] py-4":'h-0'} `}>
                        <p className={` `}>The Canon EOS 2000D Digital SLR Camera sensor is CMOS. When it comes to ISO settings, this camera offers Auto. Movies may be recorded at 1920x1080 pixels (1080p HD) or 1280x720 pixels (720p HD). This simple-to-use camera is ideal for beginners, delivering beautiful photos and cinematic Full HD movies full of detail, color, and depth, as well as an excellent low-light performance from a 24.1 Megapixel sensor. With built-in guidance and creative settings in Creative Auto mode, offering partial and full manual photographic controls whenever  ready, live-view shooting with on-screen previews is simple. When using the Canon Camera Connect and Photo Companion apps, you can easily share to social media and shoot remotely by connecting via Wi-Fi or NFC. This camera has to Create stunning photographs and videos by blurring the backdrop. With a big 24.1 Megapixel sensor, shoot detailed shots into the night and produce a lovely background blur. Express your imagination with simple-to-follow the w instructions. With Creative Auto mode, you may shoot with guidelines in mind. Use Creative Filters to create one-of-a-kind effects. Learn about the capabilities of DSLRs and interchangeable lenses with  Photo Companion app. When  ready, add lenses and accessories and switch to manual mode. Shoot with confidence and speed in challenging settings. Capture the moment precisely as you remember it with accurate autofocus, 3.0 f, ps, and DIGIC 4+ processing.</p>
                        
                    </div>
                </div>
                <div id='overview' className='bg-white rounded-md'>
                    <div className='px-4 py-3 border-b flex items-center justify-between'>
                        <p className='text-lg font-semibold text-gray-700'>Overview</p>
                        <span onClick={handleAccording} className='h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer'><IoChevronDown /></span>
                    </div>
                    <div className={` px-4  transition-all duration-500 overflow-hidden ${accourding ? " target:max-h-[300px] py-4":'h-0'} `}>
                        <p className={` `}>The Canon EOS 2000D Digital SLR Camera sensor is CMOS. When it comes to ISO settings, this camera offers Auto. Movies may be recorded at 1920x1080 pixels (1080p HD) or 1280x720 pixels (720p HD). This simple-to-use camera is ideal for beginners, delivering beautiful photos and cinematic Full HD movies full of detail, color, and depth, as well as an excellent low-light performance from a 24.1 Megapixel sensor. With built-in guidance and creative settings in Creative Auto mode, offering partial and full manual photographic controls whenever  ready, live-view shooting with on-screen previews is simple. When using the Canon Camera Connect and Photo Companion apps, you can easily share to social media and shoot remotely by connecting via Wi-Fi or NFC. This camera has to Create stunning photographs and videos by blurring the backdrop. With a big 24.1 Megapixel sensor, shoot detailed shots into the night and produce a lovely background blur. Express your imagination with simple-to-follow the w instructions. With Creative Auto mode, you may shoot with guidelines in mind. Use Creative Filters to create one-of-a-kind effects. Learn about the capabilities of DSLRs and interchangeable lenses with  Photo Companion app. When  ready, add lenses and accessories and switch to manual mode. Shoot with confidence and speed in challenging settings. Capture the moment precisely as you remember it with accurate autofocus, 3.0 f, ps, and DIGIC 4+ processing.</p>
                        
                    </div>
                </div>
                <div id='comments' className='bg-white rounded-md'>
                    <div className='px-4 py-3 border-b flex items-center justify-between'>
                        <p className='text-lg font-semibold text-gray-700'>Coment & reviews</p>
                        <span onClick={handleAccording} className='h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer'><IoChevronDown /></span>
                    </div>
                    <div className={` px-7  transition-all duration-500 overflow-hidden ${accourding ? " target:max-h-[300px] py-4":'h-0'} `}>
                        <div>
                            <RatingDisplay product={product} />
                            <hr className="py-3"/>
                            <ProductReviewForm productId={product?._id} />
                        </div>
                        
                    </div>
                </div>
          
            </div>   
        </>
    );
};

export default ProductDetailsTabs;