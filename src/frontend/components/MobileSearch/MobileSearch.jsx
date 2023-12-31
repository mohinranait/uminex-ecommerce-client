import { IoIosSearch } from "react-icons/io";
import PropTypes from "prop-types"
import qs from "query-string"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearcHistoryFromLsData } from "../../../services/localStorage";
import { v4 as uuidv4 } from 'uuid';

const MobileSearch = ({isMobileSearch}) => {

    const [search, setSearch] = useState('')
    const navigate = useNavigate();

    // handle search product
    const handleMobileSearch = () => {
        let cuerentQuery = {}
        if(location?.search){
            cuerentQuery = qs.parse(location?.search)
        }

        let updateQuery = {...cuerentQuery }

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
    return (
        <div className={` flex items-center justify-center fixed top-0 left-0 w-full z-50 bg-gray-100 transition-all px-3 ${isMobileSearch ? 'h-[55px] translate-y-0 ':'h-0 -translate-y-10 '} `}>
            <div className="flex  w-full">
                <input type="search" onChange={(e) => setSearch(e.target.value)} className="py-2 px-3 w-full outline-none" placeholder="Search..."/>
                <button onClick={handleMobileSearch} className="py-2 px-3 text-white text-xl bg-primary"><IoIosSearch /></button>
            </div>
        </div>
    );
};


MobileSearch.propTypes = {
    isMobileSearch : PropTypes.bool,
    setIsMobileSearch : PropTypes.func,
}

export default MobileSearch;