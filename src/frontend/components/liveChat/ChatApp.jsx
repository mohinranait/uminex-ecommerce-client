import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import LiveChatForm from "../../../components/form/LiveChatForm";
import AppBody from "../../../components/ChatApp/AppBody";
import {io} from "socket.io-client"

const ChatApp = ({product, chatModal,setChatModal}) => {
    // const [isOpen, setIsOpen] = useState(false);
    const {user} = useAuth();
    const axios = useAxios();
    const [currentChat, setCurrentChat ] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState(null)
    const [messages, setMessages] = useState([])
    const [receiverUser, setReceiverUser] = useState(null);
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)
    const socket = useRef();

    console.log(receiveMessage);
    console.log(import.meta.env.VITE_SOCKET_SERVER);
    // Connect secket server
    useEffect(() => {
        // socket.current = io(`http://localhost:8800`);
        socket.current = io(`${import.meta.env.VITE_SOCKET_SERVER}`);
        socket.current.emit('new-user-add', user?._id)
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users);
        })
    },[user])

    // Receive message using socket
    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            console.log('recive');
            setReceiveMessage(data)
        })
    },[])

    // send message using socket
    useEffect(() => {
        if(sendMessage !== null){
            socket.current.emit('send-message', sendMessage)
        }
    },[sendMessage])

    // Send message to socket io
    useEffect(() => {
        if(sendMessage !== null){
           
            socket.current.emit('send-message', sendMessage)
        }
    },[sendMessage])
    console.log(sendMessage);

    // handle find create or find chat
    const handleModal = async () => {
        // setIsOpen(!isOpen)
        setChatModal(!chatModal)

        try {
            const newChat = {
                senderId: user?._id,
                receiverId : product?.author?._id,
            }
            if(user?._id){
                const {data} = await axios.post(`/chat`, newChat)
                setCurrentChat(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Header or receiver information get / receiver USER
    useEffect(() => {
        const getReceiverInfo = async () => {
            try {
                const receiverId = currentChat?.members?.find(id => id !== user?._id);
                const {data} = await axios.get(`/user-by-id/${receiverId}`)
                setReceiverUser(data?.user);
            } catch (error) {
                console.log(error);   
            }
        }
        if(currentChat !== null) getReceiverInfo()
    },[currentChat])


    // fetch current messages 
    useEffect(() => {
        const getMessages = async () => {
            const {data} = await axios.get(`/message/${currentChat?._id}`, )
            setMessages(data);
        }
        if(currentChat !== null) getMessages();
    },[currentChat])



    useEffect(() => {
        if(receiveMessage !== null && receiveMessage?.chatId === currentChat?._id){
            setMessages([...messages, receiveMessage])
        }
    },[receiveMessage])
    
    return (
        <>
             <div className='fixed right-0 bottom-0 mb-2'>
                <span onClick={() => handleModal() } className=' mr-20 px-4 py-2 cursor-pointer mb-2 bg-primary text-white text-sm'>Live chat</span>
            </div>
            <div className={`w-[400px] md:w-[400px] flex flex-col  bg-white border h-[500px] fixed mr-10 z-[100] bottom-10 right-0 ${chatModal ? 'block': 'hidden'}`}>
                <div className='px-3 flex items-center justify-between border-b h-[60px]'>
                    <span className='flex gap-1 items-center'>
                        <img className='w-10 h-10 rounded-full' src="https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg" alt="" />
                        <div className='flex flex-col'>
                            <span className='text-base font-medium'>{receiverUser?.name}</span>     
                            <span className='text-xs font-normal'>Active</span>     
                        </div>
                    </span>
                    <span onClick={() => setChatModal(!chatModal)} className='w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 cursor-pointer'>
                        <IoMdClose />
                    </span>
                </div>
                <div className='flex-grow overflow-y-scroll'>
                    <AppBody messages={messages} currentUser={user?._id} />
                </div>
                <div className='border-t h-[70px] flex items-center px-3'>
                    <LiveChatForm 
                        setSendMessage={setSendMessage}
                        chat={currentChat} 
                        currentUser={user?._id}
                        messages={messages}
                        setMessages={setMessages}
                    />
                </div>
            </div>
            
        </>
    );
};

export default ChatApp;