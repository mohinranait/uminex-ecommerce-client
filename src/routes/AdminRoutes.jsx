/* eslint-disable react/prop-types */

import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoutes = ({children}) => {
    const {user,loading} = useAuth();

    if( loading ){
        return <div>Admin Loading...</div>
    }

    if( user?.role === 'admin' ){
        return children
    }

    return <Navigate to={'/'} />
};

export default AdminRoutes;