import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api'

export default function Show() {

    const {id} = useParams()
    const [exercise,setExercise] = useState({})

    async function getExercise(){
        try{
            const showExercise = await axios.get(`/api/exercises/${id}`,{
                headers: {
                  Authorization:`Bearer ${localStorage.getItem('token')}`
                }
              })
            setExercise(showExercise.data)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getExercise()
    },[])

  return (
    <div>
        <h1>{exercise.exerciseName}</h1>
    </div>
  )
}
