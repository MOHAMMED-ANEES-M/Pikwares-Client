import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
import { successToast, warnToast } from '../components/Toast';

const RateProductCustomer = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const { productId, customerId } = useParams();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Rating:', rating);
    console.log('Review:', review);
    const data = {productId,customerId,review,rating}

    try{
        let response = await axios.post(`http://localhost:8000/review/insert`,data)
        console.log(response);
        successToast('Review added')
    }catch(err){
        console.log(err);
        warnToast(err && err.response.data)
    }
    
  };

  const starComponents = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // Full star
      starComponents.push(
        <FaStar
          key={i}
          color="#FFD700"
          onClick={() => handleRatingChange(i)}
          style={{ cursor: 'pointer' }}
        />
      );
    } else if (i - 0.5 <= rating) {
      // Half star
      starComponents.push(
        <FaStarHalfAlt
          key={i}
          color="#FFD700"
          onClick={() => handleRatingChange(i - 0.5)}
          style={{ cursor: 'pointer' }}
        />
      );
    } else {
      // Empty star
      starComponents.push(
        <FaRegStar
          key={i}
          color="#FFD700"
          onClick={() => handleRatingChange(i)}
          style={{ cursor: 'pointer' }}
        />
      );
    }
  }

  return (
    <div className='mt-32 border rounded w-2/4 m-auto p-10 mb-10'>
      <h2 className='text-center text-3xl font-bold mb-20'>Rate and Review Product</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-7 mb-10'>
          <p className='text-3xl'>Rating:</p>
          <div className='flex text-3xl'>
          {starComponents}
          </div>
        </div>
        <div className='flex gap-5'>
          <p className='text-3xl '>Review:</p>
          <textarea className='border rounded text-xl w-full h-60 p-5' value={review} onChange={handleReviewChange} />
        </div>
        <div className='mt-10 text-center'>
          <button className='bg-green-500 text-white py-2 px-5 rounded h-fit' type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RateProductCustomer;
