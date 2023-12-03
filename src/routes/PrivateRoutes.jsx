/* eslint-disable react/prop-types */

import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation();

    
    if( loading ){
        return <div>
            <p className='text-center pt-16 text-red-600 font-bold '>Loading...</p>
        </div>
    }

    if(user?.email){
        return children 
    }

    return <Navigate to={'/login'} state={location?.pathname} replace={true} />
};

export default PrivateRoutes;