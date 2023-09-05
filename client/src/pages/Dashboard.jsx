import React, { useState,useRef, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import DayOfWeek from '../components/ListOfWorkouts'
import ListOfWorkouts from '../components/ListOfWorkouts'
import axios from '../api'
import { Link } from 'react-router-dom'

export default function Dashboard() {

  const [input,setInput] = useState('')
  const [openForm,setOpenForm] = useState(false)
  const [exercises,setExercises] = useState([])
  const exerciseName = useRef()

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
      exercises.push(newCreatedExercise.data)
    }
    catch(error){
      console.log(error)
    }
    setOpenForm((prev) => prev = !prev)
  }

  function handleChange(event){
    setInput(event.target.value)
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
  console.log(exercises)

  useEffect(() => {
    getExercises()
  },[])

  return (
      <div>
        <button onClick={open}>+</button>
        {openForm && 
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} ref={exerciseName} type='text' placeholder='Create Workout' name='exerciseName' className='border-b-[1px] border-gray-400' />
          <button className='shadow-lg px-2 py-[1px] rounded-xl hover:bg-gray-400 bg-gray-200'>Add</button>
        </form>
        }
        {exercises ? exercises.map((exercise) => {
          return(
            <div key={exercise._id}>
              <Link to={`/exercises/${exercise._id}`}>{exercise.exerciseName}</Link>
            </div>
          )
        }):
        <div>nothing</div>
        }
      </div>
  )
}