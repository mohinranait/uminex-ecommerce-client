/* eslint-disable react/prop-types */
import { IoNotificationsOutline, IoSettingsOutline, IoToggleOutline, IoToggleSharp } from "react-icons/io5";

const DashboardHeader = ({toggleLeft,setToggleLeft}) => {
    return (
        <div className='fixed left-0 w-full top-0 right-0 bg-white z-[100]'>
            <header className='px-3 lg:px-0 bg-white gap-5  shadow-sm'>
                <div className='flex h-[40px] items-center gap-6'>
                    <div className='w-[200px] '>
                        <ul className='flex items-center justify-between '>
                            <li className='hidden lg:block'><span className='text-xl text-gray-800 font-bold pl-3'> <span>Dash</span><span>board</span> </span> </li>
                            <li><span onClick={() => setToggleLeft(!toggleLeft)} className='cursor-pointer text-2xl'>
                                    {
                                        toggleLeft ?   <IoToggleSharp></IoToggleSharp> : <IoToggleOutline />
                                    }
                                </span> 
                            </li>
                        </ul>
                    </div>
                    <div className='w-full'>
                        <ul className='flex justify-end gap-5 items-center pr-3'>
                            <li>
                                <a href="">
                                    <IoNotificationsOutline></IoNotificationsOutline>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <IoSettingsOutline></IoSettingsOutline>
                                </a>
                            </li>
                            <li>
                                <a href="#"> 
                                    <img src="https://laravel.pixelstrap.com/xolo/assets/images/dashboard/user.png" className='w-8 h-8 rounded-full' alt="" />
                                </a>
                            </li>
                        
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default DashboardHeader;