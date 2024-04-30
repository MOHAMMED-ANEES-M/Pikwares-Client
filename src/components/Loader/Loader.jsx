import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader ease-linear rounded-sm bg-green-500 border-8 border-t-8 border-green-500 h-5 w-5 md:h-10 md:w-10 animate-spin">
      </div>
    </div>
  );
};

export default Loader;
