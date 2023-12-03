
import { Link } from 'react-router-dom';

const CategorysLists = () => {

    const categoris = [
        {_id: 1, name : "Computer & Desktop"},
        {_id: 2, name : "Laptop & Ipad"},
        {_id: 3, name : "Cameras & Photos"},
        {_id: 4, name : "Smart Phones & Tablets"},
        {_id: 5, name : "Home & Kitchen"},
        {_id: 6, name : "TV & Audios"},
        {_id: 7, name : "Health & Beauty"},
        {_id: 8, name : "Watches & Eyewear"},
        {_id: 9, name : "Top Deals"},
        {_id: 10, name : "Top Selling Products"},
        {_id: 11, name : "Top Featured Products"},
    ]

    return (
        <>
            <ul className="bg-white w-full  ">
                {
                    categoris?.map(category =>  <li key={category._id} className='px-5 group  '><Link to={'/shops'} className='text-sm group-last:border-b-0 border-b font-medium  text-text-color border-[#E5E8EC]  flex items-center leading-[40px]'>{category.name}</Link></li> )
                }
            </ul>
        </>
    );
};

export default CategorysLists;