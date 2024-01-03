import Select from 'react-select'

const LaptopFeatures = ({selectColors, setSelectColors, formateColors  }) => {
    return (
        <>
             <div className="rounded-md bg-white border border-gray-100 ">
                <div className="flex items-center justify-between px-5 py-4">
                    <p>Product key features</p>
                    <button>Add brand</button>
                </div>
                <hr />
                <div className="px-5 py-5">
                    <div className="grid lg:grid-cols-3 gap-6 mt-1">
                        <div>
                            <div className='mb-5'>
                                <input type="text" readOnly value="Color"  className="py-2 px-3 w-full bg-gray-100 border outline-none transition-all  rounded-md border-gray-200" />
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <div className='mb-5'>
                                <Select 
                                    name='colors'
                                    value={selectColors}
                                    options={formateColors} 
                                    isMulti
                                    onChange={(e) => setSelectColors(e) }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6 mt-1">
                        <div>
                            <div className='mb-5'>
                                <input type="text" readOnly value="Model"  className="py-2 px-3 w-full bg-gray-100 border outline-none transition-all  rounded-md border-gray-200" />
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <div className='mb-5'>
                                <input type="text"  name="model"  className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200"  />
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6 mt-1">
                        <div>
                            <div className='mb-5'>
                                <input type="text" readOnly value="Screen resulatoin"  className="py-2 px-3 w-full bg-gray-100 border outline-none transition-all  rounded-md border-gray-200" />
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <div className='mb-5'>
                                <input type="text"  name="screenResulation"  className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200"  />
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6 mt-1">
                        <div>
                            <div className='mb-5'>
                                <input type="text" readOnly value="Processor"  className="py-2 px-3 w-full bg-gray-100 border outline-none transition-all  rounded-md border-gray-200" />
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <div className='mb-5'>
                                <input type="text"  name="processor"  className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200"  />
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6 mt-1">
                        <div>
                            <div className='mb-5'>
                                <input type="text" readOnly value="Screen Size"  className="py-2 px-3 w-full bg-gray-100 border outline-none transition-all  rounded-md border-gray-200" />
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <div className='mb-5'>
                                <input type="text"  name="screenSize"  className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200"  />
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6 mt-1">
                        <div>
                            <div className='mb-5'>
                                <input type="text" readOnly value="Features"  className="py-2 px-3 w-full bg-gray-100 border outline-none transition-all  rounded-md border-gray-200" />
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <div className='mb-5'>
                                <input type="text"  name="features"  className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LaptopFeatures;