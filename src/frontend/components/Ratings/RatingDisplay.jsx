import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import ProductRatingItem from "./ProductRatingItem";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";


const RatingDisplay = () => {
    const axiosPublic = useAxiosPublic();
    const [ratOne, setRatOne] = useState(0)
    const [ratTwo, setRatTwo] = useState(0)
    const [ratThree, setRatThree] = useState(0)
    const [ratFore, setRatFore] = useState(0)
    const [ratFive, setRatFive] = useState(0)
    const [ratings, setRatings] = useState([])

    const calculateRatings = (total,ratVal) => {
        const avarage= ((total - ratVal)/total) * 100
        return avarage
    }

    const {data:totalRatings} = useQuery({
        queryKey : ['reviewsCalc'],
        queryFn : async () => {
            const {data} = await axiosPublic.get(`/reviews/65746463d7b03beef0d8f1a2`);
            const oneRatings = data?.reviews?.filter(d => d.rating === 1 );
            const twoRatings = data?.reviews?.filter(d => d.rating === 2 );
            const threeRatings = data?.reviews?.filter(d => d.rating === 3 );
            const fourRatings = data?.reviews?.filter(d => d.rating === 4 );
            const fiveRatings = data?.reviews?.filter(d => d.rating === 5 );
            setRatOne(oneRatings)
            setRatTwo(twoRatings)
            setRatThree(threeRatings)
            setRatFore(fourRatings)
            setRatFive(fiveRatings)
            return data?.reviews
        }
    })

    useEffect(() => {
        const ratings = [
            {_id: 1, label:5, width:100-calculateRatings(totalRatings?.length, ratFive?.length) , reviews: ratFive.length || 0,},
            {_id: 2, label:4, width:100-calculateRatings(totalRatings?.length, ratFore?.length) , reviews: ratFore.length || 0,},
            {_id: 3, label:3, width:100-calculateRatings(totalRatings?.length, ratThree?.length) , reviews: ratThree.length || 0,},
            {_id: 4, label:2, width:100-calculateRatings(totalRatings?.length, ratTwo?.length) , reviews: ratTwo.length || 0,},
            {_id: 5, label:1, width:100-calculateRatings(totalRatings?.length, ratOne?.length) , reviews: ratOne.length || 0,},
        ]
        setRatings(ratings)
    },[ratFive,ratFore, ratOne,ratTwo,ratThree])

    
    return (
        <>
            <div className="lg:grid grid-cols-3 pb-5 gap-5">
                <div className=" space-y-2 mb-6 lg:mb-0">
                    <div className="flex items-center gap-2"><span className="text-3xl font-bold">4.5</span> <span className="text-white bg-[#FD8C00] text-xs py-1 px-5">  Top Rated</span> </div>
                    <div className="flex items-center gap-2"> 
                        {
                            <Rating
                                initialRating={ 3.5 }
                                readonly
                                emptySymbol={<FaStar size={18} color="#E5E5E5"  className="mr-1" />}
                                fullSymbol={<FaStar size={18} color="#FD8C00" className="mr-1" />}
                            />
                        }
                    </div>
                    <p className="text-gray500 text-xs font-medium text-gray-600">142 Ratings</p>
                </div>
                <div className="col-span-2">
                    <ul className="space-y-1">
                        {
                            ratings?.map((rating,index) =>  <ProductRatingItem key={index} index={index} rating={rating} /> )
                        }
                    </ul>
                </div>
            </div>
        </>
    );
};

export default RatingDisplay;