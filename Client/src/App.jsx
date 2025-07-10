import React, { useContext } from 'react'
import { Route, Routes, Navigate  } from 'react-router-dom'
import Home from './Pages/Home'
import { Loginpage } from './Pages/Loginpage'
import Profilepage from './Pages/Profilepage'
import {Toaster} from 'react-hot-toast';
import { AuthContext } from '../context/Authcontext'
 
const App = () => {
  const {authUser} = useContext(AuthContext);

  return (
    <div className='bg-[url("/bgImage.svg")] bg-contain'>
      <Toaster/>
      <Routes>
        <Route path='/' element = {authUser ? <Home /> : <Navigate to='/login'/>}/> 
        <Route path='/login' element = {!authUser ? <Loginpage /> : <Navigate to='/' />} />
        <Route path='/profile' element = {authUser ? <Profilepage/> : <Navigate to='/login'/>} />
      </Routes>
    </div>
  )
}

export default App