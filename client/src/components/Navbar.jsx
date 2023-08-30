import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ loggedIn }) {

  return (
    <>
        <div className='w: bg-gray-400 flex justify-evenly items-center text-2xl h-16 font-universal-font'>
            <Link to='/'>Home</Link>
            {loggedIn? <Link to='/profile'>Profile</Link> : <Link to='/login'>Log In</Link>}
            <Link to='/about'>About</Link>
        </div>
    </>
  )
}
