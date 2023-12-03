import React from 'react';
import { Link } from 'react-router-dom';

const CoverProduct = () => {
    return (
        <section>
            <div className='box mt-10 lg:mt-0'>
                <div className='grid lg:grid-cols-2 gap-6'>
                    <div className='relative group w-full bg-white p-4'>
                        <div className='absolute w-full h-full flex items-center  pl-10 top-2/4 left-0 -translate-y-2/4'>
                            <div className='relative '>
                                <p className='text-xl z-30 text-text-color mb-1 font-semibold'>Gamepad</p>
                                <p className='text-sm z-30 text-gray-600 font-medium mb-2'>Optionals Skins</p>
                                <div><Link className='text-primary text-sm font-semibold'>Details new</Link></div>
                            </div>
                        </div>
                        <img className='w-full' src="https://demo-uminex.myshopify.com/cdn/shop/files/3_4_720x.png?v=1681719070" alt="" />
                    </div>
                    <div className='relative group w-full bg-white p-4'>
                        <div className='absolute w-full h-full flex items-center  pl-10 top-2/4 left-0 -translate-y-2/4'>
                            <div className='relative '>
                                <p className='text-xl z-30 text-text-color mb-1 font-semibold'>Gamepad</p>
                                <p className='text-sm z-30 text-gray-600 font-medium mb-2'>Optionals Skins</p>
                                <div><Link className='text-primary text-sm font-semibold'>Details new</Link></div>
                            </div>
                        </div>
                        <img className='w-full' src="https://demo-uminex.myshopify.com/cdn/shop/files/3_5_720x.png?v=1681719083" alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoverProduct;