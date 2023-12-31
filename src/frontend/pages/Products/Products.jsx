
import ProductRating from '../../global/ProductRating';
import { useState } from 'react';
import { LuHeart, LuLayers, LuMapPin, LuShare2 } from 'react-icons/lu';
import { IoCashOutline, IoCheckmarkDoneCircleOutline, IoChevronDown, IoShieldCheckmarkOutline, IoSwapHorizontalOutline } from 'react-icons/io5';
import {  FaTruckMoving } from 'react-icons/fa';
import { PiStackSimpleBold } from "react-icons/pi";
import ProductGallary from '../../components/ProductGallary/ProductGallary';
import { HiMiniChevronLeft, HiMiniChevronRight } from 'react-icons/hi2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Link as ScrolLink } from 'react-scroll';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import toast from "react-hot-toast"
import useCarts from '../../../hooks/useCarts';
import useWishlists from '../../../hooks/useWishlists';
import ProductDetailsTabs from '../../components/tabs/ProductDetailsTabs';
import ChatApp from '../../components/liveChat/ChatApp';
import { Helmet } from 'react-helmet-async';
import SingleProductPlaceholder from '../../components/Loding/SingleProductPlaceholder';




const Products = () => {
    const [,refetch] = useCarts();
    const {slug} = useParams();  
    const axiosPublic = useAxiosPublic();
    const axios = useAxios()
    const [chatModal, setChatModal] = useState(false)
    const [color, setColor] = useState( null );
    const [size, setSize] = useState("2GB");
    const [quantity, setQuantity] = useState(1);
    const {user} = useAuth();
    const [,wishlistRefetch] = useWishlists(user)
    const navigate = useNavigate();

    const {data:product={}, isPending} = useQuery({
        queryKey: ['getSingleProductBySlug',slug],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/product-by-slug/${slug}`);
            setColor(data?.product?.colors[0].label)
            return data.product;
        }
    })
    const {_id , name,media,brand,colors,rating, reviews, category,price,isStock
    ,product_type} = product || {};
    
    const {data:categoryProducts} = useQuery({
        queryKey: ["getCategoryProducts",category?.slug],
        enabled : !isPending,
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/category-wish-product/${category?.slug}`);
            return data;
        }
    })

    


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


    // product shopping cart store
    const productShoppingCartAdd = async (methodType) => {
        if(!user?.email){
            navigate("/login")
            return ;
        }
        try {
           
            let varientArr = [];
            if(color){
                varientArr = [...varientArr, {label:'Color', value: color }]
            }
            if(size){
                varientArr = [...varientArr, {label:'Size', value:size}]
            }
            const cartObject = {
                user : user?._id,
                product : product?._id,
                quantity,
                varient : varientArr,
            }

            const response = await axios.post("/carts", cartObject);
            if(response.data.success){
                toast.success("Shopping cart added")
                refetch();
            }
            if(response.data.success){
                if(methodType == 'buy'){
                    navigate('/checkout')
                }
            }
           
        } catch (error) {
            console.log("Shopping cart ",error.message);
        }
    }


    // Add wishlist method
    const handleWishListAdd = async () => {
        if(!user?.email){
            navigate("/login")
            return ;
        }
        try {
            if(user?._id){
                const wishlistObj = {userInfo : user?._id, product: _id}
                const {data} = await axios.post(`/wishlist/${user?.email}`,wishlistObj);
                if(data.success == 'isExists'){
                    toast("This product already exists")
                }else{
                    toast.success("Wishlist added")
                    wishlistRefetch()
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


   
    return (
        <>
              { product?.name &&  <Helmet>
                <title> {name} | Store MI</title>
            </Helmet> }
            {/* <SingleProductPlaceholder /> */}
            {
                isPending ? <SingleProductPlaceholder /> : 
                (<> <section>
         
                    <div className="box py-4 flex items-center justify-between">
                        <ul className='flex flex-wrap items-center gap-1 font-medium text-base text-[#8D979E] '>
                            <li><Link to='/' className='hover:text-text-color'>Home</Link></li> <span>/</span>
                            <li><Link to={`/shop?category=${category?.slug}`} className='hover:text-text-color'>{category?.name}</Link></li> <span>/</span>
                            <li className='text-text-color'>{name}</li>
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
                                    <ProductGallary media={media} />
                                </div>
                            </div>
                            <div className='col-span-1 lg:col-span-2'>
                                <div className='grid  lg:grid-cols-5 gap-6'>
                                    <div className='lg:col-span-3'>
                                        <div className='py-8' >
                                            <div className='pb-5'>
                                                <h1 className='text-xl mb-1 font-medium'>{name}</h1>
                                                <div className='flex items-center  gap-3'>
                                                    <ProductRating rating={`${rating}`} /> 
                                                    <span className='text-sm'>/</span> 
                                                    <span className='text-sm'>{reviews || 0} Reviews</span> 
                                                    <span className='text-sm'>/</span> 
                                                    <ScrolLink 
                                                    to='comments' 
                                                    spy={true} 
                                                    smooth={true} 
                                                    offset={-60} 
                                                    duration={500} 
                                                    className='text-sm cursor-pointer'>Write reviews</ScrolLink>
                                                </div>
                                            </div>
                                            <hr />
                                            <ul className='text-base py-2 space-y-3'>
                                            <li> <span className='text-3xl font-bold text-primary'>${price?.sellingPrice}</span> {price?.discountPrice > 0 && <> <span className='text-xl line-through text-mute'>${price?.productPrice}</span> <span className='py-1 px-3 bg-[#fde9e9] text-secondary text-sm font-medium rounded-md'>{ 100 - ((price?.discountPrice * 100) / price?.productPrice) }% discounts</span> </> } </li>
                                                <li> <span className='font-semibold'>Brand:</span> <a href="#">{brand?.name}</a></li>
                                                <li> <span className='font-semibold'>Stock:</span> {isStock} Available</li>
                                                <li> <span className='font-semibold'>Product:</span> Mobile</li>
                                                <li> <span className='font-semibold'>Type:</span> <a href="#" className='capitalize'>{product_type}</a></li>
                                                <li className='flex flex-col gap-2'> <span className='font-semibold'>Color: <span className='font-medium'>{color}</span> </span> 
                                                    <ul className='flex items-center gap-2'>
                                                        {
                                                            colors?.map(color =>   <li key={color?.value} className={`border-2  rounded-md w-8 h-8 ${color == color?.label ? 'border-primary' : 'border-slate-200' } `} ><span onClick={() => colorVariant(color?.label)} className='w-7 h-7 cursor-pointer scale-95 rounded border inline-block' style={{backgroundColor:color?.value}}></span></li> )
                                                        }
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
                                                <button onClick={() => productShoppingCartAdd('buy')} className='px-8 sm:px-5 md:px-3 xl:w-full py-2 bg-primary uppercase rounded font-semibold text-white'>Buy Now</button>
                                                <button onClick={() => productShoppingCartAdd('cart')} className='px-8 sm:px-5 md:px-3 xl:w-full py-2 bg-secondary uppercase rounded font-semibold text-white'>Add to cart</button>
                                            </div>
                                            <ul className='text-gray-700 flex gap-5 py-5'>
                                                <li onClick={handleWishListAdd} className='flex cursor-pointer text-sm items-center gap-2'> <LuHeart /> <span className='uppercase font-semibold'>Add wishlist</span> </li>
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
                </section></>)
            }
           

            <section className='my-10'>
                <div className="box">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div className='order-2 lg:order-1 space-y-4'>

                            <div className='bg-white'>
                                <div className='flex items-center justify-between border-b px-3 py-3'>
                                    <p className='text-xl font-medium py-1 pl-3  relative before:h-full before:w-[3px] before:bg-secondary before:left-0 before:top-0 before:absolute'>Related Category</p>
                                    <span className='h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer'><IoChevronDown /></span>
                                </div>
                                <ul>
                                    {
                                        categoryProducts?.products?.map(product =>  <li key={product?._id} className='py-2'>
                                        <div className='flex gap-2'>
                                            <div className='w-22 h-22'>
                                                <img className='w-24 h-24' src={product?.media?.images[0] || ''} alt="" />
                                            </div>
                                            <div>
                                                <p><Link to={`/${category?.slug}/${product?.slug}`} className='font-medium text-gray-600'>{product?.name}</Link></p>
                                                <div className=' gap-4 items-center'> 
                                                <span className='text-sm flex items-center gap-2 cursor-pointer font-medium text-gray-500 hover:text-secondary transition-all'><PiStackSimpleBold /> Add to compare </span>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='font-semibold text-gray-600'>${product?.price?.sellingPrice}</span> 
                                                        <ProductRating rating={'4'} />
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
                                                        <ProductRating rating={'4'} />
                                                    </div> 
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </li>  )
                                    }
                                   
                                </ul>
                            </div>
                        </div>
                        <div className='order-1 lg:order-2 col-span-2 '>
                           <ProductDetailsTabs product={product} />
                        </div>
                    </div>
                </div>
            </section>

         
           
           {/* Realtime chat app */}
            {/* <ChatApp product={product} chatModal={chatModal} setChatModal={setChatModal} />                          */}
           
        </>
    );
};

export default Products;