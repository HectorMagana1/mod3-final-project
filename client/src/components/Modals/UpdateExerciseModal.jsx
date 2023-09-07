import React, { useRef } from 'react'
import axios from 'axios'
import baseURL from '../../api'
import {BiSolidXCircle} from 'react-icons/bi'


export default function UpdateExerciseModal({ setModal,selectedExercise,exercises,setExercises }) {

    const nameRef = useRef()

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
            const index = exercises.findIndex((element) => element._id === selectedExercise)
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
        <div className='w-[600px] h-[400px] bg-white flex flex-col justify-center items-center rounded-xl'>
            <div className='w-full relative -top-6'>
                <div className='flex justify-end'>
                <button className='pr-2' onClick={handleCancel}><BiSolidXCircle size='30' /></button>
                </div>
            </div>

            <form className=' w-11/12 h-3/4 flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                <input className='border-b-[1px] w-11/12 text-3xl p-2 my-2' ref={nameRef} type="text" name="exerciseName" placeholder="Exercise name" />
                <button className='shadow-lg px-2 py-[1px] rounded-xl hover:bg-root-grey bg-gray-200 transition-all duration-500 text-2xl mt-4'>Edit</button>
            </form>
        </div>
    </div>
  )
}
