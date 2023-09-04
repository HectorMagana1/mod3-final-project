import React, { useEffect, useState } from 'react'
import './Index.css'
import { Routes,Route,Navigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Registration from './pages/Registration'

export default function App() {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  async function getUser(){
    try{
      const response = await axios.get('api/users', {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      })
      setUser(response.data)
    }
    catch(err){
      console.log(err.message)
      localStorage.removeItem('user')
    }
    setLoading(true)
  }

  useEffect(() => {
    let user = localStorage.getItem('user')
    if(user){
      getUser()
    }
    else{
      setLoading(true)
    }
  },[])

  return (
    <div>
      <Navbar user={user} />

      <Routes>
        <Route path='/' element={<LandingPage />} />
        {user?
          <>
            <Route path='/dashboard' element={<Dashboard />} /> 
            <Route path='/profile' element={<Profile />} /> 
            {/* will need to add check for loaded data  */}
            <Route path='*' element={<Navigate to='/' />} />
          </> :
          <>
            <Route path='/login' element={<Login setUser={ setUser }/>} />
            <Route path='/registration' element={<Registration setUser={ setUser }/>} />
            {/* will need to add check for loaded data  */}
            <Route path='*' element={<Navigate to='/' />} />
          </>
        }
      </Routes>
    </div>
  )
}

