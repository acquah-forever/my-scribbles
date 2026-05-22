import React from 'react'
import NavBar from './components/NavBar'
import Project1 from './pages/Project1'
import Project2 from './pages/Project2'
import Project3 from './pages/Project3'
import Project4 from './pages/Project4'
import SignUp from './pages/SignUp'
import Footer from './components/Footer'

import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => {

  return (
    <div className='bg-slate-800 min-h-screen flex flex-col text-white'>
      <div className='container mx-auto flex flex-col flex-1'>
        <NavBar />
        <main className='flex-1'>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path='/' element={<Project1 />} />
              <Route path='/project2' element={<Project2 />} />
              <Route path='/project3' element={<Project3 />} />
              <Route path='/project4' element={<Project4 />} />
              <Route path='/signup' element={<SignUp />} />
            </Routes>
          </QueryClientProvider>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
