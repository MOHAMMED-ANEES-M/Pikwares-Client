import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const NavbarCustomer = () => {

    let token = localStorage.getItem('token')
    const navigate = useNavigate()

    let handleLogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUsername');
        localStorage.removeItem('userId');
        navigate('/')
      }

  return (
    <div>
      <div>
      <div className='container px-10 py-5  flex lg:flex justify-between items-center bg-green-200'>
            <h1 className='font-semibold text-3xl '>Pikwares</h1>
            <ul className='flex gap-x-2 sm:gap-x-5 md:gap-x-10 lg:gap-x-20'>
              <li>Home</li>
              <li>Cart</li>
              <li>History</li>
              <li>Account</li>
            </ul>
            { token ?(
           <Link> <button onClick={handleLogout} className='bg-red-600 text-white py-2 px-4 rounded-3xl h-fit'>Logout</button></Link>
            ):(
                <div>
           <Link to='/login'> <button className='bg-green-50 text-black py-2 px-4 mr-3 rounded-3xl h-fit'>Login</button></Link>
           <Link to='/signup'> <button className='bg-black text-white py-2 px-4 rounded-3xl h-fit'>Sign Up</button></Link>
           </div>
            )}
      </div>
      <Outlet/>
    </div>
    
    </div>
  )
}

export default NavbarCustomer
