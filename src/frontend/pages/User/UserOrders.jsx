
const UserOrders = () => {
    return (
        <>
            <div>
                <p className="mb-1 text-gray-700 text-lg font-semibold">Orders</p>
                <table className="border-collapse w-full border">
                    <thead>
                        <tr>
                            <th className="py-2 text-left px-5 border-b border-r text-gray-600">SI</th>
                            <th className="py-2 text-left px-5 border-b border-r text-gray-600">Date</th>
                            <th className="py-2 text-left px-5 border-b border-r text-gray-600">Price</th>
                            <th className="py-2 text-left px-5 border-b border-r text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="py-2 text-left px-5 border-b border-r text-gray-600">1</th>
                            <td className="py-2 text-left px-5 border-b border-r text-gray-600">12/05/2023</td>
                            <td className="py-2 text-left px-5 border-b border-r text-gray-600">500 BDT</td>
                            <td className="py-2 text-left px-5 border-b border-r text-gray-600"><span className="text-green-600 bg-green-100 inline-block text-xs font-semibold rounded py-[2px] px-2">Success</span></td>
                        </tr>
                        <tr>
                            <th className="py-2 text-left px-5 border-b border-r text-gray-600">2</th>
                            <td className="py-2 text-left px-5 border-b border-r text-gray-600">10/05/2022</td>
                            <td className="py-2 text-left px-5 border-b border-r text-gray-600">1000 BDT</td>
                            <td className="py-2 text-left px-5 border-b border-r text-gray-600"><span className="text-red-600 bg-red-100 inline-block text-xs font-semibold rounded py-[2px] px-2">Pending</span></td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>   
        </>
    );
};

export default UserOrders;