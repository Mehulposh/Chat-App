import React,{useContext} from 'react'
import {ChatContext} from '../../context/ChatContext';
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import Rightbar from '../components/Rightbar'


const Home = () => {
  const {selectedUser} = useContext(ChatContext);
  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%] '>
        <div className={`border-2 border-gray-600 rounded-2xl overflow-hidden 
            h-[100%] grid grid-cols-2 relative backdrop-blur-xl ${selectedUser ? 
            "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]" : "md:grid-cols-2" }`}
        >
            <Sidebar />
            <ChatContainer/>
            <Rightbar  />
        </div>
    </div>
  )
}

export default Home