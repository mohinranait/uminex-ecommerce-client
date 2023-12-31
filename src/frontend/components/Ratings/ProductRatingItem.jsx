import { FaStar } from "react-icons/fa";
import Rating from "react-rating";

const ProductRatingItem = ({index,rating}) => {
    const {reviews,width} = rating || {};

    return (
        <>
            <li className="flex gap-5 items-center">
                <div className=" gap-2 w-[80px] "> 
                    {
                        <Rating 
                        initialRating={5-index }
                        readonly
                        emptySymbol={<FaStar size={15} color="#E5E5E5"  />}
                        fullSymbol={<FaStar size={15} color="#FD8C00" />}
                      />
                    }
                </div>

                <span className="w-[120px] sm:w-[200px] h-2  bg-[#E5E5E5] inline-block relative">
                    <span className="bg-[#FD8C00] absolute left-0 top-0 inline-block h-2" style={{width : `${width}%`}}></span>
                </span>
                <span className="text-sm text-gray-700">{reviews}</span>
            </li>
        </>
    );
};

export default ProductRatingItem;