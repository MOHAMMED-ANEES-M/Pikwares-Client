import React from 'react';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">

        <div className="flex justify-center items-center">
          <div className="loader ease-linear rounded-sm bg-white border-8 border-t-8 border-green-500 h-5 w-5 md:h-10 md:w-10 animate-spin"></div>
        </div>

    </div>
  );
};

export default Loader;
