import axios from '../api'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login({ setUser }) {

  const navigate = useNavigate()
  let [input, setInput] = useState({
    password:'',
    email:''
  })

  function handleChange(event){
    setInput({...input, [event.target.name]:event.target.value})
  }

  async function handleSubmit(event){
    event.preventDefault()
    try{
      const authResponse = await axios.post('/auth/login', input)
      const token = authResponse.data.token
    
      if(!token){
        setInput({
          password:'',
          email:''
        })
        return
      }
      localStorage.setItem('token',token)
      const userResponse = await axios.get('/api/users',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      setUser(userResponse.data)
      navigate('/dashboard')
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div>
      <div className='absolute border-black w-1/2 h-screen flex justify-center items-center border-2'> 

        <div className='w-2/3 h-[500px] border-green-500 flex flex-col justify-center align-center rounded-3xl'>

          <p className='flex justify-start font-universal-font text-gray-500 text-md pb-10'>Welcom back! Please enter your details.</p>

          <form className='flex flex-col items-center' onSubmit={handleSubmit}>

            <input onChange={handleChange} type="email" name="email" placeholder='Email'className='border-gray-400 border-b-[1px] w-full font-universal-font text-md pb-[3px]' />
            <br/>
            <input onChange={handleChange} type="password" name="password" placeholder='Password' className='border-gray-400 border-b-[1px] w-full font-universal-font text-md pb-[3px]' />

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
