
import { Outlet } from 'react-router-dom';
import Header from '../global/Header/Header';
import MobileMenu from '../global/Mobile/MobileMenu';
import Footer from '../global/Footer/Footer';
import { useContext, useState } from 'react';
import { OnclickContext } from '../Providers/OnclickProvider';
import MyCartsDoyar from '../global/MyCartsDoyar/MyCartsDoyar';

const MainLayout = () => {
    const [cartDoyar, setCartDoyar] = useState(false);
    const toggleCartDoyarHandler = () => {
        setCartDoyar(!cartDoyar)
    }
    const {
        showItem,setShowItem,
        selectBox,setSelectBox,
        isMobileTab,setIsMobileTab
    } = useContext(OnclickContext);

    const handleAllClickEvent = () => {
        // Handle cart right doyar
        if(cartDoyar){
            setCartDoyar(false)
        }

        // Shop page show products items
        if(showItem){
            setShowItem(false)
        }
        // Shop page price low to high 
        if(selectBox){
            setSelectBox(false)
        }
        // Mobile Product tab for home page product slider section
        if(isMobileTab){
            setIsMobileTab(false)
        }
    }
    return (
        <div onClick={handleAllClickEvent}>
            <Header toggleCartDoyarHandler={toggleCartDoyarHandler} />
            <Outlet />
            <Footer />
            <MobileMenu toggleCartDoyarHandler={toggleCartDoyarHandler} />
            <MyCartsDoyar toggleCartDoyarHandler={toggleCartDoyarHandler} cartDoyar={cartDoyar} />
        </div>
    );
};

export default MainLayout;