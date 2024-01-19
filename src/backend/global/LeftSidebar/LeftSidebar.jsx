/* eslint-disable react/prop-types */

import { Link, NavLink } from 'react-router-dom';
import LeftSidebarLinks from './NavLinks';
import { CiHome } from "react-icons/ci";
import { GoSignOut } from 'react-icons/go';
import useAuth from '../../../hooks/useAuth';

const LeftSidebar = ({toggleLeft}) => {
    const {logOut} = useAuth();
    return (
        <div className='h-full flex flex-col'>
            <ul className='leftMenus '>
                {
                    LeftSidebarLinks?.map(link =>   <li key={link.id}>
                        <NavLink to={`${link?.link}`} className={({ isActive, isPending }) =>
                    isActive
                        ? " bg-slate-100 text-primary gap-2 py-2 flex pl-4 items-center"
                        : isPending
                        ? " hover:bg-slate-100 text-gray-500 flex pl-4 "
                        : "py-2 font-medium hover:bg-slate-100 flex items-center text-gray-500 gap-2  pl-4"
                    } > {link?.icon} <span className={` group-hover:block ${toggleLeft ? "block" : "lg:hidden"}`}>{link?.name}</span> </NavLink>
                    </li> )
                }

               
            </ul>
                <div className='flex-grow'></div>
            <ul className='my-3'>
                <li className='mt-auto'>
                        <Link to={`/`} className={`hover:bg-slate-100 hover:text-primary gap-2 py-2 flex pl-4 items-center`
                    } ><CiHome /> <span className={` group-hover:block ${toggleLeft ? "block" : "lg:hidden"}`}>Home</span> </Link>
                </li>
                <li className='mt-auto' onClick={() => logOut()}>
                        <button className={`hover:bg-slate-100 hover:text-primary gap-2 py-2 w-full flex pl-4 items-center`
                    } ><GoSignOut /> <span className={` group-hover:block ${toggleLeft ? "block" : "lg:hidden"}`}>Logout</span> </button>
                </li>
            </ul>
        </div>
    );
};

export default LeftSidebar;