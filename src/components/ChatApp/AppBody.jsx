
import {format} from "timeago.js"

const AppBody = ({messages,currentUser}) => {
   
    
    return (
        <>
             <div className='h-full pb-2 flex flex-col justify-end bg-white overflow-y-auto px-3 space-y-2'>
                {
                    messages?.map((msg,index) =>  <p key={index} className={`text-sm font-medium  ${msg?.senderId == currentUser ? 'text-right': "text-left"}`}>
                    <span className={` max-w-[70%] inline-block px-2 py-1  ${msg?.senderId == currentUser ? 'bg-blue-600 text-white rounded-l rounded-t text-left':'bg-gray-200 text-gray-800 rounded-r rounded-b'} `}>
                        <p>{msg?.text}</p>
                        <p className="text-xs">{ format(msg?.createdAt) }</p>
                    </span>
                   
                </p> )
                }
            </div>
        </>
    );
};

export default AppBody;