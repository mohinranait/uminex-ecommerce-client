/* eslint-disable react/prop-types */
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";

const AddressForm = ({refetch,singleAddress, setIsAddress}) => {
    const {_id, fullName, mobile, address, division, district,policeStation} = singleAddress || {};
    const [deliveryLocation, setDeliveryLocation] = useState('home')
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    const {user} = useAuth();
    const axios = useAxios();



    const handleAddressForm = async (data) => {
        const fullName = data.fullname;
        const mobile = data.mobile;
        const address = data.address;
        const division = data.division;
        const district = data.district;
        const policeStation = data.policeStation;
        const addressObj = {fullName, mobile, address, division, district, policeStation, deliveryLocation, user: user?._id}

        try {
            if(user?._id){
                if(_id){
                    const {data} = await axios.patch(`/address/${_id}?email=${user?.email}`, addressObj);
                    if(data.success){
                        toast.success("Successfull")
                        setIsAddress(false)
                        refetch();
                    }
                }else{
                    const {data} = await axios.post(`/address?email=${user?.email}`, addressObj);
                    if(data.success){
                        toast.success("Successfull")
                        refetch();
                    }
                }
               
            }
        } catch (error) {
            toast.error(error.message)
        }
    } 
    return (
        <>
            <form onSubmit={handleSubmit(handleAddressForm)} className="bg-white py-8 space-y-2 px-5">
                <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 mb-10">
                    <div className="col-span-2"> 
                        <label htmlFor="" className="text-gray-600 text-sm">Full name</label>
                        <input type="text" name="fullname" {...register("fullname", { required: "Full name is require" })} defaultValue={ fullName ? fullName :   user?.name || ''} className="py-2 w-full border outline-primary pl-3 border-gray-300 rounded-md" />
                        {errors.fullname && <p className="text-xs text-red-500">{errors.fullname.message}</p>}
                    </div>
                    <div> 
                        <label htmlFor="" className="text-gray-600 text-sm">Mobile Number</label>
                        <input type="number" name="mobile" {...register("mobile", { required: "Mobile is require" })} defaultValue={ mobile || ''} className="py-2 w-full border outline-primary pl-3 border-gray-300 rounded-md" />
                        {errors.mobile && <p className="text-xs text-red-500">{errors.mobile.message}</p>}
                    </div>
                    <div> 
                        <label htmlFor="" className="text-gray-600 text-sm">Address</label>
                        <input type="text" name="address" {...register("address", { required: "Address is require" })} defaultValue={address || '' } className="py-2 w-full border outline-primary pl-3 border-gray-300 rounded-md" />
                        {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                    </div>
                    
                    <div> 
                        <label htmlFor="" className="text-gray-600 text-sm">Division</label>
                        <input type="text" name="division" {...register("division", { required: "Division is require" })} defaultValue={division || ''} className="py-2 w-full border outline-primary pl-3 border-gray-300 rounded-md" />
                        {errors.division && <p className="text-xs text-red-500">{errors.division.message}</p>}
                    </div>
                    <div> 
                        <label htmlFor="" className="text-gray-600 text-sm">District</label>
                        <input type="text" name="district" {...register("district", { required: "District is require" })} defaultValue={district || ''} className="py-2 w-full border outline-primary pl-3 border-gray-300 rounded-md" />
                        {errors.district && <p className="text-xs text-red-500">{errors.district.message}</p>}
                    </div>
                    <div> 
                        <label htmlFor="" className="text-gray-600 text-sm">Police Station</label>
                        <input type="text" name="policeStation" {...register("policeStation", { required: "Full name is require" })} defaultValue={policeStation || ''} className="py-2 w-full border outline-primary pl-3 border-gray-300 rounded-md" />
                        {errors.policeStation && <p className="text-xs text-red-500">{errors.policeStation.message}</p>}
                    </div>
                    <div> 
                        <label htmlFor="" className="text-gray-600 text-sm">Select effective delivery</label>
                        <div className="flex items-center justify-center gap-5">
                            <span onClick={() => setDeliveryLocation('home')} className={`py-3 w-full border  rounded text-center text-sm cursor-pointer  ${deliveryLocation == 'home' ? 'border-primary text-primary' : 'border-gray-200'}`}>Home</span>
                            <span onClick={() => setDeliveryLocation('office')} className={`py-3 w-full border  rounded text-center text-sm cursor-pointer  ${deliveryLocation == 'office' ? 'border-primary text-primary' : 'border-gray-200'}`}>Office</span>
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex justify-between items-center">
                    <button onClick={() => setIsAddress(false)} className="border border-gray-200 py-3 hover:bg-gray-200 px-5 rounded-md text-sm">Close </button>
                    <button type="submit" className=" px-8 py-3 text-sm bg-primary text-white border border-gray-200 rounded-md">{ _id ? "Update address" : 'Save address' }</button>
                </div>
            </form>
        </>
    );
};

export default AddressForm;