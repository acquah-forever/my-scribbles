import React, { useState, useEffect, useMemo } from 'react'
import Error from '../components/Error'
import { ClipLoader } from 'react-spinners'
import { useQuery } from '@tanstack/react-query'
import { Bolt, UserRound, Mail, BellDot, Search, House, ChevronDown, X } from 'lucide-react'


const BASE_API_URL = "http://localhost:3000"

async function getData() {
  const res = await fetch(`${BASE_API_URL}/jobs`);
  if (!res.ok) {
    throw new Error("Network Issues");
  }

  return res.json();
}

const Project1 = () => {

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [query, setQuery] = useState('');
  const [experienceCheck, setExperienceCheck] = useState('')
  const [employmentCheck, setEmploymentCheck] = useState()
  const [page, setPage] = useState(1)
  const [selectedJob, setSelectedJob] = useState(null)

  // filter state
  const [experienceFilter, setExperiencefilter] = useState("")
  const [employmentFilter, setEmploymentFilter] = useState('')

  const jobsPerPage = 8

  const { data: jobs, isLoading, isError } = useQuery({
    queryKey: ["jobs"],
    queryFn: getData,
    staleTime: 1000 * 5
  })

  function handleChange(e) {
    setQuery(e.target.value)
  }

  useEffect(() => {
    setPage(1)
  }, [query])

  function handleExperienceChange(e) {
    setExperiencefilter(e.target.value)
    setPage(1)
  }

  function handleEmploymentChange(e) {
    setEmploymentFilter(e.target.value)
    setPage(1)
  }

  const filteredJobs = useMemo(() => {

    const lowerCase = query.toLowerCase()

    if (!jobs) return []
    // let instead of const as results will be asssigned
    // differently for search filters

    let results = jobs

    if (query.trim() !== '') {
      results = results.filter((item) =>
        item.title.toLowerCase().includes(lowerCase) ||
        item.company.toLowerCase().includes(lowerCase) ||
        item.location.toLowerCase().includes(lowerCase) ||
        (item.levelOfExperience || '').toString().toLowerCase().includes(lowerCase)
      )

    }

    // javascript
    const normalize = (s) => String(s || '').replace(/-/g, '').toLowerCase()

    if (experienceFilter) {
      const normalFormat = normalize(experienceFilter)
      results = results.filter((item) => normalize(item.levelOfExperience).includes(normalFormat))
    }

    if (employmentFilter) {
      const normalFormat = normalize(employmentFilter)
      results = results.filter((item) => {
        //different API's may store the same concept under different names 
        const employmentParameters = (item.employmentType || item.employment || item.type || '').toString()
        return normalize(employmentParameters).includes(normalFormat)
      })
    }

    return results || []


  }, [jobs, query, experienceFilter, employmentFilter])


  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (page - 1) * jobsPerPage
  const endIndex = startIndex + jobsPerPage
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

  function handlePrevious() {
    setPage((prev) => Math.max(prev - 1, 1))

  }

  function handleNext() {
    setPage((prev) => Math.min(prev + 1, totalPages))
  }

  function handleLink(id) {
    const foundJob = filteredJobs.find((job) => job.id === id)
    setSelectedJob(foundJob)
  }

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

  function handleExperience() {
    setOpen((prev) => !prev)
  }

  function handleExperience2() {
    setOpen2((prev) => !prev)
  }

  function handleExpereinceCheck(){
    setExperienceCheck('')
    setPage(1)
  
  }


  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <ClipLoader color="#36d7b7" size={100} />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen'>
        <Error />
      </div>
    )
  }

  return (
    <div id='/'>
      <div className='mt-3 flex items-center justify-between  px-7'>

        <div className='flex items-center space-x-5 px-3 py-1 rounded-full'>
          <Bolt size={35} />
          <div className='flex items-center border rounded-full px-6 '>
            <Search size={18} />
            <input className=' px-5 py-2 rounded-full w-full placeholder:italic focus:outline-0 focus:border-0' type="text" placeholder='Describe the job you want' value={query} onChange={handleChange} />
          </div>
        </div>

        <div className='flex justify-around items-center space-x-10'>
          <House />
          <UserRound />
          <Mail />
          <BellDot />
        </div>
      </div>
      <div className='flex space-x-4 text-md mt-4 px-7'>
   

        <div className='flex flex-col relative'>
          <button className='flex items-center gap-3 border border-slate-400 px-4 py-1 rounded-full cursor-pointer hover:bg-slate-600 hover:scale-105 transition-all duration-300' onClick={handleClick}>Experience Level <ChevronDown size={18} /></button>
          {open &&
            <div className='absolute top-full left-0 mt-2 bg-slate-600 rounded shadow-lg w-full max-h-75 z-10 overflow-auto' >
              <div className='p-5 space-y-5'>
                <div className='flex flex-col space-y-4 '>
                  <label className='flex items-center'>
                    <input className='cursor-pointer w-6 h-6 accent-green-500' onChange={handleExperienceChange} type="radio" name='experience' value="entry-level" checked={experienceCheck === 'entry-level'} />&nbsp;
                    <p>Entry Level</p>
                  </label>

                  <label className='flex items-center'>
                    <input className='cursor-pointer h-6 w-6  accent-green-500' onChange={handleExperienceChange} type="radio" name='experience' value="junior" checked={experienceCheck === 'junior'} />&nbsp;
                    <p>Junior</p>
                  </label>

                  <label className='flex items-center'>
                    <input className='cursor-pointer w-6 h-6 accent-green-500' onChange={handleExperienceChange} type="radio" name='experience' value="senior" checked={experienceCheck === 'senior'} />&nbsp;
                    <p>Senior</p>
                  </label>

                  <label className='flex items-centr'>
                    <input className='cursor-pointer w-6 h-6 accent-green-500' onChange={handleExperienceChange} type="radio" name='experience' value="manager" checked={experienceCheck === 'manager'} />&nbsp;
                    <p>Manager</p>
                  </label>
                </div>

                <div className='border w-full border-slate-500'></div>

                <div className='flex flex-col justify-end gap-3'>
                  <button className='cursor-pointer border text-md px-4 py-1 rounded-full' onClick={handleExpereinceCheck}>Reset</button>
                  <button className='cursor-pointer bg-sky-500 text-md px-4 py-1 rounded-full' onClick={handleExperience}>Show Results</button>
                </div>
              </div>
            </div>
          }
        </div>

        <div className='flex flex-col relative'>
          <button className='flex items-center gap-3 border border-slate-400 px-4 py-1 rounded-full cursor-pointer hover:bg-slate-600 hover:scale-105 transition-all duration-300' onClick={handleClick2}>Employment Type <ChevronDown size={18} /></button>

          {open2 &&
            <div className='absolute top-full left-0 mt-2 bg-slate-600 rounded shadow-lg w-full max-h-75 z-10'>
              <div className='p-5 space-y-5'>
                <div className='flex flex-col space-y-4 '>
                  <label className='flex items-center'>
                    <input className='cursor-pointer w-6 h-6 accent-green-500' onChange={handleEmploymentChange} type="radio" name='employment' value="part-time" />&nbsp;
                    <p>Part-Time</p>
                  </label>

                  <label className='flex items-center'>
                    <input className='cursor-pointer h-6 w-6  accent-green-500' onChange={handleEmploymentChange} type="radio" name='employment' value="full-time" />&nbsp;
                    <p>Full-Time</p>
                  </label>

                  <label className='flex items-center'>
                    <input className='cursor-pointer w-6 h-6 accent-green-500' onChange={handleEmploymentChange} type="radio" name='employment' value="contract" />&nbsp;
                    <p>Contract</p>
                  </label>

                  <label className='flex items-centr'>
                    <input className='cursor-pointer w-6 h-6 accent-green-500' onChange={handleEmploymentChange} type="radio" name='employment' value="volunteer" />&nbsp;
                    <p>Volunteer</p>
                  </label>
                </div>

                <div className='border w-full border-slate-500'></div>


                <div className='flex flex-col justify-end gap-3'>
                  <button className='cursor-pointer border text-md px-4 py-1 rounded-full' onClick={() => setOpen2(false)}>Reset</button>
                  <button className='cursor-pointer bg-sky-500 text-md px-4 py-1 rounded-full' onClick={handleExperience2}>Show Results</button>
                </div>
              </div>
            </div>
          }

        </div>

      </div>

      <div className='flex justify-between space-x-5  border border-slate-400 w-full mt-10'>
        <div className='border-r border-r-slate-500 max-w-md w-full'>

        {paginatedJobs?.length === 0 && !isLoading ? (
          <p>No Jobs Found</p>
        ) : (
          paginatedJobs.map((job) =>
            <div onClick={() => handleLink(job.id)} key={job.id}>
              <div className='cursor-pointer mt-5 px-5 hover:scale-103 transition-all duration-200'>
                <h1 className='text-sky-500 font-semibold text-xl'>{job.title}</h1>
                <h1 className='text-md'>{job.company}</h1>
                <h1 className='text-md'>{job.location}</h1>
                <h1 className='text-md mt-1 mb-1 font-semibold '>{job.levelOfExperience}</h1>
                <div className='border w-full border-slate-500'></div>
              </div>
            </div>

          )
        )}

        <div className='mt-10 mb-7 flex justify-center space-x-4'>
          <button className={`hover:scale-105 transition-all duration-200 cursor-pointer ${page === 1 ? 'bg-gray-400' : 'bg-black'} px-4 py-3 border rounded`} onClick={handlePrevious} disabled={page === 1}>Previous Page</button>
          <button className={`hover:scale-105 transition-all duration-200 cursor-pointer ${page === totalPages ? "bg-gray-400" : "bg-black"} bg-black border-2 px-7 py-3 rounded-lg`} onClick={handleNext} disabled={page === totalPages}>Next Page</button>
        </div>
      </div>

        <div className='max-w-5xl w-full'>
          {selectedJob &&
            <div className='mt-5 pr-10'>
              <h1 className='text-3xl font-bold text-sky-500'>{selectedJob.title}</h1>
              <p className='mt-2 text-lg'>{selectedJob.company}</p>
              <p>{selectedJob.location}</p>
              <p className='font-semibold mt-2'>{selectedJob.levelOfExperience}</p>

              <h1 className='mt-7 mb-7'>About the job</h1>
              <div className='mt-5'><p>{selectedJob.description}</p></div>

              <h1 className='mt-7 mb-7'>Core responsibilities</h1>
              <div className='mt-5'>
                <ul className='list-disc pl-6'>
                  {(selectedJob.coreResponsibilities || []).map((res, index) =>
                    <li key={index} className='mb-2'>{res}</li>
                  )}
                </ul>
              </div>

              <h1 className='mt-7 mb-7'>Required Qualifications</h1>
              <div className='mt-5'>
                <ul className='list-disc pl-6'>
                  {(selectedJob.requiredQualifications || []).map((qual, index) =>
                    <li key={index} className='mb-2'>{qual}</li>
                  )}
                </ul>
              </div>

              <h1 className='mt-7 mb-7'>Skills and competencies</h1>
              <div className='mt-5'>
                <ul className='list-disc pl-6'>
                  {(selectedJob.skillsAndCompetencies || []).map((comp, index) =>
                    <li key={index} className='mb-2'>{comp}</li>
                  )}
                </ul>
              </div>
            </div>
            }
        </div>

      </div>
    </div >
  )

}
export default Project1
