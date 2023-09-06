import React, { useState,useRef, useEffect } from 'react'
import axios from '../api'
import { Link } from 'react-router-dom'
import UpdateExerciseModal from '../components/Modals/UpdateExerciseModal'

export default function Dashboard() {

  const [openForm,setOpenForm] = useState(false)
  const [exercises,setExercises] = useState([])
  const [modal,setModal] = useState(false)
  const exerciseName = useRef()
  const [selectedExercise,setSelectedExercise] = useState({})

  function open() {
    setOpenForm((prev) => prev = !prev)
  }

  async function handleSubmit(event){
    event.preventDefault()
    try{
      const newExercise = {
        exerciseName:exerciseName.current.value
      }
      const newCreatedExercise = await axios.post('/api/exercises', newExercise, {
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
      const response = await axios.get('/api/exercises', {
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      setExercises(response.data);
    }
    catch(error){
      console.log(error)
    }
  }
  // console.log(exercises)

  useEffect(() => {
    getExercises()
  },[])

  async function handleDelete(exercise){
    try{
      await axios.delete(`/api/exercises/${exercise._id}`, {
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
        <button onClick={open}>+</button>
        {openForm && 
        <form onSubmit={handleSubmit}>
          <input ref={exerciseName} type='text' placeholder='Create Workout' name='exerciseName' className='border-b-[1px] border-gray-400' />
          <button className='shadow-lg px-2 py-[1px] rounded-xl hover:bg-gray-400 bg-gray-200'>Add</button>
        </form>
        }
        {exercises && exercises.map((exercise) => {
          return(
            <div className="w-40 flex justify-between" key={exercise._id}>
              <Link to={`/exercises/${exercise._id}`}>{exercise.exerciseName}</Link>
              <div className='w-16 flex justify-between'>
                <button onClick={() => handleDelete(exercise)}>X</button>
                <button id={exercise._id} onClick={openModal}>...</button>
              </div>
            </div>
          )
        })
        }
        {modal && <UpdateExerciseModal setModal={setModal} selectedExercise={selectedExercise} exercises={exercises} setExercises={setExercises} />}
      </div>
  )
}