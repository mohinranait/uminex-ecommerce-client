import {  useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import Select from "react-select"
import useCategorys from '../../../hooks/useCategorys';
import useBrands from '../../../hooks/useBrands';
import { format } from 'date-fns';
import PropTypes from "prop-types"
import 'react-image-upload/dist/index.css'
import 'react-day-picker/dist/style.css';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
import { uploadImage } from '../../../services/UploadImage';
// import { dateFormater } from '../../../services/DateFormater';
import toast from "react-hot-toast"
import useColors from '../../../hooks/useColors';
import MobileFeatures from '../productFeatures/MobileFeatures';
import LaptopFeatures from '../productFeatures/LaptopFeatures';
import { useNavigate } from 'react-router-dom';

const productTypes = [
    {
        _id: 1,
        icon : 'https://img.lovepik.com/free-png/20210926/lovepik-mobile-phone-icon-png-image_401486772_wh1200.png',
        title: "Mobile phone",
        label: "mobile-phone",
        items : '10 Items'
    },
    {
        _id: 2,
        icon : 'https://media.istockphoto.com/id/1388505044/vector/laptop-or-computer-line-icon.jpg?s=612x612&w=0&k=20&c=N_luf_FgAxGnLbEgPIbUxXkgwiYdVjFf-D3Dt2eKYa0=',
        title: "Laptop and PC",
        label: "laptop-and-pc",
        items : '10 Items'
    },
    {
        _id: 3,
        icon : 'https://www.iconpacks.net/icons/2/free-smart-watch-icon-2087-thumb.png',
        title: "Smart watch",
        label: "smart-watch",
        items : '10 Items'
    },
    {
        _id: 4,
        icon : 'https://cdn-icons-png.flaticon.com/512/9117/9117806.png',
        title: "Smart speaker",
        label: "smart-speaker",
        items : '10 Items'
    },
]

const phoneMemorys = [
    {_id: 1, value : '2/8 GB', label : '2/8 GB' },
    {_id: 2, value : '2/32 GB', label : '2/32 GB' },
    {_id: 3, value : '3/32 GB', label : '3/32 GB' },
    {_id: 4, value : '3/64 GB', label : '3/64 GB' },
    {_id: 5, value : '4/64 GB', label : '4/64 GB' },
    {_id: 6, value : '4/128 GB', label: '4/128 GB' },
] 


const featuresProducts = [
    {
        label: 'Active',
        value : 'active',
    },
    {
        label: 'In-active',
        value : 'pending',
    },
]

const ProductForm = ({product}) => {
    const navigate = useNavigate()
    const [colors] = useColors();
    const formateColors = colors?.map(color => { 
        return {
            value : color?.colorCode,
            label : color?.name,
            slug : color?.name?.toLowerCase()?.split(' ')?.join('-')
        }    
    })

    const [featuresItems, setFeaturesItems] = useState( product ? product?.productFeatures?.extraFeatures :  [
        {label: '', value:''},
    ])
 
    const axios = useAxios(); 
    const [isSlug, setIsSlug] = useState( product?.slug || '');
    const [deliveryToggle, setDeliveryToggle] = useState(true);
    const [selectColors, setSelectColors] = useState(product?.productFeatures?.keyFeatures?.colors || null)
    const [selectMemory, setSelectMemory] = useState(product?.productFeatures?.keyFeatures?.memorys || null)
    const [selected, setSelected] = useState( new Date( product ? product?.publish_date : new Date()));
    const [imgText1, setImgText1] = useState('Upload Image');
    const [imgText2, setImgText2] = useState('Upload Image');
    const [imgText3, setImgText3] = useState('Upload Image');
    const [imgText4, setImgText4] = useState('Upload Image');
    const [categoryType, setCategoryType] = useState( productTypes[0].label)
    const [error,setError] = useState({
        priceError: '',
        offerPriceError: '',
        slugError: ''
    })


    
    const [sellingPrice, setSillingPrice] = useState(product ? product?.price?.sellingPrice : 0)
    const [isPrice, setIsPrice] = useState(product ? product?.price?.productPrice : 0 );
    const [isOfferPrice, setIsOfferPrice] = useState(product ? product?.price?.discountPrice : 0)

    const [categorys] = useCategorys({search:'',status:true});
    const categoryFormates = categorys?.map(category => {
        return { value : category?._id, label: category?.name }
    })

    const {user} = useAuth();
    const [category, setCategory] = useState(product ? {
        value: product?.category?._id,
        label: product?.category?.name,
    }:null)
    

    useEffect(() => {
        setCategoryType(product?.categoryType)
    },[product])

    const [brand, setBrand] = useState(product ? {
        value: product?.brand?._id,
        label: product?.brand?.name,
    } : null);
    const [brands] = useBrands();
    const getBrands = brands?.map(brand => { 
        return {
            value: brand?._id,
            label: brand?.name,
        }
    });
  



    // handle price 
    const handlePrice = e => {
        const isPrice = Number(e.target.value);
        setIsPrice(isPrice)
        
        if( isPrice < isOfferPrice ){
            setError({priceError:"Selling price > offer price"})
        }else{
            setError({priceError:""})
            if( isOfferPrice > 0 ){
                setSillingPrice(isOfferPrice)
            }else{
                setSillingPrice(isPrice)
            }
        }
    }

    // handle price 
    const handleOfferPrice = e => {
        const inputValue = Number(e.target.value);
        setIsOfferPrice(inputValue)
        if( isPrice < inputValue ){
            setError({offerPriceError:"Offer price < selling price"})
        }else{
            setError({offerPriceError:""})
            if( inputValue <= 0  ){
                setSillingPrice(isPrice)
            }else{
                setSillingPrice(inputValue)
            }
        }
    }





    const handleProduct = async (e) => {
        e.preventDefault();

        const form = e.target;
        const isFeature = form.featureProduct.value;
        const details = form.details.value;
        const isStock = Number(form.isStock.value);
        const minStock = Number(form.minStock.value);
        const name = form.name.value;
        const publishDate = selected;
        const product_type = form.product_type.value;
        const short_details = form.short_details.value;
        const skuCode = form.skuCode.value;
        const status = form.status.value;
        const file1 = form.image1.files[0];
        const file2 = form.image2.files[0];
        const file3 = form.image3.files[0];
        const file4 = form.image4.files[0];


  
        if( isPrice < isOfferPrice ){
            toast.error("Regular price > offer price");
            setError({
                priceError: "Regular price > offer price",
                offerPriceError: "Offer price < regular price"
            })
            return;
        }

        try {
            let imgArr = [];
            if(file1){
                const img1 = await uploadImage(file1)
                imgArr = [...imgArr, img1]
            }
            if(file2){
                const img2 = await uploadImage(file2)
                imgArr = [...imgArr, img2]
            }
            if(file3){
                const img3 = await uploadImage(file3)
                imgArr = [...imgArr, img3]
            }
            if(file4){
                const img4 = await uploadImage(file4)
                imgArr = [...imgArr, img4]
            }

            if(imgArr.length === 0){
                const existImags = product?.media?.images;
                imgArr = [...imgArr, ...existImags]
            }
        

            const productObject = {
                author: user?._id,
                brand : brand?.value, 
                category: category?.value,
                isFeature,
                // colors:selectColors, 
                details,
                delivery: {
                    deliveryStatus : deliveryToggle ? 'pay': 'free',
                    deliveryCharge : deliveryToggle ? form.deliveryCharge.value : 0,
                },
                isStock: isStock  || 10,
                minStock : minStock || 2,
                name,
                price: {
                    sellingPrice : Number(isOfferPrice ? isOfferPrice : isPrice) || 0,
                    productPrice : Number(isPrice) || 0,
                    discountPrice : Number(isOfferPrice) || 0,
                }, 
                product_type: product_type || 'physical',
                publish_date:publishDate,
                status : status || 'active', 
                slug:isSlug || Math.random().toString(36).substring(2,9),
                short_details, 
                skuCode : skuCode || Math.random().toString(36).substring(2,7),
                media : {
                    images: imgArr,
                },
                categoryType: categoryType || 'mobile-phone',
                productFeatures: {
                keyFeatures : {
                        colors : selectColors?.length ?  [...selectColors] : [],
                        memorys : selectMemory?.length > 0 ? [...selectMemory] : [],
                    },
                    extraFeatures: featuresItems?.length > 0 ? featuresItems : []
                }
            };
            // console.log(productObject);
            if( !product ){
                const response = await axios.post('/products', productObject);
                if(response.data.success){
                    navigate('/admin/products')
                    toast.success("Created Successfull");
                }
            }else{
                const response = await axios.patch(`/products/${product?._id}`, productObject);
                if(response.data.success){
                    toast.success("Updated Successfull");
                }
            }
            
        } catch (error) {
            console.log('hoy',error.message);
        }
       
        
    }

   

    // Products types 
    const productTypesOptions = [
        {value:"physical", label:'Physical'},
        {value:"digital", label:'Digital'},
    ]
    const selectIndexTypes = productTypesOptions.findIndex(item => item?.value === product?.product_type)
    
    // Feature selected
    const selectedFeatures = featuresProducts?.findIndex(item => item?.value == product?.isFeature) || 0

    // Product status
    const productStatusOptions = [
        {value:"active", label:'Active'},
        {value:"pending", label:'Pending'},
    ]
    const selectIndexStatus = productStatusOptions?.findIndex(item => item?.value === product?.status)

    // Add new input for product features
    const handleAddFeaturesItem = () => {
        setFeaturesItems([...featuresItems, {label: '', value: ''}])
    }

    // remove product features UI
    const handleFeatureDeleteItem = (index) => {
        const lists = [...featuresItems];
        lists.splice(index, 1);
        setFeaturesItems(lists) 
    }

    // Handle features item label
    const handleItemLabel = (e, index) => {
        const {name, value} = e.target
        const lists = [...featuresItems];
        lists[index][name] = value
        setFeaturesItems(lists);
    }


    // Day picker footer text
    let footer = <p>Please pick a day.</p>;
    if (selected) {
      footer = <p>You picked {format(selected, 'PP')}.</p>;
    }
    return (
        <>
            <form onSubmit={handleProduct} >
                <div className="grid md:grid-cols-4 gap-5">
                    <div className="lg:col-span-3 space-y-5">
                        <div className="rounded-md bg-white border border-gray-100 ">
                            <div className="flex items-center justify-between px-5 py-4">
                                <p>Product Type</p>
                                <button>Add category</button>
                            </div>
                            <hr />
                            <div className="px-5 py-5">
                                <div className="grid grid-cols-4 gap-5">
                                    {
                                        productTypes?.map(item =>   <div key={item?._id} onClick={() => setCategoryType(item?.label)} className={`border  rounded-md cursor-pointer bg-gray-50 p-3 ${categoryType === item?.label ? 'border-blue-600' : 'border-gray-200'} `}>
                                            <div className="w-10">
                                                <img src={item?.icon} alt="" />
                                            </div>
                                            <p className="text-sm text-gray-900 mt-2">{item?.title}</p>
                                            <p className="text-xs text-gray-500">10 Items</p>
                                        </div> 
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="rounded-md bg-white border border-gray-100 ">
                            <div className="flex items-center justify-between px-5 py-4">
                                <p>Product details</p>
                                <button>Add brand</button>
                            </div>
                            <hr />
                            <div className="px-5 py-5">
                                <div className="grid lg:grid-cols-2 gap-6 mt-1">
                                    <div>
                                        <div className='mb-5'>
                                            <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">Product name</label>
                                            <input type="text" name="name" defaultValue={product?.name || ''} onChange={(e) => setIsSlug(e.target.value.split(' ').join('-').toLocaleLowerCase())} className="py-2 px-3 w-full border outline-primary transition-all focus:pl-5 rounded-md border-gray-200" placeholder="Name" />
                                            {isSlug && <p className={`text-xs font-normal  ${error?.slugError ? 'text-red-600' : 'text-gray-400' }`}>Slug: {isSlug} { error?.slugError && error?.slugError } </p>}
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">Select brand</label>
                                            <Select
                                                name={'brand'}
                                                options={getBrands}
                                                onChange={(e) => setBrand(e)}
                                                value={brand}
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">Select category </label>
                                            <Select 
                                                name={'category'}
                                                options={categoryFormates}
                                                onChange={(e) => setCategory(e)}
                                                value={category}
                                            />
                                        </div>
                                        <div className='grid lg:grid-cols-2 gap-3'>
                                            <div className=''>
                                                <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">Selling price {sellingPrice>0 && `(${sellingPrice})`}  </label>
                                                <input type="number" onChange={handlePrice}  name="price" defaultValue={product?.price?.productPrice || ''} className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200" placeholder="Price" />
                                                {
                                                    error.priceError && <p className='text-xs text-red-500'>{error.priceError}</p>
                                                }
                                            </div>
                                            <div className=''>
                                                <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">Offer price (Optional) </label>
                                                <input type="number" onChange={handleOfferPrice} name="discount" defaultValue={product?.price?.discountPrice || ''} className="py-2 px-3 w-full border outline-primary focus:pl-5 rounded-md border-gray-200" placeholder="discount" />
                                                {
                                                    error.offerPriceError && <p className='text-xs text-red-500'>{error.offerPriceError}</p>
                                                }
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div>
                                        <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">Publish date</label>
                                        <DayPicker
                                            mode="single"
                                            selected={selected}
                                            onSelect={setSelected}
                                            footer={footer}
                                        />
                                    </div>
                                   
                                </div>
                              
                            </div>
                        </div>
                        

                        <div className="rounded-md bg-white border border-gray-100 ">
                            <div className="flex items-center justify-between px-5 py-4">
                                <p>Product key features</p>
                                <button>Add brand</button>
                            </div>
                            <hr />
                            <div className="px-5 py-5">
                                <div className='text-lg font-medium mb-2'>Key features</div>
                                <div className="grid lg:grid-cols-3 gap-6 mt-1">
                                    <div>
                                        <div className='mb-5'>
                                            <input type="text" readOnly value="Color"  className="py-2 px-3 w-full bg-gray-100 border outline-none transition-all  rounded-md border-gray-200" />
                                        </div>
                                    </div>
                                    <div className='col-span-2'>
                                        <div className='mb-5'>
                                            <Select 
                                                name='colors'
                                                value={selectColors}
                                                options={formateColors} 
                                                isMulti
                                                onChange={(e) => setSelectColors(e) }
                                            />
                                        </div>
                                    </div>
                                </div>
                                {
                                    categoryType == 'mobile-phone' &&  <div className="grid lg:grid-cols-3 gap-6 mt-1">
                                    <div>
                                        <div className='mb-5'>
                                            <input type="text" readOnly value="Ram/Rom"  className="py-2 px-3 w-full bg-gray-100 border outline-none transition-all  rounded-md border-gray-200" />
                                        </div>
                                    </div>
                                    <div className='col-span-2'>
                                        <div className='mb-5'>
                                            <Select 
                                                name='ramRom'
                                                value={selectMemory}
                                                options={phoneMemorys} 
                                                isMulti
                                                onChange={(e) => setSelectMemory(e) }
                                            />
                                        </div>
                                    </div>
                                </div> 
                                }
                                <div className='text-lg font-medium mb-2'>Extra features</div>
                                <div className="grid lg:grid-cols-3 gap-6 mt-2">
                                    <div>
                                        <div className='mb-1'>
                                           Label
                                        </div>
                                    </div>
                                    <div className='col-span-1'>
                                        <div className='mb-1'>
                                            Value
                                        </div>
                                    </div>
                                </div>
                                {
                                    featuresItems?.map((item ,index) =>  <div key={index} className="grid lg:grid-cols-3 gap-6 mt-1">
                                    <div>
                                        <div className='mb-5'>
                                            <input type="text" name='label' onChange={(e) => handleItemLabel(e,index)}  value={item?.label} className="py-2 px-3 w-full bg-gray-100 border outline-none transition-all  rounded-md border-gray-200" />
                                        </div>
                                    </div>
                                    <div className='col-span-2 '>
                                        <div className='mb-5 flex gap-2'>
                                            <input type="text"  name="value" onChange={(e) => handleItemLabel(e,index)} value={item?.value} className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200"  />
                                            <button type='button' onClick={() => handleFeatureDeleteItem(index)} className='px-2 text-sm rounded bg-red-600 text-white'>Remove</button>
                                        </div>
                                    </div>
                                </div>)
                                }
                               
                                <div className="grid lg:grid-cols-3 gap-6 mt-1">
                                    <div>
                                        <div className='mb-5'>
                                            <button type='button' onClick={handleAddFeaturesItem} className='w-full py-2 bg-gray-200 rounded'>Add Items</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        
                       

                        <div className="rounded-md bg-white border border-gray-100 ">
                            <div className="flex items-center justify-between px-5 py-4">
                                <p>Product Media</p>
                                <button>Add brand</button>
                            </div>
                            <hr />
                            <div className="px-5 py-5">
                                
                                <div className='mt-1'>
                                    <label className='file_upload px-5 py-5 h-[200px] cursor-pointer flex items-center justify-center relative border-4 border-dotted border-gray-300 rounded-lg'>
                                        <div className='flex flex-col w-max  mx-auto text-center'>
                                            <div>
                                                <input
                                                className='text-sm cursor-pointer w-36 hidden'
                                                type='file'
                                                name='image1'
                                                id='image'
                                                accept='image/*'
                                                hidden
                                                onChange={(e) => setImgText1(e.target.files[0].name)}
                                                />
                                                <div className='bg-primary py-2 overflow-x-auto max-w-[250px] overflow-hidden text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-primary'>
                                                    <span>{imgText1}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div className='grid grid-cols-3 gap-5 mt-5'>
                                    <label className='file_upload px-5 py-5 h-[120px] cursor-pointer flex items-center justify-center relative border-4 border-dotted border-gray-300 rounded-lg'>
                                        <div className='flex flex-col w-max  mx-auto text-center'>
                                            <div>
                                                <input
                                                className='text-sm cursor-pointer w-36 hidden'
                                                type='file'
                                                name='image2'
                                                id='image'
                                                accept='image/*'
                                                hidden
                                                onChange={(e) => setImgText2(e.target.files[0].name)}
                                                />
                                                <div className='bg-primary py-2 overflow-x-auto max-w-[250px] overflow-hidden text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-primary'>
                                                    <span>{imgText2}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                    <label className='file_upload px-5 py-5 h-[120px] cursor-pointer flex items-center justify-center relative border-4 border-dotted border-gray-300 rounded-lg'>
                                        <div className='flex flex-col w-max  mx-auto text-center'>
                                            <div>
                                                <input
                                                className='text-sm cursor-pointer w-36 hidden'
                                                type='file'
                                                name='image3'
                                                id='image'
                                                accept='image/*'
                                                hidden
                                                onChange={(e) => setImgText3(e.target.files[0].name)}
                                                />
                                                <div className='bg-primary py-2 overflow-x-auto max-w-[250px] overflow-hidden text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-primary'>
                                                    <span>{imgText3}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                   
                                    <label className='file_upload px-5 py-5 h-[120px] cursor-pointer flex items-center justify-center relative border-4 border-dotted border-gray-300 rounded-lg'>
                                        <div className='flex flex-col w-max  mx-auto text-center'>
                                            <div>
                                                <input
                                                className='text-sm cursor-pointer w-36 hidden'
                                                type='file'
                                                name='image4'
                                                id='image'
                                                accept='image/*'
                                                hidden
                                                onChange={(e) => setImgText4(e.target.files[0].name)}
                                                />
                                                <div className='bg-primary py-2 overflow-x-auto max-w-[250px] overflow-hidden text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-primary'>
                                                    <span>{imgText4}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                    
                                </div>
                            </div>
                        </div>

                        <div className="rounded-md bg-white border border-gray-100 ">
                            <div className="flex items-center justify-between px-5 py-4">
                                <p>Product Details</p>
                                <button>Text</button>
                            </div>
                            <hr />
                            <div className="px-5 py-5">
                                
                                <div className='mt-1'>
                                    <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">Product short details </label>
                                    <textarea name="short_details" defaultValue={product?.short_details || ''} className="py-2 px-3 w-full border outline-primary transition-all focus:pl-5 rounded-md border-gray-200" id="" cols="30" rows="2" placeholder='Summery text...'></textarea>
                                </div>
                                
                                <div className='mt-1'>
                                    <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">Product details </label>
                                    <textarea name="details" defaultValue={product?.details || ''} className="py-2 px-3 w-full border outline-primary transition-all focus:pl-5 rounded-md border-gray-200" id="" cols="30" rows="5" placeholder='Details...'></textarea>
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-5 items-center'>
                            <button type='submit' className='px-5 py-3 inline-block w-full bg-blue-600 text-white font-medium text-center rounded-md'>Save and publish</button>
                            <button className='px-5 py-3 inline-block w-full bg-yellow-600 text-white font-medium text-center rounded-md'>Save and edit</button>
                            <button className='px-5 py-3 inline-block w-full bg-red-600 text-white font-medium text-center rounded-md'>Reset form</button>
                        </div>
                    </div>
                    <div>
                        <div className='bg-white mb-5 '>
                            <div className="flex items-center justify-between px-5 py-4">
                                <p>Delivery </p>
                            </div>
                            <hr />
                            <div className='px-5 py-4'>
                                <div>
                                    <div className="flex items-center w-full my-3">
                                        
                                        <label htmlFor="toggle" className="flex items-center cursor-pointer">
                                            {/* <input  type="checkbox"  id="toggle" className="sr-only peer" /> */}
                                            <div onClick={() => setDeliveryToggle(!deliveryToggle)} className={`switch    ${deliveryToggle ? 'before:left-7 before:bg-white' :'before:left-1 before:bg-blue-600'} `}></div>
                                        </label>
                                        <span className="text-xs mx-5">Toggle me!</span>
                                    </div>
                                </div>
                                {
                                    deliveryToggle &&  <div className='mb-5'>
                                    <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">Delivery Charge</label>
                                    <input type="number" name="deliveryCharge" defaultValue={ 100} required className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200" placeholder="Price" />
                                </div>
                                }
                               
                            </div>
                        </div>
                        <div className='bg-white mb-5 '>
                            <div className="flex items-center justify-between px-5 py-4">
                                <p>Additional Information</p>
                            </div>
                            <hr />
                            <div className='px-5 py-4'>
                                <div className='mb-5'>
                                    <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">Stock product</label>
                                    <input type="number" name="isStock" defaultValue={ product?.isStock || 10} className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200" placeholder="Price" />
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">Minimum stock</label>
                                    <input type="number" name="minStock" defaultValue={ product?.minstock ||  5} className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200" placeholder="Price" />
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">SKU code</label>
                                    <input type="text" name="skuCode" defaultValue={product?.skuCode || ''} className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200" placeholder="Price" />
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">Feature Product</label>
                                    <Select
                                        name='featureProduct'
                                        defaultValue={featuresProducts[selectedFeatures]}
                                        options={featuresProducts}
                                    />
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">Product type</label>
                                    <Select
                                        name='product_type'
                                        defaultValue={productTypesOptions[selectIndexTypes]}
                                        options={productTypesOptions}
                                    />
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">Product Status</label>
                                    <Select
                                        name='status'
                                        defaultValue={productStatusOptions[selectIndexStatus]}
                                        options={productStatusOptions}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='bg-white mb-5 '>
                            <div className="flex items-center justify-between px-5 py-4">
                                <p>Product attribute</p>
                            </div>
                            <hr />
                            <div className='px-5 py-4'>
                                <div className='mb-5'>
                                    <label htmlFor="" className="text-sm font-medium text-gray-600 mb-3">Product storage</label>
                                    <input type="text" name="storage"  className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200" placeholder="Storage" />
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </form>    
        </>
    );
};

ProductForm.propTypes = {
    product: PropTypes.object
}

export default ProductForm;