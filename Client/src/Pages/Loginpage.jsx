import React,{useContext, useState} from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/Authcontext';

export const Loginpage = () => {
    const [state, setState] = useState('Sign Up');
    const [formData, setFormData] = useState({
        'name': '',
        'email': '',
        'password': '',
        'bio': '',
    });
    const [submitted, setSubmitted] = useState(false);

    const {login} = useContext(AuthContext);

    console.log(formData);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(state === 'Sign Up' && !submitted) {
            setSubmitted(true);
            return;
        }
        login(state==='Sign Up' ? 'signup' : "login", formData);
    }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
        <img src={assets.logo_big} className='w-[min(30vw,250px)]'/>
        <form 
        onSubmit={handleSubmit}
            className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'
        >
            <h2 className='font-medium text-2xl flex justify-between items-center'>
                {state}
                {submitted && <img 
                                src={assets.arrow_icon} 
                                onClick={() => setSubmitted(false)}
                                className='w-5 cursor-pointer'
                                />
                }
            </h2>

            {state === 'Sign Up' && !submitted && (
                <input 
                    type='text' 
                    className='p-2 border border-gray-400 rounded-md focus:outline-none ' 
                    placeholder='Full Name' 
                    required
                    onChange={(e) => setFormData({...formData , 'name': e.target.value})}
                    value={formData.name}
                    />

            )}

            {!submitted && (
                <>
                    <input 
                        type='email' 
                        placeholder='Email' 
                        required 
                        className='p-2 border border-gray-500 rounded-md foucus:outline-none foucus:ring-2 focus:ring-indigo-400'
                        onChange={(e) => setFormData({...formData , 'email': e.target.value})}
                        value={formData.email}
                        />
                    <input 
                        type='password' 
                        placeholder='Password' 
                        required 
                        className='p-2 border border-gray-500 rounded-md foucus:outline-none foucus:ring-2 focus:ring-indigo-400'
                        onChange={(e) => setFormData({...formData , 'password': e.target.value})}
                        value={formData.password}
                        />
                </>
            )}

            {
                state === 'Sign Up' && submitted && (
                    <textarea 
                        rows={4} 
                        placeholder='Provide a bio'
                        required 
                        onChange={(e) => setFormData({...formData , 'bio': e.target.value})}
                        value={formData.bio}       
                        className='p-2 border border-gray-500 rounded-md foucus:outline-none foucus:ring-2 focus:ring-indigo-400'
                    > 
                        {formData.bio}
                    </textarea>
                )
            }

            <button 
                type='submit'
                className=' bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-3  rounded-md cursor-pointer'>
                {state === 'Sign Up' ? 'Create Account' : "Login "}
            </button>

            <div className='flex items-center gap-2 text-sm cursor-pointer text-gray-400'>
                <input type='checkbox' required/>
                <p>Agree to terms of use & privacy policy</p>
            </div>

            <div className='flex flex-col gap-2'>
                {state === 'Sign Up' ? (
                    <p className='text-sm text-gray-600'> 
                        Already have an account?  {' '}
                        <span 
                            onClick={() => {setState('Login'); setSubmitted(false)}}
                            className='font-medium text-violet-400 cursor-pointer'>
                            Login
                        </span>
                    </p>
                ) : (
                    <p className='text-sm text-gray-600'>
                        Create an account {' '}
                        <span 
                            onClick={() => setState('Sign Up')}
                            className='font-medium text-violet-400 cursor-pointer'>
                            Sign Up
                        </span>
                    </p>
                )}
            </div>
        </form>
    </div>
  )
}
