import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api'

export default function Registration({ setUser }) {
  
  const navigate = useNavigate()

    const [input,setInput] = useState({
      username:'',
      password:'',
      email:'',
      name:''
    })

  function handleChange(event){
    setInput({...input, [event.target.name]:event.target.value})
  }

  async function handleSubmit(event){
    event.preventDefault()
    try{
      const authResponse = await axios.post('/auth/register', input)
      const token = authResponse.data.token
      if(!token){
        setInput({
          username:'',
          password:'',
          email:'',
          name:''
        })
      }
      localStorage.setItem('token',token)
      const userResponse = await axios.get('/api/users',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setUser(userResponse.data)
      navigate('/dashboard')
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className='w-screen h-[800px] flex justify-center items-center'>
        <div className='w-2/3 h-[500px] flex flex-col justify-center align-center rounded-3xl'>

            <p className='flex justify-start font-universal-font text-gray-500 text-md pb-10'>Register</p>

            <form className='flex flex-col items-center' onSubmit={handleSubmit}>

                <input onChange={handleChange} type="text" name="name" placeholder='Name'className='border-gray-400 border-b-[1px] w-full font-universal-font text-md pb-[3px]' />
                <br/>
                <input onChange={handleChange} type="text" name="username" placeholder='User name' className='border-gray-400 border-b-[1px] w-full font-universal-font text-md pb-[3px]' />
                <br/>
                <input onChange={handleChange} type="email" name="email" placeholder='Email'className='border-gray-400 border-b-[1px] w-full font-universal-font text-md pb-[3px]' />
                <br/>
                <input onChange={handleChange} type="password" name="password" placeholder='Password' className='border-gray-400 border-b-[1px] w-full font-universal-font text-md pb-[3px]' />

            <button className='bg-black text-white font-universal-font text-md my-8 py-2 w-full rounded-md'>Register</button>

            </form>

            <p className='flex justify-center font-universal-font text-gray-500 text-md mt-5px'>Already have an account?  <Link className='ml-[5px] text-black' to='/login'>Log in.</Link></p>
    
        </div>
    </div>
  )
}
