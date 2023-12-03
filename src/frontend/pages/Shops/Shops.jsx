
import { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { IoChevronBack, IoChevronForwardOutline } from 'react-icons/io5';
import { OnclickContext } from '../../Providers/OnclickProvider';

const Shops = () => {
    const {showItem,setShowItem,selectBox,setSelectBox} = useContext(OnclickContext);
    const getPproducts = useLoaderData();
    const [products, setProducts] = useState(getPproducts);
    const [filterProducts, setFilterProducts] = useState(10)
  
    const [perViews, setPerViews] = useState(10)
    const [selectValues, setSelectValues] = useState('Features')
    const [isLeftFilter, setIsLeftFilter] = useState(false);

    const handleSelectMenu = () => {
        setSelectBox(!selectBox)
    }

    const handleShowItem = () => {
        setShowItem(!showItem)
    }

    const handlePerViews = (value) => {
        setPerViews(value)
        setFilterProducts(value);
        setShowItem(false)
    }

    const handleFeatures = (value) => {
        if(value == 'a-z'){
            const sorts = products?.sort((a,b)=>{
                if(a.title.toLowerCase() > b.title.toLowerCase()){
                    return 1
                }else{
                    return -1;
                }
            })
            setProducts(sorts)
        }else if(value === 'z-a'){
            const sorts = products?.sort((a,b)=>{
                if(a.title.toLowerCase() > b.title.toLowerCase()){
                    return 1
                }else{
                    return -1;
                }
            }).reverse()
            setProducts(sorts);
        }else if(value === 'Price top to low'){
            const sorts = products?.sort((a,b)=>{
                return a.price - b.price 
            }).reverse()
            setProducts(sorts);
        }else if(value === 'Price low to top'){
            const sorts = products?.sort((a,b)=>{
                return a.price - b.price 
            })
            setProducts(sorts);
        }
        setSelectValues(value)
        setSelectBox(false)
    }


    return (
        <>
            <section className='py-6 relative'>
                <div className="box">
                    <div className='grid lg:grid-cols-4 gap-5 '>
                        <div className={`
                        shopLeftFilter
                         ${
                            isLeftFilter ? 'translate-x-0 left-0' : '-translate-x-[calc(100%+8px)] lg:translate-x-0 '
                         }
                         `}>
                            <div className='bg-white  px-5 py-4 relative'>
                                <span onClick={() => setIsLeftFilter(!isLeftFilter)} className='z-[999] lg:hidden w-[30px] h-[50px] bg-primary absolute -right-[30px] flex items-center justify-center top-2 text-lg text-white rounded-r cursor-pointer'> {isLeftFilter ? <IoChevronBack /> : <IoChevronForwardOutline /> }  </span>
                                <p className='text-xl font-semibold text-gray-800 mb-4'>Filters</p>
                                <div>
                                    <p className='text-lg text-gray-600 font-medium mb-1 border-b pb-1'>Promotion & Services</p>
                                    <ul className='space-y-2'>
                                        <li className=''><span className='inline-flex items-center border rounded-md py-1 px-2 cursor-pointer gap-2'> <img className='w-5' src="https://img.alicdn.com/imgextra/i4/O1CN01Tp04IC1x3IWhZt8RK_!!6000000006387-2-tps-72-72.png" alt="" /> <span className='text-sm'>Free Delivery</span></span></li>
                                        <li className=''><span className='inline-flex items-center border rounded-md py-1 px-2 cursor-pointer gap-2'> <img className='w-5' src="https://img.alicdn.com/imgextra/i4/O1CN01pr1AG92A8sM4YKlmy_!!6000000008159-2-tps-72-72.png" alt="" /> <span className='text-sm'>Best Price Guaranteed</span></span></li>
                                        <li className=''><span className='inline-flex items-center border rounded-md py-1 px-2 cursor-pointer gap-2'> <img className='w-5' src="https://img.alicdn.com/imgextra/i2/O1CN01sEvCqG1M7ICGGpTXv_!!6000000001387-2-tps-72-72.png" alt="" /> <span className='text-sm'>Cash On Delivery</span></span></li>
                                    </ul>
                                </div>
                                <div className='mt-6'>
                                    <p className='text-lg text-gray-600 font-medium mb-1 border-b pb-1'>Categorys</p>
                                    <ul className='space-y-2'>
                                        <li className=''><Link className='block hover:text-gray-900 cursor-pointer text-gray-600'> DSLR </Link></li>
                                        <li className=''><Link className='block hover:text-gray-900 cursor-pointer text-gray-600'> Body only </Link></li>
                                        <li className=''><Link className='block hover:text-gray-900 cursor-pointer text-gray-600'> Lents </Link></li>
                                    </ul>
                                </div>
                                <div className='mt-6'>
                                    <p className='text-lg text-gray-600 font-medium mb-1 border-b pb-1'>Brands</p>
                                    <ul className='space-y-2'>

                                        <li className=''>
                                            <label htmlFor="nikon" className='cursor-pointer relative'>
                                                <span className='w-[18px] h-[18px] rounded inline-block relative border-2 top-[5px] border-gray-200'>
                                                    <input type="checkbox" id='nikon' className='opacity-0 peer' />
                                                    <span className='w-full absolute -top-[4px] left-0 mt-1 mr-2 h-full peer-checked:border-primary block rounded scale-0 transition-all peer-checked:scale-100'>
                                                        <span className='w-[10px] h-[6px] mb-[9px] ml-[2px] border-l-2 border-b-2 border-primary inline-block -rotate-45'></span>
                                                    </span>
                                                </span>
                                                <span className='ml-1'>Nikon</span>
                                            </label>
                                        </li>
                                        <li className=''>
                                            <label htmlFor="Canon" className='cursor-pointer relative'>
                                                <span className='w-[18px] h-[18px] rounded inline-block relative border-2 top-[5px] border-gray-200'>
                                                    <input type="checkbox" id='Canon' className='opacity-0 peer' />
                                                    <span className='w-full absolute -top-[4px] left-0 mt-1 mr-2 h-full peer-checked:border-primary block rounded scale-0 transition-all peer-checked:scale-100'>
                                                        <span className='w-[10px] h-[6px] mb-[9px] ml-[2px] border-l-2 border-b-2 border-primary inline-block -rotate-45'></span>
                                                    </span>
                                                </span>
                                                <span className='ml-1'>Canon</span>
                                            </label>
                                        </li>
                                        <li className=''>
                                            <label htmlFor="Sony" className='cursor-pointer relative'>
                                                <span className='w-[18px] h-[18px] rounded inline-block relative border-2 top-[5px] border-gray-200'>
                                                    <input type="checkbox" id='Sony' className='opacity-0 peer' />
                                                    <span className='w-full absolute -top-[4px] left-0 mt-1 mr-2 h-full peer-checked:border-primary block rounded scale-0 transition-all peer-checked:scale-100'>
                                                        <span className='w-[10px] h-[6px] mb-[9px] ml-[2px] border-l-2 border-b-2 border-primary inline-block -rotate-45'></span>
                                                    </span>
                                                </span>
                                                <span className='ml-1'>Sony</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-3'>
                            <div>
                                <div className='shop-header '>
                                    <div className='text-lg font-semibold text-text-color'><span className='text-primary'>Samsung  </span> <span className='text-sm'> - ({filterProducts}) Products</span> </div>
                                    <div className="relative">
                                        
                                        <div className={` flex gap-4 `}>
                                            <div className='flex gap-1 items-center'>
                                                <span className='text-sm'>Show</span>
                                                <div className='relative w-[80px]'>
                                                    <span onClick={handleShowItem} className='px-5 text-center py-[5px] cursor-pointer border inline-bolck border-gray-200 inline-block w-full'>{perViews}</span>
                                                    <ul className={`absolute left-0 transition-all  bg-white shadow w-full  overflow-hidden ${showItem ? 'top-full h-[140px]' : 'top-full h-0'}`}>
                                                        <li onClick={() => handlePerViews(10)} className='custom-select-box'><span className='text-sm block text-center'>10</span></li>
                                                        <li onClick={() => handlePerViews(20)} className='custom-select-box'><span className='text-sm block text-center'>20</span></li>
                                                        <li onClick={() => handlePerViews(50)} className='custom-select-box'><span className='text-sm block text-center'>50</span></li>
                                                        <li onClick={() => handlePerViews(80)} className='custom-select-box'><span className='text-sm block text-center'>80</span></li>
                                                        <li onClick={() => handlePerViews(100)} className='custom-select-box'><span className='text-sm block text-center'>100</span></li>
                                                    </ul>
                                                </div>
                                                <span className='text-sm'>items</span>
                                            </div>
                                            <div className='relative min-w-[160px]'>
                                                <span onClick={handleSelectMenu} className='px-5 py-[5px] cursor-pointer border border-gray-200 inline-block w-full'>{selectValues}</span>
                                                <ul className={`customFilters ${selectBox ? 'top-full h-[160px]' : 'top-full h-0'}`}>
                                                    <li onClick={() => handleFeatures('Price top to low')} className='custom-select-box'><span>Price top to low</span></li>
                                                    <li onClick={() => handleFeatures('Price low to top')} className='custom-select-box'><span>Price low to top</span></li>
                                                    <li onClick={() => handleFeatures('Latest')} className='custom-select-box'><span>Latest</span></li>
                                                    <li onClick={() => handleFeatures('a-z')} className='custom-select-box'><span>a to z</span></li>
                                                    <li onClick={() => handleFeatures('z-a')} className='custom-select-box'><span>z to a</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='shopGrid'>
                                {
                                    products?.slice(0, filterProducts)?.map(product => <ProductCard key={product?._id} product={product} /> )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>   
        </>
    );
};

export default Shops;