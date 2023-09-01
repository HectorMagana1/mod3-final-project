import React, { useState } from 'react'
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd'

export default function Dashboard() {

  const data = {
    workout : [
      {
        workoutName: 'Bench Press'
      },
      {
        workoutName: 'Lat Pull Downs'
      },
      {
        workoutName: 'Squat'
      },
      {
        workoutName: 'Row'
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

  // console.log(openForm);

  return (
    <DragDropContext>
      <div>
        <button onClick={open}>+</button>
        {openForm && 
        <form onSubmit={handleSubmit}>
          <input placeholder='Create Workout' name='newWorkout' className='border-b-[1px] border-gray-400' />
          <button className='shadow-lg px-2 py-[1px] rounded-xl hover:bg-gray-400 bg-gray-200'>Add</button>
        </form>
        }

        <Droppable droppableId='newWorkouts'>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {data.workout.map((workout,index) => {
                return(
                  <Draggable key={index} draggableId={workout.workoutName} index={index}>
                    {(provided) => (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={index}>{workout.workoutName}</li>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>

        {/* <div className='flex'> */}

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

        {/* </div> */}
      </div>
    </DragDropContext>
  )
}
