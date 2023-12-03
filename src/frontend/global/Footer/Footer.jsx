import { HiOutlineHome } from "react-icons/hi2";
import { FaFacebookF, FaInstagram, FaLinkedin, FaPhoneAlt, FaTelegramPlane, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className=''>
        <div className='px-5 bg-slate-800 pt-24 pb-10'>
            <div className='grid  md:grid-cols-3 '>
                <div className='col-span-2 grid sm:grid-cols-3 '>
                    <div>
                        <p className='text-lg font-bold text-gray-300'>My Account</p>
                        <ul className='space-y-2 mt-5'>
                            <li><a href="#" className='text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group '> <span className='w-[6px] h-[6px] rounded-full border inline-block group-hover:bg-white group-hover:border-white'></span> About</a></li>
                            <li><a href="#" className='text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group '> <span className='w-[6px] h-[6px] rounded-full border inline-block group-hover:bg-white group-hover:border-white'></span> History</a></li>
                            <li><a href="#" className='text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group '> <span className='w-[6px] h-[6px] rounded-full border inline-block group-hover:bg-white group-hover:border-white'></span> Community</a></li>
                            <li><a href="#" className='text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group '> <span className='w-[6px] h-[6px] rounded-full border inline-block group-hover:bg-white group-hover:border-white'></span> Contact</a></li>
                            <li><a href="#" className='text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group '> <span className='w-[6px] h-[6px] rounded-full border inline-block group-hover:bg-white group-hover:border-white'></span> Logical</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className='text-lg font-bold text-gray-300'>Information</p>
                        <ul className='space-y-2 mt-5'>
                            <li><a href="#" className='text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group '> <span className='w-[6px] h-[6px] rounded-full border inline-block group-hover:bg-white group-hover:border-white'></span> About</a></li>
                            <li><a href="#" className='text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group '> <span className='w-[6px] h-[6px] rounded-full border inline-block group-hover:bg-white group-hover:border-white'></span> History</a></li>
                            <li><a href="#" className='text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group '> <span className='w-[6px] h-[6px] rounded-full border inline-block group-hover:bg-white group-hover:border-white'></span> Community</a></li>
                            <li><a href="#" className='text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group '> <span className='w-[6px] h-[6px] rounded-full border inline-block group-hover:bg-white group-hover:border-white'></span> Contact</a></li>
                            <li><a href="#" className='text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group '> <span className='w-[6px] h-[6px] rounded-full border inline-block group-hover:bg-white group-hover:border-white'></span> Logical</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className='text-lg font-bold text-gray-300'>Our Services</p>
                        <ul className='space-y-2 mt-5'>
                            <li><a href="#" className='text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group '> <span className='w-[6px] h-[6px] rounded-full border inline-block group-hover:bg-white group-hover:border-white'></span> About</a></li>
                            <li><a href="#" className='text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group '> <span className='w-[6px] h-[6px] rounded-full border inline-block group-hover:bg-white group-hover:border-white'></span> History</a></li>
                            <li><a href="#" className='text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group '> <span className='w-[6px] h-[6px] rounded-full border inline-block group-hover:bg-white group-hover:border-white'></span> Community</a></li>
                            <li><a href="#" className='text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group '> <span className='w-[6px] h-[6px] rounded-full border inline-block group-hover:bg-white group-hover:border-white'></span> Contact</a></li>
                            <li><a href="#" className='text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group '> <span className='w-[6px] h-[6px] rounded-full border inline-block group-hover:bg-white group-hover:border-white'></span> Logical</a></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div>
                        <p className='text-lg font-bold text-gray-300'>Contact Us</p>
                        <ul className='space-y-2 mt-5'>
                            <li className='flex gap-2 text-white '> <HiOutlineHome /> <p className='text-gray-400 text-sm   '>  <span className='font-bold'>Address:</span>  <span>1702 Los Angeles, California, American</span></p></li>
                            <li className='flex gap-2 text-white '> <FaTelegramPlane /> <p className='text-gray-400 text-sm   '>  <span className='font-bold'>Mail us:</span>  <span>demo@clickboom.com</span></p></li>
                            <li className='flex gap-2 text-white '> <FaPhoneAlt /> <p className='text-gray-400 text-sm   '>  <span className='font-bold'>Phone:</span>  <a href='tel:01728068200' className='text-white'>1-888-345-6789</a></p></li>
                            <li>
                                <ul className="flex flex-wrap items-center gap-4 mt-4">
                                    <li><a className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full relative before:w-full before:h-full before:absolute before:bg-primary before:left-0 before:top-0 before:rounded-full before:scale-0 before:hover:scale-100 before:transition-all before:duration-500 text-slate-700 hover:text-white transition-all duration-300  " href="#"> <FaFacebookF className='z-10' /> </a></li>
                                    <li><a className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full relative before:w-full before:h-full before:absolute before:bg-primary before:left-0 before:top-0 before:rounded-full before:scale-0 before:hover:scale-100 before:transition-all before:duration-500 text-slate-700 hover:text-white transition-all duration-300  " href="#"> <FaLinkedin className='z-10' /> </a></li>
                                    <li><a className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full relative before:w-full before:h-full before:absolute before:bg-primary before:left-0 before:top-0 before:rounded-full before:scale-0 before:hover:scale-100 before:transition-all before:duration-500 text-slate-700 hover:text-white transition-all duration-300  " href="#"> <FaInstagram className='z-10' /> </a></li>
                                    <li><a className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full relative before:w-full before:h-full before:absolute before:bg-primary before:left-0 before:top-0 before:rounded-full before:scale-0 before:hover:scale-100 before:transition-all before:duration-500 text-slate-700 hover:text-white transition-all duration-300  " href="#"> <FaYoutube className='z-10' /> </a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>  
    );
};

export default Footer;