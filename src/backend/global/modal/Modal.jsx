/* eslint-disable react/prop-types */

const Modal = ({children, closeModal, isOpenModal}) => {
    const handleStopPropa = (e) => {
        e.stopPropagation()
    }
    
    return (
        <>
            <div onClick={closeModal} className={`fixed top-0 left-0 w-full z-[99999]  flex justify-center items-center h-screen bg-black bg-opacity-50 transition-all ${isOpenModal ? 'scale-100' : 'scale-0 opacity-0' } `}>
                <div onClick={handleStopPropa} className={` bg-white relative z-40  overflow-y-auto   py-4  px-4 rounded-md`} >
                    <div className="">
                        {children}
                    </div>
                </div>
            </div>   
        </>
    );
};

export default Modal;