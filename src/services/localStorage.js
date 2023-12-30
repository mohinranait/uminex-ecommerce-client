
const getSearcHistoryFromLsData = () => {
    const lsHistory = localStorage.getItem('searchHistory');
    let newArr =[];
    if( lsHistory ){
        newArr = JSON.parse(lsHistory)
    }
    return newArr
}


export {
    getSearcHistoryFromLsData,
}