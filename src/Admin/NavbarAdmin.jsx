import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import './NavbarAdmin.css';
import { RiShoppingCartFill } from "react-icons/ri";
import { FaHeart } from 'react-icons/fa';
import { IoMdHome } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { FaBoxesPacking } from "react-icons/fa6";


const NavbarAdmin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let token = localStorage.getItem('token');
  const navigate = useNavigate();

  let userId = localStorage.getItem('userId');

  let handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUsername');
    localStorage.removeItem('userId');
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      <div className='container px-3 sm:px-10 py-5 fixed top-0 z-20 flex lg:flex justify-between items-center bg-green-400'>
        <a href="/"><h1 className='font-semibold text-lg sm:text-3xl'>Pikwares</h1></a>
        <div className='lg:hidden'>
          <button
            onClick={toggleMenu}
            className='text-white focus:outline-none'
          >
            {!isMenuOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'
                ></path>
              </svg>
            ) : (
              <svg 
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                className='h-6 w-6 lg:hidden absolute top-2 right-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                ></path>
              </svg>
            )}
          </button>
        </div>
        <ul
          className={`${
            isMenuOpen ? 'flex flex-col space-y-2' : 'hidden lg:flex'
          } lg:flex gap-x-2 sm:gap-x-5 md:gap-x-10 lg:gap-x-20`}
        >
          {userId === 'a1b2c3' ? (
            <>
              <NavLink to='/homeadmin'>
                <li>Home</li>
              </NavLink>
              <NavLink to='/customersadmin'>
                <li>Customers</li>
              </NavLink>
              <NavLink to='/addproduct'>
                <li>Add Product</li>
              </NavLink>
              <NavLink to='/ordersadmin'>
                <li>Orders</li>
              </NavLink>
              <NavLink to='/subadmins'>
                <li>Sub Admins</li>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to='/'>
                <li className='flex gap-1 items-center'><IoMdHome /> Home</li>
              </NavLink>
              <NavLink to='/cartcustomer'>
                <li className='flex gap-1 items-center'><RiShoppingCartFill />Cart</li>
              </NavLink>
              <NavLink to='/wishlistcustomer'>
                <li className='flex gap-1 items-center'><FaHeart />Wishlist</li>
              </NavLink>
              <NavLink to='/orderscustomer'>
                <li className='flex gap-1 items-center'><FaBoxesPacking /> Orders</li>
              </NavLink>
              <NavLink to='/accountcustomer'>
                <li className='flex gap-1 items-center'><MdAccountCircle /> Account</li>
              </NavLink>
            </>
          )}
        </ul>
        <ul
          className={`${
            isMenuOpen ? 'flex flex-col space-y-2' : 'hidden lg:flex'
          } lg:flex gap-x-2 sm:gap-x-5 md:gap-x-10 lg:gap-x-20`}
        >
        {token ? (
          <button
            onClick={handleLogout}
            className='bg-red-600 text-white py-2 px-4 rounded-3xl h-fit lg:block'
          >
            Logout
          </button>
        ) : (
          <div className='lg:flex'>
            <Link to='/login'>
              <button className='bg-green-50 text-black py-2 mt-2 lg:mt-0 px-4 mr-3 rounded-3xl h-fit'>
                Login
              </button><br />
            </Link>
            <Link to='/signup'>
              <button className='bg-black text-white py-2 mt-2 px-4 lg:mt-0 rounded-3xl h-fit'>
                Sign Up
              </button>
            </Link>
          </div>
        )}
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default NavbarAdmin;
