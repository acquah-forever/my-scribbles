import React from 'react'

const Error = () => {
  return (
    <div className='space-y-8 flex flex-col justify-center items-center'>
        <h1 className='text-5xl text-red-500 uppercase'>404 Error Page</h1>
        <h1 className='uppercase text-2xl'>Page Not Found</h1>
        <button className='bg-slate-400 p-4 cursor-pointer rounded hover:scale-105 transition-all duration-150'>Back to Homepage</button>
    
    </div>
  )
}

export default Error
