import PropTypes from "prop-types"
import { IoChevronDown } from 'react-icons/io5';
import ProductVertical from "../ProductCard/ProductVertical";
import ProductVerticalPlaceholder from "../Loding/ProductVerticalPlaceholder";

const SidebarProduct = ({products,category,dataLoading, titleText}) => {
    return (
        <>
            <div className='bg-white'>
                <div className='flex items-center justify-between border-b px-3 py-3'>
                    <p className='text-xl font-medium py-1 pl-3  relative before:h-full before:w-[3px] before:bg-secondary before:left-0 before:top-0 before:absolute'>{titleText}</p>
                    <span className='h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer'><IoChevronDown /></span>
                </div>
                <ul>
                    {
                        dataLoading &&  [1,2,3,4,5]?.map((item,index) =>  <ProductVerticalPlaceholder key={index} />  )
                    }
                    {
                        products?.map(product =>  <ProductVertical key={product?._id} product={product} category={category} /> )
                    }
                </ul>
            </div>
        </>
    );
};

SidebarProduct.propTypes = {
    products: PropTypes.array,
    category: PropTypes.object,
    titleText: PropTypes.string,
    dataLoading: PropTypes.bool
}

export default SidebarProduct;