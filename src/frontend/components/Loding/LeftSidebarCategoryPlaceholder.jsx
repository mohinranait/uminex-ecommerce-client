
export const ListPlaceholder = () => {
    return (
        <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 divide-x-2">
                <div className="h-5 bg-slate-200 rounded py-3"></div>
            </div>
        </div>
    )
}

const LeftSidebarCategoryPlaceholder = () => {
    return (
        <>
            <div className=" rounded-md max-w-sm w-full mx-auto">
                
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 px-4 divide-x-2">
                    {
                        [0,1,2,3,4,5,6,7,8,9].map(item => <ListPlaceholder key={item} /> )
                    }
                    </div>
                </div>
            </div>   
        </>
    );
};

export default LeftSidebarCategoryPlaceholder;