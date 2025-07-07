import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import { Loginpage } from './Pages/Loginpage'
import Profilepage from './Pages/Profilepage'
 
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Home />}/>
        <Route path='/login' element = {<Loginpage />} />
        <Route path='/profile' element = {<Profilepage/>} />
      </Routes>
    </div>
  )
}

export default App