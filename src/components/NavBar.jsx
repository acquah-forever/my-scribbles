import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
        <nav className='flex items-center justify-between  px-7 bg-slate-800'>
            <div>
                <Link to='/' className='text-md'>Project 1</Link>
            </div>

            <div className='hidden sm:flex space-x-4'>
                <Link to='/about'>Project 2</Link>
                <Link to='/services'>Project 3</Link>
                <Link to='/contact'>Project 4</Link>
            </div>

            <div className='flex items-center space-x-4'>
                <div className='hidden sm:flex space-x-4 bg-slate-500 px-3  rounded'>
                    <NavLink to='/signup'>SignUp</NavLink>
                </div>
                <button className='flex sm:hidden' onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>
        </nav>

        {isOpen && (
            <div className='px-7 flex flex-col space-y-4 py-3 bg-linear-to-br from-slate-900 to-slate-600 sm:hidden'>
                <Link>About</Link>
                <Link>Services</Link>
                <Link>Contact</Link>
                <NavLink to='/signup' className='bg-slate-500 px-3 py-1 rounded w-max'>SignUp</NavLink>
            </div>
        )}
        
        </>
    )
}

export default NavBar
