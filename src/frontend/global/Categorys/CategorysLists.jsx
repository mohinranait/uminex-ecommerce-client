
import { Link } from 'react-router-dom';
import useCategorys from '../../../hooks/useCategorys';
import LeftSidebarCategoryPlaceholder from '../../components/Loding/LeftSidebarCategoryPlaceholder';

const CategorysLists = () => {
    const [categoris,,isPending] = useCategorys({search:'',status:true});


    return (
        <>
            <ul className="bg-white w-full  ">
                {
                    isPending &&   <LeftSidebarCategoryPlaceholder />
                }
              
                {
                    categoris?.map(category =>  <li key={category._id} className='px-5 group  '><Link to={`/category/${category?.slug}`} className='text-sm group-last:border-b-0 border-b font-medium  text-text-color border-[#E5E8EC]  flex items-center leading-[40px]'>{category?.name}</Link></li> )
                }
            </ul>
        </>
    );
};

export default CategorysLists;