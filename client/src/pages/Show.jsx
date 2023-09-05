import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api'
import SetEditModal from '../components/Modals/SetEditModal'

export default function Show() {

    const {id} = useParams()

    const [form,setForm] = useState(false)
    const [modal,setModal] = useState(false)

    const [exercise,setExercise] = useState({})
    const [loaded,setLoaded] = useState(false)
    
    const repsRef = useRef()
    const weightRef = useRef()

    function openForm(){
        setForm((prev) => prev = !prev)
    }

    async function getExercise(){
        try{
            const showExercise = await axios.get(`/api/exercises/${id}`,{
                headers: {
                  Authorization:`Bearer ${localStorage.getItem('token')}`
                }
              })
            setExercise(showExercise.data)
            setLoaded(true)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getExercise()
    },[])

    async function handleSubmit(event){
        event.preventDefault()
        try{
            const newSetObj = {
                reps:repsRef.current.value,
                weight:weightRef.current.value
            }
            const newSet = await axios.post(`/api/sets/${id}`, newSetObj,{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            let sets = exercise.sets
            sets.push(newSet.data)
            setExercise({...exercise, sets})
        }
        catch(error){
            console.log(error)
        }
    }

    function openModal(){
        setModal(true);
    }

    async function handleDelete(set){
        try{
            const sets = exercise.sets
            const newSetsArr = sets.filter((setElement) => setElement._id!==set._id)
            setExercise({...exercise, sets:newSetsArr})
            await axios.delete(`/api/sets/${id}/${set._id}`, {
                headers: {
                Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
        }
        catch(error){
            console.log(error)
        }
      }

  return (
    <div>
        <h1>{exercise.exerciseName}</h1>
        <button onClick={openForm}>+</button>

        {form && 
            <form onSubmit={handleSubmit}>
                <input type="text" name="reps" placeholder="Reps" ref={repsRef} />
                <input type="text" name="weight" placeholder="Weight" ref={weightRef} />
                <button>add</button>
            </form> 
        }

        {loaded && exercise.sets.length>0 && 
        <div>
            {exercise.sets.map((set) => {
                return(
                    <div key={set._id} className='flex w-80 justify-between'>
                        <div className='flex'>
                            <h1>Reps: </h1>
                            <h1> {set.reps}</h1>
                        </div>
                        <div className='flex'>
                            <h2>Weight: </h2>
                            <h1> {set.weight}</h1>
                        </div>
                        <button onClick={()=>handleDelete(set)}>X</button>
                        <button onClick={openModal}>...</button>
                        {modal && <SetEditModal />}
                    </div>
                )
                })
            }
        </div>
        }

    </div>
  )
}
