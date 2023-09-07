import React, { useState,useRef, useEffect } from 'react'
import axios from 'axios'
import baseURL from '../api'
import { Link } from 'react-router-dom'
import UpdateExerciseModal from '../components/Modals/UpdateExerciseModal'
import {BiTrash,BiEdit,BiSolidPlusSquare,BiMinusCircle} from 'react-icons/bi'
import Footer from '../components/Footer'
import Loading from './Loading'

export default function Dashboard() {

  const [openForm,setOpenForm] = useState(false)
  const [exercises,setExercises] = useState([])
  const [modal,setModal] = useState(false)
  const exerciseName = useRef()
  const [selectedExercise,setSelectedExercise] = useState({})
  const [loaded,setLoaded] = useState(false)

  function open() {
    setOpenForm((prev) => prev = !prev)
  }

  async function handleSubmit(event){
    event.preventDefault()
    try{
      const newExercise = {
        exerciseName:exerciseName.current.value
      }
      const newCreatedExercise = await axios.post(baseURL+'/api/exercises', newExercise, {
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      exercises.unshift(newCreatedExercise.data)
    }
    catch(error){
      console.log(error)
    }
    setOpenForm((prev) => prev = !prev)
  }

  async function getExercises(){
    try {
      const response = await axios.get(baseURL+'/api/exercises', {
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      setExercises(response.data)
      setLoaded(true)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getExercises()
  },[])

  async function handleDelete(exercise){
    try{
      await axios.delete(baseURL+`/api/exercises/${exercise._id}`, {
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      const newExercisesArr = exercises.filter((exerciseElement) => exerciseElement._id!==exercise._id)
      setExercises(newExercisesArr)
    }
    catch(error){
      console.log(error)
    }
  }

  function openModal(event){
    setModal(true);
    setSelectedExercise(event.target.id)
}

  return (
    <div>
    {loaded ? 
    <div className='h-screen flex flex-col justify-between'>
      <div className='flex flex-col mb-2'>
        <div className='flex flex-col items-center h-fit'>
          <button onClick={open}>{openForm?<BiMinusCircle color="gray" className='transition-all duration-300 hover:bg-root-grey w-10 h-8 rounded-lg my-2'/>:<BiSolidPlusSquare color="gray" className='transition-all duration-300 hover:bg-root-grey w-10 h-8 rounded-lg my-2' />}</button>
          {openForm && 
          <form className='mb-2' onSubmit={handleSubmit}>
            <input ref={exerciseName} type='text' placeholder='Create Workout' name='exerciseName' className='border-b-[1px] border-gray-400 text-2xl' />
            <button className='shadow-lg px-2 py-[1px] rounded-xl hover:bg-root-grey bg-gray-200 transition-all duration-500 text-2xl'>Add</button>
          </form>
          }
        </div>
        <div className='w-screen flex flex-col items-center'>
        {exercises && exercises.map((exercise) => {
          return(
            <div className="listItem" key={exercise._id}>
              <Link className='ml-10' to={`/exercises/${exercise._id}`}>{exercise.exerciseName}</Link>
              <div className='w-16 flex justify-between mr-20'>
                <button onClick={() => handleDelete(exercise)}><BiTrash color="gray" className='deleteButton' /></button>
                <button id={exercise._id} onClick={openModal}><BiEdit color="gray" className='editButton' /></button>
              </div>
            </div>
          )
        })
        }
        </div>
        {modal && <UpdateExerciseModal setModal={setModal} selectedExercise={selectedExercise} exercises={exercises} setExercises={setExercises} />}
      </div>
      <Footer />
    </div>:
    <Loading />
      }
      </div>
  )
}