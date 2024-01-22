import { charecterLimit } from "../../../services/charecterLimit";


const OrderHistoryRow = ({data}) => {
    return (
        <>
            <div className="overflow-x-auto mt-10 mb-8">
                <table className="w-full min-w-[600px] border-collapse">
                    <thead>
                        <tr>
                            <th className="text-left font-medium text-gray-700 text-sm lg:text-base pl-4 py-3">Products</th>
                            <th className="text-left font-medium text-gray-700 text-sm lg:text-base py-3">Unique Code</th>
                            <th className="text-left font-medium text-gray-700 text-sm lg:text-base py-3">Product Price</th>
                            <th className="text-left font-medium text-gray-700 text-sm lg:text-base py-3">Quantity</th>
                            <th className="text-left font-medium text-gray-700 text-sm lg:text-base py-3">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item,index) =>  <tr key={index} className=''>
                            
                        
                                <td className="text-gray-400 py-2">
                                    <div className='flex gap-3 items-center'>
                                        <span className="h-20 w-20 border border-gray-100 rounded inline-block">
                                            <img src={ item?.product?.media?.images[0]} className='w-20 rounded-full' alt="" />
                                        </span>
                                        <div>
                                            <p className='text-sm text-gray-700 font-medium'>{ charecterLimit(item?.product?.name, 20, true) }</p>
                                            {
                                                item?.varient?.map((d,i) =>  <p key={i} className='text-xs'>{d?.label}: {d?.value}</p> )
                                            }
                                        </div>
                                    </div>
                                </td>
                                <td className="text-gray-400 py-2">
                                    <p className="text-gray-700 text-sm">SKU: {item?.product?.skuCode} </p>
                                </td>
                                <td className="text-gray-400 py-2">
                                    <p className="text-gray-700 text-sm">${item?.price} </p>
                                </td>
                                <td className="text-gray-400 py-2">
                                    <p className="text-gray-700 text-sm">{item?.quantity} items </p>
                                </td>
                                
                                <td className="text-gray-400 py-2">
                                    <p className="text-gray-700 text-sm">${item?.quantity * item?.price} </p>
                                </td>
                                
                            </tr>     )
                            
                        }
                    </tbody>
                </table>
            </div>   
        </>
    );
};

export default OrderHistoryRow;