import PropTypes from 'prop-types';

const HomeSliderItem = ({slider}) => {
    const { title,sTitle,subTitle,image}  = slider || {};
    return (
        <>
            <div className='py-10 lg:py-0'>
                <div className='relative'>
                    <div className='absolute pl-16 top-2/4 left-0 -translate-y-2/4'>
                        <div className='text-sm text-secondary uppercase font-semibold mb-2'>{subTitle}</div>
                        <div className='pb-3'>
                            <div className='text-4xl font-semibold'>{title}</div>
                            <div className='text-2xl  font-semibold'><span>{sTitle}</span></div>
                        </div>
                        <div className='mt-4'><a href="#" className='px-7 py-3 inline-block bg-primary text-white font-semibold text-sm rounded-3xl'>Shop Now</a></div>
                    </div>
                    <img className=' lg:h-[340px] object-cover' src={image} alt="" />
                </div>
            </div>   
        </>
    );
};

HomeSliderItem.propTypes = {
    slider : PropTypes.object.isRequired,
}

export default HomeSliderItem;