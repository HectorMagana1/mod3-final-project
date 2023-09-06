import React, { useRef } from 'react'
import axios from '../../api'

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
            const newSet = await axios.put(`/api/sets/${selectedSetID}`, updatedValues, {
                headers: {
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            const updatedSet = await axios.get(`/api/sets/${selectedSetID}`, {
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
        <div className='w-[600px] bg-white flex flex-col'>
            <form onSubmit={handleSubmit}>
                <input ref={repRef} type="text" name="reps" placeholder="Reps" />
                <input ref={weightRef} type="text" name="weight" placeholder="Weight" />
                <button>Edit</button>
            </form>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    </div>
  )
}
