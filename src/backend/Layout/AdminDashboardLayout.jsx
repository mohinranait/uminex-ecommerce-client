import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../global/DashboardHeader';
import LeftSidebar from '../global/LeftSidebar/LeftSidebar';

const AdminDashboardLayout = () => {
    const [toggleLeft, setToggleLeft] = useState(true);
    return (
        <section>
            <DashboardHeader toggleLeft={toggleLeft} setToggleLeft={setToggleLeft}></DashboardHeader>
            <div className='flex gap-5 relative mt-[40px]'>
                <div className={` group bg-white z-[9999] top-[40px] lg:h-[calc(100vh-40px)] hover:w-[200px]  w-[200px] overflow-x-hidden transition-all duration-300 fixed left-0 bottom-0  shadow ${toggleLeft ? ' -translate-x-full bottom-0  lg:w-[200px] lg:translate-x-0 ' : 'translate-x-0  lg:w-[50px]'}`}>
                    <LeftSidebar toggleLeft={toggleLeft} />
                </div>
                <div className={`w-full mr-3 mt-3 ml-3 transition-all duration-300 ${toggleLeft ? 'lg:ml-[220px]' : "lg:ml-[70px]"}  `}>
                    <Outlet />
                </div>
            </div>
        </section>
    );
};

export default AdminDashboardLayout;