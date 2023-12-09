import { useLoaderData } from "react-router-dom";
import ProductForm from "../components/form/ProductForm";


const EditProduct = () => {
    const {product} = useLoaderData();

    return (
        <div className='mb-16'>
           <ProductForm product={product} />
        </div>
    );
};

export default EditProduct;