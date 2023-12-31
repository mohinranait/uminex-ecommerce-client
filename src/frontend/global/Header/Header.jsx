import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoCallOutline, IoHeartSharp, IoPersonSharp } from "react-icons/io5";
import { IoMdClose, IoMdHeartEmpty } from "react-icons/io";
import { LuMenu, LuShoppingCart } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import PropTypes from "prop-types"
import "./Header.css"
import CategorysLists from "../Categorys/CategorysLists";
import useAuth from "../../../hooks/useAuth";
import useCarts from "../../../hooks/useCarts";
import useWishlists from "../../../hooks/useWishlists";
import useCategorys from "../../../hooks/useCategorys";
import { useContext, useState } from "react";
import qs from "query-string"
import { OnclickContext } from "../../Providers/OnclickProvider";
import { v4 as uuidv4 } from 'uuid';
import { getSearcHistoryFromLsData } from "../../../services/localStorage";

const Header = ({toggleCartDoyarHandler}) => {
    const [search, setSearch] = useState('');
    const [searchHistorys, setSearchHistorys] = useState([]);
    const [filterHistorys, setFilterHistorys] = useState([])
    const [wishlists] = useWishlists();
    const [carts] = useCarts();
    const [categorys] = useCategorys({search:'',status:true});
    const [category, setCategory] = useState('');
    const location = useLocation();
    const {logOut,user} = useAuth();
    const navigate = useNavigate();
    const {setHeaderSearchHistoryBox,headerSearchHistoryBox} = useContext(OnclickContext)
    
    // User Logout
    const handleLogout = async () => {
        await logOut();
        navigate('/')
    }

    // handle search product
    const handleSearchButton = () => {
        let cuerentQuery = {}
        if(location?.search){
            cuerentQuery = qs.parse(location?.search)
        }

        let updateQuery = {...cuerentQuery }
        if(category){
            updateQuery.category = category;
        }
        if(search){
            updateQuery.search = search;
        }
        const url = qs.stringifyUrl({
            url: "/shop",
            query : updateQuery,
        })
        navigate(url)

        // get LS history
        let getSearchHistorys = getSearcHistoryFromLsData()
        const lsSearchHistory = {
            value : search,
            url,
            _id: uuidv4()
        }
        const isExists = getSearchHistorys?.find(item => item?.value == search );
        if(!isExists){
            getSearchHistorys.push(lsSearchHistory)
            localStorage.setItem('searchHistory', JSON.stringify(getSearchHistorys))
        }
    }

    // Handle search on click
    const handleSearchClick = (e) => {
        
        setHeaderSearchHistoryBox(true)
        e.stopPropagation()

        const filter = filterHistorys?.filter(item => item?.value.toLowerCase().includes(inputValue.toLowerCase()) )
        if( filter ){ 
            setSearchHistorys(filter)
            setHeaderSearchHistoryBox(true)
        }

        let getSearchHistorys = getSearcHistoryFromLsData()
        setSearchHistorys(getSearchHistorys)
        setFilterHistorys(getSearchHistorys)
    }

    // Handle search input onChange 
    const handleOnChange = (e) => {
        const inputValue = e.target.value;
        e.stopPropagation()
        setSearch(inputValue)

        const filter = filterHistorys?.filter(item => item?.value.toLowerCase().includes(inputValue.toLowerCase()) )
        if( filter ){ 
            setSearchHistorys(filter)
            setHeaderSearchHistoryBox(true)
        }

    }

    

    // Handle remove search history 
    const hendleDeleteHistory = (e,value) => {
        e.preventDefault()
        e.stopPropagation();
        
        // localhostoreage from search history
        let getSearchHistorys = getSearcHistoryFromLsData()
        const filter = getSearchHistorys?.filter(item => item?._id !== value);
        setSearchHistorys(filter)
        localStorage.setItem('searchHistory', JSON.stringify(filter))
    }

    
    return (
        <header className="hidden lg:block">
            <div className='border-b bg-white'>
                <div className='box'>
                    <div className='flex items-center h-[45px]  justify-between'>
                        <ul className='text-xs'>
                            <li className='flex items-center gap-1'> <IoCallOutline /> <span> Call us:  <a href="tel:1-888-345-6789" className='font-semibold'>1-888-345-6789</a> </span></li>
                        </ul>
                        <ul className='flex items-center justify-end gap-3 text-xs divide-x '>
                            {
                                user?._id ? 
                                <li className=''><Link to="/user/profile" className='flex items-center gap-1'><IoPersonSharp className='text-sm' /> My Account</Link></li>
                                : 
                                <li className=''><Link to="/login" className='flex items-center gap-1'><IoPersonSharp className='text-sm' /> Sign In</Link></li>
                             }
                           
                            <li className=' pl-3'><Link to="/user/wishlists" className='flex items-center gap-1'><IoHeartSharp className='text-sm' /> Wishlist</Link></li>
                            <li className=' pl-3'><a href="#" className='flex items-center gap-1'>USD</a></li>
                            <li className=' pl-3'><a href="#" className='flex items-center gap-1'>BD</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <div className="box">
                    <div className="grid grid-cols-12 gap-3 items-center py-4">
                        <div className="col-span-3">
                            <Link to={'/'} className="text-3xl font-bold uppercase">Store<span className="text-primary">MI</span></Link>
                        </div>
                        <div className="col-span-6 relative">
                            <div className="flex rounded-md ">
                                <div className="border-2  py-2 border-r-0 w-full border-[#3E5E8EC] rounded-md rounded-r-none flex ">
                                    <select name="" onChange={(e) => setCategory(e.target.value)} className="w-[290px] px-3 outline-none " id="">
                                        <option value={""}>Category</option>
                                        {
                                            categorys?.map(category =>   <option key={category?._id} value={category?.slug}>{category?.name}</option> )
                                        }
                                    </select>
                                    <input type="search" onClick={handleSearchClick}  onChange={ handleOnChange} className="w-full border-l ml-2 rounded-md outline-none px-3 " placeholder="Search products..." />
                                </div>
                                <button onClick={handleSearchButton} className="px-8 bg-primary rounded-r-md text-white text-sm font-semibold">Search</button>
                            </div>

                            {
                                searchHistorys.length > 0 && headerSearchHistoryBox &&   <div className="top-[50px] bg-gray-100 left-0 w-full absolute ">
                                <ul className="space-y-1 relative z-50 bg-white w-full shadow">
                                    {
                                        searchHistorys?.map((search, index) => {
                                       

                                            return (
                                                <li key={index} className="flex justify-between items-center hover:bg-gray-100 px-3">
                                                    <Link to={search?.url} className="py-2 w-full "> 
                                                        <div>
                                                            <span className="text-sm text-gray-800">{search?.value}</span> 
                                                        </div>
                                                    
                                                    </Link>
                                                    <div onClick={(e) => hendleDeleteHistory(e,search?._id)} className="w-8 h-8 flex justify-center items-center cursor-pointer rounded-full text-gray-800 bg-gray-50">
                                                        <IoMdClose />
                                                    </div>
                                                </li>
                                            )
                                        } )
                                    }
                                    
                                </ul>
                            </div>
                            }
                           
                        </div>
                        <div className="col-span-3">
                            <ul className="flex items-center justify-end lg:gap-5">
                                <li>
                                    <Link to={'/user/dashboard'} className="flex items-center gap-1">
                                        <div className="flex items-center">
                                            {
                                                user?._id ? ( <span className="w-10 h-10 rounded-full inline-block"><img className="w-10 h-10 rounded-full" src={'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg'} alt="" /></span> ) : (  <GoPerson className="text-3xl text-text-color" />)
                                            }
                                          
                                        </div>
                                        <div className="hidden xl:block">
                                            <p className="text-xs leading-3 font-medium"> {user?.email ? user?.name.split(' ')[0] : 'Login'  } </p>
                                            <p className="text-base font-semibold text-text-color ">Account</p>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/user/wishlists`} className="flex items-center gap-2">
                                        <div className="relative">
                                            <IoMdHeartEmpty className="text-3xl text-text-color" />
                                            <span className="select-count">{wishlists?.wishlists?.length || 0}</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={toggleCartDoyarHandler} className="flex items-center pl-2 gap-4">
                                        <div className="relative">
                                            <LuShoppingCart className="text-3xl text-text-color" />
                                            <span className="select-count">{ carts?.totalCarts > 0 ? carts?.totalCarts : 0 }</span>
                                        </div>
                                        <div>
                                            <p className="text-xs leading-3 font-medium">Your Cart</p>
                                            <p className="text-base font-semibold text-text-color ">${carts?.totalPrice ? carts?.totalPrice : '0.00'}</p>
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border-t">
                <div className="box">
                    <div className="grid grid-cols-4 items-center ">
                        <div className="group flex items-center cursor-pointer  gap-2  py-3 relative group">
                            <span className="all-cat-hover"></span>
                            <span className=""><LuMenu className="text-xl" /></span>
                            <span className="text-sm text-text-color font-semibold">Browse All Categories</span>
                            <div className={`opacity-0 invisible transition-all duration-500 absolute top-full right-0 z-[99999] left-0 ${location.pathname !='/' && "group-hover:opacity-100 group-hover:visible shadow " } `}>
                                <CategorysLists />
                            </div>
                        </div>
                        <div className="col-span-2 relative flex items-center">
                            <span className="absolute left-0 h-[50%] w-[1px] bg-slate-200"></span>
                            <ul className="lg:flex items-center pl-3 gap-5 menu">
                                <li><NavLink to={'/'} className="link-menu py-2 px-1">Home</NavLink></li>
                                <li><NavLink to={'/shop'} className="link-menu py-2 px-1">Shops</NavLink></li>
                                {
                                    user?.email ? <>
                                    {user?.role == 'admin' &&  <li><NavLink to={'/admin'} className="link-menu py-2 px-1">Admin</NavLink></li>}
                                    <li><button onClick={handleLogout} className="link-menu py-2 px-1">Logout</button></li>
                                    </> :    
                                    <li><NavLink to={'/login'} className="link-menu py-2 px-1">Login</NavLink></li>
                                }
                            </ul>
                        </div>
                        <div className="">
                            <p>
                                <Link className="flex gap-3 justify-end"> 
                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.08737 14.2867L1.48898 12.6883C0.837006 12.0363 0.837006 10.9637 1.48898 10.3117L3.08737 8.71331C3.36078 8.4399 3.58161 7.90359 3.58161 7.52502V5.26411C3.58161 4.33872 4.33875 3.58161 5.26414 3.58161H7.52502C7.90359 3.58161 8.4399 3.36081 8.71331 3.0874L10.3117 1.48898C10.9637 0.837006 12.0363 0.837006 12.6883 1.48898L14.2867 3.0874C14.5601 3.36081 15.0964 3.58161 15.4749 3.58161H17.7359C18.6612 3.58161 19.4184 4.33872 19.4184 5.26411V7.52502C19.4184 7.90359 19.6392 8.4399 19.9126 8.71331L21.511 10.3117C22.163 10.9637 22.163 12.0363 21.511 12.6883L19.9126 14.2867C19.6392 14.5601 19.4184 15.0964 19.4184 15.475V17.7358C19.4184 18.6612 18.6612 19.4184 17.7359 19.4184H15.4749C15.0964 19.4184 14.5601 19.6392 14.2867 19.9126L12.6883 21.511C12.0363 22.163 10.9637 22.163 10.3117 21.511L8.71331 19.9126C8.4399 19.6392 7.90359 19.4184 7.52502 19.4184H5.26414C4.33875 19.4184 3.58161 18.6612 3.58161 17.7358V15.475C3.58161 15.0859 3.36078 14.5496 3.08737 14.2867Z" fill="#DD3842"></path>
                                        <path d="M3.08737 14.2867L1.48898 12.6883C0.837006 12.0363 0.837006 10.9637 1.48898 10.3117L3.08737 8.71331C3.36078 8.4399 3.58161 7.90359 3.58161 7.52502V5.26411C3.58161 4.33872 4.33875 3.58161 5.26414 3.58161H7.52502C7.90359 3.58161 8.4399 3.36081 8.71331 3.0874L10.3117 1.48898C10.9637 0.837006 12.0363 0.837006 12.6883 1.48898L14.2867 3.0874C14.5601 3.36081 15.0964 3.58161 15.4749 3.58161H17.7359C18.6612 3.58161 19.4184 4.33872 19.4184 5.26411V7.52502C19.4184 7.90359 19.6392 8.4399 19.9126 8.71331L21.511 10.3117C22.163 10.9637 22.163 12.0363 21.511 12.6883L19.9126 14.2867C19.6392 14.5601 19.4184 15.0964 19.4184 15.475V17.7358C19.4184 18.6612 18.6612 19.4184 17.7359 19.4184H15.4749C15.0964 19.4184 14.5601 19.6392 14.2867 19.9126L12.6883 21.511C12.0363 22.163 10.9637 22.163 10.3117 21.511L8.71331 19.9126C8.4399 19.6392 7.90359 19.4184 7.52502 19.4184H5.26414C4.33875 19.4184 3.58161 18.6612 3.58161 17.7358V15.475C3.58161 15.0859 3.36078 14.5496 3.08737 14.2867Z" fill="#DD3842" stroke="#DD3842" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M8 15.0909L15.0909 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M14.4937 14.5H14.5043" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M8.58442 8.59091H8.59503" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg> 
                                    <span className="font-semibold text-text-color text-sm"> Sale $20 Off Your First Order.</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    toggleCartDoyarHandler: PropTypes.func.isRequired
}

export default Header;