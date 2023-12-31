import { useState } from 'react';
import PropTypes from "prop-types"
import { Link } from 'react-router-dom';
import { IoHomeOutline, IoPersonOutline } from 'react-icons/io5';
import { HiBars3BottomLeft, HiMiniXMark, HiOutlineShoppingCart } from 'react-icons/hi2';
import { LuSearch } from 'react-icons/lu';
import useCategorys from '../../../hooks/useCategorys';
import useCarts from '../../../hooks/useCarts';
import useAuth from '../../../hooks/useAuth';


const MobileMenu = ({toggleCartDoyarHandler,isMobileSearch, setIsMobileSearch}) => {
    const [carts] = useCarts();
    const [categorys] = useCategorys({search:'',status:true});
    const [isToggle, setIsToggle] = useState(false);
    const [isActiveMenu, setIsActiveMenu] = useState('category');
    const {user} = useAuth();
    const handleMobileMenuTab = (value) => {
        setIsActiveMenu(value)
    }

    const handleToggleMenu = () => {
        setIsToggle(!isToggle)
    }

    // when i have click mobile menu then hidden mobile left menu
    const handleMobileMenuShowup = () => {
        setIsToggle(false)
    }
    return (
        <div className='lg:hidden relative'>
            <div className={`mobile-left transition-all duration-500 ${isToggle ? ' left-0' : ' -left-[91vw]  sm:-left-[300px] '}`}>

                <ul>
                    <li className='mobile-logo-wrap'>
                        <div className='text-3xl  text-text-color font-bold'>STORE<span className='text-primary'>MI</span></div>
                        <span onClick={ handleToggleMenu } className='flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-slate-100'><HiMiniXMark /></span>
                    </li>
                    <li>
                        <div className='flex items-center py-2 px-5'>
                            <button onClick={() => handleMobileMenuTab('category')} className={`w-full py-2 bg-white text-base border-b text-gray-900 ${isActiveMenu == 'category' ? 'border-primary text-primary' : ""} `}>Category</button>
                            <button onClick={() => handleMobileMenuTab('menu')} className={`w-full py-2 bg-white text-base border-b text-gray-900 ${isActiveMenu == 'menu' ? 'border-primary text-primary' : ""} `}>Menu</button>
                        </div>
                    </li>
                    {
                        isActiveMenu =='category' ? 
                        <div>
                            {
                                categorys.length > 0 && categorys?.map(item => <li key={item?._id}><Link onClick={handleMobileMenuShowup} to={`/shop?category=${item?.slug}`} className='mobilemenu' >{item?.name}</Link></li> ) 
                            }
                          
                        </div>
                        : 
                        <div>
                            <li><Link onClick={handleMobileMenuShowup} to={'/'} className='mobilemenu' >Home</Link></li>
                            <li><Link onClick={handleMobileMenuShowup} to={'/shop'} className='mobilemenu' >Shops</Link></li>
                            <li><Link onClick={handleMobileMenuShowup} to={'/carts'} className='mobilemenu' >My Cart</Link></li>
                            <li><Link onClick={handleMobileMenuShowup} to={'/login'}  className='mobilemenu' >Login</Link></li>
                        </div>
                    }
                </ul>
                <ul>
                    <li></li>
                </ul>
            </div>
            <div className='mobilembttom'>
                <ul className='flex items-center justify-around'>
                    <li className='w-full  text-center'><button onClick={ handleToggleMenu } className='mobilemenu-icon w-full text-center'> <HiBars3BottomLeft className='text-xl' /></button></li>
                    <li className='w-full text-center'><Link to={'/'} className='mobilemenu-icon w-full text-center'> <IoHomeOutline className='text-xl' /></Link></li>
                    <li className='cartLi w-full text-center'>
                        <button onClick={toggleCartDoyarHandler} className='mobilemenu-icon w-full text-center -top-12   absolute'>
                            <span className='mobileCartStyle relative '>
                                <HiOutlineShoppingCart className='text-3xl text-white' />  
                                <span className='countMobile'>{ carts?.totalCarts > 0 ? carts?.totalCarts : 0 }</span>
                            </span>
                        </button>
                    </li>
                    {/* <span className='absolute -top-1 -right-2 w-5 h-5 text-xs text-white bg-primary rounded-full flex items-center justify-center'>2</span> */}
                    <li onClick={() => setIsMobileSearch(!isMobileSearch)} className='w-full  text-center'><button className='mobilemenu-icon w-full text-center relative'> <LuSearch  className='text-xl' /> </button></li>
                    <li className='w-full text-center'>
                        <Link to={ user?._id ? '/user/dashboard' : '/login'} className='mobilemenu-icon w-full text-center'> <IoPersonOutline className='text-xl' /></Link>
                        
                    </li>
                </ul>
            </div>
        </div>
    );
};


MobileMenu.propTypes = {
    toggleCartDoyarHandler : PropTypes.func.isRequired,
    isMobileSearch: PropTypes.bool,
    setIsMobileSearch: PropTypes.func
}

export default MobileMenu;