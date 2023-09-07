import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import baseURL from '../api'
import SetEditModal from '../components/Modals/SetEditModal'
import {BiTrash,BiEdit,BiSolidPlusSquare,BiMinusCircle} from 'react-icons/bi'
import Footer from '../components/Footer'


export default function Show() {

    const {id} = useParams()
    const navigate = useNavigate()

    const [form,setForm] = useState(false)
    const [modal,setModal] = useState(false)

    const [exercise,setExercise] = useState({})
    const [loaded,setLoaded] = useState(false)

    const [selectedSet,setSelectedSet] = useState('')
    
    const repsRef = useRef()
    const weightRef = useRef()

    function openForm(){
        setForm((prev) => prev = !prev)
    }

    async function getExercise(){
        try{
            const showExercise = await axios.get(baseURL+`/api/exercises/${id}`,{
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
            const newSet = await axios.post(baseURL+`/api/sets/${id}`, newSetObj,{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            let sets = exercise.sets
            sets.push(newSet.data)
            setExercise({...exercise, sets})
            setForm((prev) => prev = !prev)
        }
        catch(error){
            console.log(error)
        }
    }

    function openModal(event){
        setModal(true);
        setSelectedSet(event.target.id)
    }

    async function handleDelete(set){
        try{
            const sets = exercise.sets
            const newSetsArr = sets.filter((setElement) => setElement._id!==set._id)
            setExercise({...exercise, sets:newSetsArr})
            await axios.delete(baseURL+`/api/sets/${id}/${set._id}`, {
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
    <div className='h-screen flex flex-col justify-between'>
        <div>

            <div className='border-2 flex justify-between'>
                <div className='flex border-2 flex-col'>
                    <button onClick={()=>navigate('/dashboard')}>Back</button>
                    <h1>{exercise.exerciseName}</h1>
                </div>
                
                <div className='border-2 flex flex-col items-center mr-20'>
                    <button onClick={openForm}>{form?<BiMinusCircle color="gray" className='transition-all duration-300 hover:bg-root-grey w-10 h-8 rounded-lg my-2'/>:<BiSolidPlusSquare color="gray" className='transition-all duration-300 hover:bg-root-grey w-10 h-8 rounded-lg my-2' />}</button>
                    {form && 
                        <form className='mb-2' onSubmit={handleSubmit}>
                            <input className='border-b-[1px] border-gray-400 text-2xl' type="text" name="reps" placeholder="Reps" ref={repsRef} />
                            <input className='border-b-[1px] border-gray-400 text-2xl' type="text" name="weight" placeholder="Weight" ref={weightRef} />
                            <button className='shadow-lg px-2 py-[1px] rounded-xl hover:bg-root-grey bg-gray-200 transition-all duration-500 text-2xl'>add</button>
                        </form> 
                    }
                </div>
            </div>
            
            {loaded && exercise.sets.length>0 && 
            <div className='w-screen flex flex-col items-center'>
                {exercise.sets.map((set,i) => {
                    return(
                        <div key={set._id} className='bg-gradient-to-r duration-500 from-root-white my-2 w-11/12 h-16 shadow-lg flex justify-between items-center text-3xl hover:bg-root-white transition-all hover:h-20'>
                            <div className='w-4/5 flex justify-between'>
                                <h1>Set {i+1}</h1>
                                <div className='flex'>
                                    <h1>Reps: </h1>
                                    <h1> {set.reps}</h1>
                                </div>
                                <div className='flex'>
                                    <h2>Weight: </h2>
                                    <h1> {set.weight}</h1>
                                </div>
                            </div>
                            <div className='mr-10'>
                                <button onClick={()=>handleDelete(set)}><BiTrash color='grey' className='deleteButton' /></button>
                                <button id={set._id} onClick={openModal}><BiEdit color='grey' className='editButton' /></button>
                            </div>
                        </div>
                    )
                    })
                }
                {modal && <SetEditModal selectedSetID={selectedSet} setModal={setModal} exercise={exercise} setExercise={setExercise} />}
            </div>
            }
        </div>
        <Footer />
    </div>  
  )
}
