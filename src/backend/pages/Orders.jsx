import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import OrdersRows from "../components/TableRows/OrdersRows";
import { IoAddOutline } from "react-icons/io5";

const Orders = () => {
    const axios = useAxios();

    const {data:orders} = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const {data} = await axios.get(`/get-all-orders?request=admin`);
            console.log(data.orders);
            return data.orders
        }
    })

    return (
        <>
          <div className="bg-white px-5 py-5">
                <div className="flex justify-between items-center gap-5 mb-5">
                    <div className="flex items-center  gap-5">
                        <div className="flex items-center gap-1">
                            Show 
                            <select name="" className="py-2 border rounded w-[60px] text-sm px-1 outline-blue-500" id="">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            items
                        </div>
                        <div>
                            <select name="" className="py-2 border rounded w-full lg:w-[300px] text-sm px-3 outline-blue-500" id="">
                                <option value="">Status</option>
                                <option value="true">Public</option>
                                <option value="false">Unpublic</option>
                            </select>
                        </div>
                        <div>
                            <input type="search" className="py-2 border rounded w-full lg:w-[300px] text-sm px-3 outline-blue-500" placeholder="Search by name" />
                        </div>
                    </div>
                    <Link to={'/admin/new-product'} className="flex gap-1 items-center py-2 px-3 bg-primary text-white rounded text-sm"><IoAddOutline />Add Product</Link>
                </div>
                <hr />
                <div className="overflow-x-auto min-h-[300px]">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="text-left text-gray-600 py-3">ID</th>
                                <th className="text-left text-gray-600 py-3">Customer</th>
                                <th className="text-left text-gray-600 py-3">Price</th>
                                <th className="text-left text-gray-600 py-3">Total Items</th>

                                <th className="text-left text-gray-600 py-3">Status</th>
                                <th className="text-left text-gray-600 py-3">Payment</th>
                                <th className="text-left text-gray-600 py-3">Date</th>
                                <th className=" text-gray-600 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.map((order,index) => <OrdersRows key={order?._id} index={index} order={order} /> )
                            }
                            
                        </tbody>
                    </table>

                
                </div>
            </div>   
        </>
    );
};

export default Orders;