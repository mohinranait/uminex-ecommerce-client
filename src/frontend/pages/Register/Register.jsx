
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';


const Register = () => {
    const {createUser,userProfileUpdate} = useAuth();
    const { register, handleSubmit,  formState: { errors } } = useForm()
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    
    const handleRegister = async (data) => {

        const name = data.name;
        const email = data.email;
        // const photo = data.photo;
        const password = data.password;
        // console.log(name, email, password);
        // Name validation
        if( name.length == 0){
            toast.error("Name filed is require");
            return ;
        }

        
        // Email validation
        if( email.length == 0){
            toast.error("Email filed is require");
            return ;
        }

        // password validation
        // const spacialCharecter = /[\W_]/g;
        // const capitalLetter = /[A-Z]/;
        // if(password.length < 6) {
        //     toast.error("Password is less than 6 characters");
        //     return ;
        // } else if( !spacialCharecter.test(password) ){
        //     toast.error("Don't have a special character");
        //     return ;
        // } else if(!capitalLetter.test(password)) {
        //     toast.error("don't have a capital letter");
        //     return ;
        // }

        try {
            const user = await createUser(email, password);
            if( user.user ){
                await userProfileUpdate( name);
                const newUser = {name ,email}
                try {
                    const {data} = await axiosPublic.post(`/api/v1/users`, {newUser})
                    console.log(data);
                    
                } catch (error) {
                    toast.error(error.message);
                }
            }
            toast.success("Register Successfull")
            navigate('/');
        } catch (error) {
        
            if( error.message == 'Firebase: Error (auth/email-already-in-use).'){
                toast.error("This email already exists");
                return
            }else{
                toast.error(error.message);
                return
            }
        }

    }

    const passwordValidation = {
        required:"Password is required", 
        maxLength: {
            value: 8,
            message: "Maximum charecter 8"
        },
        minLength: {
            value: 4,
            message: "Minimum charecter is 4"
        }
    }

    const emailValidation = {
        required : "Email fild is Required",
        minLength: {
            value: 5,
            message: "Email charecter length must bee 5 charecter"
        },
        maxLength: {
            value : 20,
            message : "Email charecter limit is 20"
        },
        pattern: {
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message : "Invalid email address"
        }
    }

    return (
        <section className=''>
             <Helmet>
                <title>Register | Store mi ecommerce app</title>
            </Helmet>
            <div className=' min-h-screen py-28' >
                <div className="container flex items-start">
                    <div className=" w-[300px] md:w-[450px] overflow-hidden bg-white mx-auto rounded-lg">
                        
                            <div className='px-5 py-5 md:px-10 md:pb-10 rounded-b-lg  '>
                                <div className='text-3xl pb-5 font-semibold text-gray-600'>Register Form</div>
                                <div>
                                    <form onSubmit={handleSubmit(handleRegister)}>
                                        <div className='mb-4'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-300'>Full Name</label>
                                            <input type="text" name='name' {...register("name", {required:"Name is required"})} placeholder='Full Name' className='px-3 w-full py-3 border border-gray-200 text-gray-600 rounded-md outline-none' />
                                            {errors.name && <p className='text-sm text-red-600 font-normal'>{errors.name.message}</p>}
                                        </div>
                                        {/* <div className='mb-4'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-300'>Image URL</label>
                                            <input type="text" name='photo' placeholder='Image URL' className='px-3 w-full py-3 border border-gray-200 text-gray-600 rounded-md outline-none' />
                                        </div> */}
                                        <div className='mb-4'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-300'>Email</label>
                                            <input type="email" name='email' {...register("email", emailValidation )} placeholder='Email' className='px-3 w-full py-3 border border-gray-200 text-gray-600 rounded-md outline-none' />
                                            {errors.email && <p className='text-sm text-red-600 font-normal'>{errors.email.message}</p>}
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-300'>Password</label>
                                            <input type="password" name='password' {...register("password", passwordValidation)} placeholder='Password' className='px-3 w-full py-3 border border-gray-200 text-gray-600 rounded-md outline-none' />
                                            {errors.password && <p className='text-sm text-red-600 font-normal'>{errors.password.message}</p>}
                                        </div>
                                        <div className='mb-4 flex gap-5'>
                                            <button type='submit' className='px-5 py-3 rounded-md bg-primary text-gray-200 font-medium w-full'>Sign Up</button>
                                           {/* <EmailLogin /> */}
                                        </div>
                                    </form>
                                </div>
                                <p className='text-center text-gray-600'>Already have a  account ? <Link to={'/login'} className='text-primary'>Sign In</Link> </p>
                                
                            </div>
                    
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default Register;