import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import DayOfWeek from '../components/ListOfWorkouts'
import ListOfWorkouts from '../components/ListOfWorkouts'

export default function Dashboard() {

  const data = {
    workout : [
      {
        workoutName: 'Bench Press',
        _id: 'first'
      },
      {
        workoutName: 'Lat Pull Downs',
        _id: 'second'
      },
      {
        workoutName: 'Squat',
        _id: 'third'
      },
      {
        workoutName: 'Row',
        _id: 'fourth'
      }
    ]
  }

  const data2 = {
    workout : [
      {
        workoutName: 'BP',
        _id: 'fifth'
      },
      {
        workoutName: 'LPD',
        _id: 'sixth'
      },
      {
        workoutName: 'BSS',
        _id: 'seventh'
      },
      {
        workoutName: 'BC',
        _id: 'eighth'
      }
    ]
  }

  const [openForm,setOpenForm] = useState(false)

  function open() {
    setOpenForm((prev) => prev = !prev)
  }

  function handleSubmit(event){
    event.preventDefault()
    setOpenForm((prev) => prev = !prev)
  }

 

  return (
      <div>
        <button onClick={open}>+</button>
        {openForm && 
        <form onSubmit={handleSubmit}>
          <input placeholder='Create Workout' name='newWorkout' className='border-b-[1px] border-gray-400' />
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