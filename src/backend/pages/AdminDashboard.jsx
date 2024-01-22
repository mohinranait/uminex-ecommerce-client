import { IoBagHandleOutline, IoCartOutline, IoCellularOutline, IoHome, IoTrendingDownOutline, IoTrendingUp } from 'react-icons/io5';
import AreaChartCom from '../components/dashboard/AreaChartCom';
import PiChartCompo from '../components/dashboard/PiChartCompo';
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';

const AdminDashboard = () => {
    const axios = useAxios();
    const [analytics, setAnalytics] = useState({})
    useEffect(() => {
        const getTotals = async () => {
            const res = await axios.get(`/admin-analytics`);
            console.log(res.data);
            setAnalytics(res.data);
        };
        getTotals();
    },[])
    return (
        <div>
            <div className=' grid lg:grid-cols-2 justify-between items-center mb-3 py-2'>
                <div>
                    <h1 className='text-lg font-semibold text-gray-700'>Dashboard</h1>
                    <p className='text-sm tracking-widest text-gray-600 font-normal'>Admin Panel</p>
                </div>
                <div className='hidden lg:flex justify-end'>
                    <ul className='flex items-center gap-2'>
                        <li><a href="#" className='font-semibold text-xs text-primary flex items-center gap-1'><IoHome></IoHome> Dashboard</a></li>
                        <li><a href="#" className='font-semibold text-xs text-primary'>/</a></li>
                        <li><a href="#" className='font-semibold text-xs text-primary'>Default</a></li>
                    </ul>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <div className='p-5 border group relative border-gray-200 overflow-hidden bg-gradient-to-br to-[#863ee2] from-[#571f9e] flex gap-4 rounded'>
                    <div className=''>
                        <div>
                            <span className='bg-purple-50  rounded'>
                                <div className='bg-gradient-to-br  to-[#863ee2] from-[#571f9e]  flex items-center justify-center rounded text-white'>
                                    <IoCartOutline className='text-5xl'></IoCartOutline>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-sm text-white font-normal'>Total Products</p>
                        <p className='text-2xl text-white font-semibold'>{ analytics?.totalProducts }</p>
                        <p className='text-xs text-gray-100'>Increased by <span className='text-green-500'>+12.2%</span> </p>
                    </div>
                    <span className='absolute right-0 bottom-0 z-10 inline-block'>
                        <IoTrendingUp className='text-8xl scale-50 group-hover:scale-90 transition-all text-[#571f9e] duration-300'></IoTrendingUp>
                    </span>
                    <span className='absolute -right-8 -bottom-8 inline-block  bg-opacity-50 w-[160px] rounded-full  h-[160px]'></span>
                </div>
                <div className='p-5 border group relative border-gray-200 overflow-hidden bg-gradient-to-br to-[#ff9cc3] from-[#fd3484] flex gap-4 rounded'>
                    <div className=''>
                        <div>
                            <span className='bg-purple-50  rounded'>
                                <div className=' bg-gradient-to-br to-[#ff9cc3] from-[#fd3484]  flex items-center justify-center rounded text-white'>
                                    <IoBagHandleOutline className='text-5xl'></IoBagHandleOutline>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-sm text-white font-normal'>Success order</p>
                        <p className='text-2xl text-white font-semibold'>{ analytics?.successOrders }</p>
                        <p className='text-xs text-gray-100'>Decreased by <span className='text-green-500'>+12.2%</span> </p>
                    </div>
                    <span className='absolute right-0 bottom-0 z-10 inline-block'>
                        <IoTrendingDownOutline className='text-8xl scale-50 group-hover:scale-90 transition-all text-[#fd3484] duration-300'></IoTrendingDownOutline>
                    </span>
                    <span className='absolute -right-8 -bottom-8 inline-block  bg-opacity-50 w-[160px] rounded-full  h-[160px]'></span>
                </div>
                <div className='p-5 border group relative border-gray-200 overflow-hidden bg-gradient-to-br to-[#00d2d7] from-[#07b2dd] flex gap-4 rounded'>
                    <div className=''>
                        <div>
                            <span className='bg-purple-50  rounded'>
                                <div className='bg-gradient-to-br to-[#00d2d7] from-[#07b2dd]  flex items-center justify-center rounded text-white'>
                                    <IoCellularOutline className='text-5xl'></IoCellularOutline>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-sm text-white font-normal'>Total Income</p>
                        <p className='text-2xl text-white font-semibold'>{analytics?.totalIncome} BDT</p>
                        <p className='text-xs text-gray-100'>Increased by <span className='text-gray-800'>+12.2%</span> </p>
                    </div>
                    <span className='absolute right-0 bottom-2 z-10 inline-block'>
                        <IoTrendingUp className='text-8xl scale-50 group-hover:scale-90 transition-all text-[#07b2dd] duration-300'></IoTrendingUp>
                    </span>
                    <span className='absolute -right-8 -bottom-8 inline-block  bg-opacity-50 w-[160px] rounded-full  h-[160px]'></span>
                </div>


                <div className='p-5 border border-gray-200 bg-white flex gap-4 rounded'>
                    <div className=''>
                        <div>
                            <span className='bg-[#EDF1FA] inline-block p-4 rounded'>
                                <div className='bg-[#4C75CF] p-2 w-10 h-10 flex items-center justify-center rounded text-white'>
                                    <IoCartOutline className='text-xl'></IoCartOutline>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-sm text-gray-500 font-normal'>Total Sales</p>
                        <p className='text-2xl text-gray-700 font-semibold'>12,088</p>
                        <p className='text-xs text-gray-500'>Decreased by <span className='text-[#4C75CF]'>+12.2%</span> </p>
                    </div>
                </div>
                <div className='p-5 border border-gray-200 bg-white flex gap-4 rounded'>
                    <div className=''>
                        <div>
                            <span className='bg-[#E8F9EF] inline-block p-4 rounded'>
                                <div className='bg-[#22C55E] p-2 w-10 h-10 flex items-center justify-center rounded text-white'>
                                    <IoCartOutline className='text-xl'></IoCartOutline>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-sm text-gray-500 font-normal'>Total Income</p>
                        <p className='text-2xl text-gray-700 font-semibold'>12,088</p>
                        <p className='text-xs text-gray-500'>Increased by <span className='text-[#22C55E]'>+12.2%</span> </p>
                    </div>
                </div>
                <div className='p-5 border border-gray-200 bg-white flex gap-4 rounded'>
                    <div className=''>
                        <div>
                            <span className='bg-[#FEEBEF] inline-block p-4 rounded'>
                                <div className='bg-[#F43F5E] p-2 w-10 h-10 flex items-center justify-center rounded text-white'>
                                    <IoCartOutline className='text-xl'></IoCartOutline>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-sm text-gray-500 font-normal'>Total Income</p>
                        <p className='text-2xl text-gray-700 font-semibold'>12,088</p>
                        <p className='text-xs text-gray-500'>Increased by <span className='text-[#22C55E]'>+12.2%</span> </p>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5 '>
                <div className='bg-white lg:col-span-2 '>
                    <div className='p-4 border-b '>
                        <p className='font-semibold'>Order vs Seals</p>
                    </div>
                    <div className='px-1 py-3'>
                        <AreaChartCom />
                    </div>
                </div>
                <div className='bg-white col-span-1 '>
                    <div className='p-4 border-b '>
                        <p className='font-semibold'>Order vs Seals</p>
                    </div>
                    <div  className=''>
                        <PiChartCompo charts={analytics?.piCharts} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;