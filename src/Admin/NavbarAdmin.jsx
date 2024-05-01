import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import './NavbarAdmin.css';
import { RiShoppingCartFill } from "react-icons/ri";
import { FaHeart, FaUsers } from 'react-icons/fa';
import { IoMdHome } from "react-icons/io";
import { MdAccountCircle, MdChat } from "react-icons/md";
import { FaBoxesPacking } from "react-icons/fa6";
import { IoBagAdd } from "react-icons/io5";
import Footer from '../components/Footer';


const NavbarAdmin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  let token = localStorage.getItem('token');
  let userId = localStorage.getItem('userId');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUsername');
    localStorage.removeItem('userId');
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      <div className={`container px-3 sm:px-10 py-5 fixed top-0 z-20  bg-green-400 ${
        isMenuOpen ? 'h-screen flex-none pt-20' : 'h-20 flex lg:flex justify-between items-center' 
      }`}>
        { userId === 'a1b2c3'? (
          <a href="/homeadmin"><h1 className={`font-semibold  ${
            isMenuOpen ? 'text-3xl' : 'text-lg sm:text-3xl ' }`}>Pikwares</h1></a>
        ):(
          <a href="/"><h1 className={`font-semibold  ${
            isMenuOpen ? 'text-3xl' : 'text-lg sm:text-3xl ' }`}>Pikwares</h1></a>
        )}
        

        <div className='lg:hidden'>
          <button
            onClick={toggleMenu}
            className='text-white focus:outline-none '
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
                className='h-6 w-6 lg:hidden absolute top-5 right-5 sm:right-10'
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
            isMenuOpen ? 'flex flex-col space-y-2 mb-5 m-auto' : 'hidden lg:flex'
          } lg:flex gap-x-2 sm:gap-x-5 md:gap-x-5 lg:gap-x-10`}
        >
          {userId === 'a1b2c3' ? (
            <>
              <NavLink to='/homeadmin' onClick={()=>{setIsMenuOpen(false);}}>
              <li className={`nav-btn1 flex gap-1 items-center ${isMenuOpen ? 'justify-start mb-1': ''}`}><IoMdHome /> Home</li>
              </NavLink>
              <NavLink to='/customersadmin' onClick={()=>{setIsMenuOpen(false);}}>
              <li className={`nav-btn1 flex gap-1 items-center ${isMenuOpen ? 'justify-start mb-1': ''}`}><FaUsers />Customers</li>
              </NavLink>
              <NavLink to='/addproduct' onClick={()=>{setIsMenuOpen(false);}}>
              <li className={`nav-btn1 flex gap-1 items-center ${isMenuOpen ? 'justify-start mb-1': ''}`}><IoBagAdd />Add Product</li>
              </NavLink>
              <NavLink to='/ordersadmin' onClick={()=>{setIsMenuOpen(false);}}>
              <li className={`nav-btn1 flex gap-1 items-center ${isMenuOpen ? 'justify-start mb-1': ''}`}><FaBoxesPacking /> Orders</li>
              </NavLink>
              <NavLink to='/chatlistadmin' onClick={()=>{setIsMenuOpen(false);}}>
              <li className={`nav-btn1 flex gap-1 items-center ${isMenuOpen ? 'justify-start mb-1': ''}`}><MdChat /> Chat</li>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to='/' onClick={()=>{setIsMenuOpen(false);}}>
                <li className={`nav-btn1 flex gap-1 items-center ${isMenuOpen ? 'justify-start mb-1': ''}`}><IoMdHome /> Home</li>
              </NavLink>
              <NavLink to='/cartcustomer' onClick={()=>{setIsMenuOpen(false);}}>
                <li className={`nav-btn1 flex gap-1 items-center ${isMenuOpen ? 'justify-start mb-1': ''}`}><RiShoppingCartFill />Cart</li>
              </NavLink>
              <NavLink to='/wishlistcustomer' onClick={()=>{setIsMenuOpen(false);}}>
                <li className={`nav-btn1 flex gap-1 items-center ${isMenuOpen ? 'justify-start mb-1': ''}`}><FaHeart />Wishlist</li>
              </NavLink>
              <NavLink to='/orderscustomer' onClick={()=>{setIsMenuOpen(false);}}>
                <li className={`nav-btn1 flex gap-1 items-center ${isMenuOpen ? 'justify-start mb-1': ''}`}><FaBoxesPacking /> Orders</li>
              </NavLink>
              <NavLink to='/accountcustomer' onClick={()=>{setIsMenuOpen(false);}}>
                <li className={`nav-btn1 flex gap-1 items-center ${isMenuOpen ? 'justify-start mb-1': ''}`}><MdAccountCircle /> Account</li>
              </NavLink>
              <NavLink to='/chatlistcustomer' onClick={()=>{setIsMenuOpen(false);}}>
                <li className={`nav-btn1 flex gap-1 items-center ${isMenuOpen ? 'justify-start mb-1': ''}`}><MdChat /> Chat</li>
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
          onClick={() => {
            handleLogout();
            setIsMenuOpen(false);
          }}
            className='bg-red-600 text-white py-2 px-4 rounded-3xl h-fit lg:block'
          >
            Logout
          </button>
        ) : (
          <div className='lg:flex'>
            <Link to='/login' onClick={()=>{setIsMenuOpen(false);}}>
              <button className='bg-green-50 text-black py-2 mt-2 lg:mt-0 px-4 mr-3 rounded-3xl h-fit'>
                Login
              </button><br />
            </Link>
            <Link to='/signup' onClick={()=>{setIsMenuOpen(false);}}>
              <button className='bg-black text-white py-2 mt-2 px-4 lg:mt-0 rounded-3xl h-fit'>
                Sign Up
              </button>
            </Link>
          </div>
        )}
        </ul>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default NavbarAdmin;
