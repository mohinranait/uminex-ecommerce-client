import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../frontend/Layout/MainLayout';
import Home from '../frontend/pages/Home/Home';
import Login from '../frontend/pages/Login/Login';
import Register from '../frontend/pages/Register/Register';
import Products from '../frontend/pages/Products/Products';
import Shops from '../frontend/pages/Shops/Shops';
import Carts from '../frontend/pages/Carts/Carts';
import UserDashboard from '../frontend/pages/User/UserDashboard';
import Account from '../frontend/pages/User/Account';
import UserOrders from '../frontend/pages/User/UserOrders';
import UserProfile from '../frontend/pages/User/UserProfile';
import AdminDashboardLayout from '../backend/Layout/AdminDashboardLayout';
import Categorys from '../backend/pages/Categorys';
import PrivateRoutes from './PrivateRoutes';
import AdminRoutes from './AdminRoutes';

const myRoutes = createBrowserRouter([
    {
        path : "/",
        element : <MainLayout />,
        children : [
            { index : true, element : <Home />, loader : async () => await fetch("https://assignment-10-server-theta-ivory.vercel.app/products") },
            { path : "/shops", element : <Shops /> , loader : async () => await fetch("https://assignment-10-server-theta-ivory.vercel.app/products") },
            { path : "/products", element : <Products /> },
            { path : "/carts", element : <Carts /> },
            { path : "/login", element : <Login /> },
            { path : "/register", element : <Register /> },
            {
                path: "/dashboard",
                element : <PrivateRoutes><UserDashboard /></PrivateRoutes> ,
                children : [
                    {
                        index: true,
                        element : <Account />
                    },
                    {
                        path: "orders",
                        element : <UserOrders />
                    },
                    {
                        path: "profile",
                        element : <UserProfile />
                    },
                    {
                        path: "address",
                        element : <div>Address</div>
                    },
                ]
            }
        ]
    },
    {
        path: "/admin",
        element: 
            <PrivateRoutes><AdminRoutes><AdminDashboardLayout /></AdminRoutes></PrivateRoutes>
         ,
        children: [
            {
                index:true,
                element : <div>Dashboard</div>
            },
            {
                path: 'products',
                element : <div>Products</div>
            },
            {
                path: 'categorys',
                element : <Categorys />
            },
        ]
    }
]);

export default myRoutes;