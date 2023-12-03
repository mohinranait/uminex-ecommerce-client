import { createContext, useState } from 'react';
import PropTypes from "prop-types"

export const OnclickContext = createContext(null);

const OnclickProvider = ({children}) => {

    // Shop page -> select show items , 
    const [showItem, setShowItem] = useState(false);
    // Shop page -> price low to high filters
    const [selectBox, setSelectBox] = useState(false);
    // Home page mobile version product tabs
    const [isMobileTab, setIsMobileTab] = useState(false);


    const clickState = {
        showItem,setShowItem,
        selectBox,setSelectBox,
        isMobileTab,setIsMobileTab
    }

    return (
        <OnclickContext.Provider value={clickState}>
            {children}
        </OnclickContext.Provider>
    );
};

OnclickProvider.propTypes = {
    children : PropTypes.node
}

export default OnclickProvider;