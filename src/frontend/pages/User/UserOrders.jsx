import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useOrders from "../../../hooks/useOrders";
import { dateFormater } from "../../../services/DateFormater";

const UserOrders = () => {
    const {user} = useAuth();
    const [orders] = useOrders(`user&userId=${user?._id}&email=${user?.email}`)
    return (
        <>
            <Helmet>
                <title> Order information | Store MI</title>
            </Helmet>
            <div className="overflow-x-auto">
                <p className="mb-1 text-gray-700 text-lg font-semibold">Orders</p>
                <table className="border-collapse min-w-[500px] w-full border">
                    <thead>
                        <tr>
                            <th className="py-2 text-left px-5 border-b border-r text-gray-600">SI</th>
                            <th className="py-2 text-left px-5 border-b border-r text-gray-600">Date</th>
                            <th className="py-2 text-left px-5 border-b border-r text-gray-600">Items</th>
                            <th className="py-2 text-left px-5 border-b border-r text-gray-600">Price</th>
                            <th className="py-2 text-left px-5 border-b border-r text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order,index) =>  <tr key={order?._id}>
                                <th className="py-2 text-left px-5 border-b border-r text-gray-600">{++index}</th>
                                <td className="py-2 text-left px-5 border-b border-r text-gray-600">{dateFormater(order?.createdAt)}</td>
                                <td className="py-2 text-left px-5 border-b border-r text-gray-600">{order?.totalItems} Items</td>
                                <td className="py-2 text-left px-5 border-b border-r text-gray-600">{order?.orderHistory?.reduce((total, current)  => total + current?.totalPrice,0 )} BDT</td>
                                <td className="py-2 text-left px-5 border-b border-r text-gray-600">
                                    {
                                        order?.orderStatus == 'delivery' ?  <span className="text-green-600 bg-green-100 inline-block text-xs font-semibold rounded py-[2px] px-2">Delivery</span> 
                                        : 
                                        order?.orderStatus == 'pending' ?  <span className="text-red-600 bg-red-100 inline-block text-xs font-semibold rounded py-[2px] px-2">Pending</span> 
                                        : 
                                        order?.orderStatus == 'cancel' ?  <span className="text-yellow-600 bg-yellow-100 inline-block text-xs font-semibold rounded py-[2px] px-2">Cancal</span> 
                                        : <span className="text-pink-600 bg-pink-100 inline-block text-xs font-semibold rounded py-[2px] px-2">Processing</span> 
                                    }
                                   
                                </td>
                            </tr>  )
                        }
                       
                     
                    </tbody>
                </table>
            </div>   
        </>
    );
};

export default UserOrders;