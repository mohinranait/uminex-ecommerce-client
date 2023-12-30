/* eslint-disable react/prop-types */

import LoaderOne from '../components/Loader/LoaderOne';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation();

    console.log(loading);
    if( loading ){
        return <LoaderOne />
    }

    if(user?.email){
        return children 
    }

    return <Navigate to={'/login'} state={location?.pathname} replace={true} />
};

export default PrivateRoutes;