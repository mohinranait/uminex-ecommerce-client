
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import SummeryCard from '../../components/User/SummeryCard';
import useAxios from '../../../hooks/useAxios';

const Account = () => {
    const axios = useAxios();
    const {user} = useAuth();
    const {data:userDashboardAnalitycs} = useQuery({
        queryKey: ['userAnalitycs'],
        queryFn : async () => {
            const {data} = await axios.get(`/user-dashboard-analitycs?userId=${user?._id}`);
            return data;
        }
    })
    console.log(userDashboardAnalitycs);
    return (
        <>
            <div>
                <p className="mb-5">Welcome <span className="font-semibold">{user?.name}</span> </p>
                <div className="grid grid-cols-3 gap-2 md:gap-5 mb-6">
                    <SummeryCard name="Orders" value={userDashboardAnalitycs?.totalOrders} />
                    <SummeryCard name="Cart" value={userDashboardAnalitycs?.totalCarts} />
                    <SummeryCard name="Wishlists" value={3} />
                </div>
                <div>
                    <p className="mb-1 text-gray-700 text-lg font-semibold">Account Details</p>
                    <table className="border-collapse w-full border">
                        <tbody>
                            <tr>
                                <th className="py-2 text-left px-5 border-b border-r text-gray-600">Name</th>
                                <td className="py-2 text-left px-5 border-b border-r text-gray-600">{user?.name}</td>
                            </tr>
                            <tr>
                                <th className="py-2 text-left px-5 border-b border-r text-gray-600">Email</th>
                                <td className="py-2 text-left px-5 border-b border-r text-gray-600">{user?.email}</td>
                            </tr>
                            <tr>
                                <th className="py-2 text-left px-5 border-b border-r text-gray-600">Phone</th>
                                <td className="py-2 text-left px-5 border-b border-r text-gray-600">{user?.mobile? user?.mobile : '-/-'}</td>
                            </tr>
                            <tr>
                                <th className="py-2 text-left px-5 border-b border-r text-gray-600">City</th>
                                <td className="py-2 text-left px-5 border-b border-r text-gray-600">US State</td>
                            </tr>
                            <tr>
                                <th className="py-2 text-left px-5 border-b border-r text-gray-600">Zip</th>
                                <td className="py-2 text-left px-5 border-b border-r text-gray-600">5412</td>
                            </tr>
                            <tr>
                                <th className="py-2 text-left px-5 border-b border-r text-gray-600">Address</th>
                                <td className="py-2 text-left px-5 border-b border-r text-gray-600">Sd d bolck, forman mainue, Global</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Account;