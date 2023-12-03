
import ProductRating from '../../global/ProductRating';
import { useState } from 'react';
import { LuHeart, LuLayers, LuMapPin, LuShare2 } from 'react-icons/lu';
import { IoCashOutline, IoCheckmarkDoneCircleOutline, IoChevronDown, IoShieldCheckmarkOutline, IoSwapHorizontalOutline } from 'react-icons/io5';
import { FaTruckMoving } from 'react-icons/fa';
import { PiStackSimpleBold } from "react-icons/pi";
import ProductGallary from '../../components/ProductGallary/ProductGallary';
import { HiMiniChevronLeft, HiMiniChevronRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';



const Products = () => {
    const [accourding, setAccording] = useState(true);
    const [color, setColor] = useState('Red');
    const [size, setSize] = useState("2GB");
    const [quantity, setQuantity] = useState(1);

    const handleAccording = () => {
        setAccording(!accourding)
    }


    const colorVariant = (color) => {
        setColor(color)
    }
    const sizeVariant = (size) => {
        setSize(size)
    }

   

    const handleIncrement = () => {
        if( quantity <= 9  ){
            setQuantity(quantity + 1)
        }
    }

    const handleDecrement =() => {
        if( quantity > 1 ){
            setQuantity(quantity - 1)
        }
    }


    const products = [
        {_id: 1, name: "Camera mobile", img:'https://demo-uminex.myshopify.com/cdn/shop/files/col_3_3.png?v=1681548716&width=1500', quantity:1,color:'Red'},
        {_id: 2, name: "Game controllers", img:'https://demo-uminex.myshopify.com/cdn/shop/files/col_3_4.png?v=1681548715&width=1500', quantity:2,color:'White'},
        {_id: 3, name: "Table ipads", img:'https://demo-uminex.myshopify.com/cdn/shop/files/col_3_5.png?v=1681548716&width=1500', quantity:1,color:'Blue'},
    ]


    return (
        <>
            <section>
                <div className="box py-4 flex items-center justify-between">
                    <ul className='flex flex-wrap items-center gap-1 font-medium text-base text-[#8D979E] '>
                        <li><a href='#' className='hover:text-text-color'>Home</a></li> <span>/</span>
                        <li><a href="#" className='hover:text-text-color'>Phone & tablets</a></li> <span>/</span>
                        <li className='text-text-color'>Apple mobile phone 4GB/64GB</li>
                    </ul>
                    <ul className='hidden lg:flex items-center gap-1 justify-end'>
                        <li className='flex items-center text-sm'>Previus<a href="#"><HiMiniChevronLeft className='text-xl' /></a></li> | 
                        <li className='flex items-center text-sm'><a href="#"><HiMiniChevronRight className='text-xl' /></a>Next</li>
                    </ul>
                </div>
            </section>
            <section className='bg-white pb-5'>
                <div className="box">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className='col-span-1'>
                            <div className='sticky top-0'>
                                <ProductGallary />
                            </div>
                        </div>
                        <div className='col-span-1 lg:col-span-2'>
                            <div className='grid  lg:grid-cols-5 gap-6'>
                                <div className='lg:col-span-3'>
                                    <div className='py-8' >
                                        <div className='pb-5'>
                                            <h1 className='text-xl mb-1 font-medium'>Samsung Galaxy S21 FE 8GB/128GB</h1>
                                            <div className='flex items-center  gap-3'>
                                                <ProductRating rating={4} /> <span className='text-sm'>/</span> <span className='text-sm'>2 Reviews</span> <span className='text-sm'>/</span> <span className='text-sm'>Write reviews</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <ul className='text-base py-2 space-y-3'>
                                        <li> <span className='text-3xl font-bold text-primary'>$214</span> <span className='text-xl line-through text-mute'>$300</span> <span className='py-1 px-3 bg-[#fde9e9] text-secondary text-sm font-medium rounded-md'>12% discounts</span>  </li>
                                            <li> <span className='font-semibold'>Brand:</span> <a href="#">Apple</a></li>
                                            <li> <span className='font-semibold'>Stock:</span> 3 Available</li>
                                            <li> <span className='font-semibold'>Product:</span> Mobile</li>
                                            <li> <span className='font-semibold'>Type:</span> <a href="#">Physical</a></li>
                                            <li className='flex flex-col gap-2'> <span className='font-semibold'>Color: <span className='font-medium'>{color}</span> </span> 
                                                <ul className='flex items-center gap-2'>
                                                    <li className={`border-2  rounded-md w-8 h-8 ${color == 'Red' ? 'border-primary' : 'border-slate-200' } `} ><span onClick={() => colorVariant('Red')} className='w-7 h-7 cursor-pointer scale-95 rounded border bg-red-600 inline-block'></span></li>
                                                    <li className={`border-2  rounded-md w-8 h-8 ${color == 'Green' ? 'border-primary' : 'border-slate-200' } `} ><span onClick={() => colorVariant('Green')} className='w-7 h-7 cursor-pointer scale-95 rounded border bg-green-600 inline-block'></span></li>
                                                    <li className={`border-2  rounded-md w-8 h-8 ${color == 'Blue' ? 'border-primary' : 'border-slate-200' } `} ><span onClick={() => colorVariant('Blue')} className='w-7 h-7 cursor-pointer scale-95 rounded border bg-blue-600 inline-block'></span></li>
                                                    <li className={`border-2  rounded-md w-8 h-8 ${color == 'White' ? 'border-primary' : 'border-slate-200' } `} ><span onClick={() => colorVariant('White')} className='w-7 h-7 cursor-pointer scale-95 rounded border bg-white inline-block'></span></li>
                                                </ul>
                                            </li>
                                            <li className='flex flex-col gap-2'> <span className='font-semibold'>Size: <span className='font-medium'>{size}</span> </span> 
                                                <ul className='flex items-center gap-2'>
                                                    <li className={`border-2  rounded-md h-8 ${size == '2GB' ? 'border-primary' : "border-slate-200" } `}><span onClick={() => sizeVariant("2GB")} className=' h-7 cursor-pointer scale-95 rounded border  px-2 inline-block'>2GB</span></li>
                                                    <li className={`border-2  rounded-md h-8 ${size == '4GB' ? 'border-primary' : "border-slate-200" } `}><span onClick={() => sizeVariant("4GB")} className=' h-7 cursor-pointer scale-95 rounded border px-2  inline-block'>4GB</span></li>
                                                    <li className={`border-2  rounded-md h-8 ${size == '8GB' ? 'border-primary' : "border-slate-200" } `}><span onClick={() => sizeVariant("8GB")} className=' h-7 cursor-pointer scale-95 rounded border px-2  inline-block'>8GB</span></li>
                                                    <li className={`border-2  rounded-md h-8 ${size == '16GB' ? 'border-primary' : "border-slate-200" } `}><span onClick={() => sizeVariant("16GB")} className=' h-7 cursor-pointer scale-95 rounded border px-2 inline-block'>16GB</span></li>
                                                </ul>
                                            </li>
                                        
                                        </ul>
                                        <div className='flex items-center gap-3 flex-wrap lg:flex-nowrap mt-3'> 
                                            <div className='flex border'>
                                                <button onClick={handleDecrement} className='px-3 text-2xl py-[3px] border-r inline-block'>-</button>
                                                <input type="text" step={1} max={10} min={1} readOnly value={quantity} className="w-[50px] outline-none text-center " />
                                                <button onClick={handleIncrement} className='px-3 text-2xl py-[3px] border-l inline-block'>+</button>
                                            </div>
                                            <button className='px-8 sm:px-5 md:px-3 xl:w-full py-2 bg-primary uppercase rounded font-semibold text-white'>Buy Now</button>
                                            <button className='px-8 sm:px-5 md:px-3 xl:w-full py-2 bg-secondary uppercase rounded font-semibold text-white'>Add to cart</button>
                                        </div>
                                        <ul className='text-gray-700 flex gap-5 py-5'>
                                            <li className='flex cursor-pointer text-sm items-center gap-2'> <LuHeart /> <span className='uppercase font-semibold'>Add wishlist</span> </li>
                                            <li className='flex cursor-pointer text-sm items-center gap-2'> <LuLayers /> <span className='uppercase font-semibold'>Add Compare</span> </li>
                                            <li className='flex cursor-pointer text-sm items-center gap-2 ml-auto'> <LuShare2 /></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='lg:col-span-2 py-5 '>
                                    <div className='py-5 px-5 border rounded-md border-gray-100'>
                                        <p className='text-sm text-slate-500'>Deleviry</p>
                                        <ul className='space-y-2 mb-7'>
                                            <li className='text-base flex  gap-2 items-start'> <span><LuMapPin className='text-lg mt-2 text-slate-500' /></span> <span>Dhaka, Dhaka North, Banani Road No. 12 - 19</span> </li>
                                            <li className='text-base flex  gap-2 items-start'> 
                                                <span><IoCashOutline className='text-lg mt-1 text-slate-500' /></span>  
                                                <div>
                                                   <p> <span className='font-medium'>Estimated Delivery:</span> <span className='text-sm'>27 Oct - 31 Oct</span></p>
                                                    <p className='text-sm text-mute'>3 - 7 (day)s</p>
                                                </div>
                                            </li>
                                            <li className='text-base flex  gap-2 items-start'>
                                                <span><FaTruckMoving className='text-lg mt-1 text-slate-500' /></span>  
                                                <span>Cash on Delevery Available</span>
                                            </li>
                                        </ul>
                                        <p className='text-sm text-slate-500'>Service</p>
                                        <ul className='space-y-2'>
                                         
                                            <li className='text-base flex  gap-2 items-start'> 
                                                <span><IoSwapHorizontalOutline className='text-lg mt-2 text-slate-500' /></span>  
                                                <div>
                                                   <p> <span className='font-medium'>14 days easy return</span></p>
                                                    <p className='text-sm text-mute'>Change of mind is not applicable</p>
                                                </div>
                                            </li>
                                         
                                            <li className='text-base flex  gap-2 items-start'> 
                                                <span><IoShieldCheckmarkOutline className='text-lg mt-1 text-slate-500' /></span>  
                                                <div>
                                                   <p> <span className='font-medium'>1 Year Brand Warranty</span></p>
                                                </div>
                                            </li>
                                            <li className='text-base flex  gap-2 items-start'> 
                                                <span><IoCheckmarkDoneCircleOutline className='text-lg mt-1 text-slate-500' /></span>  
                                                <div>
                                                   <p> <span className='font-medium'>100% original & official</span></p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='my-10'>
                <div className="box">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div className='order-2 lg:order-1 space-y-4'>



        {/* <div className='bg-slate-200'>
            <ul>
                <li className='relative overflow-hidden max-h-[35x leading-[35px] transition-all duration-1000'><a href="#">Home </a></li>
                <li id='page' className='relative target:max-h-[300px] overflow-hidden max-h-[35px] leading-[35px] transition-all duration-1000'>
                    <a href="#page">Pages</a>
                    <ul>
                        <li className='h-[25px] leading-[20px]'><a href="#">Drop down 1</a></li>
                        <li className='h-[25px] leading-[20px]'><a href="#">Drop down 2</a></li>
                        <li className='h-[25px] leading-[20px]'><a href="#">Drop down 3</a></li>
                        <li className='h-[25px] leading-[20px]'><a href="#">Drop down 4</a></li>
                    </ul>
                </li>
                <li id='table' className='relative target:max-h-[300px] overflow-hidden max-h-[35px] leading-[35px] transition-all duration-1000'>
                    <a href="#table">table</a>
                    <ul>
                        <li className='h-[25px] leading-[20px]' ><a href="#">Drop down 1</a></li>
                        <li className='h-[25px] leading-[20px]' ><a href="#">Drop down 2</a></li>
                        <li className='h-[25px] leading-[20px]' ><a href="#">Drop down 3</a></li>
                        <li className='h-[25px] leading-[20px]' ><a href="#">Drop down 4</a></li>
                    </ul>
                </li>
                <li className='relative overflow-hidden max-h-[35x leading-[35px] transition-all duration-1000'><a href="#">About</a></li>
            </ul>

        </div> */}





                            <div className='bg-white'>
                                <div className='flex items-center justify-between border-b px-3 py-3'>
                                    <p className='text-xl font-medium py-1 pl-3  relative before:h-full before:w-[3px] before:bg-secondary before:left-0 before:top-0 before:absolute'>Related Category</p>
                                    <span className='h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer'><IoChevronDown /></span>
                                </div>
                                <ul>
                                    {
                                        products?.map(product =>  <li key={product?._id} className='py-2'>
                                        <div className='flex gap-2'>
                                            <div className='w-22 h-22'>
                                                <img className='w-24 h-24' src={product?.img} alt="" />
                                            </div>
                                            <div>
                                                <p><Link className='font-medium text-gray-600'>{product?.name} product naem is required</Link></p>
                                                <div className=' gap-4 items-center'> 
                                                <span className='text-sm flex items-center gap-2 cursor-pointer font-medium text-gray-500 hover:text-secondary transition-all'><PiStackSimpleBold /> Add to compare </span>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='font-semibold text-gray-600'>$120</span> 
                                                        <ProductRating rating={4} />
                                                    </div> 
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </li>  )
                                    }
                                   
                                </ul>
                            </div>

                            <div className='bg-white'>
                                <div className='flex items-center justify-between border-b px-3 py-3'>
                                    <p className='text-xl font-medium py-1 pl-3  relative before:h-full before:w-[3px] before:bg-secondary before:left-0 before:top-0 before:absolute'>Related Product</p>
                                    <span className='h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer'><IoChevronDown /></span>
                                </div>
                                <ul>
                                    {
                                        products?.map(product =>  <li key={product?._id} className='py-2'>
                                        <div className='flex gap-2'>
                                            <div className='w-22 h-22'>
                                                <img className='w-24 h-24' src={product?.img} alt="" />
                                            </div>
                                            <div>
                                                <p><Link className='font-medium text-gray-600'>{product?.name} product naem is required</Link></p>
                                                <div className=' gap-4 items-center'> 
                                                <span className='text-sm flex items-center gap-2 cursor-pointer font-medium text-gray-500 hover:text-secondary transition-all'><PiStackSimpleBold /> Add to compare </span>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='font-semibold text-gray-600'>$120</span> 
                                                        <ProductRating rating={4} />
                                                    </div> 
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </li>  )
                                    }
                                   
                                </ul>
                            </div>
                        </div>
                        <div className='order-1 lg:order-2 col-span-2 space-y-4'>
                            <div className=''>
                                <ul className='flex gap-4 items-center'>
                                    <li>
                                        <a href='#Specification' className={`px-5 py-3 inline-block bg-white rounded-md text-base font-medium text-gray-900 `} >Specification</a>
                                    </li>
                                    <li>
                                        <a href='#Overview' className={`px-5 py-3 inline-block bg-white rounded-md text-base font-medium text-gray-900 `} >Overview</a>
                                    </li>
                                    <li>
                                        <a href='#' className={`px-5 py-3 inline-block bg-white rounded-md text-base font-medium text-gray-900 `} >Reviews</a>
                                    </li>
                                </ul>
                            </div>
                            <div id='Specification' className='bg-white rounded-md'>
                                <div className='px-4 py-3 border-b flex items-center justify-between'>
                                    <p className='text-lg font-semibold text-gray-700'>Specification</p>
                                    <span onClick={handleAccording} className='h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer'><IoChevronDown /></span>
                                </div>
                                <div className={` px-4  transition-all duration-500 overflow-hidden ${accourding ? " target:max-h-[300px] py-4":'h-0'} `}>
                                    <p className={` `}>The Canon EOS 2000D Digital SLR Camera sensor is CMOS. When it comes to ISO settings, this camera offers Auto. Movies may be recorded at 1920x1080 pixels (1080p HD) or 1280x720 pixels (720p HD). This simple-to-use camera is ideal for beginners, delivering beautiful photos and cinematic Full HD movies full of detail, color, and depth, as well as an excellent low-light performance from a 24.1 Megapixel sensor. With built-in guidance and creative settings in Creative Auto mode, offering partial and full manual photographic controls whenever you're ready, live-view shooting with on-screen previews is simple. When using the Canon Camera Connect and Photo Companion apps, you can easily share to social media and shoot remotely by connecting via Wi-Fi or NFC. This camera has to Create stunning photographs and videos by blurring the backdrop. With a big 24.1 Megapixel sensor, shoot detailed shots into the night and produce a lovely background blur. Express your imagination with simple-to-follow the w instructions. With Creative Auto mode, you may shoot with guidelines in mind. Use Creative Filters to create one-of-a-kind effects. Learn about the capabilities of DSLRs and interchangeable lenses with Canon's Photo Companion app. When you're ready, add lenses and accessories and switch to manual mode. Shoot with confidence and speed in challenging settings. Capture the moment precisely as you remember it with accurate autofocus, 3.0 f, ps, and DIGIC 4+ processing.</p>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Products;