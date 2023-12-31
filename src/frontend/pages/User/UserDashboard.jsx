import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdAddShoppingCart, MdDashboard, MdOutlineLogout } from "react-icons/md";
import "./UserDashboard.css"
import { GoPerson } from "react-icons/go";
import useAuth from "../../../hooks/useAuth";
import { IoIosHeartEmpty } from "react-icons/io";

const UserDashboard = () => {
    const navigate = useNavigate();
    const {logOut} = useAuth();
    // User Logout
    const handleLogout = async () => {
        await logOut();
        navigate('/')
    }
    return (
        <section className="my-6">
            <div className="box">
                <div className="usermenuWrap ">
                    <div className="col-span-1 ">
                        <div >
                            <ul className="space-y-2 dashboardActive">
                                <li>
                                    <NavLink to={'/user/dashboard'} className="userDashboardMenu" > <MdDashboard /> Account</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/user/orders'} className="userDashboardMenu" > <MdAddShoppingCart /> Orders</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/user/profile'} className="userDashboardMenu" > <GoPerson /> Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/user/wishlists'} className="userDashboardMenu" > <IoIosHeartEmpty /> Wishlists</NavLink>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="py-2 flex items-center gap-2 text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 transition-all px-5 w-full rounded" > <MdOutlineLogout /> Logout</button>
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