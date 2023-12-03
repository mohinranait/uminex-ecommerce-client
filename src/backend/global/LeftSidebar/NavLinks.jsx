
import { IoGiftOutline, IoGridOutline, IoHomeOutline } from 'react-icons/io5';

const LeftSidebarLinks = [
    {
        id : 1,
        link : "/admin",
        name : "Dashboard",
        icon : <IoHomeOutline className='text-lg' />,
        path : '/admin',
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
    }
];

export default LeftSidebarLinks;