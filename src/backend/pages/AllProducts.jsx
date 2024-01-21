import { IoAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import ProductRows from "../components/TableRows/ProductRows";
import { useEffect, useState } from "react";


const AllProducts = () => {
    const [search, setSearch] = useState('')
    const [perViews, setPerViews] = useState(10)
    const [currentPage, setCurrentPage]  = useState(1)
    const [getProductRequest, setGetProductRequest] = useState({
        limit : perViews,
        sort: "desc",
        sortFiled:'createdAt',
        page : currentPage,
        search: '',
        status: null,
        access:'admin',
    })

    // Pagination 
    const handleNextPage = (currentPage) => {
        setCurrentPage(currentPage + 1)
    }
    const handlePrevPage = (currentPage) => {
        setCurrentPage(currentPage - 1)
    }
    const [products,refetch,isPending] = useProducts(getProductRequest) || [];
    const {products:getProducts, pagination} = products;
    const countPage = pagination?.totalPages;
    const pages = [...Array(countPage).fill(2)];




    // handle product per pages
    const handleProductPerPage = (e) => {
        const limitPage = Number(e.target.value);
        setPerViews(limitPage)
        setCurrentPage(1)
        
    }


    // handle search product
    const handleSearchForm =() => {
        setGetProductRequest({
            ...getProductRequest,
            search,
        })
    }

    // handle status product
    const handleStatus =(e) => {
        const val = e.target.value;
        setGetProductRequest({
            ...getProductRequest,
            status:val,
        })
    }

    useEffect(() => {
        setGetProductRequest({
            ...getProductRequest,
            limit : perViews,
        })
    },[perViews])

    useEffect(() => {
        setGetProductRequest({
            ...getProductRequest,
            page : currentPage,
        })
    },[currentPage])

    return (
        <>
            <div className="bg-white px-5 py-5">
                <div className="flex justify-between items-center gap-5 mb-5">
                    <div className="flex items-center  gap-5">
                        <div className="flex items-center gap-1">
                            Show 
                            <select onChange={handleProductPerPage} name="" className="py-2 border rounded w-[60px] text-sm px-1 outline-blue-500" id="">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            items
                        </div>
                        <div>
                            <select onChange={handleStatus} name="" className="py-2 border rounded w-full lg:w-[150px] text-sm px-3 outline-blue-500" id="">
                                <option value="null">All products</option>
                                <option value="active">Public</option>
                                <option value="pending">Unpublic</option>
                            </select>
                        </div>
                        <div className="flex ">
                            <input type="search" onChange={(e) => setSearch(e.target.value)} className="py-2 border outline-none rounded-l w-full lg:w-[200px] text-sm px-3 " placeholder="Search by name" />
                            <button onClick={handleSearchForm} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-r">Search</button>
                        </div>
                    </div>
                    <Link to={'/admin/new-product'} className="flex gap-1 items-center py-2 px-3 bg-primary text-white rounded text-sm"><IoAddOutline />Add Product</Link>
                </div>
                <hr />
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="text-left text-gray-600 py-3">ID</th>
                                <th className="text-left text-gray-600 py-3">Product</th>
                                <th className="text-left text-gray-600 py-3">Price</th>
                                <th className="text-left text-gray-600 py-3">Brand</th>
                                <th className="text-left text-gray-600 py-3">Category</th>
                                <th className="text-left text-gray-600 py-3">U. code</th>
                                <th className="text-left text-gray-600 py-3">Status</th>
                                <th className=" text-gray-600 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getProducts?.map((product,index) => <ProductRows key={product?._id} index={index} product={product} /> )
                            }
                            
                        </tbody>
                    </table>

                        <ul className='flex gap-1 mt-4'>
                            <button onClick={() => handlePrevPage(currentPage)} disabled={currentPage == 1} className={`py-1 px-3 border rounded cursor-pointer  ${ currentPage === 1 ? 'bg-transparent text-gray-500':'bg-white'} `}>Prev</button>
                            {
                                pages?.map((page,index) =>  <li key={index} onClick={() => setCurrentPage(index)} className={`py-1 px-3 border rounded cursor-pointer ${currentPage === index+1 ? 'bg-primary text-white':'text-gray-800 bg-white'}`}>{++index}</li> )
                            }
                            <button onClick={() => handleNextPage(currentPage)} disabled={countPage === currentPage} className={`py-1 px-3 border rounded cursor-pointer  ${countPage === currentPage ? 'bg-transparent text-gray-500':'bg-white'} `}>Next</button>
                        </ul>
                
                </div>
            </div>
        </>
    );
};

export default AllProducts;