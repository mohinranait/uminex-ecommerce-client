/* eslint-disable react/prop-types */

import { NavLink } from 'react-router-dom';
import LeftSidebarLinks from './NavLinks';

const LeftSidebar = ({toggleLeft}) => {
    return (
        <div className=''>
            <ul className='leftMenus'>
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
        </div>
    );
};

export default LeftSidebar;