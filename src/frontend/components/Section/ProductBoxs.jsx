
import { useState } from 'react';
import useProducts from '../../../hooks/useProducts';
import ProductVertical from '../ProductCard/ProductVertical';
import ProductVerticalPlaceholder from '../Loding/ProductVerticalPlaceholder';


const ProductBoxs = () => {

    const [getProductRequest1, setGetProductRequest1] = useState({
        limit : 4,
        sort: "desc",
        sortFiled:'rating',
        page : 1,
    })
    const [products1, , isPending1] = useProducts(getProductRequest1) || [];
    const { products: getProducts1 } = products1 || [];



    const [getProductRequest2, setGetProductRequest2] = useState({
        limit : 4,
        sort: "desc",
        sortFiled:'createdAt',
        request : 'isFeature',
        page : 1,
    })
    const [products2, , isPending2] = useProducts(getProductRequest2) || [];
    const { products: getProducts2 } = products2 || [];



    const [getProductRequest3, setGetProductRequest3] = useState({
        sortFiled:'sellQuantity',
        limit : 5,
        sort: "desc",
        page : 1,
    })
    const [products3, , isPending3] = useProducts(getProductRequest3) || [];
    const { products: getProducts3 } = products3 || [];


    const boxs = [
        {
            _id: 1,
            title: 'Top Ratings',
            products : getProducts1,
            loading: isPending1
        },
        {
            _id: 2,
            title: 'Top Selling',
            products : getProducts3?.slice(0,4),
            loading: isPending3
        },
        {
            _id: 3,
            title: 'Feature',
            products :  getProducts2,
            loading: isPending2
        },
    ]

    return (
        <section className='py-7 bg-[#dcdcdc1a]'>
            <div className="box relative">
                <div className="grid lg:grid-cols-3 gap-5">
                    
                    {
                        boxs?.map(box => <ul key={box?._id} className="py-2 bg-white ">
                            <p className='px-4 text-lg font-bold text-gray-600 pb-2 pt-1'>{box?.title}</p>
                            <hr />  
                        {
                            box?.loading &&  [1,2,3,4]?.map((item,index) =>  <ProductVerticalPlaceholder key={index} />  )
                        }

                        {
                            box?.products?.map(product =>  <ProductVertical key={product?._id} product={product} category={product?.category} /> )
                        } 
                        
                    </ul> )
                    }
                   
                </div>
            </div>
        </section>
    );
};

export default ProductBoxs;