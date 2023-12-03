import { NavLink, Outlet } from "react-router-dom";
import { MdAddShoppingCart, MdDashboard, MdOutlineLogout } from "react-icons/md";
import "./UserDashboard.css"
import { GoPerson } from "react-icons/go";

const UserDashboard = () => {
    return (
        <section className="my-6">
            <div className="box">
                <div className="bg-white px-10 py-10 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5 ">
                    <div className="col-span-1 ">
                        <div >
                            <ul className="space-y-2 dashboardActive">
                                <li>
                                    <NavLink to={'/dashboard'} className="py-2 flex items-center gap-2 text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 transition-all px-5 w-full rounded" > <MdDashboard /> Account</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/orders'} className="py-2 flex items-center gap-2 text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 transition-all px-5 w-full rounded" > <MdAddShoppingCart /> Orders</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/profile'} className="py-2 flex items-center gap-2 text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 transition-all px-5 w-full rounded" > <GoPerson /> Profile</NavLink>
                                </li>
                                <li>
                                    <button className="py-2 flex items-center gap-2 text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 transition-all px-5 w-full rounded" > <MdOutlineLogout /> Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className=" sm:col-span-2 md:col-span-3">
                       
                        <Outlet />

                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserDashboard;