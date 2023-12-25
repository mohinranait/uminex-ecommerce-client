/* eslint-disable react/prop-types */

import { FaStar } from "react-icons/fa";

const RatingCreate = ({rating,setRating}) => {

    return (
        <>
            {
                [...Array(5)].map((star,inx) => {
                    const currentRating = inx+1;
                    return (
                        <label key={inx} htmlFor="">
                            <FaStar 
                                size={30}  
                                color={currentRating <= ( rating ) ? '#fd8c00' : '#E5E5E5'} 
                                onMouseEnter={()=>setRating(currentRating)}
                                onMouseLeave={()=>setRating(currentRating)}
                                onClick={() => setRating(currentRating)}
                                className="cursor-pointer"
                            />
                        </label>
                    )
                } )
            }   
        </>
    );
};

export default RatingCreate;