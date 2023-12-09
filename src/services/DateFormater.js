
const dateAdnTimeFormater = (date) => {
    const dateString = date;
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');

    const hours = dateObject.getUTCHours().toString().padStart(2, '0');
    const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
    const seconds = dateObject.getUTCSeconds().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const formatedTime = `${hours}:${minutes}:${seconds}`;
    return {
         formattedDate,
         formatedTime
    };

}

// Date formater
const dateFormater = (date) => {
    const {formattedDate} = dateAdnTimeFormater(date);
    return formattedDate
}

const timeFormater = (date) => {
    const {formatedTime} = dateAdnTimeFormater(date);
    return formatedTime
}

export  {
    timeFormater,
    dateFormater
} ;