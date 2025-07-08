import React from 'react'
import assets from '../assets/assets'

const Rightbar = ({selectedUser}) => {
  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white relative overflow-y-scroll w-full ${selectedUser ? "max-md:hidden" : ""} `}>
        <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
            <img src={selectedUser?.profilePic  || assets.avatar_icon} className='w-20 aspect-[1/1] rounded-full' />
            <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
                <p className='bg-green-500 w-2 h-2 rounded-full'> </p>
                {selectedUser.fullName}
            </h1>
            <p className='px-10 mx-auto'>{selectedUser.bio}</p>
        </div>

        <hr className='border-[#ffffff50] my-4' />

        <div className='text-xs px-5'>
            
        </div>
    </div>
  )
}

export default Rightbar