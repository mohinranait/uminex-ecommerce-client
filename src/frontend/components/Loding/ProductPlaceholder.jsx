
const ProductPlaceholder = () => {
    return (
        <>
            <div className=" shadow-sm bg-white rounded-md p-3 max-w-sm w-full mx-auto">
                <div className="animate-pulse  space-x-4">
                    <div className="flex-1 flex flex-col space-y-4 py-1">
                        <div className="h-[180px] bg-slate-200 rounded"></div>
                        <div className="h-4 bg-slate-200 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-3 bg-slate-200 rounded col-span-1"></div>
                                <div className="h-3 bg-slate-200 rounded col-span-2"></div>
                            </div>
                        </div>
                        <div className="space-y-3 flex-grow">
                            <div className="grid grid-cols-3">
                                <div className="h-3 bg-slate-200 rounded col-span-2"></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex grid-cols-3 justify-between gap-4">
                                <div className="h-5 w-[30%] bg-slate-200 rounded col-span-1"></div>
                                <div className="h-5 w-[20%] bg-slate-200 rounded col-span-1"></div>
                            </div>
                        </div>
                    </div>
                  
                </div>
            </div>  
        </>
    );
};

export default ProductPlaceholder;