import React from 'react';
import { FaGithubSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="fixed-bottom  bg-green-500 p-3 py-8 sm:p-8 mt-20">
      <div className="container mx-auto text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <Link to='/about'><p>Pikwares Chronicles</p></Link>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>Email: pikwares.cs@gmail.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Office Address</h3>
          <p>Pikwares Company</p>
          <p>Calicut, Kerala</p>
          <p>India - 123456</p>
        </div>
        <div className='place-items-center'>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className='w-fit m-auto'><a href="https://www.instagram.com/__.anees._/"><FaInstagramSquare  className='w-8 h-8 mb-1'/></a></div>
          <div className='w-fit m-auto'><a href="https://www.linkedin.com/in/mohammed-anees-m-127392290/"><FaLinkedin className='w-8 h-8 mb-1'/></a></div>
          <div className='w-fit m-auto'><a href="https://github.com/MOHAMMED-ANEES-M"><FaGithubSquare className='w-8 h-8'/></a></div>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-center">&copy; 2024 Pikwares.  All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
