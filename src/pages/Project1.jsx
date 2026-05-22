import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Bolt, UserRound, Mail, BellDot, Search, House, ChevronDown } from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'

const Project1 = () => {
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)



  function handleClick() {
    if (open2) {
      setOpen2(false)
    } else {
      setOpen((prev) => !prev)
    }
  }

  function handleClick2() {
    if (open) {
      setOpen(false)
    } else {
      setOpen2((prev) => !prev)
    }
  }




  return (
    <div>
      <div className='mt-3 flex items-center justify-between  px--7'>

        <div className='flex items-center space-x-5 px-3 py-1 rounded-full'>
          <Bolt size={35} />
          <div className='flex items-center border rounded-full px-6 '>
            <Search size={18} />
            <input className=' px-5 py-2 rounded-full w-100 placeholder:italic focus:outline-0 focus:border-0' type="text" placeholder='Describe the job you want' />
          </div>
        </div>

        <div className='flex justify-around items-center space-x-10'>
          <House />
          <UserRound />
          <Mail />
          <BellDot />
        </div>
      </div>
      <div className='flex space-x-4 text-lg mt-4 px-7'>
        <button className='border border-slate-400 px-4 py-1 rounded-full cursor-pointer hover:bg-slate-600 hover:scale-105 transition-all duration-300'>Remote</button>

        <div className='flex flex-col relative'>
          <button className='flex items-center gap-3 border border-slate-400 px-4 py-1 rounded-full cursor-pointer hover:bg-slate-600 hover:scale-105 transition-all duration-300' onClick={handleClick}>Experience Level <ChevronDown size={18} /></button>
          {open &&
            <div className='absolute  top-full left-0 mt-2 bg-slate-600 rounded shadow-lg w-100 h-70 z-10' >
              <div className='p-5 space-y-5'>
                <div className='flex flex-col space-y-4 '>
                  <label className='flex items-center'>
                    <input className='cursor-pointer w-6 h-6 accent-green-500' type="radio" name='experience' value="entry-level" />&nbsp;
                    <p>Entry Level</p>
                  </label>

                  <label className='flex items-center'>
                    <input className='cursor-pointer h-6 w-6  accent-green-500' type="radio" name='experience' value="junior" />&nbsp;
                    <p>Junior</p>
                  </label>

                  <label className='flex items-center'>
                    <input className='cursor-pointer w-6 h-6 accent-green-500' type="radio" name='experience' value="senior" />&nbsp;
                    <p>Senior</p>
                  </label>

                  <label className='flex items-centr'>
                    <input className='cursor-pointer w-6 h-6 accent-green-500' type="radio" name='experience' value="manager" />&nbsp;
                    <p>Manager</p>
                  </label>
                </div>

                <div className='border w-full border-slate-500'></div>

                <div className='flex justify-end gap-3'>
                  <button className='cursor-pointer border-3 text-md px-4 py-1 rounded-full' onClick={() => setOpen(false)}>Reset</button>
                  <button className='cursor-pointer bg-sky-500 text-md px-4 py-1 rounded-full' onClick={() => setOpen(false)}>Show Results</button>
                </div>
              </div>
            </div>
          }
        </div>

        <div className='flex flex-col relative'>
          <button className='flex items-center gap-3 border border-slate-400 px-4 py-1 rounded-full cursor-pointer hover:bg-slate-600 hover:scale-105 transition-all duration-300' onClick={handleClick2}>Employment Type <ChevronDown size={18} /></button>

          {open2 &&
            <div className='absolute  top-full left-0 mt-2 bg-slate-600 rounded shadow-lg w-100 h-70 z-10'>
              <div className='p-5 space-y-5'>
                <div className='flex flex-col space-y-4 '>
                  <label className='flex items-center'>
                    <input className='cursor-pointer w-6 h-6 accent-green-500' type="radio" name='experience' value="part-time" />&nbsp;
                    <p>Part-Time</p>
                  </label>

                  <label className='flex items-center'>
                    <input className='cursor-pointer h-6 w-6  accent-green-500' type="radio" name='experience' value="full-time" />&nbsp;
                    <p>Full-Time</p>
                  </label>

                  <label className='flex items-center'>
                    <input className='cursor-pointer w-6 h-6 accent-green-500' type="radio" name='experience' value="contract" />&nbsp;
                    <p>Contract</p>
                  </label>

                  <label className='flex items-centr'>
                    <input className='cursor-pointer w-6 h-6 accent-green-500' type="radio" name='experience' value="volunteer" />&nbsp;
                    <p>Volunteer</p>
                  </label>
                </div>

                <div className='border w-full border-slate-500'></div>


                <div className='flex  justify-end gap-3'>
                  <button className='cursor-pointer border-3 text-md px-4 py-1 rounded-full' onClick={() => setOpen2(false)}>Reset</button>
                  <button className='cursor-pointer bg-sky-500 text-md px-4 py-1 rounded-full' onClick={() => setOpen2(false)}>Show Results</button>
                </div>
              </div>
            </div>
          }

        </div>

      </div>
    </div >
  )
}

export default Project1
