import { useLoaderData } from "react-router-dom";
import "../../../global.css"
import HomeBanner from '../../components/Section/HomeBanner';
import ProductSection from "../../components/Section/ProductSection";
import CoverProduct from "../../components/Section/CoverProduct";
import DisplayProducts from "../../components/Section/DisplayProducts";

const Home = () => {
    const products = useLoaderData()
  
    return (
        <>
            <HomeBanner />
            <CoverProduct />
            <ProductSection products={products} />

            <section className="py-5 ">
                <div className="box">
                    <div className="relative  h-[180px] lg:h-auto">
                        <a href="#" className="absolute  w-full h-full flex items-center">
                            <div className="pl-3 lg:pl-10">
                                <p className="text-xl font-semibold text-white">Apply Card today and <span className="text-[#ffc600]">get Discount</span> </p>
                                <p className="text-gray-400">In rewards on your first day of purchase when you are approved for the card.</p>
                            </div>
                        </a>
                        <img src="https://demo-uminex.myshopify.com/cdn/shop/files/img_1_4.png?v=1673237940&width=1500" className="object-cover rounded-md  h-full lg:h-auto" alt="" />
                    </div>
                </div>
            </section>

            <DisplayProducts products={products} />

        </>
    );
};

export default Home;