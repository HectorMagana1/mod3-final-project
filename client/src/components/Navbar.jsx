import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ user,setUser }) {

  const location = useLocation();

  function logout(){
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <>
        <div className='w-screen flex justify-between items-center text-2xl h-16 font-universal-font bg-transparent shadow-lg'>
            <Link className='hover:bg-gray-400 p-2 ml-4 flex justify-center items-center rounded-md' to='/'>Home</Link>
            {user&&
            <button onClick={logout}>
              logout
            </button>
            }
            {
              user && location.pathname==='/' || location.pathname==='/profile' 
              ? 
                <div className='flex mr-4'>
                  <Link className='hover:bg-gray-400 p-2 mr-2 flex justify-center items-center rounded-md' to='/dashboard'>Dashboard</Link> 
                  <Link className='hover:bg-gray-400 p-2 ml-2 flex justify-center items-center rounded-md' to='/profile'>Profile</Link> 
                </div> 
              : 
                user && location.pathname!=='/' 
              ?
                <Link className='hover:bg-gray-400 p-2 mr-4 flex justify-center items-center rounded-md' to='/profile'>Profile</Link> 
              :
                <Link className='hover:bg-gray-400 p-2 mr-4 flex justify-center items-center rounded-md' to='/login'>Log In</Link>
            }
        </div>
    </>
  )
}
