import { useEffect, useState } from "react";
import LiveChatForm from "../form/LiveChatForm";
import AppBody from "./AppBody";
import useAxios from "../../hooks/useAxios";



const ChatBox = ({chat, currentUser,setSendMessage,receiveMessage}) => {
    const axios = useAxios();
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState(null)


  


    // Chat header information for user
    useEffect(() => {
        const userId = chat?.members?.find(item => item !== currentUser )
        const getUserData = async () => {
            try {
                const {data} = await axios.get(`/user-by-id/${userId}`)
                setUserData(data?.user);
            } catch (error) {
                console.log(error)
            }
        };
        if(chat !== null) getUserData();
    },[chat])

    // fetch all message by convercation ID
    useEffect(() => {
        const getMessages = async () => {
            const {data} = await axios.get(`/message/${chat?._id}`)
            setMessages(data);
        }
        if(chat !== null) getMessages();
    },[chat]);



  

    // Receice message
    useEffect(() => {
        if(receiveMessage !== null && receiveMessage?.chatId === chat?._id){
            setMessages([...messages, receiveMessage])
        }
    },[receiveMessage])


    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                    {
                        chat? (  <div className="bg-gray-200 h-[calc(100vh-54px)] flex flex-col">
                        <div className="h-[60px] bg-white flex items-center ">
                            <span className="flex gap-2 items-center">
                                <span className="w-8 h-8 rounded-full"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLfBIu29jWkRggduFwRWBxp_wbcnLVzsMpInNKsDBMZA&s" alt="" /></span>
                                <span>
                                    <p className="font-medium text-base">{userData?.name}</p>
                                    <p className="text-xs font-normal">Active</p>
                                </span>
                            </span>
                        </div> 
                        <div className="flex-grow">
                            <AppBody messages={messages} currentUser={currentUser}  />
                        </div>
                        <div className="h-[60px] bg-white flex items-center">
                            <div  className='flex w-full '>
                                <LiveChatForm
                                chat={chat}
                                currentUser={currentUser}
                                messages={messages}
                                setMessages={setMessages}
                                setSendMessage={setSendMessage}
                                />
                                {/* <div className="w-full">
                                    <InputEmoji
                                        value={newMessage}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button onClick={handleNewMessage} className='py-1 px-2 text-xl  text-primary rounded-r-md'>
                                    <LuSend />
                                </button> */}
                            </div>
                        </div>
                    </div>) : (
                        <div>
                            <span>Tap on a chat and start convercation</span>
                        </div>
                    )
                    }
                  
                </div>
                <div className="col-span-2"></div>
            </div>
        </>
    );
};

export default ChatBox;