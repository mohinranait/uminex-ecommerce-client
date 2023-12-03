import PropTypes from 'prop-types';
import { HiOutlineStar, HiStar } from 'react-icons/hi2';
import Rating from 'react-rating';

const ProductRating = ({rating}) => {
    return (
        <>
            <Rating
                initialRating={rating}
                readonly
                emptySymbol={<HiOutlineStar className='text-sm text-gray-400 dark:text-gray-500' />}
                fullSymbol={<HiStar className='text-sm text-gray-400 dark:text-gray-500' />}
            />   
        </>
    );
};

ProductRating.propTypes  = {
    rating : PropTypes.string
}

export default ProductRating;