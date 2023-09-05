import React, { useState,useRef } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import DayOfWeek from '../components/ListOfWorkouts'
import ListOfWorkouts from '../components/ListOfWorkouts'
import axios from '../api'

export default function Dashboard() {

  const [input,setInput] = useState('')
  const [openForm,setOpenForm] = useState(false)
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
      await axios.post('/api/exercises', newExercise, {
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
    }
    catch(error){
      console.log(error)
    }
    setOpenForm((prev) => prev = !prev)
  }

  function handleChange(event){
    setInput(event.target.value)
  }

  return (
      <div>
        <button onClick={open}>+</button>
        {openForm && 
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} ref={exerciseName} type='text' placeholder='Create Workout' name='exerciseName' className='border-b-[1px] border-gray-400' />
          <button className='shadow-lg px-2 py-[1px] rounded-xl hover:bg-gray-400 bg-gray-200'>Add</button>
        </form>
        }
      </div>
  )
}


// function handleOnDragEnd(result){
//   console.log(result);
// }
//  <DragDropContext onDragEnd={handleOnDragEnd}>

// </DragDropContext> 



        {/* <figure>
          <figcaption>Monday</figcaption>
            <Droppable droppableId='workouts'>
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  <li>Bench Press</li>
                  <li>Chest Flys</li>
                </ul>
              )}
            </Droppable>
        </figure> */}


{/* 
          <Droppable>
            <figure>
              <figcaption>Tuesday</figcaption>
              <ul>
                <li>Squats</li>
                <li>Leg Extensions</li>
              </ul>
            </figure>
          </Droppable>

          <Droppable>
            <figure>
              <figcaption>Wednesday</figcaption>
              <ul>
                <li>Shoulder Press</li>
                <li>Shoulder Flys</li>
              </ul>
            </figure>
          </Droppable>

          <Droppable>
            <figure>
              <figcaption>Thursday</figcaption>
              <ul>
                <li>Bicep Curls</li>
                <li>Lat Pull Downs</li>
              </ul>
            </figure>
          </Droppable>

          <Droppable>
            <figure>
              <figcaption>Friday</figcaption>
              <ul>
                <li>Tricep Extensions</li>
                <li>Bicep Curls</li>
              </ul>
            </figure>
          </Droppable>

          <Droppable>
            <figure>
              <figcaption>Saturday</figcaption>
              <ul>
                <li>Crunches</li>
                <li>Sit Ups</li>
              </ul>
            </figure>
          </Droppable>

          <Droppable>
            <figure>
              <figcaption>Sunday</figcaption>
              <ul>
                <li>Deadlift</li>
                <li>Reverse Crunch</li>
              </ul>
            </figure>
          </Droppable> */}