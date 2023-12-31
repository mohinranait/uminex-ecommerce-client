import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import useWishlists from "../../../hooks/useWishlists";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductPlaceholder from "../../components/Loding/ProductPlaceholder";
import { Helmet } from "react-helmet-async";


const Wishlists = () => {
    const axios = useAxios();
    const {user} = useAuth();
    const [wishlists,refetch,isPending] = useWishlists();
    
      // Handle remove product for wishlist
      const handleRemoveProduct = async (id) => {
        try {
            if(user?._id){
                const {data} = await axios.delete(`/remove-product-for-wishlist?product_id=${id}&email=${user?.email}&user_id=${user?._id}`)
                if(data.success){
                    toast.success("Removed from wishlist")
                    refetch();
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <Helmet>
                <title> Favorite Products | Store MI</title>
            </Helmet>
            <div>
                <p className="mb-1 text-gray-700 text-lg font-semibold">Wishlists ({wishlists?.wishlists?.length})</p>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {
                        isPending  && [0,1,2,3].map( item => <ProductPlaceholder key={item} /> )
                    }
                    {
                        wishlists?.wishlists?.map(product => <ProductCard key={product?._id} product={product?.product} another={{functionName:handleRemoveProduct}} /> )
                    }
                </div>
            </div>   
        </>
    );
};

export default Wishlists;