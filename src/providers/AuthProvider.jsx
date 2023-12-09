/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useState } from "react";
import auth from "../services/firebase";
import { createContext } from "react";
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";


export const AuthContext = createContext({});

const AuthProvider = ({children}) => {
    const axios = useAxios();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    // Create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // LogOut user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // login user
    const userProfileUpdate = (name, image) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName : name,
            photoURL: image,
        });
    }

    useEffect(() => {
        const onSubscribe = onAuthStateChanged(auth , async currentUser => {
            
            const email = currentUser?.email;
            if(email){
                
                // Create JWT 
                await axios.post('/jwt', {email});

                // Find a new user / admin
                const getUser = await axios.get(`/user/${email}`);

                if(getUser.data.success){
                    setUser(getUser.data.user);
                    setLoading(false)
                    console.log('Login');
                }else{
                    // Logout user
                    await axios.post('/logout-user', {email});
                }
             
            }else{
                await axios.post('/logout-user', {email});
                console.log('Logout');
            }
            setLoading(false)
        })
        return () => onSubscribe()
    },[axios])


    const userInfo = {
        user, 
        createUser,
        loginUser,
        userProfileUpdate,
        loading,
        logOut
    }


    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;