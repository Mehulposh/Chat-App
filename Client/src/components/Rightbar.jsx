import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/Authcontext';

const Rightbar = () => {
    const {selectedUser, messages} = useContext(ChatContext);
    const {logout,onlineUser} = useContext(AuthContext);

    const [msgImg,setMsgImg] = useState([]);

    //get all images from the messages and store in msgImg
    useEffect(() => {
        setMsgImg(
            messages.filter(msg => msg.image).map(msg => msg.image)
        )
    },[messages])

  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white relative overflow-y-scroll w-full ${selectedUser ? "max-md:hidden" : ""} `}>
        <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
            <img src={selectedUser?.profilePic  || assets.avatar_icon} className='w-20 aspect-[1/1] rounded-full' />
            <h1 className='px-10 text-lg font-medium mx-auto flex items-center gap-2'>
                {onlineUser.includes(selectedUser._id) && <p className='bg-green-500 w-2     h-2 rounded-full'> </p>}
                {selectedUser.fullname}
            </h1>
            <p className='px-10 mx-auto'>{selectedUser.bio}</p>
        </div>

        <hr className='border-[#ffffff50] my-4' />

        <div className='text-xs px-5'>
            <p>Media</p>
            <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
                {msgImg.map((img,idx) => (
                    <div key={idx} onClick={()=> window.open(img)} className='cursor-pointer rounded'>
                        <img src={img} className='h-full rounded-md'/>
                    </div>
                ))}
            </div>
        </div>

        <button 
            onClick={() => logout()}
            className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 
                to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer'
            >
            Logout
        </button>
    </div>
  )
}

export default Rightbar