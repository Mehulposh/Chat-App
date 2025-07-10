import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./Authcontext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({children} ) => {
    const [messages,setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMsg, setUnseenMsg] = useState({});

    const {socket,axios} = useContext(AuthContext);

    //function to get all users
    const getUsers = async () => {
        try {
           const {data} = await axios.get('/api/messages/users');
           
           if(data.success){
            setUsers(data.users);
            setUnseenMsg(data.unseenMsg);
           }


        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to get messages for selected user
    const getMessages = async (userID) =>{
        try {
            const {data} = await axios.get(`/api/messages/${userID}`);

            if(data.success){
                setMessages(data.messages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to send message
    const sendMessage = async (messagesData) => {
        try {
            const {data} = await axios.post(`/api/messages/send/${selectedUser._id}`,messagesData);

            if(data.success){
                setMessages((prev) => [...prev, data.newMessage]);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to subscribe to messages for selectd user
    const subscribeToMessages = async () => {
        if(!socket) return;

        socket.on('newMwssage' , (newMessage) => {
            if(selectedUser && newMessage.senderID === selectedUser._id){
                newMessage.seen = true;
                setMessages((prev) => [...prev,newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            }else{
                setUnseenMsg((prev) => ({
                    ...prev,
                    [newMessage.senderID ]: prev[newMessage.senderID] ? prev[newMessage.senderID] + 1 : 1,  
                }))
            }
        })
    }


    //function to insubscribe
    const unSubscribe = async () => {
        if(socket) socket.off('newMwssage');
    }

    useEffect(() => {
        subscribeToMessages();

        return () => unSubscribe();
    },[socket,selectedUser]);


    //value object for context
    const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        setMessages,
        sendMessage,
        setSelectedUser,
        unseenMsg,
        setUnseenMsg,
    }
    return(
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}