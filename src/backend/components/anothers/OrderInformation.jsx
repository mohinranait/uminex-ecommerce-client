
const OrderInformation = ({user, address, order}) => {
    return (
        <>
            <div className='grid lg:grid-cols-3 gap-5'>
                <div className='border border-gray-100 rounded p-5 py-4 bg-white space-y-1'>
                    <p className="text-gray text-base font-bold text-gray-600 mb-2">User Information</p>
                    <p className='text-sm text-gray-600'>{user?.name}</p>
                    <p className='text-sm text-gray-600'>{user?.email}</p>
                    <p className='text-sm text-gray-600'>{user?.mobile}</p>
                </div>
                <div className='border border-gray-100 rounded p-5 py-4 bg-white space-y-1'>
                    <p className="text-gray text-base font-bold text-gray-600 mb-2">Order Information</p>
                    <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>Price</span> : ${order?.orderHistory?.reduce((total, current) => total + current?.totalPrice,0) - order?.totalDiscount}</p>
                    <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>Method</span> : {order?.paymentMethod}</p>
                    {/* <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>TransID</span> : askdfjas5a4s5f5a</p> */}
                    <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>Payment</span> : {order?.paymentStatus}</p>
                    <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>Order Status</span> : 
                        {
                            order?.orderStatus === 'proccessing' ? 
                            <span className='text-xs px-2 py-1 leading-[9px] bg-purple-50 text-purple-600'>Proccessing</span>
                            : order?.orderStatus === 'shift'? 
                            <span className='text-xs px-2 py-1 leading-[9px] bg-purple-50 text-purple-600'>Shift</span>
                            : order?.orderStatus === 'return'? 
                            <span className='text-xs px-2 py-1 leading-[9px] bg-yellow-50 text-yellow-600'>Return</span>
                            : order?.orderStatus === 'pending' ? 
                            <span className='text-xs px-2 py-1 leading-[9px] bg-red-50 text-red-600'>Pending</span>
                            : order?.orderStatus === 'delivery' ? 
                            <span className='text-xs px-2 py-1 leading-[9px] bg-green-50 text-green-600'>Delivery</span>
                            : order?.orderStatus === 'cancel' ? 
                            <span className='text-xs px-2 py-1 leading-[9px] bg-pink-50 text-pink-600'>Cancel</span>
                            :  ''
                        }
                        
                    </p>
                </div>
                <div className='border border-gray-100 rounded p-5 py-4 bg-white space-y-2'>
                    <p className="text-gray text-base font-bold text-gray-600 mb-2">Delivery Address</p>
                    <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>Address</span> : <span className='text-pink-600 font-medium'>{address?.address} <br /> {address?.policeStation} Police Station, {address?.district} , {address?.division}</span></p>
                    <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>Delivery</span> : <span className="capitalize py-1 px-3 bg-violet-800 text-white rounded text-xs ">{address?.deliveryLocation}</span></p>
                    <p className='text-sm text-gray-600'> <span className='w-[100px] inline-block'>Phone</span> : {address?.mobile}</p>
                </div>
            </div>   
        </>
    );
};

export default OrderInformation;