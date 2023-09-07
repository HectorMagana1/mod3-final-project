import React, { useRef } from 'react'
import axios from 'axios'
import baseURL from '../../api'
import {BiSolidXCircle} from 'react-icons/bi'

export default function SetEditModal({ selectedSetID,setModal,exercise,setExercise }) {

    const repRef = useRef()
    const weightRef = useRef()


    async function handleSubmit(event){
        event.preventDefault()
        try{
            const updatedValues = {
                reps:repRef.current.value,
                weight:weightRef.current.value
            }
            const newSet = await axios.put(baseURL+`/api/sets/${selectedSetID}`, updatedValues, {
                headers: {
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            const updatedSet = await axios.get(baseURL+`/api/sets/${selectedSetID}`, {
                headers: {
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(updatedSet.data)
            const sets = exercise.sets
            console.log(sets)
            const index = sets.findIndex((element) => element._id === selectedSetID)
            sets.splice(index,1,updatedSet.data)
            setExercise({...exercise, sets})
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
            <form className='w-11/12 h-3/4 flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                <input className='border-b-[1px] w-11/12 text-3xl p-2 my-2' ref={repRef} type="text" name="reps" placeholder="Reps" />
                <input className='border-b-[1px] w-11/12 text-3xl p-2 my-2' ref={weightRef} type="text" name="weight" placeholder="Weight" />
                <button className='shadow-lg px-2 py-[1px] rounded-xl hover:bg-root-grey bg-gray-200 transition-all duration-500 text-2xl mt-4'>Edit</button>
            </form>
        </div>
    </div>
  )
}
