/* eslint-disable react/prop-types */
import { useState } from "react";
import RatingCreate from "../Ratings/RatingCreate";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductReviewForm = ({productId}) => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(5);
    const [error, setError] = useState(null)
    const {user} = useAuth();
    const axios = useAxios()

    const handleSubmitReview = async (e) => {
        e.preventDefault();

       
        // Reviews input
        const review = e.target.reviewText.value;
        if(review.length == 0){
            return setError("Invalid form data")
        }else{
            setError("")
        }

        const reviewObj = {
            user : user?._id,
            product: productId,
            reviewText : review,
            rating,
        }
        try {
            if(user?._id){
                const {data} = await axios.post(`/reviews?email=${user?.email}`, reviewObj);
                
                if(data.success == 'isExists'){
                    toast.success("You have reviewd this product", {icon: '🙅‍♂️'})
                }else{
                    toast("Reviews successfull", {icon: '❤️‍🔥'})
                }
            }else{
                navigate("/login")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmitReview}>
                <div className="flex items-center gap-2 mb-5">
                    <RatingCreate rating={rating} setRating={setRating} />
                </div>
                <textarea name="reviewText" placeholder="Write text..." id="" className='px-3 w-full py-3  border border-gray-200 text-gray-600 rounded-md outline-none' cols="30" rows="2"></textarea>
                {error && <p className="text-xs text-red-500">{error}</p> }
                <div className="mt-4">
                    <button type="submit" className={`cursor-pointer px-5 py-2 inline-block bg-primary text-white rounded-md text-base font-medium  `}>Submit</button>
                </div>
            </form>
        </>
    );
};

export default ProductReviewForm;