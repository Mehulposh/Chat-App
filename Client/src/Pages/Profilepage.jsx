import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../context/Authcontext';

const Profilepage = () => {

    const {authUser, updateProfile  } = useContext(AuthContext);

    const [selectedImg, setSelectedImg] = useState(null);
    const navigate = useNavigate();
    const [name, setName] = useState(authUser.fullname);
    const [bio, setBio] = useState(authUser.bio); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!selectedImg){
            await updateProfile({fullname: name, bio} );
            navigate('/');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(selectedImg);
        reader.onload = async () => {
            const base64Img = reader.result;
            await updateProfile({profilePic: base64Img, fullname: name, bio});
            navigate('/');
        }
        
    } 

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
        <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-400 border-2 border-gray-400
            flex items-center justify-between max-sm:flex-col-reverse rounded-lg'
        >
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
                <h3 className='text-xl'> Profile Details</h3> 
                <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer'>
                    <input 
                        onChange={(e) => setSelectedImg(e.target.files[0])}
                        type='file' 
                        id='avatar' 
                        accept='.png, .jpg, .jpeg ,.svg'
                        hidden
                        />
                    <img 
                        src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} 
                        className={`w-12 h-12 ${selectedImg && "rounded-full"}`}
                            />
                    Upload profile image
                </label>

                <input 
                    type='text' 
                    placeholder='Username' 
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className='p-2 border border-gray-500 rounded-md focus:outline-none focus-ring-2 focus:ring-violet-500'
                    />

                <textarea 
                    required 
                    placeholder='write profile bio' 
                    className='p-2 border border-gray-500 rounded-md focus:outline-none focus-ring-2 focus:ring-violet-500'
                    rows={4}
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                    ></textarea>
                
                <button 
                    type='submit'
                    className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full cursor-pointer'
                    >
                    Save
                </button>
            </form>
            <img 
                src={authUser?.profilePic ||  assets.logo_icon} 
                className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg && "rounded-full"}`}
                />
        </div>
    </div>
  )
}

export default Profilepage