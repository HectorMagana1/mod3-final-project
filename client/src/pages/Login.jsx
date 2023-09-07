import axios from 'axios'
import baseURL from '../api'
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
    console.log('logged in')
    event.preventDefault()
    try{
      const authResponse = await axios.post(baseURL+'/auth/login', input)
      const token = authResponse.data.token
    
      if(!token){
        setInput({
          password:'',
          email:''
        })
        return
      }
      localStorage.setItem('token',token)
      const userResponse = await axios.get(baseURL+'/api/users',{
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
      <div className='absolute w-1/2 h-screen flex justify-center items-center border-2'> 

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
      <div style={{backgroundImage:'url(https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80)'}} className='bg-cover relative left-1/2 w-1/2 h-screen flex justify-center items-center' >
      </div>
    </div>
  )
}
