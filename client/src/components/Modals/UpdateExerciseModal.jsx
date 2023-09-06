import React, { useRef } from 'react'
import axios from 'axios'
import baseURL from '../../api'
import { useNavigate } from 'react-router-dom'

export default function UpdateExerciseModal({ setModal,selectedExercise,exercises,setExercises }) {

    console.log(exercises)
    const nameRef = useRef()
    // const navigate = useNavigate()
    // let val

    async function handleSubmit(event){
        event.preventDefault()
        try{
            const updatedValue = {
                exerciseName: nameRef.current.value
            }
            const newSet = await axios.put(baseURL+`/api/exercises/${selectedExercise}`, updatedValue, {
                headers: {
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            const updatedExercise = await axios.get(baseURL+`/api/exercises/${selectedExercise}`, {
                headers: {
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(updatedExercise.data)
            const index = exercises.findIndex((element) => element._id === selectedExercise)
            console.log(index)
            exercises.splice(index,1,updatedExercise.data)
            setExercises(exercises)
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
                <input ref={nameRef} type="text" name="exerciseName" placeholder="Exercise name" />
                <button>Edit</button>
            </form>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    </div>
  )
}
