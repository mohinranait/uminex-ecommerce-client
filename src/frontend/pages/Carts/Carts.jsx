
import { Link } from "react-router-dom";
import CartItems from "../../components/CartItems/CartItems";
import { useState } from "react";


const Carts = () => {
    const myCarts = [
        {_id: 1, name: "Camera mobile", img:'https://demo-uminex.myshopify.com/cdn/shop/files/col_3_3.png?v=1681548716&width=1500', quantity:1,color:'Red'},
        {_id: 2, name: "Game controllers", img:'https://demo-uminex.myshopify.com/cdn/shop/files/col_3_4.png?v=1681548715&width=1500', quantity:2,color:'White'},
        {_id: 3, name: "Table ipads", img:'https://demo-uminex.myshopify.com/cdn/shop/files/col_3_5.png?v=1681548716&width=1500', quantity:1,color:'Blue'},
    ]

    const [carts , setCarts] = useState(myCarts);

    const handleCartDeletes = (id) => {
        if(id) {
            const filter = carts?.filter(cart => cart?._id !== id );
            setCarts(filter)
        }
    }

    return (
        <>
            <section className="my-4">
                <div className="box">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
                        <div className="md:col-span-1 lg:col-span-2 bg-white py-7">
                            <div className="lg:px-5">
                                {
                                    carts?.map(cart => <CartItems key={cart?._id} cart={cart} handleCartDeletes={handleCartDeletes} />)
                                }
                            </div>
                            {
                                carts?.length == 0 && <div className="flex h-full items-center justify-center">
                                    <div>
                                        <p className="text-center text-xl text-secondary font-semibold mb-2">Product not found in your shopping cart</p>
                                        <p className="text-center font-medium text-gray-500">Continue Shopping <Link to={'/'} className="text-primary">Click</Link></p>
                                        <div>
                                            <img className="max-w-[200px] mx-auto" src="https://cdni.iconscout.com/illustration/premium/thumb/girl-with-email-trash-9573397-7826327.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="">
                            <div className="bg-white shadow px-5 pb-5 pt-7">
                                <div className="uppercase text-base font-semibold text-center py-2 rounded-md text-text-color bg-[#F8F7FD]">Unregisterd Account</div>
                                <div className="flex py-5 gap-3 font-semibold">
                                    <p className="text-secondary">Free Delivery for </p>
                                    <p className="">$1000</p>
                                </div>
                                <span className="w-full block border-b"></span>
                                <ul className="space-y-4 my-5">
                                    <li className="flex items-center justify-between">
                                        <span className="text-gray-500 font-medium text-lg">Order Summery  </span>
                                        <span className="text-gray-600 text-lg font-semibold">$100</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-gray-500 font-medium text-lg">Tax</span>
                                        <span className="text-gray-600 text-lg font-semibold">$10</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-gray-500 font-medium text-lg">Additional Service</span>
                                        <span className="text-[#4773ec] text-lg font-semibold">$20</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-gray-800 font-bold text-lg">Total Amount</span>
                                        <span className="text-gray-800 text-lg font-bold">$130</span>
                                    </li>
                                </ul>
                                <Link className="w-full block font-semibold rounded-md text-center py-2 text-primary bg-[#deecff] ">Order now</Link>
                                <Link className="w-full block font-semibold rounded-md text-center py-2 text-gray-700 mt-4  ">Continue Shopping</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-7">
                <div className="box">
                    <div className="grid grid-cols-1  lg:grid-cols-3 gap-2 lg:gap-5">
                        <div className="md:col-span-1 lg:col-span-2  ">
                            <div className="mb-4">
                                <p className="text-xl font-bold text-gray-900 ">Delivery</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="flex items-center gap-4 bg-white rounded-md px-5 py-10">
                                    <div>
                                        <img className="w-[120px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/DPD_logo_%282015%29.svg/2560px-DPD_logo_%282015%29.svg.png" alt="" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-semibold text-gray-800">DPD delivery</p>
                                        <p className="text-sm font-semibold text-gray-500">Exponend delivery founding</p>
                                    </div>
                                    <div>
                                        <p className="text-base md:text-lg font-bold ">$20</p>
                                    </div>
                                </div>
                               
                                <div className="flex items-center gap-4 bg-white rounded-md px-5 py-6">
                                    <div>
                                        <img className="w-[120px]" src="https://assets.turbologo.com/blog/en/2019/12/19084817/Fedex-logo.png" alt="" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-semibold text-gray-800">FedEx delivery</p>
                                        <p className="text-sm font-semibold text-gray-500">Exponend delivery founding</p>
                                    </div>
                                    <div>
                                        <p className="text-base md:text-lg font-bold ">$20</p>
                                    </div>
                                </div>
                               
                                <div className="flex items-center gap-4 bg-white rounded-md px-5 py-6">
                                    <div>
                                        <img className="w-[120px] " src="https://allvectorlogo.com/img/2021/12/ups-logo-vector.png" alt="" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-semibold text-gray-800">UPS delivery</p>
                                        <p className="text-sm font-semibold text-gray-500">Exponend delivery founding</p>
                                    </div>
                                    <div>
                                        <p className="text-base md:text-lg font-bold ">$20</p>
                                    </div>
                                </div>
                               
                                <div className="flex items-center gap-4 bg-white rounded-md px-5 py-6">
                                    <div>
                                        <img className="w-[120px] " src="https://www.redx.com/wp-content/uploads/OnlyArtboard-6Logo.png" alt="" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-semibold text-gray-800">RedX delivery</p>
                                        <p className="text-sm font-semibold text-gray-500">Exponend delivery founding</p>
                                    </div>
                                    <div>
                                        <p className="text-base md:text-lg font-bold ">$20</p>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                        
                        <div>
                            <div className="mb-4">
                                <p className="text-xl font-bold text-gray-900 ">Another Services</p>
                            </div>
                            <div>
                                <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
                                    <li className="bg-white rounded-md py-3 px-5 flex justify-between gap-4 items-center">
                                        <div>
                                            <p className="text-gray-800 font-semibold text-xl">Cash on delivery</p>
                                            <p className="text-gray-500 font-medium">Lorem ipsum dolor sit amet.</p>
                                        </div>
                                        <div>
                                            <p className="text-base md:text-lg font-bold ">$20</p>
                                        </div>
                                    </li>
                                    <li className="bg-white rounded-md py-3 px-5 flex justify-between gap-4 items-center">
                                        <div>
                                            <p className="text-gray-800 font-semibold text-xl">Home delivery</p>
                                            <p className="text-gray-500 font-medium">Lorem ipsum dolor sit amet.</p>
                                        </div>
                                        <div>
                                            <p className="text-base md:text-lg font-bold ">$20</p>
                                        </div>
                                    </li>
                                    <li className="bg-white rounded-md py-3 px-5 flex justify-between gap-4 items-center">
                                        <div>
                                            <p className="text-gray-800 font-semibold text-xl">Recive Office</p>
                                            <p className="text-gray-500 font-medium">Lorem ipsum dolor sit amet.</p>
                                        </div>
                                        <div>
                                            <p className="text-base md:text-lg font-bold text-gray-600">Free</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                 
                </div>
            </section>

            
        </>
    );
};

export default Carts;