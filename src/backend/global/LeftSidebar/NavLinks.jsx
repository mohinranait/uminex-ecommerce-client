
import {  IoGridOutline, IoHomeOutline } from 'react-icons/io5';
import { TbBrandBinance, TbCategory } from "react-icons/tb";
import { LiaSlidersHSolid } from "react-icons/lia";
import { HiOutlineUsers } from 'react-icons/hi2';
const LeftSidebarLinks = [
    {
        id : 1,
        link : "/admin/dashboard",
        name : "Dashboard",
        icon : <IoHomeOutline className='text-lg' />,
        path : '/admin/dashboard',
    },
    {
        id : 8,
        link : "/admin/orders",
        name : "Orders",
        icon : <IoHomeOutline className='text-lg' />,
        path : '/admin/orders',
    },
    {
        id : 2,
        link : '/admin/products',
        name : "Products",
        icon : <IoGridOutline className='text-lg' />,
        path : '/admin/products',
    },
    {
        id : 3,
        link : "/admin/categorys",
        name : "Category",
        icon : <TbCategory className='text-lg' />,
        path : '/admin/categorys',
    },
    {
        id : 4,
        link : "/admin/brands",
        name : "Brands",
        icon : <TbBrandBinance className='text-lg' />,
        path : '/admin/brands',
    },
    {
        id : 5,
        link : "/admin/sliders",
        name : "Sliders",
        icon : <LiaSlidersHSolid className='text-lg' />,
        path : '/admin/sliders',
    },
    {
        id : 6,
        link : "/admin/colors",
        name : "Colors",
        icon : <LiaSlidersHSolid className='text-lg' />,
        path : '/admin/colors',
    },
    {
        id : 7,
        link : "/admin/users",
        name : "Users",
        icon : <HiOutlineUsers className='text-lg' />,
        path : '/admin/users',
    },
];

export default LeftSidebarLinks;