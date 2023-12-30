import { Link, useNavigate } from "react-router-dom";


const Notfound = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1)
    }
    return (
        <>
            <div className="flex h-[calc(100vh-120px)] items-center justify-center">
                <div>
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-page-not-available-9561127-7706458.png" alt="" />
                    <div className="flex justify-center gap-4 mt-5">
                        <Link to={'/'} className="px-5 py-2 inline-block rounded hover:bg-primary bg-blue-700 text-white ">Home</Link>
                        <button onClick={handleGoBack} className="px-5 py-2 inline-block rounded hover:bg-primary bg-blue-700 text-white ">Go Back</button>
                    </div>
                </div>
            </div>   
        </>
    );
};

export default Notfound;