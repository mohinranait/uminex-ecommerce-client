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
                        <div className="overflow-x-hidden">
                            <table className="w-full min-w-[500px] border-collapse">
                                <tbody>
                                    {
                                        product?.productFeatures?.extraFeatures?.map((item,index) =>  <tr key={index} className="border">
                                            <td className="border-r py-2 pl-3 w-[200px]">{item?.label}</td>
                                            <td className=" py-2 pl-3 ">{item?.value}</td>
                                        </tr> )
                                    }
                                   
                                </tbody>
                            </table>
                        </div>
                     
                    </div>
                </div>
                <div id='overview' className='bg-white rounded-md'>
                    <div className='px-4 py-3 border-b flex items-center justify-between'>
                        <p className='text-lg font-semibold text-gray-700'>Overview</p>
                        <span onClick={handleAccording} className='h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer'><IoChevronDown /></span>
                    </div>
                    <div className={` px-4  transition-all duration-500 overflow-hidden ${accourding ? " target:max-h-[300px] py-4":'h-0'} `}>
                        {
                            product?.short_details && <div className="mb-3">
                                <p className="text-base font-bold text-gray-600">Short overview</p>
                                <p>{product?.short_details}</p>
                            </div>
                        }
                        {
                            product?.details && <div>
                               <p className="text-base font-bold text-gray-600">overview</p>
                               <p>{product?.details}</p>
                            </div>
                        }
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