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
import Sliders from '../backend/pages/Sliders';
import Brands from '../backend/pages/Brands';
import Users from '../backend/pages/Users';
import ProductCreate from '../backend/pages/ProductCreate';
import AllProducts from '../backend/pages/AllProducts';
import EditProduct from '../backend/pages/EditProduct';
import Colors from '../backend/pages/Colors';
import Checkout from '../frontend/pages/Checkout/Checkout';
import Orders from '../backend/pages/Orders';
import PaymentSuccess from '../frontend/pages/PaymentSuccess/PaymentSuccess';
import Wishlists from '../frontend/pages/User/Wishlists';
import LiveChatFromAdmin from '../backend/pages/LiveChatFromAdmin';

const myRoutes = createBrowserRouter([
    {
        path : "/",
        element : <MainLayout />,
        children : [
            { index : true, element : <Home /> },
            { path : "/category/:slug", element : <Shops /> },
            { path : "/:slug/:slug", element : <Products /> },
            { path : "/carts", element : <Carts /> },
            { path : "/checkout", element : <Checkout /> },
            { path : "/success", element : <PaymentSuccess /> },
            { path : "/login", element : <Login /> },
            { path : "/register", element : <Register /> },
            {
                path: "/user",
                element : <PrivateRoutes><UserDashboard /></PrivateRoutes> ,
                children : [
                    {
                        path: 'dashboard',
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
                        path: "wishlists",
                        element : <Wishlists />
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
                path: 'dashboard',
                element : <div>Dashboard</div>
            },
            {
                path: 'orders',
                element : <Orders />
            },
            {
                path: 'products',
                element : <AllProducts />
            },
            {
                path: 'new-product',
                element : <ProductCreate />
            },
            // {
            //     path: 'live-chat',
            //     element : <LiveChatFromAdmin />
            // },
            {
                path: 'update-product/:id',
                element : <EditProduct />,
                loader : async ({params}) => await fetch(`${import.meta.env.VITE_DEVELOPMENT_ENV}/products/${params?.id}`)
            },
            {
                path: 'categorys',
                element : <Categorys />
            },
            {
                path: 'brands',
                element : <Brands />
            },
            {
                path: 'users',
                element : <Users />
            },
            {
                path: 'colors',
                element : <Colors />
            },
            {
                path: 'sliders',
                element : <Sliders />
            },
        ]
    }
]);

export default myRoutes;