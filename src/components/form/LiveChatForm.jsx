import { useState } from "react";
import { LuSend } from "react-icons/lu";
import InputEmoji from "react-input-emoji"
import useAxios from "../../hooks/useAxios";

const LiveChatForm = ({chat,setSendMessage,currentUser,messages, setMessages}) => {
    const axios = useAxios();
    const [newMessage, setNewMessage] = useState('')



     // Create new message
     const handleNewMessage = async () => {
        const msgObj = {
            chatId : chat?._id,
            senderId : currentUser,
            text : newMessage,
        }

        // Send message to socket server
        const receiverId = chat?.members?.find(id => id !== currentUser )
        setSendMessage({...msgObj, receiverId})

        try {
            // Send message to database from client
            const {data} = await axios.post(`/message`, msgObj);
            setMessages([...messages, data])
            setNewMessage('')
        } catch (error) {
            console.log(error);
        }
    }
   
    // handle input form change method
    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    return (
        <>
            <div className="w-full">
                <InputEmoji
                    value={newMessage}
                    onChange={handleChange}
                />
            </div>
            <button onClick={handleNewMessage} className='py-1 px-2 text-xl  text-primary rounded-r-md'>
                <LuSend />
            </button>
        </>
    );
};

export default LiveChatForm;