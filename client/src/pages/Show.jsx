import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api'

export default function Show() {

    const {id} = useParams()
    const [form,setForm] = useState(false)
    const [exercise,setExercise] = useState({})
    const [loading,setLoading] = useState(false)
    // const [setData,setSetData] = useState([])
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
            // setSetData(showExercise.data.sets)
            setLoading(true)
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
            // console.log(newSet.data);
        }
        catch(error){
            console.log(error)
        }
    }
    // console.log(setData)
    // console.log(exercise)
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

        {loading && exercise.sets.length>0 && 
        <div>
            {exercise.sets.map((set) => {
                return(
                    <div>
                        <h1>{set.reps}</h1>
                        <h1>{set.weight}</h1>
                    </div>
                )
                })
            }
        </div>
        }

    </div>
  )
}
