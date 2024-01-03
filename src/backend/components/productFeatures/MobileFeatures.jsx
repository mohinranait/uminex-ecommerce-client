import { useState } from 'react';
import Select from 'react-select'

const MobileFeatures = ({selectColors, setSelectColors, formateColors,mobileFeatures , setMobileFeatures  }) => {
    
    const [model, setModel] = useState('')
    const [ramRom, setRamRom] = useState('')
    const [processor, setProcessor] = useState('')
    const [screenSize, setScreenSize] = useState('')
    const [fontCamera, setFontCamera] = useState('')
    const [backCamera, setBackCamera] = useState('')
    const [battery, setBattery] = useState('')
    const [screenRedulation, setScreenRedulation] = useState('')

    const handleModel = (e) => {
        
    }
  

    const clickHandle = () => {
        console.log(model);
    }
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
                                <input type="text"  name="model" onChange={(e) => handleModel(e)}  className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200"  />
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6 mt-1">
                        <div>
                            <div className='mb-5'>
                                <input type="text" readOnly value="Ram/Rom"  className="py-2 px-3 w-full bg-gray-100 border outline-none transition-all  rounded-md border-gray-200" />
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <div className='mb-5'>
                                <input type="text"  name="ram_rom"  onChange={(e) => handleModel(e)} className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200"  />
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
                                <input type="text"  name="processor" onChange={(e) => handleModel(e)} className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200"  />
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
                                <input type="text"  name="screen_size"  className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200"  />
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6 mt-1">
                        <div>
                            <div className='mb-5'>
                                <input type="text" readOnly value="Font camera"  className="py-2 px-3 w-full bg-gray-100 border outline-none transition-all  rounded-md border-gray-200" />
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <div className='mb-5'>
                                <input type="text"  name="fontCamera"  className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200"  />
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6 mt-1">
                        <div>
                            <div className='mb-5'>
                                <input type="text" readOnly value="Back camera"  className="py-2 px-3 w-full bg-gray-100 border outline-none transition-all  rounded-md border-gray-200" />
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <div className='mb-5'>
                                <input type="text"  name="backCamera"  className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200"  />
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6 mt-1">
                        <div>
                            <div className='mb-5'>
                                <input type="text" readOnly value="Battery"  className="py-2 px-3 w-full bg-gray-100 border outline-none transition-all  rounded-md border-gray-200" />
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <div className='mb-5'>
                                <input type="text"  name="battery"  className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200"  />
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6 mt-1">
                        <div>
                            <div className='mb-5'>
                                <input type="text" readOnly value="Screen resulation"  className="py-2 px-3 w-full bg-gray-100 border outline-none transition-all  rounded-md border-gray-200" />
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <div className='mb-5'>
                                <input type="text"  name="screenRedulation"  className="py-2 px-3 w-full border transition-all outline-primary focus:pl-5 rounded-md border-gray-200"  />
                            </div>
                        </div>
                    </div>
                    <button onClick={clickHandle}>click</button>
                </div>
            </div>
        </>
    );
};

export default MobileFeatures;