import React, { useState } from 'react'
import './Index.css'
import { Routes,Route,Navigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Profile from './pages/Profile'


export default function App() {

  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <div>
      <Navbar loggedIn={loggedIn} />

      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/' element={<LandingPage />} />
        {loggedIn?
          <>
            <Route path='/dashboard' element={<Dashboard />} /> 
            <Route path='/profile' element={<Profile />} /> 
            {/* will need to add check for loaded data  */}
            <Route path='*' element={<Navigate to='/dashboard' />} />
          </> :
          <>
            <Route path='/login' element={<Login />} />
            {/* will need to add check for loaded data  */}
            <Route path='*' element={<Navigate to='/login' />} />
          </>
        }
      </Routes>
    </div>
  )
}

