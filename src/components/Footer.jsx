import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-500 p-8 mt-20">
      <div className="container mx-auto text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p>About our company and mission.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Office Address</h3>
          <p>Pikwares Company</p>
          <p>Calicut, Kerala</p>
          <p>India - 123456</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <p>Stay connected on social media.</p>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-sm">&copy; 2024 Pikwares Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
