/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";


const ProductRows = ({product,index}) => {
    const {name,slug,price,status,brand,category,skuCode,media,_id} = product || {};
    return (
        <>
            <tr>
                <td className="text-gray-400 py-2">{index+1}</td>
                <td className="text-gray-400 py-2">
                    <div className="flex gap-2 ">
                        <img src={media?.images[0]} className="w-10" alt="" />
                        <div>
                            <p className="text-gray-700">{name}</p>
                            <p className="text-xs text-gray-400">{slug}</p>
                        </div>
                    </div>
                </td>
               
                <td className="text-gray-400 py-2">
                    <p className="text-gray-700">Sell: ${price?.sellingPrice}</p>
                    <p className="text-gray-500 text-sm">Price: ${price?.productPrice}</p>
                </td>
                <td className="text-gray-400 py-2">
                    <p className="text-gray-700">{brand?.name}</p>
                </td>
                <td className="text-gray-400 py-2">
                    <p className="text-gray-700">{category?.name}</p>
                </td>
                <td className="text-gray-400 py-2">
                    <p className="text-gray-700">#{skuCode}</p>
                </td>
               
                <td className="text-gray-400 py-2">
                    {
                        status === 'active' ?  <p className="text-gray-700">Active</p> 
                        :  <p className="text-gray-700">Pending</p>
                    }
                   
                </td>
               
               
                <td className="text-gray-400 py-2 w-[200px]">
                    <div className="flex justify-end gap-3">
                        <Link to={`/admin/update-product/${_id}`} className="px-3 py-1 inline-block bg-green-50 text-green-700">Edit</Link>
                        <button className="px-3 py-1 inline-block bg-red-50 text-red-700">Delete</button>
                    </div>
                </td>
            </tr>   
        </>
    );
};

export default ProductRows;