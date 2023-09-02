// https://www.youtube.com/watch?v=SJTazZUQVDE

import React from 'react'
import { Draggable,Droppable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'

export default function ListOfWorkouts({data,day}) {

  return (
    <div>
        <Droppable droppableId={day}>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {data.workout.map((workout,index) => {
                return(
                  <Draggable key={index} draggableId={workout.workoutName} index={index}>
                    {(provided) => (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={index}><Link to='/show/id'>{workout.workoutName}</Link></li>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
    </div>
  )

}
