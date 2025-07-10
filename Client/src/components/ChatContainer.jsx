import React, { useRef,useEffect, useContext, useState } from 'react'
import assets from '../assets/assets'
import { formatTime } from '../Library/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/Authcontext';
import toast from 'react-hot-toast';
 

const ChatContainer = () => {
    const scrollEnd = useRef();
    const {messages,selectedUser,setSelectedUser,sendMessage, getMessages} = useContext(ChatContext);

    const {authUser , onlineUser } = useContext(AuthContext);

    const [input,setInput] = useState('');

    //handle send message
    const handleSend = async (e) => {
        e.preventDefault();
        if(input.trim() === '') return null;
        
        await sendMessage({text: input.trim()});
        setInput('')
    }

    //handle sending of image
    const handleImage = async (e) => {
        const file = e.target.files[0];
        if(!file || !file.type.startsWith('image/')) {
            toast.error('Select an image file');
            return;
        }

        const reader = new FileReader();

        reader.onloadend = async () =>{
            await sendMessage({image: reader.result})
        }

        reader.readAsDataURL(file);
        e.target.value = '';
    }

    useEffect(() => {
        if(selectedUser){
            getMessages(selectedUser._id);
        }
    },[selectedUser]);


    useEffect(() => {
        if(scrollEnd.current && messages){
            scrollEnd.current.scrollIntoView({behavior: 'smooth'})
        }
    },[messages])


return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
        <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
            <img src={selectedUser.profilePic || assets.avatar_icon} className='rounded-full w-8'/>
            <p className='flex-1 text-sm text-gray-400  flex items-center gap-2 ' >
                {selectedUser.fullname}
                {onlineUser.includes(selectedUser._id) &&
                <span className='w-2 h-2 rounded-full bg-green-300'></span>}
            </p>
            <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} className='md:hidden max-w-7'/>
            <img src={assets.help_icon} className='max-md:hidden max-w-5'/>
        </div>

        <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
            {messages.map((msg,idx) => (
                <div key={idx} className= {`flex items-end justify-end gap-2 ${msg.senderID !== authUser._id && "flex-row-reverse"}`}>
                    {msg.image ? (
                        <img src={msg.image} className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
                    ) : (
                        <p className= {`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8  break-all bg-violet-500/30
                             text-white ${msg.senderID === authUser._id ? "rounded-br-none" : "rounded-bl-none"}`}
                        >
                            {msg.text}
                        </p>
                    )}
                    <div className='text-center text-xs'>
                        <img 
                            src={msg.senderID === authUser._id ?
                                authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic ||  assets.avatar_icon} 
                            className='rounded-full w-7' 

                        />
                        <p className='text-gray-500'>{formatTime(msg.createdAt)}</p>
                    </div>
                </div>
            ))}
            <div ref={scrollEnd}>

            </div>
        </div>

        <div className='absolute bottom-0 left-0 right-0 flex items-center  gap-3 p-3'>
            <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
                <input  
                    type='text' 
                    placeholder='message'  
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    onKeyDown={(e) => e.key == 'Enter' ? handleSend(e) : null}
                    className='flex-1 text-sm p-3 border-none rounded-lg outline-none placeholder:text-gray-500 text-white'
                 />
                <input 
                    onChange={handleImage} 
                    type='file' id='image' 
                    accept='image/png , image/jpeg' 
                    hidden
                 />
                <label htmlFor='image' >
                    <img src={assets.gallery_icon} className='w-5 mr-2 cursor-pointer'/>
                </label>
            </div>
            <img onClick={handleSend}src={assets.send_button} className='w-7 cursor-pointer '/>
        </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
        <img src={assets.logo_icon} className='max-w-16 ' />
        <p className='text-lg text-white font-medium'>Chat anytime anywhere</p>
    </div>
  )
}

export default ChatContainer