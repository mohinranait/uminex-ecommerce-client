import PropTypes from 'prop-types';

const SummeryCard = ({name, value}) => {
    return (
        <>
            <div className="border rounded-md py-4 md:py-10">
                <p className="text-3xl md:text-5xl font-bold text-center text-gray-700 mb-2 ">{value}</p>
                <p className="text-sm md:text-base font-medium text-center text-gray-500">{name}</p>
            </div>   
        </>
    );
};

SummeryCard.propTypes = {
    name : PropTypes.string,
    value : PropTypes.number,
}

export default SummeryCard;