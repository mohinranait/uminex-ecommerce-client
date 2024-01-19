import { Link, useLocation, useNavigate } from 'react-router-dom';

import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import Lottie from "lottie-react"
import loginLottie from "../../../assets/lottie/login.json"

const Login = () => {
    const {loginUser} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if(email.length == 0){
            return toast.error("Email is required");
        }
        if(password.length == 0){
            return toast.error("Password is required");
        }

        try {
            const response = await loginUser(email, password);
            if(response?.user){
                toast.success("Login Successfull");
                navigate( location?.state ? location?.state : '/' )
            }else{
                console.log("user login hota paray nay");
            }
           
        } catch (error) {
            if( error.message == 'Firebase: Error (auth/invalid-login-credentials).' ){
                toast.error("Email and password don't match");
            }else{
                toast.error(error.message)
            }
        }
    }


    return (
        <section className=''>
            <Helmet>
                <title>Login | Store mi ecommerce app</title>
            </Helmet>
            <div className=' min-h-screen py-16 flex items-center justify-between' >
                <div className="container grid md:grid-cols-2 px-5 lg:px-0 items-start">
                    <div className='flex items-center justify-center'>
                        <Lottie animationData={loginLottie} className='lg:w-[400px]' />
                    </div>
                    <div className="lg:w-[450px] overflow-hidden bg-white  rounded-lg">
                        
                            <div className='px-5 py-5 md:px-10 md:pb-10 rounded-b-lg bg-white '>
                                <div className='text-3xl pb-5 font-semibold text-gray-500'>Login Form</div>
                                <div>
                                    <form onSubmit={handleLogin}>
                                        <div className='mb-4'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-300'>Email</label>
                                            <input type="email" name='email' placeholder='Email' className='px-3 w-full py-3  border border-gray-200 text-gray-600 rounded-md outline-none' />
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-300'>Password</label>
                                            <input type="password" name='password' placeholder='Password' className='px-3 w-full py-3  border border-gray-200 text-gray-600 rounded-md outline-none' />
                                        </div>
                                        <div className='mb-4 flex gap-5'>
                                            <button type='submit' className='px-5 py-3 rounded-md bg-primary text-gray-200 font-medium w-full'>Sign In</button>
                                          {/* <EmailLogin /> */}
                                        </div>
                                    </form>
                                </div>
                                <p className='text-center text-gray-600'>Create a new account ? <Link to={'/register'} className='text-primary'>Register</Link> </p>
                                
                            </div>
                    
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default Login;