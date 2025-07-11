import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {io} from 'socket.io-client';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token,setToken] = useState(localStorage.getItem('token'));
    const [authUser, setAuthUser] = useState(null)
    const [onlineUser, setOnlineUser] = useState([]);
    const [socket, setSocket] = useState(null);

    //check if user is authenticated and if so , set the user data and connect the socket 
    const checkAuth = async () => {
        try {
            const {data} = await axios.get('/api/auth/check');
            if(data.success ){
                setAuthUser(data.user);
                connectSocket(data.user);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //login function to handle user authentication and socket connection 
    const login = async (state,credentials) => {
        try {
            const response = await axios.post(`/api/auth/${state}`, credentials);
            const data = response.data;

            if(data.success){
                setAuthUser(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common['token'] = data.token;
                setToken(data.token);
                localStorage.setItem('token',data.token); 
                toast.success(data.message);
            }else{
                console.log(data.message)
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    //logout function to handle user logour and socket connection
    const logout = async () => {
        localStorage.removeItem('token');
        setToken(null);
        setAuthUser(null);
        setOnlineUser([]);
        axios.defaults.headers.common['token'] = null;
        toast.success('logout successfull');
        socket.disconnect();
    }

    //update profile to handle profile update 
    const updateProfile = async (body) => {
        try {
            const response = await axios.put('/api/auth/update-profile',body);
            const data = response.data;
            console.log(data);
            if(data.success){
                setAuthUser(data.user);
                toast.success('profile updated');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    //connect socket function handle socket connection and online user updates
    const connectSocket = (userData) => {
        if(!userData || socket?.connected) return ;
        const newSocket = io(backendUrl,{
           query: {userId: userData._id,}
        });
        newSocket.connect();
        setSocket(newSocket);
        console.log(socket);

        newSocket.on('getOnlineUsers', (userIds) => {
            
            setOnlineUser(userIds)
            
        })
    }

    // useEffect(() => {
    //     console.log("Online users updated:", onlineUser);
    //     console.log("Socket:", socket);

    // }, [onlineUser,socket]);


    useEffect(() => {
        if(token){
            axios.defaults.headers.common['token'] = token;
        }
        checkAuth();

    },[]);

    const value = {
        axios,
        token,
        authUser,
        onlineUser,
        socket,
        login,
        logout,
        updateProfile,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}