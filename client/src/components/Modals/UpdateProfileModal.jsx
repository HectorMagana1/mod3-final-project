import React, { useRef } from 'react'
import axios from 'axios'
import baseURL from '../api'

export default function UpdateExerciseModal({ setUser,setModal,user }) {

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
        <div className='w-[600px] bg-white flex flex-col'>
            <form onSubmit={handleSubmit}>
                <input ref={nameRef} type="text" name="name" placeholder="Name" />
                <input ref={emailRef} type="email" name="email" placeholder="Email" />
                <input ref={usernameRef} type="text" name="username" placeholder="Username" />
                <input ref={passwordRef} type="password" name="password" placeholder="Password" />
                <button>Edit</button>
            </form>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    </div>
  )
}
