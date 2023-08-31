import React, { useState } from 'react'
import './Index.css'
import { Routes,Route,Navigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Registration from './pages/Registration'


export default function App() {

  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <div>
      <Navbar loggedIn={loggedIn} />

      <Routes>
        <Route path='/' element={<LandingPage />} />
        {loggedIn?
          <>
            <Route path='/dashboard' element={<Dashboard />} /> 
            <Route path='/profile' element={<Profile />} /> 
            {/* will need to add check for loaded data  */}
            <Route path='*' element={<Navigate to='/' />} />
          </> :
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            {/* will need to add check for loaded data  */}
            <Route path='*' element={<Navigate to='/' />} />
          </>
        }
      </Routes>
    </div>
  )
}

