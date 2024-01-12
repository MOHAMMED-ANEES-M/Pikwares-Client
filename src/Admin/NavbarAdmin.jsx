import React from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import './NavbarAdmin.css'

const NavbarAdmin = () => {

  let token = localStorage.getItem('token')
    const navigate = useNavigate()

    let userId = localStorage.getItem('userId')

    let handleLogout=()=>{
      console.log('logout1');
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUsername');
        localStorage.removeItem('userId');
        navigate('/')
        window.location.reload();
        console.log('logout');
      }

  return (
    <div>
      <div className='container px-10 py-5 fixed top-0 z-20 flex lg:flex justify-between items-center bg-green-500'>
            <h1 className='font-semibold text-3xl '>Pikwares</h1>
            <ul className='flex gap-x-2 sm:gap-x-5 md:gap-x-10 lg:gap-x-20'>
              { userId === '659a975490f6b3e4142f9d45' ? (
                <>
                  <NavLink to='/homeadmin'><li>Home</li></NavLink>
                  <NavLink to='/customersadmin'><li>Customers</li></NavLink>                  
                  <NavLink to='/reportadmin'><li>Report</li></NavLink>
                  <NavLink to='/ordersadmin'><li>Orders</li></NavLink>
                  <NavLink to='/subadmins'><li>Sub Admins</li></NavLink>
                  </>
              ):(
                <>
                  <NavLink to='/'><li>Home</li></NavLink>                  
                  <NavLink to='/cartcustomer'><li>Cart</li></NavLink>                  
                  <NavLink to='/historycustomer'><li>History</li></NavLink>                  
                  <NavLink to='/accountcustomer'><li>Account</li></NavLink>                  
              </>
              )}
              
            </ul>
            { token ?(
            <button onClick={handleLogout} className='bg-red-600 text-white py-2 px-4 rounded-3xl h-fit'>Logout</button>
            ):(
                <div>
           <Link to='/login'> <button className='bg-green-50 text-black py-2 px-4 mr-3 rounded-3xl h-fit'>Login</button></Link>
           <Link to='/signup'> <button className='bg-black text-white py-2 px-4 rounded-3xl h-fit'>Sign Up</button></Link>
           </div>
            )}
          </div>
      <Outlet/>
    </div>
    
  )
}

export default NavbarAdmin
