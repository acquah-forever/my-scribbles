import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {

const navigate  = useNavigate()

    function handleClick(){
        navigate('/')
    }
  return (
    <div className='space-y-8 flex flex-col justify-center items-center'>
        <h1 className='text-5xl text-red-500 uppercase'>404 Error Page</h1>
        <h1 className='uppercase text-2xl'>Page Not Found</h1>
        <button className='bg-slate-400 p-4 cursor-pointer rounded hover:scale-105 transition-all duration-150'onClick={handleClick}>Back to Homepage</button>
    
    </div>
  )
}

export default Error
