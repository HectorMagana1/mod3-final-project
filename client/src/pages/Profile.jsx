import React, { useState,useEffect } from 'react'
import axios from '../api'
import UpdateProfileModal from '../components/Modals/UpdateProfileModal'
import { useNavigate } from 'react-router-dom'

export default function Profile({user,setUser}) {

  // const [user,setUser] = useState({})
  const [modal,setModal] = useState(false)
  const navigate = useNavigate()

  async function getUser(){
    try {
      const response = await axios.get('/api/users', {
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      setUser(response.data);
    }
    catch(error){
      console.log(error)
    }
  }

  function openModal(event){
    setModal(true);
}

  // console.log(user)
  useEffect(() => {
    getUser()
  },[])

  async function handleDelete(event){
    event.preventDefault()
    try{
      await axios.delete(`/auth/${user._id}`,{
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      logout()
      navigate('/')
    }
    catch(error){
      console.log(error.message)
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null)
  }

  return (
    <div className='flex items-center flex-col h-screen'>
      <div className='border-[1px] w-3/4 h-80 rounded-2 rounded-lg shadow-2x flex justify-center items-center'>
        <div className='relative h-full grid grid-cols-4 grid-rows-8 p-4'>
          <p className='col-start-1 pb-8'> My Profile</p>
          <p className='row-start-2'>Name</p>
          <p className='row-start-3 row-span-5 text-gray-500'>{user.name}</p>
          <p className='row-start-2 col-start-2'>User name</p>
          <p className='row-start-3 col-start-2 text-gray-500'>{user.username}</p>
          <p className='row-start-2 col-start-3'>Email</p>
          <p className='row-start-3 text-gray-500'>{user.email}</p>
          <button className='row-start-1 col-start-5 mt-4 mr-4' onClick={openModal}>Edit</button>
        </div>
      </div>
      <button className='' onClick={handleDelete}>Delete</button>
      {modal && <UpdateProfileModal setModal={setModal} user={user} setUser={setUser} />}
    </div>
  )
}
