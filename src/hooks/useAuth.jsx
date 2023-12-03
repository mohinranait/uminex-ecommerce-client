import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useAuth = () => {
    const userInformation = useContext(AuthContext);
    return userInformation
};

export default useAuth;