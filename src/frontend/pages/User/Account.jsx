
import SummeryCard from '../../components/User/SummeryCard';

const Account = () => {
    return (
        <>
            <div>
                <p className="mb-5">Welcome <span className="font-semibold">Mohin Rana</span> </p>
                <div className="grid grid-cols-3 gap-2 md:gap-5 mb-6">
                    <SummeryCard name="Orders" value={2} />
                    <SummeryCard name="Cart" value={4} />
                    <SummeryCard name="Wishlists" value={3} />
                </div>
                <div>
                    <p className="mb-1 text-gray-700 text-lg font-semibold">Account Details</p>
                    <table className="border-collapse w-full border">
                        <tbody>
                            <tr>
                                <th className="py-2 text-left px-5 border-b border-r text-gray-600">Name</th>
                                <td className="py-2 text-left px-5 border-b border-r text-gray-600">Mohin Rana</td>
                            </tr>
                            <tr>
                                <th className="py-2 text-left px-5 border-b border-r text-gray-600">Email</th>
                                <td className="py-2 text-left px-5 border-b border-r text-gray-600">mohin@gmail.com</td>
                            </tr>
                            <tr>
                                <th className="py-2 text-left px-5 border-b border-r text-gray-600">Phone</th>
                                <td className="py-2 text-left px-5 border-b border-r text-gray-600">0124574554</td>
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