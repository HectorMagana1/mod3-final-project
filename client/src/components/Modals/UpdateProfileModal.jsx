import React, { useRef } from 'react'
import axios from 'axios'
import baseURL from '../../api'
import {BiSolidXCircle} from 'react-icons/bi'

export default function UpdateExerciseModal({ setUser,setModal,user,pass,name,userName,email }) {

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const usernameRef = useRef()

    async function handleSubmit(event){
        event.preventDefault()
        try{
            const updatedValue = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                username: usernameRef.current.value
            }
            const updateUser = await axios.put(baseURL+`/auth/${user._id}`, updatedValue, {
                headers: {
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            const token = updateUser.data.token
            localStorage.setItem('token',token)
            const updatedUser = await axios.get(baseURL+`/api/users`, {
                headers: {
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(updatedUser.data)
            setUser(updatedUser.data)
        }
        catch(error){
            console.log(error.message)
        }
        setModal(false)
    }
    
    function handleCancel(){
        setModal(false)
    }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[600px] h-[400px] bg-white flex flex-col justify-center items-center rounded-xl'>
            <div className='w-full relative -top-6'>
                <div className='flex justify-end'>
                    <button className='pr-2' onClick={handleCancel}><BiSolidXCircle size='30' /></button>
                </div>
            </div>
            <form className='w-11/12 h-3/4 flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                <input className='border-b-[1px] w-11/12 text-3xl p-2 my-2' ref={nameRef} type="text" name="name" placeholder={name} />
                <input className='border-b-[1px] w-11/12 text-3xl p-2 my-2' ref={emailRef} type="email" name="email" placeholder={email} />
                <input className='border-b-[1px] w-11/12 text-3xl p-2 my-2' ref={usernameRef} type="text" name="username" placeholder={userName} />
                <input className='border-b-[1px] w-11/12 text-3xl p-2 my-2' ref={passwordRef} type="password" name="password" placeholder={pass} />
                <button className='shadow-lg px-2 py-[1px] rounded-xl hover:bg-root-grey bg-gray-200 transition-all duration-500 text-2xl mt-4'>Edit</button>
            </form>
        </div>
    </div>
  )
}
