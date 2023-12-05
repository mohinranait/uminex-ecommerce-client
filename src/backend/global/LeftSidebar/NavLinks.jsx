
import { IoGiftOutline, IoGridOutline, IoHomeOutline } from 'react-icons/io5';

const LeftSidebarLinks = [
    {
        id : 1,
        link : "/admin/dashboard",
        name : "Dashboard",
        icon : <IoHomeOutline className='text-lg' />,
        path : '/admin/dashboard',
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
        icon : <IoGiftOutline className='text-lg' />,
        path : '/admin/categorys',
    },
    {
        id : 4,
        link : "/admin/sliders",
        name : "Sliders",
        icon : <IoGiftOutline className='text-lg' />,
        path : '/admin/sliders',
    },
];

export default LeftSidebarLinks;