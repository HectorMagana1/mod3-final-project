import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {

  const [position,setPosition] = useState('left-1/2');



  return (
    <div>
      <div className='absolute border-black w-1/2 h-screen flex justify-center items-center border-2'> 

        <div className='w-2/3 h-[500px] border-green-500 flex flex-col justify-center align-center rounded-3xl'>

          <p className='flex justify-start font-universal-font text-gray-500 text-md pb-10'>Welcom back! Please enter your details.</p>

          <form className='flex flex-col items-center' onSubmit={null}>

            <input type="text" name="email" placeholder='Email'className='border-gray-400 border-b-[1px] w-full font-universal-font text-md pb-[3px]' />
            <br/>
            <input type="text" name="password" placeholder='Password' className='border-gray-400 border-b-[1px] w-full font-universal-font text-md pb-[3px]' />

            <button className='bg-black text-white font-universal-font text-md my-8 py-2 w-full rounded-md'>Log in</button>

          </form>

          <p className='flex justify-center font-universal-font text-gray-500 text-md mt-5px'>Don't have an account?  <Link className='ml-[5px] text-black' to='/registration'> Sign up for free</Link></p>
        </div>
      </div>
      <div className='relative border-2 left-1/2 w-1/2 h-screen flex justify-center items-center'>
        image
      </div>
    </div>
  )
}
