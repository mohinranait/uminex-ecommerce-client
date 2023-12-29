
import useAuth from "../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Convercation from "../../components/ChatApp/Convercation";
import ChatBox from "../../components/ChatApp/ChatBox";
import {io} from "socket.io-client"

const LiveChatFromAdmin = () => {
    const axios = useAxios();
    const {user} = useAuth();
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null);
    const socket = useRef()


   

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
            setReceiveMessage(data)
        })
    },[])

    // send message using socket
    useEffect(() => {
        if(sendMessage !== null){
            socket.current.emit('send-message', sendMessage)
        }
    },[sendMessage])
    console.log(sendMessage);
    // Find current convercation
    useEffect(() => {
        const findUser = async () => {
            try {
                const {data} = await axios.get(`/chat/${user?._id}`);
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        }
        findUser();
    },[user])

    return (
        <>
            <div>
                <div className="grid grid-cols-5  bg-white">
                    <div>
                        <div>
                            <ul className="bg-white">
                                {
                                    chats?.map(chat => (
                                        <li onClick={() => setCurrentChat(chat)} key={chat?._id} className="cursor-pointer">
                                            <Convercation  chat={chat} currentUser={user?._id} />
                                        </li>
                                    ) )
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <ChatBox chat={currentChat} currentUser={user?._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LiveChatFromAdmin;