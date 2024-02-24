import React from 'react';

const DiscountCalculator = ({ actualPrice, offerPrice }) => {

  const calculateDiscountPercentage = (actualPrice, offerPrice) => {

    if (actualPrice <= 0 || offerPrice <= 0) {
      return "Prices must be greater than zero.";
    }

    const discountAmount = actualPrice - offerPrice;
    const discountPercentage = Math.ceil((discountAmount / actualPrice) * 100)

    return discountPercentage;
  };

  const discountPercentage = calculateDiscountPercentage(actualPrice, offerPrice);

  return (

    <div>
      <p className='ms-2 text-green-600 font-semibold' >({discountPercentage}% off)</p>
    </div>
    
  );
};

export default DiscountCalculator;
